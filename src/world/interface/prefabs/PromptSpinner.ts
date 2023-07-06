
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PromptSpinner extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(456.75, 246.375, "interface", "interface/promptBg", 796.5, 364.5, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // spinner
        const spinner = scene.add.sprite(855, 428.625, "interface", "interface/promptSpinner0001");
        this.add(spinner);

        this.bg = bg;
        this.spinner = spinner;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public spinner: Phaser.GameObjects.Sprite;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
