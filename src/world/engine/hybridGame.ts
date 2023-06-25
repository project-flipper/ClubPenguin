import { App } from "../../app/app";
import { GameConfig } from "../../app/config";
import Interface from "../interface/Interface";
import Engine, { Game } from "./Engine";
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
    public container: HybridContainer;

    create(data: any): void {

        this.play(`${this.load.baseURL}assets/world/games/${this.gameData.path}`, this.asFlashVars({
            locale: this.game.locale.language.toString(),
            nickname: this.engine.world.myPenguinData.nickname,
            color: this.engine.world.myPenguinData.avatar.color.toString(),
            media: this.load.baseURL
        })).then(() => { if (data.onready) data.onready(this) });
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
            splashScreen: false,
            favorFlash: true,
            autoplay: 'off',
            wmode: 'transparent',
            parameters: params
        });
        this.player.play();
    }

    stop(): void {
        if (this.player.isPlaying) this.player.destroy();

        this.container.destroy(true);
        this.container = undefined;
    }

    unload(engine: Engine): void {
        this.stop();
    }
}
