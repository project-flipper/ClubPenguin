
// You can write more code here

/* START OF COMPILED CODE */

import SnowballTrigger from "../../../../../lib/ui/components/SnowballTrigger";
/* START-USER-IMPORTS */

import Lounge from "../Lounge";
/* END-USER-IMPORTS */

export default class MonsterTarget extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // art
        const art = scene.add.sprite(-103, -190, "lounge", "lounge/bluemonster");
        art.setOrigin(0, 0);
        this.add(art);

        // hitbox
        const hitbox = scene.add.image(2, -63, "lounge", "lounge/monsterhitbox");
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
        this.art.setFrame(`lounge/${value}monster`);
    }

    public ready: boolean;

    hit(): void {
        if (!this.ready) return;
        this.ready = false;

        if (this.team == 'blue') this.scene.targetGame.blueScore += 1;
        else this.scene.targetGame.redScore += 1;

        this.art.play(`lounge-${this.team}monster-animation`);
        this.art.once('animationcomplete', () => this.hide());
    }

    show(): void {
        this.visible = true;
        this.art.setFrame(`lounge/${this.team}monster`);
        this.scene.tweens.add({
            targets: this.art,
            y: { from: 50.2375, to: -190 },
            duration: 291.666667,
            ease: 'Sine.InOut',
            onComplete: () => this.ready = true
        });
    }

    hide(): void {
        this.art.setFrame(`lounge/${this.team}monster`);
        this.scene.tweens.add({
            targets: this.art,
            y: { from: -190, to: 50.2375 },
            duration: 291.666667,
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
