/* START OF COMPILED CODE */

import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SmallProgressBubble extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // graphic
        const graphic = scene.add.image(0, 0, "create", "create-module/smallProgressBubble");
        graphic.setOrigin(0, 0);
        this.add(graphic);

        // label
        const label = new TextBox(scene, 15.75, 11.25, "BurbankSmallBold");
        label.text = "1.";
        label.fontSize = -40.5;
        this.add(label);

        // label (prefab fields)
        label.boxWidth = 90;
        label.boxHeight = 50.625;

        this.label = label;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */

        // custom definition props
        this.text = "1.";
    }

    public label: TextBox;

    /* START-USER-CODE */

    get text(): string {
        return this.label.text;
    }

    set text(value: string) {
        this.label.text = value;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
