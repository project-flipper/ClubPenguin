
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import Mtn from "../Mtn";
/* END-USER-IMPORTS */

export default class FirstLane extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // seat1
        const seat1 = scene.add.image(-52.2, -20.7, "mtn", "mtn/firstlane_seat1");
        seat1.setOrigin(0, 0);
        seat1.visible = false;
        this.add(seat1);

        // mtn_firstlane_separator1
        const mtn_firstlane_separator1 = scene.add.image(-23.5125, 24.6375, "mtn", "mtn/firstlane_separator1");
        mtn_firstlane_separator1.setOrigin(0, 0);
        this.add(mtn_firstlane_separator1);

        // seat2
        const seat2 = scene.add.image(13.05, 34.425, "mtn", "mtn/firstlane_seat2");
        seat2.setOrigin(0, 0);
        seat2.visible = false;
        this.add(seat2);

        // mtn_firstlane_separator2
        const mtn_firstlane_separator2 = scene.add.image(53.8875, 69.4125, "mtn", "mtn/firstlane_separator2");
        mtn_firstlane_separator2.setOrigin(0, 0);
        this.add(mtn_firstlane_separator2);

        // seat3
        const seat3 = scene.add.image(85.975, 80.2375, "mtn", "mtn/firstlane_seat3");
        seat3.setOrigin(0, 0);
        seat3.visible = false;
        this.add(seat3);

        // mtn_firstlane_separator3
        const mtn_firstlane_separator3 = scene.add.image(120.0375, 113.9625, "mtn", "mtn/firstlane_separator3");
        mtn_firstlane_separator3.setOrigin(0, 0);
        this.add(mtn_firstlane_separator3);

        // seat4
        const seat4 = scene.add.image(172.6875, 116.55, "mtn", "mtn/firstlane_seat4");
        seat4.setOrigin(0, 0);
        seat4.visible = false;
        this.add(seat4);

        // btn
        const btn = scene.add.image(117.45, 92.025, "mtn", "mtn/firstlane_btn0004");
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

        this.seat1 = seat1;
        this.seat2 = seat2;
        this.seat3 = seat3;
        this.seat4 = seat4;
        this.btn = btn;

        /* START-USER-CTR-CODE */

        this.btn.on('out', () => this.scene.interface.hideHint());
        this.btn.on('over', () => this.scene.interface.showLocalizedHint(this.btn, 'sled_hint'));
        this.btn.on('release', () => {
            this.scene.interface.hideHint();
        });

        /* END-USER-CTR-CODE */
    }

    public seat1: Phaser.GameObjects.Image;
    public seat2: Phaser.GameObjects.Image;
    public seat3: Phaser.GameObjects.Image;
    public seat4: Phaser.GameObjects.Image;
    public btn: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Mtn;

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
