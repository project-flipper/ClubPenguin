/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Paperdoll extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // contentFill
        const contentFill = scene.add.image(0, 0, "create", "create-module/paperdollContentFill");
        contentFill.setOrigin(0, 0);
        this.add(contentFill);

        // outline
        const outline = scene.add.image(0, 0, "create", "create-module/paperdollOutline");
        outline.setOrigin(0, 0);
        this.add(outline);

        this.contentFill = contentFill;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public contentFill: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    public tween?: Phaser.Tweens.Tween;

    setColor(color: number): void {
        let startColor = this.contentFill.tintTopLeft;

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            onUpdate: tween => {
                let fromColor = Phaser.Display.Color.IntegerToColor(startColor);
                let toColor = Phaser.Display.Color.IntegerToColor(color);

                let tint = Phaser.Display.Color.Interpolate.ColorWithColor(fromColor, toColor, 100, tween.getValue());
                let value = Phaser.Display.Color.ObjectToColor(tint).color;

                this.contentFill.setTintFill(value);
            },
            duration: 300,
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
