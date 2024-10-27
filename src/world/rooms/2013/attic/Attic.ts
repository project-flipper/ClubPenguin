
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import WaddleTrigger from "../../../../lib/components/WaddleTrigger";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine,  Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Attic extends Phaser.Scene implements Room {

    constructor() {
        super("Attic");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("attic-pack", "assets/world/rooms/2013/attic/attic-pack.json");
    }

    editorCreate(): void {

        // attic_base
        const attic_base = this.add.image(-14.06, -7.31, "attic", "attic/base");
        attic_base.setOrigin(0, 0);

        // attic_couchside
        const attic_couchside = this.add.image(251.33, 672.19, "attic", "attic/couchside");
        attic_couchside.setOrigin(0.5008121827411167, 0.6189399293286219);

        // attic_foreground
        const attic_foreground = this.add.image(-6.19, 267.19, "attic", "attic/foreground");
        attic_foreground.setOrigin(0, 0);

        // horse
        const horse = this.add.sprite(1538.89, 704.48, "attic", "attic/horse0001");
        horse.setOrigin(0.5604982206405694, 0.4780453257790368);

        // horseButton
        const horseButton = this.add.image(1538.89, 704.48, "attic", "attic/horsehover0004");
        horseButton.setOrigin(0.42047138047138044, 0.5097897897897897);
        horseButton.alpha = 0.01;
        horseButton.alphaTopLeft = 0.01;
        horseButton.alphaTopRight = 0.01;
        horseButton.alphaBottomLeft = 0.01;
        horseButton.alphaBottomRight = 0.01;

        // block
        const block = this.add.image(0, 0, "attic", "attic/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // table1
        const table1 = this.add.image(676.01, 712.69, "attic", "attic/table10001");
        table1.setOrigin(0.48970588235294116, 0.6617647058823529);

        // tabletrigger1
        const tabletrigger1 = this.add.image(678.26, 709.76, "attic", "attic/tabletrigger");
        tabletrigger1.visible = false;

        // tablebtn1
        const tablebtn1 = this.add.image(671.96, 660.04, "attic", "attic/tablebtn0004");
        tablebtn1.alpha = 0.01;
        tablebtn1.alphaTopLeft = 0.01;
        tablebtn1.alphaTopRight = 0.01;
        tablebtn1.alphaBottomLeft = 0.01;
        tablebtn1.alphaBottomRight = 0.01;

        // table2
        const table2 = this.add.image(968.51, 667.69, "attic", "attic/table20001");
        table2.setOrigin(0.5089285714285714, 0.709731543624161);

        // tabletrigger2
        const tabletrigger2 = this.add.image(968.51, 658.01, "attic", "attic/tabletrigger");
        tabletrigger2.visible = false;

        // tablebtn2
        const tablebtn2 = this.add.image(964.46, 606.04, "attic", "attic/tablebtn0004");
        tablebtn2.alpha = 0.01;
        tablebtn2.alphaTopLeft = 0.01;
        tablebtn2.alphaTopRight = 0.01;
        tablebtn2.alphaBottomLeft = 0.01;
        tablebtn2.alphaBottomRight = 0.01;

        // table3
        const table3 = this.add.image(541.01, 870.19, "attic", "attic/table30001");
        table3.setOrigin(0.8088235294117647, 0.8072519083969466);

        // tabletrigger3
        const tabletrigger3 = this.add.image(901.01, 876.26, "attic", "attic/tabletrigger");
        tabletrigger3.visible = false;

        // tablebtn3
        const tablebtn3 = this.add.image(496.46, 808.54, "attic", "attic/tablebtn0004");
        tablebtn3.alpha = 0.01;
        tablebtn3.alphaTopLeft = 0.01;
        tablebtn3.alphaTopRight = 0.01;
        tablebtn3.alphaBottomLeft = 0.01;
        tablebtn3.alphaBottomRight = 0.01;

        // table4
        const table4 = this.add.image(901.01, 870.19, "attic", "attic/table20001");
        table4.setOrigin(0.5089285714285714, 0.709731543624161);

        // tabletrigger4
        const tabletrigger4 = this.add.image(491.51, 860.51, "attic", "attic/tabletrigger");
        tabletrigger4.visible = false;

        // tablebtn4
        const tablebtn4 = this.add.image(896.96, 808.54, "attic", "attic/tablebtn0004");
        tablebtn4.alpha = 0.01;
        tablebtn4.alphaTopLeft = 0.01;
        tablebtn4.alphaTopRight = 0.01;
        tablebtn4.alphaBottomLeft = 0.01;
        tablebtn4.alphaBottomRight = 0.01;

        // table5
        const table5 = this.add.image(1283.51, 915.19, "attic", "attic/table40001");
        table5.setOrigin(0.45478723404255317, 0.7601351351351351);

        // tabletrigger5
        const tabletrigger5 = this.add.image(1285.76, 903.26, "attic", "attic/tabletrigger");
        tabletrigger5.visible = false;

        // tablebtn5
        const tablebtn5 = this.add.image(1283.96, 853.54, "attic", "attic/tablebtn0004");
        tablebtn5.alpha = 0.01;
        tablebtn5.alphaTopLeft = 0.01;
        tablebtn5.alphaTopRight = 0.01;
        tablebtn5.alphaBottomLeft = 0.01;
        tablebtn5.alphaBottomRight = 0.01;

        // attic_lodge_trigger
        const attic_lodge_trigger = this.add.image(1280.14, 703.13, "attic", "attic/lodge_trigger");
        attic_lodge_trigger.visible = false;

        // lists
        const triggers = [attic_lodge_trigger, tabletrigger1, tabletrigger2, tabletrigger3, tabletrigger4, tabletrigger5];

        // attic_couchside (components)
        new DepthEnabled(attic_couchside);

        // attic_foreground (components)
        const attic_foregroundDepthEnabled = new DepthEnabled(attic_foreground);
        attic_foregroundDepthEnabled.automaticSort = false;
        attic_foregroundDepthEnabled.depth = 1080;

        // horse (components)
        new DepthEnabled(horse);

        // horseButton (components)
        const horseButtonButtonComponent = new ButtonComponent(horseButton);
        horseButtonButtonComponent.handCursor = true;

        // table1 (components)
        new DepthEnabled(table1);

        // tabletrigger1 (components)
        const tabletrigger1WaddleTrigger = new WaddleTrigger(tabletrigger1);
        tabletrigger1WaddleTrigger.game_id = "four";
        tabletrigger1WaddleTrigger.prompt = "four_prompt";
        tabletrigger1WaddleTrigger.waddle_id = 200;
        tabletrigger1WaddleTrigger.seat1 = true;
        tabletrigger1WaddleTrigger.seat1frame = 23;
        tabletrigger1WaddleTrigger.seat1x = 606.82;
        tabletrigger1WaddleTrigger.seat1y = 666.23;
        tabletrigger1WaddleTrigger.done1x = 534.26;
        tabletrigger1WaddleTrigger.done1y = 753.3;
        tabletrigger1WaddleTrigger.seat2 = true;
        tabletrigger1WaddleTrigger.seat2frame = 19;
        tabletrigger1WaddleTrigger.seat2x = 730.69;
        tabletrigger1WaddleTrigger.seat2y = 748.01;
        tabletrigger1WaddleTrigger.done2x = 665.21;
        tabletrigger1WaddleTrigger.done2y = 816.19;

        // tablebtn1 (components)
        const tablebtn1ButtonComponent = new ButtonComponent(tablebtn1);
        tablebtn1ButtonComponent.handCursor = true;

        // table2 (components)
        new DepthEnabled(table2);

        // tabletrigger2 (components)
        const tabletrigger2WaddleTrigger = new WaddleTrigger(tabletrigger2);
        tabletrigger2WaddleTrigger.game_id = "four";
        tabletrigger2WaddleTrigger.prompt = "four_prompt";
        tabletrigger2WaddleTrigger.waddle_id = 201;
        tabletrigger2WaddleTrigger.seat1 = true;
        tabletrigger2WaddleTrigger.seat1frame = 23;
        tabletrigger2WaddleTrigger.seat1x = 904.95;
        tabletrigger2WaddleTrigger.seat1y = 617.06;
        tabletrigger2WaddleTrigger.done1x = 844.43;
        tabletrigger2WaddleTrigger.done1y = 697.28;
        tabletrigger2WaddleTrigger.seat2 = true;
        tabletrigger2WaddleTrigger.seat2frame = 19;
        tabletrigger2WaddleTrigger.seat2x = 1017.68;
        tabletrigger2WaddleTrigger.seat2y = 690.41;
        tabletrigger2WaddleTrigger.done2x = 981.34;
        tabletrigger2WaddleTrigger.done2y = 740.7;

        // tablebtn2 (components)
        const tablebtn2ButtonComponent = new ButtonComponent(tablebtn2);
        tablebtn2ButtonComponent.handCursor = true;

        // table3 (components)
        new DepthEnabled(table3);

        // tabletrigger3 (components)
        const tabletrigger3WaddleTrigger = new WaddleTrigger(tabletrigger3);
        tabletrigger3WaddleTrigger.game_id = "four";
        tabletrigger3WaddleTrigger.prompt = "four_prompt";
        tabletrigger3WaddleTrigger.waddle_id = 203;
        tabletrigger3WaddleTrigger.seat1 = true;
        tabletrigger3WaddleTrigger.seat1frame = 23;
        tabletrigger3WaddleTrigger.seat1x = 837.45;
        tabletrigger3WaddleTrigger.seat1y = 819.56;
        tabletrigger3WaddleTrigger.done1x = 776.93;
        tabletrigger3WaddleTrigger.done1y = 899.78;
        tabletrigger3WaddleTrigger.seat2 = true;
        tabletrigger3WaddleTrigger.seat2frame = 19;
        tabletrigger3WaddleTrigger.seat2x = 950.18;
        tabletrigger3WaddleTrigger.seat2y = 892.91;
        tabletrigger3WaddleTrigger.done2x = 913.84;
        tabletrigger3WaddleTrigger.done2y = 943.2;

        // tablebtn3 (components)
        const tablebtn3ButtonComponent = new ButtonComponent(tablebtn3);
        tablebtn3ButtonComponent.handCursor = true;

        // table4 (components)
        new DepthEnabled(table4);

        // tabletrigger4 (components)
        const tabletrigger4WaddleTrigger = new WaddleTrigger(tabletrigger4);
        tabletrigger4WaddleTrigger.game_id = "four";
        tabletrigger4WaddleTrigger.prompt = "four_prompt";
        tabletrigger4WaddleTrigger.waddle_id = 202;
        tabletrigger4WaddleTrigger.seat1 = true;
        tabletrigger4WaddleTrigger.seat1frame = 17;
        tabletrigger4WaddleTrigger.seat1x = 558.34;
        tabletrigger4WaddleTrigger.seat1y = 823.28;
        tabletrigger4WaddleTrigger.done1x = 615.82;
        tabletrigger4WaddleTrigger.done1y = 899.78;
        tabletrigger4WaddleTrigger.seat2 = true;
        tabletrigger4WaddleTrigger.seat2frame = 21;
        tabletrigger4WaddleTrigger.seat2x = 442.58;
        tabletrigger4WaddleTrigger.seat2y = 892.91;
        tabletrigger4WaddleTrigger.done2x = 478.91;
        tabletrigger4WaddleTrigger.done2y = 943.2;

        // tablebtn4 (components)
        const tablebtn4ButtonComponent = new ButtonComponent(tablebtn4);
        tablebtn4ButtonComponent.handCursor = true;

        // table5 (components)
        new DepthEnabled(table5);

        // tabletrigger5 (components)
        const tabletrigger5WaddleTrigger = new WaddleTrigger(tabletrigger5);
        tabletrigger5WaddleTrigger.game_id = "four";
        tabletrigger5WaddleTrigger.prompt = "four_prompt";
        tabletrigger5WaddleTrigger.waddle_id = 204;
        tabletrigger5WaddleTrigger.seat1 = true;
        tabletrigger5WaddleTrigger.seat1frame = 21;
        tabletrigger5WaddleTrigger.seat1x = 1205.77;
        tabletrigger5WaddleTrigger.seat1y = 927.68;
        tabletrigger5WaddleTrigger.done1x = 1249.2;
        tabletrigger5WaddleTrigger.done1y = 985.16;
        tabletrigger5WaddleTrigger.seat2 = true;
        tabletrigger5WaddleTrigger.seat2frame = 17;
        tabletrigger5WaddleTrigger.seat2x = 1351.13;
        tabletrigger5WaddleTrigger.seat2y = 868.73;
        tabletrigger5WaddleTrigger.done2x = 1394.78;
        tabletrigger5WaddleTrigger.done2y = 962.66;

        // tablebtn5 (components)
        const tablebtn5ButtonComponent = new ButtonComponent(tablebtn5);
        tablebtn5ButtonComponent.handCursor = true;

        // attic_lodge_trigger (components)
        const attic_lodge_triggerRoomTrigger = new RoomTrigger(attic_lodge_trigger);
        attic_lodge_triggerRoomTrigger.destination = 220;
        attic_lodge_triggerRoomTrigger.playerX = 1289.25;
        attic_lodge_triggerRoomTrigger.playerY = 632.25;

        this.horse = horse;
        this.horseButton = horseButton;
        this.block = block;
        this.table1 = table1;
        this.tabletrigger1 = tabletrigger1;
        this.tablebtn1 = tablebtn1;
        this.table2 = table2;
        this.tabletrigger2 = tabletrigger2;
        this.tablebtn2 = tablebtn2;
        this.table3 = table3;
        this.tabletrigger3 = tabletrigger3;
        this.tablebtn3 = tablebtn3;
        this.table4 = table4;
        this.tabletrigger4 = tabletrigger4;
        this.tablebtn4 = tablebtn4;
        this.table5 = table5;
        this.tablebtn5 = tablebtn5;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public horse!: Phaser.GameObjects.Sprite;
    public horseButton!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public table1!: Phaser.GameObjects.Image;
    public tabletrigger1!: Phaser.GameObjects.Image;
    public tablebtn1!: Phaser.GameObjects.Image;
    public table2!: Phaser.GameObjects.Image;
    public tabletrigger2!: Phaser.GameObjects.Image;
    public tablebtn2!: Phaser.GameObjects.Image;
    public table3!: Phaser.GameObjects.Image;
    public tabletrigger3!: Phaser.GameObjects.Image;
    public tablebtn3!: Phaser.GameObjects.Image;
    public table4!: Phaser.GameObjects.Image;
    public tabletrigger4!: Phaser.GameObjects.Image;
    public tablebtn4!: Phaser.GameObjects.Image;
    public table5!: Phaser.GameObjects.Image;
    public tablebtn5!: Phaser.GameObjects.Image;
    public triggers!: Phaser.GameObjects.Image[];

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
        this.scene.moveBelow('Interface');

        if (data.oninit) data.oninit(this);
    }

    get world(): World {
        return (this.scene.get('World') as World);
    }

    get engine(): Engine {
        return this.world.engine;
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    create(data: any) {

        this.editorCreate();

        this.horseButton.on('over', () => {
            this.horse.play('attic-horse-animation');
            this.sound.play('attic_horse');
        });

        this.tablebtn1.on('out', () => {
            this.interface.hideHint();
            this.table1.setFrame('attic/table10001');
        });
        this.tablebtn1.on('over', () => {
            this.interface.showLocalizedHint(this.tablebtn1, 'four_hint');
            this.table1.setFrame('attic/table10002');
        });
        this.tablebtn1.on('release', () => this.world.move(this.table1.x, this.table1.y));

        this.tablebtn2.on('out', () => {
            this.interface.hideHint();
            this.table2.setFrame('attic/table20001');
        });
        this.tablebtn2.on('over', () => {
            this.interface.showLocalizedHint(this.tablebtn2, 'four_hint');
            this.table2.setFrame('attic/table20002');
        });
        this.tablebtn2.on('release', () => this.world.move(this.table2.x, this.table2.y));

        this.tablebtn3.on('out', () => {
            this.interface.hideHint();
            this.table3.setFrame('attic/table30001');
        });
        this.tablebtn3.on('over', () => {
            this.interface.showLocalizedHint(this.tablebtn3, 'four_hint');
            this.table3.setFrame('attic/table30002');
        });
        this.tablebtn3.on('release', () => this.world.move(this.table3.x, this.table3.y));

        this.tablebtn4.on('out', () => {
            this.interface.hideHint();
            this.table4.setFrame('attic/table20001');
        });
        this.tablebtn4.on('over', () => {
            this.interface.showLocalizedHint(this.tablebtn4, 'four_hint');
            this.table4.setFrame('attic/table20002');
        });
        this.tablebtn4.on('release', () => this.world.move(this.table4.x, this.table4.y));

        this.tablebtn5.on('out', () => {
            this.interface.hideHint();
            this.table5.setFrame('attic/table40001');
        });
        this.tablebtn5.on('over', () => {
            this.interface.showLocalizedHint(this.tablebtn5, 'four_hint');
            this.table5.setFrame('attic/table40002');
        });
        this.tablebtn5.on('release', () => this.world.move(this.table5.x, this.table5.y));



        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {

    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('attic-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
