
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import { App } from "../../../app/app";
import Engine from "../../engine/Engine";
import Interface, { Content } from "../../interface/Interface";
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
        binoculars_wave.angle = 1.5506000000000002;
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
        binoculars_wave_3.angle = 6.709700000000001;
        binoculars_wave_3.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_3.visible = false;

        // binoculars_wave_4
        const binoculars_wave_4 = this.add.sprite(797.4, 467.775, "binoculars", "binoculars/wave10001");
        binoculars_wave_4.scaleX = 1.099411;
        binoculars_wave_4.scaleY = 1.099411;
        binoculars_wave_4.angle = 9.5553;
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
        binoculars_wave_6.angle = 10.0011;
        binoculars_wave_6.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_6.visible = false;

        // binoculars_wave_7
        const binoculars_wave_7 = this.add.sprite(1033.65, 466.3125, "binoculars", "binoculars/wave10001");
        binoculars_wave_7.angle = 14.999700000000002;
        binoculars_wave_7.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_7.visible = false;

        // binoculars_wave_8
        const binoculars_wave_8 = this.add.sprite(1154.7, 463.6125, "binoculars", "binoculars/wave20001");
        binoculars_wave_8.scaleX = 0.999374;
        binoculars_wave_8.scaleY = 0.999374;
        binoculars_wave_8.angle = 11.2686;
        binoculars_wave_8.setOrigin(0.2965454545454545, 0.5628571428571428);
        binoculars_wave_8.visible = false;

        // binoculars_wave_9
        const binoculars_wave_9 = this.add.sprite(1205.775, 456.75, "binoculars", "binoculars/wave10001");
        binoculars_wave_9.scaleX = 0.800003;
        binoculars_wave_9.scaleY = 0.800003;
        binoculars_wave_9.angle = 14.999700000000002;
        binoculars_wave_9.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_9.visible = false;

        // binoculars_wave_10
        const binoculars_wave_10 = this.add.sprite(1322.4375, 481.6125, "binoculars", "binoculars/wave10001");
        binoculars_wave_10.scaleX = 1.099976;
        binoculars_wave_10.scaleY = 1.099976;
        binoculars_wave_10.angle = 18;
        binoculars_wave_10.setOrigin(0.15454954954954955, 0.7876666666666666);
        binoculars_wave_10.visible = false;

        // binoculars_hud
        const binoculars_hud = this.add.image(0, 0, "binoculars", "binoculars/hud");
        binoculars_hud.setOrigin(0, 0);

        // close
        const close = this.add.image(1445, 101, "binoculars", "binoculars/close0001");

        // lists
        const waves1 = [binoculars_wave_1, binoculars_wave, binoculars_wave10001, binoculars_wave_3, binoculars_wave_4, binoculars_wave_6, binoculars_wave_7, binoculars_wave_10, binoculars_wave_9];
        const waves2 = [binoculars_wave20001, binoculars_wave_2, binoculars_wave_5, binoculars_wave_8];

        // blocker (components)
        new InputBlocker(blocker);

        // close (components)
        const closeButtonComponent = new ButtonComponent(close);
        closeButtonComponent.upTexture = { "key": "binoculars", "frame": "binoculars/close0001" };
        closeButtonComponent.overTexture = { "key": "binoculars", "frame": "binoculars/close0002" };
        closeButtonComponent.downTexture = { "key": "binoculars", "frame": "binoculars/close0003" };
        closeButtonComponent.handCursor = true;
        closeButtonComponent.pixelPerfect = true;

        this.blocker = blocker;
        this.close = close;
        this.waves1 = waves1;
        this.waves2 = waves2;

        this.events.emit("scene-awake");
    }

    public blocker!: Phaser.GameObjects.Rectangle;
    public close!: Phaser.GameObjects.Image;
    private waves1!: Phaser.GameObjects.Sprite[];
    private waves2!: Phaser.GameObjects.Sprite[];

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
        this.scene.moveAbove('Interface');

        if (data.oninit) data.oninit(this);
    }

    get engine(): Engine {
        return (this.scene.get('Engine') as Engine);
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    create(data: any) {

        this.editorCreate();

        for (let wave of this.waves1) {
            this.randomPlayAnimation(wave, 0, 1000, 'wave1-animation');
            wave.on('animationcomplete', () => this.randomPlayAnimation(wave, 0, 1000, 'wave1-animation'));
        }

        for (let wave of this.waves2) {
            this.randomPlayAnimation(wave, 0, 1310.34483, 'wave2-animation');
            wave.on('animationcomplete', () => this.randomPlayAnimation(wave, 0, 1310.34483, 'wave2-animation'));
        }

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
