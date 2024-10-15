
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Hint extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // box
        const box = scene.add.nineslice(0, 0, "interface", "interface/hint", 198, 49.5, 12, 12, 10, 12);
        this.add(box);

        // message
        const message = scene.add.bitmapText(0, 0, "BurbankSmallMedium", "Hint");
        message.setOrigin(0.5, 0.5);
        message.tintFill = true;
        message.tintTopLeft = 0;
        message.tintTopRight = 0;
        message.tintBottomLeft = 0;
        message.tintBottomRight = 0;
        message.text = "Hint";
        message.fontSize = -27;
        this.add(message);

        this.box = box;
        this.message = message;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public box: Phaser.GameObjects.NineSlice;
    public message: Phaser.GameObjects.BitmapText;

    /* START-USER-CODE */

    public timeline: Phaser.Time.Timeline;

    show(message: string): void {
        this.hide();

        this.message.visible = false;
        this.message.text = message;

        this.timeline = this.scene.add.timeline([{
            at: 166.666667,
            run: () => {
                this.box.width = 148.5;
                this.box.height = 36;
                this.visible = true;
            }
        }, {
            at: 208.333333,
            run: () => {
                this.box.width = 182.25;
                this.box.height = 45;
            }
        }, {
            at: 250,
            run: () => {
                this.box.width = 216;
                this.box.height = 54;
            }
        }, {
            at: 291.666667,
            run: () => {
                this.box.width = this.message.width > 162 ? this.message.width + 36 : 198;
                this.box.height = 49.5;
                this.message.visible = true;
            }
        }]);
        this.timeline.play();
    }

    hide(): void {
        if (this.timeline) this.timeline.stop();
        this.visible = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
