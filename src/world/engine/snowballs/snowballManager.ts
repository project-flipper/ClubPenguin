import { App } from "@clubpenguin/app/app";
import SnowballTrigger from "@clubpenguin/lib/components/SnowballTrigger";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Snowball from "@clubpenguin/world/interface/prefabs/Snowball";
import World from "@clubpenguin/world/World";

/**
 * Manages the creation, throwing, and destruction of snowballs in the current room.
 */
export class SnowballManager {
    public engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;

        this.reset();

        this.engine.on('room:unload', () => this.reset());
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
    
    /**
     * Calculates the peak height of a snowball's trajectory based on the given duration.
     * @param duration The duration of the snowball's flight.
     * @returns The peak height of the snowball's trajectory, constrained between the minimum and maximum snowball heights.
     */
    getPeak(duration: number): number {
        let peak = Math.max(duration / 2, this.minSnowballHeight)
        return Math.min(peak, this.maxSnowballHeight)
    }
    
    /**
     * Calculates the midpoint between two points.
     * @param p1 The first point with x and y coordinates.
     * @param p2 The second point with x and y coordinates.
     * @returns A vector containing the x and y coordinates of the midpoint.
     */
    getMidPoint(p1: Phaser.Types.Math.Vector2Like, p2: Phaser.Types.Math.Vector2Like): { x: number, y: number } {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        }
    }

    /**
     * Creates a new snowball at the specified coordinates.
     * If the current room has a custom snowball class, it will be used instead of the default Snowball class.
     * If the number of snowballs exceeds the maximum allowed, the oldest snowball is destroyed.
     * @param x The x-coordinate where the snowball will be created.
     * @param y The y-coordinate where the snowball will be created.
     * @returns The newly created Snowball instance.
     */
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

    /**
     * Throws a snowball from the player's current position to the specified coordinates.
     * @param snowball The snowball to throw.
     * @param x The x-coordinate where the snowball will be thrown.
     * @param y The y-coordinate where the snowball will be thrown.
     * @param player The player who is throwing the snowball.
     */
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
                this.engine.testSnowballTriggers(snowball, player);
            }
        }));
    }

    /**
     * Resets the snowball manager by clearing and destroying all snowballs.
     */
    reset(): void {
        if (this.snowballs) for (let snowball of this.snowballs) snowball.destroy();
        this.snowballs = [];
    }
}
