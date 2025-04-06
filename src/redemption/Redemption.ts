/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
/* END-USER-IMPORTS */

export default class Redemption extends Phaser.Scene {

    constructor() {
        super("Redemption");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("redemption-pack", "assets/redemption/redemption-pack.json");
    }

    editorCreate(): void {

        this.events.emit("scene-awake");
    }

    /* START-USER-CODE */

    get loadScreen(): Load {
        return this.scene.get('Load') as Load;
    }

    init(): void {
        let load = this.loadScreen;

        load.track(new LoaderTask('Redemption loader', this.load));
        if (!load.isShowing) load.show();
    }

    create(): void {

        this.editorCreate();

        let load = this.loadScreen;
        if (load.isShowing) load.waitAllTasksComplete().then(() => load.hide());
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
