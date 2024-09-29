
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class MemberBadge extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // interface_member_badge
        const interface_member_badge = scene.add.image(-52.65, -42.6375, "interface", "interface/member_badge");
        interface_member_badge.setOrigin(0, 0);
        this.add(interface_member_badge);

        // chevron
        const chevron = scene.add.image(-31.05, 22.8375, "interface", "interface/chevron0002");
        chevron.setOrigin(0, 0);
        chevron.visible = false;
        this.add(chevron);

        // ribbon
        const ribbon = scene.add.image(-45.5625, 4.275, "interface", "interface/member_ribbon0001");
        ribbon.setOrigin(0, 0);
        this.add(ribbon);

        this.chevron = chevron;
        this.ribbon = ribbon;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public chevron: Phaser.GameObjects.Image;
    public ribbon: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    setLevel(value: number): void {
        value = Math.min(Math.max(value, 0), 5);
        if (value > 1) {
            this.chevron.setFrame(`interface/chevron${value.toString().padStart(4, '0')}`);
            this.chevron.visible = true;
        } else {
            this.chevron.visible = false;
            return;
        }
    }

    localize(locale: Locale): void {
        this.ribbon.setFrame(`interface/member_ribbon${locale.frame}`);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
