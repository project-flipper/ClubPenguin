/* START OF COMPILED CODE */

import ButtonComponent from "../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ColorSwatch extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // contentFill
        const contentFill = scene.add.image(0, 0, "create", "create-module/swatchContentFill");
        contentFill.setOrigin(0, 0);
        this.add(contentFill);

        // selector
        const selector = scene.add.image(0, 0, "create", "create-module/swatchOutline");
        selector.setOrigin(0, 0);
        this.add(selector);

        // contentFill (components)
        const contentFillButtonComponent = new ButtonComponent(contentFill);
        contentFillButtonComponent.handCursor = true;

        this.contentFill = contentFill;
        this.selector = selector;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */

        // custom definition props
        this.color = "#ffffff";
    }

    public contentFill: Phaser.GameObjects.Image;
    public selector: Phaser.GameObjects.Image;
    public colorId: number = 0;

    /* START-USER-CODE */

    get color(): number {
        return this.contentFill.tintTopLeft;
    }

    set color(value: string | number) {
        if (typeof value === 'string') value = parseInt(value.substring(1), 16);
        this.contentFill.setTintFill(value);
    }

    private _selected: boolean;

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        if (value) this.selector.setFrame('create-module/swatchSelected');
        else this.selector.setFrame('create-module/swatchOutline');

        this._selected = value;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
