
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Engine from "../../engine/Engine";
/* END-USER-IMPORTS */

export default class Snowball extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // shadow
        const shadow = scene.add.image(0, 0, "engine", "engine/snowballShadow");
        this.add(shadow);

        // art
        const art = scene.add.image(0, 0, "engine", "engine/snowball0002");
        this.add(art);

        this.shadow = shadow;
        this.art = art;

        /* START-USER-CTR-CODE */

        this.engine = this.scene.scene.get('Engine') as Engine;
        this.visible = false;

        /* END-USER-CTR-CODE */
    }

    public shadow: Phaser.GameObjects.Image;
    public art: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    public engine: Engine;
    public speed = 800;

    start(tween: Phaser.Tweens.Tween): void {
        this.visible = true;
    }

    step(tween: Phaser.Tweens.Tween, curve: Phaser.Curves.QuadraticBezier): void {
        let position = curve.getPoint(tween.totalProgress);

        this.x = position.x;
        this.art.y = position.y - this.y;

        this.depth = this.y + 1;
    }

    complete(tween: Phaser.Tweens.Tween): void {
        this.art.y = 0;
        this.art.setFrame('engine/snowball0002');
    }

    destroy(fromScene?: boolean): void {
        if (this.engine) {
            let snowballs = this.engine.snowballs;
            if (snowballs.includes(this)) snowballs.splice(snowballs.indexOf(this), 1);
        }
        super.destroy(fromScene);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
