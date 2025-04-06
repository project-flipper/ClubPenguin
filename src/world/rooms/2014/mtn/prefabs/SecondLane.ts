
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import Mtn from "../Mtn";
import WaddleTrigger from "@clubpenguin/lib/components/WaddleTrigger";
/* END-USER-IMPORTS */

export default class SecondLane extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // seat1
        const seat1 = scene.add.image(-162.7875, -6.3, "mtn2014", "mtn/secondlane_seat1");
        seat1.setOrigin(0, 0);
        seat1.visible = false;
        this.add(seat1);

        // mtn_secondlane_separator1
        const mtn_secondlane_separator1 = scene.add.image(-81.1125, 0.45, "mtn2014", "mtn/secondlane_separator1");
        mtn_secondlane_separator1.setOrigin(0, 0);
        this.add(mtn_secondlane_separator1);

        // seat2
        const seat2 = scene.add.image(-57.6, 5.625, "mtn2014", "mtn/secondlane_seat2");
        seat2.setOrigin(0, 0);
        seat2.visible = false;
        this.add(seat2);

        // seat3
        const seat3 = scene.add.image(47.5875, 7.9875, "mtn2014", "mtn/secondlane_seat3");
        seat3.setOrigin(0, 0);
        seat3.visible = false;
        this.add(seat3);

        // mtn_secondlane_separator2
        const mtn_secondlane_separator2 = scene.add.image(43.3125, 4.95, "mtn2014", "mtn/secondlane_separator2");
        mtn_secondlane_separator2.setOrigin(0, 0);
        this.add(mtn_secondlane_separator2);

        // btn
        const btn = scene.add.image(-7.875, 37.575, "mtn2014", "mtn/secondlane_btn0004");
        btn.alpha = 0.0001;
        btn.alphaTopLeft = 0.0001;
        btn.alphaTopRight = 0.0001;
        btn.alphaBottomLeft = 0.0001;
        btn.alphaBottomRight = 0.0001;
        this.add(btn);

        // btn (components)
        const btnButtonComponent = new ButtonComponent(btn);
        btnButtonComponent.handCursor = true;
        btnButtonComponent.pixelPerfect = true;

        this.seat1 = seat1;
        this.seat2 = seat2;
        this.seat3 = seat3;
        this.btn = btn;

        /* START-USER-CTR-CODE */

        this.btn.on('out', () => this.scene.interface.hideHint());
        this.btn.on('over', () => this.scene.interface.showLocalizedHint(this.btn, 'sled_hint'));
        this.btn.on('release', () => {
            this.scene.interface.hideHint();
            this.scene.world.move(724.5, 706.5);
        });

        this.scene.events.on('waddle:join', this.updateWaddle, this);
        this.scene.events.on('waddle:leave', this.updateWaddle, this);

        /* END-USER-CTR-CODE */
    }

    public seat1: Phaser.GameObjects.Image;
    public seat2: Phaser.GameObjects.Image;
    public seat3: Phaser.GameObjects.Image;
    public btn: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Mtn;

    updateWaddle(waddle: WaddleTrigger): void {
        if (waddle.waddle_id == 101) {
            this.seat1.visible = waddle.seats[0].player != null;
            this.seat2.visible = waddle.seats[1].player != null;
            this.seat3.visible = waddle.seats[2].player != null;
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
