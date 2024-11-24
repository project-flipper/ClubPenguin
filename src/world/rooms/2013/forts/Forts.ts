
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import TextBox from "../../../../lib/ui/TextBox";
import SnowballTrigger from "../../../../lib/components/SnowballTrigger";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Forts extends Phaser.Scene implements Room {

    constructor() {
        super("Forts");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("forts2013-pack", "assets/world/rooms/2013/forts/forts2013-pack.json");
    }

    editorCreate(): void {

        // forts_sky
        const forts_sky = this.add.image(-22.5, -22.5, "forts2013", "forts/sky");
        forts_sky.setOrigin(0, 0);

        // forts_base
        const forts_base = this.add.image(-157.3875, 103.3875, "forts2013", "forts/base");
        forts_base.setOrigin(0, 0);

        // forts_snowman
        const forts_snowman = this.add.image(1549.0125, 864.9, "forts2013", "forts/snowman");
        forts_snowman.setOrigin(0.48875598086124405, 0.8522222222222222);

        // forts_orangecastletower
        const forts_orangecastletower = this.add.image(974.475, 745.65, "forts2013", "forts/orangecastletower");
        forts_orangecastletower.setOrigin(0.5005084745762712, 0.4032857142857143);

        // forts_orangecastlebase
        const forts_orangecastlebase = this.add.image(542.025, 743.2875, "forts2013", "forts/orangecastlebase");
        forts_orangecastlebase.setOrigin(0.49957346, 0.56315175);

        // orangeflag
        const orangeflag = this.add.sprite(437.5125, 477.225, "forts2013", "forts/orangeflag0001");
        orangeflag.setOrigin(0, 0);

        // forts_orangecastleside
        const forts_orangecastleside = this.add.image(861.75, 789.0749999999999, "forts2013", "forts/orangecastleside");
        forts_orangecastleside.setOrigin(0.5, 0.542007434944238);

        // forts_orangecastlepillar
        const forts_orangecastlepillar = this.add.image(619.2, 855.5625, "forts2013", "forts/orangecastlepillar");
        forts_orangecastlepillar.setOrigin(0.498974358974359, 0.63);

        // forts_bluecastlepillar
        const forts_bluecastlepillar = this.add.image(1195.65, 494.2125, "forts2013", "forts/bluecastlepillar");
        forts_bluecastlepillar.setOrigin(0.49734939759036145, 0.5923469387755101);

        // forts_bluecastleotherwall
        const forts_bluecastleotherwall = this.add.image(982.6875, 461.5875, "forts2013", "forts/bluecastleotherwall");
        forts_bluecastleotherwall.setOrigin(0.4986792452830189, 0.7568181818181817);

        // forts_bluecastletower
        const forts_bluecastletower = this.add.image(853.3125, 493.2, "forts2013", "forts/bluecastletower");
        forts_bluecastletower.setOrigin(0.4978723404255319, 0.3824);

        // forts_bluecastlebase
        const forts_bluecastlebase = this.add.image(946.8, 558.5625, "forts2013", "forts/bluecastlebase");
        forts_bluecastlebase.setOrigin(0.500662251655629, 0.7421812080536913);

        // forts_bluecastleside
        const forts_bluecastleside = this.add.image(1349.1, 588.9375, "forts2013", "forts/bluecastleside");
        forts_bluecastleside.setOrigin(0.5008064516129033, 0.34600000000000003);

        // forts_bluecastlewall
        const forts_bluecastlewall = this.add.image(1202.4, 626.4, "forts2013", "forts/bluecastlewall");
        forts_bluecastlewall.setOrigin(0.49943966, 0.69815789);

        // blueflag
        const blueflag = this.add.sprite(838.575, 337.1625, "forts2013", "forts/blueflag0001");
        blueflag.setOrigin(0, 0);

        // cog
        const cog = this.add.sprite(1444.6125, 124.0875, "forts2013", "forts/cog0001");
        cog.setOrigin(0, 0);

        // forts_clockbase
        const forts_clockbase = this.add.image(1078.0875, -13.95, "forts2013", "forts/clockbase");
        forts_clockbase.setOrigin(0, 0);

        // target
        const target = this.add.sprite(1412.8875, 139.1625, "forts2013", "forts/target0001");
        target.setOrigin(0, 0);

        // clockwork
        const clockwork = this.add.sprite(1108.575, 108.1125, "forts2013", "forts/clockwork0001");
        clockwork.setOrigin(0, 0);

        // clocktext
        const clocktext = this.add.image(1145.8125, 62.55, "forts2013", "forts/clocktext0001");
        clocktext.setOrigin(0, 0);

        // day
        const day = new TextBox(this, 1169, 250, "CCComicrazyW00BoldItalic");
        this.add.existing(day);
        day.angle = 4;
        day.text = "Monday";
        day.fontSize = 18;

        // clock
        const clock = new TextBox(this, 1170.1, 151.0625, "cplcd");
        this.add.existing(clock);
        clock.scaleX = 1;
        clock.scaleY = 1.51;
        clock.text = "0000";
        clock.fontSize = 63;

        // am_pm
        const am_pm = new TextBox(this, 1299.6, 153.225, "cplcd");
        this.add.existing(am_pm);
        am_pm.scaleX = 1;
        am_pm.scaleY = 1;
        am_pm.text = "00";
        am_pm.fontSize = 40.5;

        // snowball_target
        const snowball_target = this.add.image(1469, 175, "forts2013", "forts/target_area");
        snowball_target.visible = false;

        // block
        const block = this.add.image(0, 0, "forts2013", "forts/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // town_btn
        const town_btn = this.add.image(207.5625, 355.3875, "forts2013", "forts/town_btn0004");
        town_btn.alpha = 0.0001;
        town_btn.alphaTopLeft = 0.0001;
        town_btn.alphaTopRight = 0.0001;
        town_btn.alphaBottomLeft = 0.0001;
        town_btn.alphaBottomRight = 0.0001;

        // plaza_btn
        const plaza_btn = this.add.image(1586.25, 303.75, "forts2013", "forts/plaza_btn0004");
        plaza_btn.alpha = 0.0001;
        plaza_btn.alphaTopLeft = 0.0001;
        plaza_btn.alphaTopRight = 0.0001;
        plaza_btn.alphaBottomLeft = 0.0001;
        plaza_btn.alphaBottomRight = 0.0001;

        // rink_btn
        const rink_btn = this.add.image(517.5, 263.8125, "forts2013", "forts/rink_btn0004");
        rink_btn.alpha = 0.0001;
        rink_btn.alphaTopLeft = 0.0001;
        rink_btn.alphaTopRight = 0.0001;
        rink_btn.alphaBottomLeft = 0.0001;
        rink_btn.alphaBottomRight = 0.0001;

        // forts_plaza_trigger
        const forts_plaza_trigger = this.add.image(1570.275, 454.1625, "forts2013", "forts/plaza_trigger");
        forts_plaza_trigger.visible = false;

        // forts_rink_trigger
        const forts_rink_trigger = this.add.image(589.5, 382.1625, "forts2013", "forts/rink_trigger");
        forts_rink_trigger.visible = false;

        // forts_town_trigger
        const forts_town_trigger = this.add.image(159.75, 546.4125, "forts2013", "forts/town_trigger");
        forts_town_trigger.visible = false;

        // lists
        const triggers = [snowball_target, forts_plaza_trigger, forts_rink_trigger, forts_town_trigger];

        // forts_snowman (components)
        new DepthEnabled(forts_snowman);

        // forts_orangecastletower (components)
        new DepthEnabled(forts_orangecastletower);

        // forts_orangecastlebase (components)
        new DepthEnabled(forts_orangecastlebase);

        // orangeflag (components)
        const orangeflagDepthEnabled = new DepthEnabled(orangeflag);
        orangeflagDepthEnabled.automaticSort = false;
        orangeflagDepthEnabled.depth = 743.2875;

        // forts_orangecastleside (components)
        new DepthEnabled(forts_orangecastleside);

        // forts_orangecastlepillar (components)
        new DepthEnabled(forts_orangecastlepillar);

        // forts_bluecastlepillar (components)
        new DepthEnabled(forts_bluecastlepillar);

        // forts_bluecastleotherwall (components)
        new DepthEnabled(forts_bluecastleotherwall);

        // forts_bluecastletower (components)
        new DepthEnabled(forts_bluecastletower);

        // forts_bluecastlebase (components)
        new DepthEnabled(forts_bluecastlebase);

        // forts_bluecastleside (components)
        new DepthEnabled(forts_bluecastleside);

        // forts_bluecastlewall (components)
        new DepthEnabled(forts_bluecastlewall);

        // blueflag (components)
        const blueflagDepthEnabled = new DepthEnabled(blueflag);
        blueflagDepthEnabled.automaticSort = false;
        blueflagDepthEnabled.depth = 558.5625;

        // day (prefab fields)
        day.boxWidth = 175.5;
        day.boxHeight = 32.0625;
        day.horizontalAlign = 1;

        // clock (prefab fields)
        clock.boxWidth = 145.675;
        clock.boxHeight = 229.3875;
        clock.horizontalAlign = 1;

        // am_pm (prefab fields)
        am_pm.boxWidth = 50.0625;
        am_pm.boxHeight = 100.35;
        am_pm.horizontalAlign = 1;

        // snowball_target (components)
        new SnowballTrigger(snowball_target);

        // town_btn (components)
        const town_btnButtonComponent = new ButtonComponent(town_btn);
        town_btnButtonComponent.pixelPerfect = true;

        // plaza_btn (components)
        const plaza_btnButtonComponent = new ButtonComponent(plaza_btn);
        plaza_btnButtonComponent.pixelPerfect = true;

        // rink_btn (components)
        const rink_btnButtonComponent = new ButtonComponent(rink_btn);
        rink_btnButtonComponent.pixelPerfect = true;

        // forts_plaza_trigger (components)
        const forts_plaza_triggerRoomTrigger = new RoomTrigger(forts_plaza_trigger);
        forts_plaza_triggerRoomTrigger.destination = 300;
        forts_plaza_triggerRoomTrigger.playerX = 191.25;
        forts_plaza_triggerRoomTrigger.playerY = 742.5;

        // forts_rink_trigger (components)
        const forts_rink_triggerRoomTrigger = new RoomTrigger(forts_rink_trigger);
        forts_rink_triggerRoomTrigger.destination = 802;
        forts_rink_triggerRoomTrigger.playerX = 855;
        forts_rink_triggerRoomTrigger.playerY = 303.75;

        // forts_town_trigger (components)
        const forts_town_triggerRoomTrigger = new RoomTrigger(forts_town_trigger);
        forts_town_triggerRoomTrigger.destination = 100;
        forts_town_triggerRoomTrigger.playerX = 1485;
        forts_town_triggerRoomTrigger.playerY = 731.25;

        this.orangeflag = orangeflag;
        this.blueflag = blueflag;
        this.cog = cog;
        this.target = target;
        this.clockwork = clockwork;
        this.clocktext = clocktext;
        this.day = day;
        this.clock = clock;
        this.am_pm = am_pm;
        this.snowball_target = snowball_target;
        this.block = block;
        this.town_btn = town_btn;
        this.plaza_btn = plaza_btn;
        this.rink_btn = rink_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public orangeflag!: Phaser.GameObjects.Sprite;
    public blueflag!: Phaser.GameObjects.Sprite;
    public cog!: Phaser.GameObjects.Sprite;
    public target!: Phaser.GameObjects.Sprite;
    public clockwork!: Phaser.GameObjects.Sprite;
    public clocktext!: Phaser.GameObjects.Image;
    public day!: TextBox;
    public clock!: TextBox;
    public am_pm!: TextBox;
    public snowball_target!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public town_btn!: Phaser.GameObjects.Image;
    public plaza_btn!: Phaser.GameObjects.Image;
    public rink_btn!: Phaser.GameObjects.Image;
    public triggers!: Phaser.GameObjects.Image[];

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
        if (data.oninit) data.oninit(this);
    }

    get world(): World {
        return this.scene.get('World') as World;
    }

    get engine(): Engine {
        return this.world.engine;
    }

    get interface(): Interface {
        return this.scene.get('Interface') as Interface;
    }

    create(data: any) {

        this.editorCreate();

        this.orangeflag.play('forts2013-orangeflag-animation');
        this.blueflag.play('forts2013-blueflag-animation');

        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        this.time.addEvent({
            delay: 1000,
            repeat: -1,
            startAt: 1000,
            callback: () => {
                let spt = this.engine.world.getStandardPenguinTime();

                if (this.game.locale.abbreviation != 'de') {
                    this.clock.text = `${spt.getHours() % 12 || 12}:${spt.getMinutes().toString().padStart(2, '0')}`;
                    this.am_pm.text = spt.getHours() >= 12 ? 'PM' : 'AM';
                } else {
                    this.clock.text = `${spt.getHours() || 12}:${spt.getMinutes().toString().padStart(2, '0')}`;
                    this.am_pm.text = '';
                }

                this.day.text = this.game.locale.localize(days[spt.getDay()]);
            }
        });

        this.town_btn.on('release', () => this.world.move(180, 562.5));
        this.rink_btn.on('release', () => this.world.move(551.25, 450));
        this.plaza_btn.on('release', () => this.world.move(1541.25, 506.25));

        SnowballTrigger.getComponent(this.snowball_target).execute = (_engine, _penguin, snowball) => {
            snowball.destroy(true);
            this.sound.play('forts2013-target');
            this.target.play('forts2013-target-animation');
            if (!this.clockwork.anims.isPlaying) this.clockwork.play('forts2013-clockwork-animation');
            if (!this.cog.anims.isPlaying) this.cog.play('forts2013-cog-animation');
        };

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.clocktext.setFrame(`forts/clocktext${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('forts2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
