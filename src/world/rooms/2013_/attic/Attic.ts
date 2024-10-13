
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Attic extends Phaser.Scene implements Room {

    constructor() {
        super("Attic");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    editorCreate(): void {

        // rectangle_1
        const rectangle_1 = this.add.rectangle(427, 553, 820, 256);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.isFilled = true;

        // beach_block
        const beach_block = this.add.image(0, 0, "beach", "beach/block");
        beach_block.setOrigin(0, 0);

        // berg_block
        const berg_block = this.add.image(0, 0, "berg", "berg/block");
        berg_block.setOrigin(0, 0);

        // book_block
        const book_block = this.add.image(-112.5, 0, "book", "book/block");
        book_block.setOrigin(0, 0);
        book_block.visible = false;

        // coffee_block
        const coffee_block = this.add.image(0, 0, "coffee", "coffee/block");
        coffee_block.setOrigin(0, 0);

        // cove_block
        const cove_block = this.add.image(0, 0, "cove", "cove/block");
        cove_block.setOrigin(0, 0);
        cove_block.visible = false;

        // dance_block
        const dance_block = this.add.image(0, 0, "dance", "dance/block");
        dance_block.setOrigin(0, 0);

        // dock_block
        const dock_block = this.add.image(0, 0, "dock", "dock/block");
        dock_block.setOrigin(0, 0);

        // dojoext_block
        const dojoext_block = this.add.image(0, 0, "dojoext", "dojoext/block");
        dojoext_block.setOrigin(0, 0);
        dojoext_block.visible = false;

        // forest_block
        const forest_block = this.add.image(0, 0, "forest", "forest/block");
        forest_block.setOrigin(0, 0);

        // forts_block
        const forts_block = this.add.image(0, 0, "forts", "forts/block");
        forts_block.setOrigin(0, 0);

        // lounge_block
        const lounge_block = this.add.image(0, 0, "lounge", "lounge/block");
        lounge_block.setOrigin(0, 0);

        // mtn_block
        const mtn_block = this.add.image(0, 0, "mtn", "mtn/block");
        mtn_block.setOrigin(0, 0);
        mtn_block.visible = false;

        // plaza_block
        const plaza_block = this.add.image(0, 0, "plaza", "plaza/block");
        plaza_block.setOrigin(0, 0);

        // rink_block
        const rink_block = this.add.image(0, 0, "rink", "rink/block");
        rink_block.setOrigin(0, 0);

        // shack_block
        const shack_block = this.add.image(0, 0, "shack", "shack/block");
        shack_block.setOrigin(0, 0);

        // shop_block
        const shop_block = this.add.image(0, 0, "shop", "shop/block");
        shop_block.setOrigin(0, 0);

        // town_block
        const town_block = this.add.image(0, 0, "town", "town/block");
        town_block.setOrigin(0, 0);

        // village_block
        const village_block = this.add.image(0, 0, "village", "village/block");
        village_block.setOrigin(0, 0);

        this.events.emit("scene-awake");
    }

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

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {

    }

    unload(engine: Engine): void {
        engine.app.locale.unregister(this.localize);
        //engine.app.unloadAssetPack('-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
