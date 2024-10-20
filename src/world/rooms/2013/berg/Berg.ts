
// You can write more code here

/* START OF COMPILED CODE */

import Aqua from "./prefabs/Aqua";
import GameTrigger from "../../../../lib/components/GameTrigger";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Engine,  Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Berg extends Phaser.Scene implements Room {

    constructor() {
        super("Berg");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("berg-pack", "assets/world/rooms/2013/berg/berg-pack.json");
    }

    editorCreate(): void {

        // berg_sky
        const berg_sky = this.add.image(-22.5, -22.5, "berg", "berg/sky");
        berg_sky.setOrigin(0, 0);

        // berg_island
        const berg_island = this.add.image(774.7875, 83.475, "berg", "berg/island");
        berg_island.setOrigin(0, 0);

        // berg_base
        const berg_base = this.add.image(-22.5, 193.1625, "berg", "berg/base");
        berg_base.setOrigin(0, 0);

        // block
        const block = this.add.image(0, 0, "berg", "berg/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // aqua
        const aqua = new Aqua(this, 1246.275, 240.75);
        this.add.existing(aqua);

        // aqua_mc
        const aqua_mc = this.add.image(1163.1375, 304.425, "berg", "berg/aqua_mc");
        aqua_mc.setOrigin(0, 0);
        aqua_mc.visible = false;

        // lists
        const triggers = [aqua_mc];

        // aqua_mc (components)
        const aqua_mcGameTrigger = new GameTrigger(aqua_mc);
        aqua_mcGameTrigger.game_id = "aqua";
        aqua_mcGameTrigger.prompt = "aqua_prompt";

        this.block = block;
        this.aqua = aqua;
        this.aqua_mc = aqua_mc;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public block!: Phaser.GameObjects.Image;
    public aqua!: Aqua;
    public aqua_mc!: Phaser.GameObjects.Image;
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

        let aquaFloat = this.add.timeline([{
            at: 0,
            run: () => this.aqua.y = 240.75
        }, {
            at: 1666.66667,
            run: () => this.aqua.y = 243
        }, {
            at: 3333.3333,
            run: () => aquaFloat.play(true)
        }]);
        aquaFloat.play();

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {

    }

    unload(engine: Engine): void {
        engine.app.locale.unregister(this.localize);
        engine.app.unloadAssetPack('berg-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
