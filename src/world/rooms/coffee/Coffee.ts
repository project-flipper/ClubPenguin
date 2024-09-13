
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import DepthEnabled from "../../../lib/ui/components/DepthEnabled";
import Trigger from "../../../lib/ui/components/Trigger";
import RoomTrigger from "../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "../../../app/app";
import { Engine,  Room } from "../../engine/engine";
import Interface from "../../interface/Interface";
import { Locale } from "../../../app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Coffee extends Phaser.Scene implements Room {

    constructor() {
        super("Coffee");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("coffee-pack", "assets/world/rooms/coffee/coffee-pack.json");
    }

    editorCreate(): void {

        // coffee_base
        const coffee_base = this.add.image(-157.5, -37.9125, "coffee", "coffee/base");
        coffee_base.setOrigin(0, 0);

        // coffee_upstairs
        const coffee_upstairs = this.add.image(1346.625, 154.2375, "coffee", "coffee/upstairs");
        coffee_upstairs.setOrigin(0, 0);

        // sign
        const sign = this.add.image(1388.3625, 179.4375, "coffee", "coffee/sign0001");
        sign.setOrigin(0, 0);

        // coffee_stairslight
        const coffee_stairslight = this.add.image(1461.4875, 48.0375, "coffee", "coffee/stairslight");
        coffee_stairslight.setOrigin(0.0689916, 0);

        // stairslight
        const stairslight = this.add.image(1376.5, 298.5, "coffee", "coffee/stairs-btn0002");
        stairslight.setOrigin(0, 0.14854);
        stairslight.visible = false;

        // stairs_btn
        const stairs_btn = this.add.image(1374.75, 242.4375, "coffee", "coffee/stairs-btn0004");
        stairs_btn.setOrigin(0, 0);
        stairs_btn.alpha = 0.01;
        stairs_btn.alphaTopLeft = 0.01;
        stairs_btn.alphaTopRight = 0.01;
        stairs_btn.alphaBottomLeft = 0.01;
        stairs_btn.alphaBottomRight = 0.01;

        // coffee_paintings
        const coffee_paintings = this.add.image(95.9625, 57.375, "coffee", "coffee/paintings");
        coffee_paintings.setOrigin(0, 0);

        // coffee_window
        const coffee_window = this.add.image(329.625, 52.987500000000004, "coffee", "coffee/window");
        coffee_window.setOrigin(0, 0);

        // door
        const door = this.add.image(715.95, 113.625, "coffee", "coffee/door0001");
        door.setOrigin(0, 0);

        // coffee_ceiling
        const coffee_ceiling = this.add.image(872.325, -31.3875, "coffee", "coffee/ceiling");
        coffee_ceiling.setOrigin(-0.00178, 0.05478);

        // coffee_ceilinglamp1
        const coffee_ceilinglamp1 = this.add.image(921.7125, 23.175, "coffee", "coffee/ceilinglamp1");
        coffee_ceilinglamp1.setOrigin(0, 0);

        // coffee_ceilinglamp2
        const coffee_ceilinglamp2 = this.add.image(942.4125, -3.0375, "coffee", "coffee/ceilinglamp2");
        coffee_ceilinglamp2.setOrigin(0, 0);

        // coffee_ceilinglamp3
        const coffee_ceilinglamp3 = this.add.image(966.825, -33.8625, "coffee", "coffee/ceilinglamp3");
        coffee_ceilinglamp3.setOrigin(0, 0);

        // coffee_countertable
        const coffee_countertable = this.add.image(1073.3625, 312.975, "coffee", "coffee/countertable");
        coffee_countertable.setOrigin(0.05315018, 0.04109635);

        // coffee_countertrash
        const coffee_countertrash = this.add.image(963, 294, "coffee", "coffee/countertrash");
        coffee_countertrash.setOrigin(0, 0);

        // coffee_counter
        const coffee_counter = this.add.image(882.9, 413.1, "coffee", "coffee/counter");
        coffee_counter.setOrigin(0, 0.4356779661016949);

        // coffee_machine1
        const coffee_machine1 = this.add.image(1056.375, 197.2125, "coffee", "coffee/machine1");
        coffee_machine1.setOrigin(0, 0);

        // coffee_machine2
        const coffee_machine2 = this.add.image(1112.175, 190.0125, "coffee", "coffee/machine2");
        coffee_machine2.setOrigin(0, 0);

        // coffee_dispenser1
        const coffee_dispenser1 = this.add.image(1177.0875, 302.9625, "coffee", "coffee/dispenser1");
        coffee_dispenser1.setOrigin(0, 0);

        // coffee_dispenser2
        const coffee_dispenser2 = this.add.image(1204.3125, 332.6625, "coffee", "coffee/dispenser2");
        coffee_dispenser2.setOrigin(0, 0);

        // coffee_dispenser3
        const coffee_dispenser3 = this.add.image(1234.9125, 362.25, "coffee", "coffee/dispenser3");
        coffee_dispenser3.setOrigin(0, 0);

        // coffee_lamp
        const coffee_lamp = this.add.image(535.8375, -1.0125, "coffee", "coffee/lamp");
        coffee_lamp.setOrigin(0, 0);

        // coffee_lamp_1
        const coffee_lamp_1 = this.add.image(375.75, -0.7875, "coffee", "coffee/lamp");
        coffee_lamp_1.setOrigin(0, 0);

        // coffee_plant
        const coffee_plant = this.add.image(278.1, 150.75, "coffee", "coffee/plant");
        coffee_plant.setOrigin(0, 0);

        // coffee_frontcouch
        const coffee_frontcouch = this.add.image(360.45, 225.45000000000002, "coffee", "coffee/frontcouch");
        coffee_frontcouch.setOrigin(0, 0);

        // coffee_sidecouch
        const coffee_sidecouch = this.add.image(286.2, 327.4875, "coffee", "coffee/sidecouch");
        coffee_sidecouch.setOrigin(0.71300469, 0.24167464);

        // coffee_sidecouchrest
        const coffee_sidecouchrest = this.add.image(189.45, 444.6, "coffee", "coffee/sidecouchrest");
        coffee_sidecouchrest.setOrigin(0, 0.55359375);

        // coffee_smallcouch
        const coffee_smallcouch = this.add.image(209.1375, 491.9625, "coffee", "coffee/smallcouch");
        coffee_smallcouch.setOrigin(0, 0.24691056910569106);

        // coffee_rug
        const coffee_rug = this.add.image(383.7375, 388.575, "coffee", "coffee/rug");
        coffee_rug.setOrigin(0, 0);

        // coffee_table
        const coffee_table = this.add.image(419.85, 444.6, "coffee", "coffee/table");
        coffee_table.setOrigin(0, 0.516530612244898);

        // coffee_railing
        const coffee_railing = this.add.image(200.8125, 569.475, "coffee", "coffee/railing");
        coffee_railing.setOrigin(0.07281378, 0.36818182);

        // coffee_carpet
        const coffee_carpet = this.add.image(518.0625, 699.975, "coffee", "coffee/carpet");
        coffee_carpet.setOrigin(0, 0);

        // register
        const register = this.add.sprite(954.5625, 498.825, "coffee", "coffee/register0001");
        register.setOrigin(-0.06234, 0.6347);

        // coffee_downtable
        const coffee_downtable = this.add.image(933.4125, 861.6375, "coffee", "coffee/downtable");
        coffee_downtable.setOrigin(0, 0.60641);

        // coffee_beanbag
        const coffee_beanbag = this.add.image(1352.1375, 781.3125, "coffee", "coffee/beanbag");
        coffee_beanbag.setOrigin(0.43916, 0.24105);

        // coffee_couchcushion
        const coffee_couchcushion = this.add.image(1132.2, 741.4875, "coffee", "coffee/couchcushion");
        coffee_couchcushion.setOrigin(0.00056, 0.04003);

        // coffee_couchback
        const coffee_couchback = this.add.image(1357.875, 776.025, "coffee", "coffee/couchback");
        coffee_couchback.setOrigin(0.50768, 0.23824);

        // coffee_singlecouchcushion
        const coffee_singlecouchcushion = this.add.image(717.975, 773.8875, "coffee", "coffee/singlecouchcushion");
        coffee_singlecouchcushion.setOrigin(0, -0.25869);

        // coffee_singlecouchback
        const coffee_singlecouchback = this.add.image(705.0375, 774.7875, "coffee", "coffee/singlecouchback");
        coffee_singlecouchback.setOrigin(0, 0.22424);

        // coffee_singlecouchrest
        const coffee_singlecouchrest = this.add.image(720.5625, 853.5375, "coffee", "coffee/singlecouchrest");
        coffee_singlecouchrest.setOrigin(0, 0.26645);

        // coffee_smoothiebg
        const coffee_smoothiebg = this.add.image(55.4625, 611.1, "coffee", "coffee/smoothiebg");
        coffee_smoothiebg.setOrigin(0.33887, 0.33389);

        // coffee_smoothietable
        const coffee_smoothietable = this.add.image(56.8125, 765.45, "coffee", "coffee/smoothietable");
        coffee_smoothietable.setOrigin(0.22907, 0.18971);

        // smoothieregister
        const smoothieregister = this.add.sprite(256.1625, 769.95, "coffee", "coffee/smoothieregister0001");
        smoothieregister.setOrigin(-0.00175, 0.94688);

        // blender
        const blender = this.add.sprite(122.85, 882.225, "coffee", "coffee/smoothieblender0001");
        blender.setOrigin(0.49237, 0.68276);

        // smoothielight
        const smoothielight = this.add.image(-111.375, 783.6125, "coffee", "coffee/smoothie-btn0002");
        smoothielight.setOrigin(0, 0.82645);
        smoothielight.visible = false;

        // coffee_smoothiefront
        const coffee_smoothiefront = this.add.image(124.3125, 933.1875, "coffee", "coffee/smoothiefront");
        coffee_smoothiefront.setOrigin(0.69728, 1.53401);

        // coffee_smoothiesign
        const coffee_smoothiesign = this.add.image(-40.95, 272.3625, "coffee", "coffee/smoothiesign");
        coffee_smoothiesign.setOrigin(0, 0);

        // smoothietitle
        const smoothietitle = this.add.image(-40.95, 272.3625, "coffee", "coffee/smoothietitle0001");
        smoothietitle.setOrigin(0, 0);

        // coffee_smoothiechair
        const coffee_smoothiechair = this.add.image(446.9625, 742.6125, "coffee", "coffee/smoothiechair");
        coffee_smoothiechair.setOrigin(0.08265, 0.16463);

        // coffee_smoothiechair_1
        const coffee_smoothiechair_1 = this.add.image(423, 868.725, "coffee", "coffee/smoothiechair");
        coffee_smoothiechair_1.setOrigin(0.08265, 0.16463);

        // beans
        const beans = this.add.sprite(1521.225, 861.975, "coffee", "coffee/beans0001");
        beans.setOrigin(0.42226131, 0.41206395);

        // coffee_shopouter
        const coffee_shopouter = this.add.image(85.1625, 1015.425, "coffee", "coffee/shopouter");
        coffee_shopouter.setOrigin(0.12928, 0.91449);

        // coffee_beanssign
        const coffee_beanssign = this.add.image(1585.2375, 370.0125, "coffee", "coffee/beanssign");
        coffee_beanssign.setOrigin(0, 0);

        // smoothie_btn
        const smoothie_btn = this.add.image(-111.375, 283.6125, "coffee", "coffee/smoothie-btn0004");
        smoothie_btn.setOrigin(0, 0);
        smoothie_btn.alpha = 0.01;
        smoothie_btn.alphaTopLeft = 0.01;
        smoothie_btn.alphaTopRight = 0.01;
        smoothie_btn.alphaBottomLeft = 0.01;
        smoothie_btn.alphaBottomRight = 0.01;

        // beansarea
        const beansarea = this.add.image(1482.6375, 690.6375, "coffee", "coffee/beansarea");
        beansarea.setOrigin(0, 0);
        beansarea.alpha = 0.01;
        beansarea.alphaTopLeft = 0.01;
        beansarea.alphaTopRight = 0.01;
        beansarea.alphaBottomLeft = 0.01;
        beansarea.alphaBottomRight = 0.01;

        // smoothie_trigger
        const smoothie_trigger = this.add.image(153, 731.25, "coffee", "coffee/smoothie-trigger");
        smoothie_trigger.visible = false;

        // coffee_door_trigger
        const coffee_door_trigger = this.add.image(801.3375, 343.0125, "coffee", "coffee/door-trigger");
        coffee_door_trigger.visible = false;

        // beans_trigger
        const beans_trigger = this.add.image(1591.2, 871.65, "coffee", "coffee/beans-trigger");
        beans_trigger.visible = false;

        // coffee_upstairs_trigger
        const coffee_upstairs_trigger = this.add.image(1471.5, 421.7625, "coffee", "coffee/upstairs-trigger");
        coffee_upstairs_trigger.visible = false;

        // register_btn
        const register_btn = this.add.image(1022.4, 441.45, "coffee", "coffee/register_btn0004");
        register_btn.setOrigin(0.61464, -0.413);
        register_btn.alpha = 0.01;
        register_btn.alphaTopLeft = 0.01;
        register_btn.alphaTopRight = 0.01;
        register_btn.alphaBottomLeft = 0.01;
        register_btn.alphaBottomRight = 0.01;

        // smoothieregister_btn
        const smoothieregister_btn = this.add.image(326.8125, 658.8, "coffee", "coffee/smoothieregister_btn0004");
        smoothieregister_btn.setOrigin(0.5, 0);
        smoothieregister_btn.alpha = 0.01;
        smoothieregister_btn.alphaTopLeft = 0.01;
        smoothieregister_btn.alphaTopRight = 0.01;
        smoothieregister_btn.alphaBottomLeft = 0.01;
        smoothieregister_btn.alphaBottomRight = 0.01;

        // block
        const block = this.add.image(-99, -72, "coffee", "coffee/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // lists
        const triggers = [coffee_upstairs_trigger, coffee_door_trigger, beans_trigger, smoothie_trigger];

        // stairs_btn (components)
        const stairs_btnButtonComponent = new ButtonComponent(stairs_btn);
        stairs_btnButtonComponent.handCursor = true;
        stairs_btnButtonComponent.pixelPerfect = true;

        // door (components)
        const doorButtonComponent = new ButtonComponent(door);
        doorButtonComponent.upTexture = {"key":"coffee","frame":"coffee/door0001"};
        doorButtonComponent.overTexture = {"key":"coffee","frame":"coffee/door0002"};
        doorButtonComponent.handCursor = true;
        doorButtonComponent.pixelPerfect = true;

        // coffee_counter (components)
        new DepthEnabled(coffee_counter);

        // coffee_sidecouch (components)
        new DepthEnabled(coffee_sidecouch);

        // coffee_sidecouchrest (components)
        new DepthEnabled(coffee_sidecouchrest);

        // coffee_smallcouch (components)
        new DepthEnabled(coffee_smallcouch);

        // coffee_table (components)
        new DepthEnabled(coffee_table);

        // coffee_railing (components)
        new DepthEnabled(coffee_railing);

        // register (components)
        new DepthEnabled(register);

        // coffee_downtable (components)
        new DepthEnabled(coffee_downtable);

        // coffee_beanbag (components)
        new DepthEnabled(coffee_beanbag);

        // coffee_couchcushion (components)
        new DepthEnabled(coffee_couchcushion);

        // coffee_couchback (components)
        new DepthEnabled(coffee_couchback);

        // coffee_singlecouchcushion (components)
        new DepthEnabled(coffee_singlecouchcushion);

        // coffee_singlecouchback (components)
        new DepthEnabled(coffee_singlecouchback);

        // coffee_singlecouchrest (components)
        new DepthEnabled(coffee_singlecouchrest);

        // coffee_smoothiebg (components)
        new DepthEnabled(coffee_smoothiebg);

        // coffee_smoothietable (components)
        new DepthEnabled(coffee_smoothietable);

        // smoothieregister (components)
        new DepthEnabled(smoothieregister);

        // blender (components)
        new DepthEnabled(blender);

        // smoothielight (components)
        new DepthEnabled(smoothielight);

        // coffee_smoothiefront (components)
        new DepthEnabled(coffee_smoothiefront);

        // coffee_smoothiesign (components)
        const coffee_smoothiesignDepthEnabled = new DepthEnabled(coffee_smoothiesign);
        coffee_smoothiesignDepthEnabled.automaticSort = false;
        coffee_smoothiesignDepthEnabled.depth = 975.15;

        // smoothietitle (components)
        const smoothietitleDepthEnabled = new DepthEnabled(smoothietitle);
        smoothietitleDepthEnabled.automaticSort = false;
        smoothietitleDepthEnabled.depth = 975.15;

        // coffee_smoothiechair (components)
        new DepthEnabled(coffee_smoothiechair);

        // coffee_smoothiechair_1 (components)
        new DepthEnabled(coffee_smoothiechair_1);

        // coffee_shopouter (components)
        new DepthEnabled(coffee_shopouter);

        // smoothie_btn (components)
        const smoothie_btnButtonComponent = new ButtonComponent(smoothie_btn);
        smoothie_btnButtonComponent.handCursor = true;
        smoothie_btnButtonComponent.pixelPerfect = true;

        // beansarea (components)
        const beansareaButtonComponent = new ButtonComponent(beansarea);
        beansareaButtonComponent.handCursor = true;
        beansareaButtonComponent.pixelPerfect = true;

        // smoothie_trigger (components)
        new Trigger(smoothie_trigger);

        // coffee_door_trigger (components)
        const coffee_door_triggerRoomTrigger = new RoomTrigger(coffee_door_trigger);
        coffee_door_triggerRoomTrigger.destination = "100";
        coffee_door_triggerRoomTrigger.playerX = 652.5;
        coffee_door_triggerRoomTrigger.playerY = 585;

        // beans_trigger (components)
        new Trigger(beans_trigger);

        // coffee_upstairs_trigger (components)
        const coffee_upstairs_triggerRoomTrigger = new RoomTrigger(coffee_upstairs_trigger);
        coffee_upstairs_triggerRoomTrigger.destination = "111";
        coffee_upstairs_triggerRoomTrigger.playerX = 1406.25;
        coffee_upstairs_triggerRoomTrigger.playerY = 551.25;

        // register_btn (components)
        new ButtonComponent(register_btn);

        // smoothieregister_btn (components)
        new ButtonComponent(smoothieregister_btn);

        this.sign = sign;
        this.stairslight = stairslight;
        this.stairs_btn = stairs_btn;
        this.door = door;
        this.register = register;
        this.smoothieregister = smoothieregister;
        this.blender = blender;
        this.smoothielight = smoothielight;
        this.smoothietitle = smoothietitle;
        this.beans = beans;
        this.smoothie_btn = smoothie_btn;
        this.beansarea = beansarea;
        this.smoothie_trigger = smoothie_trigger;
        this.beans_trigger = beans_trigger;
        this.register_btn = register_btn;
        this.smoothieregister_btn = smoothieregister_btn;
        this.block = block;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public sign!: Phaser.GameObjects.Image;
    public stairslight!: Phaser.GameObjects.Image;
    public stairs_btn!: Phaser.GameObjects.Image;
    public door!: Phaser.GameObjects.Image;
    public register!: Phaser.GameObjects.Sprite;
    public smoothieregister!: Phaser.GameObjects.Sprite;
    public blender!: Phaser.GameObjects.Sprite;
    public smoothielight!: Phaser.GameObjects.Image;
    public smoothietitle!: Phaser.GameObjects.Image;
    public beans!: Phaser.GameObjects.Sprite;
    public smoothie_btn!: Phaser.GameObjects.Image;
    public beansarea!: Phaser.GameObjects.Image;
    public smoothie_trigger!: Phaser.GameObjects.Image;
    public beans_trigger!: Phaser.GameObjects.Image;
    public register_btn!: Phaser.GameObjects.Image;
    public smoothieregister_btn!: Phaser.GameObjects.Image;
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

    public cashOpen: boolean;
    public smoothieCashOpen: boolean;

    create(data: any): void {

        this.editorCreate();

        this.stairs_btn.on('over', () => {
            this.sound.play('coffee_lighton');
            this.stairslight.visible = true;
        });
        this.stairs_btn.on('out', () => {
            this.sound.play('coffee_lightoff');
            this.stairslight.visible = false;
        });
        this.stairs_btn.on('release', () => this.world.move(1473.75, 573.75));

        this.smoothie_btn.on('over', () => {
            this.sound.play('coffee_blender', { loop: true });
            this.blender.play('coffee-blender-animation');
            this.smoothielight.visible = true;
            this.interface.showLocalizedHint({ x: 294.52500, y: 797.17500 }, 'smoothie_hint');
        });
        this.smoothie_btn.on('out', () => {
            this.sound.stopByKey('coffee_blender');
            this.blender.play('coffee-blender-idle-animation');
            this.smoothielight.visible = false;
            this.interface.hideHint();
        });
        this.smoothie_btn.on('release', () => this.world.move(153, 731.25));

        this.door.on('over', () => this.sound.play('coffee_dooropen'));
        this.door.on('out', () => this.sound.play('coffee_doorclose'));
        this.door.on('release', () => this.world.move(798.75, 337.5));

        this.beansarea.on('over', () => {
            this.sound.play('coffee_beans');
            this.beans.play('coffee-beans-animation');
            this.interface.showLocalizedHint({ x: 1530.225, y: 720.22500 }, 'beans_hint');
        });
        this.beansarea.on('out', () => {
            this.beans.play('coffee-beans-idle-animation');
            this.interface.hideHint();
        });
        this.beansarea.on('release', () => this.world.move(1552.5, 731.25));

        this.cashOpen = false;
        this.register_btn.on('over', () => {
            if (this.register.anims.isPlaying) return;

            if (!this.cashOpen) {
                this.sound.play('coffee_registeropen');
                this.register.play('coffee-cashopen-animation');
                this.cashOpen = true;
            } else {
                this.sound.play('coffee_registerclose');
                this.register.play('coffee-cashclose-animation');
                this.cashOpen = false;
            }
        });

        this.smoothieCashOpen = false;
        this.smoothieregister_btn.on('over', () => {
            if (this.smoothieregister.anims.isPlaying) return;

            if (!this.smoothieCashOpen) {
                this.sound.play('coffee_registeropen');
                this.smoothieregister.play('coffee-smoothiecashopen-animation');
                this.smoothieCashOpen = true;
            } else {
                this.sound.play('coffee_registerclose');
                this.smoothieregister.play('coffee-smoothiecashclose-animation');
                this.smoothieCashOpen = false;
            }
        });

        Trigger.getComponent(this.beans_trigger).execute = (engine, penguin) => {
            if (engine.player != penguin) return;
            this.interface.promptQuestion.showLocalized('beans_prompt', () => {
                this.world.startGame('beans', {});
            }, () => { });
        }

        Trigger.getComponent(this.smoothie_trigger).execute = (engine, penguin) => {
            if (engine.player != penguin) return;
            this.interface.promptQuestion.showLocalized('smoothie_prompt', () => {
                this.world.startGame('smoothie', {});
            }, () => { });
        }

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.sign.setFrame(`coffee/sign${locale.frame}`);
        this.smoothietitle.setFrame(`coffee/smoothietitle${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('coffee-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
