import Phaser from "phaser";

import { getAngle, getDirection, getDirectionQuarters } from "@clubpenguin/lib/math";
import World from "@clubpenguin/world/World";
import { Engine } from "../engine";
import { Player } from "./avatar";

export enum AnimationFrames {
    IDLE_DOWN = 0,
    IDLE_DOWN_LEFT,
    IDLE_LEFT,
    IDLE_UP_LEFT,
    IDLE_UP,
    IDLE_UP_RIGHT,
    IDLE_RIGHT,
    IDLE_DOWN_RIGHT,

    WADDLE_DOWN = 8,
    WADDLE_DOWN_LEFT,
    WADDLE_LEFT,
    WADDLE_UP_LEFT,
    WADDLE_UP,
    WADDLE_UP_RIGHT,
    WADDLE_RIGHT,
    WADDLE_DOWN_RIGHT,

    SIT_DOWN = 16,
    SIT_DOWN_LEFT,
    SIT_LEFT,
    SIT_UP_LEFT,
    SIT_UP,
    SIT_UP_RIGHT,
    SIT_RIGHT,
    SIT_DOWN_RIGHT,

    WAVE = 24,
    DANCE,

    THROW_DOWN_LEFT = 26,
    THROW_UP_LEFT,
    THROW_UP_RIGHT,
    THROW_DOWN_RIGHT
}

export class Actions {
    public player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    get world(): World {
        return this.player.scene.game.scene.getScene('World') as World;
    }

    get engine(): Engine {
        return this.world.engine;
    }

    isIdle(): boolean {
        return this.player.currentAnimation < AnimationFrames.WADDLE_DOWN;
    }

    lookAt(x: number, y: number): void {
        this.stopMoving();

        let angle = getAngle(this.player.x, this.player.y, x, y);
        let direction = getDirection(angle);
        this.player.playAnimation(AnimationFrames.IDLE_DOWN + direction);
    }

    move(x: number, y: number, originalX?: number, originalY?: number): void {
        // stop moving first
        this.player.scene.tweens.killTweensOf(this.player);

        let distance = Phaser.Math.Distance.BetweenPoints(this.player, { x, y });

        let angle = getAngle(this.player.x, this.player.y, x, y);
        let direction = getDirection(angle);

        if (distance < 1) {
            originalX = originalX ?? x;
            originalY = originalY ?? y;
            let angle = getAngle(this.player.x, this.player.y, originalX, originalY);
            let direction = getDirection(angle);

            this.player.playAnimation(AnimationFrames.IDLE_DOWN + direction);
            this.engine.players.testTriggers(this.player, true);
            return;
        }

        this.player.playAnimation(AnimationFrames.WADDLE_DOWN + direction);
        this.player.scene.tweens.add({
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
                this.player.playAnimation(AnimationFrames.IDLE_DOWN + direction);
                this.engine.players.testTriggers(this.player, true);
            },
            duration: (distance / this.player.spriteSpeed) * 1000
        });
    }

    stopMoving(): void {
        this.player.scene.tweens.killTweensOf(this.player);
    }

    sitDown(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_DOWN);
        // TODO: send actions
    }

    sitDownLeft(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_DOWN_LEFT);
        // TODO: send actions
    }

    sitLeft(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_LEFT);
        // TODO: send actions
    }

    sitUpLeft(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_UP_LEFT);
        // TODO: send actions
    }

    sitUp(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_UP);
        // TODO: send actions
    }

    sitUpRight(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_UP_RIGHT);
        // TODO: send actions
    }

    sitRight(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_RIGHT);
        // TODO: send actions
    }

    sitDownRight(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.SIT_DOWN_RIGHT);
        // TODO: send actions
    }

    wave(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.WAVE);
        // TODO: send actions
    }

    dance(): void {
        this.stopMoving();
        this.player.playAnimation(AnimationFrames.DANCE);
        // TODO: send actions
    }

    throwSnowball(x: number, y: number): void {
        let player = this.player;

        if (player == this.engine.player) this.stopMoving();
        else player.scene.tweens.killTweensOf(player);
    
        let startX = player.x + player.snowballOffset.x;
        let startY = player.y + player.snowballOffset.y;

        let snowball = this.engine.snowballs.create(startX, startY);

        let angle = getAngle(startX, startY, x, y);
        let direction = getDirectionQuarters(angle);

        player.playAnimation(AnimationFrames.THROW_DOWN_LEFT + direction);

        this.engine.snowballs.throw(snowball, x, y, player);
    }

    reset(): void {
        this.stopMoving();
        // TODO: send move complete
        this.engine.players.testTriggers(this.player, true, undefined, undefined, true);

        this.player.playAnimation(AnimationFrames.IDLE_DOWN);
        // TODO: send actions
    }
}
