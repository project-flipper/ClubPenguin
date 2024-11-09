/* START OF COMPILED CODE */

import ButtonComponent from "../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import { Avatar } from "../engine/player/avatar";
import { Engine } from "../engine/engine";
import { ClothingSprite } from "../engine/clothing/clothingManager";
import { AnimationFrame } from "../engine/player/animationFrame";
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
    public animationsMeta = {
        [AnimationFrame.IDLE_DOWN]: { totalFrames: 1, repeat: true },
        [AnimationFrame.IDLE_DOWN_LEFT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.IDLE_LEFT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.IDLE_UP_LEFT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.IDLE_UP]: { totalFrames: 1, repeat: true },
        [AnimationFrame.IDLE_UP_RIGHT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.IDLE_RIGHT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.IDLE_DOWN_RIGHT]: { totalFrames: 1, repeat: true },
    
        [AnimationFrame.WADDLE_DOWN]: { totalFrames: 8, repeat: true },
        [AnimationFrame.WADDLE_DOWN_LEFT]: { totalFrames: 8, repeat: true },
        [AnimationFrame.WADDLE_LEFT]: { totalFrames: 8, repeat: true },
        [AnimationFrame.WADDLE_UP_LEFT]: { totalFrames: 8, repeat: true },
        [AnimationFrame.WADDLE_UP]: { totalFrames: 8, repeat: true },
        [AnimationFrame.WADDLE_UP_RIGHT]: { totalFrames: 8, repeat: true },
        [AnimationFrame.WADDLE_RIGHT]: { totalFrames: 8, repeat: true },
        [AnimationFrame.WADDLE_DOWN_RIGHT]: { totalFrames: 8, repeat: true },
    
        [AnimationFrame.SIT_DOWN]: { totalFrames: 1, repeat: true },
        [AnimationFrame.SIT_DOWN_LEFT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.SIT_LEFT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.SIT_UP_LEFT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.SIT_UP]: { totalFrames: 1, repeat: true },
        [AnimationFrame.SIT_UP_RIGHT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.SIT_RIGHT]: { totalFrames: 1, repeat: true },
        [AnimationFrame.SIT_DOWN_RIGHT]: { totalFrames: 1, repeat: true },
    
        [AnimationFrame.WAVE]: { totalFrames: 29, repeat: false },
        [AnimationFrame.DANCE]: { totalFrames: 193, repeat: true },
    
        [AnimationFrame.THROW_DOWN_LEFT]: { totalFrames: 28, repeat: false },
        [AnimationFrame.THROW_UP_LEFT]: { totalFrames: 28, repeat: false },
        [AnimationFrame.THROW_UP_RIGHT]: { totalFrames: 28, repeat: false },
        [AnimationFrame.THROW_DOWN_RIGHT]: { totalFrames: 28, repeat: false },
    
        [AnimationFrame.PENGUIN_JUMP]: { totalFrames: 63, repeat: false },
    
        [AnimationFrame.CJ_BOW_RIGHT]: { totalFrames: 61, repeat: false },
        [AnimationFrame.CJ_BOW_LEFT]: { totalFrames: 61, repeat: false },
        [AnimationFrame.CJ_BOW_DOWN_RIGHT]: { totalFrames: 61, repeat: false },
        [AnimationFrame.CJ_BOW_UP_LEFT]: { totalFrames: 61, repeat: false },
        [AnimationFrame.CJ_BOW_DOWN_LEFT]: { totalFrames: 61, repeat: false },
        [AnimationFrame.CJ_BOW_UP_RIGHT]: { totalFrames: 61, repeat: false }
    };

    public attachClothing = true;
    public spriteSpeed = 215;
    public speechBubbleOffset = { x: 0, y: 0 };
    public nicknameOffset = { x: 0, y: 0 };
    public snowballOffset = { x: 0, y: 0 };
    public snowballDelay = 800;

    public currentAnimation: number;
    public clothes: Map<number, ClothingSprite>;

    createAnimations(engine: Engine): void {
        this.animations = {};

        for (let frame of Object.keys(this.animationsMeta).map(x => parseInt(x))) {
            let animationDef = this.animationsMeta[frame as keyof typeof this.animationsMeta];
            this.animations[frame] = {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body', frame, animationDef),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay', frame, animationDef)
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