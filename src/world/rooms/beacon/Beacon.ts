
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { App } from "../../../app/app";
import { Engine,  Room } from "../../engine/engine";
import Interface from "../../interface/Interface";
import { Locale } from "../../../app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Beacon extends Phaser.Scene implements Room {

    constructor() {
        super("Beacon");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    editorCreate(): void {

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
        this.game.locale.unregister(this.localize);
        //engine.app.unloadAssetPack('-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
