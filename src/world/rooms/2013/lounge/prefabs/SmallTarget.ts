
// You can write more code here

/* START OF COMPILED CODE */

import SnowballTrigger from "../../../../../lib/components/SnowballTrigger";
/* START-USER-IMPORTS */
import Lounge from "../Lounge";
/* END-USER-IMPORTS */

export default class SmallTarget extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // art
        const art = scene.add.sprite(-28.5, -29, "lounge2013", "lounge/smallbluetarget");
        art.setOrigin(0, 0);
        this.add(art);

        // hitbox
        const hitbox = scene.add.image(0, 0, "lounge2013", "lounge/smalltargethitbox");
        hitbox.visible = false;
        this.add(hitbox);

        // hitbox (components)
        new SnowballTrigger(hitbox);

        this.art = art;
        this.hitbox = hitbox;

        /* START-USER-CTR-CODE */

        SnowballTrigger.getComponent(hitbox).execute = this.hit.bind(this);

        /* END-USER-CTR-CODE */

        // custom definition props
        this.team = "blue";
    }

    public art: Phaser.GameObjects.Sprite;
    public hitbox: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Lounge;

    private _team: string;
    get team(): string {
        return this._team;
    }

    set team(value: string) {
        this._team = value;
        this.art.setFrame(`lounge/small${value}target`);
    }

    public ready: boolean;

    hit(): void {
        if (!this.ready) return;
        this.ready = false;

        if (this.team == 'blue') this.scene.targetGame.blueScore += 1;
        else this.scene.targetGame.redScore += 1;

        this.art.play(`lounge2013-small${this.team}target-animation`);
        this.art.once('animationcomplete', () => this.hide());
    }

    show(): void {
        this.visible = true;
        this.art.setFrame(`lounge/small${this.team}target`);
        this.scene.tweens.add({
            targets: this.art,
            y: { from: 40.5, to: -36 },
            duration: 208.333333,
            ease: 'Sine.InOut',
            onComplete: () => this.ready = true
        });
    }

    hide(): void {
        this.art.setFrame(`lounge/small${this.team}target`);
        this.scene.tweens.add({
            targets: this.art,
            y: { from: -36, to: 40.5 },
            duration: 208.333333,
            ease: 'Sine.InOut',
            onComplete: () => {
                this.ready = false;
                this.visible = false;
            }
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
