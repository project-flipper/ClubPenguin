
// You can write more code here

/* START OF COMPILED CODE */

import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Interface from "../Interface";
/* END-USER-IMPORTS */

export default class EndGameTitle extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // titleShadow
        const titleShadow = new TextBox(scene, 2.25, 2.25, "BurbankSmallBold");
        titleShadow.tintFill = true;
        titleShadow.tintTopLeft = 12953;
        titleShadow.tintTopRight = 12953;
        titleShadow.tintBottomLeft = 12953;
        titleShadow.tintBottomRight = 12953;
        titleShadow.text = "Aqua Grabber";
        titleShadow.fontSize = 56.25;
        this.add(titleShadow);

        // title
        const title = new TextBox(scene, 0, 0, "BurbankSmallBold");
        title.text = "Aqua Grabber";
        title.fontSize = 56.25;
        this.add(title);

        // earned
        const earned = new TextBox(scene, 0, 62.89, "BurbankSmallMedium");
        earned.text = "You've earned:";
        earned.fontSize = 31.5;
        this.add(earned);

        // titleShadow (prefab fields)
        titleShadow.boxWidth = 732.825;
        titleShadow.boxHeight = 65.25;
        titleShadow.horizontalAlign = 1;
        titleShadow.verticalAlign = 1;

        // title (prefab fields)
        title.boxWidth = 732.825;
        title.boxHeight = 65.25;
        title.horizontalAlign = 1;
        title.verticalAlign = 1;

        // earned (prefab fields)
        earned.boxWidth = 732.825;
        earned.boxHeight = 65.25;
        earned.horizontalAlign = 1;
        earned.verticalAlign = 1;

        this.titleShadow = titleShadow;
        this.title = title;
        this.earned = earned;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public titleShadow: TextBox;
    public title: TextBox;
    public earned: TextBox;

    /* START-USER-CODE */

    declare scene: Interface;

    localize(name: string): void {
        this.scene.game.locale.immediate(locale => {
            this.title.text = name;
            this.titleShadow.text = name;
            this.earned.text = locale.localize('end_game_earned');
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
