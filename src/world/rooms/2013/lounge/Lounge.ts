
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import TargetGame from "./prefabs/TargetGame";
import TargetGameScreen from "./prefabs/TargetGameScreen";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import GameTrigger from "../../../../lib/components/GameTrigger";
import SnowballTrigger from "../../../../lib/components/SnowballTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Lounge extends Phaser.Scene implements Room {

    constructor() {
        super("Lounge");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("lounge-pack", "assets/world/rooms/2013/lounge/lounge-pack.json");
    }

    editorCreate(): void {

        // dancefloor
        const dancefloor = this.add.sprite(627.975, 801.1125, "lounge", "lounge/dancefloor0001");
        dancefloor.setOrigin(0, 0);

        // penguin1
        const penguin1 = this.add.sprite(756.225, 893.1375, "lounge", "lounge/penguin0001");
        penguin1.setOrigin(0.5069863, 0.54971831);

        // penguin2
        const penguin2 = this.add.sprite(846.3375, 875.7, "lounge", "lounge/penguin0001");
        penguin2.setOrigin(0.5069863, 0.54971831);

        // penguin3
        const penguin3 = this.add.sprite(894.15, 905.5125, "lounge", "lounge/penguin0001");
        penguin3.setOrigin(0.5069863, 0.54971831);

        // penguin4
        const penguin4 = this.add.sprite(945.225, 882.225, "lounge", "lounge/penguin0001");
        penguin4.setOrigin(0.5069863, 0.54971831);

        // penguin5
        const penguin5 = this.add.sprite(928.125, 959.175, "lounge", "lounge/penguin0001");
        penguin5.setOrigin(0.5069863, 0.54971831);

        // penguin6
        const penguin6 = this.add.sprite(803.475, 941.4, "lounge", "lounge/penguin0001");
        penguin6.setOrigin(0.5069863, 0.54971831);

        // lounge_base
        const lounge_base = this.add.image(-21.0375, -7.5375, "lounge", "lounge/base");
        lounge_base.setOrigin(0, 0);

        // lounge_stairsrailing
        const lounge_stairsrailing = this.add.image(1449.3375, 601.65, "lounge", "lounge/stairsrailing");
        lounge_stairsrailing.setOrigin(0, 0);

        // targetGame
        const targetGame = new TargetGame(this, 583.0875, 133.5375);
        this.add.existing(targetGame);

        // speaker1
        const speaker1 = this.add.sprite(257.4, 9.7875, "lounge", "lounge/speaker10001");
        speaker1.setOrigin(0, 0);

        // speaker2
        const speaker2 = this.add.sprite(1330.7625, 9.7875, "lounge", "lounge/speaker20001");
        speaker2.setOrigin(0, 0);

        // lounge_foreground1
        const lounge_foreground1 = this.add.image(366.525, -70.9875, "lounge", "lounge/foreground1");
        lounge_foreground1.setOrigin(0, 0);

        // lounge_foreground2
        const lounge_foreground2 = this.add.image(1055.7, -76.05, "lounge", "lounge/foreground2");
        lounge_foreground2.setOrigin(0, 0);

        // lounge_brokenmachine
        const lounge_brokenmachine = this.add.image(405, 429.75, "lounge", "lounge/brokenmachine");
        lounge_brokenmachine.setOrigin(0.461195219123506, 0.779571865443425);

        // bitslight
        const bitslight = this.add.image(177.3875, 399.9125, "lounge", "lounge/bits_lightoff");
        bitslight.setOrigin(0, 0);

        // bitsscreen
        const bitsscreen = this.add.sprite(222.9375, 395.6375, "lounge", "lounge/bits_idle0001");
        bitsscreen.setOrigin(0, 0);

        // bitsmachine
        const bitsmachine = this.add.image(136.35, 278.55, "lounge", "lounge/bitsmachine0001");
        bitsmachine.setOrigin(0, 0);

        // lounge_bitschair
        const lounge_bitschair = this.add.image(322.3125, 532.125, "lounge", "lounge/bitschair");
        lounge_bitschair.setOrigin(0, 0);

        // thinicescreen
        const thinicescreen = this.add.sprite(1290, 270, "lounge", "lounge/thinice_idle0001");
        thinicescreen.setOrigin(0, 0);

        // thinicelight
        const thinicelight = this.add.image(1407, 255, "lounge", "lounge/thinice_lightoff");
        thinicelight.setOrigin(0, 0);

        // thinicemachine
        const thinicemachine = this.add.image(1198.4625, 159.6375, "lounge", "lounge/thinicemachine0001");
        thinicemachine.setOrigin(0, 0);

        // lounge_thinicechair
        const lounge_thinicechair = this.add.image(1208.8125, 409.1625, "lounge", "lounge/thinicechair");
        lounge_thinicechair.setOrigin(0, 0);

        // astroscreen
        const astroscreen = this.add.sprite(1344.2625, 358.425, "lounge", "lounge/astro_idle0001");
        astroscreen.setOrigin(0, 0);

        // astrolight
        const astrolight = this.add.image(1511, 416, "lounge", "lounge/astro_lightoff");
        astrolight.setOrigin(0, 0);

        // astromachine
        const astromachine = this.add.image(1306.0125, 308.3625, "lounge", "lounge/astromachine0001");
        astromachine.setOrigin(0, 0);

        // lounge_astrochair
        const lounge_astrochair = this.add.image(1306.35, 502.9875, "lounge", "lounge/astrochair");
        lounge_astrochair.setOrigin(0, 0);

        // vendingmachine
        const vendingmachine = this.add.image(65.3625, 684.1125, "lounge", "lounge/vendingmachine0001");
        vendingmachine.setOrigin(0.25953488, 0.74514706);

        // lounge_bin
        const lounge_bin = this.add.image(29.5875, 756.7875, "lounge", "lounge/bin");
        lounge_bin.setOrigin(0.416027397260274, 0.7460919540229884);

        // lounge_chair1_1
        const lounge_chair1_1 = this.add.image(386.325, 791.1, "lounge", "lounge/chair1_1");
        lounge_chair1_1.setOrigin(0.5557425742574258, 0.4392517006802721);

        // lounge_chair1_2
        const lounge_chair1_2 = this.add.image(464.2875, 935.1, "lounge", "lounge/chair1_2");
        lounge_chair1_2.setOrigin(0.5687640449438202, 0.16670588235294118);

        // lounge_chairback1_2
        const lounge_chairback1_2 = this.add.image(485.1, 1005.8625, "lounge", "lounge/chairback1_2");
        lounge_chairback1_2.setOrigin(0.3687037, 0.82916084);

        // lounge_chair1_3
        const lounge_chair1_3 = this.add.image(222.3, 967.725, "lounge", "lounge/chair1_3");
        lounge_chair1_3.setOrigin(0.47835164835164834, 0.19444444444444445);

        // lounge_chairback1_3
        const lounge_chairback1_3 = this.add.image(194.0625, 1023.4125, "lounge", "lounge/chairback1_3");
        lounge_chairback1_3.setOrigin(0.4750588235294118, 0.6648360655737705);

        // lounge_chair1_4
        const lounge_chair1_4 = this.add.image(173.475, 846.675, "lounge", "lounge/chair1_4");
        lounge_chair1_4.setOrigin(0.47837838, 0.41429577);

        // lounge_table1
        const lounge_table1 = this.add.image(307.2375, 963.45, "lounge", "lounge/table1");
        lounge_table1.setOrigin(0.48987342, 0.94621622);

        // lounge_railing
        const lounge_railing = this.add.image(647.4375, 407.3625, "lounge", "lounge/railing");
        lounge_railing.setOrigin(0, 0);

        // lounge_chair2_1
        const lounge_chair2_1 = this.add.image(1286.325, 737.6625, "lounge", "lounge/chair2_1");
        lounge_chair2_1.setOrigin(0, 0);

        // lounge_chair2_2
        const lounge_chair2_2 = this.add.image(1479.4875, 796.5, "lounge", "lounge/chair2_2");
        lounge_chair2_2.setOrigin(0, 0);

        // lounge_chair2_3
        const lounge_chair2_3 = this.add.image(1448.1, 943.7625, "lounge", "lounge/chair2_3");
        lounge_chair2_3.setOrigin(0, 0);

        // lounge_chair2_4
        const lounge_chair2_4 = this.add.image(1218.375, 924.6375, "lounge", "lounge/chair2_4");
        lounge_chair2_4.setOrigin(0, 0);

        // lounge_table2
        const lounge_table2 = this.add.image(1290.4875, 802.8, "lounge", "lounge/table2");
        lounge_table2.setOrigin(0, 0);

        // lounge_chairback2_3
        const lounge_chairback2_3 = this.add.image(1479.4875, 934.0875, "lounge", "lounge/chairback2_3");
        lounge_chairback2_3.setOrigin(0, 0);

        // lounge_chairback2_4
        const lounge_chairback2_4 = this.add.image(1202.0625, 891, "lounge", "lounge/chairback2_4");
        lounge_chairback2_4.setOrigin(0, 0);

        // screen
        const screen = new TargetGameScreen(this, 858.375, 61.0875);
        this.add.existing(screen);

        // lounge_dance_trigger
        const lounge_dance_trigger = this.add.image(1455.4125, 680.7375, "lounge", "lounge/dance_trigger");
        lounge_dance_trigger.setOrigin(0, 0);
        lounge_dance_trigger.visible = false;

        // bitsbutton
        const bitsbutton = this.add.image(222, 396, "lounge", "lounge/bits_button");
        bitsbutton.setOrigin(0, 0);
        bitsbutton.alpha = 0.01;
        bitsbutton.alphaTopLeft = 0.01;
        bitsbutton.alphaTopRight = 0.01;
        bitsbutton.alphaBottomLeft = 0.01;
        bitsbutton.alphaBottomRight = 0.01;

        // astrobutton
        const astrobutton = this.add.image(1356, 375, "lounge", "lounge/astro_button");
        astrobutton.setOrigin(0, 0);
        astrobutton.alpha = 0.01;
        astrobutton.alphaTopLeft = 0.01;
        astrobutton.alphaTopRight = 0.01;
        astrobutton.alphaBottomLeft = 0.01;
        astrobutton.alphaBottomRight = 0.01;

        // thinicebutton
        const thinicebutton = this.add.image(1290, 268, "lounge", "lounge/thinice_button");
        thinicebutton.setOrigin(0, 0);
        thinicebutton.alpha = 0.01;
        thinicebutton.alphaTopLeft = 0.01;
        thinicebutton.alphaTopRight = 0.01;
        thinicebutton.alphaBottomLeft = 0.01;
        thinicebutton.alphaBottomRight = 0.01;

        // bits_trigger
        const bits_trigger = this.add.image(328.95, 560.8125, "lounge", "lounge/bits_trigger");
        bits_trigger.visible = false;

        // astro_trigger
        const astro_trigger = this.add.image(1383.3, 519.1875, "lounge", "lounge/astro_trigger");
        astro_trigger.visible = false;

        // thinice_trigger
        const thinice_trigger = this.add.image(1272.2625, 433.2375, "lounge", "lounge/thinice_trigger");
        thinice_trigger.visible = false;

        // chairbutton11
        const chairbutton11 = this.add.image(371.7, 802.35, "lounge", "lounge/chairbutton1_1");
        chairbutton11.alpha = 0.01;
        chairbutton11.alphaTopLeft = 0.01;
        chairbutton11.alphaTopRight = 0.01;
        chairbutton11.alphaBottomLeft = 0.01;
        chairbutton11.alphaBottomRight = 0.01;

        // chairbutton12
        const chairbutton12 = this.add.image(457.2, 954.1125, "lounge", "lounge/chairbutton1_2");
        chairbutton12.alpha = 0.01;
        chairbutton12.alphaTopLeft = 0.01;
        chairbutton12.alphaTopRight = 0.01;
        chairbutton12.alphaBottomLeft = 0.01;
        chairbutton12.alphaBottomRight = 0.01;

        // chairbutton13
        const chairbutton13 = this.add.image(217.2375, 987.1875, "lounge", "lounge/chairbutton1_3");
        chairbutton13.alpha = 0.01;
        chairbutton13.alphaTopLeft = 0.01;
        chairbutton13.alphaTopRight = 0.01;
        chairbutton13.alphaBottomLeft = 0.01;
        chairbutton13.alphaBottomRight = 0.01;

        // chairbutton14
        const chairbutton14 = this.add.image(184.6125, 861.3, "lounge", "lounge/chairbutton1_4");
        chairbutton14.alpha = 0.01;
        chairbutton14.alphaTopLeft = 0.01;
        chairbutton14.alphaTopRight = 0.01;
        chairbutton14.alphaBottomLeft = 0.01;
        chairbutton14.alphaBottomRight = 0.01;

        // chairbutton21
        const chairbutton21 = this.add.image(1341.45, 813.4875, "lounge", "lounge/chairbutton2_1");
        chairbutton21.alpha = 0.01;
        chairbutton21.alphaTopLeft = 0.01;
        chairbutton21.alphaTopRight = 0.01;
        chairbutton21.alphaBottomLeft = 0.01;
        chairbutton21.alphaBottomRight = 0.01;

        // chairbutton22
        const chairbutton22 = this.add.image(1522.125, 869.9625, "lounge", "lounge/chairbutton2_2");
        chairbutton22.alpha = 0.01;
        chairbutton22.alphaTopLeft = 0.01;
        chairbutton22.alphaTopRight = 0.01;
        chairbutton22.alphaBottomLeft = 0.01;
        chairbutton22.alphaBottomRight = 0.01;

        // chairbutton23
        const chairbutton23 = this.add.image(1496.5875, 978.975, "lounge", "lounge/chairbutton2_3");
        chairbutton23.alpha = 0.01;
        chairbutton23.alphaTopLeft = 0.01;
        chairbutton23.alphaTopRight = 0.01;
        chairbutton23.alphaBottomLeft = 0.01;
        chairbutton23.alphaBottomRight = 0.01;

        // chairbutton24
        const chairbutton24 = this.add.image(1259.6625, 957.825, "lounge", "lounge/chairbutton2_4");
        chairbutton24.alpha = 0.01;
        chairbutton24.alphaTopLeft = 0.01;
        chairbutton24.alphaTopRight = 0.01;
        chairbutton24.alphaBottomLeft = 0.01;
        chairbutton24.alphaBottomRight = 0.01;

        // block
        const block = this.add.image(0, 0, "lounge", "lounge/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // snowballblock
        const snowballblock = this.add.image(607.05, 167.625, "lounge", "lounge/snowballblock");
        snowballblock.setOrigin(0, 0);
        snowballblock.visible = false;

        // lists
        const triggers = [lounge_dance_trigger, snowballblock, bits_trigger, thinice_trigger, astro_trigger];

        // lounge_stairsrailing (components)
        const lounge_stairsrailingDepthEnabled = new DepthEnabled(lounge_stairsrailing);
        lounge_stairsrailingDepthEnabled.automaticSort = false;
        lounge_stairsrailingDepthEnabled.depth = 314.1;

        // targetGame (components)
        const targetGameDepthEnabled = new DepthEnabled(targetGame);
        targetGameDepthEnabled.automaticSort = false;
        targetGameDepthEnabled.depth = 192.9;

        // lounge_brokenmachine (components)
        new DepthEnabled(lounge_brokenmachine);

        // bitsmachine (components)
        const bitsmachineDepthEnabled = new DepthEnabled(bitsmachine);
        bitsmachineDepthEnabled.automaticSort = false;
        bitsmachineDepthEnabled.depth = 459.675;

        // lounge_bitschair (components)
        const lounge_bitschairDepthEnabled = new DepthEnabled(lounge_bitschair);
        lounge_bitschairDepthEnabled.automaticSort = false;
        lounge_bitschairDepthEnabled.depth = 533.8125;

        // thinicemachine (components)
        const thinicemachineDepthEnabled = new DepthEnabled(thinicemachine);
        thinicemachineDepthEnabled.automaticSort = false;
        thinicemachineDepthEnabled.depth = 345.9375;

        // lounge_thinicechair (components)
        const lounge_thinicechairDepthEnabled = new DepthEnabled(lounge_thinicechair);
        lounge_thinicechairDepthEnabled.automaticSort = false;
        lounge_thinicechairDepthEnabled.depth = 417.6;

        // astroscreen (components)
        const astroscreenDepthEnabled = new DepthEnabled(astroscreen);
        astroscreenDepthEnabled.automaticSort = false;
        astroscreenDepthEnabled.depth = 434.925;

        // astrolight (components)
        const astrolightDepthEnabled = new DepthEnabled(astrolight);
        astrolightDepthEnabled.automaticSort = false;
        astrolightDepthEnabled.depth = 434.925;

        // astromachine (components)
        const astromachineDepthEnabled = new DepthEnabled(astromachine);
        astromachineDepthEnabled.automaticSort = false;
        astromachineDepthEnabled.depth = 434.925;

        // lounge_astrochair (components)
        const lounge_astrochairDepthEnabled = new DepthEnabled(lounge_astrochair);
        lounge_astrochairDepthEnabled.automaticSort = false;
        lounge_astrochairDepthEnabled.depth = 510.75;

        // vendingmachine (components)
        new DepthEnabled(vendingmachine);

        // lounge_bin (components)
        new DepthEnabled(lounge_bin);

        // lounge_chair1_1 (components)
        new DepthEnabled(lounge_chair1_1);

        // lounge_chair1_2 (components)
        new DepthEnabled(lounge_chair1_2);

        // lounge_chairback1_2 (components)
        new DepthEnabled(lounge_chairback1_2);

        // lounge_chair1_3 (components)
        new DepthEnabled(lounge_chair1_3);

        // lounge_chairback1_3 (components)
        new DepthEnabled(lounge_chairback1_3);

        // lounge_chair1_4 (components)
        new DepthEnabled(lounge_chair1_4);

        // lounge_table1 (components)
        new DepthEnabled(lounge_table1);

        // lounge_railing (components)
        const lounge_railingDepthEnabled = new DepthEnabled(lounge_railing);
        lounge_railingDepthEnabled.automaticSort = false;
        lounge_railingDepthEnabled.depth = 524.8125;

        // lounge_chair2_1 (components)
        const lounge_chair2_1DepthEnabled = new DepthEnabled(lounge_chair2_1);
        lounge_chair2_1DepthEnabled.automaticSort = false;
        lounge_chair2_1DepthEnabled.depth = 802.2375;

        // lounge_chair2_2 (components)
        const lounge_chair2_2DepthEnabled = new DepthEnabled(lounge_chair2_2);
        lounge_chair2_2DepthEnabled.automaticSort = false;
        lounge_chair2_2DepthEnabled.depth = 855.3375;

        // lounge_chair2_3 (components)
        const lounge_chair2_3DepthEnabled = new DepthEnabled(lounge_chair2_3);
        lounge_chair2_3DepthEnabled.automaticSort = false;
        lounge_chair2_3DepthEnabled.depth = 959.5125;

        // lounge_chair2_4 (components)
        const lounge_chair2_4DepthEnabled = new DepthEnabled(lounge_chair2_4);
        lounge_chair2_4DepthEnabled.automaticSort = false;
        lounge_chair2_4DepthEnabled.depth = 938.8125;

        // lounge_table2 (components)
        const lounge_table2DepthEnabled = new DepthEnabled(lounge_table2);
        lounge_table2DepthEnabled.automaticSort = false;
        lounge_table2DepthEnabled.depth = 961.2;

        // lounge_chairback2_3 (components)
        const lounge_chairback2_3DepthEnabled = new DepthEnabled(lounge_chairback2_3);
        lounge_chairback2_3DepthEnabled.automaticSort = false;
        lounge_chairback2_3DepthEnabled.depth = 1015.2;

        // lounge_chairback2_4 (components)
        const lounge_chairback2_4DepthEnabled = new DepthEnabled(lounge_chairback2_4);
        lounge_chairback2_4DepthEnabled.automaticSort = false;
        lounge_chairback2_4DepthEnabled.depth = 1009.575;

        // screen (components)
        const screenDepthEnabled = new DepthEnabled(screen);
        screenDepthEnabled.automaticSort = false;
        screenDepthEnabled.depth = 1080;

        // lounge_dance_trigger (components)
        const lounge_dance_triggerRoomTrigger = new RoomTrigger(lounge_dance_trigger);
        lounge_dance_triggerRoomTrigger.destination = 120;
        lounge_dance_triggerRoomTrigger.playerX = 1541.25;
        lounge_dance_triggerRoomTrigger.playerY = 652.5;

        // bitsbutton (components)
        const bitsbuttonButtonComponent = new ButtonComponent(bitsbutton);
        bitsbuttonButtonComponent.handCursor = true;
        bitsbuttonButtonComponent.pixelPerfect = true;

        // astrobutton (components)
        const astrobuttonButtonComponent = new ButtonComponent(astrobutton);
        astrobuttonButtonComponent.handCursor = true;
        astrobuttonButtonComponent.pixelPerfect = true;

        // thinicebutton (components)
        const thinicebuttonButtonComponent = new ButtonComponent(thinicebutton);
        thinicebuttonButtonComponent.handCursor = true;
        thinicebuttonButtonComponent.pixelPerfect = true;

        // bits_trigger (components)
        const bits_triggerGameTrigger = new GameTrigger(bits_trigger);
        bits_triggerGameTrigger.game_id = "bitsandbolts";
        bits_triggerGameTrigger.prompt = "bitsandbolts_prompt";

        // astro_trigger (components)
        const astro_triggerGameTrigger = new GameTrigger(astro_trigger);
        astro_triggerGameTrigger.game_id = "astro";
        astro_triggerGameTrigger.prompt = "astro_prompt";

        // thinice_trigger (components)
        const thinice_triggerGameTrigger = new GameTrigger(thinice_trigger);
        thinice_triggerGameTrigger.game_id = "thinice";
        thinice_triggerGameTrigger.prompt = "thinice_prompt";

        // chairbutton11 (components)
        const chairbutton11ButtonComponent = new ButtonComponent(chairbutton11);
        chairbutton11ButtonComponent.pixelPerfect = true;

        // chairbutton12 (components)
        const chairbutton12ButtonComponent = new ButtonComponent(chairbutton12);
        chairbutton12ButtonComponent.pixelPerfect = true;

        // chairbutton13 (components)
        const chairbutton13ButtonComponent = new ButtonComponent(chairbutton13);
        chairbutton13ButtonComponent.pixelPerfect = true;

        // chairbutton14 (components)
        const chairbutton14ButtonComponent = new ButtonComponent(chairbutton14);
        chairbutton14ButtonComponent.pixelPerfect = true;

        // chairbutton21 (components)
        const chairbutton21ButtonComponent = new ButtonComponent(chairbutton21);
        chairbutton21ButtonComponent.pixelPerfect = true;

        // chairbutton22 (components)
        const chairbutton22ButtonComponent = new ButtonComponent(chairbutton22);
        chairbutton22ButtonComponent.pixelPerfect = true;

        // chairbutton23 (components)
        const chairbutton23ButtonComponent = new ButtonComponent(chairbutton23);
        chairbutton23ButtonComponent.pixelPerfect = true;

        // chairbutton24 (components)
        const chairbutton24ButtonComponent = new ButtonComponent(chairbutton24);
        chairbutton24ButtonComponent.pixelPerfect = true;

        // snowballblock (components)
        new SnowballTrigger(snowballblock);

        this.dancefloor = dancefloor;
        this.penguin1 = penguin1;
        this.penguin2 = penguin2;
        this.penguin3 = penguin3;
        this.penguin4 = penguin4;
        this.penguin5 = penguin5;
        this.penguin6 = penguin6;
        this.targetGame = targetGame;
        this.speaker1 = speaker1;
        this.speaker2 = speaker2;
        this.bitslight = bitslight;
        this.bitsscreen = bitsscreen;
        this.bitsmachine = bitsmachine;
        this.thinicescreen = thinicescreen;
        this.thinicelight = thinicelight;
        this.thinicemachine = thinicemachine;
        this.astroscreen = astroscreen;
        this.astrolight = astrolight;
        this.astromachine = astromachine;
        this.vendingmachine = vendingmachine;
        this.screen = screen;
        this.bitsbutton = bitsbutton;
        this.astrobutton = astrobutton;
        this.thinicebutton = thinicebutton;
        this.bits_trigger = bits_trigger;
        this.astro_trigger = astro_trigger;
        this.thinice_trigger = thinice_trigger;
        this.chairbutton11 = chairbutton11;
        this.chairbutton12 = chairbutton12;
        this.chairbutton13 = chairbutton13;
        this.chairbutton14 = chairbutton14;
        this.chairbutton21 = chairbutton21;
        this.chairbutton22 = chairbutton22;
        this.chairbutton23 = chairbutton23;
        this.chairbutton24 = chairbutton24;
        this.block = block;
        this.snowballblock = snowballblock;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public dancefloor!: Phaser.GameObjects.Sprite;
    public penguin1!: Phaser.GameObjects.Sprite;
    public penguin2!: Phaser.GameObjects.Sprite;
    public penguin3!: Phaser.GameObjects.Sprite;
    public penguin4!: Phaser.GameObjects.Sprite;
    public penguin5!: Phaser.GameObjects.Sprite;
    public penguin6!: Phaser.GameObjects.Sprite;
    public targetGame!: TargetGame;
    public speaker1!: Phaser.GameObjects.Sprite;
    public speaker2!: Phaser.GameObjects.Sprite;
    public bitslight!: Phaser.GameObjects.Image;
    public bitsscreen!: Phaser.GameObjects.Sprite;
    public bitsmachine!: Phaser.GameObjects.Image;
    public thinicescreen!: Phaser.GameObjects.Sprite;
    public thinicelight!: Phaser.GameObjects.Image;
    public thinicemachine!: Phaser.GameObjects.Image;
    public astroscreen!: Phaser.GameObjects.Sprite;
    public astrolight!: Phaser.GameObjects.Image;
    public astromachine!: Phaser.GameObjects.Image;
    public vendingmachine!: Phaser.GameObjects.Image;
    public screen!: TargetGameScreen;
    public bitsbutton!: Phaser.GameObjects.Image;
    public astrobutton!: Phaser.GameObjects.Image;
    public thinicebutton!: Phaser.GameObjects.Image;
    public bits_trigger!: Phaser.GameObjects.Image;
    public astro_trigger!: Phaser.GameObjects.Image;
    public thinice_trigger!: Phaser.GameObjects.Image;
    public chairbutton11!: Phaser.GameObjects.Image;
    public chairbutton12!: Phaser.GameObjects.Image;
    public chairbutton13!: Phaser.GameObjects.Image;
    public chairbutton14!: Phaser.GameObjects.Image;
    public chairbutton21!: Phaser.GameObjects.Image;
    public chairbutton22!: Phaser.GameObjects.Image;
    public chairbutton23!: Phaser.GameObjects.Image;
    public chairbutton24!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public snowballblock!: Phaser.GameObjects.Image;
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

        this.dancefloor.play('lounge-dancefloor-animation');
        this.penguin1.play('lounge-penguin1-animation');
        this.penguin2.play('lounge-penguin2-animation');
        this.penguin3.play('lounge-penguin3-animation');
        this.penguin4.play('lounge-penguin4-animation');
        this.penguin5.play('lounge-penguin1-animation');
        this.penguin6.play('lounge-penguin4-animation');
        this.speaker1.play('lounge-speaker1-animation');
        this.speaker2.play('lounge-speaker2-animation');

        this.bitsscreen.play('lounge-bits-animation');

        this.chairbutton11.on('release', () => this.world.move(371.25, 810));
        this.chairbutton12.on('release', () => this.world.move(450, 945));
        this.chairbutton13.on('release', () => this.world.move(225, 990));
        this.chairbutton14.on('release', () => this.world.move(180, 855));
        this.chairbutton21.on('release', () => this.world.move(1338.75, 810));
        this.chairbutton22.on('release', () => this.world.move(1518.75, 855));
        this.chairbutton23.on('release', () => this.world.move(1485, 990));
        this.chairbutton24.on('release', () => this.world.move(1260, 945));

        this.bitsbutton.on('over', () => {
            this.bitsscreen.stop();
            this.bitsscreen.setFrame('lounge/bits_over');
            this.bitslight.setFrame('lounge/bits_lighton');
            this.interface.showLocalizedHint({ x: 267.6375, y: 459.675 }, 'bitsandbolts');
        })
        this.bitsbutton.on('out', () => {
            this.bitsscreen.play('lounge-bits-animation');
            this.bitslight.setFrame('lounge/bits_lightoff');
            this.interface.hideHint();
        })
        this.bitsbutton.on('release', () => this.world.move(360, 551.25));

        this.thinicescreen.play('lounge-thinice-animation');

        this.thinicebutton.on('over', () => {
            this.thinicescreen.stop();
            this.thinicescreen.setFrame('lounge/thinice_over');
            this.thinicelight.setFrame('lounge/thinice_lighton');
            this.interface.showLocalizedHint({ x: 1326.15, y: 345.9375 }, 'thinice_hint');
        })
        this.thinicebutton.on('out', () => {
            this.thinicescreen.play('lounge-thinice-animation');
            this.thinicelight.setFrame('lounge/thinice_lightoff');
            this.interface.hideHint();
        })
        this.thinicebutton.on('release', () => this.world.move(1237.5, 427.5));

        this.astroscreen.play('lounge-astro-animation');

        this.astrobutton.on('over', () => {
            this.astroscreen.stop();
            this.astroscreen.setFrame('lounge/astro_over');
            this.astrolight.setFrame('lounge/astro_lighton');
            this.interface.showLocalizedHint({ x: 1425.4875, y: 434.92500 }, 'astro_hint');
        })
        this.astrobutton.on('out', () => {
            this.astroscreen.play('lounge-astro-animation');
            this.astrolight.setFrame('lounge/astro_lightoff');
            this.interface.hideHint();
        })
        this.astrobutton.on('release', () => this.world.move(1338.75, 517.5));

        this.game.locale.register(this.localize, this);

        SnowballTrigger.getComponent(this.snowballblock).execute = (_engine, _penguin, snowball) => snowball.destroy(true);

        this.screen.load(this.game.locale.abbreviation.toString()).then(() => {
            this.targetGame.start();
            if (data.onready) data.onready(this);
        });
    }

    localize(locale: Locale): void {
        this.screen.localize(locale);
        this.targetGame.localize(locale);
        this.vendingmachine.setFrame(`lounge/vendingmachine${locale.frame}`);
        this.bitsmachine.setFrame(`lounge/bitsmachine${locale.frame}`);
        this.astromachine.setFrame(`lounge/astromachine${locale.frame}`);
        this.thinicemachine.setFrame(`lounge/thinicemachine${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('lounge-pack');
        this.screen.unload(engine.app);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
