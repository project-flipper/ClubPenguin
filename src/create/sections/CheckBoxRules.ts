/* START OF COMPILED CODE */

import Phaser from "phaser";
import Checkbox from "../prefabs/Checkbox";
import ErrorBubbleReversed from "../prefabs/ErrorBubbleReversed";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CheckBoxRules extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // checkbox
        const checkbox = new Checkbox(scene, 0, 0);
        this.add(checkbox);

        // text1
        const text1 = scene.add.bitmapText(49.5, 4.5, "BurbankSmallBold", "I agree to the ");
        text1.tintTopLeft = 6710886;
        text1.tintTopRight = 6710886;
        text1.tintBottomLeft = 6710886;
        text1.tintBottomRight = 6710886;
        text1.text = "I agree to the ";
        text1.fontSize = -18;
        this.add(text1);

        // link1
        const link1 = scene.add.bitmapText(173.36, 2.25, "BurbankSmallBold", "CLUB PENGUIN RULES");
        link1.tintTopLeft = 86940;
        link1.tintTopRight = 86940;
        link1.tintBottomLeft = 86940;
        link1.tintBottomRight = 86940;
        link1.text = "CLUB PENGUIN RULES";
        link1.fontSize = -20.25;
        this.add(link1);

        // errorBubble
        const errorBubble = new ErrorBubbleReversed(scene, 45.3375, 18);
        errorBubble.visible = false;
        this.add(errorBubble);

        // checkbox (prefab fields)
        checkbox.handCursor = true;

        this.checkbox = checkbox;
        this.text1 = text1;
        this.link1 = link1;
        this.errorBubble = errorBubble;

        /* START-USER-CTR-CODE */

        link1.setInteractive({ useHandCursor: true });
        link1.on('pointerup', () => { if (window.jsAPI) window.jsAPI.showRules() });

        this.setLayout();

        /* END-USER-CTR-CODE */
    }

    public checkbox: Checkbox;
    public text1: Phaser.GameObjects.BitmapText;
    public link1: Phaser.GameObjects.BitmapText;
    public errorBubble: ErrorBubbleReversed;

    /* START-USER-CODE */

    setText(text1: string, link1: string): void {
        this.text1.text = text1;
        this.link1.text = link1;

        this.setLayout();
    }

    setLayout(): void {
        this.link1.x = this.text1.x + this.text1.width;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
