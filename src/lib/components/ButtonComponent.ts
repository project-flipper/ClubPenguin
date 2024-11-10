/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ButtonComponent {

    constructor(gameObject: Phaser.GameObjects.Image) {
        this.gameObject = gameObject;
        (gameObject as any)["__ButtonComponent"] = this;

        /* START-USER-CTR-CODE */

        this.hitbox = gameObject;

        /* END-USER-CTR-CODE */

        // custom definition props
        this.handCursor = false;
        this.pixelPerfect = false;
        this.hitbox;
    }

    static getComponent(gameObject: Phaser.GameObjects.Image): ButtonComponent {
        return (gameObject as any)["__ButtonComponent"];
    }

    private gameObject: Phaser.GameObjects.Image;
    public upTexture!: {key:string,frame?:string|number};
    public overTexture!: {key:string,frame?:string|number};
    public downTexture!: {key:string,frame?:string|number};

    /* START-USER-CODE */

    private _hitbox: Phaser.GameObjects.Image;
    private _handCursor: boolean;
    private _pixelPerfect: boolean;

    get hitbox(): Phaser.GameObjects.Image {
        return this._hitbox;
    }

    set hitbox(val: Phaser.GameObjects.Image) {
        if (this.hitbox) this.remove();
        this._hitbox = val;
        this.setup();
    }

    get handCursor(): boolean {
        return this._handCursor;
    }

    set handCursor(val: boolean) {
        let hitbox = this.hitbox;
        if (!hitbox.input) this.setup();
        else hitbox.scene.input.setHitArea(hitbox, { useHandCursor: val });
        this._handCursor = val;
    }

    get pixelPerfect(): boolean {
        return this._pixelPerfect;
    }

    set pixelPerfect(val: boolean) {
        let hitbox = this.hitbox;
        if (!hitbox.input) this.setup();
        else {
            if (val) {
                let callback = hitbox.scene.input.makePixelPerfect() as Phaser.Types.Input.HitAreaCallback;
                hitbox.input.hitArea = {};
                hitbox.input.hitAreaCallback = callback;
            } else hitbox.scene.input.setHitAreaFromTexture(hitbox);

            hitbox.input.customHitArea = val;
        }
        this._pixelPerfect = val;
    }

    setup(): void {
        this.remove();
        let hitbox = this.hitbox;
        console.log('Setting', hitbox.frame.name, 'as hitbox for', this.gameObject.frame.name, 'with handCursor', this.handCursor, 'and pixelPerfect', this.pixelPerfect);
        hitbox.setInteractive({ useHandCursor: this.handCursor, pixelPerfect: this.pixelPerfect });

        hitbox.on('pointerdown', this.onPointerDown, this);
        hitbox.on('pointerup', this.onPointerUp, this);
        hitbox.on('pointerover', this.onPointerOver, this);
        hitbox.on('pointerout', this.onPointerOut, this);
    }

    remove(): void {
        let hitbox = this.hitbox;
        hitbox.removeInteractive();

        hitbox.off('pointerdown', this.onPointerDown, this);
        hitbox.off('pointerup', this.onPointerUp, this);
        hitbox.off('pointerover', this.onPointerOver, this);
        hitbox.off('pointerout', this.onPointerOut, this);
    }

    wasOnCanvas(pointer: Phaser.Input.Pointer): boolean {
        return pointer.upElement == this.gameObject.scene.game.canvas && pointer.downElement == this.gameObject.scene.game.canvas;
    }

    onPointerDown(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonDown()) {
            if (this.downTexture) this.gameObject.setTexture(this.downTexture.key, this.downTexture.frame);
            else if (this.overTexture) this.gameObject.setTexture(this.overTexture.key, this.overTexture.frame);

            if (this.wasOnCanvas(pointer)) this.gameObject.emit('down', pointer.upTime); // click
        }
    }

    onPointerUp(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonReleased()) {
            if (this.overTexture) this.gameObject.setTexture(this.overTexture.key, this.overTexture.frame);

            if (this.wasOnCanvas(pointer)) this.gameObject.emit('release', pointer.downTime); // action
        }
    }

    onPointerOver(pointer: Phaser.Input.Pointer): void {
        this.gameObject.emit('over'); // hover

        if (pointer.leftButtonDown()) this.onPointerDown(pointer);
        else if (this.overTexture) this.gameObject.setTexture(this.overTexture.key, this.overTexture.frame);
    }

    onPointerOut(pointer: Phaser.Input.Pointer): void {
        if (this.upTexture) this.gameObject.setTexture(this.upTexture.key, this.upTexture.frame);

        this.gameObject.emit('out'); // normal
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
