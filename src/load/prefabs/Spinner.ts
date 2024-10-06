/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class Spinner extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // background
        const background = scene.add.image(0, 0, "load", "load-screen/background");
        background.setOrigin(0, 0);
        this.add(background);

        // spinner
        const spinner = scene.add.sprite(7.287499999999998, 6.162499999999998, "load", "load-screen/spinner0001");
        spinner.setOrigin(0, 0);
        this.add(spinner);

        // content
        const content = scene.add.image(52.3125, 15.6375, "load", "load-screen/content");
        content.setOrigin(0, 0);
        this.add(content);

        this.content = content;

        /* START-USER-CTR-CODE */

        spinner.play('load-spinner-animation');
        this._barStartX = this.content.x - this.content.displayWidth;

        /* END-USER-CTR-CODE */
    }

    public content: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    _barStartX: number;

    setProgress(percent: number): void {
        let delta = this.content.displayWidth * percent;
        this.content.x = this._barStartX + delta;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
