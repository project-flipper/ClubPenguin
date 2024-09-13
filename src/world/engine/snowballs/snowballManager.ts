import Phaser from "phaser";

import { App } from "@clubpenguin/app/app";
import SnowballTrigger from "@clubpenguin/lib/ui/components/SnowballTrigger";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Snowball from "@clubpenguin/world/interface/prefabs/Snowball";
import World from "@clubpenguin/world/World";

export class SnowballManager {
    public engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    get world(): World {
        return this.engine.world;
    }

    get app(): App {
        return this.engine.app;
    }

    public snowballs: Snowball[];
    public maxSnowballs = 10;
    public maxSnowballHeight = 425;
    public minSnowballHeight = 350;
    
    getPeak(duration: number): number {
        let peak = Math.max(duration / 2, this.minSnowballHeight)
        return Math.min(peak, this.maxSnowballHeight)
    }
    
    getMidPoint(p1: Phaser.Types.Math.Vector2Like, p2: Phaser.Types.Math.Vector2Like): { x: number, y: number } {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        }
    }

    create(x: number, y: number): Snowball {
        if (this.snowballs.length + 1 > this.maxSnowballs) {
            let lastSnowball = this.snowballs.shift();
            lastSnowball.destroy();
        }
    
        let snowballClass = 'customSnowballClass' in this.engine.currentRoom ? this.engine.currentRoom.customSnowballClass : Snowball;
        let snowball = new snowballClass(this.engine.currentRoom, x, y);
        this.engine.currentRoom.add.existing(snowball);
    
        this.snowballs.push(snowball);
    
        return snowball;
    }

    throw(snowball: Snowball, x: number, y: number, player: Player): void {
        let distance = Phaser.Math.Distance.BetweenPoints(snowball, { x, y });
        let duration = (distance / snowball.speed) * 1000;
        let midPoint = this.getMidPoint(snowball, { x, y });

        let curve = new Phaser.Curves.QuadraticBezier(
            new Phaser.Math.Vector2(snowball.x, snowball.y),
            new Phaser.Math.Vector2(midPoint.x, midPoint.y - this.getPeak(duration)),
            new Phaser.Math.Vector2(x, y)
        );

        this.engine.currentRoom.time.delayedCall(player.snowballDelay, () => this.engine.currentRoom.tweens.add({
            targets: snowball,
            y,
            duration,
            onStart: (tween: Phaser.Tweens.Tween) => {
                this.engine.tweenTracker.trackTween(tween);
                snowball.start(tween);
            },
            onUpdate: (tween: Phaser.Tweens.Tween) => snowball.step(tween, curve),
            onComplete: (tween: Phaser.Tweens.Tween) => {
                this.engine.tweenTracker.untrackTween(tween);
                snowball.step(tween, curve);
                snowball.complete(tween);
                this.testTriggers(snowball, player);
            }
        }));
    }

    testTriggers(snowball: Snowball, player: Player): void {
        let room = player.scene as Room;
        let triggers = 'triggers' in room ? room.triggers : [];
    
        for (let trigger of triggers) {
            let snowballTrigger = SnowballTrigger.getComponent(trigger);
            if (snowballTrigger && snowballTrigger.test(snowball.x, snowball.y)) snowballTrigger.execute(this.engine, player, snowball);
        }
    }

}
