
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import DepthEnabled from "../../../lib/ui/components/DepthEnabled";
import RoomTrigger from "../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Plaza extends Phaser.Scene implements Room {

    constructor() {
        super("Plaza");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("plaza-pack", "assets/world/rooms/plaza/plaza-pack.json");
    }

    editorCreate(): void {

        // plaza_sky
        const plaza_sky = this.add.image(-130.3875, -22.5, "plaza", "plaza/sky");
        plaza_sky.setOrigin(0, 0);

        // plaza_base
        const plaza_base = this.add.image(-116.8875, -45.9, "plaza", "plaza/base");
        plaza_base.setOrigin(0, 0);

        // canon
        const canon = this.add.sprite(178.9875, 446.4, "plaza", "plaza/canon0001");
        canon.setOrigin(0, 0);

        // canon_btn
        const canon_btn = this.add.image(233.6625, 478.4625, "plaza", "plaza/canon_btn0004");
        canon_btn.alpha = 0.01;
        canon_btn.alphaTopLeft = 0.01;
        canon_btn.alphaTopRight = 0.01;
        canon_btn.alphaBottomLeft = 0.01;
        canon_btn.alphaBottomRight = 0.01;

        // petdoor
        const petdoor = this.add.image(266.9625, 403.5375, "plaza", "plaza/petdoor0001");
        petdoor.setOrigin(0, 0);

        // plaza_pufflefront
        const plaza_pufflefront = this.add.image(152.4375, 71.1, "plaza", "plaza/pufflefront");
        plaza_pufflefront.setOrigin(0, 0);

        // hoteldoor
        const hoteldoor = this.add.image(580.95, 378, "plaza", "plaza/hoteldoor0001");
        hoteldoor.setOrigin(0, 0);

        // plaza_hotelfront
        const plaza_hotelfront = this.add.image(511.2, 298.6875, "plaza", "plaza/hotelfront");
        plaza_hotelfront.setOrigin(0, 0);

        // stagedoor1
        const stagedoor1 = this.add.image(813.375, 384.075, "plaza", "plaza/stagedoor10001");
        stagedoor1.setOrigin(0, 0);

        // stagedoor2
        const stagedoor2 = this.add.image(1030.275, 386.55, "plaza", "plaza/stagedoor20001");
        stagedoor2.setOrigin(0, 0);

        // plaza_tickets
        const plaza_tickets = this.add.image(895.725, 340.5375, "plaza", "plaza/tickets");
        plaza_tickets.setOrigin(0, 0);

        // stagelights
        const stagelights = this.add.sprite(859.9125, 93.5625, "plaza", "plaza/lights0001");
        stagelights.setOrigin(0, 0);

        // plaza_stagefront
        const plaza_stagefront = this.add.image(792.9, 137.13750000000002, "plaza", "plaza/stagefront");
        plaza_stagefront.setOrigin(0, 0);

        // pizzadoor
        const pizzadoor = this.add.image(1273.1625, 398.5875, "plaza", "plaza/pizzadoor0001");
        pizzadoor.setOrigin(0, 0);

        // stageplay
        const stageplay = this.add.image(834.4125, 286.7625, "plaza", "plaza/stageplay0001");
        stageplay.setOrigin(0, 0);

        // fronts
        const fronts = this.add.image(154.0125, 27.9, "plaza", "plaza/fronts0001");
        fronts.setOrigin(0, 0);

        // manhole
        const manhole = this.add.sprite(446.7375, 486.9, "plaza", "plaza/manhole0001");
        manhole.setOrigin(0, 0);

        // smoke
        const smoke = this.add.sprite(-13.8375, 278.8875, "plaza", "plaza/smoke0001");
        smoke.setOrigin(0, 0);
        smoke.visible = false;

        // puffle
        const puffle = this.add.sprite(-423.7875, 464.4, "plaza", "plaza/puffle0001");
        puffle.setOrigin(0, 0);
        puffle.visible = false;

        // plaza_tree
        const plaza_tree = this.add.image(1571.5125, 625.05, "plaza", "plaza/tree");
        plaza_tree.setOrigin(0, 0);

        // plaza_foreground
        const plaza_foreground = this.add.image(-187.425, 709.65, "plaza", "plaza/foreground");
        plaza_foreground.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "plaza", "plaza/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // manhole_btn
        const manhole_btn = this.add.image(511, 628, "plaza", "plaza/manhole_mc");
        manhole_btn.alpha = 0.01;
        manhole_btn.alphaTopLeft = 0.01;
        manhole_btn.alphaTopRight = 0.01;
        manhole_btn.alphaBottomLeft = 0.01;
        manhole_btn.alphaBottomRight = 0.01;

        // petdoor_btn
        const petdoor_btn = this.add.image(266.9625, 403.5375, "plaza", "plaza/petdoor0004");
        petdoor_btn.setOrigin(0, 0);
        petdoor_btn.alpha = 0.01;
        petdoor_btn.alphaTopLeft = 0.01;
        petdoor_btn.alphaTopRight = 0.01;
        petdoor_btn.alphaBottomLeft = 0.01;
        petdoor_btn.alphaBottomRight = 0.01;

        // hoteldoor_btn
        const hoteldoor_btn = this.add.image(580.95, 378, "plaza", "plaza/hoteldoor0004");
        hoteldoor_btn.setOrigin(0, 0);
        hoteldoor_btn.alpha = 0.01;
        hoteldoor_btn.alphaTopLeft = 0.01;
        hoteldoor_btn.alphaTopRight = 0.01;
        hoteldoor_btn.alphaBottomLeft = 0.01;
        hoteldoor_btn.alphaBottomRight = 0.01;

        // stagedoor1_btn
        const stagedoor1_btn = this.add.image(813.375, 384.075, "plaza", "plaza/stagedoor10004");
        stagedoor1_btn.setOrigin(0, 0);
        stagedoor1_btn.alpha = 0.01;
        stagedoor1_btn.alphaTopLeft = 0.01;
        stagedoor1_btn.alphaTopRight = 0.01;
        stagedoor1_btn.alphaBottomLeft = 0.01;
        stagedoor1_btn.alphaBottomRight = 0.01;

        // stagedoor2_btn
        const stagedoor2_btn = this.add.image(1030.275, 386.55, "plaza", "plaza/stagedoor20004");
        stagedoor2_btn.setOrigin(0, 0);
        stagedoor2_btn.alpha = 0.01;
        stagedoor2_btn.alphaTopLeft = 0.01;
        stagedoor2_btn.alphaTopRight = 0.01;
        stagedoor2_btn.alphaBottomLeft = 0.01;
        stagedoor2_btn.alphaBottomRight = 0.01;

        // pizzadoor_btn
        const pizzadoor_btn = this.add.image(1273.1625, 398.5875, "plaza", "plaza/pizzadoor0004");
        pizzadoor_btn.setOrigin(0, 0);
        pizzadoor_btn.alpha = 0.01;
        pizzadoor_btn.alphaTopLeft = 0.01;
        pizzadoor_btn.alphaTopRight = 0.01;
        pizzadoor_btn.alphaBottomLeft = 0.01;
        pizzadoor_btn.alphaBottomRight = 0.01;

        // forest_btn
        const forest_btn = this.add.image(1575, 552.375, "plaza", "plaza/forest_btn0004");
        forest_btn.alpha = 0.01;
        forest_btn.alphaTopLeft = 0.01;
        forest_btn.alphaTopRight = 0.01;
        forest_btn.alphaBottomLeft = 0.01;
        forest_btn.alphaBottomRight = 0.01;

        // forts_btn
        const forts_btn = this.add.image(5.625, 541.2375, "plaza", "plaza/forts_btn0004");
        forts_btn.alpha = 0.01;
        forts_btn.alphaTopLeft = 0.01;
        forts_btn.alphaTopRight = 0.01;
        forts_btn.alphaBottomLeft = 0.01;
        forts_btn.alphaBottomRight = 0.01;

        // plaza_forts_mc
        const plaza_forts_mc = this.add.image(13.3875, 671.625, "plaza", "plaza/forts_mc");
        plaza_forts_mc.visible = false;

        // plaza_pet_mc
        const plaza_pet_mc = this.add.image(364.3875, 543.375, "plaza", "plaza/pet_mc");
        plaza_pet_mc.visible = false;

        // plaza_cave_mc
        const plaza_cave_mc = this.add.image(476, 604, "plaza", "plaza/cave_mc");
        plaza_cave_mc.visible = false;

        // plaza_hotel_mc
        const plaza_hotel_mc = this.add.image(659.8125, 511.875, "plaza", "plaza/hotel_mc");
        plaza_hotel_mc.visible = false;

        // plaza_stage_mc
        const plaza_stage_mc = this.add.image(857.925, 509.625, "plaza", "plaza/stage_mc");
        plaza_stage_mc.visible = false;

        // plaza_stage_mc_1
        const plaza_stage_mc_1 = this.add.image(1076.175, 509.625, "plaza", "plaza/stage_mc");
        plaza_stage_mc_1.visible = false;

        // plaza_pizza_mc
        const plaza_pizza_mc = this.add.image(1334.1375, 545.625, "plaza", "plaza/pizza_mc");
        plaza_pizza_mc.visible = false;

        // plaza_forest_mc
        const plaza_forest_mc = this.add.image(1644.6375, 619.875, "plaza", "plaza/forest_mc");
        plaza_forest_mc.visible = false;

        // tickets_btn
        const tickets_btn = this.add.image(965.25, 445.1625, "plaza", "plaza/tickets_btn0004");
        tickets_btn.alpha = 0.01;
        tickets_btn.alphaTopLeft = 0.01;
        tickets_btn.alphaTopRight = 0.01;
        tickets_btn.alphaBottomLeft = 0.01;
        tickets_btn.alphaBottomRight = 0.01;

        // lists
        const triggers = [plaza_hotel_mc, plaza_stage_mc_1, plaza_stage_mc, plaza_pizza_mc, plaza_forts_mc, plaza_forest_mc, plaza_cave_mc, plaza_pet_mc];

        // canon_btn (components)
        const canon_btnButtonComponent = new ButtonComponent(canon_btn);
        canon_btnButtonComponent.pixelPerfect = true;

        // plaza_tickets (components)
        const plaza_ticketsDepthEnabled = new DepthEnabled(plaza_tickets);
        plaza_ticketsDepthEnabled.automaticSort = false;
        plaza_ticketsDepthEnabled.depth = 517.95;

        // puffle (components)
        const puffleDepthEnabled = new DepthEnabled(puffle);
        puffleDepthEnabled.automaticSort = false;
        puffleDepthEnabled.depth = 1080;

        // plaza_tree (components)
        const plaza_treeDepthEnabled = new DepthEnabled(plaza_tree);
        plaza_treeDepthEnabled.automaticSort = false;
        plaza_treeDepthEnabled.depth = 353.9;

        // plaza_foreground (components)
        const plaza_foregroundDepthEnabled = new DepthEnabled(plaza_foreground);
        plaza_foregroundDepthEnabled.automaticSort = false;
        plaza_foregroundDepthEnabled.depth = 1080;

        // manhole_btn (components)
        const manhole_btnButtonComponent = new ButtonComponent(manhole_btn);
        manhole_btnButtonComponent.handCursor = true;
        manhole_btnButtonComponent.pixelPerfect = true;

        // petdoor_btn (components)
        const petdoor_btnButtonComponent = new ButtonComponent(petdoor_btn);
        petdoor_btnButtonComponent.handCursor = true;
        petdoor_btnButtonComponent.pixelPerfect = true;

        // hoteldoor_btn (components)
        const hoteldoor_btnButtonComponent = new ButtonComponent(hoteldoor_btn);
        hoteldoor_btnButtonComponent.handCursor = true;
        hoteldoor_btnButtonComponent.pixelPerfect = true;

        // stagedoor1_btn (components)
        const stagedoor1_btnButtonComponent = new ButtonComponent(stagedoor1_btn);
        stagedoor1_btnButtonComponent.handCursor = true;
        stagedoor1_btnButtonComponent.pixelPerfect = true;

        // stagedoor2_btn (components)
        const stagedoor2_btnButtonComponent = new ButtonComponent(stagedoor2_btn);
        stagedoor2_btnButtonComponent.handCursor = true;
        stagedoor2_btnButtonComponent.pixelPerfect = true;

        // pizzadoor_btn (components)
        const pizzadoor_btnButtonComponent = new ButtonComponent(pizzadoor_btn);
        pizzadoor_btnButtonComponent.handCursor = true;
        pizzadoor_btnButtonComponent.pixelPerfect = true;

        // forest_btn (components)
        const forest_btnButtonComponent = new ButtonComponent(forest_btn);
        forest_btnButtonComponent.pixelPerfect = true;

        // forts_btn (components)
        const forts_btnButtonComponent = new ButtonComponent(forts_btn);
        forts_btnButtonComponent.pixelPerfect = true;

        // plaza_forts_mc (components)
        const plaza_forts_mcRoomTrigger = new RoomTrigger(plaza_forts_mc);
        plaza_forts_mcRoomTrigger.destination = 801;
        plaza_forts_mcRoomTrigger.playerX = 1473.75;
        plaza_forts_mcRoomTrigger.playerY = 528.75;

        // plaza_pet_mc (components)
        const plaza_pet_mcRoomTrigger = new RoomTrigger(plaza_pet_mc);
        plaza_pet_mcRoomTrigger.destination = 310;
        plaza_pet_mcRoomTrigger.playerX = 855;
        plaza_pet_mcRoomTrigger.playerY = 472.5;

        // plaza_cave_mc (components)
        const plaza_cave_mcRoomTrigger = new RoomTrigger(plaza_cave_mc);
        plaza_cave_mcRoomTrigger.destination = 806;
        plaza_cave_mcRoomTrigger.playerX = 1327.5;
        plaza_cave_mcRoomTrigger.playerY = 690.75;

        // plaza_hotel_mc (components)
        const plaza_hotel_mcRoomTrigger = new RoomTrigger(plaza_hotel_mc);
        plaza_hotel_mcRoomTrigger.destination = 430;
        plaza_hotel_mcRoomTrigger.playerX = 855;
        plaza_hotel_mcRoomTrigger.playerY = 472.5;

        // plaza_stage_mc (components)
        const plaza_stage_mcRoomTrigger = new RoomTrigger(plaza_stage_mc);
        plaza_stage_mcRoomTrigger.destination = 340;
        plaza_stage_mcRoomTrigger.playerX = 236.25;
        plaza_stage_mcRoomTrigger.playerY = 742.5;

        // plaza_stage_mc_1 (components)
        const plaza_stage_mc_1RoomTrigger = new RoomTrigger(plaza_stage_mc_1);
        plaza_stage_mc_1RoomTrigger.destination = 340;
        plaza_stage_mc_1RoomTrigger.playerX = 236.25;
        plaza_stage_mc_1RoomTrigger.playerY = 742.5;

        // plaza_pizza_mc (components)
        const plaza_pizza_mcRoomTrigger = new RoomTrigger(plaza_pizza_mc);
        plaza_pizza_mcRoomTrigger.destination = 330;
        plaza_pizza_mcRoomTrigger.playerX = 821.25;
        plaza_pizza_mcRoomTrigger.playerY = 438.75;

        // plaza_forest_mc (components)
        const plaza_forest_mcRoomTrigger = new RoomTrigger(plaza_forest_mc);
        plaza_forest_mcRoomTrigger.destination = 809;
        plaza_forest_mcRoomTrigger.playerX = 303.75;
        plaza_forest_mcRoomTrigger.playerY = 483.75;

        // tickets_btn (components)
        const tickets_btnButtonComponent = new ButtonComponent(tickets_btn);
        tickets_btnButtonComponent.pixelPerfect = true;

        this.canon = canon;
        this.canon_btn = canon_btn;
        this.petdoor = petdoor;
        this.hoteldoor = hoteldoor;
        this.stagedoor1 = stagedoor1;
        this.stagedoor2 = stagedoor2;
        this.stagelights = stagelights;
        this.pizzadoor = pizzadoor;
        this.stageplay = stageplay;
        this.fronts = fronts;
        this.manhole = manhole;
        this.smoke = smoke;
        this.puffle = puffle;
        this.block = block;
        this.manhole_btn = manhole_btn;
        this.petdoor_btn = petdoor_btn;
        this.hoteldoor_btn = hoteldoor_btn;
        this.stagedoor1_btn = stagedoor1_btn;
        this.stagedoor2_btn = stagedoor2_btn;
        this.pizzadoor_btn = pizzadoor_btn;
        this.forest_btn = forest_btn;
        this.forts_btn = forts_btn;
        this.tickets_btn = tickets_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public canon!: Phaser.GameObjects.Sprite;
    public canon_btn!: Phaser.GameObjects.Image;
    public petdoor!: Phaser.GameObjects.Image;
    public hoteldoor!: Phaser.GameObjects.Image;
    public stagedoor1!: Phaser.GameObjects.Image;
    public stagedoor2!: Phaser.GameObjects.Image;
    public stagelights!: Phaser.GameObjects.Sprite;
    public pizzadoor!: Phaser.GameObjects.Image;
    public stageplay!: Phaser.GameObjects.Image;
    public fronts!: Phaser.GameObjects.Image;
    public manhole!: Phaser.GameObjects.Sprite;
    public smoke!: Phaser.GameObjects.Sprite;
    public puffle!: Phaser.GameObjects.Sprite;
    public block!: Phaser.GameObjects.Image;
    public manhole_btn!: Phaser.GameObjects.Image;
    public petdoor_btn!: Phaser.GameObjects.Image;
    public hoteldoor_btn!: Phaser.GameObjects.Image;
    public stagedoor1_btn!: Phaser.GameObjects.Image;
    public stagedoor2_btn!: Phaser.GameObjects.Image;
    public pizzadoor_btn!: Phaser.GameObjects.Image;
    public forest_btn!: Phaser.GameObjects.Image;
    public forts_btn!: Phaser.GameObjects.Image;
    public tickets_btn!: Phaser.GameObjects.Image;
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

        this.forts_btn.on('release', () => this.world.move(101.25, 641.25));

        this.petdoor_btn.on('over', () => {
            this.petdoor.setFrame('plaza/petdoor0002');
            this.sound.play('plaza_dooropen');
        });
        this.petdoor_btn.on('out', () => {
            this.petdoor.setFrame('plaza/petdoor0001');
            this.sound.play('plaza_doorclose');
        });
        this.petdoor_btn.on('release', () => this.world.move(360, 540));

        this.manhole_btn.on('over', () => {
            this.manhole.play('plaza-manholeopen-animation');
            this.sound.play('plaza_manholeopen');
        });
        this.manhole_btn.on('out', () => {
            this.manhole.play('plaza-manholeclose-animation');
            this.sound.play('plaza_manholeclose');
        });
        this.manhole_btn.on('release', () => this.world.move(517.5, 630))

        this.hoteldoor_btn.on('over', () => {
            this.hoteldoor.setFrame('plaza/hoteldoor0002');
            this.sound.play('plaza_dooropen1');
        });
        this.hoteldoor_btn.on('out', () => {
            this.hoteldoor.setFrame('plaza/hoteldoor0001');
            this.sound.play('plaza_doorclose1');
        });
        this.hoteldoor_btn.on('release', () => this.world.move(652.5, 540));

        this.stagedoor1_btn.on('over', () => {
            this.stagedoor1.setFrame('plaza/stagedoor10002');
            this.sound.play('plaza_dooropen2');
        });
        this.stagedoor1_btn.on('out', () => {
            this.stagedoor1.setFrame('plaza/stagedoor10001');
            this.sound.play('plaza_doorclose2');
        });
        this.stagedoor1_btn.on('release', () => this.world.move(855, 506.25));

        this.tickets_btn.on('release', () => this.world.move(967.5, 472.5));

        this.stagedoor2_btn.on('over', () => {
            this.stagedoor2.setFrame('plaza/stagedoor20002');
            this.sound.play('plaza_dooropen2');
        });
        this.stagedoor2_btn.on('out', () => {
            this.stagedoor2.setFrame('plaza/stagedoor20001');
            this.sound.play('plaza_doorclose2');
        });
        this.stagedoor2_btn.on('release', () => this.world.move(1080, 506.25));

        this.pizzadoor_btn.on('over', () => {
            this.pizzadoor.setFrame('plaza/pizzadoor0002');
            this.sound.play('plaza_dooropen3');
        });
        this.pizzadoor_btn.on('out', () => {
            this.pizzadoor.setFrame('plaza/pizzadoor0001');
            this.sound.play('plaza_doorclose3');
        });
        this.pizzadoor_btn.on('release', () => this.world.move(1327.5, 540));

        this.forest_btn.on('release', () => this.world.move(1586.25, 630));

        this.canon_btn.on('over', () => {
            this.canon.play('plaza-canon-animation');
            this.smoke.play('plaza-smoke-animation');
            this.puffle.play('plaza-puffle-animation');
            this.sound.play('plaza_canon');
        });

        this.stagelights.play('plaza-lights-animation');

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.fronts.setFrame(`plaza/fronts${locale.frame}`);
        this.stageplay.setFrame(`plaza/stageplay${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('plaza-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
