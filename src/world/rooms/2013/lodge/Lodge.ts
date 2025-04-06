
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import GameTrigger from "../../../../lib/components/GameTrigger";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
import WaddleTrigger from "../../../../lib/components/WaddleTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine,  Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Lodge extends Phaser.Scene implements Room {

    constructor() {
        super("Lodge");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("lodge2013-pack", "assets/world/rooms/2013/lodge/lodge2013-pack.json");
    }

    editorCreate(): void {

        // lodge_base
        const lodge_base = this.add.image(0, 0, "lodge2013", "lodge/base");
        lodge_base.setOrigin(0.009299655568312285, -0.002062328139321723);

        // mullet
        const mullet = this.add.image(688.5, 267.75, "lodge2013", "lodge/mullet0001");
        mullet.setOrigin(0, 0);

        // lodge_candle
        const lodge_candle = this.add.image(509.18, 293.96, "lodge2013", "lodge/candle");
        lodge_candle.setOrigin(0, 0);

        // candle
        const candle = this.add.sprite(559.57, 333.23, "lodge2013", "lodge/candleblow0001");
        candle.setOrigin(-1.85583, 1.93026);
        candle.play("lodge2013-candlefire-animation");

        // minuteHand
        const minuteHand = this.add.image(328.73, 391.5, "lodge2013", "lodge/minuteHand");
        minuteHand.setOrigin(0.495, 0.8045);

        // hourHand
        const hourHand = this.add.image(328.73, 391.5, "lodge2013", "lodge/hourHand");
        hourHand.angle = 90;
        hourHand.setOrigin(0.562, 0.76625);

        // clock
        const clock = this.add.sprite(316.13, 331.88, "lodge2013", "lodge/clock0001");
        clock.setOrigin(0, 0);

        // lodge_firebase
        const lodge_firebase = this.add.image(1380.6, 485.44, "lodge2013", "lodge/firebase");
        lodge_firebase.setOrigin(0, 0);

        // lodge_fire0001
        const lodge_fire0001 = this.add.sprite(1450.01, 494.55, "lodge2013", "lodge/fire0001");
        lodge_fire0001.setOrigin(0, 0);
        lodge_fire0001.play("lodge2013-fire-animation");

        // lodge_chimney
        const lodge_chimney = this.add.image(1392.86, 10.69, "lodge2013", "lodge/chimney");
        lodge_chimney.setOrigin(0, 0);

        // entrance
        const entrance = this.add.image(133.99, 518.51, "lodge2013", "lodge/lodgeEntrance0001");
        entrance.setOrigin(0.3292700729927007, 0.48927374301675974);

        // fishDoor
        const fishDoor = this.add.image(990, 130.5, "lodge2013", "lodge/fishDoor0001");
        fishDoor.setOrigin(0, 0);

        // sign
        const sign = this.add.image(1021.73, 220.95, "lodge2013", "lodge/sign0001_0001");
        sign.setOrigin(0, 0);

        // fish
        const fish = this.add.sprite(1136.25, 419.75, "lodge2013", "lodge/fish0001");
        fish.setOrigin(0, 0);
        fish.visible = false;

        // lodge_rods
        const lodge_rods = this.add.image(918.11, 284.64, "lodge2013", "lodge/rods");
        lodge_rods.setOrigin(0.48992, 0.14286);

        // gear
        const gear = this.add.image(894.26, 483.75, "lodge2013", "lodge/gear0001");
        gear.setOrigin(0, 0.60309);

        // lodge_rest
        const lodge_rest = this.add.image(1437.64, 810, "lodge2013", "lodge/rest");
        lodge_rest.setOrigin(0.511213389121339, 0.25555555555555554);

        // lodge_chair0001
        const lodge_chair0001 = this.add.image(1370.25, 926.66, "lodge2013", "lodge/chair0001");
        lodge_chair0001.setOrigin(-0.0006666666666666666, 0.7358688524590163);

        // fishButton
        const fishButton = this.add.image(988.76, 128.92, "lodge2013", "lodge/fishButton");
        fishButton.setOrigin(0, 0);
        fishButton.alpha = 0.0001;
        fishButton.alphaTopLeft = 0.0001;
        fishButton.alphaTopRight = 0.0001;
        fishButton.alphaBottomLeft = 0.0001;
        fishButton.alphaBottomRight = 0.0001;

        // atticButton
        const atticButton = this.add.image(1375.76, 227.25, "lodge2013", "lodge/attic_button0004");
        atticButton.alpha = 0.0001;
        atticButton.alphaTopLeft = 0.0001;
        atticButton.alphaTopRight = 0.0001;
        atticButton.alphaBottomLeft = 0.0001;
        atticButton.alphaBottomRight = 0.0001;

        // entranceButton
        const entranceButton = this.add.image(133.99, 518.51, "lodge2013", "lodge/lodgeEntrance0004");
        entranceButton.setOrigin(0.3292700729927007, 0.48927374301675974);
        entranceButton.alpha = 0.0001;
        entranceButton.alphaTopLeft = 0.0001;
        entranceButton.alphaTopRight = 0.0001;
        entranceButton.alphaBottomLeft = 0.0001;
        entranceButton.alphaBottomRight = 0.0001;

        // candleButton
        const candleButton = this.add.image(589.95, 333.23, "lodge2013", "lodge/candle_button0004");
        candleButton.alpha = 0.0001;
        candleButton.alphaTopLeft = 0.0001;
        candleButton.alphaTopRight = 0.0001;
        candleButton.alphaBottomLeft = 0.0001;
        candleButton.alphaBottomRight = 0.0001;

        // block
        const block = this.add.image(0, 0, "lodge2013", "lodge/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // fish_trigger
        const fish_trigger = this.add.image(1090.01, 509.63, "lodge2013", "lodge/fish_trigger");
        fish_trigger.visible = false;

        // village_trigger
        const village_trigger = this.add.image(172.24, 690.19, "lodge2013", "lodge/village_trigger");
        village_trigger.visible = false;

        // lodge_table_trigger
        const lodge_table_trigger = this.add.image(673.65, 588.38, "lodge2013", "lodge/table_trigger");
        lodge_table_trigger.visible = false;

        // lodge_table_trigger_1
        const lodge_table_trigger_1 = this.add.image(649.01, 887.51, "lodge2013", "lodge/table_trigger");
        lodge_table_trigger_1.visible = false;

        // lodge_table_trigger_2
        const lodge_table_trigger_2 = this.add.image(1146.26, 903.26, "lodge2013", "lodge/table_trigger");
        lodge_table_trigger_2.visible = false;

        // note
        const note = this.add.sprite(923.85, 273.83, "lodge2013", "lodge/note0001");
        note.setOrigin(0, 0);

        // noteButton
        const noteButton = this.add.image(923.85, 273.83, "lodge2013", "lodge/note0009");
        noteButton.setOrigin(0, 0);
        noteButton.alpha = 0.0001;
        noteButton.alphaTopLeft = 0.0001;
        noteButton.alphaTopRight = 0.0001;
        noteButton.alphaBottomLeft = 0.0001;
        noteButton.alphaBottomRight = 0.0001;

        // table1
        const table1 = this.add.image(676.01, 577.69, "lodge2013", "lodge/table10001");
        table1.setOrigin(0.48970588235294116, 0.6617647058823529);

        // table1btn
        const table1btn = this.add.image(671.96, 525.04, "lodge2013", "lodge/table_button0004");
        table1btn.alpha = 0.0001;
        table1btn.alphaTopLeft = 0.0001;
        table1btn.alphaTopRight = 0.0001;
        table1btn.alphaBottomLeft = 0.0001;
        table1btn.alphaBottomRight = 0.0001;

        // table2
        const table2 = this.add.image(698.51, 892.69, "lodge2013", "lodge/table20001");
        table2.setOrigin(0.8088235294117647, 0.8011363636363636);

        // table2btn
        const table2btn = this.add.image(653.96, 831.04, "lodge2013", "lodge/table_button0004");
        table2btn.alpha = 0.0001;
        table2btn.alphaTopLeft = 0.0001;
        table2btn.alphaTopRight = 0.0001;
        table2btn.alphaBottomLeft = 0.0001;
        table2btn.alphaBottomRight = 0.0001;

        // table3
        const table3 = this.add.image(1148.51, 915.19, "lodge2013", "lodge/table30001");
        table3.setOrigin(0.45478723404255317, 0.7601351351351351);

        // table3btn
        const table3btn = this.add.image(1148.96, 853.54, "lodge2013", "lodge/table_button0004");
        table3btn.alpha = 0.0001;
        table3btn.alphaTopLeft = 0.0001;
        table3btn.alphaTopRight = 0.0001;
        table3btn.alphaBottomLeft = 0.0001;
        table3btn.alphaBottomRight = 0.0001;

        // catalog
        const catalog = this.add.image(1533.15, 946.8, "lodge2013", "lodge/catalog0001");
        catalog.setOrigin(-0.15957, -0.0186);

        // catalogbtn
        const catalogbtn = this.add.image(1533.15, 946.8, "lodge2013", "lodge/catalog0004");
        catalogbtn.setOrigin(-0.1595744680851064, -0.01859504132231405);
        catalogbtn.alpha = 0.0001;
        catalogbtn.alphaTopLeft = 0.0001;
        catalogbtn.alphaTopRight = 0.0001;
        catalogbtn.alphaBottomLeft = 0.0001;
        catalogbtn.alphaBottomRight = 0.0001;

        // lodge_attic_trigger
        const lodge_attic_trigger = this.add.image(1367.89, 524.25, "lodge2013", "lodge/attic_trigger");
        lodge_attic_trigger.visible = false;

        // gearButton
        const gearButton = this.add.image(894.26, 483.75, "lodge2013", "lodge/gear0004");
        gearButton.setOrigin(0, 0.60309);
        gearButton.alpha = 0.0001;
        gearButton.alphaTopLeft = 0.0001;
        gearButton.alphaTopRight = 0.0001;
        gearButton.alphaBottomLeft = 0.0001;
        gearButton.alphaBottomRight = 0.0001;

        // lists
        const triggers = [fish_trigger, village_trigger, lodge_table_trigger, lodge_table_trigger_2, lodge_table_trigger_1, lodge_attic_trigger];

        // gear (components)
        new DepthEnabled(gear);

        // lodge_rest (components)
        new DepthEnabled(lodge_rest);

        // lodge_chair0001 (components)
        new DepthEnabled(lodge_chair0001);

        // fishButton (components)
        const fishButtonButtonComponent = new ButtonComponent(fishButton);
        fishButtonButtonComponent.handCursor = true;
        fishButtonButtonComponent.pixelPerfect = true;

        // atticButton (components)
        const atticButtonButtonComponent = new ButtonComponent(atticButton);
        atticButtonButtonComponent.handCursor = true;

        // entranceButton (components)
        const entranceButtonButtonComponent = new ButtonComponent(entranceButton);
        entranceButtonButtonComponent.handCursor = true;
        entranceButtonButtonComponent.pixelPerfect = true;

        // candleButton (components)
        new ButtonComponent(candleButton);

        // fish_trigger (components)
        const fish_triggerGameTrigger = new GameTrigger(fish_trigger);
        fish_triggerGameTrigger.game_id = "fish";
        fish_triggerGameTrigger.prompt = "fish_prompt";

        // village_trigger (components)
        const village_triggerRoomTrigger = new RoomTrigger(village_trigger);
        village_triggerRoomTrigger.destination = 200;
        village_triggerRoomTrigger.playerX = 1057.5;
        village_triggerRoomTrigger.playerY = 607.5;

        // lodge_table_trigger (components)
        const lodge_table_triggerWaddleTrigger = new WaddleTrigger(lodge_table_trigger);
        lodge_table_triggerWaddleTrigger.game_id = "four";
        lodge_table_triggerWaddleTrigger.prompt = "four_prompt";
        lodge_table_triggerWaddleTrigger.waddle_id = 205;
        lodge_table_triggerWaddleTrigger.waddle_type = "TABLE";
        lodge_table_triggerWaddleTrigger.seat1 = true;
        lodge_table_triggerWaddleTrigger.seat1frame = 23;
        lodge_table_triggerWaddleTrigger.seat1x = 606.82;
        lodge_table_triggerWaddleTrigger.seat1y = 531.23;
        lodge_table_triggerWaddleTrigger.done1x = 534.26;
        lodge_table_triggerWaddleTrigger.done1y = 618.3;
        lodge_table_triggerWaddleTrigger.seat2 = true;
        lodge_table_triggerWaddleTrigger.seat2frame = 19;
        lodge_table_triggerWaddleTrigger.seat2x = 730.69;
        lodge_table_triggerWaddleTrigger.seat2y = 613.01;
        lodge_table_triggerWaddleTrigger.done2x = 665.21;
        lodge_table_triggerWaddleTrigger.done2y = 681.19;

        // lodge_table_trigger_1 (components)
        const lodge_table_trigger_1WaddleTrigger = new WaddleTrigger(lodge_table_trigger_1);
        lodge_table_trigger_1WaddleTrigger.game_id = "four";
        lodge_table_trigger_1WaddleTrigger.prompt = "four_prompt";
        lodge_table_trigger_1WaddleTrigger.waddle_id = 206;
        lodge_table_trigger_1WaddleTrigger.waddle_type = "TABLE";
        lodge_table_trigger_1WaddleTrigger.seat1 = true;
        lodge_table_trigger_1WaddleTrigger.seat1frame = 17;
        lodge_table_trigger_1WaddleTrigger.seat1x = 715.84;
        lodge_table_trigger_1WaddleTrigger.seat1y = 845.78;
        lodge_table_trigger_1WaddleTrigger.done1x = 773.33;
        lodge_table_trigger_1WaddleTrigger.done1y = 922.28;
        lodge_table_trigger_1WaddleTrigger.seat2 = true;
        lodge_table_trigger_1WaddleTrigger.seat2frame = 21;
        lodge_table_trigger_1WaddleTrigger.seat2x = 600.07;
        lodge_table_trigger_1WaddleTrigger.seat2y = 915.41;
        lodge_table_trigger_1WaddleTrigger.done2x = 636.41;
        lodge_table_trigger_1WaddleTrigger.done2y = 965.7;

        // lodge_table_trigger_2 (components)
        const lodge_table_trigger_2WaddleTrigger = new WaddleTrigger(lodge_table_trigger_2);
        lodge_table_trigger_2WaddleTrigger.game_id = "four";
        lodge_table_trigger_2WaddleTrigger.prompt = "four_prompt";
        lodge_table_trigger_2WaddleTrigger.waddle_type = "TABLE";
        lodge_table_trigger_2WaddleTrigger.seat1 = true;
        lodge_table_trigger_2WaddleTrigger.seat1frame = 21;
        lodge_table_trigger_2WaddleTrigger.seat1x = 1070.77;
        lodge_table_trigger_2WaddleTrigger.seat1y = 927.68;
        lodge_table_trigger_2WaddleTrigger.done1x = 1114.2;
        lodge_table_trigger_2WaddleTrigger.done1y = 985.16;
        lodge_table_trigger_2WaddleTrigger.seat2 = true;
        lodge_table_trigger_2WaddleTrigger.seat2frame = 17;
        lodge_table_trigger_2WaddleTrigger.seat2x = 1216.13;
        lodge_table_trigger_2WaddleTrigger.seat2y = 868.73;
        lodge_table_trigger_2WaddleTrigger.done2x = 1259.77;
        lodge_table_trigger_2WaddleTrigger.done2y = 962.66;

        // note (components)
        const noteDepthEnabled = new DepthEnabled(note);
        noteDepthEnabled.automaticSort = false;

        // noteButton (components)
        const noteButtonButtonComponent = new ButtonComponent(noteButton);
        noteButtonButtonComponent.handCursor = true;

        // table1 (components)
        new DepthEnabled(table1);

        // table1btn (components)
        const table1btnButtonComponent = new ButtonComponent(table1btn);
        table1btnButtonComponent.handCursor = true;
        table1btnButtonComponent.pixelPerfect = true;

        // table2 (components)
        new DepthEnabled(table2);

        // table2btn (components)
        const table2btnButtonComponent = new ButtonComponent(table2btn);
        table2btnButtonComponent.handCursor = true;
        table2btnButtonComponent.pixelPerfect = true;

        // table3 (components)
        new DepthEnabled(table3);

        // table3btn (components)
        const table3btnButtonComponent = new ButtonComponent(table3btn);
        table3btnButtonComponent.handCursor = true;
        table3btnButtonComponent.pixelPerfect = true;

        // catalog (components)
        const catalogDepthEnabled = new DepthEnabled(catalog);
        catalogDepthEnabled.automaticSort = false;
        catalogDepthEnabled.depth = 1080;

        // catalogbtn (components)
        const catalogbtnButtonComponent = new ButtonComponent(catalogbtn);
        catalogbtnButtonComponent.handCursor = true;
        catalogbtnButtonComponent.pixelPerfect = true;

        // lodge_attic_trigger (components)
        const lodge_attic_triggerRoomTrigger = new RoomTrigger(lodge_attic_trigger);
        lodge_attic_triggerRoomTrigger.destination = 221;
        lodge_attic_triggerRoomTrigger.playerX = 1086.75;
        lodge_attic_triggerRoomTrigger.playerY = 630;

        // gearButton (components)
        new ButtonComponent(gearButton);

        this.mullet = mullet;
        this.candle = candle;
        this.minuteHand = minuteHand;
        this.hourHand = hourHand;
        this.clock = clock;
        this.entrance = entrance;
        this.fishDoor = fishDoor;
        this.sign = sign;
        this.fish = fish;
        this.gear = gear;
        this.fishButton = fishButton;
        this.atticButton = atticButton;
        this.entranceButton = entranceButton;
        this.candleButton = candleButton;
        this.block = block;
        this.note = note;
        this.noteButton = noteButton;
        this.table1 = table1;
        this.table1btn = table1btn;
        this.table2 = table2;
        this.table2btn = table2btn;
        this.table3 = table3;
        this.table3btn = table3btn;
        this.catalog = catalog;
        this.catalogbtn = catalogbtn;
        this.gearButton = gearButton;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public mullet!: Phaser.GameObjects.Image;
    public candle!: Phaser.GameObjects.Sprite;
    public minuteHand!: Phaser.GameObjects.Image;
    public hourHand!: Phaser.GameObjects.Image;
    public clock!: Phaser.GameObjects.Sprite;
    public entrance!: Phaser.GameObjects.Image;
    public fishDoor!: Phaser.GameObjects.Image;
    public sign!: Phaser.GameObjects.Image;
    public fish!: Phaser.GameObjects.Sprite;
    public gear!: Phaser.GameObjects.Image;
    public fishButton!: Phaser.GameObjects.Image;
    public atticButton!: Phaser.GameObjects.Image;
    public entranceButton!: Phaser.GameObjects.Image;
    public candleButton!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public note!: Phaser.GameObjects.Sprite;
    public noteButton!: Phaser.GameObjects.Image;
    public table1!: Phaser.GameObjects.Image;
    public table1btn!: Phaser.GameObjects.Image;
    public table2!: Phaser.GameObjects.Image;
    public table2btn!: Phaser.GameObjects.Image;
    public table3!: Phaser.GameObjects.Image;
    public table3btn!: Phaser.GameObjects.Image;
    public catalog!: Phaser.GameObjects.Image;
    public catalogbtn!: Phaser.GameObjects.Image;
    public gearButton!: Phaser.GameObjects.Image;
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

        this.time.addEvent({
            delay: 1000,
            repeat: -1,
            startAt: 1000,
            callback: () => {
                let spt = this.engine.world.getStandardPenguinTime();
                let minutes = spt.getMinutes();

                this.hourHand.rotation = 30 * spt.getHours();
                this.minuteHand.rotation = 6 * minutes;

                if (minutes == 0 || minutes == 30) {
                    if (!this.clock.anims.isPlaying && !this.chiming) this.chime();
                    this.chiming = true;
                } else this.chiming = false;

            }
        });

        this.entranceButton.on('out', () => {
            this.entrance.setFrame('lodge/lodgeEntrance0001');
            this.sound.play('lodge2013-doorclose');
        });
        this.entranceButton.on('over', () => {
            this.entrance.setFrame('lodge/lodgeEntrance0002');
            this.sound.play('lodge2013-dooropen');
        });
        this.entranceButton.on('release', () => this.world.move(207, 704.25));

        this.fishButton.on('out', () => {
            this.fishDoor.setFrame('lodge/fishDoor0001');
            this.sign.setFrame(`lodge/sign${this.game.locale.frame}_0001`);
            this.fish.visible = false;
            this.interface.hideHint();
            this.sound.play('lodge2013-doorclose');
        });
        this.fishButton.on('over', () => {
            this.fishDoor.setFrame('lodge/fishDoor0002');
            this.sign.setFrame(`lodge/sign${this.game.locale.frame}_0002`);
            this.fish.visible = true;
            this.fish.play('lodge2013-fish-animation');
            this.interface.showLocalizedHint({ x: 1072.46, y: 320.63 }, 'fish_hint');
            this.sound.play('lodge2013-dooropen');
            this.sound.play('lodge2013-fish');
        });
        this.fishButton.on('release', () => this.world.move(1170, 382.5));

        this.atticButton.on('release', () => this.world.move(1361.25, 517.5));

        this.candleButton.on('over', () => {
            if (this.candle.anims.currentAnim?.key == 'lodge2013-candlefire-animation') this.candle.play('lodge2013-candleblow-animation').chain('lodge2013-candlefire-animation');
        });

        this.gearButton.on('out', () => {
            this.gear.setFrame('lodge/gear0001');
            this.sound.play('lodge2013-gearclose');
        });
        this.gearButton.on('over', () => {
            this.gear.setFrame('lodge/gear0002');
            this.sound.play('lodge2013-gearopen');
        });

        this.noteButton.on('out', () => {
            this.note.stop();
            this.note.setFrame('lodge/note0001');
        });
        this.noteButton.on('over', () => {
            this.note.stop();
            this.note.play('lodge2013-note-animation');
        });

        this.catalogbtn.on('out', () => this.catalog.setFrame('lodge/catalog0001'));
        this.catalogbtn.on('over', () => this.catalog.setFrame('lodge/catalog0002'));

        this.table1btn.on('out', () => {
            this.interface.hideHint();
            this.table1.setFrame('lodge/table10001');
        });
        this.table1btn.on('over', () => {
            this.interface.showLocalizedHint(this.table1btn, 'four_hint');
            this.table1.setFrame('lodge/table10002');
        });
        this.table1btn.on('release', () => this.world.move(this.table1.x, this.table1.y));

        this.table2btn.on('out', () => {
            this.interface.hideHint();
            this.table2.setFrame('lodge/table20001');
        });
        this.table2btn.on('over', () => {
            this.interface.showLocalizedHint(this.table2btn, 'four_hint');
            this.table2.setFrame('lodge/table20002');
        });
        this.table2btn.on('release', () => this.world.move(this.table2.x, this.table2.y));

        this.table3btn.on('out', () => {
            this.interface.hideHint();
            this.table3.setFrame('lodge/table30001');
        });
        this.table3btn.on('over', () => {
            this.interface.showLocalizedHint(this.table3btn, 'four_hint');
            this.table3.setFrame('lodge/table30002');
        });
        this.table3btn.on('release', () => this.world.move(this.table3.x, this.table3.y));

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    public chiming = false;
    public soundchime = false;

    update(time: number, delta: number): void {
        if (this.clock.frame.name == 'lodge/clock0005' && !this.soundchime) {
            this.sound.play('lodge2013-clock');
            this.soundchime = true;
        } else this.soundchime = false;
    }

    chime(): void {
        this.clock.play('lodge2013-clock-animation');
        this.clock.once('animationcomplete', () => this.clock.setFrame('lodge/clock0001'));
    }

    localize(locale: Locale): void {
        this.mullet.setFrame(`lodge/mullet${locale.frame}`);
        this.sign.setFrame(`lodge/sign${locale.frame}_000${this.sign.frame.name.endsWith('1') ? '1' : '2'}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('lodge2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
