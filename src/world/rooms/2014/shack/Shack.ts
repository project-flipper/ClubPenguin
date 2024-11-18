
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
import PressureTrigger from "../../../../lib/components/PressureTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Shack extends Phaser.Scene implements Room {

    constructor() {
        super("Shack");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("shack2014-pack", "assets/world/rooms/2014/shack/shack2014-pack.json");
    }

    editorCreate(): void {

        // shack_sky
        const shack_sky = this.add.image(-150.75, -45, "shack2014", "shack/sky");
        shack_sky.setOrigin(0, 0);

        // shack_base
        const shack_base = this.add.image(-40.3875, -67.05, "shack2014", "shack/base");
        shack_base.setOrigin(0, 0);

        // shack_crop1
        const shack_crop1 = this.add.image(1640.025, 841.6125, "shack2014", "shack/crop1");
        shack_crop1.setOrigin(0.5512, 0.5708955223880597);

        // shack_crop2
        const shack_crop2 = this.add.image(1610.8875, 880.425, "shack2014", "shack/crop2");
        shack_crop2.setOrigin(0.4546, 0.5708955223880597);

        // shack_crop3
        const shack_crop3 = this.add.image(1560.2625, 907.3125, "shack2014", "shack/crop3");
        shack_crop3.setOrigin(0.6133333333333334, 0.591044776119403);

        // shack_crop4
        const shack_crop4 = this.add.image(1525.95, 954, "shack2014", "shack/crop4");
        shack_crop4.setOrigin(0.4546, 0.5708955223880597);

        // shack_crop5
        const shack_crop5 = this.add.image(1482.75, 981.675, "shack2014", "shack/crop5");
        shack_crop5.setOrigin(0.6507843137254902, 0.6136363636363636);

        // shack_crop6
        const shack_crop6 = this.add.image(1699.9875, 872.775, "shack2014", "shack/crop6");
        shack_crop6.setOrigin(0.4970149253731343, 0.4973684210526316);

        // shack_crop7
        const shack_crop7 = this.add.image(1651.8375, 915.975, "shack2014", "shack/crop7");
        shack_crop7.setOrigin(0.5012658227848101, 0.49470588235294116);

        // shack_crop8
        const shack_crop8 = this.add.image(1608.3, 950.2875, "shack2014", "shack/crop8");
        shack_crop8.setOrigin(0.5555, 0.6075384615384616);

        // shack_crop9
        const shack_crop9 = this.add.image(1569.6, 1003.5, "shack2014", "shack/crop9");
        shack_crop9.setOrigin(0.5525555555555555, 0.6056164383561644);

        // shack_crop10
        const shack_crop10 = this.add.image(1740.9375, 911.5875, "shack2014", "shack/crop10");
        shack_crop10.setOrigin(0.49694444444444447, 0.49592592592592594);

        // shack_crop11
        const shack_crop11 = this.add.image(1702.0125, 960.1875, "shack2014", "shack/crop11");
        shack_crop11.setOrigin(0.6128358208955225, 0.5854237288135593);

        // shack_crop12
        const shack_crop12 = this.add.image(1648.575, 1005.075, "shack2014", "shack/crop12");
        shack_crop12.setOrigin(0.616268656716418, 0.5854237288135593);

        // shack_crop13
        const shack_crop13 = this.add.image(1608.525, 1050.8625, "shack2014", "shack/crop13");
        shack_crop13.setOrigin(0.49694444444444447, 0.49592592592592594);

        // shack_crop14
        const shack_crop14 = this.add.image(1725.525, 1071.45, "shack2014", "shack/crop14");
        shack_crop14.setOrigin(0.5547126436781609, 0.9396373056994818);

        // shack_crop15
        const shack_crop15 = this.add.image(1673.6625, 1130.9625, "shack2014", "shack/crop15");
        shack_crop15.setOrigin(0.4984, 0.9357603686635945);

        // shack_arcs
        const shack_arcs = this.add.image(237.2625, 458.55, "shack2014", "shack/arcs");
        shack_arcs.setOrigin(0.65876289, 0.80915493);

        // flag
        const flag = this.add.sprite(257.7375, 88.9875, "shack2014", "shack/flag0001");
        flag.setOrigin(0, 0);

        // shack_pole
        const shack_pole = this.add.image(367.9875, 279.675, "shack2014", "shack/pole");
        shack_pole.setOrigin(0.45234042553191495, 0.5091770573566085);

        // schooldoor
        const schooldoor = this.add.image(401.0375, 216.1875, "shack2014", "shack/schooldoor0001");
        schooldoor.setOrigin(0, 0);

        // schooldoor_btn
        const schooldoor_btn = this.add.image(401.0375, 216.1875, "shack2014", "shack/schooldoor0004");
        schooldoor_btn.setOrigin(0, 0);
        schooldoor_btn.alpha = 0.0001;
        schooldoor_btn.alphaTopLeft = 0.0001;
        schooldoor_btn.alphaTopRight = 0.0001;
        schooldoor_btn.alphaBottomLeft = 0.0001;
        schooldoor_btn.alphaBottomRight = 0.0001;

        // minelight
        const minelight = this.add.image(1038.125, 288.875, "shack2014", "shack/mine_btn0001");
        minelight.setOrigin(0, 0);
        minelight.visible = false;

        // shack_mineroof
        const shack_mineroof = this.add.image(1036.35, 287.6625, "shack2014", "shack/mineroof");
        shack_mineroof.setOrigin(0, 0);

        // minesign
        const minesign = this.add.image(1057.125, 286.8375, "shack2014", "shack/minesign0001");
        minesign.setOrigin(0, 0);

        // mine_btn
        const mine_btn = this.add.image(1038.125, 288.875, "shack2014", "shack/mine_btn0004");
        mine_btn.setOrigin(0, 0);
        mine_btn.alpha = 0.0001;
        mine_btn.alphaTopLeft = 0.0001;
        mine_btn.alphaTopRight = 0.0001;
        mine_btn.alphaBottomLeft = 0.0001;
        mine_btn.alphaBottomRight = 0.0001;

        // shack_clock
        this.add.image(532.1, 145.9, "shack2014", "shack/clock");

        // hourHandShadow
        const hourHandShadow = this.add.image(531.65, 145.5625, "shack2014", "shack/hourHandShadow");
        hourHandShadow.setOrigin(0.5, 0.88722222);

        // hourHand
        const hourHand = this.add.image(532.1, 145.9, "shack2014", "shack/hourHand");
        hourHand.setOrigin(0.5, 0.8872222222222222);

        // minuteHandShadow
        const minuteHandShadow = this.add.image(531.65, 145.675, "shack2014", "shack/minuteHandShadow");
        minuteHandShadow.setOrigin(0.45, 0.92074074);

        // minuteHand
        const minuteHand = this.add.image(533.225, 145.675, "shack2014", "shack/minuteHand");
        minuteHand.setOrigin(0.5, 0.92074074);

        // shack_center
        const shack_center = this.add.image(798.75, 526.6125, "shack2014", "shack/center");
        shack_center.setOrigin(0.48094303, 0.1862069);

        // shack_tree
        const shack_tree = this.add.image(21.2625, 539.8875, "shack2014", "shack/tree");
        shack_tree.setOrigin(0.37493569, 0.78931174);

        // shack_bench
        const shack_bench = this.add.image(1387.8, 618.3, "shack2014", "shack/bench");
        shack_bench.setOrigin(0.52941176, 0.37666667);

        // shack_lamp
        const shack_lamp = this.add.image(1187.1, 523.0125, "shack2014", "shack/lamp");
        shack_lamp.setOrigin(0.49607143, 0.63275);

        // shack_entranceside
        const shack_entranceside = this.add.image(59.85, 751.275, "shack2014", "shack/entranceside");
        shack_entranceside.setOrigin(0.6267857142857143, 0.7648943661971831);

        // shack_cpuentrance
        const shack_cpuentrance = this.add.image(343.125, 963.9, "shack2014", "shack/cpuentrance");
        shack_cpuentrance.setOrigin(0.26383954, 0.71635739);

        // cpu
        const cpu = this.add.image(164.25, 573.6375, "shack2014", "shack/cpu0001");
        cpu.setOrigin(0, 0);

        // shack_book
        const shack_book = this.add.image(792.3375, 875.5875, "shack2014", "shack/book");
        shack_book.setOrigin(0.46153846, 0.20376812);

        // shack_case
        const shack_case = this.add.image(985.6125, 905.7375, "shack2014", "shack/case");
        shack_case.setOrigin(0.42025157, 0.25366667);

        // shack_mug
        const shack_mug = this.add.image(920.5875, 960.4125, "shack2014", "shack/mug");
        shack_mug.setOrigin(0.53488889, 0.61595238);

        // shack_bucket
        const shack_bucket = this.add.image(1509.8625, 844.65, "shack2014", "shack/bucket");
        shack_bucket.setOrigin(0.47181818, 0.47307692);

        // shack_pole1
        const shack_pole1 = this.add.image(1156.275, 861.1875, "shack2014", "shack/pole1");
        shack_pole1.setOrigin(0.42043478260869566, 0.9208609271523179);

        // shack_volleynet
        const shack_volleynet = this.add.image(1424.7, 920.25, "shack2014", "shack/volleynet");
        shack_volleynet.setOrigin(0.9661732851985559, 1.4016788321167883);

        // shack_pole2
        const shack_pole2 = this.add.image(1421.4375, 948.825, "shack2014", "shack/pole2");
        shack_pole2.setOrigin(0.2682051282051282, 0.9266129032258065);

        // volleyball
        const volleyball = this.add.sprite(1197, 924.75, "shack2014", "shack/volleyball");
        volleyball.setOrigin(0.40970149, 0.42890625);

        // shack_foreground
        const shack_foreground = this.add.image(1199.3625, 948.2625, "shack2014", "shack/foreground");
        shack_foreground.setOrigin(0, 0);

        // shack_tree1
        const shack_tree1 = this.add.image(1665, 697.275, "shack2014", "shack/tree1");
        shack_tree1.setOrigin(0.47062802, 0.62583673);

        // shack_rock
        const shack_rock = this.add.image(1660.1625, 787.05, "shack2014", "shack/rock");
        shack_rock.setOrigin(0.51798507, 0.42423913);

        // block
        const block = this.add.image(-45, -45, "shack2014", "shack/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // exit_btn
        const exit_btn = this.add.image(134.2125, 908.55, "shack2014", "shack/exit_btn");
        exit_btn.alpha = 0.0001;
        exit_btn.alphaTopLeft = 0.0001;
        exit_btn.alphaTopRight = 0.0001;
        exit_btn.alphaBottomLeft = 0.0001;
        exit_btn.alphaBottomRight = 0.0001;

        // dojoext_btn
        const dojoext_btn = this.add.image(840.825, 237.0375, "shack2014", "shack/dojoext_btn");
        dojoext_btn.alpha = 0.0001;
        dojoext_btn.alphaTopLeft = 0.0001;
        dojoext_btn.alphaTopRight = 0.0001;
        dojoext_btn.alphaBottomLeft = 0.0001;
        dojoext_btn.alphaBottomRight = 0.0001;

        // shack_dojo_mc
        const shack_dojo_mc = this.add.image(844.65, 372.15, "shack2014", "shack/dojo_mc");
        shack_dojo_mc.visible = false;

        // shack_school_mc
        const shack_school_mc = this.add.image(554.0625, 448.9875, "shack2014", "shack/school_mc");
        shack_school_mc.visible = false;

        // shack_mine_mc
        const shack_mine_mc = this.add.image(1091.025, 481.95, "shack2014", "shack/mine_mc");
        shack_mine_mc.visible = false;

        // shack_forest_mc
        const shack_forest_mc = this.add.image(171, 947.3625, "shack2014", "shack/forest_mc");
        shack_forest_mc.visible = false;

        // volleya_mc
        const volleya_mc = this.add.image(1361.025, 823.5, "shack2014", "shack/volleya_mc");
        volleya_mc.visible = false;

        // volleyb_mc
        const volleyb_mc = this.add.image(1205.6625, 969.525, "shack2014", "shack/volleyb_mc");
        volleyb_mc.visible = false;

        // lists
        const triggers = [shack_dojo_mc, shack_forest_mc, shack_mine_mc, shack_school_mc, volleyb_mc, volleya_mc];

        // shack_crop1 (components)
        new DepthEnabled(shack_crop1);

        // shack_crop2 (components)
        new DepthEnabled(shack_crop2);

        // shack_crop3 (components)
        new DepthEnabled(shack_crop3);

        // shack_crop4 (components)
        new DepthEnabled(shack_crop4);

        // shack_crop5 (components)
        new DepthEnabled(shack_crop5);

        // shack_crop6 (components)
        new DepthEnabled(shack_crop6);

        // shack_crop7 (components)
        new DepthEnabled(shack_crop7);

        // shack_crop8 (components)
        new DepthEnabled(shack_crop8);

        // shack_crop9 (components)
        new DepthEnabled(shack_crop9);

        // shack_crop10 (components)
        new DepthEnabled(shack_crop10);

        // shack_crop11 (components)
        new DepthEnabled(shack_crop11);

        // shack_crop12 (components)
        new DepthEnabled(shack_crop12);

        // shack_crop13 (components)
        new DepthEnabled(shack_crop13);

        // shack_crop14 (components)
        new DepthEnabled(shack_crop14);

        // shack_crop15 (components)
        new DepthEnabled(shack_crop15);

        // shack_arcs (components)
        new DepthEnabled(shack_arcs);

        // flag (components)
        const flagDepthEnabled = new DepthEnabled(flag);
        flagDepthEnabled.automaticSort = false;
        flagDepthEnabled.depth = 279.675;

        // shack_pole (components)
        new DepthEnabled(shack_pole);

        // schooldoor_btn (components)
        const schooldoor_btnButtonComponent = new ButtonComponent(schooldoor_btn);
        schooldoor_btnButtonComponent.handCursor = true;
        schooldoor_btnButtonComponent.pixelPerfect = true;

        // mine_btn (components)
        const mine_btnButtonComponent = new ButtonComponent(mine_btn);
        mine_btnButtonComponent.handCursor = true;
        mine_btnButtonComponent.pixelPerfect = true;

        // shack_center (components)
        new DepthEnabled(shack_center);

        // shack_tree (components)
        new DepthEnabled(shack_tree);

        // shack_bench (components)
        new DepthEnabled(shack_bench);

        // shack_lamp (components)
        new DepthEnabled(shack_lamp);

        // shack_entranceside (components)
        new DepthEnabled(shack_entranceside);

        // shack_cpuentrance (components)
        new DepthEnabled(shack_cpuentrance);

        // cpu (components)
        const cpuDepthEnabled = new DepthEnabled(cpu);
        cpuDepthEnabled.automaticSort = false;
        cpuDepthEnabled.depth = 963.9;

        // shack_book (components)
        new DepthEnabled(shack_book);

        // shack_case (components)
        new DepthEnabled(shack_case);

        // shack_mug (components)
        new DepthEnabled(shack_mug);

        // shack_bucket (components)
        new DepthEnabled(shack_bucket);

        // shack_pole1 (components)
        new DepthEnabled(shack_pole1);

        // shack_volleynet (components)
        new DepthEnabled(shack_volleynet);

        // shack_pole2 (components)
        new DepthEnabled(shack_pole2);

        // volleyball (components)
        new DepthEnabled(volleyball);

        // shack_foreground (components)
        const shack_foregroundDepthEnabled = new DepthEnabled(shack_foreground);
        shack_foregroundDepthEnabled.automaticSort = false;
        shack_foregroundDepthEnabled.depth = 1080;

        // shack_tree1 (components)
        new DepthEnabled(shack_tree1);

        // shack_rock (components)
        new DepthEnabled(shack_rock);

        // exit_btn (components)
        const exit_btnButtonComponent = new ButtonComponent(exit_btn);
        exit_btnButtonComponent.pixelPerfect = true;

        // dojoext_btn (components)
        const dojoext_btnButtonComponent = new ButtonComponent(dojoext_btn);
        dojoext_btnButtonComponent.pixelPerfect = true;

        // shack_dojo_mc (components)
        const shack_dojo_mcRoomTrigger = new RoomTrigger(shack_dojo_mc);
        shack_dojo_mcRoomTrigger.destination = 321;
        shack_dojo_mcRoomTrigger.playerX = 877.5;
        shack_dojo_mcRoomTrigger.playerY = 855;

        // shack_school_mc (components)
        const shack_school_mcRoomTrigger = new RoomTrigger(shack_school_mc);
        shack_school_mcRoomTrigger.destination = 122;
        shack_school_mcRoomTrigger.playerX = 1451.25;
        shack_school_mcRoomTrigger.playerY = 832.5;

        // shack_mine_mc (components)
        const shack_mine_mcRoomTrigger = new RoomTrigger(shack_mine_mc);
        shack_mine_mcRoomTrigger.destination = 808;
        shack_mine_mcRoomTrigger.playerX = 888.75;
        shack_mine_mcRoomTrigger.playerY = 393.75;

        // shack_forest_mc (components)
        const shack_forest_mcRoomTrigger = new RoomTrigger(shack_forest_mc);
        shack_forest_mcRoomTrigger.destination = 809;
        shack_forest_mcRoomTrigger.playerX = 1417.5;
        shack_forest_mcRoomTrigger.playerY = 461.25;

        // volleya_mc (components)
        new PressureTrigger(volleya_mc);

        // volleyb_mc (components)
        new PressureTrigger(volleyb_mc);

        this.flag = flag;
        this.schooldoor = schooldoor;
        this.schooldoor_btn = schooldoor_btn;
        this.minelight = minelight;
        this.minesign = minesign;
        this.mine_btn = mine_btn;
        this.hourHandShadow = hourHandShadow;
        this.hourHand = hourHand;
        this.minuteHandShadow = minuteHandShadow;
        this.minuteHand = minuteHand;
        this.cpu = cpu;
        this.volleyball = volleyball;
        this.block = block;
        this.exit_btn = exit_btn;
        this.dojoext_btn = dojoext_btn;
        this.volleya_mc = volleya_mc;
        this.volleyb_mc = volleyb_mc;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public flag!: Phaser.GameObjects.Sprite;
    public schooldoor!: Phaser.GameObjects.Image;
    public schooldoor_btn!: Phaser.GameObjects.Image;
    public minelight!: Phaser.GameObjects.Image;
    public minesign!: Phaser.GameObjects.Image;
    public mine_btn!: Phaser.GameObjects.Image;
    public hourHandShadow!: Phaser.GameObjects.Image;
    public hourHand!: Phaser.GameObjects.Image;
    public minuteHandShadow!: Phaser.GameObjects.Image;
    public minuteHand!: Phaser.GameObjects.Image;
    public cpu!: Phaser.GameObjects.Image;
    public volleyball!: Phaser.GameObjects.Sprite;
    public block!: Phaser.GameObjects.Image;
    public exit_btn!: Phaser.GameObjects.Image;
    public dojoext_btn!: Phaser.GameObjects.Image;
    public volleya_mc!: Phaser.GameObjects.Image;
    public volleyb_mc!: Phaser.GameObjects.Image;
    public triggers!: Phaser.GameObjects.Image[];

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
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

        this.time.addEvent({
            delay: 1000,
            repeat: -1,
            startAt: 1000,
            callback: () => {
                let spt = this.engine.world.getStandardPenguinTime();

                this.hourHand.rotation = 30 * spt.getHours();
                this.hourHandShadow.rotation = this.hourHand.rotation;
                this.minuteHand.rotation = 6 * spt.getMinutes();
                this.minuteHandShadow.rotation = this.minuteHand.rotation;
            }
        });

        this.mine_btn.on('over', () => {
            this.minelight.visible = true;
            this.sound.play('shack2014-lighton');
        });
        this.mine_btn.on('out', () => {
            this.minelight.visible = false;
            this.sound.play('shack2014-lightoff');
        });
        this.mine_btn.on('release', () => this.world.move(1113.75, 472.5));

        this.schooldoor_btn.on('over', () => {
            this.schooldoor.setFrame('shack/schooldoor0002');
            this.sound.play('shack2014-dooropen');
        });
        this.schooldoor_btn.on('out', () => {
            this.schooldoor.setFrame('shack/schooldoor0001');
            this.sound.play('shack2014-doorclose');
        });
        this.schooldoor_btn.on('release', () => this.world.move(540, 450));

        this.exit_btn.on('release', () => this.world.move(101.25, 922.5));
        this.dojoext_btn.on('release', () => this.world.move(832.5, 360));

        this.flag.play('shack2014-flag-animation');

        let volleyA = PressureTrigger.getComponent(this.volleya_mc);
        let volleyB = PressureTrigger.getComponent(this.volleyb_mc);
        volleyA.onActivate = this.updateVolleyGame.bind(this, volleyA, volleyB);
        volleyA.onDeactivate = this.updateVolleyGame.bind(this, volleyA, volleyB);
        volleyB.onActivate = this.updateVolleyGame.bind(this, volleyA, volleyB);
        volleyB.onDeactivate = this.updateVolleyGame.bind(this, volleyA, volleyB);

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    public volleyActive = false;
    updateVolleyGame(volleyA: PressureTrigger, volleyB: PressureTrigger): void {
        let state = volleyA.hasPlayersOn() && volleyB.hasPlayersOn();
        if (state == this.volleyActive) return;

        if (state) this.volleyball.play('shack2014-volleyball-animation');
        else {
            this.volleyball.anims.stop();
            this.volleyball.setFrame('shack/volleyball');
        }

        this.volleyActive = state;
    }

    localize(locale: Locale): void {
        this.minesign.setFrame(`shack/minesign${locale.frame}`);
        this.cpu.setFrame(`shack/cpu${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('shack2014-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
