
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import DepthEnabled from "../../../lib/ui/components/DepthEnabled";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import RoomTrigger from "../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "../../../app/app";
import Engine, { Room } from "../../engine/Engine";
import Interface from "../../interface/Interface";
import { Avatar } from "../../avatar/avatar";
import { Locale } from "../../../app/locale";
/* END-USER-IMPORTS */

export default class Rink extends Phaser.Scene implements Room {

    constructor() {
        super("Rink");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("rink-pack", "assets/world/rooms/rink/rink-pack.json");
    }

    editorCreate(): void {

        // rink_sky
        const rink_sky = this.add.image(-135.675, -22.5, "rink", "rink/sky");
        rink_sky.setOrigin(0, 0);

        // rink_base
        const rink_base = this.add.image(-141.4125, -59.175, "rink", "rink/base");
        rink_base.setOrigin(0, 0);

        // rink_leftgoalbehind
        const rink_leftgoalbehind = this.add.image(304.875, 564.4125, "rink", "rink/leftgoalbehind");
        rink_leftgoalbehind.setOrigin(0.6480281690140844, 0.4164596273291925);

        // leftgoal
        const leftgoal = this.add.image(273.6, 628.3125, "rink", "rink/leftgoal");
        leftgoal.setOrigin(0.42636363636363633, 0.7543333333333333);

        // puck
        const puck = this.add.image(859.5, 607.5, "rink", "rink/puck");

        // rink_rightgoalbehind
        const rink_rightgoalbehind = this.add.image(1407.15, 562.6125, "rink", "rink/rightgoalbehind");
        rink_rightgoalbehind.setOrigin(0.32161972, 0.41645963);

        // rightgoal
        const rightgoal = this.add.image(1439.1, 628.3125, "rink", "rink/rightgoal");
        rightgoal.setOrigin(0.5404195804195804, 0.7543333333333333);

        // rink_fishdog
        const rink_fishdog = this.add.image(169.425, 243.45, "rink", "rink/fishdog");
        rink_fishdog.setOrigin(0.48278146, 0.58852217);

        // fishdogsign
        const fishdogsign = this.add.image(104.7375, 130.6125, "rink", "rink/fishdog_sign0001");
        fishdogsign.setOrigin(0, 0);

        // fishdog_btn
        const fishdog_btn = this.add.image(132.3, 230.625, "rink", "rink/fishdog_btn0004");
        fishdog_btn.setOrigin(0, 0);
        fishdog_btn.alpha = 0.01;
        fishdog_btn.alphaTopLeft = 0.01;
        fishdog_btn.alphaTopRight = 0.01;
        fishdog_btn.alphaBottomLeft = 0.01;
        fishdog_btn.alphaBottomRight = 0.01;

        // rink_juryseats
        const rink_juryseats = this.add.image(590.4, 186.75, "rink", "rink/juryseats");
        rink_juryseats.setOrigin(0.5012970711297071, 0.6431474103585658);

        // stadiumsign
        const stadiumsign = this.add.image(504.9, 183, "rink", "rink/stadiumsign0001");
        stadiumsign.setOrigin(0, 0);

        // rink_snow
        const rink_snow = this.add.image(1286.1, 126.675, "rink", "rink/snow");
        rink_snow.setOrigin(0, 0);

        // rink_tree
        const rink_tree = this.add.image(1370.5875, 96.8625, "rink", "rink/tree");
        rink_tree.setOrigin(0, 0);

        // rink_trees
        const rink_trees = this.add.image(1542.2625, 123.3, "rink", "rink/trees");
        rink_trees.setOrigin(0, 0);

        // rink_sign
        const rink_sign = this.add.image(1374.4125, 179.6625, "rink", "rink/sign");
        rink_sign.setOrigin(0, 0);

        // snacksdoor
        const snacksdoor = this.add.image(1341.45, 126.5625, "rink", "rink/snacksdoor0001");
        snacksdoor.setOrigin(0, 0);

        // snacksdoor_btn
        const snacksdoor_btn = this.add.image(1341.45, 126.5625, "rink", "rink/snacksdoor0004");
        snacksdoor_btn.setOrigin(0, 0);
        snacksdoor_btn.alpha = 0.01;
        snacksdoor_btn.alphaTopLeft = 0.01;
        snacksdoor_btn.alphaTopRight = 0.01;
        snacksdoor_btn.alphaBottomLeft = 0.01;
        snacksdoor_btn.alphaBottomRight = 0.01;

        // snack_light
        const snack_light = this.add.image(1029.9375, 147.4875, "rink", "rink/snack_light");
        snack_light.setOrigin(0, 0);

        // rink_snacks
        const rink_snacks = this.add.image(981.9, 18.3375, "rink", "rink/snacks");
        rink_snacks.setOrigin(0, 0);

        // snackssign
        const snackssign = this.add.image(1019.25, 40.95, "rink", "rink/snackssign0001");
        snackssign.setOrigin(0, 0);

        // rink_snacklights
        const rink_snacklights = this.add.image(1035.9, -6.4125, "rink", "rink/snacklights");
        rink_snacklights.setOrigin(0, 0);

        // rink_backwall
        const rink_backwall = this.add.image(144.3375, 316.0125, "rink", "rink/backwall");
        rink_backwall.setOrigin(0, 0);

        // door
        const door = this.add.image(788.7375, 287.55, "rink", "rink/door0001");
        door.setOrigin(0, 0);

        // door_btn
        const door_btn = this.add.image(788.7375, 287.55, "rink", "rink/door0004");
        door_btn.setOrigin(0, 0);
        door_btn.alpha = 0.01;
        door_btn.alphaTopLeft = 0.01;
        door_btn.alphaTopRight = 0.01;
        door_btn.alphaBottomLeft = 0.01;
        door_btn.alphaBottomRight = 0.01;

        // rink_lefttribune
        const rink_lefttribune = this.add.image(120.4875, 287.6625, "rink", "rink/lefttribune");
        rink_lefttribune.setOrigin(0.5257051282051283, 0.15574209245742093);

        // rink_prop1
        const rink_prop1 = this.add.image(31.8375, 333.45, "rink", "rink/prop1");
        rink_prop1.setOrigin(0.4525, 0.106);

        // rink_prop2
        const rink_prop2 = this.add.image(131.625, 403.875, "rink", "rink/prop2");
        rink_prop2.setOrigin(0.45, 0.10914285714285714);

        // rink_prop3
        const rink_prop3 = this.add.image(74.5875, 542.475, "rink", "rink/prop3");
        rink_prop3.setOrigin(0.48333333333333334, 0.654074074074074);

        // rink_lefttribuneside
        const rink_lefttribuneside = this.add.image(47.475, 625.3874999999999, "rink", "rink/lefttribuneside");
        rink_lefttribuneside.setOrigin(0.8588782051282052, 0.84274);

        // rink_righttribune
        const rink_righttribune = this.add.image(1585.125, 287.6625, "rink", "rink/righttribune");
        rink_righttribune.setOrigin(0.45900641025641026, 0.15574209245742093);

        // rink_prop4
        const rink_prop4 = this.add.image(1596.2625, 342.675, "rink", "rink/prop4");
        rink_prop4.setOrigin(0.41222222222222227, 0.6483636363636363);

        // rink_prop5
        const rink_prop5 = this.add.image(1655.4375, 473.2875, "rink", "rink/prop5");
        rink_prop5.setOrigin(0.469625, 0.05555555555555555);

        // rink_righttribuneside
        const rink_righttribuneside = this.add.image(1658.8125, 625.3875, "rink", "rink/righttribuneside");
        rink_righttribuneside.setOrigin(0.12583333333333332, 0.8427433628318585);

        // rink_pot
        const rink_pot = this.add.image(966.7125, 241.425, "rink", "rink/pot");
        rink_pot.setOrigin(0.47947368, 0.7125);

        // rink_foreground
        const rink_foreground = this.add.image(-215.6625, 628.425, "rink", "rink/foreground");
        rink_foreground.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "rink", "rink/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // snack_btn
        const snack_btn = this.add.image(994.8375, 18.675, "rink", "rink/snack_btn0004");
        snack_btn.setOrigin(0, 0);
        snack_btn.alpha = 0.01;
        snack_btn.alphaTopLeft = 0.01;
        snack_btn.alphaTopRight = 0.01;
        snack_btn.alphaBottomLeft = 0.01;
        snack_btn.alphaBottomRight = 0.01;

        // catalogue
        const catalogue = this.add.image(1581.1875, 970.875, "rink", "rink/catalogue0001");

        // catalogue_title
        const catalogue_title = this.add.image(1554.1875, 909.7875, "rink", "rink/catalogue_title0001");
        catalogue_title.setOrigin(0, 0);

        // rink_forts_mc
        const rink_forts_mc = this.add.image(861.75, 213.75, "rink", "rink/forts_mc");
        rink_forts_mc.visible = false;

        // rink_shack_mc
        const rink_shack_mc = this.add.image(1473, 232, "rink", "rink/shack_mc");
        rink_shack_mc.visible = false;

        // chair1_btn
        const chair1_btn = this.add.image(456.4125, 158.625, "rink", "rink/chair_btn0004");
        chair1_btn.alpha = 0.01;
        chair1_btn.alphaTopLeft = 0.01;
        chair1_btn.alphaTopRight = 0.01;
        chair1_btn.alphaBottomLeft = 0.01;
        chair1_btn.alphaBottomRight = 0.01;

        // chair2_btn
        const chair2_btn = this.add.image(534.7125, 152.325, "rink", "rink/chair_btn0004");
        chair2_btn.alpha = 0.01;
        chair2_btn.alphaTopLeft = 0.01;
        chair2_btn.alphaTopRight = 0.01;
        chair2_btn.alphaBottomLeft = 0.01;
        chair2_btn.alphaBottomRight = 0.01;

        // chair3_btn
        const chair3_btn = this.add.image(603.225, 145.35, "rink", "rink/chair_btn0004");
        chair3_btn.alpha = 0.01;
        chair3_btn.alphaTopLeft = 0.01;
        chair3_btn.alphaTopRight = 0.01;
        chair3_btn.alphaBottomLeft = 0.01;
        chair3_btn.alphaBottomRight = 0.01;

        // chair4_btn
        const chair4_btn = this.add.image(673.5375, 140.175, "rink", "rink/chair_btn0004");
        chair4_btn.alpha = 0.01;
        chair4_btn.alphaTopLeft = 0.01;
        chair4_btn.alphaTopRight = 0.01;
        chair4_btn.alphaBottomLeft = 0.01;
        chair4_btn.alphaBottomRight = 0.01;

        // lists
        const triggers = [rink_forts_mc, rink_shack_mc];

        // rink_leftgoalbehind (components)
        new DepthEnabled(rink_leftgoalbehind);

        // leftgoal (components)
        new DepthEnabled(leftgoal);

        // puck (components)
        new DepthEnabled(puck);

        // rink_rightgoalbehind (components)
        new DepthEnabled(rink_rightgoalbehind);

        // rightgoal (components)
        new DepthEnabled(rightgoal);

        // rink_fishdog (components)
        const rink_fishdogDepthEnabled = new DepthEnabled(rink_fishdog);
        rink_fishdogDepthEnabled.automaticSort = false;
        rink_fishdogDepthEnabled.depth = 261;

        // fishdogsign (components)
        const fishdogsignDepthEnabled = new DepthEnabled(fishdogsign);
        fishdogsignDepthEnabled.automaticSort = false;
        fishdogsignDepthEnabled.depth = 261;

        // fishdog_btn (components)
        const fishdog_btnButtonComponent = new ButtonComponent(fishdog_btn);
        fishdog_btnButtonComponent.pixelPerfect = true;

        // rink_juryseats (components)
        new DepthEnabled(rink_juryseats);

        // stadiumsign (components)
        const stadiumsignDepthEnabled = new DepthEnabled(stadiumsign);
        stadiumsignDepthEnabled.automaticSort = false;
        stadiumsignDepthEnabled.depth = 186.75;

        // rink_sign (components)
        const rink_signDepthEnabled = new DepthEnabled(rink_sign);
        rink_signDepthEnabled.automaticSort = false;
        rink_signDepthEnabled.depth = 260.8875;

        // snacksdoor (components)
        const snacksdoorDepthEnabled = new DepthEnabled(snacksdoor);
        snacksdoorDepthEnabled.automaticSort = false;
        snacksdoorDepthEnabled.depth = 260.8875;

        // snacksdoor_btn (components)
        const snacksdoor_btnButtonComponent = new ButtonComponent(snacksdoor_btn);
        snacksdoor_btnButtonComponent.handCursor = true;
        snacksdoor_btnButtonComponent.pixelPerfect = true;

        // snack_light (components)
        const snack_lightDepthEnabled = new DepthEnabled(snack_light);
        snack_lightDepthEnabled.automaticSort = false;
        snack_lightDepthEnabled.depth = 260.8875;

        // rink_snacks (components)
        const rink_snacksDepthEnabled = new DepthEnabled(rink_snacks);
        rink_snacksDepthEnabled.automaticSort = false;
        rink_snacksDepthEnabled.depth = 260.8875;

        // snackssign (components)
        const snackssignDepthEnabled = new DepthEnabled(snackssign);
        snackssignDepthEnabled.automaticSort = false;
        snackssignDepthEnabled.depth = 260.8875;

        // rink_snacklights (components)
        const rink_snacklightsDepthEnabled = new DepthEnabled(rink_snacklights);
        rink_snacklightsDepthEnabled.automaticSort = false;
        rink_snacklightsDepthEnabled.depth = 260.8875;

        // rink_backwall (components)
        const rink_backwallDepthEnabled = new DepthEnabled(rink_backwall);
        rink_backwallDepthEnabled.automaticSort = false;
        rink_backwallDepthEnabled.depth = 379.0125;

        // door (components)
        const doorDepthEnabled = new DepthEnabled(door);
        doorDepthEnabled.automaticSort = false;
        doorDepthEnabled.depth = 379.0125;

        // door_btn (components)
        new ButtonComponent(door_btn);

        // rink_lefttribune (components)
        new DepthEnabled(rink_lefttribune);

        // rink_prop1 (components)
        new DepthEnabled(rink_prop1);

        // rink_prop2 (components)
        new DepthEnabled(rink_prop2);

        // rink_prop3 (components)
        new DepthEnabled(rink_prop3);

        // rink_lefttribuneside (components)
        new DepthEnabled(rink_lefttribuneside);

        // rink_righttribune (components)
        new DepthEnabled(rink_righttribune);

        // rink_prop5 (components)
        new DepthEnabled(rink_prop5);

        // rink_righttribuneside (components)
        new DepthEnabled(rink_righttribuneside);

        // rink_pot (components)
        new DepthEnabled(rink_pot);

        // rink_foreground (components)
        const rink_foregroundDepthEnabled = new DepthEnabled(rink_foreground);
        rink_foregroundDepthEnabled.automaticSort = false;
        rink_foregroundDepthEnabled.depth = 1080;

        // snack_btn (components)
        const snack_btnButtonComponent = new ButtonComponent(snack_btn);
        snack_btnButtonComponent.handCursor = true;
        snack_btnButtonComponent.pixelPerfect = true;

        // catalogue (components)
        const catalogueDepthEnabled = new DepthEnabled(catalogue);
        catalogueDepthEnabled.automaticSort = false;
        catalogueDepthEnabled.depth = 1080;
        const catalogueButtonComponent = new ButtonComponent(catalogue);
        catalogueButtonComponent.upTexture = { "key": "rink", "frame": "rink/catalogue0001" };
        catalogueButtonComponent.overTexture = { "key": "rink", "frame": "rink/catalogue0002" };
        catalogueButtonComponent.handCursor = true;
        catalogueButtonComponent.pixelPerfect = true;

        // catalogue_title (components)
        const catalogue_titleDepthEnabled = new DepthEnabled(catalogue_title);
        catalogue_titleDepthEnabled.automaticSort = false;
        catalogue_titleDepthEnabled.depth = 1080;

        // rink_forts_mc (components)
        const rink_forts_mcRoomTrigger = new RoomTrigger(rink_forts_mc);
        rink_forts_mcRoomTrigger.destination = "801";
        rink_forts_mcRoomTrigger.playerX = 652.5;
        rink_forts_mcRoomTrigger.playerY = 459;

        // rink_shack_mc (components)
        const rink_shack_mcRoomTrigger = new RoomTrigger(rink_shack_mc);
        rink_shack_mcRoomTrigger.destination = "122";
        rink_shack_mcRoomTrigger.playerX = 123.75;
        rink_shack_mcRoomTrigger.playerY = 810;

        // chair1_btn (components)
        const chair1_btnButtonComponent = new ButtonComponent(chair1_btn);
        chair1_btnButtonComponent.pixelPerfect = true;

        // chair2_btn (components)
        const chair2_btnButtonComponent = new ButtonComponent(chair2_btn);
        chair2_btnButtonComponent.pixelPerfect = true;

        // chair3_btn (components)
        const chair3_btnButtonComponent = new ButtonComponent(chair3_btn);
        chair3_btnButtonComponent.pixelPerfect = true;

        // chair4_btn (components)
        const chair4_btnButtonComponent = new ButtonComponent(chair4_btn);
        chair4_btnButtonComponent.pixelPerfect = true;

        this.leftgoal = leftgoal;
        this.puck = puck;
        this.rightgoal = rightgoal;
        this.fishdogsign = fishdogsign;
        this.fishdog_btn = fishdog_btn;
        this.stadiumsign = stadiumsign;
        this.snacksdoor = snacksdoor;
        this.snacksdoor_btn = snacksdoor_btn;
        this.snack_light = snack_light;
        this.snackssign = snackssign;
        this.door = door;
        this.door_btn = door_btn;
        this.block = block;
        this.snack_btn = snack_btn;
        this.catalogue = catalogue;
        this.catalogue_title = catalogue_title;
        this.chair1_btn = chair1_btn;
        this.chair2_btn = chair2_btn;
        this.chair3_btn = chair3_btn;
        this.chair4_btn = chair4_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public leftgoal!: Phaser.GameObjects.Image;
    public puck!: Phaser.GameObjects.Image;
    public rightgoal!: Phaser.GameObjects.Image;
    public fishdogsign!: Phaser.GameObjects.Image;
    public fishdog_btn!: Phaser.GameObjects.Image;
    public stadiumsign!: Phaser.GameObjects.Image;
    public snacksdoor!: Phaser.GameObjects.Image;
    public snacksdoor_btn!: Phaser.GameObjects.Image;
    public snack_light!: Phaser.GameObjects.Image;
    public snackssign!: Phaser.GameObjects.Image;
    public door!: Phaser.GameObjects.Image;
    public door_btn!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public snack_btn!: Phaser.GameObjects.Image;
    public catalogue!: Phaser.GameObjects.Image;
    public catalogue_title!: Phaser.GameObjects.Image;
    public chair1_btn!: Phaser.GameObjects.Image;
    public chair2_btn!: Phaser.GameObjects.Image;
    public chair3_btn!: Phaser.GameObjects.Image;
    public chair4_btn!: Phaser.GameObjects.Image;
    public triggers!: Phaser.GameObjects.Image[];

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
        this.scene.moveBelow('Engine');

        if (data.oninit) data.oninit(this);
    }

    get engine(): Engine {
        return (this.scene.get('Engine') as Engine);
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    public customEase = 'Quad.easeInOut';

    create(data: any) {

        this.editorCreate();

        this.door_btn.on('over', () => this.door.setFrame('rink/door0002'));
        this.door_btn.on('out', () => this.door.setFrame('rink/door0001'));
        this.door_btn.on('release', () => this.engine.movePlayer(866.25, 292.5));

        this.snack_btn.on('release', () => this.snack_light.visible = !this.snack_light.visible);

        this.fishdog_btn.on('release', () => this.engine.movePlayer(141.75, 256.5));

        this.chair1_btn.on('release', () => this.engine.movePlayer(459, 184.5));
        this.chair2_btn.on('release', () => this.engine.movePlayer(531, 177.75));
        this.chair3_btn.on('release', () => this.engine.movePlayer(600.75, 173.25));
        this.chair4_btn.on('release', () => this.engine.movePlayer(670.5, 166.5));

        this.snacksdoor_btn.on('over', () => this.snacksdoor.setFrame('rink/snacksdoor0002'));
        this.snacksdoor_btn.on('out', () => this.snacksdoor.setFrame('rink/snacksdoor0001'));
        this.snacksdoor_btn.on('release', () => this.engine.movePlayer(1253.25, 252));

        this.catalogue.on('over', () => this.catalogue_title.visible = false);
        this.catalogue.on('out', () => this.catalogue_title.visible = true);

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
        this.engine.events.once('roomready', this.initPuck, this);
    }

    initPuck(scene: Rink): void {
        if (scene !== this) return;

        this.matter.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);

        let bounds = new Phaser.Geom.Polygon([
            new Phaser.Geom.Point(343.125, 455.625),
            new Phaser.Geom.Point(543.375, 410.625),
            new Phaser.Geom.Point(1184.625, 411.75),
            new Phaser.Geom.Point(1360.125, 460.125),
            new Phaser.Geom.Point(1459.125, 570.375),
            new Phaser.Geom.Point(1483.875, 716.625),
            new Phaser.Geom.Point(1402.875, 815.625),
            new Phaser.Geom.Point(1261.125, 889.875),
            new Phaser.Geom.Point(482.625, 894.375),
            new Phaser.Geom.Point(322.875, 831.375),
            new Phaser.Geom.Point(210.375, 732.375),
            new Phaser.Geom.Point(226.125, 574.875),
        ]);

        /*
        this.puck.setCircle(18);
        this.puck.setBounce(1, 1);
        this.puck.setFriction(0.1);
        this.engine.enablePlayerPhysics();

        this.physics.add.collider(this.puck, this.engine.player, this.onPlayerCollision, undefined, this);

        this.leftgoal.body.setSize(116.8875, 94.1625);
        this.rightgoal.body.setSize(116.8875, 94.1625);

        this.physics.add.collider(this.puck, this.leftgoal, this.onGoalCollision, undefined, this);
        this.physics.add.collider(this.puck, this.rightgoal, this.onGoalCollision, undefined, this);
        */
    }

    onPlayerCollision(ob1: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, ob2: Avatar & { body: Phaser.Physics.Arcade.Body }): void {
        let tweens = this.tweens.getTweensOf(ob2);
        if (tweens.length == 0) return;

        ob1.body.velocity.add

        console.log('player', ob1, ob2);
    }

    onGoalCollision(ob1: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, ob2: Phaser.Physics.Arcade.Image): void {
        this.resetPuck();
        console.log('goal', ob1, ob2);
    }

    resetPuck(): void {
        //this.puck.body.reset(859.5, 607.5);
    }

    update(): void {
        this.puck.depth = this.puck.y;
    }

    localize(locale: Locale): void {
        this.snackssign.setFrame(`rink/snackssign${locale.frame}`);
        this.fishdogsign.setFrame(`rink/fishdog_sign${locale.frame}`);
        this.stadiumsign.setFrame(`rink/stadiumsign${locale.frame}`);
        this.catalogue_title.setFrame(`rink/catalogue_title${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.game.unloadAssetPack('rink-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
