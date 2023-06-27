import Phaser from "phaser";
import { App } from "../../app/app";
import { GameConfig } from "../../app/config";
import Interface from "../interface/Interface";
import Engine, { Game } from "./Engine";
import { HybridBridge } from "./hybridBridge";
import { RufflePlayer } from "./ruffle";

interface HybridContainer extends Phaser.GameObjects.DOMElement {
    node: RufflePlayer;
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
        let handItem = penguinData.avatar.hand;

        this.createBridge();
        await this.play(this.url, this.asFlashVars({
            locale: this.game.locale.language.toString(),
            nickname: penguinData.nickname,
            color: penguinData.avatar.color.toString(),
            colorHex: this.game.gameConfig.player_colors[penguinData.avatar.color],
            handItem: handItem.toString(),
            media: this.load.baseURL
        }));

        this.bridge.player = this.player;
        this.bridge.once('ready', () => { if (data.onready) data.onready(this) });
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
    }

    async play(url: string, params?: string): Promise<void> {
        let ruffle = window.RufflePlayer.newest();
        this.player = ruffle.createPlayer();
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
        if (this.player.isPlaying) this.player.destroy();

        this.container.destroy(true);
        this.container = undefined;

        this.destroyBridge();
    }

    /* ================= COMMUNICATION ================= */

    bridge: HybridBridge;

    createBridge(): void {
        if (this.bridge) this.destroyBridge();
        this.bridge = new HybridBridge();

        this.bridge.on('startGameMusic', this.startGameMusic, this);
        this.bridge.on('stopGameMusic', this.startGameMusic, this);
        this.bridge.on('endGame', this.endGame, this);
    }

    startGameMusic(): void {
        this.engine.playMusic(this.gameData.music_id);
    }

    stopGameMusic(): void {
        this.engine.stopMusic();
    }

    endGame(): void {
        this.engine.endGame();
    }

    destroyBridge(): void {
        this.bridge = undefined;
    }

    /* ================= CLEANUP ================= */

    unload(engine: Engine): void {
        this.stop();
    }
}
