/* START OF COMPILED CODE */

import Phaser from "phaser";
import SmallProgressBubble from "../prefabs/SmallProgressBubble";
import ErrorBubble from "../prefabs/ErrorBubble";
import TextField from "../../lib/ui/TextField";
/* START-USER-IMPORTS */
import { Locale } from "../../app/locale";
/* END-USER-IMPORTS */

export default class PasswordArea extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // progressBubble
        const progressBubble = new SmallProgressBubble(scene, 0, 0);
        this.add(progressBubble);

        // title
        const title = scene.add.bitmapText(112.5, 19.6875, "BurbankSmallBold", "Create Password:");
        title.tintTopLeft = 2894894;
        title.tintTopRight = 2894894;
        title.tintBottomLeft = 2894894;
        title.tintBottomRight = 2894894;
        title.text = "Create Password:";
        title.fontSize = -27;
        this.add(title);

        // field1Graphic
        const field1Graphic = scene.add.image(108, 59.7375, "create", "create-module/passwordField");
        field1Graphic.setOrigin(0, 0);
        this.add(field1Graphic);

        // errorBox1
        const errorBox1 = scene.add.image(108, 59.7375, "create", "create-module/passwordField");
        errorBox1.setOrigin(0, 0);
        this.add(errorBox1);

        // placeholder1
        const placeholder1 = scene.add.bitmapText(119.25, 79.9875, "BurbankSmallBold", "Enter Password");
        placeholder1.tintTopLeft = 13882584;
        placeholder1.tintTopRight = 13882584;
        placeholder1.tintBottomLeft = 13882584;
        placeholder1.tintBottomRight = 13882584;
        placeholder1.text = "Enter Password";
        placeholder1.fontSize = -27;
        this.add(placeholder1);

        // field2Graphic
        const field2Graphic = scene.add.image(108, 133.99, "create", "create-module/passwordField");
        field2Graphic.setOrigin(0, 0);
        this.add(field2Graphic);

        // errorBox2
        const errorBox2 = scene.add.image(108, 133.99, "create", "create-module/passwordField");
        errorBox2.setOrigin(0, 0);
        this.add(errorBox2);

        // placeholder2
        const placeholder2 = scene.add.bitmapText(119.25, 154.2375, "BurbankSmallBold", "Confirm Password");
        placeholder2.tintTopLeft = 13882584;
        placeholder2.tintTopRight = 13882584;
        placeholder2.tintBottomLeft = 13882584;
        placeholder2.tintBottomRight = 13882584;
        placeholder2.text = "Confirm Password";
        placeholder2.fontSize = -27;
        this.add(placeholder2);

        // errorBubble
        const errorBubble = new ErrorBubble(scene, 391.3875, -32.175);
        errorBubble.visible = false;
        this.add(errorBubble);

        // textField1
        const textField1 = new TextField(scene, 108, 59.7375);
        this.add(textField1);

        // textField2
        const textField2 = new TextField(scene, 108, 133.99);
        this.add(textField2);

        // progressBubble (prefab fields)
        progressBubble.text = "3.";

        // textField1 (prefab fields)
        textField1.inputType = "password";
        textField1.fieldWidth = 560;
        textField1.fieldHeight = 68;
        textField1.maxLength = 32;
        textField1.verticalAlign = 1;
        textField1.font = "BurbankSmallBold";
        textField1.fontSize = -27;
        textField1.fontColor = "#2c2c2e";
        textField1.backgroundIsFilled = false;
        textField1.leftMargin = 11.25;
        textField1.autocomplete = "new-password";

        // textField2 (prefab fields)
        textField2.inputType = "password";
        textField2.fieldWidth = 560;
        textField2.fieldHeight = 68;
        textField2.maxLength = 32;
        textField2.verticalAlign = 1;
        textField2.font = "BurbankSmallBold";
        textField2.fontSize = -27;
        textField2.fontColor = "#2c2c2e";
        textField2.backgroundIsFilled = false;
        textField2.leftMargin = 11.25;
        textField2.autocomplete = "new-password";

        this.progressBubble = progressBubble;
        this.title = title;
        this.field1Graphic = field1Graphic;
        this.errorBox1 = errorBox1;
        this.placeholder1 = placeholder1;
        this.field2Graphic = field2Graphic;
        this.errorBox2 = errorBox2;
        this.placeholder2 = placeholder2;
        this.errorBubble = errorBubble;
        this.textField1 = textField1;
        this.textField2 = textField2;

        /* START-USER-CTR-CODE */

        textField1.setup();
        textField1.handleValueChange = () => {
            this.placeholder1.visible = textField1.value.length == 0;
            this.hideError();
        };

        textField2.setup();
        textField2.handleValueChange = () => {
            this.placeholder2.visible = textField2.value.length == 0;
            this.hideError();
        };

        /* END-USER-CTR-CODE */
    }

    public progressBubble: SmallProgressBubble;
    public title: Phaser.GameObjects.BitmapText;
    public field1Graphic: Phaser.GameObjects.Image;
    public errorBox1: Phaser.GameObjects.Image;
    public placeholder1: Phaser.GameObjects.BitmapText;
    public field2Graphic: Phaser.GameObjects.Image;
    public errorBox2: Phaser.GameObjects.Image;
    public placeholder2: Phaser.GameObjects.BitmapText;
    public errorBubble: ErrorBubble;
    public textField1: TextField;
    public textField2: TextField;

    /* START-USER-CODE */

    localize(locale: Locale): void {
        this.title.text = locale.localize('password_title', 'create_module');
        this.placeholder1.text = locale.localize('password_placeholder1', 'create_module');
        this.placeholder2.text = locale.localize('password_placeholder2', 'create_module');
    }

    showError(message: string): void {
        this.errorBubble.textBox.text = message;
        this.errorBubble.visible = true;
        this.errorBox1.visible = true;
        this.errorBox2.visible = true;
    }

    hideError(): void {
        this.errorBubble.visible = false;
        this.errorBox1.visible = false;
        this.errorBox2.visible = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
