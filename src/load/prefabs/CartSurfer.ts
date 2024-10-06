/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class CartSurfer extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // rails
        const rails = scene.add.sprite(708.2624999999999, 520.5625, "load", "load-screen/cartsurfer-rails0001");
        rails.setOrigin(0, 0);
        this.add(rails);

        // mainCart
        const mainCart = scene.add.container(723.15, 255.7125);
        this.add(mainCart);

        // leftFrontWheel
        const leftFrontWheel = scene.add.sprite(188.82500000000002, 247.13750000000002, "load", "load-screen/cartsurfer-cartleftfrontwheel0001");
        leftFrontWheel.setOrigin(0, 0);
        mainCart.add(leftFrontWheel);

        // cart
        const cart = scene.add.sprite(0, -3, "load", "load-screen/cartsurfer-maincart0001");
        cart.setOrigin(0, 0);
        mainCart.add(cart);

        // flip
        const flip = scene.add.sprite(-51, -62.5, "load", "load-screen/cartsurfer-flip0001");
        flip.setOrigin(0, 0);
        flip.visible = false;
        mainCart.add(flip);

        // rightBackWheel
        const rightBackWheel = scene.add.sprite(24.412499999999998, 243.9125, "load", "load-screen/cartsurfer-cartrightbackwheel0001");
        rightBackWheel.setOrigin(0, 0);
        mainCart.add(rightBackWheel);

        // rightBackWheelTap
        const rightBackWheelTap = scene.add.image(21, 256, "load", "load-screen/cartsurfer-cartrightbackwheeltap");
        rightBackWheelTap.setOrigin(0, 0);
        mainCart.add(rightBackWheelTap);

        // rightFrontWheel
        const rightFrontWheel = scene.add.sprite(68.175, 247.175, "load", "load-screen/cartsurfer-cartrightfrontwheel0001");
        rightFrontWheel.setOrigin(0, 0);
        mainCart.add(rightFrontWheel);

        // rightFrontWheelTap
        const rightFrontWheelTap = scene.add.image(62.775, 264.72499999999997, "load", "load-screen/cartsurfer-cartrightfrontwheeltap");
        rightFrontWheelTap.setOrigin(0, 0);
        mainCart.add(rightFrontWheelTap);

        // cartFront
        const cartFront = scene.add.sprite(81.825, 139.17499999999998, "load", "load-screen/cartsurfer-cartfront0001");
        cartFront.setOrigin(0, 0);
        mainCart.add(cartFront);

        // cartFrontFlip
        const cartFrontFlip = scene.add.sprite(-51, -62.5, "load", "load-screen/cartsurfer-flipcartfront0054");
        cartFrontFlip.setOrigin(0, 0);
        cartFrontFlip.visible = false;
        mainCart.add(cartFrontFlip);

        // puffleHair
        const puffleHair = scene.add.sprite(79.8499755859375, -1.712493896484375, "load", "load-screen/cartsurfer-pufflehair0001");
        puffleHair.setOrigin(0, 0);
        mainCart.add(puffleHair);

        this.rails = rails;
        this.leftFrontWheel = leftFrontWheel;
        this.cart = cart;
        this.flip = flip;
        this.rightBackWheel = rightBackWheel;
        this.rightBackWheelTap = rightBackWheelTap;
        this.rightFrontWheel = rightFrontWheel;
        this.rightFrontWheelTap = rightFrontWheelTap;
        this.cartFront = cartFront;
        this.cartFrontFlip = cartFrontFlip;
        this.puffleHair = puffleHair;

        /* START-USER-CTR-CODE */

        this.flip.on('animationupdate', this.updateAnimationStep, this);

        /* END-USER-CTR-CODE */
    }

    private rails: Phaser.GameObjects.Sprite;
    private leftFrontWheel: Phaser.GameObjects.Sprite;
    private cart: Phaser.GameObjects.Sprite;
    private flip: Phaser.GameObjects.Sprite;
    private rightBackWheel: Phaser.GameObjects.Sprite;
    private rightBackWheelTap: Phaser.GameObjects.Image;
    private rightFrontWheel: Phaser.GameObjects.Sprite;
    private rightFrontWheelTap: Phaser.GameObjects.Image;
    private cartFront: Phaser.GameObjects.Sprite;
    private cartFrontFlip: Phaser.GameObjects.Sprite;
    private puffleHair: Phaser.GameObjects.Sprite;

    /* START-USER-CODE */

    startAnimation(): void {
        this.rails.play('load-cartsurfer-rails-animation');
        this.flip.play('load-cartsurfer-flip-animation');
    }

    updateAnimationStep(animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index < 33) {
            this.flip.visible = false;
            this.cartFrontFlip.visible = false;

            if (!this.isPlayingPreFlipAnimations) this.playPreFlipAnimations();

            this.cart.visible = true;
            this.cartFront.visible = true;
            this.puffleHair.visible = true;
        } else {
            this.cart.visible = false;
            this.cartFront.visible = false;
            this.puffleHair.visible = false;

            if (this.isPlayingPreFlipAnimations) this.stopPreFlipAnimations();

            let siblingAnim = this.scene.anims.get('load-cartsurfer-flipcartfront-animation');
            let siblingFrame = siblingAnim.frames[frame.index - 1];
            this.cartFrontFlip.anims.setCurrentFrame(siblingFrame);

            this.flip.visible = true;
            this.cartFrontFlip.visible = true;
        }

        if (frame.index > 49 || frame.index < 33) {
            this.leftFrontWheel.visible = true;
            this.rightFrontWheel.visible = true;
            this.rightBackWheel.visible = true;
            this.rightBackWheelTap.visible = true;
            this.rightFrontWheelTap.visible = true;
        } else {
            this.leftFrontWheel.visible = false;
            this.rightFrontWheel.visible = false;
            this.rightBackWheel.visible = false;
            this.rightBackWheelTap.visible = false;
            this.rightFrontWheelTap.visible = false;
        }
    }

    playPreFlipAnimations(): void {
        this.cart.play('load-cartsurfer-maincart-animation');
        this.leftFrontWheel.play('load-cartsurfer-leftfrontwheel-animation');
        this.rightFrontWheel.play('load-cartsurfer-rightfrontwheel-animation');
        this.rightBackWheel.play('load-cartsurfer-rightbackwheel-animation');
        this.cartFront.play('load-cartsurfer-cartfront-animation');
        this.puffleHair.play('load-cartsurfer-pufflehair-animation');
    }

    get isPlayingPreFlipAnimations(): boolean {
        return (
            this.cart.anims.isPlaying &&
            this.leftFrontWheel.anims.isPlaying &&
            this.rightFrontWheel.anims.isPlaying &&
            this.rightBackWheel.anims.isPlaying &&
            this.cartFront.anims.isPlaying &&
            this.puffleHair.anims.isPlaying
        )
    }

    stopPreFlipAnimations(): void {
        this.cart.stop();
        this.leftFrontWheel.stop();
        this.rightFrontWheel.stop();
        this.rightBackWheel.stop();
        this.cartFront.stop();
        this.puffleHair.stop();
    }

    stopAnimation(): void {
        this.rails.stop();
        this.flip.stop();
        this.stopPreFlipAnimations();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
