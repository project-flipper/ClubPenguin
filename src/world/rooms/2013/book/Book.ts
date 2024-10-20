
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/components/ButtonComponent";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
import DepthEnabled from "../../../../lib/components/DepthEnabled";
import MancalaBoard from "./prefabs/MancalaBoard";
import PressureTrigger from "../../../../lib/components/PressureTrigger";
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

        this.load.pack("book-pack", "assets/world/rooms/2013/book/book-pack.json");
    }

    editorCreate(): void {

        // book_base
        const book_base = this.add.image(-136.35, -11.25, "book", "book/base");
        book_base.setOrigin(0, 0);

        // artshowcase
        const artshowcase = this.add.image(704.475, 187.2, "book", "book/artshowcase0001");
        artshowcase.setOrigin(0.48079, 0.51911);

        // artshowcasebutton
        const artshowcasebutton = this.add.image(704.475, 187.2, "book", "book/artshowcase0004");
        artshowcasebutton.setOrigin(0.48079, 0.51911);
        artshowcasebutton.alpha = 0.01;
        artshowcasebutton.alphaTopLeft = 0.01;
        artshowcasebutton.alphaTopRight = 0.01;
        artshowcasebutton.alphaBottomLeft = 0.01;
        artshowcasebutton.alphaBottomRight = 0.01;

        // mancalanotice
        const mancalanotice = this.add.image(1571.4, 206.6625, "book", "book/mancalanotice0001");
        mancalanotice.setOrigin(-0.01566, -0.04476);

        // mancalatitle
        const mancalatitle = this.add.image(1634, 342, "book", "book/mancalatitle0001");

        // book_logo
        const book_logo = this.add.image(1140.4125, 219.825, "book", "book/logo");
        book_logo.setOrigin(0.49074803, 0.49232472);

        // block
        const block = this.add.image(-112.5, 0, "book", "book/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // coffee_trigger
        const coffee_trigger = this.add.image(1425.6, 458.55, "book", "book/coffee_trigger");
        coffee_trigger.visible = false;

        // book_couch1
        const book_couch1 = this.add.image(1578.15, 492.525, "book", "book/couch1");
        book_couch1.setOrigin(0.48875598, 0.22683128);

        // book_table
        const book_table = this.add.image(1598.9625, 738.9, "book", "book/table");
        book_table.setOrigin(0.49496296, 0.19293103);

        // book_tableplant
        const book_tableplant = this.add.image(1630.125, 670.5, "book", "book/tableplant");
        book_tableplant.setOrigin(0.44354286, 0.45810811);

        // book_couch2
        const book_couch2 = this.add.image(1554.75, 824.85, "book", "book/couch2");
        book_couch2.setOrigin(0.49038462, 0.12903226);

        // book_cubicleseparator
        const book_cubicleseparator = this.add.image(999.1125, 774.675, "book", "book/cubicleseparator");
        book_cubicleseparator.setOrigin(0.4889011, 0.87415301);

        // book_deskback1
        const book_deskback1 = this.add.image(1127.8125, 787.95, "book", "book/deskback1");
        book_deskback1.setOrigin(0.46936364, 0.18685121);

        // book_chair3
        const book_chair3 = this.add.image(838.125, 808.9875, "book", "book/chair3");
        book_chair3.setOrigin(0.04968992, 0.40934911);

        // book_desk3
        const book_desk3 = this.add.image(1004.85, 809.1, "book", "book/desk3");
        book_desk3.setOrigin(0.48333333, 0.366139);

        // books
        const books = this.add.image(477.7875, 360.1125, "book", "book/books0001");
        books.setOrigin(0.48173387, 0.48567976);

        // book_chair2
        const book_chair2 = this.add.image(731.25, 339.1875, "book", "book/chair2");
        book_chair2.setOrigin(0.48772455, 0.48151515);

        // book_desk2
        const book_desk2 = this.add.image(700.425, 443.5875, "book", "book/desk2");
        book_desk2.setOrigin(0.49054264, 0.43826389);

        // book_rack
        const book_rack = this.add.image(895.725, 375.75, "book", "book/rack");
        book_rack.setOrigin(0.50410714, 0.72337748);

        // book_plant
        const book_plant = this.add.image(897.525, 468.45, "book", "book/plant");
        book_plant.setOrigin(0.4795614, 0.55837838);

        // book_deskback
        const book_deskback = this.add.image(1133.1, 401.4, "book", "book/deskback");
        book_deskback.setOrigin(0.53571429, 0.57698454);

        // book_separator
        const book_separator = this.add.image(942.975, 523.35, "book", "book/separator");
        book_separator.setOrigin(0.4205681818181818, 0.9438053097345133);

        // book_railing
        const book_railing = this.add.image(993.15, 531.675, "book", "book/railing");
        book_railing.setOrigin(0.6383720930232558, 0.4775471698113207);

        // book_chair1
        const book_chair1 = this.add.image(1202.0625, 460.2375, "book", "book/chair1");
        book_chair1.setOrigin(0.48316547, 0.57979021);

        // book_desk1
        const book_desk1 = this.add.image(1228.05, 487.9125, "book", "book/desk1");
        book_desk1.setOrigin(0.48892683, 0.31981132);

        // book_chair
        const book_chair = this.add.image(540.45, 801.3375, "book", "book/chair");
        book_chair.setOrigin(0.41670455, 0.07494624);

        // book_chair_1
        const book_chair_1 = this.add.image(675.45, 801.3375, "book", "book/chair");
        book_chair_1.setOrigin(0.41670455, 0.07494624);

        // book_archives
        const book_archives = this.add.image(360.3375, 492.3, "book", "book/archives");
        book_archives.setOrigin(0.48373333, 0.45182186);

        // book_box
        const book_box = this.add.image(108.9, 917.1, "book", "book/box");
        book_box.setOrigin(0.4880597, 0.49017857);

        // book_newspaperpile
        const book_newspaperpile = this.add.image(211.6125, 1028.1375, "book", "book/newspaperpile");
        book_newspaperpile.setOrigin(0.48302521, 0.44313043);

        // book_board
        const book_board = this.add.image(317.025, 759.15, "book", "book/board");
        book_board.setOrigin(0.46631372549019606, 0.7605633802816901);

        // boardLabel
        const boardLabel = this.add.image(360, 623, "book", "book/boardLabel0001");

        // times
        const times = this.add.image(1154, 234, "book", "book/times0001");

        // mancalaBoard1
        const mancalaBoard1 = new MancalaBoard(this, 1399.1625, 640.575);
        this.add.existing(mancalaBoard1);

        // mancalaBoard2
        const mancalaBoard2 = new MancalaBoard(this, 1260.7875, 739.575);
        this.add.existing(mancalaBoard2);

        // mancalaBoard3
        const mancalaBoard3 = new MancalaBoard(this, 1447.2, 773.4375);
        this.add.existing(mancalaBoard3);

        // mancalaBoard4
        const mancalaBoard4 = new MancalaBoard(this, 1319.175, 900.45);
        this.add.existing(mancalaBoard4);

        // book_conveyorbelt
        const book_conveyorbelt = this.add.image(-4.275, 571.725, "book", "book/conveyorbelt");
        book_conveyorbelt.setOrigin(0, 0);

        // book_conveyorbase
        const book_conveyorbase = this.add.image(-4.275, 571.725, "book", "book/conveyorbase");
        book_conveyorbase.setOrigin(0, 0);

        // conveyoritems
        const conveyoritems = this.add.sprite(-130.5, 519.1875, "book", "book/conveyoritems0001");
        conveyoritems.setOrigin(0, 0);

        // book_conveyorcover
        const book_conveyorcover = this.add.image(259.9875, 813.4875, "book", "book/conveyorcover");
        book_conveyorcover.setOrigin(0, 0);

        // conveyorroll
        const conveyorroll = this.add.sprite(344.475, 836.2125, "book", "book/conveyorroll0001");
        conveyorroll.setOrigin(0, 0);

        // book_foreground
        const book_foreground = this.add.image(857.1125, 1107.6, "book", "book/foreground");
        book_foreground.setOrigin(0.5, 1);

        // book_arttitle
        this.add.image(710.325, 85.5, "book", "book/arttitle");

        // artlabel
        const artlabel = this.add.image(710, 84, "book", "book/artlabel0001");

        // stairsbutton
        const stairsbutton = this.add.image(1356.4125, 276.525, "book", "book/stairs0004");
        stairsbutton.setOrigin(0, 0);
        stairsbutton.alpha = 0.01;
        stairsbutton.alphaTopLeft = 0.01;
        stairsbutton.alphaTopRight = 0.01;
        stairsbutton.alphaBottomLeft = 0.01;
        stairsbutton.alphaBottomRight = 0.01;

        // stairslight
        const stairslight = this.add.image(1360, 278, "book", "book/stairs0002");
        stairslight.setOrigin(0, 0);
        stairslight.visible = false;

        // chair1_trigger
        const chair1_trigger = this.add.image(515.1375, 809.8875, "book", "book/chair1_trigger");
        chair1_trigger.setOrigin(0, 0);
        chair1_trigger.visible = false;

        // chair2_trigger
        const chair2_trigger = this.add.image(645.6375, 807.6375, "book", "book/chair2_trigger");
        chair2_trigger.setOrigin(0, 0);
        chair2_trigger.visible = false;

        // book
        const book = this.add.image(1566.5625, 909.3375, "book", "book/book0001");
        book.setOrigin(0, 0);

        // booklabel
        const booklabel = this.add.image(1584, 942, "book", "book/booklabel0001");
        booklabel.setOrigin(0, 0);

        // lists
        const triggers = [coffee_trigger, chair2_trigger, chair1_trigger];

        // artshowcasebutton (components)
        const artshowcasebuttonButtonComponent = new ButtonComponent(artshowcasebutton);
        artshowcasebuttonButtonComponent.handCursor = true;
        artshowcasebuttonButtonComponent.pixelPerfect = true;

        // mancalanotice (components)
        const mancalanoticeButtonComponent = new ButtonComponent(mancalanotice);
        mancalanoticeButtonComponent.upTexture = {"key":"book","frame":"book/mancalanotice0001"};
        mancalanoticeButtonComponent.overTexture = {"key":"book","frame":"book/mancalanotice0002"};
        mancalanoticeButtonComponent.handCursor = true;
        mancalanoticeButtonComponent.pixelPerfect = true;

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
        booksButtonComponent.upTexture = {"key":"book","frame":"book/books0001"};
        booksButtonComponent.overTexture = {"key":"book","frame":"book/books0002"};
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

        // mancalaBoard1 (components)
        new DepthEnabled(mancalaBoard1);

        // mancalaBoard2 (components)
        new DepthEnabled(mancalaBoard2);

        // mancalaBoard3 (components)
        new DepthEnabled(mancalaBoard3);

        // mancalaBoard4 (components)
        new DepthEnabled(mancalaBoard4);

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
        new PressureTrigger(chair1_trigger);

        // chair2_trigger (components)
        new PressureTrigger(chair2_trigger);

        // book (components)
        const bookButtonComponent = new ButtonComponent(book);
        bookButtonComponent.upTexture = {"key":"book","frame":"book/book0001"};
        bookButtonComponent.overTexture = {"key":"book","frame":"book/book0002"};
        bookButtonComponent.handCursor = true;
        bookButtonComponent.pixelPerfect = true;
        const bookDepthEnabled = new DepthEnabled(book);
        bookDepthEnabled.automaticSort = false;
        bookDepthEnabled.depth = 1108;

        // booklabel (components)
        const booklabelDepthEnabled = new DepthEnabled(booklabel);
        booklabelDepthEnabled.automaticSort = false;
        booklabelDepthEnabled.depth = 1108;

        this.artshowcase = artshowcase;
        this.artshowcasebutton = artshowcasebutton;
        this.mancalanotice = mancalanotice;
        this.mancalatitle = mancalatitle;
        this.block = block;
        this.books = books;
        this.boardLabel = boardLabel;
        this.times = times;
        this.mancalaBoard1 = mancalaBoard1;
        this.mancalaBoard2 = mancalaBoard2;
        this.mancalaBoard3 = mancalaBoard3;
        this.mancalaBoard4 = mancalaBoard4;
        this.conveyoritems = conveyoritems;
        this.conveyorroll = conveyorroll;
        this.artlabel = artlabel;
        this.stairsbutton = stairsbutton;
        this.stairslight = stairslight;
        this.chair1_trigger = chair1_trigger;
        this.chair2_trigger = chair2_trigger;
        this.book = book;
        this.booklabel = booklabel;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public artshowcase!: Phaser.GameObjects.Image;
    public artshowcasebutton!: Phaser.GameObjects.Image;
    public mancalanotice!: Phaser.GameObjects.Image;
    public mancalatitle!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public books!: Phaser.GameObjects.Image;
    public boardLabel!: Phaser.GameObjects.Image;
    public times!: Phaser.GameObjects.Image;
    public mancalaBoard1!: MancalaBoard;
    public mancalaBoard2!: MancalaBoard;
    public mancalaBoard3!: MancalaBoard;
    public mancalaBoard4!: MancalaBoard;
    public conveyoritems!: Phaser.GameObjects.Sprite;
    public conveyorroll!: Phaser.GameObjects.Sprite;
    public artlabel!: Phaser.GameObjects.Image;
    public stairsbutton!: Phaser.GameObjects.Image;
    public stairslight!: Phaser.GameObjects.Image;
    public chair1_trigger!: Phaser.GameObjects.Image;
    public chair2_trigger!: Phaser.GameObjects.Image;
    public book!: Phaser.GameObjects.Image;
    public booklabel!: Phaser.GameObjects.Image;
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

        this.stairsbutton.on('over', () => {
            this.sound.play('book_lighton');
            this.stairslight.visible = true;
        });
        this.stairsbutton.on('out', () => {
            this.sound.play('book_lightoff');
            this.stairslight.visible = false;
        });
        this.stairsbutton.on('release', () => this.world.move(1419.75, 463.5));

        this.artshowcasebutton.on('over', () => this.artshowcase.setFrame('book/artshowcase0002'));
        this.artshowcasebutton.on('out', () => this.artshowcase.setFrame('book/artshowcase0001'));

        this.book.on('over', () => {
            this.sound.play('book_bookopen');
            this.book.setFrame('book/book0002');
            this.booklabel.visible = false;
        });
        this.book.on('out', () => {
            this.sound.play('book_bookclose');
            this.book.setFrame('book/book0001');
            this.booklabel.visible = true;
        });

        PressureTrigger.getComponent(this.chair1_trigger).execute = () => this.updatePressState();
        PressureTrigger.getComponent(this.chair2_trigger).execute = () => this.updatePressState();

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

        let active = trigger1.active || trigger2.active;

        if (active && !this.conveyoritems.anims.isPlaying) {
            this.conveyoritems.play('book-conveyoritems-animation');
            this.conveyorroll.play('book-conveyorroll-animation');
            this.sound.play('book_conveyor', {
                loop: true
            });
        } else if (!active && this.conveyoritems.anims.isPlaying) {
            this.conveyoritems.stop();
            this.conveyoritems.setFrame('book/conveyoritems0001');
            this.conveyorroll.stop();
            this.conveyorroll.setFrame('book/conveyorroll0001');
            this.sound.stopByKey('book_conveyor');
        }
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('book-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
