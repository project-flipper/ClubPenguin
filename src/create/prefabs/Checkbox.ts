/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class Checkbox extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // graphic
        const graphic = scene.add.rectangle(0, 0, 38.25, 38.25);
        graphic.setOrigin(0, 0);
        graphic.isFilled = true;
        graphic.isStroked = true;
        graphic.strokeColor = 13619412;
        graphic.lineWidth = 4.5;
        this.add(graphic);

        // checkmark
        const checkmark = scene.add.image(16.3125, 25.3125, "create", "create-module/checkmark");
        checkmark.setOrigin(0.36957, 0.72973);
        this.add(checkmark);

        this.graphic = graphic;
        this.checkmark = checkmark;

        /* START-USER-CTR-CODE */

        graphic.setInteractive({ useHandCursor: this.handCursor, pixelPerfect: this.pixelPerfect });
        graphic.on('pointerup', this.onPointerUp, this);

        /* END-USER-CTR-CODE */

        // custom definition props
        this.flag = false;
        this.handCursor = true;
        this.pixelPerfect = false;
    }

    public graphic: Phaser.GameObjects.Rectangle;
    public checkmark: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    private _handCursor: boolean;
    private _pixelPerfect: boolean;

    get handCursor(): boolean {
        return this._handCursor;
    }

    set handCursor(val: boolean) {
        this.scene.input.setHitArea(this.graphic, { useHandCursor: val });
    }

    get pixelPerfect(): boolean {
        return this._pixelPerfect;
    }

    set pixelPerfect(val: boolean) {
        if (val) {
            let callback = this.scene.input.makePixelPerfect() as Phaser.Types.Input.HitAreaCallback;
            this.graphic.input.hitArea = {};
            this.graphic.input.hitAreaCallback = callback;
        } else this.scene.input.setHitAreaFromTexture(this.graphic);

        this.graphic.input.customHitArea = val;
    }

    public _state: boolean;

    get flag(): boolean {
        return this._state;
    }

    set flag(state: boolean) {
        if (this._state !== state) {
            this._state = state;
            this.checkmark.visible = state;
            this.emit('stateupdate', state);
        }
    }

    onPointerUp(): void {
        this.flag = !this.flag;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
