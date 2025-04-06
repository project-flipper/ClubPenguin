
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Engine } from "@clubpenguin/world/engine/engine";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import { ContentCls } from "@clubpenguin/world/interface/Interface";
/* END-USER-IMPORTS */

export default class ContentTrigger {

    constructor(gameObject: Phaser.GameObjects.Image) {
        this.gameObject = gameObject;
        (gameObject as any)["__ContentTrigger"] = this;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    static getComponent(gameObject: Phaser.GameObjects.Image): ContentTrigger {
        return (gameObject as any)["__ContentTrigger"];
    }

    private gameObject: Phaser.GameObjects.Image;
    public importFunction!: () => Promise<ContentCls>;
    public name: string = "";
    public contentType: "CONTENT"|"WINDOW" = "CONTENT";

    /* START-USER-CODE */

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

    execute(engine: Engine, player: Player): void {
        if (engine.player != player) return;

        switch (String(this.contentType)) {
            default:
                engine.interface.loadContent(this.name, this.importFunction);
                break;
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
