import Phaser from "phaser";

import { getAngle, getDirection, getDirectionQuarters } from "@clubpenguin/lib/math";
import World from "@clubpenguin/world/World";
import { Engine } from "../engine";
import { Player } from "./avatar";
import { ActionData, ActionFrame } from "@clubpenguin/net/types/action";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.world.engine.player');

/**
 * Manages the player's actions, such as movement and throwing snowballs.
 */
export class Actions {
    public player: Player;
    public moveTween: Phaser.Tweens.Tween;

    private _x: number;
    private _y: number;

    constructor(player: Player) {
        this.player = player;
    }

    get world(): World {
        return this.player.scene.game.scene.getScene('World') as World;
    }

    get engine(): Engine {
        return this.world.engine;
    }

    get frame(): ActionFrame {
        return this.player.currentAnimation;
    }

    /**
     * Gets the current X coordinate.
     * This is applicable to frames that target a specific point on the world, like moving or throwing snowballs.
     * @returns The current X coordinate.
     */
    get currentX(): number {
        return this._x;
    }

    /**
     * Gets the current Y coordinate.
     * This is applicable to frames that target a specific point on the world, like moving or throwing snowballs.
     * @returns The current Y coordinate.
     */
    get currentY(): number {
        return this._y;
    }

    /**
     * Checks if the given ActionData object is equal to the current instance.
     * Useful to prevent unnecessary action updates, but will not check for the player property.
     * @param data The ActionData object to compare.
     * @returns Whether the ActionData object is equal to the current instance.
     */
    equals(data: ActionData): boolean {
        return this.frame === data.frame && this.currentX === data.x && this.currentY === data.y;
    }

    /**
     * Calculates the direction based on the given coordinates.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @returns The direction ranging from 0 to 7.
     */
    getDirection(x: number, y: number): number {
        let angle = getAngle(this.player.x, this.player.y, x, y);
        return getDirection(angle);
    }

    /**
     * Calculates the direction in quarters based on the given coordinates.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @returns The direction in quarters from 0 to 3.
     */
    getDirectionQuarters(x: number, y: number): number {
        let angle = getAngle(this.player.x, this.player.y, x, y);
        return getDirectionQuarters(angle);
    }

    /**
     * Checks if the player is currently in an idle frame.
     * @returns Whether the player is currently idle.
     */
    isIdle(): boolean {
        return this.player.currentAnimation < ActionFrame.WADDLE_DOWN;
    }

    /**
     * Looks at a point on the world.
     * @param x The x-coordinate to look at.
     * @param y The y-coordinate to look at.
     */
    lookAt(x: number, y: number): void {
        this.stopMoving();

        let direction = this.getDirection(x, y);
        this.player.playAnimation(ActionFrame.IDLE_DOWN + direction);
    }

    /**
     * Moves the player to a point on the world.
     * @param x The x-coordinate to move to.
     * @param y The y-coordinate to move to.
     */
    move(x: number, y: number): void {
        this.stopMoving();

        let distance = Phaser.Math.Distance.BetweenPoints(this.player, { x, y });

        let direction = this.getDirection(x, y);
        this._x = x;
        this._y = y;

        if (distance < 1) {
            let direction = this.frame >= ActionFrame.WADDLE_DOWN && this.frame <= ActionFrame.WADDLE_DOWN_RIGHT ? this.frame - ActionFrame.WADDLE_DOWN : (this.frame < ActionFrame.WADDLE_DOWN ? this.frame : this.getDirection(x, y));

            this.player.playAnimation(ActionFrame.IDLE_DOWN + direction);
            this.engine.players.testTriggers(this.player, true);
            return;
        }

        this.player.playAnimation(ActionFrame.WADDLE_DOWN + direction);
        this.moveTween = this.player.scene.tweens.add({
            targets: this.player,
            x: x,
            y: y,
            ease: this.engine.currentRoom?.customEase,
            onStart: (tween: Phaser.Tweens.Tween) => this.engine.tweenTracker.trackTween(tween),
            onUpdate: () => {
                this.player.depth = this.player.y + 1;
                this.player.overlay.setPosition(this.player.x, this.player.y);
                this.player.overlay.depth = this.player.depth;
                this.engine.players.testTriggers(this.player, false);
            },
            onComplete: (tween: Phaser.Tweens.Tween) => {
                this.engine.tweenTracker.untrackTween(tween);
                this.player.playAnimation(ActionFrame.IDLE_DOWN + direction);
                this.engine.players.testTriggers(this.player, true);
            },
            duration: (distance / this.player.spriteSpeed) * 1000
        });
    }

    /**
     * Stops the player from moving.
     */
    stopMoving(): void {
        if (this.moveTween) this.moveTween.destroy();
        this._x = undefined;
        this._y = undefined;
    }

    /**
     * Throws a snowball to a point on the world.
     * @param x The x-coordinate to throw the snowball to.
     * @param y The y-coordinate to throw the snowball to.
     */
    throw(x: number, y: number): void {
        this.stopMoving();
    
        let startX = this.player.x + this.player.snowballOffset.x;
        let startY = this.player.y + this.player.snowballOffset.y;

        let snowball = this.engine.snowballs.create(startX, startY);

        let direction = this.getDirectionQuarters(x, y);
        this._x = x;
        this._y = y;

        this.player.playAnimation(ActionFrame.THROW_DOWN_LEFT + direction);

        this.engine.snowballs.throw(snowball, x, y, this.player);
    }

    /**
     * Sets the player's action data.
     * @param data The action data to set.
     */
    set(data: ActionData): void {
        switch (data.frame) {
            case ActionFrame.IDLE_DOWN:
            case ActionFrame.IDLE_DOWN_LEFT:
            case ActionFrame.IDLE_LEFT:
            case ActionFrame.IDLE_UP_LEFT:
            case ActionFrame.IDLE_UP:
            case ActionFrame.IDLE_UP_RIGHT:
            case ActionFrame.IDLE_RIGHT:
            case ActionFrame.IDLE_DOWN_RIGHT:
            case ActionFrame.SIT_DOWN:
            case ActionFrame.SIT_DOWN_LEFT:
            case ActionFrame.SIT_LEFT:
            case ActionFrame.SIT_UP_LEFT:
            case ActionFrame.SIT_UP:
            case ActionFrame.SIT_UP_RIGHT:
            case ActionFrame.SIT_RIGHT:
            case ActionFrame.SIT_DOWN_RIGHT:
            case ActionFrame.WAVE:
            case ActionFrame.DANCE:
                this.stopMoving();
                this.player.playAnimation(data.frame);
                break;
            case ActionFrame.WADDLE:
            case ActionFrame.WADDLE_DOWN:
            case ActionFrame.WADDLE_DOWN_LEFT:
            case ActionFrame.WADDLE_LEFT:
            case ActionFrame.WADDLE_UP_LEFT:
            case ActionFrame.WADDLE_UP:
            case ActionFrame.WADDLE_UP_RIGHT:
            case ActionFrame.WADDLE_RIGHT:
            case ActionFrame.WADDLE_DOWN_RIGHT:
                this.move(data.x, data.y);
                if (data.since) {
                    // Server sync
                    let delta = Date.now() - data.since;
                    this.moveTween.seek(delta);
                }
                break;
            case ActionFrame.THROW:
            case ActionFrame.THROW_DOWN_LEFT:
            case ActionFrame.THROW_UP_LEFT:
            case ActionFrame.THROW_UP_RIGHT:
            case ActionFrame.THROW_DOWN_RIGHT:
                this.throw(data.x, data.y);
                break;
            default:
                logger.warn('Unknown action received', data);
        }
    }

    /**
     * Resets the player's actions.
     */
    reset(): void {
        this.stopMoving();
        this.engine.players.testTriggers(this.player, true, undefined, undefined, true);

        this.player.playAnimation(ActionFrame.IDLE_DOWN);
    }
}
