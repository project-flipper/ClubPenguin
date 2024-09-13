
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import DepthEnabled from "../../../lib/ui/components/DepthEnabled";
import RoomTrigger from "../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "../../../app/app";
import { Engine,  Room } from "../../engine/engine";
import Interface from "../../interface/Interface";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class DojoExt extends Phaser.Scene implements Room {

    constructor() {
        super("DojoExt");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("dojoext-pack", "assets/world/rooms/dojoext/dojoext-pack.json");
    }

    editorCreate(): void {

        // dojoext_sky
        const dojoext_sky = this.add.image(-125.775, -22.5, "dojoext", "dojoext/sky");
        dojoext_sky.setOrigin(0, 0);

        // dojoext_base
        const dojoext_base = this.add.image(-127.125, -20.025, "dojoext", "dojoext/base");
        dojoext_base.setOrigin(0, 0);

        // lava
        const lava = this.add.image(-77.2875, -91.2375, "dojoext", "dojoext/lava");
        lava.setOrigin(0, 0);

        // smoke
        const smoke = this.add.sprite(-64.6875, -23.4, "dojoext", "dojoext/smoke0001");
        smoke.setOrigin(0, 0);
        smoke.visible = false;

        // waterfall
        const waterfall = this.add.sprite(268.425, 73.6875, "dojoext", "dojoext/waterfall0001");
        waterfall.setOrigin(0, 0);

        // door
        const door = this.add.image(766.35, 465.75, "dojoext", "dojoext/door0001");
        door.setOrigin(0, 0);

        // door_btn
        const door_btn = this.add.image(766.35, 465.75, "dojoext", "dojoext/door0004");
        door_btn.setOrigin(0, 0);
        door_btn.alpha = 0.01;
        door_btn.alphaTopLeft = 0.01;
        door_btn.alphaTopRight = 0.01;
        door_btn.alphaBottomLeft = 0.01;
        door_btn.alphaBottomRight = 0.01;

        // dojoext_dojo
        const dojoext_dojo = this.add.image(33.4125, -13.725, "dojoext", "dojoext/dojo");
        dojoext_dojo.setOrigin(0, 0);

        // dojoext_tree1
        const dojoext_tree1 = this.add.image(1542.375, 818.55, "dojoext", "dojoext/tree1");
        dojoext_tree1.setOrigin(0.46656862745098043, 0.6685398230088496);

        // dojoext_tree2
        const dojoext_tree2 = this.add.image(1461.7125, 905.85, "dojoext", "dojoext/tree2");
        dojoext_tree2.setOrigin(0.5106310679611651, 0.6539837398373983);

        // dojoext_tree3
        const dojoext_tree3 = this.add.image(1562.85, 808.7625, "dojoext", "dojoext/tree3");
        dojoext_tree3.setOrigin(0, 0);

        // dojoext_leftstatue
        const dojoext_leftstatue = this.add.image(520.2, 910.35, "dojoext", "dojoext/leftstatue");
        dojoext_leftstatue.setOrigin(0.49178030303030307, 0.37788461538461543);

        // dojoext_rightstatue
        const dojoext_rightstatue = this.add.image(1241.4375, 901.35, "dojoext", "dojoext/rightstatue");
        dojoext_rightstatue.setOrigin(0.45155172, 0.36834891);

        // deck
        const deck = this.add.image(1599.4125, 985.725, "dojoext", "dojoext/deck0001");

        // deck_btn
        const deck_btn = this.add.image(1599.4125, 985.725, "dojoext", "dojoext/deck0004");
        deck_btn.alpha = 0.01;
        deck_btn.alphaTopLeft = 0.01;
        deck_btn.alphaTopRight = 0.01;
        deck_btn.alphaBottomLeft = 0.01;
        deck_btn.alphaBottomRight = 0.01;

        // dojoext_dojo_mc
        const dojoext_dojo_mc = this.add.image(873.675, 662.7375, "dojoext", "dojoext/dojo_mc");
        dojoext_dojo_mc.visible = false;

        // dojoext_shack_mc
        const dojoext_shack_mc = this.add.image(879.525, 999.675, "dojoext", "dojoext/shack_mc");
        dojoext_shack_mc.visible = false;

        // block
        const block = this.add.image(-45, -45, "dojoext", "dojoext/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // lists
        const triggers = [dojoext_dojo_mc, dojoext_shack_mc];

        // door_btn (components)
        const door_btnButtonComponent = new ButtonComponent(door_btn);
        door_btnButtonComponent.handCursor = true;
        door_btnButtonComponent.pixelPerfect = true;

        // dojoext_tree1 (components)
        new DepthEnabled(dojoext_tree1);

        // dojoext_tree2 (components)
        new DepthEnabled(dojoext_tree2);

        // dojoext_tree3 (components)
        const dojoext_tree3DepthEnabled = new DepthEnabled(dojoext_tree3);
        dojoext_tree3DepthEnabled.automaticSort = false;
        dojoext_tree3DepthEnabled.depth = 1080;

        // dojoext_leftstatue (components)
        new DepthEnabled(dojoext_leftstatue);

        // dojoext_rightstatue (components)
        new DepthEnabled(dojoext_rightstatue);

        // deck (components)
        const deckDepthEnabled = new DepthEnabled(deck);
        deckDepthEnabled.automaticSort = false;
        deckDepthEnabled.depth = 1080;

        // deck_btn (components)
        const deck_btnButtonComponent = new ButtonComponent(deck_btn);
        deck_btnButtonComponent.handCursor = true;
        deck_btnButtonComponent.pixelPerfect = true;

        // dojoext_dojo_mc (components)
        const dojoext_dojo_mcRoomTrigger = new RoomTrigger(dojoext_dojo_mc);
        dojoext_dojo_mcRoomTrigger.destination = "320";
        dojoext_dojo_mcRoomTrigger.playerX = 855;
        dojoext_dojo_mcRoomTrigger.playerY = 798.75;

        // dojoext_shack_mc (components)
        const dojoext_shack_mcRoomTrigger = new RoomTrigger(dojoext_shack_mc);
        dojoext_shack_mcRoomTrigger.destination = "807";
        dojoext_shack_mcRoomTrigger.playerX = 900;
        dojoext_shack_mcRoomTrigger.playerY = 483.75;

        this.lava = lava;
        this.smoke = smoke;
        this.waterfall = waterfall;
        this.door = door;
        this.door_btn = door_btn;
        this.deck = deck;
        this.deck_btn = deck_btn;
        this.block = block;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public lava!: Phaser.GameObjects.Image;
    public smoke!: Phaser.GameObjects.Sprite;
    public waterfall!: Phaser.GameObjects.Sprite;
    public door!: Phaser.GameObjects.Image;
    public door_btn!: Phaser.GameObjects.Image;
    public deck!: Phaser.GameObjects.Image;
    public deck_btn!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
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

        this.lava.mask = this.smoke.createBitmapMask();

        this.door_btn.on('over', () => {
            this.door.setFrame('dojoext/door0002');
            this.sound.play('dojoext_dooropen');
        });
        this.door_btn.on('out', () => {
            this.door.setFrame('dojoext/door0001');
            this.sound.play('dojoext_doorclose');
        });
        this.door_btn.on('release', () => this.world.move(873, 652.5));

        this.deck_btn.on('over', () => this.deck.setFrame('dojoext/deck0002'));
        this.deck_btn.on('out', () => this.deck.setFrame('dojoext/deck0001'));

        this.smoke.play('dojoext-smoke-animation');
        this.waterfall.play('dojoext-waterfall-animation');

        if (data.onready) data.onready(this);
    }

    unload(engine: Engine): void {
        engine.app.unloadAssetPack('dojoext-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
