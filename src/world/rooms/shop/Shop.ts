
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import DepthEnabled from "../../../lib/ui/components/DepthEnabled";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import RoomTrigger from "../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "../../../app/app";
import Engine, { Room } from "../../engine/Engine";
import Interface from "../../interface/Interface";
import { Locale } from "../../../app/locale";
/* END-USER-IMPORTS */

export default class Shop extends Phaser.Scene implements Room {

    constructor() {
        super("Shop");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("shop-pack", "assets/world/rooms/shop/shop-pack.json");
    }

    editorCreate(): void {

        // shop_base
        const shop_base = this.add.image(-123.8625, -54.3375, "shop", "shop/base");
        shop_base.setOrigin(0, 0);

        // shop_clothes
        const shop_clothes = this.add.image(399.375, 572.175, "shop", "shop/clothes");
        shop_clothes.setOrigin(0.48888298, 0.7045933);

        // door
        const door = this.add.image(1170.675, 163.6875, "shop", "shop/door0001");
        door.setOrigin(0, 0);

        // changeroom
        const changeroom = this.add.image(474.3, 170.8875, "shop", "shop/changeroom0001");
        changeroom.setOrigin(0, 0);

        // speakers
        const speakers = this.add.sprite(608.85, 148.8375, "shop", "shop/speakers0001");
        speakers.setOrigin(0, 0);

        // shop_chair2
        const shop_chair2 = this.add.image(1243.125, 652.3875, "shop", "shop/chair2");
        shop_chair2.setOrigin(0.48390411, 0.10389313);

        // shop_chair1
        const shop_chair1 = this.add.image(1175.625, 726.1875, "shop", "shop/chair1");
        shop_chair1.setOrigin(0.4855483870967742, 0.1334108527131783);

        // shop_chairback1
        const shop_chairback1 = this.add.image(328.275, 708.975, "shop", "shop/chairback1");
        shop_chairback1.setOrigin(0.4854761904761905, 0.49038461538461536);

        // shop_chairrest1
        const shop_chairrest1 = this.add.image(344.475, 780.975, "shop", "shop/chairrest1");
        shop_chairrest1.setOrigin(0.4765979381443299, 0.6707407407407407);

        // shop_chairback2
        const shop_chairback2 = this.add.image(376.2, 841.6125, "shop", "shop/chairback2");
        shop_chairback2.setOrigin(0.48622950819672134, 0.49101960784313725);

        // shop_chairrest2
        const shop_chairrest2 = this.add.image(393.8625, 919.125, "shop", "shop/chairrest2");
        shop_chairrest2.setOrigin(0.48, 0.6520339);

        // shop_chair3
        const shop_chair3 = this.add.image(1528.65, 396.675, "shop", "shop/chair3");
        shop_chair3.setOrigin(0.4826087, 0.42723404);

        // shop_desk
        const shop_desk = this.add.image(1363.05, 406.35, "shop", "shop/desk");
        shop_desk.setOrigin(0, 0);

        // register
        const register = this.add.sprite(1371.6, 299.025, "shop", "shop/registeropen0001");
        register.setOrigin(0, 0);

        // chest
        const chest = this.add.image(1451.25, 531.5625, "shop", "shop/chest0001");
        chest.setOrigin(0, 0);

        // display
        const display = this.add.sprite(1517.5125, 421.425, "shop", "shop/display0001");
        display.setOrigin(0, 0);

        // shop_foreground1
        const shop_foreground1 = this.add.image(-74.8125, -20.3625, "shop", "shop/foreground1");
        shop_foreground1.setOrigin(0, 0);

        // shop_foreground2
        const shop_foreground2 = this.add.image(498.825, 737.4375, "shop", "shop/foreground2");
        shop_foreground2.setOrigin(0, 0);

        // shop_bluelightflare
        const shop_bluelightflare = this.add.image(405.1125, -54.225, "shop", "shop/bluelightflare");
        shop_bluelightflare.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "shop", "shop/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // display_button
        const display_button = this.add.image(1543.8375, 417.2625, "shop", "shop/display_button0004");
        display_button.setOrigin(0, 0);
        display_button.alpha = 0.01;
        display_button.alphaTopLeft = 0.01;
        display_button.alphaTopRight = 0.01;
        display_button.alphaBottomLeft = 0.01;
        display_button.alphaBottomRight = 0.01;

        // register_button
        const register_button = this.add.image(1377, 357.75, "shop", "shop/register_button0004");
        register_button.setOrigin(0, 0);
        register_button.alpha = 0.01;
        register_button.alphaTopLeft = 0.01;
        register_button.alphaTopRight = 0.01;
        register_button.alphaBottomLeft = 0.01;
        register_button.alphaBottomRight = 0.01;

        // shop_redemption_trigger
        const shop_redemption_trigger = this.add.image(1500.75, 648, "shop", "shop/redemption_trigger");
        shop_redemption_trigger.visible = false;

        // shop_town_trigger
        const shop_town_trigger = this.add.image(1231.875, 399.375, "shop", "shop/town_trigger");
        shop_town_trigger.visible = false;

        // shop_changeroom_trigger
        const shop_changeroom_trigger = this.add.image(520.875, 450, "shop", "shop/changeroom_trigger");
        shop_changeroom_trigger.visible = false;

        // unlockbook
        const unlockbook = this.add.image(1495.35, 796.1625, "shop", "shop/unlockbook0001");
        unlockbook.setOrigin(0, 0);

        // stylebook
        const stylebook = this.add.image(1501.9875, 922.05, "shop", "shop/stylebook0001");
        stylebook.setOrigin(0, 0);

        // chest_btn
        const chest_btn = this.add.image(1514.3625, 600.075, "shop", "shop/chest_btn");
        chest_btn.alpha = 0.01;
        chest_btn.alphaTopLeft = 0.01;
        chest_btn.alphaTopRight = 0.01;
        chest_btn.alphaBottomLeft = 0.01;
        chest_btn.alphaBottomRight = 0.01;

        // changeroom_btn
        const changeroom_btn = this.add.image(510.6375, 312.8625, "shop", "shop/changeroom_btn");
        changeroom_btn.alpha = 0.01;
        changeroom_btn.alphaTopLeft = 0.01;
        changeroom_btn.alphaTopRight = 0.01;
        changeroom_btn.alphaBottomLeft = 0.01;
        changeroom_btn.alphaBottomRight = 0.01;

        // door_btn
        const door_btn = this.add.image(1235.8125, 261.5625, "shop", "shop/door_btn");
        door_btn.alpha = 0.01;
        door_btn.alphaTopLeft = 0.01;
        door_btn.alphaTopRight = 0.01;
        door_btn.alphaBottomLeft = 0.01;
        door_btn.alphaBottomRight = 0.01;

        // lists
        const triggers = [shop_town_trigger];

        // shop_clothes (components)
        new DepthEnabled(shop_clothes);

        // changeroom (components)
        const changeroomButtonComponent = new ButtonComponent(changeroom);
        changeroomButtonComponent.upTexture = { "key": "shop", "frame": "shop/changeroom0001" };
        changeroomButtonComponent.overTexture = { "key": "shop", "frame": "shop/changeroom0002" };
        changeroomButtonComponent.handCursor = true;
        changeroomButtonComponent.pixelPerfect = true;

        // shop_chair2 (components)
        new DepthEnabled(shop_chair2);

        // shop_chair1 (components)
        new DepthEnabled(shop_chair1);

        // shop_chairback1 (components)
        new DepthEnabled(shop_chairback1);

        // shop_chairrest1 (components)
        new DepthEnabled(shop_chairrest1);

        // shop_chairback2 (components)
        new DepthEnabled(shop_chairback2);

        // shop_chairrest2 (components)
        new DepthEnabled(shop_chairrest2);

        // shop_chair3 (components)
        new DepthEnabled(shop_chair3);

        // shop_desk (components)
        const shop_deskDepthEnabled = new DepthEnabled(shop_desk);
        shop_deskDepthEnabled.automaticSort = false;
        shop_deskDepthEnabled.depth = 553.95;

        // register (components)
        const registerDepthEnabled = new DepthEnabled(register);
        registerDepthEnabled.automaticSort = false;
        registerDepthEnabled.depth = 553.95;

        // chest (components)
        const chestDepthEnabled = new DepthEnabled(chest);
        chestDepthEnabled.automaticSort = false;
        chestDepthEnabled.depth = 640.575;

        // display (components)
        const displayDepthEnabled = new DepthEnabled(display);
        displayDepthEnabled.automaticSort = false;
        displayDepthEnabled.depth = 553.95;

        // shop_foreground1 (components)
        const shop_foreground1DepthEnabled = new DepthEnabled(shop_foreground1);
        shop_foreground1DepthEnabled.automaticSort = false;
        shop_foreground1DepthEnabled.depth = 1080;

        // shop_foreground2 (components)
        const shop_foreground2DepthEnabled = new DepthEnabled(shop_foreground2);
        shop_foreground2DepthEnabled.automaticSort = false;
        shop_foreground2DepthEnabled.depth = 1080;

        // display_button (components)
        const display_buttonButtonComponent = new ButtonComponent(display_button);
        display_buttonButtonComponent.pixelPerfect = true;

        // register_button (components)
        const register_buttonButtonComponent = new ButtonComponent(register_button);
        register_buttonButtonComponent.pixelPerfect = true;

        // shop_town_trigger (components)
        const shop_town_triggerRoomTrigger = new RoomTrigger(shop_town_trigger);
        shop_town_triggerRoomTrigger.destination = "100";
        shop_town_triggerRoomTrigger.playerX = 1192.5;
        shop_town_triggerRoomTrigger.playerY = 551.25;

        // unlockbook (components)
        const unlockbookButtonComponent = new ButtonComponent(unlockbook);
        unlockbookButtonComponent.upTexture = { "key": "shop", "frame": "shop/unlockbook0001" };
        unlockbookButtonComponent.overTexture = { "key": "shop", "frame": "shop/unlockbook0002" };
        unlockbookButtonComponent.handCursor = true;
        unlockbookButtonComponent.pixelPerfect = true;
        const unlockbookDepthEnabled = new DepthEnabled(unlockbook);
        unlockbookDepthEnabled.automaticSort = false;
        unlockbookDepthEnabled.depth = 1081;

        // stylebook (components)
        const stylebookButtonComponent = new ButtonComponent(stylebook);
        stylebookButtonComponent.overTexture = { "key": "shop", "frame": "shop/stylebook_open" };
        stylebookButtonComponent.handCursor = true;
        stylebookButtonComponent.pixelPerfect = true;
        const stylebookDepthEnabled = new DepthEnabled(stylebook);
        stylebookDepthEnabled.automaticSort = false;
        stylebookDepthEnabled.depth = 1081;

        // chest_btn (components)
        const chest_btnButtonComponent = new ButtonComponent(chest_btn);
        chest_btnButtonComponent.handCursor = true;
        chest_btnButtonComponent.pixelPerfect = true;

        // changeroom_btn (components)
        const changeroom_btnButtonComponent = new ButtonComponent(changeroom_btn);
        changeroom_btnButtonComponent.handCursor = true;
        changeroom_btnButtonComponent.pixelPerfect = true;

        // door_btn (components)
        const door_btnButtonComponent = new ButtonComponent(door_btn);
        door_btnButtonComponent.handCursor = true;
        door_btnButtonComponent.pixelPerfect = true;

        this.door = door;
        this.changeroom = changeroom;
        this.speakers = speakers;
        this.register = register;
        this.chest = chest;
        this.display = display;
        this.block = block;
        this.display_button = display_button;
        this.register_button = register_button;
        this.unlockbook = unlockbook;
        this.stylebook = stylebook;
        this.chest_btn = chest_btn;
        this.changeroom_btn = changeroom_btn;
        this.door_btn = door_btn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public door!: Phaser.GameObjects.Image;
    public changeroom!: Phaser.GameObjects.Image;
    public speakers!: Phaser.GameObjects.Sprite;
    public register!: Phaser.GameObjects.Sprite;
    public chest!: Phaser.GameObjects.Image;
    public display!: Phaser.GameObjects.Sprite;
    public block!: Phaser.GameObjects.Image;
    public display_button!: Phaser.GameObjects.Image;
    public register_button!: Phaser.GameObjects.Image;
    public unlockbook!: Phaser.GameObjects.Image;
    public stylebook!: Phaser.GameObjects.Image;
    public chest_btn!: Phaser.GameObjects.Image;
    public changeroom_btn!: Phaser.GameObjects.Image;
    public door_btn!: Phaser.GameObjects.Image;
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

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    public registerOpen: boolean;

    create(data: any) {

        this.editorCreate();

        this.speakers.play('shop-speakers-animation');

        this.door_btn.on('over', () => {
            this.door.setFrame('shop/door0002');
            this.sound.play('shop_dooropen');
        });
        this.door_btn.on('out', () => {
            this.door.setFrame('shop/door0001');
            this.sound.play('shop_doorclose');
        });
        this.door_btn.on('release', () => this.engine.movePlayer(1237.5, 405));

        this.changeroom_btn.on('over', () => {
            this.changeroom.setFrame('shop/changeroom0002');
            this.sound.play('shop_changeroomopen');
        });
        this.changeroom_btn.on('out', () => {
            this.changeroom.setFrame('shop/changeroom0001');
            this.sound.play('shop_changeroomclose');
        });
        this.changeroom_btn.on('release', () => this.engine.movePlayer(528.75, 438.75));

        this.chest_btn.on('over', () => {
            this.chest.setFrame('shop/chest0002');
            this.sound.play('shop_chestopen');
        });
        this.chest_btn.on('out', () => {
            this.chest.setFrame('shop/chest0001');
            this.sound.play('shop_chestclose');
        });
        this.chest_btn.on('release', () => this.engine.movePlayer(1485, 663.75));

        this.registerOpen = false;
        this.register_button.on('over', () => {
            if (this.register.anims.isPlaying) return;

            if (!this.registerOpen) {
                this.sound.play('shop_registeropen');
                this.register.play('shop-registeropen-animation');
                this.registerOpen = true;
            } else {
                this.sound.play('shop_registerclose');
                this.register.play('shop-registerclose-animation');
                this.registerOpen = false;
            }
        });

        this.display_button.on('over', () => {
            if (this.display.anims.isPlaying) return;

            this.sound.play('shop_displayspin');
            this.display.play('shop-displayspin-animation');
        });

        this.unlockbook.on('over', () => this.sound.play('shop_bookopen'));
        this.unlockbook.on('out', () => this.sound.play('shop_bookclose'));

        this.stylebook.on('over', () => this.sound.play('shop_bookopen'));

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.stylebook.setFrame(`shop/stylebook${locale.frame}`);
        this.stylebook.off('out');
        this.stylebook.on('out', () => {
            this.sound.play('shop_bookclose');
            this.stylebook.setFrame(`shop/stylebook${locale.frame}`);
        });
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.game.unloadAssetPack('shop-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
