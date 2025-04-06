
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Boiler extends Phaser.Scene implements Room {

    constructor() {
        super("Boiler");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("boiler2013-pack", "assets/world/rooms/2013/boiler/boiler2013-pack.json");
    }

    editorCreate(): void {

        // boiler_base
        const boiler_base = this.add.image(-4.5, -7.87, "boiler2013", "boiler/base");
        boiler_base.setOrigin(0, 0);

        // archives
        const archives = this.add.image(1604.25, 972, "boiler2013", "boiler/archives0001");
        archives.setOrigin(0.47917, 0.59504);

        // door
        const door = this.add.image(565.65, 185.96, "boiler2013", "boiler/door0001");
        door.setOrigin(0, 0);

        // doorbtn
        const doorbtn = this.add.image(565.65, 185.96, "boiler2013", "boiler/door0004");
        doorbtn.setOrigin(0, 0);
        doorbtn.alpha = 0.01;
        doorbtn.alphaTopLeft = 0.01;
        doorbtn.alphaTopRight = 0.01;
        doorbtn.alphaBottomLeft = 0.01;
        doorbtn.alphaBottomRight = 0.01;

        // boiler_steam0001
        const boiler_steam0001 = this.add.sprite(268.76, 140.51, "boiler2013", "boiler/steam0001");
        boiler_steam0001.setOrigin(0, 0);
        boiler_steam0001.play("boiler2013-steam-animation");

        // dancebtn
        const dancebtn = this.add.image(1086.64, -1.24, "boiler2013", "boiler/dancebtn0004");
        dancebtn.setOrigin(0, 0);
        dancebtn.alpha = 0.01;
        dancebtn.alphaTopLeft = 0.01;
        dancebtn.alphaTopRight = 0.01;
        dancebtn.alphaBottomLeft = 0.01;
        dancebtn.alphaBottomRight = 0.01;

        // drawer6
        const drawer6 = this.add.sprite(1032.08, 591.86, "boiler2013", "boiler/drawer0001");
        drawer6.setOrigin(0.3218978102189781, 0.32123711340206185);

        // drawer5
        const drawer5 = this.add.sprite(1035.56, 507.83, "boiler2013", "boiler/drawer0001");
        drawer5.setOrigin(0.3218978102189781, 0.32123711340206185);

        // drawer4
        const drawer4 = this.add.sprite(1038.6, 423.68, "boiler2013", "boiler/drawer0001");
        drawer4.setOrigin(0.3218978102189781, 0.32123711340206185);

        // drawer3
        const drawer3 = this.add.sprite(901.58, 591.86, "boiler2013", "boiler/drawer0001");
        drawer3.setOrigin(0.3218978102189781, 0.32123711340206185);

        // drawer2
        const drawer2 = this.add.sprite(905.06, 507.83, "boiler2013", "boiler/drawer0001");
        drawer2.setOrigin(0.3218978102189781, 0.32123711340206185);

        // drawer1
        const drawer1 = this.add.sprite(908.1, 423.68, "boiler2013", "boiler/drawer0001");
        drawer1.setOrigin(0.3218978102189781, 0.32123711340206185);

        // archivesbtn
        const archivesbtn = this.add.image(1604.25, 972, "boiler2013", "boiler/archives0004");
        archivesbtn.setOrigin(0.4791666666666667, 0.5950413223140496);
        archivesbtn.alpha = 0.01;
        archivesbtn.alphaTopLeft = 0.01;
        archivesbtn.alphaTopRight = 0.01;
        archivesbtn.alphaBottomLeft = 0.01;
        archivesbtn.alphaBottomRight = 0.01;

        // block
        const block = this.add.image(0, 0, "boiler2013", "boiler/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // boiler_cave_trigger
        const boiler_cave_trigger = this.add.image(651.26, 621.79, "boiler2013", "boiler/cave_trigger");
        boiler_cave_trigger.visible = false;

        // boiler_dance_trigger
        const boiler_dance_trigger = this.add.image(1201.16, 615.82, "boiler2013", "boiler/dance_trigger");
        boiler_dance_trigger.visible = false;

        // lists
        const triggers = [boiler_dance_trigger, boiler_cave_trigger];

        // archives (components)
        const archivesDepthEnabled = new DepthEnabled(archives);
        archivesDepthEnabled.automaticSort = false;
        archivesDepthEnabled.depth = 1080;

        // doorbtn (components)
        const doorbtnButtonComponent = new ButtonComponent(doorbtn);
        doorbtnButtonComponent.handCursor = true;

        // dancebtn (components)
        const dancebtnButtonComponent = new ButtonComponent(dancebtn);
        dancebtnButtonComponent.handCursor = true;

        // drawer1 (components)
        const drawer1ButtonComponent = new ButtonComponent(drawer1);
        drawer1ButtonComponent.handCursor = true;
        drawer1ButtonComponent.pixelPerfect = true;

        // archivesbtn (components)
        const archivesbtnButtonComponent = new ButtonComponent(archivesbtn);
        archivesbtnButtonComponent.handCursor = true;
        archivesbtnButtonComponent.pixelPerfect = true;

        // boiler_cave_trigger (components)
        const boiler_cave_triggerRoomTrigger = new RoomTrigger(boiler_cave_trigger);
        boiler_cave_triggerRoomTrigger.destination = 806;
        boiler_cave_triggerRoomTrigger.playerX = 369;
        boiler_cave_triggerRoomTrigger.playerY = 726.75;

        // boiler_dance_trigger (components)
        const boiler_dance_triggerRoomTrigger = new RoomTrigger(boiler_dance_trigger);
        boiler_dance_triggerRoomTrigger.destination = 120;
        boiler_dance_triggerRoomTrigger.playerX = 1102.5;
        boiler_dance_triggerRoomTrigger.playerY = 506.25;

        this.archives = archives;
        this.door = door;
        this.doorbtn = doorbtn;
        this.dancebtn = dancebtn;
        this.drawer1 = drawer1;
        this.archivesbtn = archivesbtn;
        this.block = block;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public archives!: Phaser.GameObjects.Image;
    public door!: Phaser.GameObjects.Image;
    public doorbtn!: Phaser.GameObjects.Image;
    public dancebtn!: Phaser.GameObjects.Image;
    public drawer1!: Phaser.GameObjects.Sprite;
    public archivesbtn!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
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

        this.doorbtn.on('over', () => {
            this.door.setFrame('boiler/door0002');
            this.sound.play('boiler2013-dooropen');
        });
        this.doorbtn.on('out', () => {
            this.door.setFrame('boiler/door0001');
            this.sound.play('boiler2013-doorclose');
        });
        this.doorbtn.on('release', () => this.world.move(675, 623.25));

        this.dancebtn.on('release', () => this.world.move(1172.25, 630));

        this.drawer1.on('over', () => {
            this.interface.showLocalizedHint(this.drawer1, 'archives_hint');
            this.drawer1.play('boiler2013-draweropen-animation');
            this.sound.play('boiler2013-draweropen');
        });
        this.drawer1.on('out', () => {
            this.interface.hideHint();
            this.drawer1.play('boiler2013-drawerclose-animation');
            this.sound.play('boiler2013-drawerclose');
        });
        this.drawer1.on('release', () => {
            // TODO: Open archives
        });

        this.archivesbtn.on('over', () => {
            this.archives.setFrame('boiler/archives0002');
        });
        this.archivesbtn.on('out', () => {
            this.archives.setFrame('boiler/archives0001');
        });
        this.archivesbtn.on('release', () => {
            // TODO: Open archives
        });

        if (data.onready) data.onready(this);
    }

    unload(engine: Engine): void {
        engine.app.unloadAssetPack('boiler2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
