
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/components/ButtonComponent";
import DepthEnabled from "../../../../lib/components/DepthEnabled";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Lake extends Phaser.Scene {

    constructor() {
        super("Lake");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("lake2013-pack", "assets/world/rooms/2013/lake/lake2013-pack.json");
    }

    editorCreate(): void {

        // lake_base
        const lake_base = this.add.image(-22.5, -22.5, "lake2013", "lake/base");
        lake_base.setOrigin(0, 0);

        // squiddoor
        const squiddoor = this.add.image(1486.69, 479.36, "lake2013", "lake/squiddoor");
        squiddoor.setOrigin(0, 0);

        // keyclue
        const keyclue = this.add.image(1508.18, 530.44, "lake2013", "lake/keyclue0001");
        keyclue.setOrigin(0, 0);

        // keycluebtn
        const keycluebtn = this.add.image(1508.18, 530.44, "lake2013", "lake/keyclue0004");
        keycluebtn.setOrigin(0, 0);
        keycluebtn.alpha = 0.0001;
        keycluebtn.alphaTopLeft = 0.0001;
        keycluebtn.alphaTopRight = 0.0001;
        keycluebtn.alphaBottomLeft = 0.0001;
        keycluebtn.alphaBottomRight = 0.0001;

        // lake_fall2_top10001
        const lake_fall2_top10001 = this.add.sprite(1172.25, 132.75, "lake2013", "lake/fall2_top10001");
        lake_fall2_top10001.setOrigin(0, 0);
        lake_fall2_top10001.play("lake2013-fall2_top1-animation");

        // lake_fall2_top20001
        const lake_fall2_top20001 = this.add.sprite(1239.75, 146.25, "lake2013", "lake/fall2_top20001");
        lake_fall2_top20001.setOrigin(0, 0);
        lake_fall2_top20001.play("lake2013-fall2_top2-animation");

        // lake_fall2_rolls0001
        const lake_fall2_rolls0001 = this.add.sprite(1138.5, 162, "lake2013", "lake/fall2_rolls0001");
        lake_fall2_rolls0001.setOrigin(0, 0);
        lake_fall2_rolls0001.play("lake2013-fall2_rolls-animation");

        // lake_fall2_foam0001
        const lake_fall2_foam0001 = this.add.sprite(1100.25, 434.25, "lake2013", "lake/fall2_foam0001");
        lake_fall2_foam0001.setOrigin(0, 0);
        lake_fall2_foam0001.play("lake2013-fall2_foam-animation");

        // lake_fall2_bottom10001
        const lake_fall2_bottom10001 = this.add.sprite(1165.5, 488.25, "lake2013", "lake/fall2_bottom10001");
        lake_fall2_bottom10001.setOrigin(0, 0);
        lake_fall2_bottom10001.play("lake2013-fall2_bottom1-animation");

        // lake_fall2_bottom20001
        const lake_fall2_bottom20001 = this.add.sprite(1212.75, 488.25, "lake2013", "lake/fall2_bottom20001");
        lake_fall2_bottom20001.setOrigin(0, 0);
        lake_fall2_bottom20001.play("lake2013-fall2_bottom2-animation");

        // lake_fall1_rolls0001
        const lake_fall1_rolls0001 = this.add.sprite(747, 155.25, "lake2013", "lake/fall1_rolls0001");
        lake_fall1_rolls0001.setOrigin(0, 0);
        lake_fall1_rolls0001.play("lake2013-fall1_rolls-animation");

        // lake_fall1_bottom10001
        const lake_fall1_bottom10001 = this.add.sprite(767.25, 483.75, "lake2013", "lake/fall1_bottom10001");
        lake_fall1_bottom10001.setOrigin(0, 0);
        lake_fall1_bottom10001.play("lake2013-fall1_bottom1-animation");

        // lake_fall1_bottom20001
        const lake_fall1_bottom20001 = this.add.sprite(798.75, 483.75, "lake2013", "lake/fall1_bottom20001");
        lake_fall1_bottom20001.setOrigin(0, 0);
        lake_fall1_bottom20001.play("lake2013-fall1_bottom2-animation");

        // lake_fall1_foam0001
        const lake_fall1_foam0001 = this.add.sprite(711, 427.5, "lake2013", "lake/fall1_foam0001");
        lake_fall1_foam0001.setOrigin(0, 0);
        lake_fall1_foam0001.play("lake2013-fall1_foam-animation");

        // lake_fall1_top20001
        const lake_fall1_top20001 = this.add.sprite(819, 123.75, "lake2013", "lake/fall1_top20001");
        lake_fall1_top20001.setOrigin(0, 0);
        lake_fall1_top20001.play("lake2013-fall1_top2-animation");

        // lake_fall1_top10001
        const lake_fall1_top10001 = this.add.sprite(762.75, 130.5, "lake2013", "lake/fall1_top10001");
        lake_fall1_top10001.setOrigin(0, 0);
        lake_fall1_top10001.play("lake2013-fall1_top1-animation");

        // lake_tide0
        const lake_tide0 = this.add.image(371.25, 618.75, "lake2013", "lake/tide0");
        lake_tide0.setOrigin(-0.3683689024390244, 1.3040845070422535);

        // lake_tide1
        const lake_tide1 = this.add.image(371.25, 641.25, "lake2013", "lake/tide1");
        lake_tide1.setOrigin(-0.17401997503121097, 1.1351685393258426);

        // lake_tide2
        const lake_tide2 = this.add.image(371.25, 686.25, "lake2013", "lake/tide2");
        lake_tide2.setOrigin(-0.05188953488372093, 1.0752884615384615);

        // lake_tide3
        const lake_tide3 = this.add.image(371.25, 708.75, "lake2013", "lake/tide3");
        lake_tide3.setOrigin(-0.09099903006789524, 1.097663551401869);

        // lake_tide4
        const lake_tide4 = this.add.image(371.25, 776.25, "lake2013", "lake/tide4");
        lake_tide4.setOrigin(-0.23274490785645005, 1.2257142857142855);

        // lake_tide5
        const lake_tide5 = this.add.image(371.25, 798.75, "lake2013", "lake/tide5");
        lake_tide5.setOrigin(-0.25884723523898784, 1.2522429906542056);

        // lake_tide6
        const lake_tide6 = this.add.image(371.25, 821.25, "lake2013", "lake/tide6");
        lake_tide6.setOrigin(-0.3034529582929195, 1.2384955752212388);

        // lake_tide7
        const lake_tide7 = this.add.image(371.25, 843.75, "lake2013", "lake/tide7");
        lake_tide7.setOrigin(-0.30112294288480157, 1.2394690265486725);

        // lake_tide8
        const lake_tide8 = this.add.image(371.25, 888.75, "lake2013", "lake/tide8");
        lake_tide8.setOrigin(-0.2158371040723982, 1.176050420168067);

        // lake_tide9
        const lake_tide9 = this.add.image(371.25, 753.75, "lake2013", "lake/tide9");
        lake_tide9.setOrigin(-0.1618086124401914, 1.1975);

        // lake_tide10
        const lake_tide10 = this.add.image(371.25, 911.25, "lake2013", "lake/tide10");
        lake_tide10.setOrigin(-0.18740053050397876, 1.176050420168067);

        // lake_tide11
        const lake_tide11 = this.add.image(371.25, 933.75, "lake2013", "lake/tide11");
        lake_tide11.setOrigin(-0.2206, 1.2608108108108107);

        // lake_tide12
        const lake_tide12 = this.add.image(371.25, 956.25, "lake2013", "lake/tide12");
        lake_tide12.setOrigin(-0.3309217046580773, 1.3079439252336447);

        // lake_tide13
        const lake_tide13 = this.add.image(371.25, 978.75, "lake2013", "lake/tide13");
        lake_tide13.setOrigin(-0.385562435500516, 1.3328571428571427);

        // lake_tide14
        const lake_tide14 = this.add.image(371.25, 1001.25, "lake2013", "lake/tide14");
        lake_tide14.setOrigin(-0.421215644820296, 1.4381443298969072);

        // lake_tide15
        const lake_tide15 = this.add.image(371.25, 1046.25, "lake2013", "lake/tide15");
        lake_tide15.setOrigin(-1.1844408427876822, 2.507142857142857);

        // lake_tide16
        const lake_tide16 = this.add.image(371.25, 596.25, "lake2013", "lake/tide16");
        lake_tide16.setOrigin(-1.8387222222222224, 2.045);

        // lake_tide17
        const lake_tide17 = this.add.image(371.25, 663.75, "lake2013", "lake/tide17");
        lake_tide17.setOrigin(-0.05659420289855072, 1.0473999999999999);

        // lake_tide18
        const lake_tide18 = this.add.image(371.25, 731.25, "lake2013", "lake/tide18");
        lake_tide18.setOrigin(-0.120489443378119, 1.1399056603773585);

        // lake_tide19
        const lake_tide19 = this.add.image(371.25, 866.25, "lake2013", "lake/tide19");
        lake_tide19.setOrigin(-0.28087702573879886, 1.2285964912280702);

        // lake_tide20
        const lake_tide20 = this.add.image(371.25, 1023.75, "lake2013", "lake/tide20");
        lake_tide20.setOrigin(-0.564199535962877, 1.8428947368421054);

        // lake_basetop
        const lake_basetop = this.add.image(-22.5, -22.5, "lake2013", "lake/basetop");
        lake_basetop.setOrigin(0, 0);

        // lake_barrel
        const lake_barrel = this.add.image(324.34, 326.59, "lake2013", "lake/barrel");
        lake_barrel.setOrigin(0.5008, 0.8711570247933884);

        // lake_gold1
        const lake_gold1 = this.add.image(368.44, 340.43, "lake2013", "lake/gold1");
        lake_gold1.setOrigin(0.496453488372093, 0.22342857142857145);

        // lake_rock1
        const lake_rock1 = this.add.image(688.39, 346.05, "lake2013", "lake/rock1");
        lake_rock1.setOrigin(0.556930693069307, 0.5192307692307693);

        // lake_rock2
        const lake_rock2 = this.add.image(649.57, 479.25, "lake2013", "lake/rock2");
        lake_rock2.setOrigin(0.4899193548387097, 0.9264705882352942);

        // lake_gold2
        const lake_gold2 = this.add.image(591.86, 505.24, "lake2013", "lake/gold2");
        lake_gold2.setOrigin(0.5011483253588517, 0.3346086956521739);

        // lake_rock3
        const lake_rock3 = this.add.image(259.76, 371.03, "lake2013", "lake/rock3");
        lake_rock3.setOrigin(0.5056179775280899, 0.8571428571428571);

        // lake_rock4
        const lake_rock4 = this.add.image(371.14, 393.64, "lake2013", "lake/rock4");
        lake_rock4.setOrigin(0.5123762376237624, 0.3673469387755102);

        // lake_rock5
        const lake_rock5 = this.add.image(53.55, 641.81, "lake2013", "lake/rock5");
        lake_rock5.setOrigin(0.5585106382978723, 0.8416030534351145);

        // lake_gold3
        const lake_gold3 = this.add.image(99.79, 679.05, "lake2013", "lake/gold3");
        lake_gold3.setOrigin(0.4983798882681564, 0.1610091743119266);

        // lake_rock6
        const lake_rock6 = this.add.image(71.44, 742.05, "lake2013", "lake/rock6");
        lake_rock6.setOrigin(0.5466101694915254, 0.7071428571428572);

        // lake_aquaback
        const lake_aquaback = this.add.image(249.3, 827.1, "lake2013", "lake/aquaback");
        lake_aquaback.setOrigin(0.5021739130434782, 0.5016891891891891);

        // lake_aquafront
        const lake_aquafront = this.add.image(199.58, 943.88, "lake2013", "lake/aquafront");
        lake_aquafront.setOrigin(0.4401098901098901, 0.7526978417266187);

        // lake_fg
        const lake_fg = this.add.image(-22.5, -22.5, "lake2013", "lake/fg");
        lake_fg.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "lake2013", "lake/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // lake_forest_trigger
        const lake_forest_trigger = this.add.image(457.88, 177.75, "lake2013", "lake/forest_trigger");
        lake_forest_trigger.visible = false;

        // underwater_trigger
        const underwater_trigger = this.add.image(1575, 680.63, "lake2013", "lake/underwater_trigger");
        underwater_trigger.visible = false;

        // lake_cavemine_trigger
        const lake_cavemine_trigger = this.add.image(100.46, 483.3, "lake2013", "lake/cavemine_trigger");
        lake_cavemine_trigger.visible = false;

        // pizza2btn
        const pizza2btn = this.add.image(1588.39, 619.43, "lake2013", "lake/pizza2btn0004");
        pizza2btn.visible = false;
        pizza2btn.alpha = 0.0001;
        pizza2btn.alphaTopLeft = 0.0001;
        pizza2btn.alphaTopRight = 0.0001;
        pizza2btn.alphaBottomLeft = 0.0001;
        pizza2btn.alphaBottomRight = 0.0001;

        // pizzabtn
        const pizzabtn = this.add.image(1596.94, 608.4, "lake2013", "lake/pizzabtn0004");
        pizzabtn.alpha = 0.0001;
        pizzabtn.alphaTopLeft = 0.0001;
        pizzabtn.alphaTopRight = 0.0001;
        pizzabtn.alphaBottomLeft = 0.0001;
        pizzabtn.alphaBottomRight = 0.0001;

        // lists
        const triggers = [lake_forest_trigger, lake_cavemine_trigger, underwater_trigger];

        // keycluebtn (components)
        const keycluebtnButtonComponent = new ButtonComponent(keycluebtn);
        keycluebtnButtonComponent.handCursor = true;
        keycluebtnButtonComponent.pixelPerfect = true;

        // lake_tide0 (components)
        new DepthEnabled(lake_tide0);

        // lake_tide1 (components)
        new DepthEnabled(lake_tide1);

        // lake_tide2 (components)
        new DepthEnabled(lake_tide2);

        // lake_tide3 (components)
        new DepthEnabled(lake_tide3);

        // lake_tide4 (components)
        new DepthEnabled(lake_tide4);

        // lake_tide5 (components)
        new DepthEnabled(lake_tide5);

        // lake_tide6 (components)
        new DepthEnabled(lake_tide6);

        // lake_tide7 (components)
        new DepthEnabled(lake_tide7);

        // lake_tide8 (components)
        new DepthEnabled(lake_tide8);

        // lake_tide9 (components)
        new DepthEnabled(lake_tide9);

        // lake_tide10 (components)
        new DepthEnabled(lake_tide10);

        // lake_tide11 (components)
        new DepthEnabled(lake_tide11);

        // lake_tide12 (components)
        new DepthEnabled(lake_tide12);

        // lake_tide13 (components)
        new DepthEnabled(lake_tide13);

        // lake_tide14 (components)
        new DepthEnabled(lake_tide14);

        // lake_tide15 (components)
        new DepthEnabled(lake_tide15);

        // lake_tide16 (components)
        new DepthEnabled(lake_tide16);

        // lake_tide17 (components)
        new DepthEnabled(lake_tide17);

        // lake_tide18 (components)
        new DepthEnabled(lake_tide18);

        // lake_tide19 (components)
        new DepthEnabled(lake_tide19);

        // lake_tide20 (components)
        new DepthEnabled(lake_tide20);

        // lake_barrel (components)
        new DepthEnabled(lake_barrel);

        // lake_gold1 (components)
        new DepthEnabled(lake_gold1);

        // lake_rock1 (components)
        new DepthEnabled(lake_rock1);

        // lake_rock2 (components)
        new DepthEnabled(lake_rock2);

        // lake_gold2 (components)
        new DepthEnabled(lake_gold2);

        // lake_rock3 (components)
        new DepthEnabled(lake_rock3);

        // lake_rock4 (components)
        new DepthEnabled(lake_rock4);

        // lake_rock5 (components)
        new DepthEnabled(lake_rock5);

        // lake_gold3 (components)
        new DepthEnabled(lake_gold3);

        // lake_rock6 (components)
        new DepthEnabled(lake_rock6);

        // lake_aquaback (components)
        new DepthEnabled(lake_aquaback);

        // lake_aquafront (components)
        new DepthEnabled(lake_aquafront);

        // lake_fg (components)
        const lake_fgDepthEnabled = new DepthEnabled(lake_fg);
        lake_fgDepthEnabled.automaticSort = false;
        lake_fgDepthEnabled.depth = 1080;

        // lake_forest_trigger (components)
        const lake_forest_triggerRoomTrigger = new RoomTrigger(lake_forest_trigger);
        lake_forest_triggerRoomTrigger.destination = 809;
        lake_forest_triggerRoomTrigger.playerX = 528.75;
        lake_forest_triggerRoomTrigger.playerY = 776.25;

        // underwater_trigger (components)
        const underwater_triggerRoomTrigger = new RoomTrigger(underwater_trigger);
        underwater_triggerRoomTrigger.destination = 815;
        underwater_triggerRoomTrigger.playerX = 607.5;
        underwater_triggerRoomTrigger.playerY = 533.25;

        // lake_cavemine_trigger (components)
        const lake_cavemine_triggerRoomTrigger = new RoomTrigger(lake_cavemine_trigger);
        lake_cavemine_triggerRoomTrigger.destination = 813;
        lake_cavemine_triggerRoomTrigger.playerX = 1482.75;
        lake_cavemine_triggerRoomTrigger.playerY = 630;

        // pizza2btn (components)
        const pizza2btnButtonComponent = new ButtonComponent(pizza2btn);
        pizza2btnButtonComponent.handCursor = true;
        pizza2btnButtonComponent.pixelPerfect = true;

        // pizzabtn (components)
        const pizzabtnButtonComponent = new ButtonComponent(pizzabtn);
        pizzabtnButtonComponent.handCursor = true;
        pizzabtnButtonComponent.pixelPerfect = true;

        this.squiddoor = squiddoor;
        this.keyclue = keyclue;
        this.keycluebtn = keycluebtn;
        this.block = block;
        this.underwater_trigger = underwater_trigger;
        this.pizza2btn = pizza2btn;
        this.pizzabtn = pizzabtn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public squiddoor!: Phaser.GameObjects.Image;
    public keyclue!: Phaser.GameObjects.Image;
    public keycluebtn!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public underwater_trigger!: Phaser.GameObjects.Image;
    public pizza2btn!: Phaser.GameObjects.Image;
    public pizzabtn!: Phaser.GameObjects.Image;
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

    public MOSS_KEY_ID = 7016;
    public unlocked: boolean;

    create(data: any) {

        this.editorCreate();

        this.unlocked = this.MOSS_KEY_ID in this.world.inventory;

        this.keyclue.visible = !this.unlocked;
        this.keycluebtn.visible = !this.unlocked;
        this.pizzabtn.visible = !this.unlocked;
        this.pizza2btn.visible = this.unlocked;
        if (!this.unlocked) RoomTrigger.getComponent(this.underwater_trigger).execute = () => false;

        this.keycluebtn.on('out', () => this.keyclue.setFrame('lake/keyclue0001'));
        this.keycluebtn.on('over', () => this.keyclue.setFrame('lake/keyclue0002'));
        this.keycluebtn.on('release', () => {
            // TODO: Show moss key clue
        });

        this.pizzabtn.on('release', () => this.tryOpeningDoor());
        this.pizza2btn.on('release', () => {
            this.openDoor();
            this.world.move(1575, 708.75);
        });

        if (data.onready) data.onready(this);
    }

    tryOpeningDoor(): void {
        this.tweens.addMultiple([
            {
                targets: this.squiddoor,
                y: { from: 479.36, to: 470.36 },
                duration: 166.666667,
                hold: 41.6666667,
                yoyo: true,
                onStart: () => {
                    this.pizzabtn.visible = false;
                },
                onComplete: () => {
                    this.pizzabtn.visible = true;
                }
            },
            {
                targets: [this.keyclue, this.keycluebtn],
                y: { from: 530.44, to: 521.44 },
                duration: 166.666667,
                hold: 41.6666667,
                yoyo: true
            }
        ]);
    }

    openDoor(): void {
        this.tweens.add({
            targets: this.squiddoor,
            x: { from: 1486.69, to: 1495.91 },
            y: { from: 479.36, to: 348.64 },
            duration: 666.666667,
            onStart: () => {
                this.pizza2btn.visible = false;
                this.sound.play('lake2013-dooropen');
            }
        });
    }

    unload(engine: Engine): void {
        engine.app.unloadAssetPack('lake2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
