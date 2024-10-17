
// You can write more code here

/* START OF COMPILED CODE */

import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Interface from "../Interface";
/* END-USER-IMPORTS */

export default class EndGameStamps extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // earnedShadow
        const earnedShadow = new TextBox(scene, 132.75, 22.5);
        earnedShadow.tintFill = true;
        earnedShadow.tintTopLeft = 13209;
        earnedShadow.tintTopRight = 13209;
        earnedShadow.tintBottomLeft = 13209;
        earnedShadow.tintBottomRight = 13209;
        earnedShadow.text = "0 of 25";
        earnedShadow.fontSize = -45;
        this.add(earnedShadow);

        // earned
        const earned = new TextBox(scene, 128.25, 18);
        earned.text = "0 of 25";
        earned.fontSize = -45;
        this.add(earned);

        // total
        const total = new TextBox(scene, 132.3, 75.83, "BurbankSmallMedium");
        total.text = "Your total coins: 888 888 888";
        total.fontSize = -31.5;
        this.add(total);

        // earnedShadow (prefab fields)
        earnedShadow.boxWidth = 594.675;
        earnedShadow.boxHeight = 54;
        earnedShadow.horizontalAlign = 0;
        earnedShadow.verticalAlign = 1;

        // earned (prefab fields)
        earned.boxWidth = 594.675;
        earned.boxHeight = 54;
        earned.horizontalAlign = 0;
        earned.verticalAlign = 1;

        // total (prefab fields)
        total.boxWidth = 585.45;
        total.boxHeight = 42.75;
        total.horizontalAlign = 0;
        total.verticalAlign = 1;

        this.earnedShadow = earnedShadow;
        this.earned = earned;
        this.total = total;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public earnedShadow: TextBox;
    public earned: TextBox;
    public total: TextBox;

    /* START-USER-CODE */

    declare scene: Interface;

    localize(name: string, amount: number): void {
        this.scene.game.locale.immediate(locale => {
            this.earned.text = locale.localize('end_game_stamps_earned').replace('%num%', amount.toString()).replace('%total%', '0');
            this.earnedShadow.text = this.earned.text;
            this.total.text = locale.localize('game_name_stamps').replace('%game_name%', name);
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
