
// You can write more code here

/* START OF COMPILED CODE */

import SmallTarget from "./SmallTarget";
import Target from "./Target";
import MonsterTarget from "./MonsterTarget";
import TextBox from "../../../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import { Locale } from "@clubpenguin/app/locale";
import Lounge from "../Lounge";
/* END-USER-IMPORTS */

export default class TargetGame extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // lounge_gameback
        const lounge_gameback = scene.add.image(29.3625, 33.3, "lounge2013", "lounge/gameback");
        lounge_gameback.setOrigin(0, 0);
        this.add(lounge_gameback);

        // lounge_gamebg4
        const lounge_gamebg4 = scene.add.image(88.3125, 29.8125, "lounge2013", "lounge/gamebg4");
        lounge_gamebg4.setOrigin(0, 0);
        this.add(lounge_gamebg4);

        // target8
        const target8 = new SmallTarget(scene, 424.35, 64.0375);
        target8.visible = false;
        this.add(target8);

        // target7
        const target7 = new SmallTarget(scene, 311.625, 97.7875);
        target7.visible = false;
        this.add(target7);

        // target6
        const target6 = new SmallTarget(scene, 247.5, 97.7875);
        target6.visible = false;
        this.add(target6);

        // target5
        const target5 = new SmallTarget(scene, 126, 66.075);
        target5.visible = false;
        this.add(target5);

        // lounge_gamebg3
        const lounge_gamebg3 = scene.add.image(79.65, 92.1375, "lounge2013", "lounge/gamebg3");
        lounge_gamebg3.setOrigin(0, 0);
        this.add(lounge_gamebg3);

        // target1
        const target1 = new Target(scene, 119.7, 88.25);
        target1.visible = false;
        this.add(target1);

        // target2
        const target2 = new Target(scene, 223.65, 87.25);
        target2.visible = false;
        this.add(target2);

        // target3
        const target3 = new Target(scene, 333.45, 87.25);
        target3.visible = false;
        this.add(target3);

        // target4
        const target4 = new Target(scene, 441, 87.25);
        target4.visible = false;
        this.add(target4);

        // lounge_gamebg2
        const lounge_gamebg2 = scene.add.image(62.8875, 98.55, "lounge2013", "lounge/gamebg2");
        lounge_gamebg2.setOrigin(0, 0);
        this.add(lounge_gamebg2);

        // target9
        const target9 = new SmallTarget(scene, 89.1, 196.8);
        target9.visible = false;
        this.add(target9);

        // target10
        const target10 = new SmallTarget(scene, 460.35, 196.8);
        target10.visible = false;
        this.add(target10);

        // target11
        const target11 = new MonsterTarget(scene, 279.675, 169.9875);
        target11.visible = false;
        this.add(target11);

        // lounge_gamebg1
        const lounge_gamebg1 = scene.add.image(136.6875, 160.9875, "lounge2013", "lounge/gamebg1");
        lounge_gamebg1.setOrigin(0, 0);
        this.add(lounge_gamebg1);

        // lounge_gamefloor
        const lounge_gamefloor = scene.add.image(53.6625, 309.7125, "lounge2013", "lounge/gamefloor");
        lounge_gamefloor.setOrigin(0, 0);
        this.add(lounge_gamefloor);

        // lounge_gamestrip
        const lounge_gamestrip = scene.add.image(23.0625, 307.9125, "lounge2013", "lounge/gamestrip");
        lounge_gamestrip.setOrigin(0, 0);
        this.add(lounge_gamestrip);

        // lounge_gamecover
        const lounge_gamecover = scene.add.image(0, 1.125, "lounge2013", "lounge/gamecover");
        lounge_gamecover.setOrigin(0, 0);
        this.add(lounge_gamecover);

        // title
        const title = scene.add.image(154.2375, 233.2125, "lounge2013", "lounge/gametitle0001");
        title.setOrigin(0, 0);
        this.add(title);

        // light1
        const light1 = scene.add.sprite(77.5125, 0, "lounge2013", "lounge/light10001");
        light1.setOrigin(0, 0);
        this.add(light1);

        // light2
        const light2 = scene.add.sprite(90.3375, 0, "lounge2013", "lounge/light20001");
        light2.setOrigin(0, 0);
        this.add(light2);

        // light3
        const light3 = scene.add.sprite(103.95, 0, "lounge2013", "lounge/light10001");
        light3.setOrigin(0, 0);
        this.add(light3);

        // light4
        const light4 = scene.add.sprite(445.5, 0, "lounge2013", "lounge/light10001");
        light4.setOrigin(0, 0);
        this.add(light4);

        // light5
        const light5 = scene.add.sprite(458.325, 0, "lounge2013", "lounge/light20001");
        light5.setOrigin(0, 0);
        this.add(light5);

        // light6
        const light6 = scene.add.sprite(471.9375, 0, "lounge2013", "lounge/light10001");
        light6.setOrigin(0, 0);
        this.add(light6);

        // lounge_redScore
        const lounge_redScore = scene.add.image(73.9125, 263.25, "lounge2013", "lounge/redScore");
        this.add(lounge_redScore);

        // redScoreText
        const redScoreText = new TextBox(scene, 39.4875, 248.85, "LCD");
        redScoreText.text = "00";
        redScoreText.fontSize = -40.5;
        redScoreText.align = 2;
        this.add(redScoreText);

        // lounge_blueScore
        const lounge_blueScore = scene.add.image(487.35, 263.25, "lounge2013", "lounge/blueScore");
        this.add(lounge_blueScore);

        // blueScoreText
        const blueScoreText = new TextBox(scene, 452.925, 248.85, "LCD");
        blueScoreText.text = "00";
        blueScoreText.fontSize = -40.5;
        blueScoreText.align = 2;
        this.add(blueScoreText);

        // lists
        const targets = [target1, target2, target3, target4, target5, target6, target7, target8, target9, target10, target11];

        // redScoreText (prefab fields)
        redScoreText.boxWidth = 69.075;
        redScoreText.boxHeight = 51.3;
        redScoreText.horizontalAlign = 1;
        redScoreText.verticalAlign = 0;

        // blueScoreText (prefab fields)
        blueScoreText.boxWidth = 69.075;
        blueScoreText.boxHeight = 51.3;
        blueScoreText.horizontalAlign = 1;
        blueScoreText.verticalAlign = 0;

        this.target8 = target8;
        this.target7 = target7;
        this.target6 = target6;
        this.target5 = target5;
        this.target1 = target1;
        this.target2 = target2;
        this.target3 = target3;
        this.target4 = target4;
        this.target9 = target9;
        this.target10 = target10;
        this.title = title;
        this.light1 = light1;
        this.light2 = light2;
        this.light3 = light3;
        this.light4 = light4;
        this.light5 = light5;
        this.light6 = light6;
        this.redScoreText = redScoreText;
        this.blueScoreText = blueScoreText;
        this.targets = targets;

        /* START-USER-CTR-CODE */

        this.light1.play('lounge2013-light1-animation');
        this.light2.play('lounge2013-light2-animation');
        this.light3.play('lounge2013-light1-animation');
        this.light4.play('lounge2013-light1-animation');
        this.light5.play('lounge2013-light2-animation');
        this.light6.play('lounge2013-light1-animation');

        /* END-USER-CTR-CODE */
    }

    public target8: SmallTarget;
    public target7: SmallTarget;
    public target6: SmallTarget;
    public target5: SmallTarget;
    public target1: Target;
    public target2: Target;
    public target3: Target;
    public target4: Target;
    public target9: SmallTarget;
    public target10: SmallTarget;
    public title: Phaser.GameObjects.Image;
    public light1: Phaser.GameObjects.Sprite;
    public light2: Phaser.GameObjects.Sprite;
    public light3: Phaser.GameObjects.Sprite;
    public light4: Phaser.GameObjects.Sprite;
    public light5: Phaser.GameObjects.Sprite;
    public light6: Phaser.GameObjects.Sprite;
    public redScoreText: TextBox;
    public blueScoreText: TextBox;
    public targets: Array<Target|SmallTarget|MonsterTarget>;

    /* START-USER-CODE */

    declare scene: Lounge;

    private _isActive = false;
    private countdown: Phaser.Time.TimerEvent;
    private tick: Phaser.Time.TimerEvent;

    start(): void {
        this.stop();
        this._isActive = true;
        this.opening();
    }

    opening(): void {
        if (!this._isActive) return;
        this.blueScore = 0;
        this.redScore = 0;
        this.scene.screen.updateState(0);
        this.scene.screen.content.once('animationcomplete', this.startGame, this);
    }

    shuffleTargets(): (Target | MonsterTarget | SmallTarget)[] {
        return this.targets
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    startGame(): void {
        if (!this._isActive) return;

        let currentProgress = Math.floor(Math.random() * (this.targets.length - 1));

        this.tick = this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                let remaining = this.countdown.getRemainingSeconds();
                let minutes = Math.floor((remaining % 3600) / 60);
                let seconds = Math.floor(remaining % 60);
                this.scene.screen.countdown.text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                if (currentProgress > this.targets.length - 1) currentProgress = 0;

                let nextTarget = this.targets[currentProgress];
                if (nextTarget) {
                    nextTarget.team = seconds % 2 ? 'red' : 'blue';
                    nextTarget.show();
                    this.registerTarget(nextTarget);
                    this.scene.time.delayedCall(4000, () => {
                        if (nextTarget.visible) nextTarget.hide();
                        this.unregisterTarget(nextTarget);
                    });
                }

                currentProgress += 1;
            }
        });
        this.countdown = this.scene.time.addEvent({
            delay: 90000,
            callback: this.endGame,
            callbackScope: this,
            paused: true
        });
        this.scene.screen.updateState(1);
        this.countdown.paused = false;
    }

    endGame(): void {
        if (this.tick) this.tick.remove();
        if (this.countdown) this.countdown.remove();
        this.unregisterTargets();
        for (let target of this.targets) target.hide();

        if (!this._isActive) return;

        if (this.blueScore == this.redScore) this.scene.screen.updateState(4);
        else if (this.blueScore < this.redScore) this.scene.screen.updateState(2);
        else if (this.blueScore > this.redScore) this.scene.screen.updateState(3);

        this.scene.screen.content.once('animationcomplete', this.opening, this);
    }

    stop(): void {
        this._isActive = false;
        this.unregisterTargets();
        if (this.tick) this.tick.remove();
        if (this.countdown) this.countdown.remove();
        for (let target of this.targets) target.hide();
    }

    registerTarget(target: MonsterTarget | SmallTarget | Target): void {
        if (!this.scene.triggers.includes(target.hitbox)) this.scene.triggers.push(target.hitbox);
    }

    unregisterTarget(target: MonsterTarget | SmallTarget | Target): void {
        if (this.scene.triggers.includes(target.hitbox)) this.scene.triggers.splice(this.scene.triggers.indexOf(target.hitbox), 1);
    }

    unregisterTargets(): void {
        for (let target of this.targets) this.unregisterTarget(target);
    }

    localize(locale: Locale): void {
        this.title.setFrame(`lounge/gametitle${locale.frame}`);
    }

    private _blueScore = 0;
    get blueScore(): number {
        return this._blueScore
    }

    set blueScore(value: number) {
        this._blueScore = value;
        this.blueScoreText.text = value.toString().padStart(2, '0');
    }

    private _redScore = 0;
    get redScore(): number {
        return this._redScore
    }

    set redScore(value: number) {
        this._redScore = value;
        this.redScoreText.text = value.toString().padStart(2, '0');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
