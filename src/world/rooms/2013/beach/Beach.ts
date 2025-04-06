
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/components/ButtonComponent";
import DepthEnabled from "../../../../lib/components/DepthEnabled";
import RoomTrigger from "../../../../lib/components/RoomTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine,  Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Beach extends Phaser.Scene implements Room {

    constructor() {
        super("Beach");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("beach2013-pack", "assets/world/rooms/2013/beach/beach2013-pack.json");
    }

    editorCreate(): void {

        // beach_sky
        const beach_sky = this.add.image(-22.5, -22.5, "beach2013", "beach/sky");
        beach_sky.setOrigin(0, 0);

        // beach_sea
        const beach_sea = this.add.image(-162.9, 258.75, "beach2013", "beach/sea");
        beach_sea.setOrigin(0, 0);

        // migrator
        const migrator = this.add.container(0, 0);

        // ship
        const ship = this.add.image(41.7375, -9, "beach2013", "beach/migrator0001");
        ship.setOrigin(0, 0);
        migrator.add(ship);

        // migratortext
        const migratortext = this.add.image(51.4125, 178.7625, "beach2013", "beach/migratortext0001");
        migratortext.setOrigin(0, 0);
        migrator.add(migratortext);

        // migratorplank
        const migratorplank = this.add.image(570.4874, 376.7625, "beach2013", "beach/migratorplank");
        migratorplank.setOrigin(0, 1);
        migrator.add(migratorplank);

        // beach_base
        const beach_base = this.add.image(20.3625, -22.5, "beach2013", "beach/base");
        beach_base.setOrigin(0, 0);

        // door
        const door = this.add.image(367.65, 235.6875, "beach2013", "beach/door0001");
        door.setOrigin(0, 0);

        // door_btn
        const door_btn = this.add.image(367.65, 235.6875, "beach2013", "beach/door0004");
        door_btn.setOrigin(0, 0);
        door_btn.alpha = 0.0001;
        door_btn.alphaTopLeft = 0.0001;
        door_btn.alphaTopRight = 0.0001;
        door_btn.alphaBottomLeft = 0.0001;
        door_btn.alphaBottomRight = 0.0001;

        // beach_trees
        const beach_trees = this.add.image(1544.175, 529.7625, "beach2013", "beach/trees");
        beach_trees.setOrigin(0.49528, 0.61407);

        // beach_rightrocks
        const beach_rightrocks = this.add.image(1510.425, 709.9875, "beach2013", "beach/rightrocks");
        beach_rightrocks.setOrigin(0.49721, 0.66169);

        // beach_leftrocks
        const beach_leftrocks = this.add.image(268.65, 667.125, "beach2013", "beach/leftrocks");
        beach_leftrocks.setOrigin(0.4948, 0.29926);

        // beach_castle
        const beach_castle = this.add.image(864, 746.8875, "beach2013", "beach/castle");
        beach_castle.setOrigin(0.48893, 0.33021);

        // bucket
        const bucket = this.add.sprite(1116, 711, "beach2013", "beach/bucket0001");
        bucket.setOrigin(0.10652406, 0.78891566);

        // bucket_btn
        const bucket_btn = this.add.image(1114.9875, 708.6375, "beach2013", "beach/bucket_btn");
        bucket_btn.setOrigin(0.32142857142857145, 0.8767647058823529);
        bucket_btn.alpha = 0.0001;
        bucket_btn.alphaTopLeft = 0.0001;
        bucket_btn.alphaTopRight = 0.0001;
        bucket_btn.alphaBottomLeft = 0.0001;
        bucket_btn.alphaBottomRight = 0.0001;

        // beach_railing
        const beach_railing = this.add.image(171.45, 594.5625, "beach2013", "beach/railing");
        beach_railing.setOrigin(0.48234848484848486, 0.6827906976744186);

        // beach_deckchairright
        const beach_deckchairright = this.add.image(1124.1, 572.0625, "beach2013", "beach/deckchairright");
        beach_deckchairright.setOrigin(0.4882075471698113, 0.7524186046511628);

        // beach_deckchairrest
        const beach_deckchairrest = this.add.image(1049.0625, 612.675, "beach2013", "beach/deckchairrest");
        beach_deckchairrest.setOrigin(0.47463414634146345, 0.7824107142857143);

        // beach_deckchairleft
        const beach_deckchairleft = this.add.image(941.0625, 601.2, "beach2013", "beach/deckchairleft");
        beach_deckchairleft.setOrigin(0.4830252100840336, 0.4523404255319149);

        // beach_stairsrailing
        const beach_stairsrailing = this.add.image(421.2, 443.25, "beach2013", "beach/stairsrailing");
        beach_stairsrailing.setOrigin(0.4714285714285714, 0.3242857142857143);

        // beach_dock_mc
        const beach_dock_mc = this.add.image(1328.2875, 420.3, "beach2013", "beach/dock_mc");
        beach_dock_mc.visible = false;

        // beach_village_mc
        const beach_village_mc = this.add.image(1040.9625, 335.25, "beach2013", "beach/village_mc");
        beach_village_mc.visible = false;

        // ship_mc
        const ship_mc = this.add.image(721.0125, 354.4875, "beach2013", "beach/ship_mc");
        ship_mc.visible = false;

        // beach_light_mc
        const beach_light_mc = this.add.image(482.175, 452.025, "beach2013", "beach/light_mc");
        beach_light_mc.visible = false;

        // block
        const block = this.add.image(0, 0, "beach2013", "beach/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // lists
        const triggers = [beach_light_mc, beach_village_mc, beach_dock_mc];

        // door_btn (components)
        const door_btnButtonComponent = new ButtonComponent(door_btn);
        door_btnButtonComponent.handCursor = true;
        door_btnButtonComponent.pixelPerfect = true;

        // beach_trees (components)
        new DepthEnabled(beach_trees);

        // beach_rightrocks (components)
        new DepthEnabled(beach_rightrocks);

        // beach_leftrocks (components)
        new DepthEnabled(beach_leftrocks);

        // beach_castle (components)
        new DepthEnabled(beach_castle);

        // bucket (components)
        new DepthEnabled(bucket);

        // bucket_btn (components)
        new ButtonComponent(bucket_btn);

        // beach_railing (components)
        new DepthEnabled(beach_railing);

        // beach_deckchairright (components)
        new DepthEnabled(beach_deckchairright);

        // beach_deckchairrest (components)
        new DepthEnabled(beach_deckchairrest);

        // beach_deckchairleft (components)
        new DepthEnabled(beach_deckchairleft);

        // beach_stairsrailing (components)
        new DepthEnabled(beach_stairsrailing);

        // beach_dock_mc (components)
        const beach_dock_mcRoomTrigger = new RoomTrigger(beach_dock_mc);
        beach_dock_mcRoomTrigger.destination = 800;
        beach_dock_mcRoomTrigger.playerX = 517.5;
        beach_dock_mcRoomTrigger.playerY = 405;

        // beach_village_mc (components)
        const beach_village_mcRoomTrigger = new RoomTrigger(beach_village_mc);
        beach_village_mcRoomTrigger.destination = 200;
        beach_village_mcRoomTrigger.playerX = 360;
        beach_village_mcRoomTrigger.playerY = 888.75;

        // ship_mc (components)
        const ship_mcRoomTrigger = new RoomTrigger(ship_mc);
        ship_mcRoomTrigger.destination = 420;
        ship_mcRoomTrigger.playerX = 990;
        ship_mcRoomTrigger.playerY = 675;

        // beach_light_mc (components)
        const beach_light_mcRoomTrigger = new RoomTrigger(beach_light_mc);
        beach_light_mcRoomTrigger.destination = 410;
        beach_light_mcRoomTrigger.playerX = 675;
        beach_light_mcRoomTrigger.playerY = 618.75;

        this.ship = ship;
        this.migratortext = migratortext;
        this.migratorplank = migratorplank;
        this.migrator = migrator;
        this.door = door;
        this.door_btn = door_btn;
        this.bucket = bucket;
        this.bucket_btn = bucket_btn;
        this.ship_mc = ship_mc;
        this.block = block;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public ship!: Phaser.GameObjects.Image;
    public migratortext!: Phaser.GameObjects.Image;
    public migratorplank!: Phaser.GameObjects.Image;
    public migrator!: Phaser.GameObjects.Container;
    public door!: Phaser.GameObjects.Image;
    public door_btn!: Phaser.GameObjects.Image;
    public bucket!: Phaser.GameObjects.Sprite;
    public bucket_btn!: Phaser.GameObjects.Image;
    public ship_mc!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
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

    public bucketState = 0;

    create(data: any) {

        this.editorCreate();

        this.migrator.visible = this.game.gameConfig.general.mascot_options.migrator_active;

        this.door_btn.on('over', () => {
            this.sound.play('beach2013-dooropen');
            this.door.setFrame('beach/door0002');
        });
        this.door_btn.on('out', () => {
            this.sound.play('beach2013-doorclose');
            this.door.setFrame('beach/door0001');
        });
        this.door_btn.on('release', () => {
            this.world.move(495, 450);
        });

        this.bucket.on('animationupdate', this.updateBucketSoundEffects, this);

        this.bucket_btn.on('over', () => {
            if (this.bucket.anims.isPlaying) return;

            if (this.bucketState > 4) this.bucketState = 0;

            switch (this.bucketState) {
                case 0:
                    this.bucket.play('beach2013-bucket0-animation');
                    this.bucket_btn.setFrame('beach/bucket_btn');
                    break;
                case 1:
                    this.bucket.play('beach2013-bucket1-animation');
                    this.bucket_btn.setFrame('beach/bucket_btn');
                    break;
                case 2:
                    this.bucket.play('beach2013-bucket2-animation');
                    this.bucket_btn.setFrame('beach/bucket_btn');
                    break;
                case 3:
                    this.bucket.play('beach2013-bucket3-animation');
                    this.bucket_btn.setFrame('beach/bucket_btn2');
                    break;
                case 4:
                    this.bucket.play('beach2013-bucket4-animation');
                    this.bucket_btn.setFrame('beach/bucket_btn');
                    break;
            }

            this.bucketState++;
        });

        if (this.migrator.visible) {
            this.tweens.add({
                targets: [this.ship, this.migratortext],
                y: '-=3.37',
                ease: 'Sine.InOut',
                duration: 1625,
                repeat: -1,
                repeatDelay: 416.666667,
                yoyo: true,
                hold: 416.666667
            });
            this.tweens.add({
                targets: this.migratorplank,
                scaleY: 1.02539,
                ease: 'Sine.InOut',
                duration: 1625,
                repeat: -1,
                repeatDelay: 416.666667,
                yoyo: true,
                hold: 416.666667
            });
            this.triggers.push(this.ship_mc);
        }

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    updateBucketSoundEffects(animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame): void {
        switch (animation.key) {
            case 'beach2013-bucket0-animation':
                if (frame.index == 2) this.sound.play('beach2013-bucket0');
                if (frame.index == 16) this.sound.play('beach2013-bucket1');
                if (frame.index == 53) this.sound.play('beach2013-bucket2');
                break;
            case 'beach2013-bucket1-animation':
                if (frame.index == 2) this.sound.play('beach2013-bucket0');
                if (frame.index == 15) this.sound.play('beach2013-bucket1');
                if (frame.index == 52) this.sound.play('beach2013-bucket2');
                break;
            case 'beach2013-bucket2-animation':
                if (frame.index == 2) this.sound.play('beach2013-bucket0');
                if (frame.index == 15) this.sound.play('beach2013-bucket1');
                if (frame.index == 52) this.sound.play('beach2013-bucket2');
                break;
            case 'beach2013-bucket3-animation':
                if (frame.index == 2) this.sound.play('beach2013-bucket3');
                if (frame.index == 37) this.sound.play('beach2013-bucket4');
                break;
            case 'beach2013-bucket4-animation':
                if (frame.index == 3) this.sound.play('beach2013-bucket5');
                if (frame.index == 24) this.sound.play('beach2013-bucket0');
                if (frame.index == 48) this.sound.play('beach2013-bucket6');
                if (frame.index == 72) this.sound.play('beach2013-bucket7');
                break;
        }
    }

    localize(locale: Locale): void {
        this.migratortext.setFrame(`beach/migratortext${locale.frame}`);
    }

    unload(engine: Engine): void {
        engine.app.locale.unregister(this.localize);
        engine.app.unloadAssetPack('beach2013-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
