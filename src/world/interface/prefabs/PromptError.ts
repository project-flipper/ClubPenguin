
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */

import Interface from "../Interface";
/* END-USER-IMPORTS */

export default class PromptError extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(456.75, 246.375, "interface", "interface/promptErrorBg", 796.5, 364.5, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // okayButton
        const okayButton = scene.add.image(855, 492.975, "interface", "interface/promptErrorButton0001");
        this.add(okayButton);

        // okay
        const okay = new TextBox(scene, 775.0125, 463.5, "BurbankSmallMedium");
        okay.text = "Ok";
        okay.fontSize = -45;
        this.add(okay);

        // message
        const message = new TextBox(scene, 533.925, 309.7125, "BurbankSmallMedium");
        message.tintFill = true;
        message.tintTopLeft = 0;
        message.tintTopRight = 0;
        message.tintBottomLeft = 0;
        message.tintBottomRight = 0;
        message.text = "Message goes here\nMessage goes here";
        message.fontSize = -36;
        this.add(message);

        // okayButton (components)
        const okayButtonButtonComponent = new ButtonComponent(okayButton);
        okayButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/promptErrorButton0001"};
        okayButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/promptErrorButton0002"};
        okayButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/promptErrorButton0003"};
        okayButtonButtonComponent.handCursor = true;
        okayButtonButtonComponent.pixelPerfect = true;

        // okay (prefab fields)
        okay.boxWidth = 160.0875;
        okay.boxHeight = 63;
        okay.horizontalAlign = 1;
        okay.verticalAlign = 1;

        // message (prefab fields)
        message.boxWidth = 642.15;
        message.boxHeight = 151.9875;
        message.horizontalAlign = 1;

        this.bg = bg;
        this.okayButton = okayButton;
        this.okay = okay;
        this.message = message;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public okayButton: Phaser.GameObjects.Image;
    public okay: TextBox;
    public message: TextBox;

    /* START-USER-CODE */

    declare scene: Interface;

    public rejectCallback: (byUser: boolean) => void;
    show(message: string, okay: string, confirmCallback: () => void, rejectCallback: (byUser: boolean) => void): void {
        this.scene.closePrompt();

        this.message.text = message;
        this.okay.text = okay;

        this.okayButton.once('release', () => {
            this.hide();
            confirmCallback();
        });
        this.rejectCallback = rejectCallback;

        this.visible = true;
        this.scene.promptBlock.visible = true;
    }

    showLocalized(messageKey: string, confirmCallback: () => void, rejectCallback: (byUser: boolean) => void): void {
        this.scene.game.locale.immediate(locale => this.show(locale.localize(messageKey), locale.localize('Ok'), confirmCallback, rejectCallback));
    }

    hide(): void {
        this.okayButton.off('release');
        this.visible = false;
        this.scene.promptBlock.visible = false;
    }

    close(): void {
        this.hide();
        if (this.rejectCallback) {
            this.rejectCallback(false);
            this.rejectCallback = undefined;
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
