
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class Logo extends Phaser.Scene {

    constructor() {
        super("Logo");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("logo-pack", "assets/logo/logo-pack.json");
    }

    editorCreate(): void {

        // logo
        const logo = this.add.container(871.4249, 518.2875);

        // logoEn
        const logoEn = this.add.image(0, 0, "logo", "logo/logo");
        logo.add(logoEn);

        // logo_shine1
        const logo_shine1 = this.add.image(-551, 54, "logo", "logo/shine");
        logo.add(logo_shine1);

        // logo_shine2
        const logo_shine2 = this.add.image(-565, 54, "logo", "logo/shine");
        logo.add(logo_shine2);

        // logo_mask2
        const logo_mask2 = this.add.image(850.4249267578125, 569.2874755859375, "logo", "logo/mask2");
        logo_mask2.visible = false;

        // logo_mask1
        const logo_mask1 = this.add.image(850.4249267578125, 569.2874755859375, "logo", "logo/mask");
        logo_mask1.visible = false;

        this.logoEn = logoEn;
        this.logo_shine1 = logo_shine1;
        this.logo_shine2 = logo_shine2;
        this.logo = logo;
        this.logo_mask2 = logo_mask2;
        this.logo_mask1 = logo_mask1;

        this.events.emit("scene-awake");
    }

    public logoEn!: Phaser.GameObjects.Image;
    public logo_shine1!: Phaser.GameObjects.Image;
    public logo_shine2!: Phaser.GameObjects.Image;
    public logo!: Phaser.GameObjects.Container;
    public logo_mask2!: Phaser.GameObjects.Image;
    public logo_mask1!: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    // Write your code here

    public animation: Phaser.Tweens.Tween;
    public shine1: Phaser.Tweens.Tween;
    public shine2: Phaser.Tweens.Tween;

    init(data: any): void {
        if (data?.oninit) data.oninit(this);
    }

    create(): void {

        this.hide();

        this.editorCreate();

        this.logo_shine1.setBlendMode(Phaser.BlendModes.ADD);
        this.logo_shine2.setBlendMode(Phaser.BlendModes.ADD);

        let mask1 = this.logo_mask1.createBitmapMask();
        this.logo_shine1.mask = mask1;

        let mask2 = this.logo_mask2.createBitmapMask();
        this.logo_shine2.mask = mask2;
    }

    show(): void {
        this.scene.setVisible(true);

        this.animation = this.tweens.add({
            targets: [this.logo, this.logo_mask1, this.logo_mask2],
            scale: 1.09842733,
            duration: 7625,
            onComplete: () => this.hide()
        });

        this.shine1 = this.tweens.add({
            targets: this.logo_shine1,
            x: { from: -539, to: 543 },
            ease: 'Sine.In',
            duration: 1125,
            delay: 2958
        });
        this.shine2 = this.tweens.add({
            targets: this.logo_shine2,
            x: { from: -499, to: 543 },
            ease: 'Sine.In',
            duration: 1083,
            delay: 3083
        });
    }

    hide(): void {
        this.scene.setVisible(false);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
