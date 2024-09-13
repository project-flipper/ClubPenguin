/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import { UserData } from "../../net/types/penguin/penguin";
import AvatarOverlay from "../interface/prefabs/AvatarOverlay";
import { Avatar } from "../engine/player/avatar";
import { Engine } from "../engine/engine";
import { ClothingSprite } from "../engine/clothing/clothingManager";
/* END-USER-IMPORTS */

export default class penguin extends Phaser.GameObjects.Container implements Avatar {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // hitbox
        const hitbox = scene.add.image(0, -21.375, "penguin", "penguin/hitbox0004");
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
        const body_art = scene.add.sprite(0, 0, "penguin", "penguin/body_0");
        body_art.setOrigin(0.4988, 0.95943);
        this.add(body_art);

        // overlay_art
        const overlay_art = scene.add.sprite(0, 0, "penguin", "penguin/overlay_0");
        overlay_art.setOrigin(0.50145, 0.80194);
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
    public overlay: AvatarOverlay;

    public animations: { [frame: number]: { body: Phaser.Animations.Animation, overlay: Phaser.Animations.Animation } };

    public spriteSpeed = 215;
    public attachClothing = true;
    public speechBubbleOffset = { x: 0, y: 0 };
    public nicknameOffset = { x: 0, y: 0 };
    public snowballOffset = { x: 0, y: 0 };
    public snowballDelay = 833;

    public clothes: Map<number, ClothingSprite>;

    public penguinData: UserData;

    createAnimations(engine: Engine): void {
        this.animations = {
            0: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 0, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 0, 0),
            },
            1: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 1, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 1, 0),
            },
            2: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 2, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 2, 0),
            },
            3: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 3, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 3, 0),
            },
            4: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 4, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 4, 0),
            },
            5: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 5, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 5, 0),
            },
            6: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 6, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 6, 0),
            },
            7: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 7, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 7, 0),
            },
            8: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 8, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 8, 1, 8),
            },
            9: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 9, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 9, 1, 8),
            },
            10: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 10, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 10, 1, 8),
            },
            11: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 11, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 11, 1, 8),
            },
            12: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 12, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 12, 1, 8),
            },
            13: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 13, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 13, 1, 8),
            },
            14: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 14, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 14, 1, 8),
            },
            15: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 15, 1, 8),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 15, 1, 8),
            },
            16: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 16, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 16, 0),
            },
            17: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 17, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 17, 0),
            },
            18: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 18, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 18, 0),
            },
            19: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 19, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 19, 0),
            },
            20: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 20, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 20, 0),
            },
            21: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 21, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 21, 0),
            },
            22: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 22, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 22, 0),
            },
            23: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 23, 0),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 23, 0),
            },
            24: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 24, 1, 29, false),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 24, 1, 29, false),
            },
            25: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 25, 1, 193),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 25, 1, 193),
            },
            26: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 26, 1, 28, false),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 26, 1, 28, false),
            },
            27: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 27, 1, 28, false),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 27, 1, 28, false),
            },
            28: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 28, 1, 28, false),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 28, 1, 28, false),
            },
            29: {
                body: engine.players.generateSpriteAnimations('penguin', 'penguin', 'body_', 29, 1, 28, false),
                overlay: engine.players.generateSpriteAnimations('penguin', 'penguin', 'overlay_', 29, 1, 28, false),
            }
        };
    }

    public currentAnimation: number;

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

    isIdle(): boolean {
        return this.currentAnimation < 8;
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
