
import Phaser from "phaser";
import type { MyPenguinData, PenguinData } from "../../net/types/penguin/penguin";
import type AvatarOverlay from "../interface/prefabs/AvatarOverlay";
import type Engine from "../engine/Engine";
import type { ClothingSprite } from "../engine/Engine";

export interface Avatar extends Phaser.GameObjects.Container {
    penguinData: PenguinData | MyPenguinData;

    hitbox: Phaser.GameObjects.Image;
    shadow: Phaser.GameObjects.Ellipse;
    ring: Phaser.GameObjects.Ellipse;
    body_art: Phaser.GameObjects.Sprite;

    overlay: AvatarOverlay;

    attachClothing: boolean;
    spriteSpeed: number;
    speechBubbleOffset: { x: number, y: number };
    nicknameOffset: { x: number, y: number };
    snowballOffset: { x: number, y: number };
    snowballDelay: number;

    clothes: Map<number, ClothingSprite>;

    createAnimations(engine: Engine): void;
    currentAnimation: number;

    playAnimation(index: number): boolean;
    playNextAnimation(index: number): void;
    isAnimating(): boolean;
    isIdle(): boolean;
}

export interface AvatarCls {
    new(scene: Phaser.Scene, x?: number, y?: number): Avatar;

    load(scene: Phaser.Scene): void;
}
