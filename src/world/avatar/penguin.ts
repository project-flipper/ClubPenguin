import Phaser from "phaser";

/* START OF COMPILED CODE */

import ButtonComponent from "../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import { Avatar } from "../engine/player/avatar";
import { Engine } from "../engine/engine";
import { ClothingSprite } from "../engine/clothing/clothingManager";
import { ActionFrame } from "@clubpenguin/net/types/action";
/* END-USER-IMPORTS */

export default class penguin extends Phaser.GameObjects.Container implements Avatar {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // hitbox
        const hitbox = scene.add.image(0, -21.375, "penguin", "penguin/hitbox");
        hitbox.alpha = 0.01;
        hitbox.alphaTopLeft = 0.01;
        hitbox.alphaTopRight = 0.01;
        hitbox.alphaBottomLeft = 0.01;
        hitbox.alphaBottomRight = 0.01;
        this.add(hitbox);

        // shadow
        const shadow = scene.add.ellipse(0, 0, 64.2375, 42.4125);
        shadow.alpha = 0.2;
        shadow.isFilled = true;
        shadow.fillColor = 0;
        shadow.isStroked = true;
        shadow.strokeColor = 11250603;
        this.add(shadow);

        // ring
        const ring = scene.add.ellipse(0, 0, 72, 49.5);
        ring.fillColor = 0;
        ring.isStroked = true;
        ring.strokeColor = 3381759;
        ring.lineWidth = 4.5;
        this.add(ring);

        // body_art
        const body_art = scene.add.sprite(0, 0, "penguin", "penguin/body/0");
        this.add(body_art);

        // overlay_art
        const overlay_art = scene.add.sprite(0, 0, "penguin", "penguin/overlay/0");
        overlay_art.alphaTopRight = 0.5;
        this.add(overlay_art);

        // hitbox (components)
        const hitboxButtonComponent = new ButtonComponent(hitbox);
        hitboxButtonComponent.handCursor = true;
        hitboxButtonComponent.pixelPerfect = true;

        this.hitbox = hitbox;
        this.shadow = shadow;
        this.ring = ring;
        this.body_art = body_art;
        this.overlay_art = overlay_art;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public hitbox: Phaser.GameObjects.Image;
    public shadow: Phaser.GameObjects.Ellipse;
    public ring: Phaser.GameObjects.Ellipse;
    public body_art: Phaser.GameObjects.Sprite;
    public overlay_art: Phaser.GameObjects.Sprite;

    /* START-USER-CODE */
    public animations: { [frame: number]: { body: Phaser.Animations.Animation, overlay: Phaser.Animations.Animation } };

    public attachClothing = true;
    public spriteSpeed = 215;
    public speechBubbleOffset = { x: 0, y: 0 };
    public nicknameOffset = { x: 0, y: 0 };
    public snowballOffset = { x: 0, y: 0 };
    public snowballDelay = 833;

    public currentAnimation: number;
    public clothes: Map<number, ClothingSprite>;

    createAnimations(engine: Engine): void {
        this.animations = {};

        const actionFrames = Object.values(ActionFrame)
            .filter((value): value is ActionFrame => typeof value === 'number');

        for (const frame of actionFrames) {
            this.animations[frame] = {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body', frame),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay', frame)
            }
        }
    }

    playAnimation(index: number): boolean {
        let animation = this.animations[index];
        if (!animation) return false;

        this.body_art.stop();
        this.body_art.play(animation.body);
        this.overlay_art.stop();
        this.overlay_art.play(animation.overlay);

        for (let [_, clothing] of this.clothes) {
            clothing.stop();
            let anim = clothing.animations[index];
            if (anim) {
                clothing.visible = true;
                clothing.play(anim);
            } else clothing.visible = false;
        }

        this.currentAnimation = index;
        return true;
    }

    playNextAnimation(index: number): void {
        let currentAnimation = this.body_art.anims.currentAnim;
        this.body_art.once('animationcomplete', (animation: Phaser.Animations.Animation) => {
            if (currentAnimation == animation) this.playAnimation(index);
        });
    }

    isAnimating(): boolean {
        return this.body_art.anims.isPlaying;
    }

    pause(): void {
        this.body_art.anims.pause();
        this.overlay_art.anims.pause();
        for (let [_, clothing] of this.clothes) clothing.anims.pause();
    }

    resume(): void {
        this.body_art.anims.resume();
        this.overlay_art.anims.resume();
        for (let [_, clothing] of this.clothes) clothing.anims.pause();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

export function load(scene: Phaser.Scene): void {
    scene.load.pack("penguin-pack", "assets/avatar/penguin/penguin-pack.json");
}