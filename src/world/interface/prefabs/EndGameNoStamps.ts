
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/components/ButtonComponent";
import EndGameTitle from "./EndGameTitle";
import EndGameCoins from "./EndGameCoins";
/* START-USER-IMPORTS */
import Interface from "../Interface";
import { GameConfig } from "@clubpenguin/app/config";
/* END-USER-IMPORTS */

export default class EndGameNoStamps extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(450, 364.5, "interface", "interface/promptBg", 825.75, 355.3875, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // closeButton
        const closeButton = scene.add.image(1211.63, 427.16, "interface", "interface/endGameClose0001");
        this.add(closeButton);

        // title
        const title = new EndGameTitle(scene, 486.56, 425.36);
        this.add(title);

        // coins
        const coins = new EndGameCoins(scene, 495, 547.2);
        this.add(coins);

        // interface_endGameCoins
        const interface_endGameCoins = scene.add.image(522, 561.38, "interface", "interface/endGameCoins");
        interface_endGameCoins.setOrigin(0, 0);
        this.add(interface_endGameCoins);

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/endGameClose0001"};
        closeButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/endGameClose0002"};
        closeButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/endGameClose0003"};
        closeButtonButtonComponent.handCursor = true;
        closeButtonButtonComponent.pixelPerfect = true;

        this.bg = bg;
        this.closeButton = closeButton;
        this.title = title;
        this.coins = coins;

        /* START-USER-CTR-CODE */

        this.closeButton.on('release', () => this.scene.closeEndGame())

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public closeButton: Phaser.GameObjects.Image;
    public title: EndGameTitle;
    public coins: EndGameCoins;

    /* START-USER-CODE */

    declare scene: Interface;

    setup(coins: number, stamps: number[], gameData: GameConfig): void {
        this.title.localize(gameData.name);
        this.coins.localize(coins);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
