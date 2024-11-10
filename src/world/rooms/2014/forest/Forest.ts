
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

export default class Forest extends Phaser.Scene implements Room {

    constructor() {
        super("Forest");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("forest2014-pack", "assets/world/rooms/2014/forest/forest2014-pack.json");
    }

    editorCreate(): void {

        // forest_sky
        const forest_sky = this.add.image(-130.6125, -44.8875, "forest2014", "forest/sky");
        forest_sky.setOrigin(0, 0);

        // forest_base
        const forest_base = this.add.image(-153, -53.325, "forest2014", "forest/base");
        forest_base.setOrigin(0, 0);

        // forest_bush
        const forest_bush = this.add.image(426.825, 298.35, "forest2014", "forest/bush");
        forest_bush.setOrigin(0.8333333333333334, 0.5720338983050848);

        // forest_bush1
        const forest_bush1 = this.add.image(443.25, 320.175, "forest2014", "forest/bush1");
        forest_bush1.setOrigin(0, 0.6477272727272727);

        // forest_tree1
        const forest_tree1 = this.add.image(397.0125, 337.1625, "forest2014", "forest/tree1");
        forest_tree1.setOrigin(0.37375415, 0.93766265);

        // forest_bush2
        const forest_bush2 = this.add.image(429.1875, 354.4875, "forest2014", "forest/bush2");
        forest_bush2.setOrigin(0, 0.631578947368421);

        // forest_trunk1
        const forest_trunk1 = this.add.image(443.1375, 374.5125, "forest2014", "forest/trunk1");
        forest_trunk1.setOrigin(0, 0.5526315789473685);

        // forest_shadow2
        const forest_shadow2 = this.add.image(1221.75, 347.7375, "forest2014", "forest/shadow2");
        forest_shadow2.setOrigin(0.5, 0.85666667);

        // forest_shadow1
        const forest_shadow1 = this.add.image(1221.75, 352.0125, "forest2014", "forest/shadow1");
        forest_shadow1.setOrigin(0.5, 0.86273381);

        // forest_shadow
        const forest_shadow = this.add.image(1221.75, 355.5, "forest2014", "forest/shadow");
        forest_shadow.setOrigin(0.5, 0.85034483);

        // waterfallparticles
        const waterfallparticles = this.add.sprite(884.25, 177.6375, "forest2014", "forest/waterfallparticles0001");
        waterfallparticles.setOrigin(0, 0);
        waterfallparticles.play("forest2014-waterfallparticles-animation");

        // waterfallmidrolls
        const waterfallmidrolls = this.add.sprite(890, 223, "forest2014", "forest/waterfallmidrolls0001");
        waterfallmidrolls.setOrigin(0, 0);
        waterfallmidrolls.play("forest2014-waterfallmidrolls-animation");

        // waterfallfoam
        const waterfallfoam = this.add.sprite(875, 313, "forest2014", "forest/waterfallfoam0001");
        waterfallfoam.setOrigin(0, 0);
        waterfallfoam.play("forest2014-waterfallfoam-animation");

        // waterfallrolls
        const waterfallrolls = this.add.sprite(881.4, 177.725, "forest2014", "forest/waterfallrolls0001");
        waterfallrolls.setOrigin(0, 0);
        waterfallrolls.play("forest2014-waterfallrolls-animation");

        // forest_waterfallside
        const forest_waterfallside = this.add.image(497.025, 50.175, "forest2014", "forest/waterfallside");
        forest_waterfallside.setOrigin(0, 0);

        // forest_tree
        const forest_tree = this.add.image(881.1, 369.45, "forest2014", "forest/tree");
        forest_tree.setOrigin(0.91836735, 1.09375);

        // forest_rock
        const forest_rock = this.add.image(930.825, 371.25, "forest2014", "forest/rock");
        forest_rock.setOrigin(0.9375, 0.5547945205479452);

        // forest_cave
        const forest_cave = this.add.image(1173.6, 357.6375, "forest2014", "forest/cave");
        forest_cave.setOrigin(0.3515625, 0.84965035);

        // forest_rock1
        const forest_rock1 = this.add.image(1296.3375, 384.6375, "forest2014", "forest/rock1");
        forest_rock1.setOrigin(0, 0.3125);

        // forest_trunk
        const forest_trunk = this.add.image(1018.35, 403.425, "forest2014", "forest/trunk");
        forest_trunk.setOrigin(0.97826087, 0.43994413);

        // forest_isleright
        const forest_isleright = this.add.image(1312.425, 605.1375, "forest2014", "forest/isleright");
        forest_isleright.setOrigin(0.99753695, 0.48387097);

        // forest_tree2
        const forest_tree2 = this.add.image(891.225, 644.85, "forest2014", "forest/tree2");
        forest_tree2.setOrigin(0.7978723404255319, 0.759375);

        // forest_isleleft
        const forest_isleleft = this.add.image(450.5625, 680.2875, "forest2014", "forest/isleleft");
        forest_isleleft.setOrigin(0, 0.6234939759036144);

        // forest_bush4
        const forest_bush4 = this.add.image(1505.7, 781.875, "forest2014", "forest/bush4");
        forest_bush4.setOrigin(0, 0.46621622);

        // forest_arrow
        const forest_arrow = this.add.image(1544.625, 799.9875, "forest2014", "forest/arrow");
        forest_arrow.setOrigin(0, 0.77083333);

        // forest_stairs
        const forest_stairs = this.add.image(1525.05, 852.3, "forest2014", "forest/stairs");
        forest_stairs.setOrigin(0.4090909090909091, 0.35611510791366907);

        // forest_rock2
        const forest_rock2 = this.add.image(688.275, 910.8, "forest2014", "forest/rock2");
        forest_rock2.setOrigin(0, 0.32142857);

        // forest_bush3
        const forest_bush3 = this.add.image(1599.1875, 511.08750000000003, "forest2014", "forest/bush3");
        forest_bush3.setOrigin(0, 0.6107142857142858);

        // forest_tree3
        const forest_tree3 = this.add.image(1669.95, 557.1, "forest2014", "forest/tree3");
        forest_tree3.setOrigin(0.35856574, 0.9202544);

        // forest_tree4
        const forest_tree4 = this.add.image(1524.4875, 519.6375, "forest2014", "forest/tree4");
        forest_tree4.setOrigin(0, 0.62824675);

        // forest_rock3
        const forest_rock3 = this.add.image(1632.4875, 561.7125, "forest2014", "forest/rock3");
        forest_rock3.setOrigin(0.18, 0.34615385);

        // forest_tree5
        const forest_tree5 = this.add.image(1703.025, 597.7125, "forest2014", "forest/tree5");
        forest_tree5.setOrigin(0, 0.71808511);

        // forest_bush5
        const forest_bush5 = this.add.image(311.9625, 668.925, "forest2014", "forest/bush5");
        forest_bush5.setOrigin(0.86909871, 0.60483871);

        // forest_bush6
        const forest_bush6 = this.add.image(274.3875, 682.5375, "forest2014", "forest/bush6");
        forest_bush6.setOrigin(0.78671329, 0.38942308);

        // forest_bush7
        const forest_bush7 = this.add.image(37.6875, 560.5875, "forest2014", "forest/bush7");
        forest_bush7.setOrigin(1.02791878, 0.71052632);

        // forest_tree6
        const forest_tree6 = this.add.image(17.325, 656.8875, "forest2014", "forest/tree6");
        forest_tree6.setOrigin(0.9, 0.75663717);

        // forest_bush8
        const forest_bush8 = this.add.image(70.9875, 715.8375, "forest2014", "forest/bush8");
        forest_bush8.setOrigin(1.0546875, 0.64285714);

        // forest_bush9
        const forest_bush9 = this.add.image(56.7, 773.1, "forest2014", "forest/bush9");
        forest_bush9.setOrigin(0.9166666666666666, 0.6262886597938144);

        // bigrock
        const bigrock = this.add.image(177.075, 788.9625, "forest2014", "forest/bigrock");

        // forest_foreground
        const forest_foreground = this.add.image(-153.45, 426.6, "forest2014", "forest/foreground");
        forest_foreground.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "forest2014", "forest/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // trash1_btn
        const trash1_btn = this.add.image(177.075, 788.9625, "forest2014", "forest/trash1_btn0004");
        trash1_btn.alpha = 0.0001;
        trash1_btn.alphaTopLeft = 0.0001;
        trash1_btn.alphaTopRight = 0.0001;
        trash1_btn.alphaBottomLeft = 0.0001;
        trash1_btn.alphaBottomRight = 0.0001;

        // trash2_btn
        const trash2_btn = this.add.image(-23.7375, 760.5, "forest2014", "forest/trash2_btn0004");
        trash2_btn.visible = false;
        trash2_btn.alpha = 0.0001;
        trash2_btn.alphaTopLeft = 0.0001;
        trash2_btn.alphaTopRight = 0.0001;
        trash2_btn.alphaBottomLeft = 0.0001;
        trash2_btn.alphaBottomRight = 0.0001;

        // forest_plaza_mc
        const forest_plaza_mc = this.add.image(-3.2625, 288.1125, "forest2014", "forest/plaza_mc");
        forest_plaza_mc.setOrigin(0, 0);
        forest_plaza_mc.visible = false;

        // forest_cove_mc
        const forest_cove_mc = this.add.image(1539.1125, 995.625, "forest2014", "forest/cove_mc");
        forest_cove_mc.visible = false;

        // forest_shack_mc
        const forest_shack_mc = this.add.image(1602.3375, 303.8625, "forest2014", "forest/shack_mc");
        forest_shack_mc.setOrigin(1, 0);
        forest_shack_mc.visible = false;

        // forest_what_mc
        const forest_what_mc = this.add.image(114.975, 762.3, "forest2014", "forest/what_mc");
        forest_what_mc.setOrigin(0, 0);
        forest_what_mc.visible = false;

        // lists
        const triggers = [forest_what_mc, forest_shack_mc, forest_cove_mc, forest_plaza_mc];

        // forest_bush (components)
        new DepthEnabled(forest_bush);

        // forest_bush1 (components)
        new DepthEnabled(forest_bush1);

        // forest_tree1 (components)
        new DepthEnabled(forest_tree1);

        // forest_bush2 (components)
        new DepthEnabled(forest_bush2);

        // forest_trunk1 (components)
        new DepthEnabled(forest_trunk1);

        // forest_shadow2 (components)
        new DepthEnabled(forest_shadow2);

        // forest_shadow1 (components)
        new DepthEnabled(forest_shadow1);

        // forest_shadow (components)
        new DepthEnabled(forest_shadow);

        // forest_tree (components)
        new DepthEnabled(forest_tree);

        // forest_rock (components)
        new DepthEnabled(forest_rock);

        // forest_cave (components)
        new DepthEnabled(forest_cave);

        // forest_rock1 (components)
        new DepthEnabled(forest_rock1);

        // forest_trunk (components)
        new DepthEnabled(forest_trunk);

        // forest_isleright (components)
        new DepthEnabled(forest_isleright);

        // forest_tree2 (components)
        new DepthEnabled(forest_tree2);

        // forest_isleleft (components)
        new DepthEnabled(forest_isleleft);

        // forest_bush4 (components)
        new DepthEnabled(forest_bush4);

        // forest_arrow (components)
        new DepthEnabled(forest_arrow);

        // forest_stairs (components)
        new DepthEnabled(forest_stairs);

        // forest_rock2 (components)
        new DepthEnabled(forest_rock2);

        // forest_bush3 (components)
        new DepthEnabled(forest_bush3);

        // forest_tree3 (components)
        new DepthEnabled(forest_tree3);

        // forest_tree4 (components)
        new DepthEnabled(forest_tree4);

        // forest_rock3 (components)
        new DepthEnabled(forest_rock3);

        // forest_tree5 (components)
        new DepthEnabled(forest_tree5);

        // forest_bush5 (components)
        new DepthEnabled(forest_bush5);

        // forest_bush6 (components)
        new DepthEnabled(forest_bush6);

        // forest_bush7 (components)
        new DepthEnabled(forest_bush7);

        // forest_bush9 (components)
        new DepthEnabled(forest_bush9);

        // bigrock (components)
        const bigrockDepthEnabled = new DepthEnabled(bigrock);
        bigrockDepthEnabled.automaticSort = false;
        bigrockDepthEnabled.depth = 825.8625;

        // forest_foreground (components)
        const forest_foregroundDepthEnabled = new DepthEnabled(forest_foreground);
        forest_foregroundDepthEnabled.automaticSort = false;
        forest_foregroundDepthEnabled.depth = 1080;

        // trash1_btn (components)
        const trash1_btnButtonComponent = new ButtonComponent(trash1_btn);
        trash1_btnButtonComponent.pixelPerfect = true;

        // trash2_btn (components)
        const trash2_btnButtonComponent = new ButtonComponent(trash2_btn);
        trash2_btnButtonComponent.pixelPerfect = true;

        // forest_plaza_mc (components)
        const forest_plaza_mcRoomTrigger = new RoomTrigger(forest_plaza_mc);
        forest_plaza_mcRoomTrigger.destination = 300;
        forest_plaza_mcRoomTrigger.playerX = 1395;
        forest_plaza_mcRoomTrigger.playerY = 742.5;

        // forest_cove_mc (components)
        const forest_cove_mcRoomTrigger = new RoomTrigger(forest_cove_mc);
        forest_cove_mcRoomTrigger.destination = 810;
        forest_cove_mcRoomTrigger.playerX = 585;
        forest_cove_mcRoomTrigger.playerY = 468;

        // forest_shack_mc (components)
        const forest_shack_mcRoomTrigger = new RoomTrigger(forest_shack_mc);
        forest_shack_mcRoomTrigger.destination = 807;
        forest_shack_mcRoomTrigger.playerX = 450;
        forest_shack_mcRoomTrigger.playerY = 742.5;

        // forest_what_mc (components)
        const forest_what_mcRoomTrigger = new RoomTrigger(forest_what_mc);
        forest_what_mcRoomTrigger.destination = 814;
        forest_what_mcRoomTrigger.playerX = 495;
        forest_what_mcRoomTrigger.playerY = 360;

        this.waterfallparticles = waterfallparticles;
        this.waterfallmidrolls = waterfallmidrolls;
        this.waterfallfoam = waterfallfoam;
        this.waterfallrolls = waterfallrolls;
        this.bigrock = bigrock;
        this.block = block;
        this.trash1_btn = trash1_btn;
        this.trash2_btn = trash2_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public waterfallparticles!: Phaser.GameObjects.Sprite;
    public waterfallmidrolls!: Phaser.GameObjects.Sprite;
    public waterfallfoam!: Phaser.GameObjects.Sprite;
    public waterfallrolls!: Phaser.GameObjects.Sprite;
    public bigrock!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public trash1_btn!: Phaser.GameObjects.Image;
    public trash2_btn!: Phaser.GameObjects.Image;
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

        this.trash1_btn.on('over', () => {
            this.trash1_btn.visible = false;
            this.tweens.add({
                targets: this.bigrock,
                x: { from: 177.075, to: 9.5625 },
                angle: { from: 0, to: -120 },
                duration: 583.33,
                onComplete: () => this.trash2_btn.visible = true
            });
            this.sound.play('forest2014-rockrollout');
        });
        this.trash2_btn.on('over', () => {
            this.trash2_btn.visible = false;
            this.tweens.add({
                targets: this.bigrock,
                x: { from: 9.5625, to: 177.075 },
                angle: { from: -120, to: 0 },
                duration: 583.33,
                onComplete: () => this.trash1_btn.visible = true
            });
            this.sound.play('forest2014-rockrollin');
        });

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {

    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('forest2014-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
