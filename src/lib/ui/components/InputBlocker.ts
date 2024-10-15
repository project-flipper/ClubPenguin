/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class InputBlocker {

    constructor(gameObject: Phaser.GameObjects.GameObject) {
        this.gameObject = gameObject;
        (gameObject as any)["__InputBlocker"] = this;

        /* START-USER-CTR-CODE */

        gameObject.setInteractive();

        /* END-USER-CTR-CODE */
    }

    static getComponent(gameObject: Phaser.GameObjects.GameObject): InputBlocker {
        return (gameObject as any)["__InputBlocker"];
    }

    private gameObject: Phaser.GameObjects.GameObject;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
