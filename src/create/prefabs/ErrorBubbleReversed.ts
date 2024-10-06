/* START OF COMPILED CODE */

import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class ErrorBubbleReversed extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // graphic
        const graphic = scene.add.image(0, 0, "create", "create-module/errorBubbleReversed");
        graphic.setOrigin(0.3746374, 0.125125);
        this.add(graphic);

        // textBox
        const textBox = new TextBox(scene, -156, 23, "BurbankSmallBold");
        textBox.setOrigin(0, 0);
        textBox.tintTopLeft = 6710886;
        textBox.tintTopRight = 6710886;
        textBox.tintBottomLeft = 6710886;
        textBox.tintBottomRight = 6710886;
        textBox.text = "Example error";
        textBox.fontSize = -18;
        this.add(textBox);

        // textBox (prefab fields)
        textBox.boxWidth = 440;
        textBox.boxHeight = 88.7625;
        textBox.horizontalAlign = 1;
        textBox.verticalAlign = 1;

        this.textBox = textBox;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public textBox: TextBox;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
