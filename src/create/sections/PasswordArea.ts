/* START OF COMPILED CODE */

import Phaser from "phaser";
import SmallProgressBubble from "../prefabs/SmallProgressBubble";
import ErrorBubble from "../prefabs/ErrorBubble";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PasswordArea extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // progressBubble
        const progressBubble = new SmallProgressBubble(scene, 0, 0);
        this.add(progressBubble);

        // title
        const title = scene.add.bitmapText(112.5, 19.6875, "BurbankSmallBold", "Create Password:");
        title.tintTopLeft = 2894894;
        title.tintTopRight = 2894894;
        title.tintBottomLeft = 2894894;
        title.tintBottomRight = 2894894;
        title.text = "Create Password:";
        title.fontSize = -27;
        this.add(title);

        // field1Graphic
        const field1Graphic = scene.add.image(108, 59.7375, "create", "create-module/passwordField");
        field1Graphic.setOrigin(0, 0);
        this.add(field1Graphic);

        // placeholder1
        const placeholder1 = scene.add.bitmapText(119.25, 79.9875, "BurbankSmallBold", "Enter Password");
        placeholder1.tintTopLeft = 13882584;
        placeholder1.tintTopRight = 13882584;
        placeholder1.tintBottomLeft = 13882584;
        placeholder1.tintBottomRight = 13882584;
        placeholder1.text = "Enter Password";
        placeholder1.fontSize = -27;
        this.add(placeholder1);

        // field2Graphic
        const field2Graphic = scene.add.image(108, 133.99, "create", "create-module/passwordField");
        field2Graphic.setOrigin(0, 0);
        this.add(field2Graphic);

        // placeholder2
        const placeholder2 = scene.add.bitmapText(119.25, 154.2375, "BurbankSmallBold", "Confirm Password");
        placeholder2.tintTopLeft = 13882584;
        placeholder2.tintTopRight = 13882584;
        placeholder2.tintBottomLeft = 13882584;
        placeholder2.tintBottomRight = 13882584;
        placeholder2.text = "Confirm Password";
        placeholder2.fontSize = -27;
        this.add(placeholder2);

        // errorBubble
        const errorBubble = new ErrorBubble(scene, 391.3875, -32.175);
        errorBubble.visible = false;
        this.add(errorBubble);

        // progressBubble (prefab fields)
        progressBubble.text = "3.";

        this.progressBubble = progressBubble;
        this.title = title;
        this.field1Graphic = field1Graphic;
        this.placeholder1 = placeholder1;
        this.field2Graphic = field2Graphic;
        this.placeholder2 = placeholder2;
        this.errorBubble = errorBubble;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public progressBubble: SmallProgressBubble;
    public title: Phaser.GameObjects.BitmapText;
    public field1Graphic: Phaser.GameObjects.Image;
    public placeholder1: Phaser.GameObjects.BitmapText;
    public field2Graphic: Phaser.GameObjects.Image;
    public placeholder2: Phaser.GameObjects.BitmapText;
    public errorBubble: ErrorBubble;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
