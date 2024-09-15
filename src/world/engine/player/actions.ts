import Phaser from "phaser";

import { getAngle, getDirection, getDirectionQuarters } from "@clubpenguin/lib/math";
import World from "@clubpenguin/world/World";
import { Engine } from "../engine";
import { Player } from "./avatar";
import { ActionData, ActionFrame } from "@clubpenguin/net/types/action";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.world.engine.player');

export class Actions {
    public player: Player;
    public moveTween: Phaser.Tweens.Tween;

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
        return this.player.currentAnimation < ActionFrame.WADDLE_DOWN;
    }

    lookAt(x: number, y: number): void {
        this.stopMoving();

        let angle = getAngle(this.player.x, this.player.y, x, y);
        let direction = getDirection(angle);
        this.player.playAnimation(ActionFrame.IDLE_DOWN + direction);
    }

    move(x: number, y: number, originalX?: number, originalY?: number): void {
        this.stopMoving();

        let distance = Phaser.Math.Distance.BetweenPoints(this.player, { x, y });

        let angle = getAngle(this.player.x, this.player.y, x, y);
        let direction = getDirection(angle);

        if (distance < 1) {
            originalX = originalX ?? x;
            originalY = originalY ?? y;
            let angle = getAngle(this.player.x, this.player.y, originalX, originalY);
            let direction = getDirection(angle);

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

    stopMoving(): void {
        if (this.moveTween) this.moveTween.destroy();
    }

    throw(x: number, y: number): void {
        this.stopMoving();
    
        let startX = this.player.x + this.player.snowballOffset.x;
        let startY = this.player.y + this.player.snowballOffset.y;

        let snowball = this.engine.snowballs.create(startX, startY);

        let angle = getAngle(startX, startY, x, y);
        let direction = getDirectionQuarters(angle);

        this.player.playAnimation(ActionFrame.THROW_DOWN_LEFT + direction);

        this.engine.snowballs.throw(snowball, x, y, this.player);
    }

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
                this.move(data.destinationX, data.destinationY, data.fromX, data.fromY);
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
                this.throw(data.destinationX, data.destinationY);
                break;
            default:
                logger.warn('Unknown action received', data);
        }
    }

    reset(): void {
        this.stopMoving();
        this.engine.players.testTriggers(this.player, true, undefined, undefined, true);

        this.player.playAnimation(ActionFrame.IDLE_DOWN);
    }
}
