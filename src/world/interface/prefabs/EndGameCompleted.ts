
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import EndGameTitle from "./EndGameTitle";
import EndGameCoins from "./EndGameCoins";
import EndGameStamps from "./EndGameStamps";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Interface from "../Interface";
import { GameConfig } from "@clubpenguin/app/config";
/* END-USER-IMPORTS */

export default class EndGameCompleted extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(450, 177.75, "interface", "interface/promptBg", 825.75, 614.25, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // closeButton
        const closeButton = scene.add.image(1211.85, 240.86, "interface", "interface/endGameClose0001");
        this.add(closeButton);

        // title
        const title = new EndGameTitle(scene, 486.56, 238.61);
        this.add(title);

        // coins
        const coins = new EndGameCoins(scene, 495, 360.45);
        this.add(coins);

        // interface_endGameCoins
        const interface_endGameCoins = scene.add.image(522.11, 374.63, "interface", "interface/endGameDoubleCoins");
        interface_endGameCoins.setOrigin(0, 0);
        this.add(interface_endGameCoins);

        // stamps
        const stamps = new EndGameStamps(scene, 494.78, 524.25);
        this.add(stamps);

        // interface_endGameStamps
        const interface_endGameStamps = scene.add.image(520.54, 528.41, "interface", "interface/endGameStamps");
        interface_endGameStamps.setOrigin(0, 0);
        this.add(interface_endGameStamps);

        // info
        const info = new TextBox(scene, 470.14, 689.51, "BurbankSmallBold");
        info.text = "Parabens, voce ganhou o dobro de moedas";
        info.fontSize = -36;
        info.align = 1;
        info.maxWidth = 780.8625;
        this.add(info);

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/endGameClose0001"};
        closeButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/endGameClose0002"};
        closeButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/endGameClose0003"};
        closeButtonButtonComponent.handCursor = true;
        closeButtonButtonComponent.pixelPerfect = true;

        // info (prefab fields)
        info.boxWidth = 780.8625;
        info.boxHeight = 87.75;
        info.horizontalAlign = 1;
        info.verticalAlign = 1;

        this.bg = bg;
        this.closeButton = closeButton;
        this.title = title;
        this.coins = coins;
        this.stamps = stamps;
        this.info = info;

        /* START-USER-CTR-CODE */

        this.closeButton.on('release', () => this.scene.closeEndGame())

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public closeButton: Phaser.GameObjects.Image;
    public title: EndGameTitle;
    public coins: EndGameCoins;
    public stamps: EndGameStamps;
    public info: TextBox;

    /* START-USER-CODE */

    declare scene: Interface;

    setup(coins: number, stamps: number[], gameData: GameConfig): void {
        this.title.localize(gameData.name);
        this.coins.localize(coins, true);
        this.stamps.localize(gameData.name, stamps.length);
        this.scene.game.locale.immediate(locale => this.info.text = locale.localize('end_game_congrats'));
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
