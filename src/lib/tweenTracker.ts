import Phaser from "phaser";

export class TweenTracker {
    private trackedTweens: Phaser.Tweens.Tween[];

    constructor() {
        this.reset();
    }

    trackTween(tween: Phaser.Tweens.Tween): void {
        if (!this.isTweenTracked(tween)) this.trackedTweens.push(tween);
    }

    isTweenTracked(tween: Phaser.Tweens.Tween): boolean {
        return this.trackedTweens.includes(tween);
    }

    untrackTween(tween: Phaser.Tweens.Tween): void {
        if (this.isTweenTracked(tween)) this.trackedTweens.splice(this.trackedTweens.indexOf(tween));
    }

    seekTweens(delta: number): void {
        for (let tween of this.trackedTweens) {
            if (tween.isDestroyed()) this.untrackTween(tween)
            else tween.forward(delta);
        }
    }

    reset(): void {
        this.trackedTweens = [];
    }

}
