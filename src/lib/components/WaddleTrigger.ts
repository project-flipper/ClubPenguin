
// You can write more code here

export type Seat = {
    seat: boolean;
    x: number;
    y: number;
    doneX: number;
    doneY: number;
    frame: ActionFrame;
    player?: Player
};

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Engine, logger } from "@clubpenguin/world/engine/engine";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import { ActionFrame } from "@clubpenguin/net/types/action";
/* END-USER-IMPORTS */

export default class WaddleTrigger {

    constructor(gameObject: Phaser.GameObjects.Image) {
        this.gameObject = gameObject;
        (gameObject as any)["__WaddleTrigger"] = this;

        /* START-USER-CTR-CODE */

        this.players = [];

        /* END-USER-CTR-CODE */

        // custom definition props
        this.seat1frame = 0;
        this.seat2frame = 0;
        this.seat3frame = 0;
        this.seat4frame = 0;
    }

    static getComponent(gameObject: Phaser.GameObjects.Image): WaddleTrigger {
        return (gameObject as any)["__WaddleTrigger"];
    }

    private gameObject: Phaser.GameObjects.Image;
    public game_id: string = "";
    public options: any = {};
    public prompt: string = "";
    public waddle_id: number = 0;
    public waddle_type: "WADDLE"|"TABLE" = "WADDLE";
    public seat1: boolean = false;
    public seat1x: number = 0;
    public seat1y: number = 0;
    public done1x: number = 0;
    public done1y: number = 0;
    public seat2: boolean = false;
    public seat2x: number = 0;
    public seat2y: number = 0;
    public done2x: number = 0;
    public done2y: number = 0;
    public seat3: boolean = false;
    public seat3x: number = 0;
    public seat3y: number = 0;
    public done3x: number = 0;
    public done3y: number = 0;
    public seat4: boolean = false;
    public seat4x: number = 0;
    public seat4y: number = 0;
    public done4x: number = 0;
    public done4y: number = 0;

    /* START-USER-CODE */

    public seat1frame: ActionFrame = 0;
    public seat2frame: ActionFrame = 0;
    public seat3frame: ActionFrame = 0;
    public seat4frame: ActionFrame = 0;

    test(x: number, y: number): boolean {
        let point = new Phaser.Math.Vector2(0, 0);

        if (this.gameObject.parentContainer) {
            let matrix = new Phaser.GameObjects.Components.TransformMatrix();
            let parentMatrix = new Phaser.GameObjects.Components.TransformMatrix();

            this.gameObject.parentContainer.getWorldTransformMatrix(matrix, parentMatrix);
            matrix.applyInverse(x, y, point);
        } else {
            Phaser.Math.TransformXY(x, y, this.gameObject.x, this.gameObject.y, this.gameObject.rotation, this.gameObject.scaleX, this.gameObject.scaleY, point);
        }

        point.x += this.gameObject.displayOriginX;
        point.y += this.gameObject.displayOriginY;

        let test = this.gameObject.scene.input.makePixelPerfect();
        return test({}, point.x, point.y, this.gameObject);
    }

    execute(engine: Engine, player: Player): void {
        if (engine.player != player || this.players.includes(player) || this.players.length >= this.seatLimit) return;

        if (this.prompt) engine.interface.promptQuestion.showLocalized(this.prompt, () => this.confirmed(engine), () => this.rejected(engine));
        else this.confirmed(engine);
    }

    public players: Player[];

    get seats(): Seat[] {
        return [
            { seat: this.seat1, x: this.seat1x, y: this.seat1y, doneX: this.done1x, doneY: this.done1y, frame: this.seat1frame, player: this.players[0] },
            { seat: this.seat2, x: this.seat2x, y: this.seat2y, doneX: this.done2x, doneY: this.done2y, frame: this.seat2frame, player: this.players[1] },
            { seat: this.seat3, x: this.seat3x, y: this.seat3y, doneX: this.done3x, doneY: this.done3y, frame: this.seat3frame, player: this.players[2] },
            { seat: this.seat4, x: this.seat4x, y: this.seat4y, doneX: this.done4x, doneY: this.done4y, frame: this.seat4frame, player: this.players[3] }
        ];
    }

    get seatLimit(): number {
        return [this.seat1, this.seat2, this.seat3, this.seat4].filter(seat => seat).length;
    }

    confirmed(engine: Engine): void {
        engine.interface.promptQuestion.hide();
        if (this.players.length >= this.seatLimit) {
            logger.warn('Attempted to join a full waddle. Ignoring');
            return;
        }

        engine.world.joinWaddle(this.waddle_id, this.waddle_type == 'TABLE');
    }

    rejected(engine: Engine): void {

    }

    place(player: Player): Seat {
        if (this.players.includes(player)) return;
        for (let seat of this.seats) {
            if (seat.player) continue;

            this.players.push(player);

            player.actions.reset();
            player.once('action:complete', () => player.actions.set({ frame: seat.frame }));
            player.actions.move(seat.x, seat.y);

            player.scene.events.emit('waddle:join', this, player);
            return seat;
        }
    }

    remove(player: Player): Seat {
        if (!this.players.includes(player)) return;
        for (let seat of this.seats) {
            if (seat.player == player) {
                this.players.splice(this.players.indexOf(player), 1);

                player.actions.move(seat.doneX, seat.doneY);

                player.scene.events.emit('waddle:leave', this, player);
                return seat;
            }
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
