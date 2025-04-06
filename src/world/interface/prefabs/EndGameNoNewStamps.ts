
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/components/ButtonComponent";
import EndGameTitle from "./EndGameTitle";
import EndGameCoins from "./EndGameCoins";
import EndGameStamps from "./EndGameStamps";
import EndGameStampProgress from "./EndGameStampProgress";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Interface from "../Interface";
import { GameConfig } from "@clubpenguin/app/config";
/* END-USER-IMPORTS */

export default class EndGameNoNewStamps extends Phaser.GameObjects.Container {

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

        // interface_endGameCoins
        const interface_endGameCoins = scene.add.image(521.44, 269.66, "interface", "interface/endGameCoins");
        interface_endGameCoins.setOrigin(0, 0);
        this.add(interface_endGameCoins);

        // interface_endGameStamps
        const interface_endGameStamps = scene.add.image(520.54, 422.66, "interface", "interface/endGameStamps");
        interface_endGameStamps.setOrigin(0, 0);
        this.add(interface_endGameStamps);

        // progress
        const progress = new EndGameStampProgress(scene, 855, 578.25);
        this.add(progress);

        // stampButton
        const stampButton = scene.add.image(859.5, 741.71, "interface", "interface/endGameStampButton0001");
        this.add(stampButton);

        // interface_endGameStampButtonIcon
        const interface_endGameStampButtonIcon = scene.add.image(574.2, 684.23, "interface", "interface/endGameStampButtonIcon");
        interface_endGameStampButtonIcon.setOrigin(0, 0);
        this.add(interface_endGameStampButtonIcon);

        // title_1
        const title_1 = new TextBox(scene, 705.26, 717.08, "BurbankSmallBold");
        title_1.text = "How to earn stamps\n";
        title_1.fontSize = 38.25;
        this.add(title_1);

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/endGameClose0001"};
        closeButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/endGameClose0002"};
        closeButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/endGameClose0003"};
        closeButtonButtonComponent.handCursor = true;
        closeButtonButtonComponent.pixelPerfect = true;

        // stampButton (components)
        const stampButtonButtonComponent = new ButtonComponent(stampButton);
        stampButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/endGameStampButton0001"};
        stampButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/endGameStampButton0002"};
        stampButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/endGameStampButton0003"};
        stampButtonButtonComponent.handCursor = true;
        stampButtonButtonComponent.pixelPerfect = true;

        // title_1 (prefab fields)
        title_1.boxWidth = 453.4875;
        title_1.boxHeight = 47.25;
        title_1.horizontalAlign = 0;
        title_1.verticalAlign = 1;

        this.bg = bg;
        this.closeButton = closeButton;
        this.title = title;
        this.coins = coins;
        this.stamps = stamps;
        this.progress = progress;
        this.stampButton = stampButton;
        this.title_1 = title_1;

        /* START-USER-CTR-CODE */

        this.closeButton.on('release', () => this.scene.closeEndGame())

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public closeButton: Phaser.GameObjects.Image;
    public title: EndGameTitle;
    public coins: EndGameCoins;
    public stamps: EndGameStamps;
    public progress: EndGameStampProgress;
    public stampButton: Phaser.GameObjects.Image;
    public title_1: TextBox;

    /* START-USER-CODE */

    declare scene: Interface;

    setup(coins: number, stamps: number[], gameData: GameConfig): void {
        this.title.localize(gameData.name);
        this.coins.localize(coins);
        this.stamps.localize(gameData.name, stamps.length);
        this.scene.game.locale.immediate(locale => this.title_1.text = locale.localize('end_game_howto_btn'));
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
