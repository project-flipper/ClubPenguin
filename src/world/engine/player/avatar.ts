
import Phaser from "phaser";

import { AnyUserData } from "@clubpenguin/net/types/user";
import AvatarOverlay from "@clubpenguin/world/interface/prefabs/AvatarOverlay";
import { Engine } from "@clubpenguin/world/engine/engine";
import { ClothingSprite } from "@clubpenguin/world/engine/clothing/clothingManager";
import { Actions } from "./actions";
import { ActionFrame } from "@clubpenguin/net/types/action";

/**
 * Represents an avatar in the game.
 */
export interface Avatar extends Phaser.GameObjects.Container {
    /**
     * The hitbox of the avatar.
     */
    hitbox: Phaser.GameObjects.Image;
    /**
     * The shadow of the avatar.
     */
    shadow: Phaser.GameObjects.Ellipse;
    /**
     * The ring around the avatar.
     */
    ring: Phaser.GameObjects.Ellipse;
    /**
     * The body of the avatar.
     */
    body_art: Phaser.GameObjects.Sprite;
    overlay_art?: Phaser.GameObjects.Sprite;

    animationsMeta: {
        [key: ActionFrame | number]: {
            totalFrames: number;
            repeat: boolean;
        }
    };

    /**
     * Whether to attach clothing to the avatar.
     */
    attachClothing: boolean;
    /**
     * The speed of the avatar's movement.
     */
    spriteSpeed: number;
    /**
     * The offset of the speech bubble.
     */
    speechBubbleOffset: { x: number, y: number };
    /**
     * The offset of the nickname.
     */
    nicknameOffset: { x: number, y: number };
    /**
     * The offset of the snowball.
     */
    snowballOffset: { x: number, y: number };
    /**
     * The amount of time to delay spawning the snowball after the animation starts.
     */
    snowballDelay: number;

    /**
     * Creates the animations for the avatar.
     * @param engine The engine to create the avatar in.
     */
    createAnimations(engine: Engine): void;
    /**
     * The current playing animation of the avatar.
     */
    currentAnimation: number;

    /**
     * Plays an animation on the avatar.
     * @param index The index of the animation to play.
     */
    playAnimation(index: number): boolean;
    /**
     * Chains an animation to the current animation.
     * @param index The index of the animation to play.
     */
    playNextAnimation(index: number): void;
    /**
     * Whether the avatar is currently animating.
     */
    isAnimating(): boolean;
}

/**
 * Represents an instance of a player in the game.
 * A player differs from an avatar in that it has additional properties such as user data and clothing.
 */
export type Player = Avatar & {
    /**
     * The user data of the player.
     */
    userData: AnyUserData;
    /**
     * The interface overlay of the player.
     */
    overlay: AvatarOverlay;
    /**
     * The mapping containing the clothing of the player.
     */
    clothes: Map<number, ClothingSprite>;
    /**
     * The actions manager of the player.
     */
    actions: Actions;
};

export interface AvatarCls {
    new(scene: Phaser.Scene, x?: number, y?: number): Avatar;

    load(scene: Phaser.Scene): void;
}
