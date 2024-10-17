
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import EndGameTitle from "./EndGameTitle";
import EndGameCoins from "./EndGameCoins";
import EndGameStamps from "./EndGameStamps";
import EndGameStampProgress from "./EndGameStampProgress";
import EndGameStampList from "./EndGameStampList";
/* START-USER-IMPORTS */
import Interface from "../Interface";
import { GameConfig } from "@clubpenguin/app/config";
/* END-USER-IMPORTS */

export default class EndGameProgress extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(452.25, 83.25, "interface", "interface/promptBg", 825.75, 848.25, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // closeButton
        const closeButton = scene.add.image(1211.85, 148.61, "interface", "interface/endGameClose0001");
        this.add(closeButton);

        // title
        const title = new EndGameTitle(scene, 486.5625, 146.3625);
        this.add(title);

        // coins
        const coins = new EndGameCoins(scene, 495, 254.7);
        this.add(coins);

        // stamps
        const stamps = new EndGameStamps(scene, 494.78, 417.83);
        this.add(stamps);

        // stampProgress
        const stampProgress = new EndGameStampProgress(scene, 855, 577.91);
        this.add(stampProgress);

        // stampList
        const stampList = new EndGameStampList(scene, 509.74, 648);
        this.add(stampList);

        // interface_endGameCoins
        const interface_endGameCoins = scene.add.image(521.44, 269.66, "interface", "interface/endGameCoins");
        interface_endGameCoins.setOrigin(0, 0);
        this.add(interface_endGameCoins);

        // interface_endGameStamps
        const interface_endGameStamps = scene.add.image(520.54, 422.66, "interface", "interface/endGameStamps");
        interface_endGameStamps.setOrigin(0, 0);
        this.add(interface_endGameStamps);

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
        this.stamps = stamps;
        this.stampProgress = stampProgress;
        this.stampList = stampList;

        /* START-USER-CTR-CODE */

        this.closeButton.on('release', () => this.scene.closeEndGame())

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public closeButton: Phaser.GameObjects.Image;
    public title: EndGameTitle;
    public coins: EndGameCoins;
    public stamps: EndGameStamps;
    public stampProgress: EndGameStampProgress;
    public stampList: EndGameStampList;

    /* START-USER-CODE */

    declare scene: Interface;

    setup(coins: number, stamps: number[], gameData: GameConfig): void {
        this.title.localize(gameData.name);
        this.coins.localize(coins);
        this.stamps.localize(gameData.name, stamps.length);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
