/* START OF COMPILED CODE */

import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ErrorBubbleModified extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // graphic
        const graphic = scene.add.image(0, 0, "create", "create-module/errorBubbleModified");
        graphic.setOrigin(0.5, 0.17801047);
        this.add(graphic);

        // textBox
        const textBox = new TextBox(scene, -247.95, 1.2375, "BurbankSmallBold");
        textBox.setOrigin(0, 0);
        textBox.tintTopLeft = 6710886;
        textBox.tintTopRight = 6710886;
        textBox.tintBottomLeft = 6710886;
        textBox.tintBottomRight = 6710886;
        textBox.text = "Example error";
        textBox.fontSize = -18;
        this.add(textBox);

        // textBox (prefab fields)
        textBox.boxWidth = 495.9;
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
