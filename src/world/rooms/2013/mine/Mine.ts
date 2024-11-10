
// You can write more code here

/* START OF COMPILED CODE */

import DepthEnabled from "../../../../lib/components/DepthEnabled";
import GameTrigger from "../../../../lib/components/GameTrigger";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Mine extends Phaser.Scene {

    constructor() {
        super("Mine");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("mine2013-pack", "assets/world/rooms/2013/mine/mine2013-pack.json");
    }

    editorCreate(): void {

        // mine_base
        const mine_base = this.add.image(-6.75, 12.94, "mine2013", "mine/base");
        mine_base.setOrigin(0, 0);

        // rescuesign
        const rescuesign = this.add.image(513, 47.25, "mine2013", "mine/rescuesign0001");
        rescuesign.setOrigin(0, 0);

        // board
        const board = this.add.image(497.25, 103.5, "mine2013", "mine/rescue0001_0001");
        board.setOrigin(0, 0);

        // mine_shelf
        const mine_shelf = this.add.image(382.39, 139.73, "mine2013", "mine/shelf");
        mine_shelf.setOrigin(0, 0);

        // cart
        const cart = this.add.sprite(1316.25, 279, "mine2013", "mine/cart0001");
        cart.setOrigin(0, 0);
        cart.visible = false;

        // cavelit
        const cavelit = this.add.image(708.19, 122.18, "mine2013", "mine/cave");
        cavelit.setOrigin(0, 0);

        // mine_bulb0001
        const mine_bulb0001 = this.add.sprite(900, 186.75, "mine2013", "mine/bulb0001");
        mine_bulb0001.setOrigin(0, 0);
        mine_bulb0001.play("mine2013-bulb-animation");

        // mine_bulbs
        const mine_bulbs = this.add.image(812.93, 137.25, "mine2013", "mine/bulbs");
        mine_bulbs.setOrigin(0, 0);

        // mine_entrance
        const mine_entrance = this.add.image(733.5, -13.5, "mine2013", "mine/entrance");
        mine_entrance.setOrigin(0, 0);

        // mine_details
        const mine_details = this.add.image(398.25, -31.5, "mine2013", "mine/details");
        mine_details.setOrigin(0, 0);

        // mine_caveback
        const mine_caveback = this.add.image(765.56, 479.59, "mine2013", "mine/caveback");
        mine_caveback.setOrigin(0.4999569707401033, 0.8801636363636364);

        // mine_flame
        const mine_flame = this.add.sprite(346.5, 200.25, "mine2013", "mine/flame0001");
        mine_flame.setOrigin(0, 0);
        mine_flame.play("mine2013-flame-animation");

        // mine_cavefront
        const mine_cavefront = this.add.image(352.58, 647.89, "mine2013", "mine/cavefront");
        mine_cavefront.setOrigin(0.5001106500691562, 0.8512873862158647);

        // mine_poles
        const mine_poles = this.add.image(1256.29, 413.66, "mine2013", "mine/poles");
        mine_poles.setOrigin(0.5009937888198758, 0.9359354838709677);

        // minesign
        const minesign = this.add.image(1348.43, 584.78, "mine2013", "mine/minesign0001");
        minesign.setOrigin(0.5001375515818433, 0.8645508100147276);

        // mine_rocks
        const mine_rocks = this.add.image(910.58, 296.44, "mine2013", "mine/rocks");
        mine_rocks.setOrigin(0.4840555555555555, -0.12651785714285715);

        // mine_foreground
        const mine_foreground = this.add.image(-3.6, 767.03, "mine2013", "mine/foreground");
        mine_foreground.setOrigin(0, 0);

        // mine_chair
        const mine_chair = this.add.image(632.59, 322.65, "mine2013", "mine/chair");
        mine_chair.setOrigin(0.3422222222222222, 0.3465333333333333);

        // mine_desk
        const mine_desk = this.add.image(528.86, 348.19, "mine2013", "mine/desk");
        mine_desk.setOrigin(0, 0);

        // phone
        const phone = this.add.sprite(569.25, 357.75, "mine2013", "mine/phone0001");
        phone.scaleX = 0.95;
        phone.setOrigin(0, 0);

        // puffle
        const puffle = this.add.sprite(693, 362.25, "mine2013", "mine/puffle0001");
        puffle.setOrigin(0, 0);

        // eyes
        const eyes = this.add.sprite(704.25, 383.5, "mine2013", "mine/eyes0001");
        eyes.setOrigin(0, 0);
        eyes.play("mine2013-eyes-animation");

        // mine_minecart2
        const mine_minecart2 = this.add.image(1279.35, 474.98, "mine2013", "mine/minecart2");
        mine_minecart2.setOrigin(0.5006111111111111, 0.5865408805031447);

        // mine_mineshovel
        const mine_mineshovel = this.add.image(1026.79, 517.73, "mine2013", "mine/mineshovel");
        mine_mineshovel.setOrigin(0.497816091954023, 0.8291095890410959);

        // mine_minecart1
        const mine_minecart1 = this.add.image(1135.69, 528.64, "mine2013", "mine/minecart1");
        mine_minecart1.setOrigin(0.4999568965517241, 0.6354455445544556);

        // block
        const block = this.add.image(0, 0, "mine2013", "mine/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // mine_cart_trigger
        const mine_cart_trigger = this.add.image(1435.05, 446.06, "mine2013", "mine/cart_trigger");
        mine_cart_trigger.visible = false;

        // mine_cavemine_trigger
        const mine_cavemine_trigger = this.add.image(918.11, 372.6, "mine2013", "mine/cavemine_trigger");
        mine_cavemine_trigger.visible = false;

        // mine_cave_trigger
        const mine_cave_trigger = this.add.image(141.41, 571.05, "mine2013", "mine/cave_trigger");
        mine_cave_trigger.visible = false;

        // mine_rescue_trigger
        const mine_rescue_trigger = this.add.image(669.49, 470.36, "mine2013", "mine/rescue_trigger");
        mine_rescue_trigger.visible = false;

        // rescuebtn
        const rescuebtn = this.add.image(515.25, 166.5, "mine2013", "mine/rescuehover");
        rescuebtn.setOrigin(0, 0);
        rescuebtn.alpha = 0.0001;
        rescuebtn.alphaTopLeft = 0.0001;
        rescuebtn.alphaTopRight = 0.0001;
        rescuebtn.alphaBottomLeft = 0.0001;
        rescuebtn.alphaBottomRight = 0.0001;

        // cartbtn
        const cartbtn = this.add.image(1377, 200.25, "mine2013", "mine/carthover");
        cartbtn.setOrigin(0, 0);
        cartbtn.alpha = 0.0001;
        cartbtn.alphaTopLeft = 0.0001;
        cartbtn.alphaTopRight = 0.0001;
        cartbtn.alphaBottomLeft = 0.0001;
        cartbtn.alphaBottomRight = 0.0001;

        // pufflebtn
        const pufflebtn = this.add.image(717.3, 384.08, "mine2013", "mine/puffle_btn0004");
        pufflebtn.alpha = 0.0001;
        pufflebtn.alphaTopLeft = 0.0001;
        pufflebtn.alphaTopRight = 0.0001;
        pufflebtn.alphaBottomLeft = 0.0001;
        pufflebtn.alphaBottomRight = 0.0001;

        // phonebtn
        const phonebtn = this.add.image(597.49, 383.96, "mine2013", "mine/phone_btn0004");
        phonebtn.alpha = 0.0001;
        phonebtn.alphaTopLeft = 0.0001;
        phonebtn.alphaTopRight = 0.0001;
        phonebtn.alphaBottomLeft = 0.0001;
        phonebtn.alphaBottomRight = 0.0001;

        // lists
        const triggers = [mine_cart_trigger, mine_rescue_trigger, mine_cave_trigger, mine_cavemine_trigger];

        // cart (components)
        const cartDepthEnabled = new DepthEnabled(cart);
        cartDepthEnabled.automaticSort = false;
        cartDepthEnabled.depth = 345.6;

        // mine_cavefront (components)
        new DepthEnabled(mine_cavefront);

        // mine_poles (components)
        new DepthEnabled(mine_poles);

        // minesign (components)
        new DepthEnabled(minesign);

        // mine_rocks (components)
        new DepthEnabled(mine_rocks);

        // mine_foreground (components)
        const mine_foregroundDepthEnabled = new DepthEnabled(mine_foreground);
        mine_foregroundDepthEnabled.automaticSort = false;
        mine_foregroundDepthEnabled.depth = 1080;

        // mine_chair (components)
        new DepthEnabled(mine_chair);

        // mine_desk (components)
        const mine_deskDepthEnabled = new DepthEnabled(mine_desk);
        mine_deskDepthEnabled.automaticSort = false;
        mine_deskDepthEnabled.depth = 418.84;

        // phone (components)
        const phoneDepthEnabled = new DepthEnabled(phone);
        phoneDepthEnabled.automaticSort = false;
        phoneDepthEnabled.depth = 418.84;

        // puffle (components)
        const puffleDepthEnabled = new DepthEnabled(puffle);
        puffleDepthEnabled.automaticSort = false;
        puffleDepthEnabled.depth = 418.84;

        // eyes (components)
        const eyesDepthEnabled = new DepthEnabled(eyes);
        eyesDepthEnabled.automaticSort = false;
        eyesDepthEnabled.depth = 418.84;

        // mine_minecart2 (components)
        new DepthEnabled(mine_minecart2);

        // mine_mineshovel (components)
        new DepthEnabled(mine_mineshovel);

        // mine_minecart1 (components)
        new DepthEnabled(mine_minecart1);

        // mine_cart_trigger (components)
        const mine_cart_triggerGameTrigger = new GameTrigger(mine_cart_trigger);
        mine_cart_triggerGameTrigger.game_id = "cart";
        mine_cart_triggerGameTrigger.prompt = "cart_prompt";

        // mine_cavemine_trigger (components)
        const mine_cavemine_triggerRoomTrigger = new RoomTrigger(mine_cavemine_trigger);
        mine_cavemine_triggerRoomTrigger.destination = 813;
        mine_cavemine_triggerRoomTrigger.playerX = 243;
        mine_cavemine_triggerRoomTrigger.playerY = 668.25;

        // mine_cave_trigger (components)
        const mine_cave_triggerRoomTrigger = new RoomTrigger(mine_cave_trigger);
        mine_cave_triggerRoomTrigger.destination = 806;
        mine_cave_triggerRoomTrigger.playerX = 1399.5;
        mine_cave_triggerRoomTrigger.playerY = 810;

        // mine_rescue_trigger (components)
        const mine_rescue_triggerGameTrigger = new GameTrigger(mine_rescue_trigger);
        mine_rescue_triggerGameTrigger.game_id = "rescue";
        mine_rescue_triggerGameTrigger.prompt = "rescue_prompt";

        // rescuebtn (components)
        const rescuebtnButtonComponent = new ButtonComponent(rescuebtn);
        rescuebtnButtonComponent.handCursor = true;

        // cartbtn (components)
        const cartbtnButtonComponent = new ButtonComponent(cartbtn);
        cartbtnButtonComponent.handCursor = true;
        cartbtnButtonComponent.pixelPerfect = true;

        // pufflebtn (components)
        const pufflebtnButtonComponent = new ButtonComponent(pufflebtn);
        pufflebtnButtonComponent.pixelPerfect = true;

        // phonebtn (components)
        const phonebtnButtonComponent = new ButtonComponent(phonebtn);
        phonebtnButtonComponent.handCursor = true;
        phonebtnButtonComponent.pixelPerfect = true;

        this.rescuesign = rescuesign;
        this.board = board;
        this.cart = cart;
        this.cavelit = cavelit;
        this.minesign = minesign;
        this.phone = phone;
        this.puffle = puffle;
        this.eyes = eyes;
        this.block = block;
        this.rescuebtn = rescuebtn;
        this.cartbtn = cartbtn;
        this.pufflebtn = pufflebtn;
        this.phonebtn = phonebtn;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public rescuesign!: Phaser.GameObjects.Image;
    public board!: Phaser.GameObjects.Image;
    public cart!: Phaser.GameObjects.Sprite;
    public cavelit!: Phaser.GameObjects.Image;
    public minesign!: Phaser.GameObjects.Image;
    public phone!: Phaser.GameObjects.Sprite;
    public puffle!: Phaser.GameObjects.Sprite;
    public eyes!: Phaser.GameObjects.Sprite;
    public block!: Phaser.GameObjects.Image;
    public rescuebtn!: Phaser.GameObjects.Image;
    public cartbtn!: Phaser.GameObjects.Image;
    public pufflebtn!: Phaser.GameObjects.Image;
    public phonebtn!: Phaser.GameObjects.Image;
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

        this.cartbtn.on('over', () => {
            this.cart.visible = true;
            this.cart.play('mine2013-cart-animation');
            this.interface.showLocalizedHint({ x: 1396.35, y: 345.6 }, 'cart_hint');
        });
        this.cartbtn.on('out', () => {
            this.cart.visible = false;
            this.cart.stop();
            this.interface.hideHint();
        });
        this.cartbtn.on('release', () => this.world.move(1417.5, 450));

        this.rescuebtn.on('over', () => {
            this.board.setFrame(`mine/rescue${this.game.locale.frame}_0002`);
            this.interface.showLocalizedHint({ x: 629.44, y: 235.8 }, 'rescue_hint');
        });
        this.rescuebtn.on('out', () => {
            this.board.setFrame(`mine/rescue${this.game.locale.frame}_0001`);
            this.interface.hideHint();
        });
        this.rescuebtn.on('release', () => this.world.move(675, 450));

        this.pufflebtn.on('over', () => {
            if (!this.puffle.anims.isPlaying) {
                this.puffle.play('mine2013-puffle-animation');
                this.eyes.visible = false;
                this.puffle.once('animationcomplete', () => {
                    this.puffle.setFrame('mine/puffle0001');
                    this.eyes.play('mine2013-eyes-animation');
                    this.eyes.visible = true;
                });
            }
        });
        this.phonebtn.on('over', () => {
            if (!this.phone.anims.isPlaying) {
                this.sound.play('mine2013-ring');
                this.phone.play('mine2013-phone-animation');
                // The Flash client forgot to unmark the phone hover button as a hand cursor.
                // As a result, you could briefly see the hand cursor when hovering over the phone.
                // This imiates this behavior as a fun easter egg. :)
                this.phonebtn.visible = false;
                this.phone.once('animationcomplete', () => {
                    this.phonebtn.visible = true;
                });
            }
        });

        this.tweens.chain({
            targets: this.cavelit,
            tweens: [
                {
                    alpha: { from: 0, to : 1 },
                    duration: 958.333333,
                    delay: 875
                },
                {
                    alpha: { from: 1, to : 0 },
                    duration: 875,
                    delay: 583.333333
                }
            ],
            loop: -1
        });

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.board.setFrame(`mine/rescue${this.game.locale.frame}_${this.board.frame.name.endsWith("2") ? "0002" : "0001"}`);
        this.minesign.setFrame(`mine/minesign${this.game.locale.frame}`);
        this.rescuesign.setFrame(`mine/rescuesign${this.game.locale.frame}`);
    }

    unload(engine: Engine): void {
        engine.app.locale.unregister(this.localize);
        engine.app.unloadAssetPack('mine2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
