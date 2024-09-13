
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { Engine } from "@clubpenguin/world/engine/engine";
import { Player } from "@clubpenguin/world/engine/player/avatar";
/* END-USER-IMPORTS */

export default class PressureTrigger {

    constructor(gameObject: Phaser.GameObjects.Image) {
        this.gameObject = gameObject;
        (gameObject as any)["__PressureTrigger"] = this;

        /* START-USER-CTR-CODE */

        this.active = false;

        /* END-USER-CTR-CODE */
    }

    static getComponent(gameObject: Phaser.GameObjects.Image): PressureTrigger {
        return (gameObject as any)["__PressureTrigger"];
    }

    private gameObject: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    public active: boolean;

    test(x: number, y: number): boolean {
        let point = new Phaser.Math.Vector2(0, 0);

        if (this.gameObject.parentContainer) {
            let matrix = new Phaser.GameObjects.Components.TransformMatrix();
            let parentMatrix = new Phaser.GameObjects.Components.TransformMatrix();

            this.gameObject.parentContainer.getWorldTransformMatrix(matrix, parentMatrix);
            matrix.applyInverse(x, y, point);
        } else {
            Phaser.Math.TransformXY(x, y, this.gameObject.x, this.gameObject.y, this.gameObject.rotation, this.gameObject.scaleX, this.gameObject.scaleY, point);
        }

        point.x += this.gameObject.displayOriginX;
        point.y += this.gameObject.displayOriginY;

        let test = this.gameObject.scene.input.makePixelPerfect();
        return test({}, point.x, point.y, this.gameObject);
    }

    execute(engine: Engine, player: Player): void { }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
