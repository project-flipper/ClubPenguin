import { Direction, DirectionQuarters, getAngle, getDirection, getDirectionQuarters, roundTo } from "@clubpenguin/lib/math";
import World from "@clubpenguin/world/World";
import { Engine, logger } from "../engine";
import { Player } from "./avatar";
import { ActionData, ActionType } from "@clubpenguin/net/types/action";
import { AnimationFrame } from "./animationFrame";

/**
 * Manages the player's actions, such as movement and throwing snowballs.
 */
export class Actions {
    public player: Player;
    public moveTween: Phaser.Tweens.Tween;

    private _type: ActionType;
    private _x: number;
    private _y: number;

    constructor(player: Player) {
        this.player = player;
        this._type = ActionType.IDLE;
    }

    get world(): World {
        return this.player.scene.game.scene.getScene('World') as World;
    }

    get engine(): Engine {
        return this.world.engine;
    }

    /**
     * Gets the current animation frame.
     */
    get frame(): AnimationFrame {
        return this.player.currentAnimation;
    }

    /**
     * Gets the current animation frame.
     */
    get type(): ActionType {
        return this._type;
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
        return this.type == data.type && (data.to_x == null || this.currentX == data.to_x) && (data.to_y == null || this.currentY == data.to_y);
    }

    /**
     * Calculates the direction based on the given coordinates.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @returns The direction ranging from 0 to 7.
     */
    getDirection(x: number, y: number): Direction {
        let angle = getAngle(this.player.x, this.player.y, x, y);
        return getDirection(angle);
    }

    /**
     * Gets a vector representation for the given direction.
     * Useful to quickly calculate an offset to send to the server.
     * @param direction The direction to get the vector for.
     * @returns The vector for the given direction.
     */
    getDirectionVector(direction: Direction): Phaser.Types.Math.Vector2Like {
        let x: number, y: number;

        switch (direction) {
            case 0:
                x = 0;
                y = 1;
                break;
            case 1:
                x = -1;
                y = 1;
                break;
            case 2:
                x = -1;
                y = 0;
                break;
            case 3:
                x = -1;
                y = -1;
                break;
            case 4:
                x = 0;
                y = -1;
                break;
            case 5:
                x = 1;
                y = -1;
                break;
            case 6:
                x = 1;
                y = 0;
                break;
            case 7:
                x = 1;
                y = 1;
                break;
        }

        return { x: this.player.x + x, y: this.player.y + y };
    }

    /**
     * Calculates the direction in quarters based on the given coordinates.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @returns The direction in quarters from 0 to 3.
     */
    getDirectionQuarters(x: number, y: number): DirectionQuarters {
        let angle = getAngle(this.player.x, this.player.y, x, y);
        return getDirectionQuarters(angle);
    }

    /**
     * Checks if the player is currently in an idle frame.
     * @returns Whether the player is currently idle.
     */
    isIdle(): boolean {
        return this.player.currentAnimation < AnimationFrame.WADDLE_DOWN;
    }

    /**
     * Looks at a point on the world.
     * @param x The x-coordinate to look at.
     * @param y The y-coordinate to look at.
     */
    lookAt(x: number, y: number): void {
        this.stopMoving();

        this._x = x;
        this._y = y;

        let direction = this.getDirection(x, y);
        this.player.playAnimation(AnimationFrame.IDLE_DOWN + direction);
        this._type = ActionType.IDLE;
        this.player.emit('action:update', this);
    }

    /**
     * Sits facing a point on the world.
     * @param x The x-coordinate to sit facing at.
     * @param y The y-coordinate to sit facing at.
     */
    sitFacing(x: number, y: number): void {
        this.stopMoving();

        this._x = x;
        this._y = y;

        let direction = this.getDirection(x, y);
        this.player.playAnimation(AnimationFrame.SIT_DOWN + direction);
        this._type = ActionType.SIT;
        this.player.emit('action:update', this);
    }

    /**
     * Performs a wave.
     */
    wave(): void {
        this.stopMoving();

        this.player.playAnimation(AnimationFrame.WAVE);
        this._type = ActionType.WAVE;
        this.player.emit('action:update', this);
    }

    /**
     * Performs a dance.
     */
    dance(): void {
        this.stopMoving();

        this.player.playAnimation(AnimationFrame.DANCE);
        this._type = ActionType.DANCE;
        this.player.emit('action:update', this);
    }

    /**
     * Moves the player to a point on the world.
     * @param x The x-coordinate to move to.
     * @param y The y-coordinate to move to.
     */
    move(x: number, y: number): void {
        x = roundTo(x, 2);
        y = roundTo(y, 2);
        this.stopMoving();

        let distance = Phaser.Math.Distance.BetweenPoints(this.player, { x, y });

        let direction = this.getDirection(x, y);
        this._x = x;
        this._y = y;

        if (distance < 1) {
            let direction = this.frame >= AnimationFrame.WADDLE_DOWN && this.frame <= AnimationFrame.WADDLE_DOWN_RIGHT ? this.frame - AnimationFrame.WADDLE_DOWN : (this.frame < AnimationFrame.WADDLE_DOWN ? this.frame : this.getDirection(x, y));

            this.player.playAnimation(AnimationFrame.IDLE_DOWN + direction);
            this._type = ActionType.IDLE;
            this.engine.players.testTriggers(this.player, true);
            this.player.emit('action:update', this);
            return;
        }

        this.player.playAnimation(AnimationFrame.WADDLE_DOWN + direction);
        this._type = ActionType.WADDLE;
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
                this.player.playAnimation(AnimationFrame.IDLE_DOWN + direction);
                this._type = ActionType.IDLE;
                this.engine.players.testTriggers(this.player, true);
                this.player.emit('action:update', this);
            },
            duration: (distance / this.player.spriteSpeed) * 1000
        });
        this.player.emit('action:update', this);
    }

    teleport(x: number, y: number, testTriggers = true): void {
        this.player.setPosition(x, y);
        this.player.depth = this.player.y + 1;
        this.player.overlay.setPosition(this.player.x, this.player.y);
        this.player.overlay.depth = this.player.depth;
        if (testTriggers) this.engine.players.testTriggers(this.player, true);
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
        x = roundTo(x, 2);
        y = roundTo(y, 2);
        this.stopMoving();
    
        let startX = this.player.x + this.player.snowballOffset.x;
        let startY = this.player.y + this.player.snowballOffset.y;

        let snowball = this.engine.snowballs.create(startX, startY);

        let direction = this.getDirectionQuarters(x, y);
        this._x = x;
        this._y = y;

        this.player.playAnimation(AnimationFrame.THROW_DOWN_LEFT + direction);
        this._type = ActionType.THROW;

        this.engine.snowballs.throw(snowball, x, y, this.player);
        this.player.emit('action:update', this);
    }

    /**
     * Sets the player's action data.
     * @param data The action data to set.
     */
    set(data: ActionData): void {
        switch (data.type) {
            case ActionType.IDLE:
                this.stopMoving();
                if (data.x && data.y) this.teleport(data.x, data.y);
                this.player.playAnimation(AnimationFrame.IDLE_DOWN + (data.to_x != null && data.to_y != null ? this.getDirection(data.to_x, data.to_y) : 0));
                break;
            case ActionType.WADDLE:
                this.stopMoving();

                if (data.x && data.y) this.teleport(data.x, data.y, false);
                this.move(data.to_x, data.to_y);
                if (data.since) {
                    // Server sync
                    let delta = Math.abs(Date.now() - data.since);
                    this.moveTween.forward(delta);
                }
                break;
            case ActionType.SIT:
                this.stopMoving();
                if (data.x && data.y) this.teleport(data.x, data.y);
                this.player.playAnimation(AnimationFrame.SIT_DOWN + (data.to_x != null && data.to_y != null ? this.getDirection(data.to_x, data.to_y) : 0));
                break;
            case ActionType.WAVE:
                this.stopMoving();
                if (data.x && data.y) this.teleport(data.x, data.y);
                this.player.playAnimation(AnimationFrame.WAVE);
                break;
            case ActionType.DANCE:
                this.stopMoving();
                if (data.x && data.y) this.teleport(data.x, data.y);
                this.player.playAnimation(AnimationFrame.DANCE);
                break;
            case ActionType.THROW:
                this.stopMoving();
                if (data.x && data.y) this.teleport(data.x, data.y);
                this.throw(data.to_x, data.to_y);
                break;
            default:
                logger.warn('Unknown action received', data);
                break;
        }
    }

    /**
     * Sets the player's action data from an animation frame.
     * @param frame The animation frame to set the action data from.
     */
    fromFrame(frame: AnimationFrame): void {
        let to: Phaser.Types.Math.Vector2Like;
        switch (frame) {
            case AnimationFrame.IDLE_DOWN:
            case AnimationFrame.IDLE_DOWN_LEFT:
            case AnimationFrame.IDLE_LEFT:
            case AnimationFrame.IDLE_UP_LEFT:
            case AnimationFrame.IDLE_UP:
            case AnimationFrame.IDLE_UP_RIGHT:
            case AnimationFrame.IDLE_RIGHT:
            case AnimationFrame.IDLE_DOWN_RIGHT:
                to = this.getDirectionVector(frame - AnimationFrame.IDLE_DOWN);
                this.lookAt(to.x, to.y);
                break;
            case AnimationFrame.WADDLE_DOWN:
            case AnimationFrame.WADDLE_DOWN_LEFT:
            case AnimationFrame.WADDLE_LEFT:
            case AnimationFrame.WADDLE_UP_LEFT:
            case AnimationFrame.WADDLE_UP:
            case AnimationFrame.WADDLE_UP_RIGHT:
            case AnimationFrame.WADDLE_RIGHT:
            case AnimationFrame.WADDLE_DOWN_RIGHT:
                to = this.getDirectionVector(frame - AnimationFrame.WADDLE_DOWN);
                this.lookAt(to.x, to.y);
                break;
            case AnimationFrame.SIT_DOWN:
            case AnimationFrame.SIT_DOWN_LEFT:
            case AnimationFrame.SIT_LEFT:
            case AnimationFrame.SIT_UP_LEFT:
            case AnimationFrame.SIT_UP:
            case AnimationFrame.SIT_UP_RIGHT:
            case AnimationFrame.SIT_RIGHT:
            case AnimationFrame.SIT_DOWN_RIGHT:
                to = this.getDirectionVector(frame - AnimationFrame.SIT_DOWN);
                this.sitFacing(to.x, to.y);
                break;
            case AnimationFrame.WAVE:
                this.wave();
                break;
            case AnimationFrame.DANCE:
                this.dance();
                break;
            case AnimationFrame.THROW_DOWN_LEFT:
                to = this.getDirectionVector(Direction.DOWN_LEFT);
                this.lookAt(to.x, to.y);
                break;
            case AnimationFrame.THROW_UP_LEFT:
                to = this.getDirectionVector(Direction.UP_LEFT);
                this.lookAt(to.x, to.y);
                break;
            case AnimationFrame.THROW_UP_RIGHT:
                to = this.getDirectionVector(Direction.UP_RIGHT);
                this.lookAt(to.x, to.y);
                break;
            case AnimationFrame.THROW_DOWN_RIGHT:
                to = this.getDirectionVector(Direction.DOWN_RIGHT);
                this.lookAt(to.x, to.y);
                break;
            default:
                this.reset();
                break;
        }
    }

    /**
     * Gets the player's action data.
     * @returns The player's action data.
     */
    get(): ActionData {
        return {
            type: this.type,
            x: roundTo(this.player.x, 2),
            y: roundTo(this.player.y, 2),
            to_x: this.currentX,
            to_y: this.currentY
        };
    }

    /**
     * Resets the player's actions.
     */
    reset(): void {
        this.stopMoving();
        this.engine.players.testTriggers(this.player, true, undefined, undefined, true);

        this.player.playAnimation(AnimationFrame.IDLE_DOWN);
        this._type = ActionType.IDLE;
        this.player.emit('action:update', this);
    }
}
