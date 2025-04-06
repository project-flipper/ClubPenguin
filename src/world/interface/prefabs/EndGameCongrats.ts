
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/components/ButtonComponent";
import EndGameTitle from "./EndGameTitle";
import EndGameCoins from "./EndGameCoins";
import EndGameStamps from "./EndGameStamps";
import EndGameStampList from "./EndGameStampList";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Interface from "../Interface";
import { GameConfig } from "@clubpenguin/app/config";
/* END-USER-IMPORTS */

export default class EndGameCongrats extends Phaser.GameObjects.Container {

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

        // stampList
        const stampList = new EndGameStampList(scene, 509.74, 552.38);
        this.add(stampList);

        // interface_endGameCoins
        const interface_endGameCoins = scene.add.image(521.44, 269.66, "interface", "interface/endGameDoubleCoins");
        interface_endGameCoins.setOrigin(0, 0);
        this.add(interface_endGameCoins);

        // interface_endGameStamps
        const interface_endGameStamps = scene.add.image(520.54, 422.66, "interface", "interface/endGameStamps");
        interface_endGameStamps.setOrigin(0, 0);
        this.add(interface_endGameStamps);

        // congrats
        const congrats = new TextBox(scene, 524.14, 766.01, "BurbankSmallBold");
        congrats.text = "Congratulations, all Aqua Grabber stamps earned. Double coin bonus!\nstamp stamp";
        congrats.fontSize = 36;
        congrats.align = 1;
        congrats.maxWidth = 666;
        this.add(congrats);

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/endGameClose0001"};
        closeButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/endGameClose0002"};
        closeButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/endGameClose0003"};
        closeButtonButtonComponent.handCursor = true;
        closeButtonButtonComponent.pixelPerfect = true;

        // congrats (prefab fields)
        congrats.boxWidth = 666;
        congrats.boxHeight = 130.5;
        congrats.horizontalAlign = 1;
        congrats.verticalAlign = 1;

        this.bg = bg;
        this.closeButton = closeButton;
        this.title = title;
        this.coins = coins;
        this.stamps = stamps;
        this.stampList = stampList;
        this.congrats = congrats;

        /* START-USER-CTR-CODE */

        this.closeButton.on('release', () => this.scene.closeEndGame())

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public closeButton: Phaser.GameObjects.Image;
    public title: EndGameTitle;
    public coins: EndGameCoins;
    public stamps: EndGameStamps;
    public stampList: EndGameStampList;
    public congrats: TextBox;

    /* START-USER-CODE */

    declare scene: Interface;

    setup(coins: number, stamps: number[], gameData: GameConfig): void {
        this.title.localize(gameData.name);
        this.coins.localize(coins, true);
        this.stamps.localize(gameData.name, stamps.length);
        this.scene.game.locale.immediate(locale => this.congrats.text = locale.localize('end_game_first_congrats').replace('%game_name%', gameData.name));
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
