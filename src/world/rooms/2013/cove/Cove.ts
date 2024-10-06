
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/ui/components/DepthEnabled";
import ButtonComponent from "../../../../lib/ui/components/ButtonComponent";
import Trigger from "../../../../lib/ui/components/Trigger";
import RoomTrigger from "../../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import Phaser from "phaser";

import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Cove extends Phaser.Scene implements Room {

    constructor() {
        super("Cove");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("cove-pack", "assets/world/rooms/2013/cove/cove-pack.json");
    }

    editorCreate(): void {

        // cove_sky
        const cove_sky = this.add.image(-22.5, -22.5, "cove", "cove/sky");
        cove_sky.setOrigin(0, 0);

        // cove_base
        const cove_base = this.add.image(-65.75, -113.7, "cove", "cove/base");
        cove_base.setOrigin(0, 0);

        // cove_oceantile1
        const cove_oceantile1 = this.add.image(1248.6375, 742.8375, "cove", "cove/oceantile1");
        cove_oceantile1.setOrigin(0.24318627450980393, 1.3772);

        // cove_oceantile2
        const cove_oceantile2 = this.add.image(1166.85, 770.625, "cove", "cove/oceantile2");
        cove_oceantile2.setOrigin(0.5013106159895151, 1.4852);

        // cove_oceantile3
        const cove_oceantile3 = this.add.image(1130.625, 795.375, "cove", "cove/oceantile3");
        cove_oceantile3.setOrigin(0.5290878754171301, 1.4896);

        // cove_oceantile4
        const cove_oceantile4 = this.add.image(1118.7, 820.125, "cove", "cove/oceantile4");
        cove_oceantile4.setOrigin(0.5396599999999999, 1.4896);

        // cove_oceantile5
        const cove_oceantile5 = this.add.image(1134.9, 844.875, "cove", "cove/oceantile5");
        cove_oceantile5.setOrigin(0.5000933, 1.4852);

        // cove_oceantile6
        const cove_oceantile6 = this.add.image(1154.925, 869.625, "cove", "cove/oceantile6");
        cove_oceantile6.setOrigin(0.525765306122449, 1.4896);

        // cove_oceantile7
        const cove_oceantile7 = this.add.image(1148.2875, 894.375, "cove", "cove/oceantile7");
        cove_oceantile7.setOrigin(0.52040816, 1.4852);

        // cove_oceantile8
        const cove_oceantile8 = this.add.image(1135.2375, 919.125, "cove", "cove/oceantile8");
        cove_oceantile8.setOrigin(0.508458, 1.4852);

        // cove_oceantile9
        const cove_oceantile9 = this.add.image(1128.7125, 943.875, "cove", "cove/oceantile9");
        cove_oceantile9.setOrigin(0.444971, 1.4852);

        // cove_oceantile10
        const cove_oceantile10 = this.add.image(1127.925, 968.625, "cove", "cove/oceantile10");
        cove_oceantile10.setOrigin(0.415205, 1.4852);

        // cove_oceantile11
        const cove_oceantile11 = this.add.image(1141.875, 993.375, "cove", "cove/oceantile11");
        cove_oceantile11.setOrigin(0.41714, 1.4852);

        // cove_oceantile12
        const cove_oceantile12 = this.add.image(1151.2125, 1018.125, "cove", "cove/oceantile12");
        cove_oceantile12.setOrigin(0.492722, 1.4852);

        // cove_oceantile13
        const cove_oceantile13 = this.add.image(1128.0375, 1042.875, "cove", "cove/oceantile13");
        cove_oceantile13.setOrigin(0.403003, 1.4852);

        // cove_oceantile14
        const cove_oceantile14 = this.add.image(1128.0375, 1067.625, "cove", "cove/oceantile14");
        cove_oceantile14.setOrigin(0.400801, 1.4852);

        // cove_oceantile15
        const cove_oceantile15 = this.add.image(1128.0375, 1067.625, "cove", "cove/oceantile15");
        cove_oceantile15.setOrigin(0.399424, 0.4952);

        // cove_rock
        const cove_rock = this.add.image(564.975, 906.75, "cove", "cove/rock");
        cove_rock.setOrigin(0.46977337, 0.11830986);

        // cove_fish
        const cove_fish = this.add.image(160.7625, 617.2875, "cove", "cove/fish");
        cove_fish.setOrigin(0.64565217, 0.72954545);

        // cove_umbrella
        const cove_umbrella = this.add.image(271.125, 592.5375, "cove", "cove/umbrella");
        cove_umbrella.setOrigin(0.62863799, 0.64453083);

        // cove_fireplace
        const cove_fireplace = this.add.image(304.3125, 672.75, "cove", "cove/fireplace");
        cove_fireplace.setOrigin(0, 0);

        // fire
        const fire = this.add.sprite(343.6875, 582.4125, "cove", "cove/fire0001");
        fire.setOrigin(0, 0);

        // cove_chairside
        const cove_chairside = this.add.image(460.4625, 214.65, "cove", "cove/chairside");
        cove_chairside.setOrigin(-0.38734177, -0.46931034);

        // binoculars
        const binoculars = this.add.image(456.8625, 210.15, "cove", "cove/binoculars0001");
        binoculars.setOrigin(0, 0);

        // binoculars_btn
        const binoculars_btn = this.add.image(456.8625, 210.15, "cove", "cove/binoculars0004");
        binoculars_btn.setOrigin(0, 0);
        binoculars_btn.alpha = 0.01;
        binoculars_btn.alphaTopLeft = 0.01;
        binoculars_btn.alphaTopRight = 0.01;
        binoculars_btn.alphaBottomLeft = 0.01;
        binoculars_btn.alphaBottomRight = 0.01;

        // cove_tree1
        const cove_tree1 = this.add.image(1626.3, 665.4375, "cove", "cove/tree1");
        cove_tree1.setOrigin(0.318974358974359, 0.5946153846153847);

        // cove_surfshack
        const cove_surfshack = this.add.image(1416.9375, 414.7875, "cove", "cove/surfshack");
        cove_surfshack.setOrigin(0.44294425, 0.86802905);

        // surfshacksign
        const surfshacksign = this.add.image(1354.05, 113.2125, "cove", "cove/surfshacksign0001");
        surfshacksign.setOrigin(0, 0);

        // cove_chair
        const cove_chair = this.add.image(1262.5875, 501.75, "cove", "cove/chair");
        cove_chair.setOrigin(0.571875, 0.46379888);

        // cove_table
        const cove_table = this.add.image(1367.1, 534.15, "cove", "cove/table");
        cove_table.setOrigin(0.482, 0.68101604);

        // cove_chairbase
        const cove_chairbase = this.add.image(1472.0625, 559.2375, "cove", "cove/chairbase");
        cove_chairbase.setOrigin(0.47237179487179487, 0.051287128712871284);

        // cove_chairback
        const cove_chairback = this.add.image(1479.6, 615.4875, "cove", "cove/chairback");
        cove_chairback.setOrigin(0.18586957, 0.72607362);

        // cove_nail1
        const cove_nail1 = this.add.image(1159.875, 562.05, "cove", "cove/nail1");
        cove_nail1.setOrigin(0.4652702702702703, 0.6465934065934066);

        // cove_nail2
        const cove_nail2 = this.add.image(1242.675, 621.9, "cove", "cove/nail2");
        cove_nail2.setOrigin(0.7125252525252526, 0.8347727272727272);

        // cove_nail3
        const cove_nail3 = this.add.image(1425.7125, 646.3125, "cove", "cove/nail3");
        cove_nail3.setOrigin(0.47961538, 0.7155);

        // cove_tree
        const cove_tree = this.add.image(163.8, 626.85, "cove", "cove/tree");
        cove_tree.setOrigin(1.06876068, 0.05820189);

        // cove_foreground
        const cove_foreground = this.add.image(-91.35, 824.7375, "cove", "cove/foreground");
        cove_foreground.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "cove", "cove/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // cove_ring
        const cove_ring = this.add.image(512.8875, 409.725, "cove", "cove/ring");
        cove_ring.setOrigin(0.39428571, 0.82372881);

        // cove_cup
        const cove_cup = this.add.image(1020.375, 591.075, "cove", "cove/cup");
        cove_cup.setOrigin(0.46333333, 0.72146667);

        // cove_medicsign
        const cove_medicsign = this.add.image(946.575, 293.7375, "cove", "cove/medicsign");
        cove_medicsign.setOrigin(0.31238579, 0.88648148);

        // cove_ocean_water_mc
        const cove_ocean_water_mc = this.add.image(530.6625, 701.55, "cove", "cove/ocean_water_mc");
        cove_ocean_water_mc.setOrigin(0, 0);
        cove_ocean_water_mc.visible = false;

        // waves_trigger
        const waves_trigger = this.add.image(1394.8875, 750.2625, "cove", "cove/waves_mc");
        waves_trigger.visible = false;

        // cove_forest_mc
        const cove_forest_mc = this.add.image(338.175, 310.725, "cove", "cove/forest_mc");
        cove_forest_mc.visible = false;

        // waves
        const waves = this.add.image(1334.7, 744.3, "cove", "cove/waves0001");
        waves.setOrigin(0.47191977, 0.48719844);

        // waves_btn
        const waves_btn = this.add.image(1334.7, 744.3, "cove", "cove/waves0004");
        waves_btn.setOrigin(0.47191977, 0.48719844);
        waves_btn.alpha = 0.01;
        waves_btn.alphaTopLeft = 0.01;
        waves_btn.alphaTopRight = 0.01;
        waves_btn.alphaBottomLeft = 0.01;
        waves_btn.alphaBottomRight = 0.01;

        // cat
        const cat = this.add.image(1621.0125, 1000.9125, "cove", "cove/cat_btn0001");

        // cat_btn
        const cat_btn = this.add.image(1621.0125, 1000.9125, "cove", "cove/cat_btn0004");
        cat_btn.alpha = 0.01;
        cat_btn.alphaTopLeft = 0.01;
        cat_btn.alphaTopRight = 0.01;
        cat_btn.alphaBottomLeft = 0.01;
        cat_btn.alphaBottomRight = 0.01;

        // catalogue
        const catalogue = this.add.sprite(1093.05, 265.1625, "cove", "cove/catalogue0001");
        catalogue.setOrigin(0, 0);

        // catalogue_btn
        const catalogue_btn = this.add.image(1088.325, 263.025, "cove", "cove/catalogue_btn");
        catalogue_btn.setOrigin(0, 0);
        catalogue_btn.alpha = 0.01;
        catalogue_btn.alphaTopLeft = 0.01;
        catalogue_btn.alphaTopRight = 0.01;
        catalogue_btn.alphaBottomLeft = 0.01;
        catalogue_btn.alphaBottomRight = 0.01;

        // lists
        const triggers = [cove_forest_mc, waves_trigger];

        // cove_oceantile1 (components)
        new DepthEnabled(cove_oceantile1);

        // cove_oceantile2 (components)
        new DepthEnabled(cove_oceantile2);

        // cove_oceantile3 (components)
        new DepthEnabled(cove_oceantile3);

        // cove_oceantile4 (components)
        new DepthEnabled(cove_oceantile4);

        // cove_oceantile5 (components)
        new DepthEnabled(cove_oceantile5);

        // cove_oceantile6 (components)
        new DepthEnabled(cove_oceantile6);

        // cove_oceantile7 (components)
        new DepthEnabled(cove_oceantile7);

        // cove_oceantile8 (components)
        new DepthEnabled(cove_oceantile8);

        // cove_oceantile9 (components)
        new DepthEnabled(cove_oceantile9);

        // cove_oceantile10 (components)
        new DepthEnabled(cove_oceantile10);

        // cove_oceantile11 (components)
        new DepthEnabled(cove_oceantile11);

        // cove_oceantile12 (components)
        new DepthEnabled(cove_oceantile12);

        // cove_oceantile13 (components)
        new DepthEnabled(cove_oceantile13);

        // cove_oceantile14 (components)
        new DepthEnabled(cove_oceantile14);

        // cove_oceantile15 (components)
        new DepthEnabled(cove_oceantile15);

        // cove_rock (components)
        new DepthEnabled(cove_rock);

        // cove_fish (components)
        new DepthEnabled(cove_fish);

        // cove_umbrella (components)
        new DepthEnabled(cove_umbrella);

        // cove_fireplace (components)
        const cove_fireplaceDepthEnabled = new DepthEnabled(cove_fireplace);
        cove_fireplaceDepthEnabled.automaticSort = false;
        cove_fireplaceDepthEnabled.depth = 699.075;

        // fire (components)
        const fireDepthEnabled = new DepthEnabled(fire);
        fireDepthEnabled.automaticSort = false;
        fireDepthEnabled.depth = 699.075;

        // cove_chairside (components)
        const cove_chairsideDepthEnabled = new DepthEnabled(cove_chairside);
        cove_chairsideDepthEnabled.automaticSort = false;
        cove_chairsideDepthEnabled.depth = 214.65;

        // binoculars (components)
        const binocularsDepthEnabled = new DepthEnabled(binoculars);
        binocularsDepthEnabled.automaticSort = false;
        binocularsDepthEnabled.depth = 214.65;

        // binoculars_btn (components)
        const binoculars_btnButtonComponent = new ButtonComponent(binoculars_btn);
        binoculars_btnButtonComponent.handCursor = true;
        binoculars_btnButtonComponent.pixelPerfect = true;

        // cove_tree1 (components)
        new DepthEnabled(cove_tree1);

        // cove_surfshack (components)
        new DepthEnabled(cove_surfshack);

        // surfshacksign (components)
        const surfshacksignDepthEnabled = new DepthEnabled(surfshacksign);
        surfshacksignDepthEnabled.automaticSort = false;
        surfshacksignDepthEnabled.depth = 414.7875;

        // cove_chair (components)
        new DepthEnabled(cove_chair);

        // cove_table (components)
        new DepthEnabled(cove_table);

        // cove_chairbase (components)
        new DepthEnabled(cove_chairbase);

        // cove_chairback (components)
        new DepthEnabled(cove_chairback);

        // cove_nail1 (components)
        new DepthEnabled(cove_nail1);

        // cove_nail2 (components)
        new DepthEnabled(cove_nail2);

        // cove_nail3 (components)
        new DepthEnabled(cove_nail3);

        // cove_tree (components)
        new DepthEnabled(cove_tree);

        // cove_foreground (components)
        const cove_foregroundDepthEnabled = new DepthEnabled(cove_foreground);
        cove_foregroundDepthEnabled.automaticSort = false;
        cove_foregroundDepthEnabled.depth = 1080;

        // cove_ring (components)
        new DepthEnabled(cove_ring);

        // cove_cup (components)
        new DepthEnabled(cove_cup);

        // cove_medicsign (components)
        new DepthEnabled(cove_medicsign);

        // waves_trigger (components)
        new Trigger(waves_trigger);

        // cove_forest_mc (components)
        const cove_forest_mcRoomTrigger = new RoomTrigger(cove_forest_mc);
        cove_forest_mcRoomTrigger.destination = 809;
        cove_forest_mcRoomTrigger.playerX = 1338.75;
        cove_forest_mcRoomTrigger.playerY = 843.75;

        // waves (components)
        new DepthEnabled(waves);

        // waves_btn (components)
        const waves_btnButtonComponent = new ButtonComponent(waves_btn);
        waves_btnButtonComponent.handCursor = true;
        waves_btnButtonComponent.pixelPerfect = true;

        // cat (components)
        const catDepthEnabled = new DepthEnabled(cat);
        catDepthEnabled.automaticSort = false;
        catDepthEnabled.depth = 1080;

        // cat_btn (components)
        const cat_btnButtonComponent = new ButtonComponent(cat_btn);
        cat_btnButtonComponent.handCursor = true;
        cat_btnButtonComponent.pixelPerfect = true;

        // catalogue_btn (components)
        const catalogue_btnButtonComponent = new ButtonComponent(catalogue_btn);
        catalogue_btnButtonComponent.handCursor = true;
        catalogue_btnButtonComponent.pixelPerfect = true;

        this.fire = fire;
        this.binoculars = binoculars;
        this.binoculars_btn = binoculars_btn;
        this.surfshacksign = surfshacksign;
        this.block = block;
        this.waves_trigger = waves_trigger;
        this.waves = waves;
        this.waves_btn = waves_btn;
        this.cat = cat;
        this.cat_btn = cat_btn;
        this.catalogue = catalogue;
        this.catalogue_btn = catalogue_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public fire!: Phaser.GameObjects.Sprite;
    public binoculars!: Phaser.GameObjects.Image;
    public binoculars_btn!: Phaser.GameObjects.Image;
    public surfshacksign!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public waves_trigger!: Phaser.GameObjects.Image;
    public waves!: Phaser.GameObjects.Image;
    public waves_btn!: Phaser.GameObjects.Image;
    public cat!: Phaser.GameObjects.Image;
    public cat_btn!: Phaser.GameObjects.Image;
    public catalogue!: Phaser.GameObjects.Sprite;
    public catalogue_btn!: Phaser.GameObjects.Image;
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

        this.fire.play('cove-fire-animation');

        this.binoculars_btn.on('over', () => this.binoculars.setFrame('cove/binoculars0002'));
        this.binoculars_btn.on('out', () => this.binoculars.setFrame('cove/binoculars0001'));
        this.binoculars_btn.on('release', () => this.interface.loadContent(async () => (await import('@clubpenguin/world/content/binoculars/Binoculars')).default));

        this.cat_btn.on('over', () => this.cat.setFrame('cove/cat_btn0002'));
        this.cat_btn.on('out', () => this.cat.setFrame('cove/cat_btn0001'));

        this.waves_btn.on('over', () => {
            this.interface.showLocalizedHint(this.waves, 'waves_hint');
            this.waves.setFrame('cove/waves0002');
        });
        this.waves_btn.on('out', () => {
            this.interface.hideHint();
            this.waves.setFrame('cove/waves0001');
        });
        this.waves_btn.on('release', () => this.world.move(1383.75, 787.5));

        this.catalogue_btn.on('over', () => {
            this.catalogue.play('cove-catalogue-animation');
        });
        this.catalogue_btn.on('out', () => {
            this.catalogue.stop();
            this.catalogue.setFrame('cove/catalogue0001');
        });

        Trigger.getComponent(this.waves_trigger).execute = (engine, player) => {
            if (engine.player != player) return;
            this.interface.promptQuestion.showLocalized('waves_prompt', () => {
                this.world.startGame('waves', {});
            }, () => { });
        }

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.surfshacksign.setFrame(`cove/surfshacksign${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('cove-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
