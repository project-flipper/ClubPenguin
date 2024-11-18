
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../lib/components/InputBlocker";
import TextBox from "../lib/ui/TextBox";
import ButtonComponent from "../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class InternalErrorArea extends Phaser.Scene {

    constructor() {
        super("InternalErrorArea");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    editorCreate(): void {

        // cover
        const cover = this.add.rectangle(0, 0, 1710, 1080);
        cover.setOrigin(0, 0);
        cover.visible = false;
        cover.isFilled = true;
        cover.fillColor = 0;
        cover.fillAlpha = 0.4;

        // embeddedErrorDialog
        const embeddedErrorDialog = this.add.container(0, 0);
        embeddedErrorDialog.visible = false;

        // dialogBody
        const dialogBody = this.add.nineslice(0, 0, "boot", "boot/dialog", 796.5, 495, 47, 47, 47, 47);
        dialogBody.setOrigin(0, 0);
        embeddedErrorDialog.add(dialogBody);

        // dialogMessage
        const dialogMessage = new TextBox(this, 34.537498474121094, 29.924999237060547, "BurbankSmallMedium");
        dialogMessage.tintFill = true;
        dialogMessage.tintTopLeft = 0;
        dialogMessage.tintTopRight = 0;
        dialogMessage.tintBottomLeft = 0;
        dialogMessage.tintBottomRight = 0;
        dialogMessage.text = "Load Error\nSorry, there's been an error loading\nClub Penguin. Please try logging in\nlater. If the problem continues please\ncontact support@clubpenguin.com";
        dialogMessage.fontSize = 40.5;
        dialogMessage.align = 1;
        embeddedErrorDialog.add(dialogMessage);

        // dialogCode
        const dialogCode = new TextBox(this, 38.25, 427.5, "BurbankSmallMedium");
        dialogCode.tintFill = true;
        dialogCode.tintTopLeft = 9976322;
        dialogCode.tintTopRight = 9976322;
        dialogCode.tintBottomLeft = 9976322;
        dialogCode.tintBottomRight = 9976322;
        dialogCode.text = "c0";
        dialogCode.fontSize = 24.75;
        dialogCode.align = 2;
        embeddedErrorDialog.add(dialogCode);

        // dialogButton
        const dialogButton = this.add.image(219.60000610351562, 301.1625061035156, "boot", "boot/button");
        dialogButton.setOrigin(0, 0);
        embeddedErrorDialog.add(dialogButton);

        // dialogButtonLabel
        const dialogButtonLabel = new TextBox(this, 230.1750030517578, 321.63751220703125, "BurbankSmallMedium");
        dialogButtonLabel.tintFill = true;
        dialogButtonLabel.tintTopLeft = 16777215;
        dialogButtonLabel.tintTopRight = 16777215;
        dialogButtonLabel.tintBottomLeft = 16777215;
        dialogButtonLabel.tintBottomRight = 16777215;
        dialogButtonLabel.text = "OK";
        dialogButtonLabel.fontSize = 42.75;
        dialogButtonLabel.align = 1;
        embeddedErrorDialog.add(dialogButtonLabel);

        // cover (components)
        new InputBlocker(cover);

        // dialogMessage (prefab fields)
        dialogMessage.boxWidth = 722.475;
        dialogMessage.boxHeight = 257.9625;
        dialogMessage.horizontalAlign = 1;
        dialogMessage.verticalAlign = 1;

        // dialogCode (prefab fields)
        dialogCode.boxWidth = 729;
        dialogCode.boxHeight = 38.7;
        dialogCode.horizontalAlign = 2;
        dialogCode.verticalAlign = 1;

        // dialogButton (components)
        const dialogButtonButtonComponent = new ButtonComponent(dialogButton);
        dialogButtonButtonComponent.upTexture = {"key":"boot","frame":"boot/button"};
        dialogButtonButtonComponent.overTexture = {"key":"boot","frame":"boot/buttonHover"};
        dialogButtonButtonComponent.downTexture = {"key":"boot","frame":"boot/buttonDown"};
        dialogButtonButtonComponent.handCursor = true;
        dialogButtonButtonComponent.pixelPerfect = true;

        // dialogButtonLabel (prefab fields)
        dialogButtonLabel.boxWidth = 337.8375;
        dialogButtonLabel.boxHeight = 70.2;
        dialogButtonLabel.horizontalAlign = 1;
        dialogButtonLabel.verticalAlign = 1;

        this.cover = cover;
        this.dialogBody = dialogBody;
        this.dialogMessage = dialogMessage;
        this.dialogCode = dialogCode;
        this.dialogButton = dialogButton;
        this.dialogButtonLabel = dialogButtonLabel;
        this.embeddedErrorDialog = embeddedErrorDialog;

        this.events.emit("scene-awake");
    }

    public cover!: Phaser.GameObjects.Rectangle;
    public dialogBody!: Phaser.GameObjects.NineSlice;
    public dialogMessage!: TextBox;
    public dialogCode!: TextBox;
    public dialogButton!: Phaser.GameObjects.Image;
    public dialogButtonLabel!: TextBox;
    public embeddedErrorDialog!: Phaser.GameObjects.Container;

    /* START-USER-CODE */

    // Write your code here

    create() {

        this.editorCreate();
    }

    showErrorDialog(message: string, buttonLabel: string, buttonCallback: () => void, code: string): void {
        // hide error while it's being set up
        this.embeddedErrorDialog.visible = false;

        this.dialogMessage.text = message;

        this.embeddedErrorDialog.x = ((1710 - this.dialogBody.width) / 2);
        this.embeddedErrorDialog.y = ((978.75 - this.dialogBody.height) / 2);

        this.dialogButtonLabel.text = buttonLabel;

        this.dialogCode.text = code;

        this.dialogButton.off('release');
        if (!buttonCallback) buttonCallback = () => this.hideError();
        this.dialogButton.on('release', buttonCallback);

        this.cover.visible = true;
        this.embeddedErrorDialog.visible = true;
    }

    hideError(): void {
        this.cover.visible = false;
        this.embeddedErrorDialog.visible = false;

        this.dialogButton.off('release');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
