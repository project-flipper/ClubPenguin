
// You can write more code here

/* START OF COMPILED CODE */

import TextBox from "../../lib/ui/TextBox";
import ButtonComponent from "../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */

import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class PublicComputerPrompt extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.nineslice(447.75, 310.5, "login", "login-screen/publicpromptbg", 814.95, 461.25, 46, 46, 46, 46);
        bg.setOrigin(0, 0);
        this.add(bg);

        // message
        const message = new TextBox(scene, 556.9875, 341.1, "BurbankSmallMedium");
        message.text = "WAIT!\nDo other people use \nthis computer?";
        message.fontSize = -40.5;
        message.align = 1;
        message.maxWidth = 609.975;
        this.add(message);

        // yesButton
        const yesButton = scene.add.image(573.525, 598.05, "login", "login-screen/publicpromptbutton0001");
        yesButton.setOrigin(0, 0);
        this.add(yesButton);

        // yesLabel
        const yesLabel = new TextBox(scene, 573.525, 598.05, "BurbankSmallBold");
        yesLabel.text = "Yes";
        yesLabel.fontSize = -40.5;
        yesLabel.align = 1;
        this.add(yesLabel);

        // noButton
        const noButton = scene.add.image(888.6375, 598.05, "login", "login-screen/publicpromptbutton0001");
        noButton.setOrigin(0, 0);
        this.add(noButton);

        // noLabel
        const noLabel = new TextBox(scene, 888.6375, 598.05, "BurbankSmallBold");
        noLabel.text = "No";
        noLabel.fontSize = -40.5;
        noLabel.align = 1;
        this.add(noLabel);

        // message (prefab fields)
        message.boxWidth = 609.975;
        message.boxHeight = 275.8625;
        message.horizontalAlign = 1;
        message.verticalAlign = 1;

        // yesButton (components)
        const yesButtonButtonComponent = new ButtonComponent(yesButton);
        yesButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/publicpromptbutton0001"};
        yesButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/publicpromptbutton0002"};
        yesButtonButtonComponent.handCursor = true;

        // yesLabel (prefab fields)
        yesLabel.boxWidth = 262;
        yesLabel.boxHeight = 105;
        yesLabel.horizontalAlign = 1;
        yesLabel.verticalAlign = 1;

        // noButton (components)
        const noButtonButtonComponent = new ButtonComponent(noButton);
        noButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/publicpromptbutton0001"};
        noButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/publicpromptbutton0002"};
        noButtonButtonComponent.handCursor = true;

        // noLabel (prefab fields)
        noLabel.boxWidth = 262;
        noLabel.boxHeight = 105;
        noLabel.horizontalAlign = 1;
        noLabel.verticalAlign = 1;

        this.message = message;
        this.yesButton = yesButton;
        this.yesLabel = yesLabel;
        this.noButton = noButton;
        this.noLabel = noLabel;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public message: TextBox;
    public yesButton: Phaser.GameObjects.Image;
    public yesLabel: TextBox;
    public noButton: Phaser.GameObjects.Image;
    public noLabel: TextBox;

    /* START-USER-CODE */

    localize(locale: Locale): void {
        this.message.text = locale.localize('public_computer_prompt_msg');
        this.yesLabel.text = locale.localize('Yes');
        this.noLabel.text = locale.localize('No');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
