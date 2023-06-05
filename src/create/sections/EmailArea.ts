/* START OF COMPILED CODE */

import Phaser from "phaser";
import SmallProgressBubble from "../prefabs/SmallProgressBubble";
import ErrorBubble from "../prefabs/ErrorBubble";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EmailArea extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // progressBubble
        const progressBubble = new SmallProgressBubble(scene, 0, 0);
        this.add(progressBubble);

        // title
        const title = scene.add.bitmapText(112.5, 19.6875, "BurbankSmallBold", "Parent's Email Address:");
        title.tintTopLeft = 2894894;
        title.tintTopRight = 2894894;
        title.tintBottomLeft = 2894894;
        title.tintBottomRight = 2894894;
        title.text = "Parent's Email Address:";
        title.fontSize = -27;
        this.add(title);

        // emailConditions
        const emailConditions = scene.add.container(126, 141.75);
        this.add(emailConditions);

        // emailConditionsGraphic
        const emailConditionsGraphic = scene.add.image(0, 8.325, "create", "create-module/emailConditions");
        emailConditionsGraphic.setOrigin(0, 0);
        emailConditions.add(emailConditionsGraphic);

        // emailConditionTextBox
        const emailConditionTextBox = scene.add.bitmapText(11.25, -2.25, "BurbankSmallBold", "Club Penguin will send your parent an email with an activation code.");
        emailConditionTextBox.tintTopLeft = 5395026;
        emailConditionTextBox.tintTopRight = 5395026;
        emailConditionTextBox.tintBottomLeft = 5395026;
        emailConditionTextBox.tintBottomRight = 5395026;
        emailConditionTextBox.text = "Club Penguin will send your parent an email with an activation code.";
        emailConditionTextBox.fontSize = -18;
        emailConditionTextBox.maxWidth = 528.75;
        emailConditions.add(emailConditionTextBox);

        // fieldGraphic
        const fieldGraphic = scene.add.image(108, 59.74, "create", "create-module/emailField");
        fieldGraphic.setOrigin(0, 0);
        this.add(fieldGraphic);

        // placeholder
        const placeholder = scene.add.bitmapText(119.25, 79.9875, "BurbankSmallBold", "Enter parent's email address");
        placeholder.tintTopLeft = 13882584;
        placeholder.tintTopRight = 13882584;
        placeholder.tintBottomLeft = 13882584;
        placeholder.tintBottomRight = 13882584;
        placeholder.text = "Enter parent's email address";
        placeholder.fontSize = -27;
        this.add(placeholder);

        // errorBubble
        const errorBubble = new ErrorBubble(scene, 391.3875, -32.175);
        errorBubble.visible = false;
        this.add(errorBubble);

        // progressBubble (prefab fields)
        progressBubble.text = "4.";

        this.progressBubble = progressBubble;
        this.title = title;
        this.emailConditionTextBox = emailConditionTextBox;
        this.emailConditions = emailConditions;
        this.fieldGraphic = fieldGraphic;
        this.placeholder = placeholder;
        this.errorBubble = errorBubble;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public progressBubble: SmallProgressBubble;
    public title: Phaser.GameObjects.BitmapText;
    public emailConditionTextBox: Phaser.GameObjects.BitmapText;
    public emailConditions: Phaser.GameObjects.Container;
    public fieldGraphic: Phaser.GameObjects.Image;
    public placeholder: Phaser.GameObjects.BitmapText;
    public errorBubble: ErrorBubble;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
