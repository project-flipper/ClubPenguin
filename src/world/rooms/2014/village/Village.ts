
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Village extends Phaser.Scene implements Room {

    constructor() {
        super("Village");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("village2014-pack", "assets/world/rooms/2014/village/village2014-pack.json");
    }

    editorCreate(): void {

        // village_sky
        const village_sky = this.add.image(-22.5, -59.5125, "village2014", "village/sky");
        village_sky.setOrigin(0, 0);

        // village_base
        const village_base = this.add.image(-135, -39.375, "village2014", "village/base");
        village_base.setOrigin(0, 0);

        // belt
        const belt = this.add.sprite(-207, 90, "village2014", "village/belt0001");
        belt.angle = 28.49860000000001;
        belt.setOrigin(0, 0);
        belt.play("village2014-belt-animation");

        // cable
        const cable = this.add.sprite(-251.6625, -193.1625, "village2014", "village/cable0001");
        cable.setOrigin(0, 0);
        cable.play("village2014-cable-animation");

        // sleds
        const sleds = this.add.sprite(440.8875, 411.525, "village2014", "village/sleds0001");
        sleds.setOrigin(0, 0);
        sleds.play("village2014-sleds-animation");

        // village_fronts
        const village_fronts = this.add.image(-135, -22.5, "village2014", "village/fronts");
        village_fronts.setOrigin(0, 0);

        // lodge_door
        const lodge_door = this.add.image(1155.7125, 323.8875, "village2014", "village/lodge_door0001");
        lodge_door.setOrigin(0, 0);

        // lodge_btn
        const lodge_btn = this.add.image(1155.7125, 323.8875, "village2014", "village/lodge_door0004");
        lodge_btn.setOrigin(0, 0);
        lodge_btn.alpha = 0.0001;
        lodge_btn.alphaTopLeft = 0.0001;
        lodge_btn.alphaTopRight = 0.0001;
        lodge_btn.alphaBottomLeft = 0.0001;
        lodge_btn.alphaBottomRight = 0.0001;

        // epf_door
        const epf_door = this.add.image(1413.45, 345.825, "village2014", "village/epf_door0001");
        epf_door.setOrigin(0, 0);

        // epf_btn
        const epf_btn = this.add.image(1413.45, 345.825, "village2014", "village/epf_door0004");
        epf_btn.setOrigin(0, 0);
        epf_btn.alpha = 0.0001;
        epf_btn.alphaTopLeft = 0.0001;
        epf_btn.alphaTopRight = 0.0001;
        epf_btn.alphaBottomLeft = 0.0001;
        epf_btn.alphaBottomRight = 0.0001;

        // village_trees
        const village_trees = this.add.image(289.2375, 705.2625, "village2014", "village/trees");
        village_trees.setOrigin(0.485445, 0.388889);

        // village_signleft
        const village_signleft = this.add.image(186.4125, 822.15, "village2014", "village/signleft");
        village_signleft.setOrigin(0.4992134831460674, 0.6140816326530613);

        // village_bottom
        const village_bottom = this.add.image(0, 0, "village2014", "village/bottom");
        village_bottom.setOrigin(0.0147968, -2.48022);

        // block
        const block = this.add.image(0, 0, "village2014", "village/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // tours
        const tours = this.add.image(839.3625, 500.525, "village2014", "village/tours0001_0001");
        tours.setOrigin(0.7025405405405406, 0.8079701492537313);

        // village_snow
        const village_snow = this.add.image(839.1375, 558.5625, "village2014", "village/snow");
        village_snow.setOrigin(0.5008745247148289, 0.49939999999999996);

        // tours_btn
        const tours_btn = this.add.image(839.3625, 500.525, "village2014", "village/tours_btn");
        tours_btn.setOrigin(0.7025405405405406, 0.8079701492537313);
        tours_btn.alpha = 0.0001;
        tours_btn.alphaTopLeft = 0.0001;
        tours_btn.alphaTopRight = 0.0001;
        tours_btn.alphaBottomLeft = 0.0001;
        tours_btn.alphaBottomRight = 0.0001;

        // epf_title
        const epf_title = this.add.image(1361.5875, 221.0625, "village2014", "village/epf_title0001");
        epf_title.setOrigin(0, 0);

        // village_signright
        const village_signright = this.add.image(1557, 706.95, "village2014", "village/signright");
        village_signright.setOrigin(0.47834951, 0.62636364);

        // village_beach_mc
        const village_beach_mc = this.add.image(281.25, 956.25, "village2014", "village/beach_mc");
        village_beach_mc.visible = false;

        // village_mtn_mc
        const village_mtn_mc = this.add.image(358.65, 583.0875, "village2014", "village/mtn_mc");
        village_mtn_mc.visible = false;

        // village_lodge_mc
        const village_lodge_mc = this.add.image(1189.0125, 493.875, "village2014", "village/lodge_mc");
        village_lodge_mc.visible = false;

        // village_epf_mc
        const village_epf_mc = this.add.image(1487.25, 575.8875, "village2014", "village/epf_mc");
        village_epf_mc.visible = false;

        // village_dock_mc
        const village_dock_mc = this.add.image(1636.875, 770.625, "village2014", "village/dock_mc");
        village_dock_mc.visible = false;

        // village_actualbelt0001
        const village_actualbelt0001 = this.add.sprite(429.75, 348.75, "village2014", "village/actualbelt0001");
        village_actualbelt0001.setOrigin(0, 0);
        village_actualbelt0001.play("village2014-actualbelt-animation");

        // village_cog0001
        const village_cog0001 = this.add.sprite(470.25, 364.5, "village2014", "village/cog0001");
        village_cog0001.setOrigin(0, 0);
        village_cog0001.play("village2014-cog-animation");

        // lists
        const triggers = [village_dock_mc, village_epf_mc, village_lodge_mc, village_mtn_mc, village_beach_mc];

        // cable (components)
        const cableDepthEnabled = new DepthEnabled(cable);
        cableDepthEnabled.automaticSort = false;
        cableDepthEnabled.depth = 5;

        // village_fronts (components)
        const village_frontsDepthEnabled = new DepthEnabled(village_fronts);
        village_frontsDepthEnabled.automaticSort = false;
        village_frontsDepthEnabled.depth = 10;

        // lodge_btn (components)
        const lodge_btnButtonComponent = new ButtonComponent(lodge_btn);
        lodge_btnButtonComponent.handCursor = true;
        lodge_btnButtonComponent.pixelPerfect = true;

        // epf_btn (components)
        const epf_btnButtonComponent = new ButtonComponent(epf_btn);
        epf_btnButtonComponent.handCursor = true;
        epf_btnButtonComponent.pixelPerfect = true;

        // village_trees (components)
        new DepthEnabled(village_trees);

        // village_signleft (components)
        new DepthEnabled(village_signleft);

        // village_bottom (components)
        new DepthEnabled(village_bottom);

        // tours (components)
        new DepthEnabled(tours);

        // village_snow (components)
        new DepthEnabled(village_snow);

        // tours_btn (components)
        const tours_btnButtonComponent = new ButtonComponent(tours_btn);
        tours_btnButtonComponent.handCursor = true;
        tours_btnButtonComponent.pixelPerfect = true;

        // epf_title (components)
        const epf_titleDepthEnabled = new DepthEnabled(epf_title);
        epf_titleDepthEnabled.automaticSort = false;
        epf_titleDepthEnabled.depth = 10;

        // village_signright (components)
        new DepthEnabled(village_signright);

        // village_beach_mc (components)
        const village_beach_mcRoomTrigger = new RoomTrigger(village_beach_mc);
        village_beach_mcRoomTrigger.destination = 400;
        village_beach_mcRoomTrigger.playerX = 1001.25;
        village_beach_mcRoomTrigger.playerY = 393.75;

        // village_mtn_mc (components)
        const village_mtn_mcRoomTrigger = new RoomTrigger(village_mtn_mc);
        village_mtn_mcRoomTrigger.destination = 230;
        village_mtn_mcRoomTrigger.playerX = 945;
        village_mtn_mcRoomTrigger.playerY = 360;

        // village_lodge_mc (components)
        const village_lodge_mcRoomTrigger = new RoomTrigger(village_lodge_mc);
        village_lodge_mcRoomTrigger.destination = 220;
        village_lodge_mcRoomTrigger.playerX = 360;
        village_lodge_mcRoomTrigger.playerY = 720;

        // village_epf_mc (components)
        const village_epf_mcRoomTrigger = new RoomTrigger(village_epf_mc);
        village_epf_mcRoomTrigger.destination = 212;
        village_epf_mcRoomTrigger.playerX = 405;
        village_epf_mcRoomTrigger.playerY = 596.25;

        // village_dock_mc (components)
        const village_dock_mcRoomTrigger = new RoomTrigger(village_dock_mc);
        village_dock_mcRoomTrigger.destination = 800;
        village_dock_mcRoomTrigger.playerX = 776.25;
        village_dock_mcRoomTrigger.playerY = 405;

        // village_actualbelt0001 (components)
        const village_actualbelt0001DepthEnabled = new DepthEnabled(village_actualbelt0001);
        village_actualbelt0001DepthEnabled.automaticSort = false;
        village_actualbelt0001DepthEnabled.depth = 10;

        // village_cog0001 (components)
        const village_cog0001DepthEnabled = new DepthEnabled(village_cog0001);
        village_cog0001DepthEnabled.automaticSort = false;
        village_cog0001DepthEnabled.depth = 10;

        this.belt = belt;
        this.cable = cable;
        this.sleds = sleds;
        this.lodge_door = lodge_door;
        this.lodge_btn = lodge_btn;
        this.epf_door = epf_door;
        this.epf_btn = epf_btn;
        this.block = block;
        this.tours = tours;
        this.tours_btn = tours_btn;
        this.epf_title = epf_title;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public belt!: Phaser.GameObjects.Sprite;
    public cable!: Phaser.GameObjects.Sprite;
    public sleds!: Phaser.GameObjects.Sprite;
    public lodge_door!: Phaser.GameObjects.Image;
    public lodge_btn!: Phaser.GameObjects.Image;
    public epf_door!: Phaser.GameObjects.Image;
    public epf_btn!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public tours!: Phaser.GameObjects.Image;
    public tours_btn!: Phaser.GameObjects.Image;
    public epf_title!: Phaser.GameObjects.Image;
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

        this.cable.on('animationupdate', this.updateCableDepth, this);

        this.lodge_btn.on('over', () => {
            this.lodge_door.setFrame('village/lodge_door0002');
            this.sound.play('village2014-dooropen');
        });
        this.lodge_btn.on('out', () => {
            this.lodge_door.setFrame('village/lodge_door0001');
            this.sound.play('village2014-doorclose');
        });
        this.lodge_btn.on('release', () => this.world.move(1181.25, 506.25));

        this.epf_btn.on('over', () => {
            this.epf_door.setFrame('village/epf_door0002');
            this.sound.play('village2014-dooropen1');
        });
        this.epf_btn.on('out', () => {
            this.epf_door.setFrame('village/epf_door0001');
            this.sound.play('village2014-doorclose1');
        });
        this.epf_btn.on('release', () => this.world.move(1485, 585));

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    updateCableDepth(_animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index < 90) this.cable.depth = 5;
        else this.cable.depth = 15;
    }

    localize(locale: Locale): void {
        if (this.tours.frame.name.endsWith('1')) this.tours.setFrame(`village/tours${locale.frame}_0001`);
        else this.tours.setFrame(`village/tours${locale.frame}_0002`);

        this.epf_title.setFrame(`village/epf_title${locale.frame}`);

        this.tours_btn.off('over');
        this.tours_btn.off('out');

        this.tours_btn.on('over', () => this.tours.setFrame(`village/tours${locale.frame}_0002`));
        this.tours_btn.on('out', () => this.tours.setFrame(`village/tours${locale.frame}_0001`));
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('village2014-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
