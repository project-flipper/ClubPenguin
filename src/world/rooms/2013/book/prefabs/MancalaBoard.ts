
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import { Player } from "@clubpenguin/world/engine/player/avatar";
import Interface from "@clubpenguin/world/interface/Interface";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class MancalaBoard extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // book_mancalatable
        const book_mancalatable = scene.add.image(1.2375, -3.2625, "book", "book/mancalatable");
        book_mancalatable.setOrigin(0.47076923, 0.43726415);
        this.add(book_mancalatable);

        // board
        const board = scene.add.image(0.5625, -33.8625, "book", "book/mancalaboard0001");
        board.setOrigin(0.4734166666666667, 0.46018181818181814);
        this.add(board);

        // button
        const button = scene.add.image(4, -32, "book", "book/mancala_btn0004");
        button.alpha = 0.01;
        button.alphaTopLeft = 0.01;
        button.alphaTopRight = 0.01;
        button.alphaBottomLeft = 0.01;
        button.alphaBottomRight = 0.01;
        this.add(button);

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.handCursor = true;

        this.board = board;
        this.button = button;

        /* START-USER-CTR-CODE */

        this.button.on('over', () => {
            if (!this.occupied) this.board.setFrame('book/mancalaboard0002');
            (this.scene.scene.get('Interface') as Interface).showLocalizedHint(this, 'mancala_hint');
        });
        this.button.on('out', () => {
            if (!this.occupied) this.board.setFrame('book/mancalaboard0001');
            (this.scene.scene.get('Interface') as Interface).hideHint();
        });
        this.button.on('release', () => {
            (this.scene.scene.get('Interface') as Interface).hideHint();
            let world = this.scene.scene.get('World') as World;

            if (!this.player1) world.move(this.x + this.seat1Offset.x, this.y + this.seat1Offset.y);
            else if (!this.player2) world.move(this.x + this.seat2Offset.x, this.y + this.seat2Offset.y);
        });

        /* END-USER-CTR-CODE */
    }

    public board: Phaser.GameObjects.Image;
    public button: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    private _occupied = false;
    public player1: Player;
    public player2: Player;

    public seat1Offset = { x: -67.5, y: -45 };
    public seat2Offset = { x: 67.5, y: 36 };

    get occupied(): boolean {
        return this._occupied;
    }

    set occupied(value: boolean) {
        this._occupied = value;
        if (value) this.board.setFrame('book/mancalaboardactive');
        else this.board.setFrame('book/mancalaboard0001');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
