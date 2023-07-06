
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PromptQuestion extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(456.75, 246.375, "interface", "interface/promptBg", 796.5, 364.5, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // yesButton
        const yesButton = scene.add.image(732.2625, 493.0875, "interface", "interface/promptButton0001");
        this.add(yesButton);

        // noButton
        const noButton = scene.add.image(979.7625, 493.0875, "interface", "interface/promptButton0001");
        this.add(noButton);

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

        // yes
        const yes = new TextBox(scene, 652.275, 463.5, "BurbankSmallMedium");
        yes.text = "Yes";
        yes.fontSize = -45;
        this.add(yes);

        // no
        const no = new TextBox(scene, 899.775, 463.5, "BurbankSmallMedium");
        no.text = "No";
        no.fontSize = -45;
        this.add(no);

        // yesButton (components)
        const yesButtonButtonComponent = new ButtonComponent(yesButton);
        yesButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/promptButton0001"};
        yesButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/promptButton0002"};
        yesButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/promptButton0003"};
        yesButtonButtonComponent.handCursor = true;
        yesButtonButtonComponent.pixelPerfect = true;

        // noButton (components)
        const noButtonButtonComponent = new ButtonComponent(noButton);
        noButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/promptButton0001"};
        noButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/promptButton0002"};
        noButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/promptButton0003"};
        noButtonButtonComponent.handCursor = true;
        noButtonButtonComponent.pixelPerfect = true;

        // message (prefab fields)
        message.boxWidth = 642.15;
        message.boxHeight = 151.9875;
        message.horizontalAlign = 1;

        // yes (prefab fields)
        yes.boxWidth = 160.0875;
        yes.boxHeight = 63;
        yes.horizontalAlign = 1;

        // no (prefab fields)
        no.boxWidth = 160.0875;
        no.boxHeight = 63.675;
        no.horizontalAlign = 1;

        this.bg = bg;
        this.yesButton = yesButton;
        this.noButton = noButton;
        this.message = message;
        this.yes = yes;
        this.no = no;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public yesButton: Phaser.GameObjects.Image;
    public noButton: Phaser.GameObjects.Image;
    public message: TextBox;
    public yes: TextBox;
    public no: TextBox;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
