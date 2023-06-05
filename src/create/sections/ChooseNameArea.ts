/* START OF COMPILED CODE */

import Phaser from "phaser";
import LargeProgressBubble from "../prefabs/LargeProgressBubble";
import TextBox from "../../lib/ui/TextBox";
import ErrorBubble from "../prefabs/ErrorBubble";
import TextField from "../../lib/ui/TextField";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ChooseNameArea extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // progressBubble
        const progressBubble = new LargeProgressBubble(scene, 0, -91.8);
        this.add(progressBubble);

        // titleTextBox
        const titleTextBox = new TextBox(scene, 132.75, 0, "BurbankSmallBold");
        titleTextBox.tintFill = false;
        titleTextBox.tintTopLeft = 2894894;
        titleTextBox.tintTopRight = 2894894;
        titleTextBox.tintBottomLeft = 2894894;
        titleTextBox.tintBottomRight = 2894894;
        titleTextBox.text = "Create Penguin Name:";
        titleTextBox.fontSize = -27;
        this.add(titleTextBox);

        // conditions
        const conditions = scene.add.container(139.5, 148.5);
        this.add(conditions);

        // conditionsGraphics
        const conditionsGraphics = scene.add.image(0, 8.325, "create", "create-module/nameConditions");
        conditionsGraphics.setOrigin(0, 0);
        conditions.add(conditionsGraphics);

        // condition1TextBox
        const condition1TextBox = new TextBox(scene, 11.25, -2.25, "BurbankSmallBold");
        condition1TextBox.tintFill = false;
        condition1TextBox.tintTopLeft = 5395026;
        condition1TextBox.tintTopRight = 5395026;
        condition1TextBox.tintBottomLeft = 5395026;
        condition1TextBox.tintBottomRight = 5395026;
        condition1TextBox.text = "4 - 12 letters, numbers or spaces";
        condition1TextBox.fontSize = -22.5;
        conditions.add(condition1TextBox);

        // condition2TextBox
        const condition2TextBox = new TextBox(scene, 11.25, 20.25, "BurbankSmallBold");
        condition2TextBox.tintFill = false;
        condition2TextBox.tintTopLeft = 5395026;
        condition2TextBox.tintTopRight = 5395026;
        condition2TextBox.tintBottomLeft = 5395026;
        condition2TextBox.tintBottomRight = 5395026;
        condition2TextBox.text = "Do not use your real name";
        condition2TextBox.fontSize = -22.5;
        conditions.add(condition2TextBox);

        // fieldGraphic
        const fieldGraphic = scene.add.image(135, 42.75, "create", "create-module/chooseNameField");
        fieldGraphic.setOrigin(0, 0);
        this.add(fieldGraphic);

        // placeholder
        const placeholder = scene.add.bitmapText(139.5, 76.5, "BurbankSmallBold", "Enter Penguin Name");
        placeholder.tintTopLeft = 13882584;
        placeholder.tintTopRight = 13882584;
        placeholder.tintBottomLeft = 13882584;
        placeholder.tintBottomRight = 13882584;
        placeholder.text = "Enter Penguin Name";
        placeholder.fontSize = -27;
        this.add(placeholder);

        // errorBubble
        const errorBubble = new ErrorBubble(scene, 328.3875, -49.1625);
        errorBubble.visible = false;
        this.add(errorBubble);

        // textField
        const textField = new TextField(scene, 162, 72);
        this.add(textField);

        // titleTextBox (prefab fields)
        titleTextBox.boxWidth = 234;
        titleTextBox.boxHeight = 36;

        // condition1TextBox (prefab fields)
        condition1TextBox.boxWidth = 900;
        condition1TextBox.boxHeight = 50.625;
        condition1TextBox.verticalAlign = 1;

        // condition2TextBox (prefab fields)
        condition2TextBox.boxWidth = 900;
        condition2TextBox.boxHeight = 50.625;
        condition2TextBox.verticalAlign = 1;

        this.progressBubble = progressBubble;
        this.titleTextBox = titleTextBox;
        this.condition1TextBox = condition1TextBox;
        this.condition2TextBox = condition2TextBox;
        this.conditions = conditions;
        this.fieldGraphic = fieldGraphic;
        this.placeholder = placeholder;
        this.errorBubble = errorBubble;

        /* START-USER-CTR-CODE */

        textField.setup();

        /* END-USER-CTR-CODE */
    }

    public progressBubble: LargeProgressBubble;
    public titleTextBox: TextBox;
    public condition1TextBox: TextBox;
    public condition2TextBox: TextBox;
    public conditions: Phaser.GameObjects.Container;
    public fieldGraphic: Phaser.GameObjects.Image;
    public placeholder: Phaser.GameObjects.BitmapText;
    public errorBubble: ErrorBubble;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
