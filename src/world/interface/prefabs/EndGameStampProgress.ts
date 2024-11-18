
// You can write more code here

/* START OF COMPILED CODE */

import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EndGameStampProgress extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // interface_stampProgressBg
        const interface_stampProgressBg = scene.add.image(0, 0, "interface", "interface/stampProgressBg");
        this.add(interface_stampProgressBg);

        // progress
        const progress = scene.add.image(0, 0, "interface", "interface/stampProgressBar");
        this.add(progress);

        // progressMask
        const progressMask = scene.add.image(0, 0, "interface", "interface/stampProgressBar");
        progressMask.visible = false;
        this.add(progressMask);

        // progressText
        const progressText = new TextBox(scene, -265.72, -21.82, "BurbankSmallBold");
        progressText.tintFill = true;
        progressText.tintTopLeft = 3355443;
        progressText.tintTopRight = 3355443;
        progressText.tintBottomLeft = 3355443;
        progressText.tintBottomRight = 3355443;
        progressText.text = "9/25";
        progressText.fontSize = 24.75;
        this.add(progressText);

        // progressText (prefab fields)
        progressText.boxWidth = 158.9625;
        progressText.boxHeight = 43.2;
        progressText.horizontalAlign = 0;
        progressText.verticalAlign = 1;

        this.progress = progress;
        this.progressMask = progressMask;
        this.progressText = progressText;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public progress: Phaser.GameObjects.Image;
    public progressMask: Phaser.GameObjects.Image;
    public progressText: TextBox;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
