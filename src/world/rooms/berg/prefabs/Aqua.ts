
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Aqua extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // aqua
        const aqua = scene.add.image(0, 0, "berg", "berg/aqua");
        aqua.setOrigin(0, 0.00852);
        this.add(aqua);

        // inside
        const inside = scene.add.sprite(58, 4.85, "berg", "berg/aqua_inside0001");
        inside.setOrigin(0.26832685, -0.18965116);
        inside.visible = false;
        this.add(inside);

        // lights
        const lights = scene.add.sprite(54.5, 132.25, "berg", "berg/aqua_lights0015");
        lights.setOrigin(0, 0);
        lights.visible = false;
        this.add(lights);

        // aqua (components)
        const aquaButtonComponent = new ButtonComponent(aqua);
        aquaButtonComponent.handCursor = true;
        aquaButtonComponent.pixelPerfect = true;

        this.aqua = aqua;
        this.inside = inside;
        this.lights = lights;

        /* START-USER-CTR-CODE */



        /* END-USER-CTR-CODE */
    }

    public aqua: Phaser.GameObjects.Image;
    public inside: Phaser.GameObjects.Sprite;
    public lights: Phaser.GameObjects.Sprite;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
