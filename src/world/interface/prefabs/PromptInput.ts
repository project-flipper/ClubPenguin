
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
import TextField from "../../../lib/ui/TextField";
/* START-USER-IMPORTS */
import Phaser from "phaser";

import Interface from "../Interface";
/* END-USER-IMPORTS */

export default class PromptInput extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(456.75, 166.5, "interface", "interface/promptBg", 796.5, 657, 47, 47, 47, 47);
        bg.setOrigin(0, 0);
        this.add(bg);

        // okayButton
        const okayButton = scene.add.image(855, 686.475, "interface", "interface/promptOkayButton0001");
        this.add(okayButton);

        // closeButton
        const closeButton = scene.add.image(1188.1125, 231.8625, "interface", "interface/namecardClose0001");
        this.add(closeButton);

        // icon
        const icon = scene.add.container(858.2625, 336.15);
        this.add(icon);

        // message
        const message = new TextBox(scene, 534.9375, 458.2125, "BurbankSmallMedium");
        message.tintFill = true;
        message.tintTopLeft = 0;
        message.tintTopRight = 0;
        message.tintBottomLeft = 0;
        message.tintBottomRight = 0;
        message.text = "Message goes here";
        message.fontSize = -36;
        this.add(message);

        // okay
        const okay = new TextBox(scene, 723.2625, 657, "BurbankSmallMedium");
        okay.text = "Continue";
        okay.fontSize = -45;
        this.add(okay);

        // field
        const field = new TextField(scene, 680, 549);
        this.add(field);

        // okayButton (components)
        const okayButtonButtonComponent = new ButtonComponent(okayButton);
        okayButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/promptOkayButton0001"};
        okayButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/promptOkayButton0002"};
        okayButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/promptOkayButton0003"};
        okayButtonButtonComponent.handCursor = true;
        okayButtonButtonComponent.pixelPerfect = true;

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/namecardClose0001"};
        closeButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/namecardClose0002"};
        closeButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/namecardClose0003"};
        closeButtonButtonComponent.handCursor = true;
        closeButtonButtonComponent.pixelPerfect = true;

        // message (prefab fields)
        message.boxWidth = 642.15;
        message.boxHeight = 151.9875;
        message.horizontalAlign = 1;

        // okay (prefab fields)
        okay.boxWidth = 259.875;
        okay.boxHeight = 63;
        okay.horizontalAlign = 1;
        okay.verticalAlign = 1;

        // field (prefab fields)
        field.inputType = "text";
        field.fieldWidth = 456.6375;
        field.fieldHeight = 63;
        field.maxLength = 12;
        field.font = "BurbankSmallMedium";
        field.fontSize = -45;

        this.bg = bg;
        this.okayButton = okayButton;
        this.closeButton = closeButton;
        this.icon = icon;
        this.message = message;
        this.okay = okay;
        this.field = field;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public okayButton: Phaser.GameObjects.Image;
    public closeButton: Phaser.GameObjects.Image;
    public icon: Phaser.GameObjects.Container;
    public message: TextBox;
    public okay: TextBox;
    public field: TextField;

    /* START-USER-CODE */

    declare scene: Interface;

    public rejectCallback: (byUser: boolean) => void;
    show(message: string, okay: string, confirmCallback: (input: string) => void, rejectCallback: (byUser: boolean) => void): void {
        this.scene.closePrompt();

        this.message.text = message;
        this.okay.text = okay;

        this.okayButton.on('release', () => {
            this.hide();
            confirmCallback(this.field.value);
        });
        this.closeButton.once('release', () => {
            this.hide();
            rejectCallback(true);
        })
        this.rejectCallback = rejectCallback;

        this.visible = true;
        this.scene.promptBlock.visible = true;
    }

    showLocalized(messageKey: string, confirmCallback: () => void, rejectCallback: (byUser: boolean) => void): void {
        this.scene.game.locale.immediate(locale => this.show(locale.localize(messageKey), locale.localize('Continue'), confirmCallback, rejectCallback));
    }

    setIcon(icon: Phaser.GameObjects.GameObject): void {
        this.icon.removeAll(true);
        this.icon.add(icon);
    }

    hide(): void {
        this.okayButton.off('release');
        this.closeButton.off('release');
        this.icon.removeAll(true);
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
