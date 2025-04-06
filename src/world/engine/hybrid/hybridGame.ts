import EventEmitter from "eventemitter3";

import { App } from "@clubpenguin/app/app";
import { GameConfig } from "@clubpenguin/app/config";
import Load from "@clubpenguin/load/Load";
import { DonePayload, PromiseTask, Task } from "@clubpenguin/load/tasks";
import { Engine, Game } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { HybridBridge } from "./hybridBridge";
import { RufflePlayer } from "./ruffle";
import World from "@clubpenguin/world/World";
import { LoaderPlugin, setQuery } from "@clubpenguin/app/loader";
import { AirtowerProxy } from "./airtowerProxy";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.world.engine.hybrid');

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
                setTimeout(checkProgress, 100);
            };
            setTimeout(checkProgress, 100);
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

export class GameLoaderTask extends EventEmitter implements Task {
    label?: string;
    _progress: number;
    important: boolean;
    bound: boolean;

    didFail: boolean;

    constructor() {
        super();

        this.important = false;
        this.didFail = false;
        this.bound = false;
    }

    get progress(): number {
        return this._progress;
    }
    set progress(value: number) {
        this._progress = value;

        this.emit('progress', value);

        if (this.isDone) {
            this._result = { ok: true, data: {} }
            this.emit('done', this._result);
        }
    }

    get isDone(): boolean {
        return this._progress >= 1;
    }

    private _result: { ok: boolean, data: {} };

    wait(): Promise<DonePayload> {
        return new Promise(resolve => {
            if (this._result) return resolve(this._result);
            this.once('done', payload => resolve(payload));
        });
    }

    bind(): void {
        this.bound = true;
    }

    unbind(): void {
        this.bound = false;
    }
}

export class HybridGame extends Phaser.Scene implements Game {
    constructor(config: GameConfig) {
        super(config.name);
        this.gameData = config;
    }

    declare game: App;

    init(data: any): void {
        if (data.oninit) data.oninit(this);
    }

    preload(): void {

    }

    get world(): World {
        return this.scene.get('World') as World;
    }

    get engine(): Engine {
        return this.world.engine;
    }

    get interface(): Interface {
        return this.scene.get('Interface') as Interface;
    }

    get loadScreen(): Load {
        return this.scene.get('Load') as Load;
    }

    public gameData: GameConfig;

    async create(data: any): Promise<void> {
        await this.play(`${this.load.baseURL}assets/world/games/loader.swf?v=${this.game.minigameVersion}`, this.asFlashVars({
            media: this.load.baseURL,
            game: this.url,
            bridgeId: this.createBridge()
        }));

        this.bridge.player = this.player;
        this.bridge.setHandler('ready', () => { if (data.onready) data.onready(this) });

        // Once the ruffle bridge has been loaded it sends everything the flash client needed, for now it only needs penguin's object and color crumbs
    }

    update(time: number, delta: number): void {
        if (this.interface.contentShowing || this.loadScreen.isShowing) this.sendToBack();
        else this.bringToTop();
    }

    bringToTop(): void {
        this.game.domContainer.style.zIndex = 'auto';
    }

    sendToBack(): void {
        this.game.domContainer.style.zIndex = '-1';
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

        this.container = this.add.dom(0, 0, player, `width: 100%; height: 100%; pointerEvents: auto`) as HybridContainer;
        this.container.setOrigin(0, 0);
        this.container.visible = true;
    }

    async play(url: string, params?: string): Promise<void> {
        let ruffle = window.RufflePlayer.newest();
        this.player = ruffle.createPlayer();
        this.loadScreen.track(new RuffleTask(this.player));

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
    airtower: AirtowerProxy;

    createBridge(): string {
        if (this.bridge) this.destroyBridge();
        this.bridge = new HybridBridge();
        this.airtower = new AirtowerProxy(this.bridge, this.world, this.gameData.game_key);

        this.bridge.setHandler('loaded', this.loaded, this);
        this.bridge.setHandler('progress', this.progress, this);
        this.bridge.setHandler('getCacheUrl', this.getCacheUrl, this);
        this.bridge.setHandler('muteMusic', this.muteMusic, this);
        this.bridge.setHandler('unmuteMusic', this.unmuteMusic, this);
        this.bridge.setHandler('isMusicMuted', this.isMusicMuted, this);
        this.bridge.setHandler('getLocalizedString', this.getLocalizedString, this);
        this.bridge.setHandler('startMusicById', this.startMusicById, this);
        this.bridge.setHandler('startGameMusic', this.startGameMusic, this);
        this.bridge.setHandler('stopGameMusic', this.stopGameMusic, this);
        this.bridge.setHandler('hideLoading', this.hideLoading, this);
        this.bridge.setHandler('airtowerMessage', this.airtowerMessage, this);
        this.bridge.setHandler('getActiveWaddleId', this.getActiveWaddleId, this);
        this.bridge.setHandler('showPrompt', this.showPrompt, this);
        this.bridge.setHandler('closePrompt', this.closePrompt, this);
        this.bridge.setHandler('sendJoinLastRoom', this.sendJoinLastRoom, this);
        this.bridge.setHandler('endGame', this.endGame, this);

        this.loaderTask = new GameLoaderTask();
        this.loadScreen.track(this.loaderTask);
        return this.bridge.register();
    }

    public loaderTask: Task;

    loaded(): void {
        let userData = this.world.myUser;
        let colorHex = this.game.gameConfig.player_colors;

        this.bridge.sendSafe('populateFlashData', {
            basePath: '',
            baseConfigPath: '',
            globalContentPath: `${this.load.baseURL}assets/world/`,
            gamesPath: `${this.load.baseURL}assets/world/games/`
        }, userData, colorHex, this.game.locale.abbreviation);
    }

    progress(progress: number): void {
        if (this.loaderTask) {
            this.loaderTask.progress = progress;
        }
    }

    getCacheUrl(url: string): string {
        return setQuery(url, 'v', LoaderPlugin.cacheVersion, true);
    }

    muteMusic(): void {
        this.engine.music.muted = true;
    }

    unmuteMusic(): void {
        this.engine.music.muted = false;
    }

    isMusicMuted(): boolean {
        return this.engine.music.muted;
    }

    getLocalizedString(key: string): string {
        let str = this.game.locale.localize(key);
        return str;
    }

    startMusicById(musicId?: number): void {
        this.engine.music.play(musicId);
    }

    startGameMusic(): void {
        if (this.gameData.music_id && this.engine.music.currentMusicId != this.gameData.music_id) this.engine.music.play(this.gameData.music_id);
        else if (!this.gameData.music_id) this.engine.music.stop();

    }

    stopGameMusic(): void {
        this.engine.music.stop();
    }

    hideLoading(): void {
        let load = this.loadScreen;
        if (load.isShowing) load.hide();
    }

    airtowerMessage(command: string, args: any[]): void {
        this.airtower.messageFromFlash(command, args);
    }

    getActiveWaddleId(): number {
        return this.world.currentWaddleId;
    }

    showPrompt(style: string, message: string, file: string): void {
        let yes = this.game.locale.localize('Yes');
        let no = this.game.locale.localize('No');
        let okay = this.game.locale.localize('Ok');
        let positiveCallback = () => { if (this.bridge) this.bridge.sendSafe('promptPositiveCallback') };
        let negativeCallback = () => { if (this.bridge) this.bridge.sendSafe('promptNegativeCallback') };
        switch (String(style)) {
            case 'question':
                this.interface.promptQuestion.show(message, yes, no, positiveCallback, negativeCallback);
                break;
            case 'ok':
            case 'ok_big':
                this.interface.promptOkay.show(message, okay, positiveCallback, negativeCallback);
                break;
            case 'wait':
                this.interface.promptSpinner.show();
                break;
            default:
                logger.warn('Unknown prompt style', style);
                break;
        }
    }

    closePrompt(): void {
        this.interface.closePrompt();
    }

    sendJoinLastRoom(): void {
        this.world.joinRoom(this.engine.previousRoomId);
    }

    endGame(score: number, roomId?: number): void {
        setTimeout(() => this.world.endGame(score, roomId), 200);
    }

    destroyBridge(): void {
        this.bridge = undefined;
        this.airtower.destroy();
        this.airtower = undefined;
    }

    /* ================= CLEANUP ================= */

    unload(engine: Engine): void {
        this.stop();
        this.bringToTop.call(engine.world);
    }
}
