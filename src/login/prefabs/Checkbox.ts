
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Checkbox extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 10, y ?? 11);

        // button
        const button = scene.add.image(0, 0, "login", "login-screen/checkbox");
        button.setOrigin(0.41666667, 0.58333333);
        this.add(button);

        // checkOverlay
        const checkOverlay = scene.add.image(0, 0, "login", "login-screen/checkboxChecked");
        checkOverlay.setOrigin(0.41666667, 0.58333333);
        this.add(checkOverlay);

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.handCursor = true;

        this.button = button;
        this.checkOverlay = checkOverlay;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */

        // custom definition props
        this.checked = false;
    }

    public button: Phaser.GameObjects.Image;
    public checkOverlay: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    private _state: boolean;

    get checked(): boolean {
        return this._state;
    }

    set checked(state: boolean) {
        this._state = state;
        this.checkOverlay.visible = state;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
