/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import DepthEnabled from "../../../lib/ui/components/DepthEnabled";
import RoomTrigger from "../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import type Engine from "../../engine/Engine";
import type { Locale } from "../../../app/locale";
import type { App } from "../../../app/app";
/* END-USER-IMPORTS */

export default class Town extends Phaser.Scene {

    constructor() {
        super("Town");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("town-pack", "assets/world/rooms/town/town-pack.json");
    }

    editorCreate(): void {

        // sky
        const sky = this.add.image(-22.5, -22.5, "town", "town/sky");
        sky.setOrigin(0, 0);

        // clouds
        const clouds = this.add.image(-22.5, 53.6625, "town", "town/clouds");
        clouds.setOrigin(0, 0);

        // mountains
        const mountains = this.add.image(111.0375, 85.6125, "town", "town/mountains");
        mountains.setOrigin(0, 0);

        // danceDoorArea
        const danceDoorArea = this.add.image(901.35, 345.03745, "town", "town/danceinside");
        danceDoorArea.setOrigin(0, 0);

        // danceDoor
        const danceDoor = this.add.image(947, 403, "town", "town/dancedoor");

        // base
        const base = this.add.image(-119.25, 49.6125, "town", "town/base");
        base.setOrigin(0, 0);

        // town_newsboard
        const town_newsboard = this.add.image(226.2375, 773.775, "town", "town/newsboard");
        town_newsboard.setOrigin(0.4937, 0.32853);

        // town_sidetrees
        const town_sidetrees = this.add.image(1695.0375, 703.35, "town", "town/sidetrees");
        town_sidetrees.setOrigin(0.49165, 0.49622);

        // town_bottom
        const town_bottom = this.add.image(864.1125, 1112.1625, "town", "town/bottom");
        town_bottom.setOrigin(0.5, 1);

        // shopDoor
        const shopDoor = this.add.image(1208.7, 335.1375, "town", "town/shopdoor0001");
        shopDoor.setOrigin(0, 0);

        // coffeeDoor
        const coffeeDoor = this.add.image(422.325, 396.675, "town", "town/coffeedoor0001");
        coffeeDoor.setOrigin(0, 0);

        // speakers
        const speakers = this.add.sprite(751.5, 328.275, "town", "town/speakers1");
        speakers.setOrigin(0, 0);

        // spotlightLeft
        const spotlightLeft = this.add.image(824.7375, 242.8875, "town", "town/spotlightleft");
        spotlightLeft.setOrigin(0.5, 1);

        // spotlightRight
        const spotlightRight = this.add.image(1069.0875, 250.3125, "town", "town/spotlightright");
        spotlightRight.setOrigin(0.5, 1);

        // spotlightContentLeft
        const spotlightContentLeft = this.add.image(618.75, -22.5, "town", "town/spotlightcontent");
        spotlightContentLeft.setOrigin(0, 0);

        // spotlightContentRight
        const spotlightContentRight = this.add.image(956.25, -22.5, "town", "town/spotlightcontent");
        spotlightContentRight.setOrigin(0, 0);

        // spotlightMaskLeft
        const spotlightMaskLeft = this.add.image(824.7375, 242.8875, "town", "town/spotlightmaskleft");
        spotlightMaskLeft.setOrigin(0.62469697, 1.13786561);
        spotlightMaskLeft.visible = false;

        // spotlightMaskRight
        const spotlightMaskRight = this.add.image(1069.0875, 250.3125, "town", "town/spotlightmaskright");
        spotlightMaskRight.setOrigin(0.47330189, 1.13580769);
        spotlightMaskRight.visible = false;

        // town_shopfronts
        const town_shopfronts = this.add.image(376.9875, 235.8, "town", "town/shopfronts");
        town_shopfronts.setOrigin(0, 0);

        // storenames
        const storenames = this.add.image(222.4, 177.075, "town", "town/storenames0001");
        storenames.setOrigin(0, 0);

        // town_shopsign
        const town_shopsign = this.add.image(1159.875, 140.7375, "town", "town/shopsign");
        town_shopsign.setOrigin(0, 0);

        // town_cord
        const town_cord = this.add.image(1062.45, 502.65, "town", "town/cord");
        town_cord.setOrigin(0.47154, 0.54857);

        // town_leftchair
        const town_leftchair = this.add.image(608.9625, 510.525, "town", "town/leftchair");
        town_leftchair.setOrigin(0.47593, 0.35102);

        // town_rightchair
        const town_rightchair = this.add.image(783.225, 500.85, "town", "town/rightchair");
        town_rightchair.setOrigin(0.46987, 0.37142);

        // town_table
        const town_table = this.add.image(697.725, 556.0875, "town", "town/table");
        town_table.setOrigin(0.48025, 0.68182);

        // town_benchside
        const town_benchside = this.add.image(289.35, 612, "town", "town/benchside");
        town_benchside.setOrigin(0.47066, 0.70566);

        // town_clothes
        const town_clothes = this.add.image(1347.75, 542.925, "town", "town/clothes");
        town_clothes.setOrigin(0.48008, 0.585);

        // town_dancecover
        const town_dancecover = this.add.image(951.975, 496.6875, "town", "town/dancecover");
        town_dancecover.setOrigin(0.48726, 0.9);

        // discolights
        const discolights = this.add.sprite(883, 328, "town", "town/discolights0001");
        discolights.setOrigin(0, 0);

        // town_dancestars
        const town_dancestars = this.add.image(887.4, 330.75, "town", "town/dancestars");
        town_dancestars.setOrigin(0, 0);

        // purplelight
        const purplelight = this.add.image(725.9625, 102.2625, "town", "town/purplelight");
        purplelight.setOrigin(0, 0);

        // bluelight
        const bluelight = this.add.image(779.9625, 121.3875, "town", "town/bluelight");
        bluelight.setOrigin(0, 0);

        // greenlight
        const greenlight = this.add.image(821.925, 112.1625, "town", "town/greenlight");
        greenlight.setOrigin(0, 0);

        // bluelight2
        const bluelight2 = this.add.image(1027.8, 108.1125, "town", "town/altbluelight");
        bluelight2.setOrigin(0, 0);

        // redlight
        const redlight = this.add.image(1088.6625, 103.5, "town", "town/redlight");
        redlight.setOrigin(0, 0);

        // greenlight2
        const greenlight2 = this.add.image(1115.8875, 125.4375, "town", "town/altgreenlight");
        greenlight2.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "town", "town/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // forts_btn
        const forts_btn = this.add.image(1465.5375, 168.75, "town", "town/forts_btn0004");
        forts_btn.setOrigin(0, 0);
        forts_btn.alpha = 0.01;
        forts_btn.alphaTopLeft = 0.01;
        forts_btn.alphaTopRight = 0.01;
        forts_btn.alphaBottomLeft = 0.01;
        forts_btn.alphaBottomRight = 0.01;

        // dock_btn
        const dock_btn = this.add.image(-22.5, 168.75, "town", "town/dock_btn0004");
        dock_btn.setOrigin(0, 0);
        dock_btn.alpha = 0.01;
        dock_btn.alphaTopLeft = 0.01;
        dock_btn.alphaTopRight = 0.01;
        dock_btn.alphaBottomLeft = 0.01;
        dock_btn.alphaBottomRight = 0.01;

        // seat1_btn
        const seat1_btn = this.add.image(568.35, 503.6625, "town", "town/seat1_btn0004");
        seat1_btn.setOrigin(0, 0);
        seat1_btn.alpha = 0.01;
        seat1_btn.alphaTopLeft = 0.01;
        seat1_btn.alphaTopRight = 0.01;
        seat1_btn.alphaBottomLeft = 0.01;
        seat1_btn.alphaBottomRight = 0.01;

        // seat2_btn
        const seat2_btn = this.add.image(728.6625, 487.9125, "town", "town/seat2_btn0004");
        seat2_btn.setOrigin(0, 0);
        seat2_btn.alpha = 0.01;
        seat2_btn.alphaTopLeft = 0.01;
        seat2_btn.alphaTopRight = 0.01;
        seat2_btn.alphaBottomLeft = 0.01;
        seat2_btn.alphaBottomRight = 0.01;

        // town_coffee_trigger
        const town_coffee_trigger = this.add.image(477, 514.35, "town", "town/coffee_trigger");
        town_coffee_trigger.visible = false;

        // town_dance_trigger
        const town_dance_trigger = this.add.image(949.5, 478.35, "town", "town/dance_trigger");
        town_dance_trigger.visible = false;

        // town_dock_trigger
        const town_dock_trigger = this.add.image(87.8625, 647.1, "town", "town/dock_trigger");
        town_dock_trigger.visible = false;

        // town_forts_trigger
        const town_forts_trigger = this.add.image(1586.25, 640.35, "town", "town/forts_trigger");
        town_forts_trigger.visible = false;

        // town_shop_trigger
        const town_shop_trigger = this.add.image(1230.75, 503.1, "town", "town/shop_trigger");
        town_shop_trigger.visible = false;

        // lists
        const triggers = [town_shop_trigger, town_forts_trigger, town_dock_trigger, town_dance_trigger, town_coffee_trigger];

        // danceDoorArea (components)
        const danceDoorAreaButtonComponent = new ButtonComponent(danceDoorArea);
        danceDoorAreaButtonComponent.handCursor = true;
        danceDoorAreaButtonComponent.pixelPerfect = true;

        // town_newsboard (components)
        new DepthEnabled(town_newsboard);

        // town_sidetrees (components)
        new DepthEnabled(town_sidetrees);

        // town_bottom (components)
        new DepthEnabled(town_bottom);

        // shopDoor (components)
        const shopDoorButtonComponent = new ButtonComponent(shopDoor);
        shopDoorButtonComponent.upTexture = {"key":"town","frame":"town/shopdoor0001"};
        shopDoorButtonComponent.overTexture = {"key":"town","frame":"town/shopdoor0002"};
        shopDoorButtonComponent.handCursor = true;
        shopDoorButtonComponent.pixelPerfect = true;

        // coffeeDoor (components)
        const coffeeDoorButtonComponent = new ButtonComponent(coffeeDoor);
        coffeeDoorButtonComponent.upTexture = {"key":"town","frame":"town/coffeedoor0001"};
        coffeeDoorButtonComponent.overTexture = {"key":"town","frame":"town/coffeedoor0002"};
        coffeeDoorButtonComponent.handCursor = true;
        coffeeDoorButtonComponent.pixelPerfect = true;

        // town_cord (components)
        new DepthEnabled(town_cord);

        // town_leftchair (components)
        new DepthEnabled(town_leftchair);

        // town_rightchair (components)
        new DepthEnabled(town_rightchair);

        // town_table (components)
        new DepthEnabled(town_table);

        // town_benchside (components)
        new DepthEnabled(town_benchside);

        // town_clothes (components)
        new DepthEnabled(town_clothes);

        // town_dancecover (components)
        new DepthEnabled(town_dancecover);

        // discolights (components)
        const discolightsDepthEnabled = new DepthEnabled(discolights);
        discolightsDepthEnabled.automaticSort = false;
        discolightsDepthEnabled.depth = 507.936;

        // town_dancestars (components)
        const town_dancestarsDepthEnabled = new DepthEnabled(town_dancestars);
        town_dancestarsDepthEnabled.automaticSort = false;
        town_dancestarsDepthEnabled.depth = 507.936;

        // forts_btn (components)
        const forts_btnButtonComponent = new ButtonComponent(forts_btn);
        forts_btnButtonComponent.pixelPerfect = true;

        // dock_btn (components)
        const dock_btnButtonComponent = new ButtonComponent(dock_btn);
        dock_btnButtonComponent.pixelPerfect = true;

        // seat1_btn (components)
        const seat1_btnButtonComponent = new ButtonComponent(seat1_btn);
        seat1_btnButtonComponent.pixelPerfect = true;

        // seat2_btn (components)
        const seat2_btnButtonComponent = new ButtonComponent(seat2_btn);
        seat2_btnButtonComponent.pixelPerfect = true;

        // town_coffee_trigger (components)
        const town_coffee_triggerRoomTrigger = new RoomTrigger(town_coffee_trigger);
        town_coffee_triggerRoomTrigger.destination = "110";
        town_coffee_triggerRoomTrigger.playerX = 798.75;
        town_coffee_triggerRoomTrigger.playerY = 450;

        // town_dance_trigger (components)
        const town_dance_triggerRoomTrigger = new RoomTrigger(town_dance_trigger);
        town_dance_triggerRoomTrigger.destination = "120";
        town_dance_triggerRoomTrigger.playerX = 382.5;
        town_dance_triggerRoomTrigger.playerY = 607.5;

        // town_dock_trigger (components)
        const town_dock_triggerRoomTrigger = new RoomTrigger(town_dock_trigger);
        town_dock_triggerRoomTrigger.destination = "800";
        town_dock_triggerRoomTrigger.playerX = 1428.75;
        town_dock_triggerRoomTrigger.playerY = 438.75;

        // town_forts_trigger (components)
        const town_forts_triggerRoomTrigger = new RoomTrigger(town_forts_trigger);
        town_forts_triggerRoomTrigger.destination = "801";
        town_forts_triggerRoomTrigger.playerX = 247.5;
        town_forts_triggerRoomTrigger.playerY = 585;

        // town_shop_trigger (components)
        const town_shop_triggerRoomTrigger = new RoomTrigger(town_shop_trigger);
        town_shop_triggerRoomTrigger.destination = "130";
        town_shop_triggerRoomTrigger.playerX = 1248.75;
        town_shop_triggerRoomTrigger.playerY = 472.5;

        this.danceDoorArea = danceDoorArea;
        this.danceDoor = danceDoor;
        this.shopDoor = shopDoor;
        this.coffeeDoor = coffeeDoor;
        this.speakers = speakers;
        this.spotlightLeft = spotlightLeft;
        this.spotlightRight = spotlightRight;
        this.spotlightContentLeft = spotlightContentLeft;
        this.spotlightContentRight = spotlightContentRight;
        this.spotlightMaskLeft = spotlightMaskLeft;
        this.spotlightMaskRight = spotlightMaskRight;
        this.storenames = storenames;
        this.discolights = discolights;
        this.purplelight = purplelight;
        this.bluelight = bluelight;
        this.greenlight = greenlight;
        this.bluelight2 = bluelight2;
        this.redlight = redlight;
        this.greenlight2 = greenlight2;
        this.block = block;
        this.forts_btn = forts_btn;
        this.dock_btn = dock_btn;
        this.seat1_btn = seat1_btn;
        this.seat2_btn = seat2_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public danceDoorArea!: Phaser.GameObjects.Image;
    public danceDoor!: Phaser.GameObjects.Image;
    public shopDoor!: Phaser.GameObjects.Image;
    public coffeeDoor!: Phaser.GameObjects.Image;
    public speakers!: Phaser.GameObjects.Sprite;
    public spotlightLeft!: Phaser.GameObjects.Image;
    public spotlightRight!: Phaser.GameObjects.Image;
    public spotlightContentLeft!: Phaser.GameObjects.Image;
    public spotlightContentRight!: Phaser.GameObjects.Image;
    public spotlightMaskLeft!: Phaser.GameObjects.Image;
    public spotlightMaskRight!: Phaser.GameObjects.Image;
    public storenames!: Phaser.GameObjects.Image;
    public discolights!: Phaser.GameObjects.Sprite;
    public purplelight!: Phaser.GameObjects.Image;
    public bluelight!: Phaser.GameObjects.Image;
    public greenlight!: Phaser.GameObjects.Image;
    public bluelight2!: Phaser.GameObjects.Image;
    public redlight!: Phaser.GameObjects.Image;
    public greenlight2!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public forts_btn!: Phaser.GameObjects.Image;
    public dock_btn!: Phaser.GameObjects.Image;
    public seat1_btn!: Phaser.GameObjects.Image;
    public seat2_btn!: Phaser.GameObjects.Image;
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

    create(data: any): void {

        this.editorCreate();
        this.speakers.play('townspeakers');

        this.discolights.visible = false;
        this.discolights.on('animationstart', () => this.discolights.visible = true);
        this.discolights.on('animationcomplete', (animation: Phaser.Animations.Animation) => this.discoAnimationComplete(animation));

        let leftMask = this.spotlightMaskLeft.createBitmapMask();
        this.spotlightContentLeft.mask = leftMask;

        let rightMask = this.spotlightMaskRight.createBitmapMask();
        this.spotlightContentRight.mask = rightMask;

        this.tweens.addMultiple([{
            targets: [this.spotlightLeft, this.spotlightMaskLeft],
            angle: { from: -20, to: 16 },
            ease: 'Sine.InOut',
            duration: 2916.6,
            repeat: -1,
            repeatDelay: 375,
            yoyo: true,
            hold: 625
        }, {
            targets: [this.spotlightRight, this.spotlightMaskRight],
            angle: { from: 22.5, to: -12.5 },
            ease: 'Sine.InOut',
            duration: 2916.6,
            repeat: -1,
            repeatDelay: 375,
            yoyo: true,
            hold: 625
        }]);

        let lights = this.add.timeline([{
            at: 0,
            run: () => {
                this.purplelight.visible = true;
                this.bluelight.visible = false;
                this.greenlight.visible = true;
                this.bluelight2.visible = false;
                this.redlight.visible = true;
                this.greenlight2.visible = false;
            }
        }, {
            at: 541.666667,
            run: () => {
                this.purplelight.visible = true;
                this.bluelight.visible = true;
                this.greenlight.visible = false;
                this.bluelight2.visible = true;
                this.redlight.visible = false;
                this.greenlight2.visible = true;

            }
        }, {
            at: 1041.66667,
            run: () => {
                this.purplelight.visible = false;
                this.bluelight.visible = true;
                this.greenlight.visible = false;
                this.bluelight2.visible = true;
                this.redlight.visible = true;
                this.greenlight2.visible = false;
            }
        }, {
            at: 1541.66667,
            run: () => {
                this.purplelight.visible = false;
                this.bluelight.visible = true;
                this.greenlight.visible = true;
                this.bluelight2.visible = false;
                this.redlight.visible = true;
                this.greenlight2.visible = true;
            }
        }, {
            at: 2041.66667,
            run: () => {
                lights.play(true);
            }
        }]);
        lights.play();

        this.coffeeDoor.on('over', () => this.sound.play('town_coffeeopen'));
        this.coffeeDoor.on('out', () => this.sound.play('town_coffeeclose'));
        this.coffeeDoor.on('release', () => this.engine.movePlayer(483.75, 528.75));

        this.shopDoor.on('over', () => this.sound.play('town_shopopen'));
        this.shopDoor.on('out', () => this.sound.play('town_shopclose'));
        this.shopDoor.on('release', () => this.engine.movePlayer(1226.25, 517.5));

        this.danceDoorArea.on('over', () => {
            this.playDiscoAnimation();
            this.sound.play('town_discoopen');
            this.tweens.killTweensOf(this.danceDoor);
            this.tweens.add({
                targets: this.danceDoor,
                duration: 291.666667,
                ease: 'Back.Out',
                x: { from: 947, to: 946 },
                y: { from: 403, to: 299 }
            });
        });
        this.danceDoorArea.on('out', () => {
            this.stopDiscoAnimation();
            this.sound.play('town_discoclose');
            this.tweens.killTweensOf(this.danceDoor);
            this.tweens.add({
                targets: this.danceDoor,
                duration: 291.666667,
                ease: 'Back.Out',
                x: { from: 946, to: 947 },
                y: { from: 299, to: 403 }
            });

        });
        this.danceDoorArea.on('release', () => this.engine.movePlayer(956.25, 495));

        this.dock_btn.on('release', () => this.engine.movePlayer(146.25, 652.5));
        this.forts_btn.on('release', () => this.engine.movePlayer(1575, 663.75));
        this.seat1_btn.on('release', () => this.engine.movePlayer(612, 526.5));
        this.seat2_btn.on('release', () => this.engine.movePlayer(780.75, 522));

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);

    }

    localize(locale: Locale): void {
        this.storenames.setFrame(`town/storenames${locale.frame}`);
    }

    public animation2Count = 0;
    public animation2Phase = 0;

    discoAnimationComplete(animation: Phaser.Animations.Animation): void {
        this.discolights.visible = false;

        if (animation.key == 'discostars1') {
            this.animation2Count = 0;
            this.animation2Phase = 0;
            this.discolights.playAfterDelay('discostars2', 250);
        } else if (animation.key == 'discostars2' && this.animation2Count < 2) {
            this.animation2Count += 1;
            this.discolights.playAfterDelay('discostars2', 83.3333333);
        } else if (animation.key == 'discostars2' && this.animation2Count > 1 && this.animation2Phase == 0) {
            this.animation2Count = 0;
            this.discolights.playAfterDelay('discostars3', 416.666667);
        } else if (animation.key == 'discostars3') {
            this.animation2Count = 0;
            this.animation2Phase = 1;
            this.discolights.playAfterDelay('discostars2', 250);
        } else if (animation.key == 'discostars2' && this.animation2Count > 1 && this.animation2Phase == 1) {
            this.animation2Count = 0;
            this.discolights.playAfterDelay('discostars1', 375);
        }
    }

    playDiscoAnimation(): void {
        this.stopDiscoAnimation();
        this.discolights.play('discostars1');
    }

    stopDiscoAnimation(): void {
        this.discolights.stop();
        this.discolights.visible = false;
        this.animation2Count = 0;
        this.animation2Phase = 0;
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.game.unloadAssetPack('town-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
