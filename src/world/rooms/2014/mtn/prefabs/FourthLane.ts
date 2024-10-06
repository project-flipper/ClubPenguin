
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import Phaser from "phaser";

import Mtn from "../Mtn";
/* END-USER-IMPORTS */

export default class FourthLane extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // seat2
        const seat2 = scene.add.image(-51.4125, -20.3625, "mtn", "mtn/fourthlane_seat2");
        seat2.setOrigin(0, 0);
        seat2.visible = false;
        this.add(seat2);

        // mtn_fourthlane_separator_png
        const mtn_fourthlane_separator_png = scene.add.image(-86.7375, 3.6, "mtn", "mtn/fourthlane_separator.png");
        mtn_fourthlane_separator_png.setOrigin(0, 0);
        this.add(mtn_fourthlane_separator_png);

        // seat1
        const seat1 = scene.add.image(-141.75, 10.4625, "mtn", "mtn/fourthlane_seat1");
        seat1.setOrigin(0, 0);
        seat1.visible = false;
        this.add(seat1);

        // btn
        const btn = scene.add.image(-37.125, 32.5125, "mtn", "mtn/fourthlane_btn0004");
        btn.alpha = 0.01;
        btn.alphaTopLeft = 0.01;
        btn.alphaTopRight = 0.01;
        btn.alphaBottomLeft = 0.01;
        btn.alphaBottomRight = 0.01;
        this.add(btn);

        // btn (components)
        const btnButtonComponent = new ButtonComponent(btn);
        btnButtonComponent.handCursor = true;
        btnButtonComponent.pixelPerfect = true;

        this.seat2 = seat2;
        this.seat1 = seat1;
        this.btn = btn;

        /* START-USER-CTR-CODE */

        this.btn.on('out', () => this.scene.interface.hideHint());
        this.btn.on('over', () => this.scene.interface.showLocalizedHint(this.btn, 'sled_hint'));
        this.btn.on('release', () => {
            this.scene.interface.hideHint();
        });

        /* END-USER-CTR-CODE */
    }

    public seat2: Phaser.GameObjects.Image;
    public seat1: Phaser.GameObjects.Image;
    public btn: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Mtn;

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
