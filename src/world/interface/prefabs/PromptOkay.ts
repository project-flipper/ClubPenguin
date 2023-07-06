
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PromptOkay extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(456.75, 246.375, "interface", "interface/promptBg", 796.5, 364.5, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // okayButton
        const okayButton = scene.add.image(855, 492.975, "interface", "interface/promptOkayButton0001");
        this.add(okayButton);

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

        // ok
        const ok = new TextBox(scene, 775.0125, 463.5, "BurbankSmallMedium");
        ok.text = "Ok";
        ok.fontSize = -45;
        this.add(ok);

        // okayButton (components)
        const okayButtonButtonComponent = new ButtonComponent(okayButton);
        okayButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/promptOkayButton0001"};
        okayButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/promptOkayButton0002"};
        okayButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/promptOkayButton0003"};
        okayButtonButtonComponent.handCursor = true;
        okayButtonButtonComponent.pixelPerfect = true;

        // message (prefab fields)
        message.boxWidth = 642.15;
        message.boxHeight = 151.9875;
        message.horizontalAlign = 1;

        // ok (prefab fields)
        ok.boxWidth = 160.0875;
        ok.boxHeight = 63;
        ok.horizontalAlign = 1;

        this.bg = bg;
        this.okayButton = okayButton;
        this.message = message;
        this.ok = ok;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public okayButton: Phaser.GameObjects.Image;
    public message: TextBox;
    public ok: TextBox;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
