
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/components/InputBlocker";
import ButtonComponent from "../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import Interface, { Content } from "@clubpenguin/world/interface/Interface";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Binoculars extends Phaser.Scene implements Content {

    constructor() {
        super("Binoculars");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("binoculars-pack", "assets/world/content/binoculars/binoculars-pack.json");
    }

    editorCreate(): void {

        // blocker
        const blocker = this.add.rectangle(0, 0, 1710, 1080);
        blocker.setOrigin(0, 0);
        blocker.isFilled = true;
        blocker.fillColor = 0;

        // binoculars_base
        const binoculars_base = this.add.image(194.5125, 72, "binoculars", "binoculars/base");
        binoculars_base.setOrigin(0, 0);

        // binoculars_wave10001
        const binoculars_wave10001 = this.add.sprite(326.025, 479.7, "binoculars", "binoculars/wave10001");
        binoculars_wave10001.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave10001.visible = false;

        // binoculars_wave20001
        const binoculars_wave20001 = this.add.sprite(362.25, 463.6125, "binoculars", "binoculars/wave20001");
        binoculars_wave20001.setOrigin(0.2965454545454545, 0.5628571428571428);
        binoculars_wave20001.visible = false;

        // binoculars_wave
        const binoculars_wave = this.add.sprite(449.775, 481.725, "binoculars", "binoculars/wave10001");
        binoculars_wave.scaleX = 1.09;
        binoculars_wave.scaleY = 1.09;
        binoculars_wave.angle = 1.5506000000000313;
        binoculars_wave.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave.visible = false;

        // binoculars_wave_1
        const binoculars_wave_1 = this.add.sprite(459.9, 460.575, "binoculars", "binoculars/wave10001");
        binoculars_wave_1.scaleX = 0.899994;
        binoculars_wave_1.scaleY = 0.899994;
        binoculars_wave_1.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_1.visible = false;

        // binoculars_wave_2
        const binoculars_wave_2 = this.add.sprite(521.325, 449.6625, "binoculars", "binoculars/wave20001");
        binoculars_wave_2.setOrigin(0.2965454545454545, 0.5628571428571428);
        binoculars_wave_2.visible = false;

        // binoculars_wave_3
        const binoculars_wave_3 = this.add.sprite(678.375, 460.0125, "binoculars", "binoculars/wave10001");
        binoculars_wave_3.angle = 6.709699999999998;
        binoculars_wave_3.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_3.visible = false;

        // binoculars_wave_4
        const binoculars_wave_4 = this.add.sprite(797.4, 467.775, "binoculars", "binoculars/wave10001");
        binoculars_wave_4.scaleX = 1.099411;
        binoculars_wave_4.scaleY = 1.099411;
        binoculars_wave_4.angle = 9.555299999999988;
        binoculars_wave_4.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_4.visible = false;

        // binoculars_wave_5
        const binoculars_wave_5 = this.add.sprite(875.25, 450.1125, "binoculars", "binoculars/wave20001");
        binoculars_wave_5.setOrigin(0.2965454545454545, 0.5628571428571428);
        binoculars_wave_5.visible = false;

        // binoculars_wave_6
        const binoculars_wave_6 = this.add.sprite(976.275, 445.275, "binoculars", "binoculars/wave10001");
        binoculars_wave_6.scaleX = 0.799973;
        binoculars_wave_6.scaleY = 0.799973;
        binoculars_wave_6.angle = 10.001099999999951;
        binoculars_wave_6.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_6.visible = false;

        // binoculars_wave_7
        const binoculars_wave_7 = this.add.sprite(1033.65, 466.3125, "binoculars", "binoculars/wave10001");
        binoculars_wave_7.angle = 14.999700000000075;
        binoculars_wave_7.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_7.visible = false;

        // binoculars_wave_8
        const binoculars_wave_8 = this.add.sprite(1154.7, 463.6125, "binoculars", "binoculars/wave20001");
        binoculars_wave_8.scaleX = 0.999374;
        binoculars_wave_8.scaleY = 0.999374;
        binoculars_wave_8.angle = 11.268599999999992;
        binoculars_wave_8.setOrigin(0.2965454545454545, 0.5628571428571428);
        binoculars_wave_8.visible = false;

        // binoculars_wave_9
        const binoculars_wave_9 = this.add.sprite(1205.775, 456.75, "binoculars", "binoculars/wave10001");
        binoculars_wave_9.scaleX = 0.800003;
        binoculars_wave_9.scaleY = 0.800003;
        binoculars_wave_9.angle = 14.999700000000075;
        binoculars_wave_9.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_9.visible = false;

        // binoculars_wave_10
        const binoculars_wave_10 = this.add.sprite(1322.4375, 481.6125, "binoculars", "binoculars/wave10001");
        binoculars_wave_10.scaleX = 1.099976;
        binoculars_wave_10.scaleY = 1.099976;
        binoculars_wave_10.angle = 18;
        binoculars_wave_10.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_10.visible = false;

        // boat1
        const boat1 = this.add.container(1438.5375, 526.3875);
        boat1.visible = false;

        // binoculars_boat1
        const binoculars_boat1 = this.add.image(317.475, 57.15, "binoculars", "binoculars/boat1");
        binoculars_boat1.setOrigin(0.49682316118935843, 0.48025210084033615);
        boat1.add(binoculars_boat1);

        // tide1
        const tide1 = this.add.sprite(202.5, 99.45, "binoculars", "binoculars/tide0001");
        tide1.setOrigin(0.37620567375886527, 0.2980701754385965);
        tide1.play("binoculars-tide-animation");
        boat1.add(tide1);

        // tide2
        const tide2 = this.add.sprite(625.5, 85.3875, "binoculars", "binoculars/tide0001");
        tide2.scaleX = 0.56922619;
        tide2.scaleY = 0.56922619;
        tide2.setOrigin(0.37620567375886527, 0.2980701754385965);
        tide2.play("binoculars-tide-animation");
        boat1.add(tide2);

        // boat2
        const boat2 = this.add.container(-431.1, 521.8875);
        boat2.visible = false;

        // penguin
        const penguin = this.add.sprite(396.225, 64.35, "binoculars", "binoculars/penguin0001");
        penguin.setOrigin(3.30192, 0.757059);
        penguin.play("binoculars-penguin-animation");
        boat2.add(penguin);

        // binoculars_boat2
        const binoculars_boat2 = this.add.image(396.225, 64.35, "binoculars", "binoculars/boat2");
        binoculars_boat2.setOrigin(0.476205, 0.480252);
        boat2.add(binoculars_boat2);

        // tide3
        const tide3 = this.add.sprite(526.6125, 103.95, "binoculars", "binoculars/tide0001");
        tide3.scaleX = -1;
        tide3.setOrigin(0.37620567, 0.29807018);
        tide3.play("binoculars-tide-animation");
        boat2.add(tide3);

        // tide4
        const tide4 = this.add.sprite(103.725, 89.8875, "binoculars", "binoculars/tide0001");
        tide4.scaleX = -0.56922619;
        tide4.scaleY = 0.56922619;
        tide4.setOrigin(0.37620567375886527, 0.2980701754385965);
        tide4.play("binoculars-tide-animation");
        boat2.add(tide4);

        // fish1
        const fish1 = this.add.layer();
        fish1.visible = false;

        // fish
        const fish = this.add.sprite(1144.575, 739.9125, "binoculars", "binoculars/fish0001");
        fish.scaleX = -1;
        fish.angle = 90;
        fish.setOrigin(0.46732394366197183, 0.3676923076923077);
        fish.play("binoculars-fish-animation");
        fish1.add(fish);

        // rectangle_1
        const rectangle_1 = this.add.rectangle(1070.8875, 670.5, 133.875, 133.7625);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.isFilled = true;
        rectangle_1.fillColor = 39628;
        fish1.add(rectangle_1);

        // rectangle
        const rectangle = this.add.rectangle(733.8375, 739.575, 133.875, 133.7625);
        rectangle.setOrigin(0, 0);
        rectangle.isFilled = true;
        rectangle.fillColor = 39628;
        fish1.add(rectangle);

        // splash1
        const splash1 = this.add.sprite(1131.525, 670.6125, "binoculars", "binoculars/splash10001");
        splash1.setOrigin(0.534884, 0.892857);
        splash1.visible = false;
        fish1.add(splash1);

        // splash2
        const splash2 = this.add.sprite(799.425, 738.3375, "binoculars", "binoculars/splash20001");
        splash2.setOrigin(0.531915, 0.926136);
        splash2.visible = false;
        fish1.add(splash2);

        // binoculars_hud
        const binoculars_hud = this.add.image(0, 0, "binoculars", "binoculars/hud");
        binoculars_hud.setOrigin(0, 0);

        // close
        const close = this.add.image(1649.25, 58.5, "binoculars", "binoculars/close0001");

        // lists
        const waves1 = [binoculars_wave_1, binoculars_wave, binoculars_wave10001, binoculars_wave_3, binoculars_wave_4, binoculars_wave_6, binoculars_wave_7, binoculars_wave_10, binoculars_wave_9];
        const waves2 = [binoculars_wave20001, binoculars_wave_2, binoculars_wave_5, binoculars_wave_8];

        // blocker (components)
        new InputBlocker(blocker);

        // close (components)
        const closeButtonComponent = new ButtonComponent(close);
        closeButtonComponent.upTexture = {"key":"binoculars","frame":"binoculars/close0001"};
        closeButtonComponent.overTexture = {"key":"binoculars","frame":"binoculars/close0002"};
        closeButtonComponent.downTexture = {"key":"binoculars","frame":"binoculars/close0003"};
        closeButtonComponent.handCursor = true;
        closeButtonComponent.pixelPerfect = true;

        this.blocker = blocker;
        this.boat1 = boat1;
        this.penguin = penguin;
        this.boat2 = boat2;
        this.fish = fish;
        this.splash1 = splash1;
        this.splash2 = splash2;
        this.fish1 = fish1;
        this.close = close;
        this.waves1 = waves1;
        this.waves2 = waves2;

        this.events.emit("scene-awake");
    }

    public blocker!: Phaser.GameObjects.Rectangle;
    public boat1!: Phaser.GameObjects.Container;
    public penguin!: Phaser.GameObjects.Sprite;
    public boat2!: Phaser.GameObjects.Container;
    public fish!: Phaser.GameObjects.Sprite;
    public splash1!: Phaser.GameObjects.Sprite;
    public splash2!: Phaser.GameObjects.Sprite;
    public fish1!: Phaser.GameObjects.Layer;
    public close!: Phaser.GameObjects.Image;
    private waves1!: Phaser.GameObjects.Sprite[];
    private waves2!: Phaser.GameObjects.Sprite[];

    /* START-USER-CODE */

    declare game: App;

    public hidesInterface = true;

    init(data: any): void {
        this.scene.moveBelow('Interface');

        if (data.oninit) data.oninit(this);
    }

    get world(): World {
        return (this.scene.get('World') as World);
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    create(data: any) {

        this.editorCreate();

        for (let wave of this.waves1) {
            this.randomPlayAnimation(wave, 0, 1000, 'binoculars-wave1-animation');
            wave.on('animationcomplete', () => this.randomPlayAnimation(wave, 0, 1000, 'binoculars-wave1-animation'));
        }

        for (let wave of this.waves2) {
            this.randomPlayAnimation(wave, 0, 1310.34483, 'binoculars-wave2-animation');
            wave.on('animationcomplete', () => this.randomPlayAnimation(wave, 0, 1310.34483, 'binoculars-wave2-animation'));
        }

        this.time.addEvent({
            delay: 9000,
            loop: true,
            callback: () => {
                switch (Phaser.Math.Between(0, 2)) {
                    case 0:
                        this.boat1.visible = true;
                        this.boat2.visible = false;
                        this.fish1.visible = false;

                        this.tweens.add({
                            targets: this.boat1,
                            x: { from: 1438.5375, to: -467.8875 },
                            duration: 3250,
                            onComplete: () => this.boat1.visible = false
                        });
                        break;
                    case 1:
                        this.boat1.visible = false;
                        this.boat2.visible = true;
                        this.fish1.visible = false;

                        this.tweens.add({
                            targets: this.boat2,
                            x: { from: -431.1, to: 1981.575 },
                            duration: 3708.33333,
                            onComplete: () => this.boat2.visible = false
                        })
                        break;
                    case 2:
                        this.boat1.visible = false;
                        this.boat2.visible = false;
                        this.fish1.visible = true;

                        let start = new Phaser.Math.Vector2(1144.575, 739.9125);
                        let end = new Phaser.Math.Vector2(798.525, 758.25);
                        let curve = new Phaser.Curves.QuadraticBezier(
                            start,
                            new Phaser.Math.Vector2(965.8125, 504.925),
                            end
                        );

                        this.add.timeline([
                            {
                                at: 41.6666667,
                                tween: {
                                    targets: this.fish,
                                    angle: { from: 92.9489, to: -90.9957 },
                                    duration: 1000,
                                    onStart: () => this.fish.visible = true,
                                    onUpdate: tween => {
                                        let position = curve.getPoint(tween.totalProgress);
                                        this.fish.x = position.x;
                                        this.fish.y = position.y;
                                    },
                                    onComplete: tween => {
                                        let position = curve.getPoint(tween.totalProgress);
                                        this.fish.x = position.x;
                                        this.fish.y = position.y;
                                        this.fish.visible = false;
                                        this.fish1.visible = false;
                                    }
                                }
                            },
                            {
                                at: 125,
                                run: () => this.splash1.play('binoculars-splash1-animation')
                            },
                            {
                                at: 958.333333,
                                run: () => this.splash2.play('binoculars-splash2-animation')
                            }
                        ]).play();
                        break;
                }
            }
        });

        this.close.on('release', () => this.interface.safeCloseContent());

        if (data.onready) data.onready(this);
    }

    randomPlayAnimation(wave: Phaser.GameObjects.Sprite, minTime: number, maxTime: number, animationKey: string): void {
        this.time.delayedCall(Phaser.Math.Between(minTime, maxTime), () => wave.play(animationKey))
    }

    unload(interface_: Interface): void {
        interface_.game.unloadAssetPack('binoculars-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
