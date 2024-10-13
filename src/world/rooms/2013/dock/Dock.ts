
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/ui/components/DepthEnabled";
import ButtonComponent from "../../../../lib/ui/components/ButtonComponent";
import Trigger from "../../../../lib/ui/components/Trigger";
import RoomTrigger from "../../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */

import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Dock extends Phaser.Scene implements Room {

    constructor() {
        super("Dock");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("dock-pack", "assets/world/rooms/2013/dock/dock-pack.json");
    }

    editorCreate(): void {

        // dock_sky
        const dock_sky = this.add.image(-22.5, -22.5, "dock", "dock/sky");
        dock_sky.setOrigin(0, 0);

        // dock_base
        const dock_base = this.add.image(-80.55, 34.65, "dock", "dock/base");
        dock_base.setOrigin(0, 0);

        // dock_stairs
        const dock_stairs = this.add.image(411.975, 473.2875, "dock", "dock/stairs");
        dock_stairs.setOrigin(0.49320122, 0.24320635);

        // boat_container
        const boat_container = this.add.container(28.9125, 596.7);

        // dock_boat
        const dock_boat = this.add.image(0, 0, "dock", "dock/boat");
        dock_boat.setOrigin(0, 0);
        boat_container.add(dock_boat);

        // tube
        const tube = this.add.image(61, 95, "dock", "dock/tube");
        tube.setOrigin(0, 0);
        tube.visible = false;
        boat_container.add(tube);

        // dock_dock
        const dock_dock = this.add.image(0, 0, "dock", "dock/dock");
        dock_dock.setOrigin(0.0932243, -0.71443869);

        // dock_spike2
        const dock_spike2 = this.add.image(332.2125, 974.3625, "dock", "dock/spike2");
        dock_spike2.setOrigin(0.47807692307692307, 0.7297297297297297);

        // dock_frozenFountain
        const dock_frozenFountain = this.add.image(1644.975, 671.625, "dock", "dock/frozenFountain");
        dock_frozenFountain.setOrigin(0.49477752, 0.77647059);

        // dock_snow
        const dock_snow = this.add.image(1364.625, 861.975, "dock", "dock/snow");
        dock_snow.setOrigin(0.49748744, 0.85820847);

        // dock_spike1
        const dock_spike1 = this.add.image(608.2875, 728.8875, "dock", "dock/spike1");
        dock_spike1.setOrigin(0.47269662921348315, 0.5542682926829269);

        // tubes
        const tubes = this.add.sprite(594, 832.6125, "dock", "dock/tubes0001");
        tubes.setOrigin(0.514006734006734, 0.8076264591439689);

        // dock_board
        const dock_board = this.add.image(769.05, 604.575, "dock", "dock/board");
        dock_board.setOrigin(0, 0);

        // catalog
        const catalog = this.add.sprite(789.975, 673.65, "dock", "dock/catalog0001");
        catalog.setOrigin(0, 0);

        // dock_beacon
        const dock_beacon = this.add.image(534.825, 570.6, "dock", "dock/beacon");
        dock_beacon.setOrigin(0.4724444444444445, 0.5458450704225353);

        // dock_bench
        const dock_bench = this.add.image(200.25, 362.3625, "dock", "dock/bench");
        dock_bench.setOrigin(0.49014085, 0.4925);

        // dock_benchSide
        const dock_benchSide = this.add.image(130.05, 434.8125, "dock", "dock/benchSide");
        dock_benchSide.setOrigin(0.48789474, 0.732);

        // dock_table
        const dock_table = this.add.image(1053.7875, 360.5625, "dock", "dock/table");
        dock_table.setOrigin(0.49178571, 0.39712121);

        // block
        const block = this.add.image(0, 0, "dock", "dock/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // dock_catalogIcon
        const dock_catalogIcon = this.add.image(1619.8875, 1001.025, "dock", "dock/catalogIcon");

        // catalog_btn
        const catalog_btn = this.add.image(850.05, 717.6375, "dock", "dock/catalogArea");
        catalog_btn.alpha = 0.01;
        catalog_btn.alphaTopLeft = 0.01;
        catalog_btn.alphaTopRight = 0.01;
        catalog_btn.alphaBottomLeft = 0.01;
        catalog_btn.alphaBottomRight = 0.01;

        // tubes_btn
        const tubes_btn = this.add.image(594, 832.6125, "dock", "dock/tubes_btn0004");
        tubes_btn.setOrigin(0.5225500000000001, 0.7348538011695906);
        tubes_btn.alpha = 0.01;
        tubes_btn.alphaTopLeft = 0.01;
        tubes_btn.alphaTopRight = 0.01;
        tubes_btn.alphaBottomLeft = 0.01;
        tubes_btn.alphaBottomRight = 0.01;

        // boat_btn
        const boat_btn = this.add.image(25.2, 596.3625, "dock", "dock/boat_btn0004");
        boat_btn.setOrigin(0, 0);
        boat_btn.alpha = 0.01;
        boat_btn.alphaTopLeft = 0.01;
        boat_btn.alphaTopRight = 0.01;
        boat_btn.alphaBottomLeft = 0.01;
        boat_btn.alphaBottomRight = 0.01;

        // town_btn
        const town_btn = this.add.image(1524.375, 238.5, "dock", "dock/town_btn0004");
        town_btn.alpha = 0.01;
        town_btn.alphaTopLeft = 0.01;
        town_btn.alphaTopRight = 0.01;
        town_btn.alphaBottomLeft = 0.01;
        town_btn.alphaBottomRight = 0.01;

        // beach_btn
        const beach_btn = this.add.image(408, 271, "dock", "dock/beach_btn0004");
        beach_btn.alpha = 0.01;
        beach_btn.alphaTopLeft = 0.01;
        beach_btn.alphaTopRight = 0.01;
        beach_btn.alphaBottomLeft = 0.01;
        beach_btn.alphaBottomRight = 0.01;

        // village_btn
        const village_btn = this.add.image(613.125, 146.25, "dock", "dock/village_btn0004");
        village_btn.alpha = 0.01;
        village_btn.alphaTopLeft = 0.01;
        village_btn.alphaTopRight = 0.01;
        village_btn.alphaBottomLeft = 0.01;
        village_btn.alphaBottomRight = 0.01;

        // dock_village_trigger
        const dock_village_trigger = this.add.image(762.75, 315.1125, "dock", "dock/village_trigger");
        dock_village_trigger.visible = false;

        // dock_town_trigger
        const dock_town_trigger = this.add.image(1588.3875, 380.3625, "dock", "dock/town_trigger");
        dock_town_trigger.visible = false;

        // dock_beach_trigger
        const dock_beach_trigger = this.add.image(398.25, 328.6125, "dock", "dock/beach_trigger");
        dock_beach_trigger.visible = false;

        // lists
        const triggers = [dock_village_trigger, dock_town_trigger, dock_beach_trigger, boat_btn];

        // dock_stairs (components)
        new DepthEnabled(dock_stairs);

        // boat_container (components)
        const boat_containerDepthEnabled = new DepthEnabled(boat_container);
        boat_containerDepthEnabled.automaticSort = false;
        boat_containerDepthEnabled.depth = 689.85;

        // dock_dock (components)
        const dock_dockDepthEnabled = new DepthEnabled(dock_dock);
        dock_dockDepthEnabled.automaticSort = false;
        dock_dockDepthEnabled.depth = 689.85;

        // dock_spike2 (components)
        new DepthEnabled(dock_spike2);

        // dock_frozenFountain (components)
        new DepthEnabled(dock_frozenFountain);

        // dock_snow (components)
        new DepthEnabled(dock_snow);

        // dock_spike1 (components)
        new DepthEnabled(dock_spike1);

        // tubes (components)
        new DepthEnabled(tubes);

        // dock_board (components)
        const dock_boardDepthEnabled = new DepthEnabled(dock_board);
        dock_boardDepthEnabled.automaticSort = false;
        dock_boardDepthEnabled.depth = 746.55;

        // catalog (components)
        const catalogDepthEnabled = new DepthEnabled(catalog);
        catalogDepthEnabled.automaticSort = false;
        catalogDepthEnabled.depth = 746.55;

        // dock_beacon (components)
        new DepthEnabled(dock_beacon);

        // dock_bench (components)
        new DepthEnabled(dock_bench);

        // dock_benchSide (components)
        new DepthEnabled(dock_benchSide);

        // dock_table (components)
        new DepthEnabled(dock_table);

        // dock_catalogIcon (components)
        const dock_catalogIconButtonComponent = new ButtonComponent(dock_catalogIcon);
        dock_catalogIconButtonComponent.upTexture = {"key":"dock","frame":"dock/catalogIcon"};
        dock_catalogIconButtonComponent.overTexture = {"key":"dock","frame":"dock/catalogIconOver"};
        dock_catalogIconButtonComponent.handCursor = true;
        dock_catalogIconButtonComponent.pixelPerfect = true;
        const dock_catalogIconDepthEnabled = new DepthEnabled(dock_catalogIcon);
        dock_catalogIconDepthEnabled.automaticSort = false;
        dock_catalogIconDepthEnabled.depth = 1080;

        // catalog_btn (components)
        const catalog_btnButtonComponent = new ButtonComponent(catalog_btn);
        catalog_btnButtonComponent.handCursor = true;
        catalog_btnButtonComponent.pixelPerfect = true;

        // tubes_btn (components)
        const tubes_btnButtonComponent = new ButtonComponent(tubes_btn);
        tubes_btnButtonComponent.pixelPerfect = true;

        // boat_btn (components)
        const boat_btnButtonComponent = new ButtonComponent(boat_btn);
        boat_btnButtonComponent.handCursor = true;
        boat_btnButtonComponent.pixelPerfect = true;
        new Trigger(boat_btn);

        // town_btn (components)
        const town_btnButtonComponent = new ButtonComponent(town_btn);
        town_btnButtonComponent.pixelPerfect = true;

        // beach_btn (components)
        const beach_btnButtonComponent = new ButtonComponent(beach_btn);
        beach_btnButtonComponent.pixelPerfect = true;

        // village_btn (components)
        const village_btnButtonComponent = new ButtonComponent(village_btn);
        village_btnButtonComponent.pixelPerfect = true;

        // dock_village_trigger (components)
        const dock_village_triggerRoomTrigger = new RoomTrigger(dock_village_trigger);
        dock_village_triggerRoomTrigger.destination = 200;
        dock_village_triggerRoomTrigger.playerX = 1496.25;
        dock_village_triggerRoomTrigger.playerY = 787.5;

        // dock_town_trigger (components)
        const dock_town_triggerRoomTrigger = new RoomTrigger(dock_town_trigger);
        dock_town_triggerRoomTrigger.destination = 100;
        dock_town_triggerRoomTrigger.playerX = 213.75;
        dock_town_triggerRoomTrigger.playerY = 720;

        // dock_beach_trigger (components)
        const dock_beach_triggerRoomTrigger = new RoomTrigger(dock_beach_trigger);
        dock_beach_triggerRoomTrigger.destination = 400;
        dock_beach_triggerRoomTrigger.playerX = 1271.25;
        dock_beach_triggerRoomTrigger.playerY = 461.25;

        this.tube = tube;
        this.boat_container = boat_container;
        this.tubes = tubes;
        this.catalog = catalog;
        this.block = block;
        this.catalog_btn = catalog_btn;
        this.tubes_btn = tubes_btn;
        this.boat_btn = boat_btn;
        this.town_btn = town_btn;
        this.beach_btn = beach_btn;
        this.village_btn = village_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public tube!: Phaser.GameObjects.Image;
    public boat_container!: Phaser.GameObjects.Container;
    public tubes!: Phaser.GameObjects.Sprite;
    public catalog!: Phaser.GameObjects.Sprite;
    public block!: Phaser.GameObjects.Image;
    public catalog_btn!: Phaser.GameObjects.Image;
    public tubes_btn!: Phaser.GameObjects.Image;
    public boat_btn!: Phaser.GameObjects.Image;
    public town_btn!: Phaser.GameObjects.Image;
    public beach_btn!: Phaser.GameObjects.Image;
    public village_btn!: Phaser.GameObjects.Image;
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

        this.catalog_btn.on('over', () => {
            this.catalog.play('dock-catalog-animation');
        });
        this.catalog_btn.on('out', () => {
            this.catalog.stop();
            this.catalog.setFrame('dock/catalog0001');
        });

        this.boat_btn.on('over', () => {
            this.tube.visible = true;
            this.interface.showLocalizedHint({ x: 225, y: 652.5 }, 'hydro_hint');
        });
        this.boat_btn.on('out', () => {
            this.tube.visible = false;
            this.interface.hideHint();
        });
        this.boat_btn.on('release', () => this.world.move(247.5, 720));

        this.tubes_btn.on('over', () => {
            this.sound.play('dock_tubes');
            this.tubes.play('dock-tubes-animation');
        });

        this.town_btn.on('release', () => this.world.move(1541.25, 371.25));
        this.village_btn.on('release', () => this.world.move(765, 326.25));
        this.beach_btn.on('release', () => this.world.move(405, 326.25));

        this.tweens.add({
            targets: this.boat_container,
            y: { from: 603.45, to: 596.7 },
            ease: 'Sine.InOut',
            duration: 1500,
            repeat: -1,
            repeatDelay: 250,
            yoyo: true,
            hold: 250
        });

        Trigger.getComponent(this.boat_btn).execute = (engine, player) => {
            if (engine.player != player) return;
            this.interface.promptQuestion.showLocalized('hydro_prompt', () => {
                this.world.startGame('hydro', {});
            }, () => { });
        }

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {

    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('dock-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
