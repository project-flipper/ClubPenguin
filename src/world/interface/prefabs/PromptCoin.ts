
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PromptCoin extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(456.75, 166.5, "interface", "interface/promptBg", 796.5, 657, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // okayButton
        const okayButton = scene.add.image(855, 686.475, "interface", "interface/promptOkayButton0001");
        this.add(okayButton);

        // icon
        const icon = scene.add.container(858.2625, 336.15);
        this.add(icon);

        // okay
        const okay = new TextBox(scene, 775.0125, 657, "BurbankSmallMedium");
        okay.text = "Ok";
        okay.fontSize = -45;
        this.add(okay);

        // message
        const message = new TextBox(scene, 534.9375, 458.2125, "BurbankSmallMedium");
        message.tintFill = true;
        message.tintTopLeft = 0;
        message.tintTopRight = 0;
        message.tintBottomLeft = 0;
        message.tintBottomRight = 0;
        message.text = "You found a party hat.\nWould you like to pick it up?";
        message.fontSize = -36;
        this.add(message);

        // okayButton (components)
        const okayButtonButtonComponent = new ButtonComponent(okayButton);
        okayButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/promptOkayButton0001"};
        okayButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/promptOkayButton0002"};
        okayButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/promptOkayButton0003"};
        okayButtonButtonComponent.handCursor = true;
        okayButtonButtonComponent.pixelPerfect = true;

        // okay (prefab fields)
        okay.boxWidth = 160.0875;
        okay.boxHeight = 63;
        okay.horizontalAlign = 1;

        // message (prefab fields)
        message.boxWidth = 642.15;
        message.boxHeight = 151.9875;
        message.horizontalAlign = 1;

        this.bg = bg;
        this.okayButton = okayButton;
        this.icon = icon;
        this.okay = okay;
        this.message = message;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public okayButton: Phaser.GameObjects.Image;
    public icon: Phaser.GameObjects.Container;
    public okay: TextBox;
    public message: TextBox;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
