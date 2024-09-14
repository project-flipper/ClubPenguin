
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TextBox from "../../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import { Locale } from "@clubpenguin/app/locale";
import Lounge from "../Lounge";
import { App } from "@clubpenguin/app/app";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
/* END-USER-IMPORTS */

export default class TargetGameScreen extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // lounge_hangingBar_1
        const lounge_hangingBar_1 = scene.add.image(160.65, -57.2625, "lounge", "lounge/hangingBar");
        this.add(lounge_hangingBar_1);

        // lounge_hangingBar
        const lounge_hangingBar = scene.add.image(-145.125, -57.2625, "lounge", "lounge/hangingBar");
        this.add(lounge_hangingBar);

        // lounge_screenbg
        const lounge_screenbg = scene.add.image(-166.6, -27.05, "lounge", "lounge/screenbg");
        lounge_screenbg.setOrigin(0, 0);
        this.add(lounge_screenbg);

        // content
        const content = scene.add.sprite(8.575, 32.2125, "_MISSING");
        content.visible = false;
        this.add(content);

        // countdown
        const countdown = new TextBox(scene, -66, 0, "LCD");
        countdown.visible = false;
        countdown.text = "01:30";
        countdown.fontSize = -81;
        this.add(countdown);

        // lounge_screencover
        const lounge_screencover = scene.add.image(-175.05, -35.4375, "lounge", "lounge/screencover");
        lounge_screencover.setOrigin(0, 0);
        this.add(lounge_screencover);

        // countdown (prefab fields)
        countdown.boxWidth = 224.775;
        countdown.boxHeight = 108;

        this.content = content;
        this.countdown = countdown;

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    public content: Phaser.GameObjects.Sprite;
    public countdown: TextBox;

    /* START-USER-CODE */

    declare scene: Lounge;
    public animations: { opening: Phaser.Animations.Animation, redWins: Phaser.Animations.Animation, blueWins: Phaser.Animations.Animation, tie: Phaser.Animations.Animation };

    generateAnimations(): void {
        this.animations = {
            opening: this.generateAnimation('opening', 1, 360),
            redWins: this.generateAnimation('redWins', 1, 360),
            blueWins: this.generateAnimation('blueWins', 1, 360),
            tie: this.generateAnimation('tie', 1, 360),
        };
    }

    generateAnimation(key: string, from: number, to: number): Phaser.Animations.Animation {
        let animationKey = `lounge-screen-${key}`;
        if (this.scene.anims.exists(animationKey)) this.scene.anims.remove(animationKey);

        let frames: Phaser.Types.Animations.AnimationFrame[] = [];
        if (to != undefined) {
            for (let i = from; i <= to; i++) {
                frames.push({
                    key: 'lounge-screen',
                    frame: `lounge_screen/${key}${String(i).padStart(4, '0')}`,
                    duration: 0
                });
            }
        } else {
            frames = [{
                key: 'lounge-screen',
                frame: `lounge_screen/${key}`,
                duration: 0
            }];
        }

        let animation = this.scene.anims.create({
            key: animationKey,
            frames,
            frameRate: 24,
            skipMissedFrames: true,
            repeat: 0
        });

        if (animation == false) this.scene.anims.get(animationKey);
        else return animation;
    }

    updateState(state: number): void {
        switch (state) {
            case 0:
                this.content.play(this.animations.opening);
                this.content.visible = true;
                this.countdown.visible = false;
                break;
            case 1:
                this.content.stop();
                this.content.visible = false;
                this.countdown.visible = true;
                break;
            case 2:
                this.content.play(this.animations.redWins);
                this.content.visible = true;
                this.countdown.visible = false;
                break;
            case 3:
                this.content.play(this.animations.blueWins);
                this.content.visible = true;
                this.countdown.visible = false;
                break;
            case 4:
                this.content.play(this.animations.tie);
                this.content.visible = true;
                this.countdown.visible = false;
                break;
        }
    }

    public language: string;
    async load(language: string): Promise<void> {
        if (this.language == language) return;

        let key = 'lounge-screen';
        if (this.scene.textures.exists(key)) this.scene.game.unloadMultiatlas(key);

        let load = this.scene.scene.get('Load') as Load;
        load.track(new LoaderTask('Lounge screen loadder', this.scene.load));

        this.scene.load.multiatlas({
            key,
            atlasURL: `assets/world/rooms/lounge/lounge-${language}.json`,
            path: 'assets/world/rooms/lounge'
        });
        this.scene.load.start();
        await new Promise<void>((resolve, reject) => this.scene.load.once('complete', (_loader: Phaser.Loader.LoaderPlugin, _totalComplete: number, totalFailed: number) => {
            if (totalFailed > 0) reject(new Error(`${key} failed to load!`));
            else resolve();
        }));
        this.generateAnimations();

        this.language = language;
    }

    unload(app: App): void {
        app.unloadMultiatlas('lounge-screen');
    }

    localize(locale: Locale): void {
        this.load(locale.abbreviation.toString());
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
