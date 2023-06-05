/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PaperdollAlternate extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // contentFill
        const contentFill = scene.add.image(0, 0, "create", "create-module/paperdollAlternateContentFill");
        contentFill.setOrigin(0, 0);
        this.add(contentFill);

        // outline
        const outline = scene.add.image(0, 0, "create", "create-module/paperdollAlternateOutline");
        outline.setOrigin(0, 0);
        this.add(outline);

        this.contentFill = contentFill;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public contentFill: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
