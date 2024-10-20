
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DepthEnabled {

    constructor(gameObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.Depth) {
        this.gameObject = gameObject;
        (gameObject as any)["__DepthEnabled"] = this;

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */

        // custom definition props
        this.automaticSort = true;
        this.depth = 0;
    }

    static getComponent(gameObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.Depth): DepthEnabled {
        return (gameObject as any)["__DepthEnabled"];
    }

    private gameObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.Depth;

    /* START-USER-CODE */

    private _automaticSort: boolean;
    private _depth: number;

    get automaticSort(): boolean {
        return this._automaticSort;
    }

    set automaticSort(state: boolean) {
        this._automaticSort = state;
        if (state) this.gameObject.depth = this.gameObject.y;
        else if (this.depth) this.gameObject.depth = this.depth;
    }

    get depth(): number {
        return this._depth;
    }

    set depth(value: number) {
        this._depth = value;
        if (!this.automaticSort) this.gameObject.depth = value;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
