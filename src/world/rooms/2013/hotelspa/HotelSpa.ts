
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/components/ButtonComponent";
import ContentTrigger from "../../../../lib/components/ContentTrigger";
import PressureTrigger from "../../../../lib/components/PressureTrigger";
import DepthEnabled from "../../../../lib/components/DepthEnabled";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Locale } from "@clubpenguin/app/locale";
import { Engine } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import World from "@clubpenguin/world/World";
import { AnimationFrame } from "@clubpenguin/world/engine/player/animationFrame";
/* END-USER-IMPORTS */

export default class HotelSpa extends Phaser.Scene {

    constructor() {
        super("HotelSpa");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("hotelspa2013-pack", "assets/world/rooms/2013/hotelspa/hotelspa2013-pack.json");
    }

    editorCreate(): void {

        // hotelspa_base
        const hotelspa_base = this.add.image(-121.5, -11.25, "hotelspa2013", "hotelspa/base");
        hotelspa_base.setOrigin(0, 0);

        // elevatordoor
        const elevatordoor = this.add.sprite(-30.37, 159.19, "hotelspa2013", "hotelspa/elevator0001");
        elevatordoor.setOrigin(0, 0);

        // elevatorframe
        const elevatorframe = this.add.image(-67.05, 142.31, "hotelspa2013", "hotelspa/elevatorframe0001");
        elevatorframe.setOrigin(0, 0);

        // hotelspa_elevatorframe0004
        const hotelspa_elevatorframe0004 = this.add.image(-67.05, 142.31, "hotelspa2013", "hotelspa/elevatorframe0004");
        hotelspa_elevatorframe0004.setOrigin(0, 0);
        hotelspa_elevatorframe0004.alpha = 0.0001;
        hotelspa_elevatorframe0004.alphaTopLeft = 0.0001;
        hotelspa_elevatorframe0004.alphaTopRight = 0.0001;
        hotelspa_elevatorframe0004.alphaBottomLeft = 0.0001;
        hotelspa_elevatorframe0004.alphaBottomRight = 0.0001;

        // hotelspa_speaker0001
        const hotelspa_speaker0001 = this.add.sprite(198, 155.25, "hotelspa2013", "hotelspa/speaker0001");
        hotelspa_speaker0001.setOrigin(0, 0);
        hotelspa_speaker0001.play("hotelspa2013-speaker-animation");

        // hotelspa_speaker
        const hotelspa_speaker = this.add.sprite(681.75, 155.25, "hotelspa2013", "hotelspa/speaker0001");
        hotelspa_speaker.setOrigin(0, 0);
        hotelspa_speaker.flipX = true;
        hotelspa_speaker.play("hotelspa2013-speaker-animation");

        // block
        const block = this.add.image(0, 0, "hotelspa2013", "hotelspa/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // hotelspa_elevator_trigger
        const hotelspa_elevator_trigger = this.add.image(-81, 378, "hotelspa2013", "hotelspa/elevator_trigger");
        hotelspa_elevator_trigger.setOrigin(0, 0);
        hotelspa_elevator_trigger.visible = false;

        // hotelspa_aero1_trigger
        const hotelspa_aero1_trigger = this.add.image(427.5, 384.75, "hotelspa2013", "hotelspa/aero1_trigger");
        hotelspa_aero1_trigger.setOrigin(0, 0);
        hotelspa_aero1_trigger.visible = false;

        // hotelspa_aero2_trigger
        const hotelspa_aero2_trigger = this.add.image(258.75, 528.75, "hotelspa2013", "hotelspa/aero2_trigger");
        hotelspa_aero2_trigger.setOrigin(0, 0);
        hotelspa_aero2_trigger.visible = false;

        // hotelspa_weight1_trigger
        const hotelspa_weight1_trigger = this.add.image(551.25, 531, "hotelspa2013", "hotelspa/weight1_trigger");
        hotelspa_weight1_trigger.setOrigin(0, 0);
        hotelspa_weight1_trigger.visible = false;

        // hotelspa_weight2_trigger
        const hotelspa_weight2_trigger = this.add.image(362.25, 621, "hotelspa2013", "hotelspa/weight2_trigger");
        hotelspa_weight2_trigger.setOrigin(0, 0);
        hotelspa_weight2_trigger.visible = false;

        // hotelspa_salon1_trigger
        const hotelspa_salon1_trigger = this.add.image(1129.5, 409.5, "hotelspa2013", "hotelspa/salon1_trigger");
        hotelspa_salon1_trigger.setOrigin(0, 0);
        hotelspa_salon1_trigger.visible = false;

        // hotelspa_salon2_trigger
        const hotelspa_salon2_trigger = this.add.image(1338.75, 409.5, "hotelspa2013", "hotelspa/salon2_trigger");
        hotelspa_salon2_trigger.setOrigin(0, 0);
        hotelspa_salon2_trigger.visible = false;

        // hotelspa_chair1_trigger
        const hotelspa_chair1_trigger = this.add.image(1044, 769.5, "hotelspa2013", "hotelspa/chair1_trigger");
        hotelspa_chair1_trigger.setOrigin(0, 0);
        hotelspa_chair1_trigger.visible = false;

        // hotelspa_chair2_trigger
        const hotelspa_chair2_trigger = this.add.image(1381.5, 756, "hotelspa2013", "hotelspa/chair2_trigger");
        hotelspa_chair2_trigger.setOrigin(0, 0);
        hotelspa_chair2_trigger.visible = false;

        // tread1_trigger
        const tread1_trigger = this.add.image(141.75, 783, "hotelspa2013", "hotelspa/tread2_trigger");
        tread1_trigger.setOrigin(0, 0);
        tread1_trigger.visible = false;

        // tread2_trigger
        const tread2_trigger = this.add.image(423, 783, "hotelspa2013", "hotelspa/tread1_trigger");
        tread2_trigger.setOrigin(0, 0);
        tread2_trigger.visible = false;

        // hotelspa_couch
        const hotelspa_couch = this.add.image(762.75, 396, "hotelspa2013", "hotelspa/couch");
        hotelspa_couch.setOrigin(0, 0);

        // hotelspa_lpillar
        const hotelspa_lpillar = this.add.image(729, 31.5, "hotelspa2013", "hotelspa/lpillar");
        hotelspa_lpillar.setOrigin(0, 0);

        // hotelspa_rpillar
        const hotelspa_rpillar = this.add.image(954, 31.5, "hotelspa2013", "hotelspa/rpillar");
        hotelspa_rpillar.setOrigin(0, 0);

        // hotelspa_panel
        const hotelspa_panel = this.add.image(1343.25, -60.75, "hotelspa2013", "hotelspa/panel");
        hotelspa_panel.setOrigin(0, 0);

        // hotelspa_shelf
        const hotelspa_shelf = this.add.image(1575, 528.75, "hotelspa2013", "hotelspa/shelf");
        hotelspa_shelf.setOrigin(0, 0);

        // salon1
        const salon1 = this.add.image(1113.41, 328.73, "hotelspa2013", "hotelspa/salon10001");
        salon1.setOrigin(0, 0);

        // hotelspa_salon10004
        const hotelspa_salon10004 = this.add.image(1113.41, 328.73, "hotelspa2013", "hotelspa/salon10004");
        hotelspa_salon10004.setOrigin(0, 0);
        hotelspa_salon10004.alpha = 0.0001;
        hotelspa_salon10004.alphaTopLeft = 0.0001;
        hotelspa_salon10004.alphaTopRight = 0.0001;
        hotelspa_salon10004.alphaBottomLeft = 0.0001;
        hotelspa_salon10004.alphaBottomRight = 0.0001;

        // salon2
        const salon2 = this.add.image(1319.85, 326.14, "hotelspa2013", "hotelspa/salon20001");
        salon2.setOrigin(0, 0);

        // hotelspa_salon20004
        const hotelspa_salon20004 = this.add.image(1319.85, 326.14, "hotelspa2013", "hotelspa/salon20004");
        hotelspa_salon20004.setOrigin(0, 0);
        hotelspa_salon20004.alpha = 0.0001;
        hotelspa_salon20004.alphaTopLeft = 0.0001;
        hotelspa_salon20004.alphaTopRight = 0.0001;
        hotelspa_salon20004.alphaBottomLeft = 0.0001;
        hotelspa_salon20004.alphaBottomRight = 0.0001;

        // hotelspa_dumbbell1
        const hotelspa_dumbbell1 = this.add.image(-85.5, 690.75, "hotelspa2013", "hotelspa/dumbbell1");
        hotelspa_dumbbell1.setOrigin(0, 0);

        // hotelspa_railing
        const hotelspa_railing = this.add.image(-121.5, 684, "hotelspa2013", "hotelspa/railing");
        hotelspa_railing.setOrigin(0, 0);

        // hotelspa_punchbag
        const hotelspa_punchbag = this.add.image(-123.75, 573.75, "hotelspa2013", "hotelspa/punchbag");
        hotelspa_punchbag.setOrigin(0, 0);

        // scissors1
        const scissors1 = this.add.sprite(1155.94, 354.71, "hotelspa2013", "hotelspa/scissors0003");
        scissors1.setOrigin(0, 0);
        scissors1.visible = false;

        // scissors2
        const scissors2 = this.add.sprite(1376.44, 354.71, "hotelspa2013", "hotelspa/scissors0003");
        scissors2.setOrigin(0, 0);
        scissors2.visible = false;

        // hotelspa_dumbbell2
        const hotelspa_dumbbell2 = this.add.image(686.25, 911.25, "hotelspa2013", "hotelspa/dumbbell2");
        hotelspa_dumbbell2.setOrigin(0, 0);

        // hotelspa_dumbbell3
        const hotelspa_dumbbell3 = this.add.image(848.25, 915.75, "hotelspa2013", "hotelspa/dumbbell3");
        hotelspa_dumbbell3.setOrigin(0, 0);

        // hotelspa_dumbbell4
        const hotelspa_dumbbell4 = this.add.image(886.5, 949.5, "hotelspa2013", "hotelspa/dumbbell4");
        hotelspa_dumbbell4.setOrigin(0, 0);

        // hotelspa_dumbbell5
        const hotelspa_dumbbell5 = this.add.image(333, 387, "hotelspa2013", "hotelspa/dumbbell5");
        hotelspa_dumbbell5.setOrigin(0, 0);

        // hotelspa_bottle
        const hotelspa_bottle = this.add.image(243, 360, "hotelspa2013", "hotelspa/bottle");
        hotelspa_bottle.setOrigin(0, 0);

        // hotelspa_bottle2
        const hotelspa_bottle2 = this.add.image(319.5, 852.75, "hotelspa2013", "hotelspa/bottle2");
        hotelspa_bottle2.setOrigin(0, 0);

        // hotelspa_bubbles
        const hotelspa_bubbles = this.add.image(1309.5, 695.25, "hotelspa2013", "hotelspa/bubbles");
        hotelspa_bubbles.setOrigin(0, 0);

        // hotelspa_aisle
        const hotelspa_aisle = this.add.image(956.25, 582.75, "hotelspa2013", "hotelspa/aisle");
        hotelspa_aisle.setOrigin(0, 0);

        // hotelspa_cup
        const hotelspa_cup = this.add.image(288, 378, "hotelspa2013", "hotelspa/cup");
        hotelspa_cup.setOrigin(0, 0);

        // hotelspa_towel
        const hotelspa_towel = this.add.image(1500.75, 900, "hotelspa2013", "hotelspa/towel");
        hotelspa_towel.setOrigin(0, 0);

        // hotelspa_quest0004
        const hotelspa_quest0004 = this.add.image(1537.76, 901.35, "hotelspa2013", "hotelspa/quest0004");
        hotelspa_quest0004.setOrigin(0, 0);
        hotelspa_quest0004.alpha = 0.0001;
        hotelspa_quest0004.alphaTopLeft = 0.0001;
        hotelspa_quest0004.alphaTopRight = 0.0001;
        hotelspa_quest0004.alphaBottomLeft = 0.0001;
        hotelspa_quest0004.alphaBottomRight = 0.0001;

        // exercise1
        const exercise1 = this.add.image(390.04, 380.93, "hotelspa2013", "hotelspa/aero10001");
        exercise1.setOrigin(0, 0);

        // hotelspa_aero10004
        const hotelspa_aero10004 = this.add.image(390.04, 380.93, "hotelspa2013", "hotelspa/aero10004");
        hotelspa_aero10004.setOrigin(0, 0);
        hotelspa_aero10004.alpha = 0.0001;
        hotelspa_aero10004.alphaTopLeft = 0.0001;
        hotelspa_aero10004.alphaTopRight = 0.0001;
        hotelspa_aero10004.alphaBottomLeft = 0.0001;
        hotelspa_aero10004.alphaBottomRight = 0.0001;

        // exercise2
        const exercise2 = this.add.image(212.4, 526.5, "hotelspa2013", "hotelspa/aero20001");
        exercise2.setOrigin(0, 0);

        // hotelspa_aero20004
        const hotelspa_aero20004 = this.add.image(212.4, 526.5, "hotelspa2013", "hotelspa/aero20004");
        hotelspa_aero20004.setOrigin(0, 0);
        hotelspa_aero20004.alpha = 0.0001;
        hotelspa_aero20004.alphaTopLeft = 0.0001;
        hotelspa_aero20004.alphaTopRight = 0.0001;
        hotelspa_aero20004.alphaBottomLeft = 0.0001;
        hotelspa_aero20004.alphaBottomRight = 0.0001;

        // exercise3
        const exercise3 = this.add.image(524.25, 526.5, "hotelspa2013", "hotelspa/aero30001");
        exercise3.setOrigin(0, 0);

        // hotelspa_aero30004
        const hotelspa_aero30004 = this.add.image(524.25, 526.5, "hotelspa2013", "hotelspa/aero30004");
        hotelspa_aero30004.setOrigin(0, 0);
        hotelspa_aero30004.alpha = 0.0001;
        hotelspa_aero30004.alphaTopLeft = 0.0001;
        hotelspa_aero30004.alphaTopRight = 0.0001;
        hotelspa_aero30004.alphaBottomLeft = 0.0001;
        hotelspa_aero30004.alphaBottomRight = 0.0001;

        // exercise4
        const exercise4 = this.add.image(321.75, 616.5, "hotelspa2013", "hotelspa/aero40001");
        exercise4.setOrigin(0, 0);

        // hotelspa_aero40004
        const hotelspa_aero40004 = this.add.image(321.75, 616.5, "hotelspa2013", "hotelspa/aero40004");
        hotelspa_aero40004.setOrigin(0, 0);
        hotelspa_aero40004.alpha = 0.0001;
        hotelspa_aero40004.alphaTopLeft = 0.0001;
        hotelspa_aero40004.alphaTopRight = 0.0001;
        hotelspa_aero40004.alphaBottomLeft = 0.0001;
        hotelspa_aero40004.alphaBottomRight = 0.0001;

        // dumbbell1
        const dumbbell1 = this.add.sprite(652.05, 563.85, "hotelspa2013", "hotelspa/weightdumbbell0001");
        dumbbell1.setOrigin(0.48711340206185566, 0.48214285714285715);

        // dumbbell2
        const dumbbell2 = this.add.sprite(465.3, 653.85, "hotelspa2013", "hotelspa/weightdumbbell0001");
        dumbbell2.setOrigin(0.48711340206185566, 0.48214285714285715);

        // hotelspa_bottle3
        const hotelspa_bottle3 = this.add.image(393.75, 519.75, "hotelspa2013", "hotelspa/bottle3");
        hotelspa_bottle3.setOrigin(0, 0);

        // chair1
        const chair1 = this.add.image(1050.75, 657, "hotelspa2013", "hotelspa/chair10001");
        chair1.setOrigin(0, 0);

        // hotelspa_chair10004
        const hotelspa_chair10004 = this.add.image(1050.75, 657, "hotelspa2013", "hotelspa/chair10004");
        hotelspa_chair10004.setOrigin(0, 0);
        hotelspa_chair10004.alpha = 0.0001;
        hotelspa_chair10004.alphaTopLeft = 0.0001;
        hotelspa_chair10004.alphaTopRight = 0.0001;
        hotelspa_chair10004.alphaBottomLeft = 0.0001;
        hotelspa_chair10004.alphaBottomRight = 0.0001;

        // chair2
        const chair2 = this.add.image(1390.5, 675, "hotelspa2013", "hotelspa/chair20001");
        chair2.setOrigin(0, 0);

        // hotelspa_chair20004
        const hotelspa_chair20004 = this.add.image(1390.5, 675, "hotelspa2013", "hotelspa/chair20004");
        hotelspa_chair20004.setOrigin(0, 0);
        hotelspa_chair20004.alpha = 0.0001;
        hotelspa_chair20004.alphaTopLeft = 0.0001;
        hotelspa_chair20004.alphaTopRight = 0.0001;
        hotelspa_chair20004.alphaBottomLeft = 0.0001;
        hotelspa_chair20004.alphaBottomRight = 0.0001;

        // wash1
        const wash1 = this.add.sprite(1118.25, 717.75, "hotelspa2013", "hotelspa/wash0011");
        wash1.setOrigin(0, 0);
        wash1.visible = false;

        // wash2
        const wash2 = this.add.sprite(1602, 733.5, "hotelspa2013", "hotelspa/wash0011");
        wash2.setOrigin(0, 0);
        wash2.flipX = true;
        wash2.visible = false;

        // hotelspa_foreground
        const hotelspa_foreground = this.add.image(-2.25, 884.25, "hotelspa2013", "hotelspa/foreground");
        hotelspa_foreground.setOrigin(0, 0);

        // treadmillbelt1
        const treadmillbelt1 = this.add.sprite(265.84, 847.69, "hotelspa2013", "hotelspa/treadmillbelt0001");
        treadmillbelt1.setOrigin(0.49809, 0.49655);

        // treadmill1
        const treadmill1 = this.add.image(131.4, 633.15, "hotelspa2013", "hotelspa/treadmill0001");
        treadmill1.setOrigin(0, 0);

        // hotelspa_treadmill0003
        const hotelspa_treadmill0003 = this.add.image(131.4, 633.15, "hotelspa2013", "hotelspa/treadmill0003");
        hotelspa_treadmill0003.setOrigin(0, 0);
        hotelspa_treadmill0003.alpha = 0.0001;
        hotelspa_treadmill0003.alphaTopLeft = 0.0001;
        hotelspa_treadmill0003.alphaTopRight = 0.0001;
        hotelspa_treadmill0003.alphaBottomLeft = 0.0001;
        hotelspa_treadmill0003.alphaBottomRight = 0.0001;

        // treadmillover1
        const treadmillover1 = this.add.image(133.2, 635.85, "hotelspa2013", "hotelspa/treadmillover");
        treadmillover1.setOrigin(0, 0);
        treadmillover1.visible = false;

        // treadmillbelt2
        const treadmillbelt2 = this.add.sprite(551.59, 847.69, "hotelspa2013", "hotelspa/treadmillbelt0001");
        treadmillbelt2.setOrigin(0.49809, 0.49655);

        // treadmill2
        const treadmill2 = this.add.image(417.15, 633.15, "hotelspa2013", "hotelspa/treadmill0001");
        treadmill2.setOrigin(0, 0);

        // hotelspa_treadmill_1
        const hotelspa_treadmill_1 = this.add.image(417.15, 633.15, "hotelspa2013", "hotelspa/treadmill0003");
        hotelspa_treadmill_1.setOrigin(0, 0);
        hotelspa_treadmill_1.alpha = 0.0001;
        hotelspa_treadmill_1.alphaTopLeft = 0.0001;
        hotelspa_treadmill_1.alphaTopRight = 0.0001;
        hotelspa_treadmill_1.alphaBottomLeft = 0.0001;
        hotelspa_treadmill_1.alphaBottomRight = 0.0001;

        // treadmillover2
        const treadmillover2 = this.add.image(419.4, 635.4, "hotelspa2013", "hotelspa/treadmillover");
        treadmillover2.setOrigin(0, 0);
        treadmillover2.visible = false;

        // questIcon
        const questIcon = this.add.image(1537.76, 901.35, "hotelspa2013", "hotelspa/quest0001");
        questIcon.setOrigin(0, 0);

        // lists
        const triggers = [hotelspa_elevator_trigger, hotelspa_weight2_trigger, hotelspa_weight1_trigger, hotelspa_aero2_trigger, hotelspa_aero1_trigger, hotelspa_salon1_trigger, tread2_trigger, tread1_trigger, hotelspa_chair2_trigger, hotelspa_chair1_trigger, hotelspa_salon2_trigger];

        // elevatorframe (components)
        const elevatorframeButtonComponent = new ButtonComponent(elevatorframe);
        elevatorframeButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/elevatorframe0001"};
        elevatorframeButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/elevatorframe0002"};
        elevatorframeButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/elevatorframe0003"};
        elevatorframeButtonComponent.handCursor = true;
        elevatorframeButtonComponent.pixelPerfect = true;
        elevatorframeButtonComponent.hitbox = hotelspa_elevatorframe0004;

        // hotelspa_elevator_trigger (components)
        const hotelspa_elevator_triggerContentTrigger = new ContentTrigger(hotelspa_elevator_trigger);
        hotelspa_elevator_triggerContentTrigger.name = "hotelelevator";
        hotelspa_elevator_triggerContentTrigger.importFunction = async () => (await import('@clubpenguin/world/content/hotelelevator/HotelElevator')).default;

        // tread1_trigger (components)
        const tread1_triggerPressureTrigger = new PressureTrigger(tread1_trigger);
        tread1_triggerPressureTrigger.requiresIdle = true;

        // tread2_trigger (components)
        const tread2_triggerPressureTrigger = new PressureTrigger(tread2_trigger);
        tread2_triggerPressureTrigger.requiresIdle = true;

        // hotelspa_couch (components)
        const hotelspa_couchDepthEnabled = new DepthEnabled(hotelspa_couch);
        hotelspa_couchDepthEnabled.automaticSort = false;
        hotelspa_couchDepthEnabled.depth = 398.59;

        // hotelspa_lpillar (components)
        const hotelspa_lpillarDepthEnabled = new DepthEnabled(hotelspa_lpillar);
        hotelspa_lpillarDepthEnabled.automaticSort = false;
        hotelspa_lpillarDepthEnabled.depth = 394.43;

        // hotelspa_rpillar (components)
        const hotelspa_rpillarDepthEnabled = new DepthEnabled(hotelspa_rpillar);
        hotelspa_rpillarDepthEnabled.automaticSort = false;
        hotelspa_rpillarDepthEnabled.depth = 392.18;

        // hotelspa_panel (components)
        const hotelspa_panelDepthEnabled = new DepthEnabled(hotelspa_panel);
        hotelspa_panelDepthEnabled.automaticSort = false;
        hotelspa_panelDepthEnabled.depth = 653.29;

        // hotelspa_shelf (components)
        const hotelspa_shelfDepthEnabled = new DepthEnabled(hotelspa_shelf);
        hotelspa_shelfDepthEnabled.automaticSort = false;
        hotelspa_shelfDepthEnabled.depth = 762.08;

        // salon1 (components)
        const salon1ButtonComponent = new ButtonComponent(salon1);
        salon1ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/salon10001"};
        salon1ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/salon10002"};
        salon1ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/salon10003"};
        salon1ButtonComponent.handCursor = true;
        salon1ButtonComponent.pixelPerfect = true;
        salon1ButtonComponent.hitbox = hotelspa_salon10004;
        const salon1DepthEnabled = new DepthEnabled(salon1);
        salon1DepthEnabled.automaticSort = false;
        salon1DepthEnabled.depth = 405.23;

        // salon2 (components)
        const salon2ButtonComponent = new ButtonComponent(salon2);
        salon2ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/salon20001"};
        salon2ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/salon20002"};
        salon2ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/salon20003"};
        salon2ButtonComponent.handCursor = true;
        salon2ButtonComponent.pixelPerfect = true;
        salon2ButtonComponent.hitbox = hotelspa_salon20004;
        const salon2DepthEnabled = new DepthEnabled(salon2);
        salon2DepthEnabled.automaticSort = false;
        salon2DepthEnabled.depth = 404.89;

        // hotelspa_dumbbell1 (components)
        const hotelspa_dumbbell1DepthEnabled = new DepthEnabled(hotelspa_dumbbell1);
        hotelspa_dumbbell1DepthEnabled.automaticSort = false;
        hotelspa_dumbbell1DepthEnabled.depth = 773.44;

        // hotelspa_railing (components)
        const hotelspa_railingDepthEnabled = new DepthEnabled(hotelspa_railing);
        hotelspa_railingDepthEnabled.automaticSort = false;
        hotelspa_railingDepthEnabled.depth = 750.94;

        // hotelspa_punchbag (components)
        const hotelspa_punchbagDepthEnabled = new DepthEnabled(hotelspa_punchbag);
        hotelspa_punchbagDepthEnabled.automaticSort = false;
        hotelspa_punchbagDepthEnabled.depth = 861.64;

        // scissors1 (components)
        const scissors1DepthEnabled = new DepthEnabled(scissors1);
        scissors1DepthEnabled.automaticSort = false;
        scissors1DepthEnabled.depth = 513.34;

        // scissors2 (components)
        const scissors2DepthEnabled = new DepthEnabled(scissors2);
        scissors2DepthEnabled.automaticSort = false;
        scissors2DepthEnabled.depth = 513.34;

        // hotelspa_dumbbell2 (components)
        const hotelspa_dumbbell2DepthEnabled = new DepthEnabled(hotelspa_dumbbell2);
        hotelspa_dumbbell2DepthEnabled.automaticSort = false;
        hotelspa_dumbbell2DepthEnabled.depth = 994.16;

        // hotelspa_dumbbell3 (components)
        const hotelspa_dumbbell3DepthEnabled = new DepthEnabled(hotelspa_dumbbell3);
        hotelspa_dumbbell3DepthEnabled.automaticSort = false;
        hotelspa_dumbbell3DepthEnabled.depth = 958.16;

        // hotelspa_dumbbell4 (components)
        const hotelspa_dumbbell4DepthEnabled = new DepthEnabled(hotelspa_dumbbell4);
        hotelspa_dumbbell4DepthEnabled.automaticSort = false;
        hotelspa_dumbbell4DepthEnabled.depth = 990.9;

        // hotelspa_dumbbell5 (components)
        const hotelspa_dumbbell5DepthEnabled = new DepthEnabled(hotelspa_dumbbell5);
        hotelspa_dumbbell5DepthEnabled.automaticSort = false;
        hotelspa_dumbbell5DepthEnabled.depth = 416.7;

        // hotelspa_bottle (components)
        const hotelspa_bottleDepthEnabled = new DepthEnabled(hotelspa_bottle);
        hotelspa_bottleDepthEnabled.automaticSort = false;
        hotelspa_bottleDepthEnabled.depth = 425.14;

        // hotelspa_bottle2 (components)
        const hotelspa_bottle2DepthEnabled = new DepthEnabled(hotelspa_bottle2);
        hotelspa_bottle2DepthEnabled.automaticSort = false;
        hotelspa_bottle2DepthEnabled.depth = 931.05;

        // hotelspa_bubbles (components)
        const hotelspa_bubblesDepthEnabled = new DepthEnabled(hotelspa_bubbles);
        hotelspa_bubblesDepthEnabled.automaticSort = false;
        hotelspa_bubblesDepthEnabled.depth = 737.89;

        // hotelspa_aisle (components)
        const hotelspa_aisleDepthEnabled = new DepthEnabled(hotelspa_aisle);
        hotelspa_aisleDepthEnabled.automaticSort = false;
        hotelspa_aisleDepthEnabled.depth = 664.2;

        // hotelspa_cup (components)
        const hotelspa_cupDepthEnabled = new DepthEnabled(hotelspa_cup);
        hotelspa_cupDepthEnabled.automaticSort = false;
        hotelspa_cupDepthEnabled.depth = 441.23;

        // hotelspa_towel (components)
        const hotelspa_towelDepthEnabled = new DepthEnabled(hotelspa_towel);
        hotelspa_towelDepthEnabled.automaticSort = false;
        hotelspa_towelDepthEnabled.depth = 927;

        // exercise1 (components)
        const exercise1DepthEnabled = new DepthEnabled(exercise1);
        exercise1DepthEnabled.automaticSort = false;
        exercise1DepthEnabled.depth = 394.43;
        const exercise1ButtonComponent = new ButtonComponent(exercise1);
        exercise1ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/aero10001"};
        exercise1ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/aero10002"};
        exercise1ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/aero10003"};
        exercise1ButtonComponent.handCursor = true;
        exercise1ButtonComponent.pixelPerfect = true;
        exercise1ButtonComponent.hitbox = hotelspa_aero10004;

        // exercise2 (components)
        const exercise2DepthEnabled = new DepthEnabled(exercise2);
        exercise2DepthEnabled.automaticSort = false;
        exercise2DepthEnabled.depth = 540;
        const exercise2ButtonComponent = new ButtonComponent(exercise2);
        exercise2ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/aero20001"};
        exercise2ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/aero20002"};
        exercise2ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/aero20003"};
        exercise2ButtonComponent.handCursor = true;
        exercise2ButtonComponent.pixelPerfect = true;
        exercise2ButtonComponent.hitbox = hotelspa_aero20004;

        // exercise3 (components)
        const exercise3DepthEnabled = new DepthEnabled(exercise3);
        exercise3DepthEnabled.automaticSort = false;
        exercise3DepthEnabled.depth = 539.44;
        const exercise3ButtonComponent = new ButtonComponent(exercise3);
        exercise3ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/aero30001"};
        exercise3ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/aero30002"};
        exercise3ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/aero30003"};
        exercise3ButtonComponent.handCursor = true;
        exercise3ButtonComponent.pixelPerfect = true;
        exercise3ButtonComponent.hitbox = hotelspa_aero30004;

        // exercise4 (components)
        const exercise4DepthEnabled = new DepthEnabled(exercise4);
        exercise4DepthEnabled.automaticSort = false;
        exercise4DepthEnabled.depth = 632.25;
        const exercise4ButtonComponent = new ButtonComponent(exercise4);
        exercise4ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/aero40001"};
        exercise4ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/aero40002"};
        exercise4ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/aero40003"};
        exercise4ButtonComponent.handCursor = true;
        exercise4ButtonComponent.pixelPerfect = true;
        exercise4ButtonComponent.hitbox = hotelspa_aero40004;

        // dumbbell1 (components)
        new DepthEnabled(dumbbell1);

        // dumbbell2 (components)
        const dumbbell2DepthEnabled = new DepthEnabled(dumbbell2);
        dumbbell2DepthEnabled.automaticSort = false;
        dumbbell2DepthEnabled.depth = 632.25;

        // hotelspa_bottle3 (components)
        const hotelspa_bottle3DepthEnabled = new DepthEnabled(hotelspa_bottle3);
        hotelspa_bottle3DepthEnabled.automaticSort = false;
        hotelspa_bottle3DepthEnabled.depth = 562.61;

        // chair1 (components)
        const chair1ButtonComponent = new ButtonComponent(chair1);
        chair1ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/chair10001"};
        chair1ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/chair10002"};
        chair1ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/chair10003"};
        chair1ButtonComponent.handCursor = true;
        chair1ButtonComponent.pixelPerfect = true;
        chair1ButtonComponent.hitbox = hotelspa_chair10004;
        const chair1DepthEnabled = new DepthEnabled(chair1);
        chair1DepthEnabled.automaticSort = false;
        chair1DepthEnabled.depth = 799.54;

        // chair2 (components)
        const chair2ButtonComponent = new ButtonComponent(chair2);
        chair2ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/chair20001"};
        chair2ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/chair20002"};
        chair2ButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/chair20003"};
        chair2ButtonComponent.handCursor = true;
        chair2ButtonComponent.pixelPerfect = true;
        chair2ButtonComponent.hitbox = hotelspa_chair20004;
        const chair2DepthEnabled = new DepthEnabled(chair2);
        chair2DepthEnabled.automaticSort = false;
        chair2DepthEnabled.depth = 768.15;

        // wash1 (components)
        const wash1DepthEnabled = new DepthEnabled(wash1);
        wash1DepthEnabled.automaticSort = false;
        wash1DepthEnabled.depth = 1080;

        // wash2 (components)
        const wash2DepthEnabled = new DepthEnabled(wash2);
        wash2DepthEnabled.automaticSort = false;
        wash2DepthEnabled.depth = 1080;

        // hotelspa_foreground (components)
        const hotelspa_foregroundDepthEnabled = new DepthEnabled(hotelspa_foreground);
        hotelspa_foregroundDepthEnabled.automaticSort = false;
        hotelspa_foregroundDepthEnabled.depth = 1080;

        // treadmillbelt1 (components)
        const treadmillbelt1DepthEnabled = new DepthEnabled(treadmillbelt1);
        treadmillbelt1DepthEnabled.automaticSort = false;
        treadmillbelt1DepthEnabled.depth = 783.9;

        // treadmill1 (components)
        const treadmill1DepthEnabled = new DepthEnabled(treadmill1);
        treadmill1DepthEnabled.automaticSort = false;
        treadmill1DepthEnabled.depth = 783.9;
        const treadmill1ButtonComponent = new ButtonComponent(treadmill1);
        treadmill1ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/treadmill0001"};
        treadmill1ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/treadmill0002"};
        treadmill1ButtonComponent.handCursor = true;
        treadmill1ButtonComponent.pixelPerfect = true;
        treadmill1ButtonComponent.hitbox = hotelspa_treadmill0003;

        // treadmillover1 (components)
        const treadmillover1DepthEnabled = new DepthEnabled(treadmillover1);
        treadmillover1DepthEnabled.automaticSort = false;
        treadmillover1DepthEnabled.depth = 783.9;

        // treadmillbelt2 (components)
        const treadmillbelt2DepthEnabled = new DepthEnabled(treadmillbelt2);
        treadmillbelt2DepthEnabled.automaticSort = false;
        treadmillbelt2DepthEnabled.depth = 783.9;

        // treadmill2 (components)
        const treadmill2DepthEnabled = new DepthEnabled(treadmill2);
        treadmill2DepthEnabled.automaticSort = false;
        treadmill2DepthEnabled.depth = 783.9;
        const treadmill2ButtonComponent = new ButtonComponent(treadmill2);
        treadmill2ButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/treadmill0001"};
        treadmill2ButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/treadmill0002"};
        treadmill2ButtonComponent.handCursor = true;
        treadmill2ButtonComponent.pixelPerfect = true;
        treadmill2ButtonComponent.hitbox = hotelspa_treadmill_1;

        // treadmillover2 (components)
        const treadmillover2DepthEnabled = new DepthEnabled(treadmillover2);
        treadmillover2DepthEnabled.automaticSort = false;
        treadmillover2DepthEnabled.depth = 783.9;

        // questIcon (components)
        const questIconDepthEnabled = new DepthEnabled(questIcon);
        questIconDepthEnabled.automaticSort = false;
        questIconDepthEnabled.depth = 1080;
        const questIconButtonComponent = new ButtonComponent(questIcon);
        questIconButtonComponent.upTexture = {"key":"hotelspa2013","frame":"hotelspa/quest0001"};
        questIconButtonComponent.overTexture = {"key":"hotelspa2013","frame":"hotelspa/quest0002"};
        questIconButtonComponent.downTexture = {"key":"hotelspa2013","frame":"hotelspa/quest0003"};
        questIconButtonComponent.handCursor = true;
        questIconButtonComponent.pixelPerfect = true;
        questIconButtonComponent.hitbox = hotelspa_quest0004;

        this.elevatordoor = elevatordoor;
        this.elevatorframe = elevatorframe;
        this.block = block;
        this.tread1_trigger = tread1_trigger;
        this.tread2_trigger = tread2_trigger;
        this.salon1 = salon1;
        this.salon2 = salon2;
        this.scissors1 = scissors1;
        this.scissors2 = scissors2;
        this.exercise1 = exercise1;
        this.exercise2 = exercise2;
        this.exercise3 = exercise3;
        this.exercise4 = exercise4;
        this.dumbbell1 = dumbbell1;
        this.dumbbell2 = dumbbell2;
        this.chair1 = chair1;
        this.chair2 = chair2;
        this.wash1 = wash1;
        this.wash2 = wash2;
        this.treadmillbelt1 = treadmillbelt1;
        this.treadmill1 = treadmill1;
        this.treadmillover1 = treadmillover1;
        this.treadmillbelt2 = treadmillbelt2;
        this.treadmill2 = treadmill2;
        this.treadmillover2 = treadmillover2;
        this.questIcon = questIcon;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public elevatordoor!: Phaser.GameObjects.Sprite;
    public elevatorframe!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public tread1_trigger!: Phaser.GameObjects.Image;
    public tread2_trigger!: Phaser.GameObjects.Image;
    public salon1!: Phaser.GameObjects.Image;
    public salon2!: Phaser.GameObjects.Image;
    public scissors1!: Phaser.GameObjects.Sprite;
    public scissors2!: Phaser.GameObjects.Sprite;
    public exercise1!: Phaser.GameObjects.Image;
    public exercise2!: Phaser.GameObjects.Image;
    public exercise3!: Phaser.GameObjects.Image;
    public exercise4!: Phaser.GameObjects.Image;
    public dumbbell1!: Phaser.GameObjects.Sprite;
    public dumbbell2!: Phaser.GameObjects.Sprite;
    public chair1!: Phaser.GameObjects.Image;
    public chair2!: Phaser.GameObjects.Image;
    public wash1!: Phaser.GameObjects.Sprite;
    public wash2!: Phaser.GameObjects.Sprite;
    public treadmillbelt1!: Phaser.GameObjects.Sprite;
    public treadmill1!: Phaser.GameObjects.Image;
    public treadmillover1!: Phaser.GameObjects.Image;
    public treadmillbelt2!: Phaser.GameObjects.Sprite;
    public treadmill2!: Phaser.GameObjects.Image;
    public treadmillover2!: Phaser.GameObjects.Image;
    public questIcon!: Phaser.GameObjects.Image;
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

        this.elevatorframe.on('out', () => {
            if (this.elevatordoor.anims.isPlaying && this.elevatordoor.anims.currentAnim.key == 'hotelspa2013-elevatoropen-animation' && this.elevatordoor.anims.currentFrame.index <= 13) this.elevatordoor.anims.reverse();
            else {
                this.sound.play('hotelspa2013-elevatorclose');
                this.elevatordoor.play('hotelspa2013-elevatorclose-animation');
            }
        });
        this.elevatorframe.on('over', () => {
            if (this.elevatordoor.anims.isPlaying && this.elevatordoor.anims.currentAnim.key == 'hotelspa2013-elevatorclose-animation') this.elevatordoor.anims.reverse();
            else {
                this.sound.play('hotelspa2013-elevatoropen');
                this.elevatordoor.play('hotelspa2013-elevatoropen-animation');
            }
        });
        this.elevatorframe.on('release', () => this.world.move(112.5, 474.75));

        this.treadmill1.on('release', () => this.checkForPuffle() ? this.world.move(198.0, 819.0) : this.world.move(265.5, 819.0));
        this.treadmill2.on('release', () => this.checkForPuffle() ? this.world.move(483.75, 819.0) : this.world.move(562.5, 819.0));

        this.exercise1.on('release', () => this.checkForPuffle() ? this.world.move(461.25, 407.25) : this.world.move(490.5, 407.25));
        this.exercise2.on('release', () => this.checkForPuffle() ? this.world.move(292.5, 551.25) : this.world.move(324.0, 551.25));
        this.exercise3.on('release', () => this.checkForPuffle() ? this.world.move(585.0, 553.5) : this.world.move(625.5, 553.5));
        this.exercise4.on('release', () => this.checkForPuffle() ? this.world.move(396.0, 643.5) : this.world.move(434.25, 643.5));

        this.treadmill1.on('out', () => {
            this.treadmillover1.visible = false;
            this.treadmillbelt1.scale = 1;
            this.treadmillbelt1.setPosition(265.84, 847.69);
        });
        this.treadmill1.on('over', () => {
            this.treadmillover1.visible = true;
            this.treadmillbelt1.scale = 1.05;
            this.treadmillbelt1.setPosition(266.63, 844.09);
        });
        let pressure1 = PressureTrigger.getComponent(this.tread1_trigger);
        pressure1.onActivate = (_, player) => {
            if (!this.treadmillbelt1.anims.isPlaying) {
                this.treadmillbelt1.play('hotelspa2013-treadmill-animation');
                this.sound.play('hotelspa2013-machinebeep');
            }
            if (!this.world.isWalkingPuffle(player.userData)) player.playAnimation(AnimationFrame.WADDLE_UP);
        };
        pressure1.onDeactivate = () => {
            if (this.treadmillbelt1.anims.isPlaying && !pressure1.hasPlayersOn()) {
                this.treadmillbelt1.stop();
                this.treadmillbelt1.setFrame('hotelspa/treadmillbelt0001');
            }
        };

        this.treadmill2.on('out', () => {
            this.treadmillover2.visible = false;
            this.treadmillbelt2.scale = 1;
            this.treadmillbelt2.setPosition(551.59, 847.69);
        });
        this.treadmill2.on('over', () => {
            this.treadmillover2.visible = true;
            this.treadmillbelt2.scale = 1.05;
            this.treadmillbelt2.setPosition(552.38, 844.09);
        });
        let pressure2 = PressureTrigger.getComponent(this.tread2_trigger);
        pressure2.onActivate = (_, player) => {
            if (!this.treadmillbelt2.anims.isPlaying) {
                this.treadmillbelt2.play('hotelspa2013-treadmill-animation');
                this.sound.play('hotelspa2013-machinebeep');
            }
            if (!this.world.isWalkingPuffle(player.userData)) player.playAnimation(AnimationFrame.WADDLE_UP);
        };
        pressure2.onDeactivate = () => {
            if (this.treadmillbelt2.anims.isPlaying && !pressure2.hasPlayersOn()) {
                this.treadmillbelt2.stop();
                this.treadmillbelt2.setFrame('hotelspa/treadmillbelt0001');
            }
        };

        this.exercise3.on('out', () => {
            if (!this.dumbbell1.anims.isPlaying) this.dumbbell1.setFrame('hotelspa/weightdumbbell0001');
        });
        this.exercise3.on('over', () => {
            if (!this.dumbbell1.anims.isPlaying) this.dumbbell1.setFrame('hotelspa/weightdumbbell0002');
        });
        this.exercise4.on('out', () => {
            if (!this.dumbbell2.anims.isPlaying) this.dumbbell2.setFrame('hotelspa/weightdumbbell0001');
        });
        this.exercise4.on('over', () => {
            if (!this.dumbbell2.anims.isPlaying) this.dumbbell2.setFrame('hotelspa/weightdumbbell0002');
        });

        this.chair1.on('release', () => this.world.move(1140.75, 805.5));
        this.chair2.on('release', () => this.world.move(1467.0, 803.25));

        this.salon1.on('release', () => this.world.move(1163.25, 432.0));
        this.salon2.on('release', () => this.world.move(1386.0, 432.0));

        this.treadmillbelt1.on('animationupdate', this.treadmillbeltAnimationUpdate, this);
        this.treadmillbelt2.on('animationupdate', this.treadmillbeltAnimationUpdate, this);
        this.dumbbell1.on('animationupdate', this.dumbbellAnimationUpdate, this);
        this.dumbbell2.on('animationupdate', this.dumbbellAnimationUpdate, this);
        this.scissors1.on('animationupdate', this.scissorsAnimationUpdate, this);
        this.scissors2.on('animationupdate', this.scissorsAnimationUpdate, this);
        this.wash1.on('animationupdate', this.washAnimationUpdate, this);
        this.wash2.on('animationupdate', this.washAnimationUpdate, this);

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    treadmillbeltAnimationUpdate(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index == 2) this.sound.play('hotelspa2013-treadmill');
    }

    dumbbellAnimationUpdate(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index == 2 || frame.index == 20) this.sound.play('hotelspa2013-weightsup');
        else if (frame.index == 31) this.sound.play('hotelspa2013-weightsdown');
    }

    scissorsAnimationUpdate(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index == 2) this.sound.play('hotelspa2013-scissorspopin');
        else if (frame.index == 41) this.sound.play('hotelspa2013-scissorscut1');
        else if (frame.index == 80) this.sound.play('hotelspa2013-scissorscut2');
        else if (frame.index == 113) this.sound.play('hotelspa2013-scissorsclean');
        else if (frame.index == 142) this.sound.play('hotelspa2013-scissorspopout');
    }

    washAnimationUpdate(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index == 2) this.sound.play('hotelspa2013-washpopin');
        else if (frame.index == 30) this.sound.play('hotelspa2013-washfoam');
        else if (frame.index == 49) this.sound.play('hotelspa2013-washpopout');
        else if (frame.index == 90) this.sound.play('hotelspa2013-washpopin');
        else if (frame.index == 116) this.sound.play('hotelspa2013-washspray');
        else if (frame.index == 136) this.sound.play('hotelspa2013-washpopout');
        else if (frame.index == 144) this.sound.play('hotelspa2013-washcomplete');
    }

    checkForPuffle(): boolean {
        return this.world.isWalkingPuffle(this.engine.player.userData);
    }

    localize(locale: Locale): void {

    }

    unload(engine: Engine): void {
        engine.app.locale.unregister(this.localize);
        engine.app.unloadAssetPack('hotelspa2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
