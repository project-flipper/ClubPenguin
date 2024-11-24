
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/components/ButtonComponent";
import DepthEnabled from "../../../../lib/components/DepthEnabled";
import ContentTrigger from "../../../../lib/components/ContentTrigger";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine,  Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class HotelLobby extends Phaser.Scene implements Room {

    constructor() {
        super("HotelLobby");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("hotellobby2013-pack", "assets/world/rooms/2013/hotellobby/hotellobby2013-pack.json");
    }

    editorCreate(): void {

        // hotellobby_base
        const hotellobby_base = this.add.image(-117, 74.25, "hotellobby2013", "hotellobby/base");
        hotellobby_base.setOrigin(0, 0);

        // hotellobby_plazadoor0004
        const hotellobby_plazadoor0004 = this.add.image(759.71, 66.15, "hotellobby2013", "hotellobby/plazadoor0004");
        hotellobby_plazadoor0004.setOrigin(0, 0);
        hotellobby_plazadoor0004.alpha = 0.0001;
        hotellobby_plazadoor0004.alphaTopLeft = 0.0001;
        hotellobby_plazadoor0004.alphaTopRight = 0.0001;
        hotellobby_plazadoor0004.alphaBottomLeft = 0.0001;
        hotellobby_plazadoor0004.alphaBottomRight = 0.0001;

        // plazadoor
        const plazadoor = this.add.image(759.71, 66.15, "hotellobby2013", "hotellobby/plazadoor0001");
        plazadoor.setOrigin(0, 0);

        // hotellobby_overbase
        const hotellobby_overbase = this.add.image(-137.25, -72, "hotellobby2013", "hotellobby/overbase");
        hotellobby_overbase.setOrigin(0, 0);

        // hotellobby_coatwall
        const hotellobby_coatwall = this.add.image(1057.5, -60.75, "hotellobby2013", "hotellobby/coatwall");
        hotellobby_coatwall.setOrigin(0, 0);

        // hotellobby_railingsupport
        const hotellobby_railingsupport = this.add.image(1113.75, 544.5, "hotellobby2013", "hotellobby/railingsupport");
        hotellobby_railingsupport.setOrigin(0, 0);

        // hotellobby_railingsupport_1
        const hotellobby_railingsupport_1 = this.add.image(1046.25, 517.5, "hotellobby2013", "hotellobby/railingsupport");
        hotellobby_railingsupport_1.setOrigin(0, 0);

        // hotellobby_railingsupport_2
        const hotellobby_railingsupport_2 = this.add.image(981, 501.75, "hotellobby2013", "hotellobby/railingsupport");
        hotellobby_railingsupport_2.setOrigin(0, 0);

        // hotellobby_railingsupport_3
        const hotellobby_railingsupport_3 = this.add.image(787, 501.75, "hotellobby2013", "hotellobby/railingsupport");
        hotellobby_railingsupport_3.setOrigin(0, 0);
        hotellobby_railingsupport_3.flipX = true;

        // hotellobby_railingsupport_4
        const hotellobby_railingsupport_4 = this.add.image(721.75, 517.5, "hotellobby2013", "hotellobby/railingsupport");
        hotellobby_railingsupport_4.setOrigin(0, 0);
        hotellobby_railingsupport_4.flipX = true;

        // hotellobby_railingsupport_5
        const hotellobby_railingsupport_5 = this.add.image(654.25, 544.5, "hotellobby2013", "hotellobby/railingsupport");
        hotellobby_railingsupport_5.setOrigin(0, 0);
        hotellobby_railingsupport_5.flipX = true;

        // hotellobby_mainrailing
        const hotellobby_mainrailing = this.add.image(576, 488.25, "hotellobby2013", "hotellobby/mainrailing");
        hotellobby_mainrailing.setOrigin(0, 0);

        // hotellobby_statue
        const hotellobby_statue = this.add.image(767.25, 454.5, "hotellobby2013", "hotellobby/statue");
        hotellobby_statue.setOrigin(0, 0);

        // hotellobby_fountain0001
        const hotellobby_fountain0001 = this.add.sprite(915.53, 561.38, "hotellobby2013", "hotellobby/fountain0001");
        hotellobby_fountain0001.setOrigin(0, 0);
        hotellobby_fountain0001.play("hotellobby2013-fountain-animation");

        // hotellobby_boardhover0004
        const hotellobby_boardhover0004 = this.add.image(715.5, 468, "hotellobby2013", "hotellobby/boardhover0004");
        hotellobby_boardhover0004.setOrigin(0, 0);
        hotellobby_boardhover0004.alpha = 0.0001;
        hotellobby_boardhover0004.alphaTopLeft = 0.0001;
        hotellobby_boardhover0004.alphaTopRight = 0.0001;
        hotellobby_boardhover0004.alphaBottomLeft = 0.0001;
        hotellobby_boardhover0004.alphaBottomRight = 0.0001;

        // board
        const board = this.add.sprite(708.75, 621.23, "hotellobby2013", "hotellobby/board0001");
        board.setOrigin(0, 0);

        // hotellobby_coatwallalt
        const hotellobby_coatwallalt = this.add.image(1388.25, 137.25, "hotellobby2013", "hotellobby/coatwallalt");
        hotellobby_coatwallalt.setOrigin(0, 0);

        // hotellobby_coatext
        const hotellobby_coatext = this.add.image(1082.25, -15.75, "hotellobby2013", "hotellobby/coatext");
        hotellobby_coatext.setOrigin(0, 0);

        // hotellobby_coat
        const hotellobby_coat = this.add.image(1167.75, 20.25, "hotellobby2013", "hotellobby/coat");
        hotellobby_coat.setOrigin(0, 0);

        // coatsign
        const coatsign = this.add.image(1206.34, 92.14, "hotellobby2013", "hotellobby/coatsign0001");
        coatsign.setOrigin(0, 0);

        // hotellobby_rightflare1
        const hotellobby_rightflare1 = this.add.image(1138.5, 24.75, "hotellobby2013", "hotellobby/rightflare1");
        hotellobby_rightflare1.setOrigin(0, 0);

        // hotellobby_rightflare2
        const hotellobby_rightflare2 = this.add.image(1353.49, -21.6, "hotellobby2013", "hotellobby/rightflare2");
        hotellobby_rightflare2.setOrigin(0, 0);

        // hotellobby_petdoor0004
        const hotellobby_petdoor0004 = this.add.image(1578.94, 229.61, "hotellobby2013", "hotellobby/petdoor0004");
        hotellobby_petdoor0004.setOrigin(0, 0);
        hotellobby_petdoor0004.alpha = 0.0001;
        hotellobby_petdoor0004.alphaTopLeft = 0.0001;
        hotellobby_petdoor0004.alphaTopRight = 0.0001;
        hotellobby_petdoor0004.alphaBottomLeft = 0.0001;
        hotellobby_petdoor0004.alphaBottomRight = 0.0001;

        // hotellobby_petdoorside
        const hotellobby_petdoorside = this.add.image(1509.75, 213.75, "hotellobby2013", "hotellobby/petdoorside");
        hotellobby_petdoorside.setOrigin(0, 0);

        // petdoor
        const petdoor = this.add.image(1578.94, 229.61, "hotellobby2013", "hotellobby/petdoor0001");
        petdoor.setOrigin(0, 0);

        // hotellobby_petfront
        const hotellobby_petfront = this.add.image(1455.75, 4.5, "hotellobby2013", "hotellobby/petfront");
        hotellobby_petfront.setOrigin(0, 0);

        // petsign
        const petsign = this.add.image(1465.43, 159.53, "hotellobby2013", "hotellobby/petsign0001");
        petsign.setOrigin(0, 0);

        // hotellobby_petflower
        const hotellobby_petflower = this.add.image(1640.25, 495, "hotellobby2013", "hotellobby/petflower");
        hotellobby_petflower.setOrigin(0, 0);

        // hotellobby_leftwall
        const hotellobby_leftwall = this.add.image(-114.75, -18, "hotellobby2013", "hotellobby/leftwall");
        hotellobby_leftwall.setOrigin(0, 0);

        // hotellobby_receptionwall
        const hotellobby_receptionwall = this.add.image(571.5, 81, "hotellobby2013", "hotellobby/receptionwall");
        hotellobby_receptionwall.setOrigin(0, 0);

        // hotellobby_reception0001
        const hotellobby_reception0001 = this.add.image(177.75, 27, "hotellobby2013", "hotellobby/reception");
        hotellobby_reception0001.setOrigin(0, 0);

        // receptionsign
        const receptionsign = this.add.image(235.91, 96.3, "hotellobby2013", "hotellobby/receptionsign0001");
        receptionsign.setOrigin(0, 0);

        // hotellobby_leftflare1
        const hotellobby_leftflare1 = this.add.image(99, -9, "hotellobby2013", "hotellobby/leftflare1");
        hotellobby_leftflare1.setOrigin(0, 0);

        // hotellobby_leftflare2
        const hotellobby_leftflare2 = this.add.image(99, -9, "hotellobby2013", "hotellobby/leftflare2");
        hotellobby_leftflare2.setOrigin(0, 0);

        // elevatorbutton
        const elevatorbutton = this.add.image(-87.75, 186.75, "hotellobby2013", "hotellobby/elevatorhover0004");
        elevatorbutton.setOrigin(0, 0);
        elevatorbutton.alpha = 0.0001;
        elevatorbutton.alphaTopLeft = 0.0001;
        elevatorbutton.alphaTopRight = 0.0001;
        elevatorbutton.alphaBottomLeft = 0.0001;
        elevatorbutton.alphaBottomRight = 0.0001;

        // elevatordoor
        const elevatordoor = this.add.sprite(-105.97, 235.69, "hotellobby2013", "hotellobby/elevatordoor0001");
        elevatordoor.setOrigin(0, 0);

        // hotellobby_elevatorframe
        const hotellobby_elevatorframe = this.add.image(-128.25, 63, "hotellobby2013", "hotellobby/elevatorframe");
        hotellobby_elevatorframe.setOrigin(0, 0);

        // hotellobby_sign
        const hotellobby_sign = this.add.image(135, 567, "hotellobby2013", "hotellobby/sign");
        hotellobby_sign.setOrigin(0, 0);

        // hotellobby_counter
        const hotellobby_counter = this.add.image(-137.25, 567, "hotellobby2013", "hotellobby/counter");
        hotellobby_counter.setOrigin(0, 0);

        // hotellobby_box
        const hotellobby_box = this.add.image(-49.5, 821.25, "hotellobby2013", "hotellobby/box");
        hotellobby_box.setOrigin(0, 0);

        // hotellobby_fruittop
        const hotellobby_fruittop = this.add.image(-18, 958.5, "hotellobby2013", "hotellobby/fruittop");
        hotellobby_fruittop.setOrigin(0, 0);

        // hotellobby_fruitbottom
        const hotellobby_fruitbottom = this.add.image(31.5, 1010.25, "hotellobby2013", "hotellobby/fruitbottom");
        hotellobby_fruitbottom.setOrigin(0, 0);

        // hotellobby_couch
        const hotellobby_couch = this.add.image(632.25, 882, "hotellobby2013", "hotellobby/couch");
        hotellobby_couch.setOrigin(0, 0);

        // hotellobby_leftflower
        const hotellobby_leftflower = this.add.image(704.25, 112.5, "hotellobby2013", "hotellobby/leftflower");
        hotellobby_leftflower.setOrigin(0, 0);

        // hotellobby_rightflower
        const hotellobby_rightflower = this.add.image(969.75, 110.25, "hotellobby2013", "hotellobby/rightflower");
        hotellobby_rightflower.setOrigin(0, 0);

        // hotellobby_leftpillar
        const hotellobby_leftpillar = this.add.image(598.5, -22.5, "hotellobby2013", "hotellobby/leftpillar");
        hotellobby_leftpillar.setOrigin(0, 0);

        // hotellobby_rightpillar
        const hotellobby_rightpillar = this.add.image(990, -22.5, "hotellobby2013", "hotellobby/rightpillar");
        hotellobby_rightpillar.setOrigin(0, 0);

        // hotellobby_receptiondoor
        const hotellobby_receptiondoor = this.add.image(373.5, 247.5, "hotellobby2013", "hotellobby/receptiondoor");
        hotellobby_receptiondoor.setOrigin(0, 0);

        // hotellobby_receptiondesk
        const hotellobby_receptiondesk = this.add.image(315, 204.75, "hotellobby2013", "hotellobby/receptiondesk");
        hotellobby_receptiondesk.setOrigin(0, 0);

        // hotellobby_lamp
        const hotellobby_lamp = this.add.image(1577.25, 823.5, "hotellobby2013", "hotellobby/lamp");
        hotellobby_lamp.setOrigin(0, 0);

        // hotellobby_lrail1
        const hotellobby_lrail1 = this.add.image(384.75, 668.25, "hotellobby2013", "hotellobby/lrail1");
        hotellobby_lrail1.setOrigin(0, 0);

        // hotellobby_chair10004
        const hotellobby_chair10004 = this.add.image(276.53, 671.85, "hotellobby2013", "hotellobby/chair10004");
        hotellobby_chair10004.setOrigin(0, 0);
        hotellobby_chair10004.alpha = 0.0001;
        hotellobby_chair10004.alphaTopLeft = 0.0001;
        hotellobby_chair10004.alphaTopRight = 0.0001;
        hotellobby_chair10004.alphaBottomLeft = 0.0001;
        hotellobby_chair10004.alphaBottomRight = 0.0001;

        // chair1
        const chair1 = this.add.image(276.53, 671.85, "hotellobby2013", "hotellobby/chair10001");
        chair1.setOrigin(0, 0);

        // hotellobby_lrail2
        const hotellobby_lrail2 = this.add.image(436.5, 720, "hotellobby2013", "hotellobby/lrail2");
        hotellobby_lrail2.setOrigin(0, 0);

        // table1
        const table1 = this.add.image(273.71, 743.85, "hotellobby2013", "hotellobby/table10001");
        table1.setOrigin(0, 0);

        // chair2
        const chair2 = this.add.image(338.51, 797.06, "hotellobby2013", "hotellobby/chair20001");
        chair2.setOrigin(0, 0);

        // hotellobby_chair20004
        const hotellobby_chair20004 = this.add.image(338.51, 797.06, "hotellobby2013", "hotellobby/chair20004");
        hotellobby_chair20004.setOrigin(0, 0);
        hotellobby_chair20004.alpha = 0.0001;
        hotellobby_chair20004.alphaTopLeft = 0.0001;
        hotellobby_chair20004.alphaTopRight = 0.0001;
        hotellobby_chair20004.alphaBottomLeft = 0.0001;
        hotellobby_chair20004.alphaBottomRight = 0.0001;

        // table2
        const table2 = this.add.image(335.25, 873.11, "hotellobby2013", "hotellobby/table20001");
        table2.setOrigin(0, 0);

        // hotellobby_lrail3
        const hotellobby_lrail3 = this.add.image(443.25, 765, "hotellobby2013", "hotellobby/lrail3");
        hotellobby_lrail3.setOrigin(0, 0);

        // hotellobby_lrail4
        const hotellobby_lrail4 = this.add.image(508.5, 733.5, "hotellobby2013", "hotellobby/lrail4");
        hotellobby_lrail4.setOrigin(0, 0);

        // hotellobby_lrail5
        const hotellobby_lrail5 = this.add.image(566, 855, "hotellobby2013", "hotellobby/lrail5");
        hotellobby_lrail5.setOrigin(0, 0);

        // hotellobby_rrail1
        const hotellobby_rrail1 = this.add.image(1298.25, 668.25, "hotellobby2013", "hotellobby/rrail1");
        hotellobby_rrail1.setOrigin(0, 0);

        // hotellobby_rrail2
        const hotellobby_rrail2 = this.add.image(1233, 720, "hotellobby2013", "hotellobby/rrail2");
        hotellobby_rrail2.setOrigin(0, 0);

        // hotellobby_rrail3
        const hotellobby_rrail3 = this.add.image(1167.75, 765, "hotellobby2013", "hotellobby/rrail3");
        hotellobby_rrail3.setOrigin(0, 0);

        // hotellobby_rrail4
        const hotellobby_rrail4 = this.add.image(1140.75, 810, "hotellobby2013", "hotellobby/rrail4");
        hotellobby_rrail4.setOrigin(0, 0);

        // hotellobby_rrail5
        const hotellobby_rrail5 = this.add.image(1138.5, 855, "hotellobby2013", "hotellobby/rrail5");
        hotellobby_rrail5.setOrigin(0, 0);

        // bed2
        const bed2 = this.add.image(1447.88, 703.24, "hotellobby2013", "hotellobby/bed20001");
        bed2.setOrigin(0, 0);

        // hotellobby_bed20004
        const hotellobby_bed20004 = this.add.image(1447.88, 703.24, "hotellobby2013", "hotellobby/bed20004");
        hotellobby_bed20004.setOrigin(0, 0);
        hotellobby_bed20004.alpha = 0.0001;
        hotellobby_bed20004.alphaTopLeft = 0.0001;
        hotellobby_bed20004.alphaTopRight = 0.0001;
        hotellobby_bed20004.alphaBottomLeft = 0.0001;
        hotellobby_bed20004.alphaBottomRight = 0.0001;

        // bed1
        const bed1 = this.add.image(1278.56, 822.71, "hotellobby2013", "hotellobby/bed10001");
        bed1.setOrigin(0, 0);

        // hotellobby_bed10004
        const hotellobby_bed10004 = this.add.image(1278.56, 822.71, "hotellobby2013", "hotellobby/bed10004");
        hotellobby_bed10004.setOrigin(0, 0);
        hotellobby_bed10004.alpha = 0.0001;
        hotellobby_bed10004.alphaTopLeft = 0.0001;
        hotellobby_bed10004.alphaTopRight = 0.0001;
        hotellobby_bed10004.alphaBottomLeft = 0.0001;
        hotellobby_bed10004.alphaBottomRight = 0.0001;

        // hotellobby_elevator_trigger
        const hotellobby_elevator_trigger = this.add.image(-42.75, 535.5, "hotellobby2013", "hotellobby/elevator_trigger");
        hotellobby_elevator_trigger.setOrigin(0, 0);
        hotellobby_elevator_trigger.visible = false;

        // hotellobby_plaza_trigger
        const hotellobby_plaza_trigger = this.add.image(760.5, 315, "hotellobby2013", "hotellobby/plaza_trigger");
        hotellobby_plaza_trigger.setOrigin(0, 0);
        hotellobby_plaza_trigger.visible = false;

        // hotellobby_pet_trigger
        const hotellobby_pet_trigger = this.add.image(1532.25, 483.75, "hotellobby2013", "hotellobby/pet_trigger");
        hotellobby_pet_trigger.setOrigin(0, 0);
        hotellobby_pet_trigger.visible = false;

        // hotellobby_chair1_trigger
        const hotellobby_chair1_trigger = this.add.image(375.75, 848.25, "hotellobby2013", "hotellobby/chair1_trigger");
        hotellobby_chair1_trigger.setOrigin(0, 0);
        hotellobby_chair1_trigger.visible = false;

        // hotellobby_chair2_trigger
        const hotellobby_chair2_trigger = this.add.image(299.25, 717.75, "hotellobby2013", "hotellobby/chair2_trigger");
        hotellobby_chair2_trigger.setOrigin(0, 0);
        hotellobby_chair2_trigger.visible = false;

        // hotellobby_bed1_trigger
        const hotellobby_bed1_trigger = this.add.image(1334.25, 868.5, "hotellobby2013", "hotellobby/bed1_trigger");
        hotellobby_bed1_trigger.setOrigin(0, 0);
        hotellobby_bed1_trigger.visible = false;

        // hotellobby_bed2_trigger
        const hotellobby_bed2_trigger = this.add.image(1496.25, 740.25, "hotellobby2013", "hotellobby/bed2_trigger");
        hotellobby_bed2_trigger.setOrigin(0, 0);
        hotellobby_bed2_trigger.visible = false;

        // hotellobby_foreground
        const hotellobby_foreground = this.add.image(-119.5, -13.5, "hotellobby2013", "hotellobby/foreground");
        hotellobby_foreground.setOrigin(0, 0);

        // block
        const block = this.add.image(-108, 0, "hotellobby2013", "hotellobby/block");
        block.setOrigin(0, 0);
        block.alpha = 0.0001;
        block.alphaTopLeft = 0.0001;
        block.alphaTopRight = 0.0001;
        block.alphaBottomLeft = 0.0001;
        block.alphaBottomRight = 0.0001;

        // questIcon
        const questIcon = this.add.image(1537.76, 901.35, "hotellobby2013", "hotellobby/quest0001");
        questIcon.setOrigin(0, 0);

        // hotellobby_quest0004
        const hotellobby_quest0004 = this.add.image(1537.76, 901.35, "hotellobby2013", "hotellobby/quest0004");
        hotellobby_quest0004.setOrigin(0, 0);
        hotellobby_quest0004.alpha = 0.0001;
        hotellobby_quest0004.alphaTopLeft = 0.0001;
        hotellobby_quest0004.alphaTopRight = 0.0001;
        hotellobby_quest0004.alphaBottomLeft = 0.0001;
        hotellobby_quest0004.alphaBottomRight = 0.0001;

        // smoothie1
        const smoothie1 = this.add.sprite(301.84, 704.36, "hotellobby2013", "hotellobby/smoothie0002");
        smoothie1.setOrigin(0, 0);
        smoothie1.visible = false;

        // smoothie2
        const smoothie2 = this.add.sprite(379.13, 851.74, "hotellobby2013", "hotellobby/smoothie0002");
        smoothie2.setOrigin(0, 0);
        smoothie2.visible = false;

        // lists
        const triggers = [hotellobby_elevator_trigger, hotellobby_plaza_trigger, hotellobby_pet_trigger, hotellobby_chair1_trigger, hotellobby_chair2_trigger, hotellobby_bed1_trigger, hotellobby_bed2_trigger];

        // plazadoor (components)
        const plazadoorButtonComponent = new ButtonComponent(plazadoor);
        plazadoorButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/plazadoor0001"};
        plazadoorButtonComponent.overTexture = {"key":"hotellobby2013","frame":"hotellobby/plazadoor0002"};
        plazadoorButtonComponent.downTexture = {"key":"hotellobby2013","frame":"hotellobby/plazadoor0003"};
        plazadoorButtonComponent.handCursor = true;
        plazadoorButtonComponent.pixelPerfect = true;
        plazadoorButtonComponent.hitbox = hotellobby_plazadoor0004;

        // hotellobby_coatwall (components)
        const hotellobby_coatwallDepthEnabled = new DepthEnabled(hotellobby_coatwall);
        hotellobby_coatwallDepthEnabled.automaticSort = false;
        hotellobby_coatwallDepthEnabled.depth = 322.31;

        // hotellobby_railingsupport (components)
        const hotellobby_railingsupportDepthEnabled = new DepthEnabled(hotellobby_railingsupport);
        hotellobby_railingsupportDepthEnabled.automaticSort = false;
        hotellobby_railingsupportDepthEnabled.depth = 579.49;

        // hotellobby_railingsupport_1 (components)
        const hotellobby_railingsupport_1DepthEnabled = new DepthEnabled(hotellobby_railingsupport_1);
        hotellobby_railingsupport_1DepthEnabled.automaticSort = false;
        hotellobby_railingsupport_1DepthEnabled.depth = 553.61;

        // hotellobby_railingsupport_2 (components)
        const hotellobby_railingsupport_2DepthEnabled = new DepthEnabled(hotellobby_railingsupport_2);
        hotellobby_railingsupport_2DepthEnabled.automaticSort = false;
        hotellobby_railingsupport_2DepthEnabled.depth = 538.31;

        // hotellobby_railingsupport_3 (components)
        const hotellobby_railingsupport_3DepthEnabled = new DepthEnabled(hotellobby_railingsupport_3);
        hotellobby_railingsupport_3DepthEnabled.automaticSort = false;
        hotellobby_railingsupport_3DepthEnabled.depth = 538.31;

        // hotellobby_railingsupport_4 (components)
        const hotellobby_railingsupport_4DepthEnabled = new DepthEnabled(hotellobby_railingsupport_4);
        hotellobby_railingsupport_4DepthEnabled.automaticSort = false;
        hotellobby_railingsupport_4DepthEnabled.depth = 553.61;

        // hotellobby_railingsupport_5 (components)
        const hotellobby_railingsupport_5DepthEnabled = new DepthEnabled(hotellobby_railingsupport_5);
        hotellobby_railingsupport_5DepthEnabled.automaticSort = false;
        hotellobby_railingsupport_5DepthEnabled.depth = 579.49;

        // hotellobby_mainrailing (components)
        const hotellobby_mainrailingDepthEnabled = new DepthEnabled(hotellobby_mainrailing);
        hotellobby_mainrailingDepthEnabled.automaticSort = false;
        hotellobby_mainrailingDepthEnabled.depth = 632.48;

        // hotellobby_statue (components)
        const hotellobby_statueDepthEnabled = new DepthEnabled(hotellobby_statue);
        hotellobby_statueDepthEnabled.automaticSort = false;
        hotellobby_statueDepthEnabled.depth = 703.13;

        // hotellobby_fountain0001 (components)
        const hotellobby_fountain0001DepthEnabled = new DepthEnabled(hotellobby_fountain0001);
        hotellobby_fountain0001DepthEnabled.automaticSort = false;
        hotellobby_fountain0001DepthEnabled.depth = 703.13;

        // board (components)
        const boardButtonComponent = new ButtonComponent(board);
        boardButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/board0001"};
        boardButtonComponent.handCursor = true;
        boardButtonComponent.pixelPerfect = true;
        boardButtonComponent.hitbox = hotellobby_boardhover0004;
        const boardDepthEnabled = new DepthEnabled(board);
        boardDepthEnabled.automaticSort = false;
        boardDepthEnabled.depth = 810.23;

        // hotellobby_coatwallalt (components)
        const hotellobby_coatwallaltDepthEnabled = new DepthEnabled(hotellobby_coatwallalt);
        hotellobby_coatwallaltDepthEnabled.automaticSort = false;
        hotellobby_coatwallaltDepthEnabled.depth = 318.6;

        // hotellobby_coatext (components)
        const hotellobby_coatextDepthEnabled = new DepthEnabled(hotellobby_coatext);
        hotellobby_coatextDepthEnabled.automaticSort = false;
        hotellobby_coatextDepthEnabled.depth = 389.36;

        // hotellobby_coat (components)
        const hotellobby_coatDepthEnabled = new DepthEnabled(hotellobby_coat);
        hotellobby_coatDepthEnabled.automaticSort = false;
        hotellobby_coatDepthEnabled.depth = 389.36;

        // coatsign (components)
        const coatsignDepthEnabled = new DepthEnabled(coatsign);
        coatsignDepthEnabled.automaticSort = false;
        coatsignDepthEnabled.depth = 389.36;

        // hotellobby_rightflare1 (components)
        const hotellobby_rightflare1DepthEnabled = new DepthEnabled(hotellobby_rightflare1);
        hotellobby_rightflare1DepthEnabled.automaticSort = false;
        hotellobby_rightflare1DepthEnabled.depth = 389.36;

        // hotellobby_rightflare2 (components)
        const hotellobby_rightflare2DepthEnabled = new DepthEnabled(hotellobby_rightflare2);
        hotellobby_rightflare2DepthEnabled.automaticSort = false;
        hotellobby_rightflare2DepthEnabled.depth = 389.36;

        // hotellobby_petdoorside (components)
        const hotellobby_petdoorsideDepthEnabled = new DepthEnabled(hotellobby_petdoorside);
        hotellobby_petdoorsideDepthEnabled.automaticSort = false;
        hotellobby_petdoorsideDepthEnabled.depth = 441.79;

        // petdoor (components)
        const petdoorButtonComponent = new ButtonComponent(petdoor);
        petdoorButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/petdoor0001"};
        petdoorButtonComponent.overTexture = {"key":"hotellobby2013","frame":"hotellobby/petdoor0002"};
        petdoorButtonComponent.downTexture = {"key":"hotellobby2013","frame":"hotellobby/petdoor0003"};
        petdoorButtonComponent.handCursor = true;
        petdoorButtonComponent.pixelPerfect = true;
        petdoorButtonComponent.hitbox = hotellobby_petdoor0004;
        const petdoorDepthEnabled = new DepthEnabled(petdoor);
        petdoorDepthEnabled.automaticSort = false;
        petdoorDepthEnabled.depth = 441.79;

        // hotellobby_petfront (components)
        const hotellobby_petfrontDepthEnabled = new DepthEnabled(hotellobby_petfront);
        hotellobby_petfrontDepthEnabled.automaticSort = false;
        hotellobby_petfrontDepthEnabled.depth = 548.78;

        // petsign (components)
        const petsignDepthEnabled = new DepthEnabled(petsign);
        petsignDepthEnabled.automaticSort = false;
        petsignDepthEnabled.depth = 548.78;

        // hotellobby_petflower (components)
        const hotellobby_petflowerDepthEnabled = new DepthEnabled(hotellobby_petflower);
        hotellobby_petflowerDepthEnabled.automaticSort = false;
        hotellobby_petflowerDepthEnabled.depth = 593.1;

        // hotellobby_leftwall (components)
        const hotellobby_leftwallDepthEnabled = new DepthEnabled(hotellobby_leftwall);
        hotellobby_leftwallDepthEnabled.automaticSort = false;
        hotellobby_leftwallDepthEnabled.depth = 454.95;

        // hotellobby_receptionwall (components)
        const hotellobby_receptionwallDepthEnabled = new DepthEnabled(hotellobby_receptionwall);
        hotellobby_receptionwallDepthEnabled.automaticSort = false;
        hotellobby_receptionwallDepthEnabled.depth = 387;

        // hotellobby_reception0001 (components)
        const hotellobby_reception0001DepthEnabled = new DepthEnabled(hotellobby_reception0001);
        hotellobby_reception0001DepthEnabled.automaticSort = false;
        hotellobby_reception0001DepthEnabled.depth = 454.95;

        // receptionsign (components)
        const receptionsignDepthEnabled = new DepthEnabled(receptionsign);
        receptionsignDepthEnabled.automaticSort = false;
        receptionsignDepthEnabled.depth = 454.95;

        // hotellobby_leftflare1 (components)
        const hotellobby_leftflare1DepthEnabled = new DepthEnabled(hotellobby_leftflare1);
        hotellobby_leftflare1DepthEnabled.automaticSort = false;
        hotellobby_leftflare1DepthEnabled.depth = 454.95;

        // hotellobby_leftflare2 (components)
        const hotellobby_leftflare2DepthEnabled = new DepthEnabled(hotellobby_leftflare2);
        hotellobby_leftflare2DepthEnabled.automaticSort = false;
        hotellobby_leftflare2DepthEnabled.depth = 454.95;

        // elevatordoor (components)
        const elevatordoorButtonComponent = new ButtonComponent(elevatordoor);
        elevatordoorButtonComponent.handCursor = true;
        elevatordoorButtonComponent.pixelPerfect = true;
        elevatordoorButtonComponent.hitbox = elevatorbutton;
        const elevatordoorDepthEnabled = new DepthEnabled(elevatordoor);
        elevatordoorDepthEnabled.automaticSort = false;
        elevatordoorDepthEnabled.depth = 496.69;

        // hotellobby_elevatorframe (components)
        const hotellobby_elevatorframeDepthEnabled = new DepthEnabled(hotellobby_elevatorframe);
        hotellobby_elevatorframeDepthEnabled.automaticSort = false;
        hotellobby_elevatorframeDepthEnabled.depth = 496.69;

        // hotellobby_sign (components)
        const hotellobby_signDepthEnabled = new DepthEnabled(hotellobby_sign);
        hotellobby_signDepthEnabled.automaticSort = false;
        hotellobby_signDepthEnabled.depth = 647.66;

        // hotellobby_counter (components)
        const hotellobby_counterDepthEnabled = new DepthEnabled(hotellobby_counter);
        hotellobby_counterDepthEnabled.automaticSort = false;
        hotellobby_counterDepthEnabled.depth = 787.16;

        // hotellobby_box (components)
        const hotellobby_boxDepthEnabled = new DepthEnabled(hotellobby_box);
        hotellobby_boxDepthEnabled.automaticSort = false;
        hotellobby_boxDepthEnabled.depth = 934.76;

        // hotellobby_fruittop (components)
        const hotellobby_fruittopDepthEnabled = new DepthEnabled(hotellobby_fruittop);
        hotellobby_fruittopDepthEnabled.automaticSort = false;
        hotellobby_fruittopDepthEnabled.depth = 988.54;

        // hotellobby_fruitbottom (components)
        const hotellobby_fruitbottomDepthEnabled = new DepthEnabled(hotellobby_fruitbottom);
        hotellobby_fruitbottomDepthEnabled.automaticSort = false;
        hotellobby_fruitbottomDepthEnabled.depth = 1026.79;

        // hotellobby_couch (components)
        const hotellobby_couchDepthEnabled = new DepthEnabled(hotellobby_couch);
        hotellobby_couchDepthEnabled.automaticSort = false;
        hotellobby_couchDepthEnabled.depth = 920.93;

        // hotellobby_leftflower (components)
        const hotellobby_leftflowerDepthEnabled = new DepthEnabled(hotellobby_leftflower);
        hotellobby_leftflowerDepthEnabled.automaticSort = false;
        hotellobby_leftflowerDepthEnabled.depth = 363.15;

        // hotellobby_rightflower (components)
        const hotellobby_rightflowerDepthEnabled = new DepthEnabled(hotellobby_rightflower);
        hotellobby_rightflowerDepthEnabled.automaticSort = false;
        hotellobby_rightflowerDepthEnabled.depth = 371.7;

        // hotellobby_leftpillar (components)
        const hotellobby_leftpillarDepthEnabled = new DepthEnabled(hotellobby_leftpillar);
        hotellobby_leftpillarDepthEnabled.automaticSort = false;
        hotellobby_leftpillarDepthEnabled.depth = 406.46;

        // hotellobby_rightpillar (components)
        const hotellobby_rightpillarDepthEnabled = new DepthEnabled(hotellobby_rightpillar);
        hotellobby_rightpillarDepthEnabled.automaticSort = false;
        hotellobby_rightpillarDepthEnabled.depth = 406.46;

        // hotellobby_receptiondoor (components)
        const hotellobby_receptiondoorDepthEnabled = new DepthEnabled(hotellobby_receptiondoor);
        hotellobby_receptiondoorDepthEnabled.automaticSort = false;
        hotellobby_receptiondoorDepthEnabled.depth = 335.14;

        // hotellobby_receptiondesk (components)
        const hotellobby_receptiondeskDepthEnabled = new DepthEnabled(hotellobby_receptiondesk);
        hotellobby_receptiondeskDepthEnabled.automaticSort = false;
        hotellobby_receptiondeskDepthEnabled.depth = 409.61;

        // hotellobby_lamp (components)
        const hotellobby_lampDepthEnabled = new DepthEnabled(hotellobby_lamp);
        hotellobby_lampDepthEnabled.automaticSort = false;
        hotellobby_lampDepthEnabled.depth = 974.81;

        // hotellobby_lrail1 (components)
        const hotellobby_lrail1DepthEnabled = new DepthEnabled(hotellobby_lrail1);
        hotellobby_lrail1DepthEnabled.automaticSort = false;
        hotellobby_lrail1DepthEnabled.depth = 720.34;

        // chair1 (components)
        const chair1DepthEnabled = new DepthEnabled(chair1);
        chair1DepthEnabled.automaticSort = false;
        chair1DepthEnabled.depth = 721.35;
        const chair1ButtonComponent = new ButtonComponent(chair1);
        chair1ButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/chair10001"};
        chair1ButtonComponent.overTexture = {"key":"hotellobby2013","frame":"hotellobby/chair10002"};
        chair1ButtonComponent.downTexture = {"key":"hotellobby2013","frame":"hotellobby/chair10003"};
        chair1ButtonComponent.handCursor = true;
        chair1ButtonComponent.pixelPerfect = true;
        chair1ButtonComponent.hitbox = hotellobby_chair10004;

        // hotellobby_lrail2 (components)
        const hotellobby_lrail2DepthEnabled = new DepthEnabled(hotellobby_lrail2);
        hotellobby_lrail2DepthEnabled.automaticSort = false;
        hotellobby_lrail2DepthEnabled.depth = 761.29;

        // table1 (components)
        const table1DepthEnabled = new DepthEnabled(table1);
        table1DepthEnabled.automaticSort = false;
        table1DepthEnabled.depth = 835.99;

        // chair2 (components)
        const chair2DepthEnabled = new DepthEnabled(chair2);
        chair2DepthEnabled.automaticSort = false;
        chair2DepthEnabled.depth = 851.06;
        const chair2ButtonComponent = new ButtonComponent(chair2);
        chair2ButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/chair20001"};
        chair2ButtonComponent.overTexture = {"key":"hotellobby2013","frame":"hotellobby/chair20002"};
        chair2ButtonComponent.downTexture = {"key":"hotellobby2013","frame":"hotellobby/chair20003"};
        chair2ButtonComponent.handCursor = true;
        chair2ButtonComponent.pixelPerfect = true;
        chair2ButtonComponent.hitbox = hotellobby_chair20004;

        // table2 (components)
        const table2DepthEnabled = new DepthEnabled(table2);
        table2DepthEnabled.automaticSort = false;
        table2DepthEnabled.depth = 987.86;

        // hotellobby_lrail3 (components)
        const hotellobby_lrail3DepthEnabled = new DepthEnabled(hotellobby_lrail3);
        hotellobby_lrail3DepthEnabled.automaticSort = false;
        hotellobby_lrail3DepthEnabled.depth = 800.1;

        // hotellobby_lrail4 (components)
        const hotellobby_lrail4DepthEnabled = new DepthEnabled(hotellobby_lrail4);
        hotellobby_lrail4DepthEnabled.automaticSort = false;
        hotellobby_lrail4DepthEnabled.depth = 843.98;

        // hotellobby_lrail5 (components)
        const hotellobby_lrail5DepthEnabled = new DepthEnabled(hotellobby_lrail5);
        hotellobby_lrail5DepthEnabled.automaticSort = false;
        hotellobby_lrail5DepthEnabled.depth = 888.98;

        // hotellobby_rrail1 (components)
        const hotellobby_rrail1DepthEnabled = new DepthEnabled(hotellobby_rrail1);
        hotellobby_rrail1DepthEnabled.automaticSort = false;
        hotellobby_rrail1DepthEnabled.depth = 719.1;

        // hotellobby_rrail2 (components)
        const hotellobby_rrail2DepthEnabled = new DepthEnabled(hotellobby_rrail2);
        hotellobby_rrail2DepthEnabled.automaticSort = false;
        hotellobby_rrail2DepthEnabled.depth = 761.29;

        // hotellobby_rrail3 (components)
        const hotellobby_rrail3DepthEnabled = new DepthEnabled(hotellobby_rrail3);
        hotellobby_rrail3DepthEnabled.automaticSort = false;
        hotellobby_rrail3DepthEnabled.depth = 800.1;

        // hotellobby_rrail4 (components)
        const hotellobby_rrail4DepthEnabled = new DepthEnabled(hotellobby_rrail4);
        hotellobby_rrail4DepthEnabled.automaticSort = false;
        hotellobby_rrail4DepthEnabled.depth = 843.98;

        // hotellobby_rrail5 (components)
        const hotellobby_rrail5DepthEnabled = new DepthEnabled(hotellobby_rrail5);
        hotellobby_rrail5DepthEnabled.automaticSort = false;
        hotellobby_rrail5DepthEnabled.depth = 888.98;

        // bed2 (components)
        const bed2DepthEnabled = new DepthEnabled(bed2);
        bed2DepthEnabled.automaticSort = false;
        bed2DepthEnabled.depth = 734.74;
        const bed2ButtonComponent = new ButtonComponent(bed2);
        bed2ButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/bed20001"};
        bed2ButtonComponent.overTexture = {"key":"hotellobby2013","frame":"hotellobby/bed20002"};
        bed2ButtonComponent.downTexture = {"key":"hotellobby2013","frame":"hotellobby/bed20003"};
        bed2ButtonComponent.handCursor = true;
        bed2ButtonComponent.pixelPerfect = true;
        bed2ButtonComponent.hitbox = hotellobby_bed20004;

        // bed1 (components)
        const bed1DepthEnabled = new DepthEnabled(bed1);
        bed1DepthEnabled.automaticSort = false;
        bed1DepthEnabled.depth = 860.96;
        const bed1ButtonComponent = new ButtonComponent(bed1);
        bed1ButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/bed10001"};
        bed1ButtonComponent.overTexture = {"key":"hotellobby2013","frame":"hotellobby/bed10002"};
        bed1ButtonComponent.downTexture = {"key":"hotellobby2013","frame":"hotellobby/bed10003"};
        bed1ButtonComponent.handCursor = true;
        bed1ButtonComponent.pixelPerfect = true;
        bed1ButtonComponent.hitbox = hotellobby_bed10004;

        // hotellobby_elevator_trigger (components)
        const hotellobby_elevator_triggerContentTrigger = new ContentTrigger(hotellobby_elevator_trigger);
        hotellobby_elevator_triggerContentTrigger.name = "hotelelevator";
        hotellobby_elevator_triggerContentTrigger.importFunction = async () => (await import('@clubpenguin/world/content/hotelelevator/HotelElevator')).default;

        // hotellobby_plaza_trigger (components)
        const hotellobby_plaza_triggerRoomTrigger = new RoomTrigger(hotellobby_plaza_trigger);
        hotellobby_plaza_triggerRoomTrigger.destination = 300;
        hotellobby_plaza_triggerRoomTrigger.playerX = 641.25;
        hotellobby_plaza_triggerRoomTrigger.playerY = 585;

        // hotellobby_pet_trigger (components)
        const hotellobby_pet_triggerRoomTrigger = new RoomTrigger(hotellobby_pet_trigger);
        hotellobby_pet_triggerRoomTrigger.destination = 310;
        hotellobby_pet_triggerRoomTrigger.playerX = 236.25;
        hotellobby_pet_triggerRoomTrigger.playerY = 810;

        // hotellobby_foreground (components)
        const hotellobby_foregroundDepthEnabled = new DepthEnabled(hotellobby_foreground);
        hotellobby_foregroundDepthEnabled.automaticSort = false;
        hotellobby_foregroundDepthEnabled.depth = 1080;

        // questIcon (components)
        const questIconButtonComponent = new ButtonComponent(questIcon);
        questIconButtonComponent.upTexture = {"key":"hotellobby2013","frame":"hotellobby/quest0001"};
        questIconButtonComponent.overTexture = {"key":"hotellobby2013","frame":"hotellobby/quest0002"};
        questIconButtonComponent.downTexture = {"key":"hotellobby2013","frame":"hotellobby/quest0003"};
        questIconButtonComponent.handCursor = true;
        questIconButtonComponent.pixelPerfect = true;
        questIconButtonComponent.hitbox = hotellobby_quest0004;
        const questIconDepthEnabled = new DepthEnabled(questIcon);
        questIconDepthEnabled.automaticSort = false;
        questIconDepthEnabled.depth = 1080;

        // smoothie1 (components)
        const smoothie1DepthEnabled = new DepthEnabled(smoothie1);
        smoothie1DepthEnabled.automaticSort = false;
        smoothie1DepthEnabled.depth = 835.99;

        // smoothie2 (components)
        const smoothie2DepthEnabled = new DepthEnabled(smoothie2);
        smoothie2DepthEnabled.automaticSort = false;
        smoothie2DepthEnabled.depth = 987.86;

        this.plazadoor = plazadoor;
        this.board = board;
        this.coatsign = coatsign;
        this.petdoor = petdoor;
        this.petsign = petsign;
        this.receptionsign = receptionsign;
        this.elevatordoor = elevatordoor;
        this.chair1 = chair1;
        this.table1 = table1;
        this.chair2 = chair2;
        this.table2 = table2;
        this.bed2 = bed2;
        this.bed1 = bed1;
        this.block = block;
        this.questIcon = questIcon;
        this.smoothie1 = smoothie1;
        this.smoothie2 = smoothie2;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public plazadoor!: Phaser.GameObjects.Image;
    public board!: Phaser.GameObjects.Sprite;
    public coatsign!: Phaser.GameObjects.Image;
    public petdoor!: Phaser.GameObjects.Image;
    public petsign!: Phaser.GameObjects.Image;
    public receptionsign!: Phaser.GameObjects.Image;
    public elevatordoor!: Phaser.GameObjects.Sprite;
    public chair1!: Phaser.GameObjects.Image;
    public table1!: Phaser.GameObjects.Image;
    public chair2!: Phaser.GameObjects.Image;
    public table2!: Phaser.GameObjects.Image;
    public bed2!: Phaser.GameObjects.Image;
    public bed1!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public questIcon!: Phaser.GameObjects.Image;
    public smoothie1!: Phaser.GameObjects.Sprite;
    public smoothie2!: Phaser.GameObjects.Sprite;
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

        this.plazadoor.on('out', () => this.sound.play('hotellobby2013-doorclose'));
        this.plazadoor.on('over', () => this.sound.play('hotellobby2013-dooropen'));
        this.plazadoor.on('release', () => this.world.move(877.5, 337.5));

        this.petdoor.on('out', () => this.sound.play('hotellobby2013-petdoorclose'));
        this.petdoor.on('over', () => this.sound.play('hotellobby2013-petdooropen'));
        this.petdoor.on('release', () => this.world.move(1608.75, 517.5));

        this.elevatordoor.on('out', () => {
            if (this.elevatordoor.anims.isPlaying && this.elevatordoor.anims.currentAnim.key == 'hotellobby2013-elevatoropen-animation' && this.elevatordoor.anims.currentFrame.index <= 13) this.elevatordoor.anims.reverse();
            else {
                this.sound.play('hotellobby2013-elevatorclose');
                this.elevatordoor.play('hotellobby2013-elevatorclose-animation');
            }
        });
        this.elevatordoor.on('over', () => {
            if (this.elevatordoor.anims.isPlaying && this.elevatordoor.anims.currentAnim.key == 'hotellobby2013-elevatorclose-animation') this.elevatordoor.anims.reverse();
            else {
                this.sound.play('hotellobby2013-elevatoropen');
                this.elevatordoor.play('hotellobby2013-elevatoropen-animation');
            }
        });
        this.elevatordoor.on('release', () => this.world.move(101.25, 573.75));

        this.board.on('animationupdate', this.boardAnimationUpdate, this);
        this.board.on('over', () => {
            this.board.play('hotellobby2013-board-animation');
        });
        this.board.on('out', () => {
            this.board.stop();
        });
        this.board.on('release', this.openQuest, this);

        this.chair1.on('out', () => this.table1.setFrame('hotellobby/table10001'));
        this.chair1.on('over', () => this.table1.setFrame('hotellobby/table10002'));
        this.chair1.on('release', () => this.world.move(333.0, 740.25));

        this.chair2.on('out', () => this.table2.setFrame('hotellobby/table20001'));
        this.chair2.on('over', () => this.table2.setFrame('hotellobby/table20002'));
        this.chair2.on('release', () => this.world.move(411.75, 870.75));

        this.bed1.on('release', () => this.world.move(1368.0, 891.0));
        this.bed2.on('release', () => this.world.move(1530.0, 762.75));

        this.smoothie1.on('animationupdate', this.smoothieAnimationUpdate, this);
        this.smoothie2.on('animationupdate', this.smoothieAnimationUpdate, this);

        this.questIcon.on('release', this.openQuest, this);

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    openQuest(): void {
        //this.interface.loadContent('pufflequest', async () => (await import('@clubpenguin/world/content/pufflequest/PuffleQuest')).default);
    }

    smoothieAnimationUpdate(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index == 2) this.sound.play('hotellobby2013-popin');
        else if (frame.index == 14) this.sound.play('hotellobby2013-slurp');
        else if (frame.index == 44) this.sound.play('hotellobby2013-popout');
    }

    boardAnimationUpdate(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        if (frame.index == 3) this.sound.play('hotellobby2013-questhover');
    }

    localize(locale: Locale): void {
        this.receptionsign.setFrame(`hotellobby/receptionsign${locale.frame}`);
        this.coatsign.setFrame(`hotellobby/coatsign${locale.frame}`);
        this.petsign.setFrame(`hotellobby/petsign${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('hotellobby2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
