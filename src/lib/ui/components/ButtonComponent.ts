/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class ButtonComponent {

    constructor(gameObject: Phaser.GameObjects.Image) {
        this.gameObject = gameObject;
        (gameObject as any)["__ButtonComponent"] = this;

        /* START-USER-CTR-CODE */

        this.setup();

        /* END-USER-CTR-CODE */

        // custom definition props
        this.handCursor = false;
        this.pixelPerfect = false;
    }

    static getComponent(gameObject: Phaser.GameObjects.Image): ButtonComponent {
        return (gameObject as any)["__ButtonComponent"];
    }

    private gameObject: Phaser.GameObjects.Image;
    public upTexture!: {key:string,frame?:string|number};
    public overTexture!: {key:string,frame?:string|number};
    public downTexture!: {key:string,frame?:string|number};

    /* START-USER-CODE */

    private _handCursor: boolean;
    private _pixelPerfect: boolean;

    get handCursor(): boolean {
        return this._handCursor;
    }

    set handCursor(val: boolean) {
        this.gameObject.scene.input.setHitArea(this.gameObject, { useHandCursor: val });
    }

    get pixelPerfect(): boolean {
        return this._pixelPerfect;
    }

    set pixelPerfect(val: boolean) {
        if (val) {
            let callback = this.gameObject.scene.input.makePixelPerfect() as Phaser.Types.Input.HitAreaCallback;
            this.gameObject.input.hitArea = {};
            this.gameObject.input.hitAreaCallback = callback;
        } else this.gameObject.scene.input.setHitAreaFromTexture(this.gameObject);

        this.gameObject.input.customHitArea = val;
    }

    setup(): void {
        this.gameObject.setInteractive({ useHandCursor: this.handCursor, pixelPerfect: this.pixelPerfect });

        this.gameObject.on('pointerdown', this.onPointerDown, this);
        this.gameObject.on('pointerup', this.onPointerUp, this);
        this.gameObject.on('pointerover', this.onPointerOver, this);
        this.gameObject.on('pointerout', this.onPointerOut, this);
    }

    onPointerDown(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonDown()) {
            if (this.downTexture) this.gameObject.setTexture(this.downTexture.key, this.downTexture.frame);
            else if (this.overTexture) this.gameObject.setTexture(this.overTexture.key, this.overTexture.frame);

            this.gameObject.emit('down', pointer.upTime); // click
        }
    }

    onPointerUp(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonReleased()) {
            if (this.overTexture) this.gameObject.setTexture(this.overTexture.key, this.overTexture.frame);

            this.gameObject.emit('release', pointer.downTime); // action
        }
    }

    onPointerOver(pointer: Phaser.Input.Pointer): void {
        this.gameObject.emit('over'); // hover

        if (pointer.leftButtonDown()) this.onPointerDown(pointer);
        else if (this.overTexture) this.gameObject.setTexture(this.overTexture.key, this.overTexture.frame);
    }

    onPointerOut(): void {
        if (this.upTexture) this.gameObject.setTexture(this.upTexture.key, this.upTexture.frame);

        this.gameObject.emit('out'); // normal
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
