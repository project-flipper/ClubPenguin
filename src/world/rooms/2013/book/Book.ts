
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/components/ButtonComponent";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
import DepthEnabled from "../../../../lib/components/DepthEnabled";
import PressureTrigger from "../../../../lib/components/PressureTrigger";
import WaddleTrigger from "../../../../lib/components/WaddleTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Book extends Phaser.Scene implements Room {

    constructor() {
        super("Book");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("book2013-pack", "assets/world/rooms/2013/book/book2013-pack.json");
    }

    editorCreate(): void {

        // book_base
        const book_base = this.add.image(-136.35, -11.25, "book2013", "book/base");
        book_base.setOrigin(0, 0);

        // artshowcasebutton
        const artshowcasebutton = this.add.image(704.475, 187.2, "book2013", "book/artshowcase0004");
        artshowcasebutton.setOrigin(0.48079, 0.51911);
        artshowcasebutton.alpha = 0.0001;
        artshowcasebutton.alphaTopLeft = 0.0001;
        artshowcasebutton.alphaTopRight = 0.0001;
        artshowcasebutton.alphaBottomLeft = 0.0001;
        artshowcasebutton.alphaBottomRight = 0.0001;

        // artshowcase
        const artshowcase = this.add.image(704.475, 187.2, "book2013", "book/artshowcase0001");
        artshowcase.setOrigin(0.48079, 0.51911);

        // book_mancalanotice0004
        const book_mancalanotice0004 = this.add.image(1650.6, 300.04, "book2013", "book/mancalanotice0004");
        book_mancalanotice0004.setOrigin(0.6286764705882353, 0.3826530612244898);

        // mancalanotice
        const mancalanotice = this.add.image(1650.6, 300.04, "book2013", "book/mancalanotice0001");
        mancalanotice.setOrigin(0.6286764705882353, 0.3826530612244898);

        // mancalatitle
        const mancalatitle = this.add.image(1571.4, 206.66, "book2013", "book/mancalatitle0001");
        mancalatitle.setOrigin(-0.06429, -0.01178);

        // book_logo
        const book_logo = this.add.image(1140.4125, 219.825, "book2013", "book/logo");
        book_logo.setOrigin(0.49074803, 0.49232472);

        // block
        const block = this.add.image(-112.5, 0, "book2013", "book/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // coffee_trigger
        const coffee_trigger = this.add.image(1425.6, 458.55, "book2013", "book/coffee_trigger");
        coffee_trigger.visible = false;

        // book_couch1
        const book_couch1 = this.add.image(1578.15, 492.525, "book2013", "book/couch1");
        book_couch1.setOrigin(0.48875598, 0.22683128);

        // book_table
        const book_table = this.add.image(1598.9625, 738.9, "book2013", "book/table");
        book_table.setOrigin(0.49496296, 0.19293103);

        // book_tableplant
        const book_tableplant = this.add.image(1630.125, 670.5, "book2013", "book/tableplant");
        book_tableplant.setOrigin(0.44354286, 0.45810811);

        // book_couch2
        const book_couch2 = this.add.image(1554.75, 824.85, "book2013", "book/couch2");
        book_couch2.setOrigin(0.49038462, 0.12903226);

        // book_cubicleseparator
        const book_cubicleseparator = this.add.image(999.1125, 774.675, "book2013", "book/cubicleseparator");
        book_cubicleseparator.setOrigin(0.4889011, 0.87415301);

        // book_deskback1
        const book_deskback1 = this.add.image(1127.8125, 787.95, "book2013", "book/deskback1");
        book_deskback1.setOrigin(0.46936364, 0.18685121);

        // book_chair3
        const book_chair3 = this.add.image(838.125, 808.9875, "book2013", "book/chair3");
        book_chair3.setOrigin(0.04968992, 0.40934911);

        // book_desk3
        const book_desk3 = this.add.image(1004.85, 809.1, "book2013", "book/desk3");
        book_desk3.setOrigin(0.48333333, 0.366139);

        // books
        const books = this.add.image(477.7875, 360.1125, "book2013", "book/books0001");
        books.setOrigin(0.48173387, 0.48567976);

        // book_chair2
        const book_chair2 = this.add.image(731.25, 339.1875, "book2013", "book/chair2");
        book_chair2.setOrigin(0.48772455, 0.48151515);

        // book_desk2
        const book_desk2 = this.add.image(700.425, 443.5875, "book2013", "book/desk2");
        book_desk2.setOrigin(0.49054264, 0.43826389);

        // book_rack
        const book_rack = this.add.image(895.725, 375.75, "book2013", "book/rack");
        book_rack.setOrigin(0.50410714, 0.72337748);

        // book_plant
        const book_plant = this.add.image(897.525, 468.45, "book2013", "book/plant");
        book_plant.setOrigin(0.4795614, 0.55837838);

        // book_deskback
        const book_deskback = this.add.image(1133.1, 401.4, "book2013", "book/deskback");
        book_deskback.setOrigin(0.53571429, 0.57698454);

        // book_separator
        const book_separator = this.add.image(942.975, 523.35, "book2013", "book/separator");
        book_separator.setOrigin(0.4205681818181818, 0.9438053097345133);

        // book_railing
        const book_railing = this.add.image(993.15, 531.675, "book2013", "book/railing");
        book_railing.setOrigin(0.6383720930232558, 0.4775471698113207);

        // book_chair1
        const book_chair1 = this.add.image(1202.0625, 460.2375, "book2013", "book/chair1");
        book_chair1.setOrigin(0.48316547, 0.57979021);

        // book_desk1
        const book_desk1 = this.add.image(1228.05, 487.9125, "book2013", "book/desk1");
        book_desk1.setOrigin(0.48892683, 0.31981132);

        // book_chair
        const book_chair = this.add.image(540.45, 801.3375, "book2013", "book/chair");
        book_chair.setOrigin(0.41670455, 0.07494624);

        // book_chair_1
        const book_chair_1 = this.add.image(675.45, 801.3375, "book2013", "book/chair");
        book_chair_1.setOrigin(0.41670455, 0.07494624);

        // book_archives
        const book_archives = this.add.image(360.3375, 492.3, "book2013", "book/archives");
        book_archives.setOrigin(0.48373333, 0.45182186);

        // book_box
        const book_box = this.add.image(108.9, 917.1, "book2013", "book/box");
        book_box.setOrigin(0.4880597, 0.49017857);

        // book_newspaperpile
        const book_newspaperpile = this.add.image(211.6125, 1028.1375, "book2013", "book/newspaperpile");
        book_newspaperpile.setOrigin(0.48302521, 0.44313043);

        // book_board
        const book_board = this.add.image(317.025, 759.15, "book2013", "book/board");
        book_board.setOrigin(0.46631372549019606, 0.7605633802816901);

        // boardLabel
        const boardLabel = this.add.image(360, 623, "book2013", "book/boardLabel0001");

        // times
        const times = this.add.image(1154, 234, "book2013", "book/times0001");

        // book_conveyorbelt
        const book_conveyorbelt = this.add.image(-4.275, 571.725, "book2013", "book/conveyorbelt");
        book_conveyorbelt.setOrigin(0, 0);

        // book_conveyorbase
        const book_conveyorbase = this.add.image(-4.275, 571.725, "book2013", "book/conveyorbase");
        book_conveyorbase.setOrigin(0, 0);

        // conveyoritems
        const conveyoritems = this.add.sprite(-130.5, 519.1875, "book2013", "book/conveyoritems0001");
        conveyoritems.setOrigin(0, 0);

        // book_conveyorcover
        const book_conveyorcover = this.add.image(259.9875, 813.4875, "book2013", "book/conveyorcover");
        book_conveyorcover.setOrigin(0, 0);

        // conveyorroll
        const conveyorroll = this.add.sprite(344.475, 836.2125, "book2013", "book/conveyorroll0001");
        conveyorroll.setOrigin(0, 0);

        // book_foreground
        const book_foreground = this.add.image(857.1125, 1107.6, "book2013", "book/foreground");
        book_foreground.setOrigin(0.5, 1);

        // book_arttitle
        this.add.image(710.325, 85.5, "book2013", "book/arttitle");

        // artlabel
        const artlabel = this.add.image(710, 84, "book2013", "book/artlabel0001");

        // stairsbutton
        const stairsbutton = this.add.image(1356.41, 276.53, "book2013", "book/stairs0004");
        stairsbutton.setOrigin(0, 0);
        stairsbutton.alpha = 0.0001;
        stairsbutton.alphaTopLeft = 0.0001;
        stairsbutton.alphaTopRight = 0.0001;
        stairsbutton.alphaBottomLeft = 0.0001;
        stairsbutton.alphaBottomRight = 0.0001;

        // stairslight
        const stairslight = this.add.image(1356.41, 276.53, "book2013", "book/stairs0002");
        stairslight.setOrigin(0, 0);

        // chair1_trigger
        const chair1_trigger = this.add.image(515.1375, 809.8875, "book2013", "book/chair1_trigger");
        chair1_trigger.setOrigin(0, 0);
        chair1_trigger.visible = false;

        // chair2_trigger
        const chair2_trigger = this.add.image(645.6375, 807.6375, "book2013", "book/chair2_trigger");
        chair2_trigger.setOrigin(0, 0);
        chair2_trigger.visible = false;

        // book_hit
        const book_hit = this.add.image(1566.5625, 909.3375, "book2013", "book/book0002");
        book_hit.setOrigin(0, 0);
        book_hit.alpha = 0.0001;
        book_hit.alphaTopLeft = 0.0001;
        book_hit.alphaTopRight = 0.0001;
        book_hit.alphaBottomLeft = 0.0001;
        book_hit.alphaBottomRight = 0.0001;

        // book
        const book = this.add.image(1566.5625, 909.3375, "book2013", "book/book0001");
        book.setOrigin(0, 0);

        // booklabel
        const booklabel = this.add.image(1584, 942, "book2013", "book/booklabel0001");
        booklabel.setOrigin(0, 0);

        // table100
        const table100 = this.add.image(1258.31, 725.96, "book2013", "book/table_trigger");
        table100.visible = false;

        // book_mancalatable_1
        const book_mancalatable_1 = this.add.image(1259.55, 736.31, "book2013", "book/mancalatable");
        book_mancalatable_1.setOrigin(0.4846153846153846, 0.4669811320754717);

        // board100
        const board100 = this.add.image(1260.79, 739.58, "book2013", "book/mancalaboard0001");
        board100.setOrigin(0.4875, 1.10455);

        // mancala100
        const mancala100 = this.add.image(1258.99, 704.93, "book2013", "book/mancala_btn0004");
        mancala100.alpha = 0.0001;
        mancala100.alphaTopLeft = 0.0001;
        mancala100.alphaTopRight = 0.0001;
        mancala100.alphaBottomLeft = 0.0001;
        mancala100.alphaBottomRight = 0.0001;

        // table101
        const table101 = this.add.image(1398.15, 630.11, "book2013", "book/table_trigger");
        table101.visible = false;

        // book_mancalatable
        const book_mancalatable = this.add.image(1397.93, 637.31, "book2013", "book/mancalatable");
        book_mancalatable.setOrigin(0.48462, 0.46698);

        // board101
        const board101 = this.add.image(1399.16, 640.57, "book2013", "book/mancalaboard0001");
        board101.setOrigin(0.4875, 1.10455);

        // mancala101
        const mancala101 = this.add.image(1397.36, 605.93, "book2013", "book/mancala_btn0004");
        mancala101.alpha = 0.0001;
        mancala101.alphaTopLeft = 0.0001;
        mancala101.alphaTopRight = 0.0001;
        mancala101.alphaBottomLeft = 0.0001;
        mancala101.alphaBottomRight = 0.0001;

        // table104
        const table104 = this.add.image(1317.04, 892.46, "book2013", "book/table_trigger");
        table104.visible = false;

        // book_mancalatable_3
        const book_mancalatable_3 = this.add.image(1317.94, 897.19, "book2013", "book/mancalatable");
        book_mancalatable_3.setOrigin(0.4846153846153846, 0.4669811320754717);

        // board104
        const board104 = this.add.image(1319.18, 900.45, "book2013", "book/mancalaboard0001");
        board104.setOrigin(0.4875, 1.10455);

        // mancala104
        const mancala104 = this.add.image(1317.38, 865.8, "book2013", "book/mancala_btn0004");
        mancala104.alpha = 0.0001;
        mancala104.alphaTopLeft = 0.0001;
        mancala104.alphaTopRight = 0.0001;
        mancala104.alphaBottomLeft = 0.0001;
        mancala104.alphaBottomRight = 0.0001;

        // table103
        const table103 = this.add.image(1446.3, 763.76, "book2013", "book/table_trigger");
        table103.visible = false;

        // book_mancalatable_2
        const book_mancalatable_2 = this.add.image(1445.96, 770.18, "book2013", "book/mancalatable");
        book_mancalatable_2.setOrigin(0.4846153846153846, 0.4669811320754717);

        // board103
        const board103 = this.add.image(1447.2, 773.44, "book2013", "book/mancalaboard0001");
        board103.setOrigin(0.4875, 1.10455);

        // mancala103
        const mancala103 = this.add.image(1445.4, 738.79, "book2013", "book/mancala_btn0004");
        mancala103.alpha = 0.0001;
        mancala103.alphaTopLeft = 0.0001;
        mancala103.alphaTopRight = 0.0001;
        mancala103.alphaBottomLeft = 0.0001;
        mancala103.alphaBottomRight = 0.0001;

        // lists
        const triggers = [coffee_trigger, chair2_trigger, chair1_trigger, table101, table100, table104, table103];

        // artshowcase (components)
        const artshowcaseButtonComponent = new ButtonComponent(artshowcase);
        artshowcaseButtonComponent.upTexture = {"key":"book2013","frame":"book/artshowcase0001"};
        artshowcaseButtonComponent.overTexture = {"key":"book2013","frame":"book/artshowcase0002"};
        artshowcaseButtonComponent.handCursor = true;
        artshowcaseButtonComponent.pixelPerfect = true;
        artshowcaseButtonComponent.hitbox = artshowcasebutton;

        // mancalanotice (components)
        const mancalanoticeButtonComponent = new ButtonComponent(mancalanotice);
        mancalanoticeButtonComponent.upTexture = {"key":"book2013","frame":"book/mancalanotice0001"};
        mancalanoticeButtonComponent.overTexture = {"key":"book2013","frame":"book/mancalanotice0002"};
        mancalanoticeButtonComponent.handCursor = true;
        mancalanoticeButtonComponent.pixelPerfect = true;
        mancalanoticeButtonComponent.hitbox = book_mancalanotice0004;

        // coffee_trigger (components)
        const coffee_triggerRoomTrigger = new RoomTrigger(coffee_trigger);
        coffee_triggerRoomTrigger.destination = 110;
        coffee_triggerRoomTrigger.playerX = 1428.75;
        coffee_triggerRoomTrigger.playerY = 708.75;

        // book_couch1 (components)
        new DepthEnabled(book_couch1);

        // book_table (components)
        new DepthEnabled(book_table);

        // book_tableplant (components)
        new DepthEnabled(book_tableplant);

        // book_couch2 (components)
        new DepthEnabled(book_couch2);

        // book_cubicleseparator (components)
        new DepthEnabled(book_cubicleseparator);

        // book_chair3 (components)
        new DepthEnabled(book_chair3);

        // book_desk3 (components)
        new DepthEnabled(book_desk3);

        // books (components)
        const booksButtonComponent = new ButtonComponent(books);
        booksButtonComponent.upTexture = {"key":"book2013","frame":"book/books0001"};
        booksButtonComponent.overTexture = {"key":"book2013","frame":"book/books0002"};
        booksButtonComponent.handCursor = true;
        booksButtonComponent.pixelPerfect = true;

        // book_chair2 (components)
        new DepthEnabled(book_chair2);

        // book_desk2 (components)
        new DepthEnabled(book_desk2);

        // book_plant (components)
        new DepthEnabled(book_plant);

        // book_separator (components)
        new DepthEnabled(book_separator);

        // book_railing (components)
        new DepthEnabled(book_railing);

        // book_chair1 (components)
        new DepthEnabled(book_chair1);

        // book_desk1 (components)
        new DepthEnabled(book_desk1);

        // book_chair (components)
        new DepthEnabled(book_chair);

        // book_chair_1 (components)
        new DepthEnabled(book_chair_1);

        // book_board (components)
        new DepthEnabled(book_board);

        // boardLabel (components)
        const boardLabelDepthEnabled = new DepthEnabled(boardLabel);
        boardLabelDepthEnabled.automaticSort = false;
        boardLabelDepthEnabled.depth = 760.15;

        // book_conveyorbelt (components)
        const book_conveyorbeltDepthEnabled = new DepthEnabled(book_conveyorbelt);
        book_conveyorbeltDepthEnabled.automaticSort = false;
        book_conveyorbeltDepthEnabled.depth = 937.01;

        // book_conveyorbase (components)
        const book_conveyorbaseDepthEnabled = new DepthEnabled(book_conveyorbase);
        book_conveyorbaseDepthEnabled.automaticSort = false;
        book_conveyorbaseDepthEnabled.depth = 937.01;

        // conveyoritems (components)
        const conveyoritemsDepthEnabled = new DepthEnabled(conveyoritems);
        conveyoritemsDepthEnabled.automaticSort = false;
        conveyoritemsDepthEnabled.depth = 937.01;

        // book_conveyorcover (components)
        const book_conveyorcoverDepthEnabled = new DepthEnabled(book_conveyorcover);
        book_conveyorcoverDepthEnabled.automaticSort = false;
        book_conveyorcoverDepthEnabled.depth = 937.01;

        // conveyorroll (components)
        const conveyorrollDepthEnabled = new DepthEnabled(conveyorroll);
        conveyorrollDepthEnabled.automaticSort = false;
        conveyorrollDepthEnabled.depth = 937.01;

        // book_foreground (components)
        new DepthEnabled(book_foreground);

        // stairsbutton (components)
        const stairsbuttonButtonComponent = new ButtonComponent(stairsbutton);
        stairsbuttonButtonComponent.handCursor = true;
        stairsbuttonButtonComponent.pixelPerfect = true;

        // chair1_trigger (components)
        const chair1_triggerPressureTrigger = new PressureTrigger(chair1_trigger);
        chair1_triggerPressureTrigger.requiresIdle = true;

        // chair2_trigger (components)
        const chair2_triggerPressureTrigger = new PressureTrigger(chair2_trigger);
        chair2_triggerPressureTrigger.requiresIdle = true;

        // book (components)
        const bookButtonComponent = new ButtonComponent(book);
        bookButtonComponent.upTexture = {"key":"book2013","frame":"book/book0001"};
        bookButtonComponent.overTexture = {"key":"book2013","frame":"book/book0002"};
        bookButtonComponent.handCursor = true;
        bookButtonComponent.pixelPerfect = true;
        bookButtonComponent.hitbox = book_hit;
        const bookDepthEnabled = new DepthEnabled(book);
        bookDepthEnabled.automaticSort = false;
        bookDepthEnabled.depth = 1108;

        // booklabel (components)
        const booklabelDepthEnabled = new DepthEnabled(booklabel);
        booklabelDepthEnabled.automaticSort = false;
        booklabelDepthEnabled.depth = 1108;

        // table100 (components)
        const table100WaddleTrigger = new WaddleTrigger(table100);
        table100WaddleTrigger.game_id = "mancala";
        table100WaddleTrigger.prompt = "mancala_prompt";
        table100WaddleTrigger.waddle_id = 100;
        table100WaddleTrigger.waddle_type = "TABLE";
        table100WaddleTrigger.seat1 = true;
        table100WaddleTrigger.seat1frame = 23;
        table100WaddleTrigger.seat1x = 1193.29;
        table100WaddleTrigger.seat1y = 694.58;
        table100WaddleTrigger.done1x = 1148.29;
        table100WaddleTrigger.done1y = 784.58;
        table100WaddleTrigger.seat2 = true;
        table100WaddleTrigger.seat2frame = 19;
        table100WaddleTrigger.seat2x = 1328.29;
        table100WaddleTrigger.seat2y = 775.58;
        table100WaddleTrigger.done2x = 1238.29;
        table100WaddleTrigger.done2y = 843.08;

        // book_mancalatable_1 (components)
        const book_mancalatable_1DepthEnabled = new DepthEnabled(book_mancalatable_1);
        book_mancalatable_1DepthEnabled.automaticSort = false;
        book_mancalatable_1DepthEnabled.depth = 739.58;

        // board100 (components)
        const board100DepthEnabled = new DepthEnabled(board100);
        board100DepthEnabled.automaticSort = false;
        board100DepthEnabled.depth = 739.58;
        const board100ButtonComponent = new ButtonComponent(board100);
        board100ButtonComponent.overTexture = {"key":"book2013","frame":"book/mancalaboard0002"};
        board100ButtonComponent.handCursor = true;
        board100ButtonComponent.pixelPerfect = true;

        // table101 (components)
        const table101WaddleTrigger = new WaddleTrigger(table101);
        table101WaddleTrigger.game_id = "mancala";
        table101WaddleTrigger.prompt = "mancala_prompt";
        table101WaddleTrigger.waddle_id = 101;
        table101WaddleTrigger.waddle_type = "TABLE";
        table101WaddleTrigger.seat1 = true;
        table101WaddleTrigger.seat1frame = 23;
        table101WaddleTrigger.seat1x = 1331.66;
        table101WaddleTrigger.seat1y = 595.57;
        table101WaddleTrigger.done1x = 1286.66;
        table101WaddleTrigger.done1y = 685.58;
        table101WaddleTrigger.seat2 = true;
        table101WaddleTrigger.seat2frame = 19;
        table101WaddleTrigger.seat2x = 1466.66;
        table101WaddleTrigger.seat2y = 676.58;
        table101WaddleTrigger.done2x = 1376.66;
        table101WaddleTrigger.done2y = 744.08;

        // book_mancalatable (components)
        const book_mancalatableDepthEnabled = new DepthEnabled(book_mancalatable);
        book_mancalatableDepthEnabled.automaticSort = false;
        book_mancalatableDepthEnabled.depth = 640.57;

        // board101 (components)
        const board101DepthEnabled = new DepthEnabled(board101);
        board101DepthEnabled.automaticSort = false;
        board101DepthEnabled.depth = 640.57;
        const board101ButtonComponent = new ButtonComponent(board101);
        board101ButtonComponent.overTexture = {"key":"book2013","frame":"book/mancalaboard0002"};
        board101ButtonComponent.handCursor = true;
        board101ButtonComponent.pixelPerfect = true;
        board101ButtonComponent.hitbox = mancala101;

        // table104 (components)
        const table104WaddleTrigger = new WaddleTrigger(table104);
        table104WaddleTrigger.game_id = "mancala";
        table104WaddleTrigger.prompt = "mancala_prompt";
        table104WaddleTrigger.waddle_id = 104;
        table104WaddleTrigger.waddle_type = "TABLE";
        table104WaddleTrigger.seat1 = true;
        table104WaddleTrigger.seat1frame = 23;
        table104WaddleTrigger.seat1x = 1251.68;
        table104WaddleTrigger.seat1y = 855.45;
        table104WaddleTrigger.done1x = 1206.68;
        table104WaddleTrigger.done1y = 945.45;
        table104WaddleTrigger.seat2 = true;
        table104WaddleTrigger.seat2frame = 19;
        table104WaddleTrigger.seat2x = 1386.68;
        table104WaddleTrigger.seat2y = 936.45;
        table104WaddleTrigger.done2x = 1296.68;
        table104WaddleTrigger.done2y = 1003.95;

        // book_mancalatable_3 (components)
        const book_mancalatable_3DepthEnabled = new DepthEnabled(book_mancalatable_3);
        book_mancalatable_3DepthEnabled.automaticSort = false;
        book_mancalatable_3DepthEnabled.depth = 900.45;

        // board104 (components)
        const board104DepthEnabled = new DepthEnabled(board104);
        board104DepthEnabled.automaticSort = false;
        board104DepthEnabled.depth = 900.45;
        const board104ButtonComponent = new ButtonComponent(board104);
        board104ButtonComponent.overTexture = {"key":"book2013","frame":"book/mancalaboard0002"};
        board104ButtonComponent.handCursor = true;
        board104ButtonComponent.pixelPerfect = true;
        board104ButtonComponent.hitbox = mancala104;

        // table103 (components)
        const table103WaddleTrigger = new WaddleTrigger(table103);
        table103WaddleTrigger.game_id = "mancala";
        table103WaddleTrigger.prompt = "mancala_prompt";
        table103WaddleTrigger.waddle_id = 103;
        table103WaddleTrigger.waddle_type = "TABLE";
        table103WaddleTrigger.seat1 = true;
        table103WaddleTrigger.seat1frame = 23;
        table103WaddleTrigger.seat1x = 1379.7;
        table103WaddleTrigger.seat1y = 728.44;
        table103WaddleTrigger.done1x = 1334.7;
        table103WaddleTrigger.done1y = 818.44;
        table103WaddleTrigger.seat2 = true;
        table103WaddleTrigger.seat2frame = 19;
        table103WaddleTrigger.seat2x = 1514.7;
        table103WaddleTrigger.seat2y = 809.44;
        table103WaddleTrigger.done2x = 1424.7;
        table103WaddleTrigger.done2y = 876.94;

        // book_mancalatable_2 (components)
        const book_mancalatable_2DepthEnabled = new DepthEnabled(book_mancalatable_2);
        book_mancalatable_2DepthEnabled.automaticSort = false;
        book_mancalatable_2DepthEnabled.depth = 773.44;

        // board103 (components)
        const board103DepthEnabled = new DepthEnabled(board103);
        board103DepthEnabled.automaticSort = false;
        board103DepthEnabled.depth = 773.44;
        const board103ButtonComponent = new ButtonComponent(board103);
        board103ButtonComponent.overTexture = {"key":"book2013","frame":"book/mancalaboard0002"};
        board103ButtonComponent.handCursor = true;
        board103ButtonComponent.pixelPerfect = true;
        board103ButtonComponent.hitbox = mancala103;

        this.artshowcase = artshowcase;
        this.mancalanotice = mancalanotice;
        this.mancalatitle = mancalatitle;
        this.block = block;
        this.books = books;
        this.boardLabel = boardLabel;
        this.times = times;
        this.conveyoritems = conveyoritems;
        this.conveyorroll = conveyorroll;
        this.artlabel = artlabel;
        this.stairsbutton = stairsbutton;
        this.stairslight = stairslight;
        this.chair1_trigger = chair1_trigger;
        this.chair2_trigger = chair2_trigger;
        this.book = book;
        this.booklabel = booklabel;
        this.table100 = table100;
        this.board100 = board100;
        this.table101 = table101;
        this.board101 = board101;
        this.table104 = table104;
        this.board104 = board104;
        this.table103 = table103;
        this.board103 = board103;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public artshowcase!: Phaser.GameObjects.Image;
    public mancalanotice!: Phaser.GameObjects.Image;
    public mancalatitle!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public books!: Phaser.GameObjects.Image;
    public boardLabel!: Phaser.GameObjects.Image;
    public times!: Phaser.GameObjects.Image;
    public conveyoritems!: Phaser.GameObjects.Sprite;
    public conveyorroll!: Phaser.GameObjects.Sprite;
    public artlabel!: Phaser.GameObjects.Image;
    public stairsbutton!: Phaser.GameObjects.Image;
    public stairslight!: Phaser.GameObjects.Image;
    public chair1_trigger!: Phaser.GameObjects.Image;
    public chair2_trigger!: Phaser.GameObjects.Image;
    public book!: Phaser.GameObjects.Image;
    public booklabel!: Phaser.GameObjects.Image;
    public table100!: Phaser.GameObjects.Image;
    public board100!: Phaser.GameObjects.Image;
    public table101!: Phaser.GameObjects.Image;
    public board101!: Phaser.GameObjects.Image;
    public table104!: Phaser.GameObjects.Image;
    public board104!: Phaser.GameObjects.Image;
    public table103!: Phaser.GameObjects.Image;
    public board103!: Phaser.GameObjects.Image;
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

        this.stairsbutton.on('over', () => {
            this.sound.play('book2013-lighton');
            this.stairslight.visible = true;
        });
        this.stairsbutton.on('out', () => {
            this.sound.play('book2013-lightoff');
            this.stairslight.visible = false;
        });
        this.stairsbutton.on('release', () => this.world.move(1419.75, 463.5));

        this.book.on('over', () => {
            this.sound.play('book2013-bookopen');
            this.booklabel.visible = false;
        });
        this.book.on('out', () => {
            this.sound.play('book2013-bookclose');
            this.booklabel.visible = true;
        });

        this.board100.on('out', () => {
            this.interface.hideHint();
            this.board100.setFrame('book/mancalaboard0001');
        });
        this.board100.on('over', () => {
            this.interface.showLocalizedHint(this.board100, 'mancala_hint');
        });
        this.board100.on('release', () => this.world.move(this.board100.x, this.board100.y));

        this.board101.on('out', () => {
            this.interface.hideHint();
            this.board101.setFrame('book/mancalaboard0001');
        });
        this.board101.on('over', () => {
            this.interface.showLocalizedHint(this.board101, 'mancala_hint');
        });
        this.board101.on('release', () => this.world.move(this.board101.x, this.board101.y));

        this.board103.on('out', () => {
            this.interface.hideHint();
            this.board103.setFrame('book/mancalaboard0001');
        });
        this.board103.on('over', () => {
            this.interface.showLocalizedHint(this.board103, 'mancala_hint');
        });
        this.board103.on('release', () => this.world.move(this.board103.x, this.board103.y));

        this.board104.on('out', () => {
            this.interface.hideHint();
            this.board104.setFrame('book/mancalaboard0001');
        });
        this.board104.on('over', () => {
            this.interface.showLocalizedHint(this.board104, 'mancala_hint');
        });
        this.board104.on('release', () => this.world.move(this.board104.x, this.board104.y));

        let trigger1 = PressureTrigger.getComponent(this.chair1_trigger);
        trigger1.onActivate = this.updatePressState.bind(this);
        trigger1.onDeactivate = this.updatePressState.bind(this);
        let trigger2 = PressureTrigger.getComponent(this.chair2_trigger);
        trigger2.onActivate = this.updatePressState.bind(this);
        trigger2.onDeactivate = this.updatePressState.bind(this);

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.artlabel.setFrame(`book/artlabel${locale.frame}`);
        this.boardLabel.setFrame(`book/boardLabel${locale.frame}`);
        this.times.setFrame(`book/times${locale.frame}`);
        this.mancalatitle.setFrame(`book/mancalatitle${locale.frame}`);
        this.booklabel.setFrame(`book/booklabel${locale.frame}`);
    }

    updatePressState(): void {
        let trigger1 = PressureTrigger.getComponent(this.chair1_trigger);
        let trigger2 = PressureTrigger.getComponent(this.chair2_trigger);

        let active = trigger1.hasPlayersOn() || trigger2.hasPlayersOn();

        if (active && !this.conveyoritems.anims.isPlaying) {
            this.conveyoritems.play('book2013-conveyoritems-animation');
            this.conveyorroll.play('book2013-conveyorroll-animation');
            this.sound.play('book2013-conveyor', {
                loop: true
            });
        } else if (!active && this.conveyoritems.anims.isPlaying) {
            this.conveyoritems.stop();
            this.conveyoritems.setFrame('book/conveyoritems0001');
            this.conveyorroll.stop();
            this.conveyorroll.setFrame('book/conveyorroll0001');
            this.sound.stopByKey('book2013-conveyor');
        }
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('book2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
