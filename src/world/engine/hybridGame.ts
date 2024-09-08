import Phaser from "phaser";
import EventEmitter from "eventemitter3";
import { App } from "../../app/app";
import { GameConfig } from "../../app/config";
import Interface from "../interface/Interface";
import Engine, { Game } from "./Engine";
import { HybridBridge, type BridgeMessage } from "./hybridBridge";
import { RufflePlayer } from "./ruffle";
import type Load from '../../load/Load';
import { Locale } from "../../app/locale";
import { DonePayload, PromiseTask } from "../../load/tasks";

interface HybridContainer extends Phaser.GameObjects.DOMElement {
    node: RufflePlayer;
}

export class RuffleTask extends PromiseTask {
    player: RufflePlayer;

    _lastProgress: number;

    constructor(player: RufflePlayer) {
        super(null);
        this.player = player;
    }

    wrap(_: null): Promise<void> {
        return super.wrap(new Promise<void>(resolve => {
            if (this.getProgress() >= 100) return resolve();

            let checkProgress = () => {
                if (this.getProgress() >= 100) return resolve();    
                setTimeout(checkProgress, 1000);
            };
            setTimeout(checkProgress, 1000);
        }));
    }

    get progress(): number {
        return this.player != undefined ? this.player.PercentLoaded() : 0;
        
    }

    getProgress(): number {
        let currentProgress = this.progress;
        if (currentProgress != this._lastProgress) this.emit('progress', currentProgress);
        return currentProgress;
    }
}

export class HybridGame extends Phaser.Scene implements Game {
    constructor(config: GameConfig) {
        super(config.name);
        this.gameData = config;
    }

    declare game: App;

    init(data: any): void {
        this.scene.moveBelow('Engine');

        if (data.oninit) data.oninit(this);
    }

    get engine(): Engine {
        return this.scene.get('Engine') as Engine;
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    public gameData: GameConfig;

    async create(data: any): Promise<void> {
        let penguinData = this.engine.world.myPenguinData;
        let colorHex = this.game.gameConfig.player_colors;

        await this.play(`${this.load.baseURL}assets/world/games/loader.swf?v=${this.game.minigameVersion}`, this.asFlashVars({
            locale: this.game.locale.language.toString(),
            media: this.load.baseURL,
            game: this.url,
            bridgeId: this.createBridge(),
            cacheVersion: this.game.minigameVersion
        }));

        this.bridge.player = this.player;
        this.bridge.setHandler('ready', () => { if (data.onready) data.onready(this) });

        // Once the ruffle bridge has been loaded it sends everything the flash client needed, for now it only needs penguin's object and color crumbs
        this.bridge.setHandler('loaded', () => this.bridge.send('populateFlashData', {
            basePath: '',
            baseConfigPath: '',
            globalContentPath: `${this.load.baseURL}assets/world/`,
            gamesPath: `${this.load.baseURL}assets/world/games/`
        }, penguinData, colorHex));
    }

    /* ================= FLASH ================= */

    public container: HybridContainer;

    get url(): string {
        return `${this.load.baseURL}assets/world/games/${this.gameData.path}`;
    }

    asFlashVars(params: Record<string, string>): string {
        return new URLSearchParams(params).toString();
    }

    get player(): RufflePlayer {
        return this.container.node;
    }

    set player(player: RufflePlayer) {
        if (this.container) this.stop();

        this.container = this.add.dom(0, 0, player, `width: ${this.cameras.main.width}px; height: ${this.cameras.main.height}px`) as HybridContainer;
        this.container.setOrigin(0, 0);
        this.container.visible = false;
    }

    async play(url: string, params?: string): Promise<void> {
        let load = this.scene.get('Load') as Load;
        let ruffle = window.RufflePlayer.newest();
        this.player = ruffle.createPlayer();
        load.track(new RuffleTask(this.player));
        await this.player.load({
            url,
            base: this.url,
            splashScreen: false,
            favorFlash: true,
            autoplay: 'off',
            quality: 'medium',
            openUrlMode: 'allow',
            allowScriptAccess: true,
            warnOnUnsupportedContent: false,
            showSwfDownload: false,
            unmuteOverlay: 'hidden',
            wmode: 'transparent',
            parameters: params
        });
        this.player.play();
    }

    stop(): void {
        if (this.player) {
            this.player.remove();
        }

        if (this.container) {
            this.container.destroy(true);
            this.container = undefined;
        }

        this.destroyBridge();
    }

    /* ================= COMMUNICATION ================= */

    bridge: HybridBridge;

    createBridge(): string {
        if (this.bridge) this.destroyBridge();
        this.bridge = new HybridBridge();

        this.bridge.setHandler('loaded', this.startHandshake, this);
        this.bridge.setHandler('getLocalizedString', this.getLocalizedString, this);
        this.bridge.setHandler('startMusicById', this.startMusicById, this);
        this.bridge.setHandler('startGameMusic', this.startGameMusic, this);
        this.bridge.setHandler('stopGameMusic', this.stopGameMusic, this);
        this.bridge.setHandler('hideLoading', this.hideLoading, this);
        this.bridge.setHandler('endGame', this.endGame, this);

        return this.bridge.register();
    }

    startHandshake(): void {
        this.game.locale.register(this.localize, this);
    }

    getLocalizedString(key: string): string {
        let str = this.game.locale.localize(key);
        console.log(key, str);
        return str;
    }

    startMusicById(musicId?: number): void {
        this.engine.playMusic(musicId);
    }

    startGameMusic(): void {
        if (this.gameData.music_id && this.engine.currentMusicId != this.gameData.music_id) this.engine.playMusic(this.gameData.music_id);
        else if (!this.gameData.music_id) this.engine.stopMusic();

    }

    stopGameMusic(): void {
        this.engine.stopMusic();
    }

    hideLoading(): void {
        let load = this.scene.get('Load') as Load;
        if (load.isShowing) load.hide();
        this.container.visible = true;
    }

    endGame(score: number, room: undefined): void {
        let load = this.scene.get('Load') as Load;
        if (!load.isShowing) load.show();

        this.container.visible = false;
        this.engine.endGame(score, room);
    }

    localize(locale: Locale): void {
        if (this.bridge) {
            this.bridge.sendSafe('setLanguageAbbreviation', locale.abbreviation);
        }
    }

    destroyBridge(): void {
        this.bridge = undefined;
        this.game.locale.unregister(this.localize);
    }

    /* ================= CLEANUP ================= */

    unload(engine: Engine): void {
        this.stop();
    }
}
