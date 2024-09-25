
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../../lib/ui/components/ButtonComponent";
import DepthEnabled from "../../../../lib/ui/components/DepthEnabled";
import Trigger from "../../../../lib/ui/components/Trigger";
import RoomTrigger from "../../../../lib/ui/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Pizza extends Phaser.Scene implements Room {

    constructor() {
        super("Pizza");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("pizza-pack", "assets/world/rooms/2013/pizza/pizza-pack.json");
    }

    editorCreate(): void {

        // pizza_base
        const pizza_base = this.add.image(0, 0, "pizza", "pizza/base");
        pizza_base.setOrigin(0.09918483904465213, 0.02);

        // kitchensign
        const kitchensign = this.add.image(290.25, 89.34, "pizza", "pizza/kitchensign0001");
        kitchensign.setOrigin(0, 0);

        // kitchendoor
        const kitchendoor = this.add.image(282.38, 121.95, "pizza", "pizza/kitchendoor0001");
        kitchendoor.setOrigin(0, 0);

        // kitchendoor_hit
        const kitchendoor_hit = this.add.image(282.38, 121.95, "pizza", "pizza/kitchendoor0004");
        kitchendoor_hit.setOrigin(0, 0);
        kitchendoor_hit.alpha = 0.01;
        kitchendoor_hit.alphaTopLeft = 0.01;
        kitchendoor_hit.alphaTopRight = 0.01;
        kitchendoor_hit.alphaBottomLeft = 0.01;
        kitchendoor_hit.alphaBottomRight = 0.01;

        // door
        const door = this.add.image(696.38, 70.31, "pizza", "pizza/door0001");
        door.setOrigin(0, 0);

        // door_hit
        const door_hit = this.add.image(696.38, 70.31, "pizza", "pizza/door0004");
        door_hit.setOrigin(0, 0);
        door_hit.alpha = 0.01;
        door_hit.alphaTopLeft = 0.01;
        door_hit.alphaTopRight = 0.01;
        door_hit.alphaBottomLeft = 0.01;
        door_hit.alphaBottomRight = 0.01;

        // pizza_arc
        const pizza_arc = this.add.image(0, 0, "pizza", "pizza/arc");
        pizza_arc.setOrigin(-0.027106261859582544, 0.10418013856812933);

        // pizza_seats
        const pizza_seats = this.add.image(793.8, 891.23, "pizza", "pizza/seats");
        pizza_seats.setOrigin(0.4988972565895643, 0.7266153846153846);

        // pizza_stage
        const pizza_stage = this.add.image(1544.74, 481.16, "pizza", "pizza/stage");
        pizza_stage.setOrigin(0.48323863636363634, 0.8432642487046632);

        // pizza_stagestool
        const pizza_stagestool = this.add.image(1437.64, 496.69, "pizza", "pizza/stagestool");
        pizza_stagestool.setOrigin(0.4745977011494253, 0.06964285714285715);

        // pizza_speaker
        const pizza_speaker = this.add.image(1641.6, 635.4, "pizza", "pizza/speaker");
        pizza_speaker.setOrigin(0.468, 0.37321739130434783);

        // pizza_mic
        const pizza_mic = this.add.image(1477.8, 609.86, "pizza", "pizza/mic");
        pizza_mic.setOrigin(0.48594249201277956, 0.4525373134328358);

        // pizza_curtain
        const pizza_curtain = this.add.image(1525.16, 661.16, "pizza", "pizza/curtain");
        pizza_curtain.setOrigin(0.49646753246753245, 0.8879420289855072);

        // pizza_seatback
        const pizza_seatback = this.add.image(1053.9, 386.33, "pizza", "pizza/seatback");
        pizza_seatback.setOrigin(0.47472527472527476, 0.7157062146892655);

        // pizza_squaretable
        const pizza_squaretable = this.add.image(1244.59, 396, "pizza", "pizza/squaretable");
        pizza_squaretable.setOrigin(0.4864835164835165, 0.8245508982035927);

        // pizza_desk
        const pizza_desk = this.add.image(604.24, 383.4, "pizza", "pizza/desk");
        pizza_desk.setOrigin(0.4758196721311475, 0.7596396396396395);

        // pizza_chair1
        const pizza_chair1 = this.add.image(752.85, 514.8, "pizza", "pizza/chair1");
        pizza_chair1.setOrigin(0.4811607142857143, 0.42937172774869115);

        // pizza_chair2
        const pizza_chair2 = this.add.image(914.96, 471.83, "pizza", "pizza/chair2");
        pizza_chair2.setOrigin(0.48214285714285715, 0.42937172774869115);

        // pizza_table1
        const pizza_table1 = this.add.image(850.84, 643.73, "pizza", "pizza/table1");
        pizza_table1.setOrigin(0.4897512437810945, 0.759375);

        // pizza_chair3
        const pizza_chair3 = this.add.image(1013.74, 664.43, "pizza", "pizza/chair3");
        pizza_chair3.setOrigin(0.48191666666666666, 0.4272677595628415);

        // pizza_chair4
        const pizza_chair4 = this.add.image(1153.24, 538.2, "pizza", "pizza/chair4");
        pizza_chair4.setOrigin(0.47980392156862745, 0.4354054054054054);

        // pizza_table2
        const pizza_table2 = this.add.image(1164.26, 708.41, "pizza", "pizza/table2");
        pizza_table2.setOrigin(0.5022727272727273, 0.7672164948453608);

        // pizza_stool
        const pizza_stool = this.add.image(559.13, 462.6, "pizza", "pizza/stool");
        pizza_stool.setOrigin(0.47351648351648357, 0.0921551724137931);

        // pizza_stool_1
        const pizza_stool_1 = this.add.image(562.5, 555.3, "pizza", "pizza/stool");
        pizza_stool_1.setOrigin(0.47351648351648357, 0.0921551724137931);

        // pizza_counter
        const pizza_counter = this.add.image(409.5, 532.69, "pizza", "pizza/counter");
        pizza_counter.setOrigin(0.48847368421052634, 0.49619402985074623);

        // register
        const register = this.add.sprite(387.9, 408.04, "pizza", "pizza/register0001");
        register.setOrigin(0.5495575221238939, 0.6435119047619048);

        // pizza_counter2
        const pizza_counter2 = this.add.image(363.83, 642.6, "pizza", "pizza/counter2");
        pizza_counter2.setOrigin(0.49411764705882355, 0.6368551236749116);

        // stoolbtn
        const stoolbtn = this.add.image(1438.88, 523.13, "pizza", "pizza/stoolbtn0004");
        stoolbtn.alpha = 0.01;
        stoolbtn.alphaTopLeft = 0.01;
        stoolbtn.alphaTopRight = 0.01;
        stoolbtn.alphaBottomLeft = 0.01;
        stoolbtn.alphaBottomRight = 0.01;

        // seat4btn
        const seat4btn = this.add.image(1150.88, 574.88, "pizza", "pizza/seatbtn0004");
        seat4btn.setOrigin(0.45, 0.49675);
        seat4btn.alpha = 0.01;
        seat4btn.alphaTopLeft = 0.01;
        seat4btn.alphaTopRight = 0.01;
        seat4btn.alphaBottomLeft = 0.01;
        seat4btn.alphaBottomRight = 0.01;

        // seat3btn
        const seat3btn = this.add.image(1018.13, 694.13, "pizza", "pizza/seatbtn0004");
        seat3btn.setOrigin(0.45, 0.4967532467532468);
        seat3btn.alpha = 0.01;
        seat3btn.alphaTopLeft = 0.01;
        seat3btn.alphaTopRight = 0.01;
        seat3btn.alphaBottomLeft = 0.01;
        seat3btn.alphaBottomRight = 0.01;

        // seat2btn
        const seat2btn = this.add.image(905.63, 502.88, "pizza", "pizza/seatbtn0004");
        seat2btn.setOrigin(0.45, 0.4967532467532468);
        seat2btn.alpha = 0.01;
        seat2btn.alphaTopLeft = 0.01;
        seat2btn.alphaTopRight = 0.01;
        seat2btn.alphaBottomLeft = 0.01;
        seat2btn.alphaBottomRight = 0.01;

        // seat1btn
        const seat1btn = this.add.image(752.63, 550.13, "pizza", "pizza/seatbtn0004");
        seat1btn.setOrigin(0.45, 0.4967532467532468);
        seat1btn.alpha = 0.01;
        seat1btn.alphaTopLeft = 0.01;
        seat1btn.alphaTopRight = 0.01;
        seat1btn.alphaBottomLeft = 0.01;
        seat1btn.alphaBottomRight = 0.01;

        // stool1btn
        const stool1btn = this.add.image(559.13, 487.13, "pizza", "pizza/stoolbtn0004");
        stool1btn.alpha = 0.01;
        stool1btn.alphaTopLeft = 0.01;
        stool1btn.alphaTopRight = 0.01;
        stool1btn.alphaBottomLeft = 0.01;
        stool1btn.alphaBottomRight = 0.01;

        // stool2btn
        const stool2btn = this.add.image(561.38, 579.38, "pizza", "pizza/stoolbtn0004");
        stool2btn.alpha = 0.01;
        stool2btn.alphaTopLeft = 0.01;
        stool2btn.alphaTopRight = 0.01;
        stool2btn.alphaBottomLeft = 0.01;
        stool2btn.alphaBottomRight = 0.01;

        // stool3btn
        const stool3btn = this.add.image(498.38, 664.88, "pizza", "pizza/stoolbtn0004");
        stool3btn.alpha = 0.01;
        stool3btn.alphaTopLeft = 0.01;
        stool3btn.alphaTopRight = 0.01;
        stool3btn.alphaBottomLeft = 0.01;
        stool3btn.alphaBottomRight = 0.01;

        // standbtn
        const standbtn = this.add.image(562.5, 362.25, "pizza", "pizza/standbtn0004");
        standbtn.alpha = 0.01;
        standbtn.alphaTopLeft = 0.01;
        standbtn.alphaTopRight = 0.01;
        standbtn.alphaBottomLeft = 0.01;
        standbtn.alphaBottomRight = 0.01;

        // registerbtn
        const registerbtn = this.add.image(387.9, 408.04, "pizza", "pizza/registerbtn0004");
        registerbtn.setOrigin(0.5011818181818182, 0.49963963963963964);
        registerbtn.alpha = 0.01;
        registerbtn.alphaTopLeft = 0.01;
        registerbtn.alphaTopRight = 0.01;
        registerbtn.alphaBottomLeft = 0.01;
        registerbtn.alphaBottomRight = 0.01;

        // pizzatron_trigger
        const pizzatron_trigger = this.add.image(376.88, 348.75, "pizza", "pizza/pizzatron_trigger");
        pizzatron_trigger.visible = false;

        // plaza_trigger
        const plaza_trigger = this.add.image(859.5, 348.75, "pizza", "pizza/plaza_trigger");
        plaza_trigger.visible = false;

        // pizza_foreground
        const pizza_foreground = this.add.image(0, 0, "pizza", "pizza/foreground");
        pizza_foreground.setOrigin(-0.028756476683937826, 0.03481874447391689);

        // block
        const block = this.add.image(0, 0, "pizza", "pizza/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // lists
        const triggers = [pizzatron_trigger, plaza_trigger];

        // kitchendoor_hit (components)
        const kitchendoor_hitButtonComponent = new ButtonComponent(kitchendoor_hit);
        kitchendoor_hitButtonComponent.handCursor = true;
        kitchendoor_hitButtonComponent.pixelPerfect = true;

        // door_hit (components)
        const door_hitButtonComponent = new ButtonComponent(door_hit);
        door_hitButtonComponent.handCursor = true;
        door_hitButtonComponent.pixelPerfect = true;

        // pizza_seats (components)
        new DepthEnabled(pizza_seats);

        // pizza_stage (components)
        new DepthEnabled(pizza_stage);

        // pizza_stagestool (components)
        new DepthEnabled(pizza_stagestool);

        // pizza_speaker (components)
        new DepthEnabled(pizza_speaker);

        // pizza_mic (components)
        new DepthEnabled(pizza_mic);

        // pizza_curtain (components)
        new DepthEnabled(pizza_curtain);

        // pizza_seatback (components)
        new DepthEnabled(pizza_seatback);

        // pizza_squaretable (components)
        new DepthEnabled(pizza_squaretable);

        // pizza_desk (components)
        new DepthEnabled(pizza_desk);

        // pizza_chair1 (components)
        new DepthEnabled(pizza_chair1);

        // pizza_chair2 (components)
        new DepthEnabled(pizza_chair2);

        // pizza_table1 (components)
        new DepthEnabled(pizza_table1);

        // pizza_chair3 (components)
        new DepthEnabled(pizza_chair3);

        // pizza_chair4 (components)
        new DepthEnabled(pizza_chair4);

        // pizza_table2 (components)
        new DepthEnabled(pizza_table2);

        // pizza_stool (components)
        new DepthEnabled(pizza_stool);

        // pizza_stool_1 (components)
        new DepthEnabled(pizza_stool_1);

        // pizza_counter (components)
        const pizza_counterDepthEnabled = new DepthEnabled(pizza_counter);
        pizza_counterDepthEnabled.automaticSort = false;
        pizza_counterDepthEnabled.depth = 498.94;

        // register (components)
        const registerDepthEnabled = new DepthEnabled(register);
        registerDepthEnabled.automaticSort = false;
        registerDepthEnabled.depth = 498.94;

        // pizza_counter2 (components)
        new DepthEnabled(pizza_counter2);

        // stoolbtn (components)
        const stoolbtnButtonComponent = new ButtonComponent(stoolbtn);
        stoolbtnButtonComponent.pixelPerfect = true;

        // seat4btn (components)
        const seat4btnButtonComponent = new ButtonComponent(seat4btn);
        seat4btnButtonComponent.pixelPerfect = true;

        // seat3btn (components)
        const seat3btnButtonComponent = new ButtonComponent(seat3btn);
        seat3btnButtonComponent.pixelPerfect = true;

        // seat2btn (components)
        const seat2btnButtonComponent = new ButtonComponent(seat2btn);
        seat2btnButtonComponent.pixelPerfect = true;

        // seat1btn (components)
        const seat1btnButtonComponent = new ButtonComponent(seat1btn);
        seat1btnButtonComponent.pixelPerfect = true;

        // stool1btn (components)
        const stool1btnButtonComponent = new ButtonComponent(stool1btn);
        stool1btnButtonComponent.pixelPerfect = true;

        // stool2btn (components)
        const stool2btnButtonComponent = new ButtonComponent(stool2btn);
        stool2btnButtonComponent.pixelPerfect = true;

        // stool3btn (components)
        const stool3btnButtonComponent = new ButtonComponent(stool3btn);
        stool3btnButtonComponent.pixelPerfect = true;

        // standbtn (components)
        const standbtnButtonComponent = new ButtonComponent(standbtn);
        standbtnButtonComponent.pixelPerfect = true;

        // registerbtn (components)
        const registerbtnButtonComponent = new ButtonComponent(registerbtn);
        registerbtnButtonComponent.pixelPerfect = true;

        // pizzatron_trigger (components)
        new Trigger(pizzatron_trigger);

        // plaza_trigger (components)
        const plaza_triggerRoomTrigger = new RoomTrigger(plaza_trigger);
        plaza_triggerRoomTrigger.destination = 300;
        plaza_triggerRoomTrigger.playerX = 1260;
        plaza_triggerRoomTrigger.playerY = 630;

        // pizza_foreground (components)
        const pizza_foregroundDepthEnabled = new DepthEnabled(pizza_foreground);
        pizza_foregroundDepthEnabled.automaticSort = false;
        pizza_foregroundDepthEnabled.depth = 1080;

        this.kitchensign = kitchensign;
        this.kitchendoor = kitchendoor;
        this.kitchendoor_hit = kitchendoor_hit;
        this.door = door;
        this.door_hit = door_hit;
        this.register = register;
        this.stoolbtn = stoolbtn;
        this.seat4btn = seat4btn;
        this.seat3btn = seat3btn;
        this.seat2btn = seat2btn;
        this.seat1btn = seat1btn;
        this.stool1btn = stool1btn;
        this.stool2btn = stool2btn;
        this.stool3btn = stool3btn;
        this.standbtn = standbtn;
        this.registerbtn = registerbtn;
        this.pizzatron_trigger = pizzatron_trigger;
        this.plaza_trigger = plaza_trigger;
        this.block = block;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public kitchensign!: Phaser.GameObjects.Image;
    public kitchendoor!: Phaser.GameObjects.Image;
    public kitchendoor_hit!: Phaser.GameObjects.Image;
    public door!: Phaser.GameObjects.Image;
    public door_hit!: Phaser.GameObjects.Image;
    public register!: Phaser.GameObjects.Sprite;
    public stoolbtn!: Phaser.GameObjects.Image;
    public seat4btn!: Phaser.GameObjects.Image;
    public seat3btn!: Phaser.GameObjects.Image;
    public seat2btn!: Phaser.GameObjects.Image;
    public seat1btn!: Phaser.GameObjects.Image;
    public stool1btn!: Phaser.GameObjects.Image;
    public stool2btn!: Phaser.GameObjects.Image;
    public stool3btn!: Phaser.GameObjects.Image;
    public standbtn!: Phaser.GameObjects.Image;
    public registerbtn!: Phaser.GameObjects.Image;
    public pizzatron_trigger!: Phaser.GameObjects.Image;
    public plaza_trigger!: Phaser.GameObjects.Image;
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

    create(data: any) {

        this.editorCreate();

        this.standbtn.on('release', () => this.world.move(553.5, 351));
        this.stoolbtn.on('release', () => this.world.move(1440, 513));
        this.stool1btn.on('release', () => this.world.move(555.75, 479.25));
        this.stool2btn.on('release', () => this.world.move(560.25, 573.75));
        this.stool3btn.on('release', () => this.world.move(492.75, 659.25));
        this.seat1btn.on('release', () => this.world.move(753.75, 540));
        this.seat2btn.on('release', () => this.world.move(911.25, 499.5));
        this.seat3btn.on('release', () => this.world.move(1026, 688.5));
        this.seat4btn.on('release', () => this.world.move(1156.5, 569.25));

        this.door_hit.on('over', () => {
            this.sound.play('pizza_dooropen');
            this.door.setFrame('pizza/door0002');
        })
        this.door_hit.on('out', () => {
            this.sound.play('pizza_doorclose');
            this.door.setFrame('pizza/door0001');
            this.interface.hideHint();
        })
        this.door_hit.on('release', () => this.world.move(855.0, 348.75));

        this.kitchendoor_hit.on('over', () => {
            this.sound.play('pizza_kitchendooropen');
            this.kitchendoor.setFrame('pizza/kitchendoor0002');
            this.interface.showLocalizedHint({ x: 371.25, y: 213.75 }, 'pizzatron_hint');
        })
        this.kitchendoor_hit.on('out', () => {
            this.sound.play('pizza_kitchendoorclose');
            this.kitchendoor.setFrame('pizza/kitchendoor0001');
            this.interface.hideHint();
        })
        this.kitchendoor_hit.on('release', () => this.world.move(371.25, 348.75));

        Trigger.getComponent(this.pizzatron_trigger).execute = (engine, player) => {
            if (engine.player != player) return;
            this.interface.promptQuestion.showLocalized('pizzatron_prompt', () => {
                this.world.startGame('pizzatron', {});
            }, () => { });
        }

        this.cashOpen = false;
        this.registerbtn.on('over', () => {
            if (this.register.anims.isPlaying) return;

            if (!this.cashOpen) {
                this.sound.play('pizza_registeropen');
                this.register.play('pizza-registeropen-animation');
                this.cashOpen = true;
            } else {
                this.sound.play('pizza_registerclose');
                this.register.play('pizza-registerclose-animation');
                this.cashOpen = false;
            }
        });

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        this.kitchensign.setFrame(`pizza/kitchensign${locale.frame}`);
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('pizza-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
