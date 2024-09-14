
import Phaser from "phaser";

import { AnyUserData } from "@clubpenguin/net/types/user";
import AvatarOverlay from "@clubpenguin/world/interface/prefabs/AvatarOverlay";
import { Engine } from "@clubpenguin/world/engine/engine";
import { ClothingSprite } from "@clubpenguin/world/engine/clothing/clothingManager";
import { Actions } from "./actions";

export interface Avatar extends Phaser.GameObjects.Container {
    hitbox: Phaser.GameObjects.Image;
    shadow: Phaser.GameObjects.Ellipse;
    ring: Phaser.GameObjects.Ellipse;
    body_art: Phaser.GameObjects.Sprite;

    attachClothing: boolean;
    spriteSpeed: number;
    speechBubbleOffset: { x: number, y: number };
    nicknameOffset: { x: number, y: number };
    snowballOffset: { x: number, y: number };
    snowballDelay: number;

    createAnimations(engine: Engine): void;
    currentAnimation: number;

    playAnimation(index: number): boolean;
    playNextAnimation(index: number): void;
    isAnimating(): boolean;
}

export type Player = Avatar & {
    userData: AnyUserData;
    overlay: AvatarOverlay;
    clothes: Map<number, ClothingSprite>;
    actions: Actions;
};

export interface AvatarCls {
    new(scene: Phaser.Scene, x?: number, y?: number): Avatar;

    load(scene: Phaser.Scene): void;
}
