/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class Notifications extends Phaser.Scene {

    constructor() {
        super("Notifications");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    editorCreate(): void {

        this.events.emit("scene-awake");
    }

    /* START-USER-CODE */

    // Write your code here

    create(): void {

        this.editorCreate();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
