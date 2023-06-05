/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../lib/ui/components/InputBlocker";
import TextBox from "../lib/ui/TextBox";
import ButtonComponent from "../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ErrorArea extends Phaser.Scene {

    constructor() {
        super("ErrorArea");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    _preload(): void {

        this.load.pack("app-pack", "assets/app/app-pack.json");
    }

    editorCreate(): void {

        // cover
        const cover = this.add.rectangle(0, 0, 1710, 1080);
        cover.setOrigin(0, 0);
        cover.isFilled = true;
        cover.fillColor = 0;
        cover.fillAlpha = 0.4;

        // errorWindow
        const errorWindow = this.add.container(0, 0);

        // body
        const body = this.add.nineslice(0, -30.2625, "app", "app/error", 796.5, 528.525, 46, 46, 46, 46);
        body.setOrigin(0, 0);
        errorWindow.add(body);

        // message
        const message = new TextBox(this, 58.5, 18, "BurbankSmallMedium");
        message.text = " Error Message\n Error Message\n Error Message\n Error Message\n Error Message\n Error Message";
        message.fontSize = -36;
        message.align = 0;
        errorWindow.add(message);

        // buttonContainer
        const buttonContainer = this.add.container(216, 333);
        errorWindow.add(buttonContainer);

        // button
        const button = this.add.image(0, 0, "app", "app/button");
        button.setOrigin(0, 0);
        buttonContainer.add(button);

        // buttonLabel
        const buttonLabel = new TextBox(this, 37.4625, 28.6875, "BurbankSmallBold");
        buttonLabel.text = "Ok";
        buttonLabel.fontSize = -45;
        buttonLabel.align = 1;
        buttonContainer.add(buttonLabel);

        // code
        const code = new TextBox(this, 38.25, 427.5, "BurbankSmallMedium");
        code.tintFill = true;
        code.tintTopLeft = 9976322;
        code.tintTopRight = 9976322;
        code.tintBottomLeft = 9976322;
        code.tintBottomRight = 9976322;
        code.text = "c0";
        code.fontSize = -22.5;
        code.align = 2;
        errorWindow.add(code);

        // cover (components)
        new InputBlocker(cover);

        // message (prefab fields)
        message.boxWidth = 686.25;
        message.boxHeight = 290.7;
        message.horizontalAlign = 1;
        message.verticalAlign = 1;

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.upTexture = {"key":"app","frame":"app/button"};
        buttonButtonComponent.overTexture = {"key":"app","frame":"app/buttonHover"};
        buttonButtonComponent.downTexture = {"key":"app","frame":"app/buttonDown"};
        buttonButtonComponent.handCursor = true;

        // buttonLabel (prefab fields)
        buttonLabel.boxWidth = 282.2625;
        buttonLabel.boxHeight = 63;
        buttonLabel.verticalAlign = 1;

        // code (prefab fields)
        code.boxWidth = 729;
        code.boxHeight = 38.7;
        code.horizontalAlign = 2;
        code.verticalAlign = 1;

        this.cover = cover;
        this.body = body;
        this.message = message;
        this.button = button;
        this.buttonLabel = buttonLabel;
        this.buttonContainer = buttonContainer;
        this.code = code;
        this.errorWindow = errorWindow;

        this.events.emit("scene-awake");
    }

    public cover!: Phaser.GameObjects.Rectangle;
    public body!: Phaser.GameObjects.NineSlice;
    public message!: TextBox;
    public button!: Phaser.GameObjects.Image;
    public buttonLabel!: TextBox;
    public buttonContainer!: Phaser.GameObjects.Container;
    public code!: TextBox;
    public errorWindow!: Phaser.GameObjects.Container;

    /* START-USER-CODE */

    public WINDOW_SMALL = { w: 796.5, h: 450 };
    public WINDOW_MEDIUM = { w: 796.5, h: 540 };
    public WINDOW_LARGE = { w: 796.5, h: 585 };
    public WINDOW_EXTRA_LARGE = { w: 1035, h: 630 };

    create(data: any): void {

        this.editorCreate();

        this.hide();

        if (data.onready) data.onready(this);
    }

    showError(size: { w: number, h: number } = this.WINDOW_SMALL, message: string, buttonLabel: string, buttonCallback: () => void, code: string): void {
        // hide error while it's being set up
        this.errorWindow.visible = false;

        this.body.width = size.w;
        this.body.height = size.h;

        this.errorWindow.x = 855 - (this.body.width / 2);
        this.errorWindow.y = 540 - (this.body.height / 2);

        this.message.text = message;

        this.message.boxWidth = this.body.width - 90;
        this.message.x = (this.body.width / 2) - (this.message.width / 2);
        this.message.y = ((this.body.height - this.button.height) / 2) - (this.message.height / 2);

        this.code.text = code;

        this.code.x = (this.body.width - 27) - this.code.width;
        this.code.y = this.body.height - 85.5;

        this.buttonContainer.x = (this.body.width / 2) - (this.button.width / 2);
        this.buttonContainer.y = this.body.height - 180;

        this.buttonLabel.text = buttonLabel;

        this.button.off('release');
        if (!buttonCallback) buttonCallback = () => this.hide();
        this.button.on('release', buttonCallback);

        this.cover.visible = true;
        this.errorWindow.visible = true;
    }

    hide(): void {
        this.cover.visible = false;
        this.errorWindow.visible = false;

        this.button.off('release');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
