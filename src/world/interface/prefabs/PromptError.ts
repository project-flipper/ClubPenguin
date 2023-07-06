
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PromptError extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(456.75, 246.375, "interface", "interface/promptErrorBg", 796.5, 364.5, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // okButton
        const okButton = scene.add.image(855, 492.975, "interface", "interface/promptErrorButton0001");
        this.add(okButton);

        // okay
        const okay = new TextBox(scene, 775.0125, 463.5, "BurbankSmallMedium");
        okay.text = "Ok";
        okay.fontSize = -45;
        this.add(okay);

        // message
        const message = new TextBox(scene, 533.925, 309.7125, "BurbankSmallMedium");
        message.tintFill = true;
        message.tintTopLeft = 0;
        message.tintTopRight = 0;
        message.tintBottomLeft = 0;
        message.tintBottomRight = 0;
        message.text = "Message goes here\nMessage goes here";
        message.fontSize = -36;
        this.add(message);

        // okButton (components)
        const okButtonButtonComponent = new ButtonComponent(okButton);
        okButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/promptErrorButton0001"};
        okButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/promptErrorButton0002"};
        okButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/promptErrorButton0003"};
        okButtonButtonComponent.handCursor = true;
        okButtonButtonComponent.pixelPerfect = true;

        // okay (prefab fields)
        okay.boxWidth = 160.0875;
        okay.boxHeight = 63;
        okay.horizontalAlign = 1;

        // message (prefab fields)
        message.boxWidth = 642.15;
        message.boxHeight = 151.9875;
        message.horizontalAlign = 1;

        this.bg = bg;
        this.okButton = okButton;
        this.okay = okay;
        this.message = message;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public okButton: Phaser.GameObjects.Image;
    public okay: TextBox;
    public message: TextBox;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
