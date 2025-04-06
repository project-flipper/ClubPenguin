
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EndGameStampList extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // prevButton
        const prevButton = scene.add.image(31.39, 95.63, "interface", "interface/stampListPrev0001");
        this.add(prevButton);

        // nextButton
        const nextButton = scene.add.image(681.98, 95.63, "interface", "interface/stampListNext0001");
        this.add(nextButton);

        // bg
        const bg = scene.add.image(73.91, 4.5, "interface", "interface/stampViewer0001");
        bg.setOrigin(0, 0);
        this.add(bg);

        // prevButton (components)
        const prevButtonButtonComponent = new ButtonComponent(prevButton);
        prevButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/stampListPrev0001"};
        prevButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/stampListPrev0002"};
        prevButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/stampListPrev0003"};
        prevButtonButtonComponent.handCursor = true;
        prevButtonButtonComponent.pixelPerfect = true;

        // nextButton (components)
        const nextButtonButtonComponent = new ButtonComponent(nextButton);
        nextButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/stampListNext0001"};
        nextButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/stampListNext0002"};
        nextButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/stampListNext0003"};
        nextButtonButtonComponent.handCursor = true;
        nextButtonButtonComponent.pixelPerfect = true;

        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.bg = bg;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public prevButton: Phaser.GameObjects.Image;
    public nextButton: Phaser.GameObjects.Image;
    public bg: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
