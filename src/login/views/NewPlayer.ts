/* START OF COMPILED CODE */

import TextField from "../../lib/ui/TextField";
import TextBox from "../../lib/ui/TextBox";
import Checkbox from "../prefabs/Checkbox";
import ButtonComponent from "../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import Login from "@clubpenguin/login/Login";
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class NewPlayer extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // nameTextField
        const nameTextField = new TextField(scene, 711, 135);
        this.add(nameTextField);

        // passwordTextField
        const passwordTextField = new TextField(scene, 711, 202.5);
        this.add(passwordTextField);

        // nameLabel
        const nameLabel = new TextBox(scene, 292.5, 139.5, "BurbankSmallMedium");
        nameLabel.tintFill = true;
        nameLabel.tintTopLeft = 0;
        nameLabel.tintTopRight = 0;
        nameLabel.tintBottomLeft = 0;
        nameLabel.tintBottomRight = 0;
        nameLabel.text = "Penguin name:";
        nameLabel.fontSize = 36;
        nameLabel.align = 2;
        this.add(nameLabel);

        // passwordLabel
        const passwordLabel = new TextBox(scene, 292.5, 209.25, "BurbankSmallMedium");
        passwordLabel.tintFill = true;
        passwordLabel.tintTopLeft = 0;
        passwordLabel.tintTopRight = 0;
        passwordLabel.tintBottomLeft = 0;
        passwordLabel.tintBottomRight = 0;
        passwordLabel.text = "Password:";
        passwordLabel.fontSize = 36;
        passwordLabel.align = 2;
        this.add(passwordLabel);

        // nameCheckbox
        const nameCheckbox = new Checkbox(scene, 637.3125, 303.41249999999997);
        this.add(nameCheckbox);

        // nameCheckLabel
        const nameCheckLabel = new TextBox(scene, 672.75, 279, "BurbankSmallMedium");
        nameCheckLabel.tintFill = true;
        nameCheckLabel.tintTopLeft = 0;
        nameCheckLabel.tintTopRight = 0;
        nameCheckLabel.tintBottomLeft = 0;
        nameCheckLabel.tintBottomRight = 0;
        nameCheckLabel.text = "Remember me on this computer";
        nameCheckLabel.fontSize = 36;
        nameCheckLabel.align = 0;
        nameCheckLabel.maxWidth = 760.3875;
        this.add(nameCheckLabel);

        // passwordCheckLabel
        const passwordCheckLabel = new TextBox(scene, 672.75, 337.5, "BurbankSmallMedium");
        passwordCheckLabel.tintFill = true;
        passwordCheckLabel.tintTopLeft = 0;
        passwordCheckLabel.tintTopRight = 0;
        passwordCheckLabel.tintBottomLeft = 0;
        passwordCheckLabel.tintBottomRight = 0;
        passwordCheckLabel.text = "Remember my password";
        passwordCheckLabel.fontSize = 36;
        passwordCheckLabel.align = 0;
        passwordCheckLabel.maxWidth = 760.3875;
        this.add(passwordCheckLabel);

        // passwordCheckbox
        const passwordCheckbox = new Checkbox(scene, 637.3125, 366.41249999999997);
        this.add(passwordCheckbox);

        // loginButton
        const loginButton = scene.add.image(680.0625, 424.125, "login", "login-screen/button");
        loginButton.setOrigin(0, 0);
        this.add(loginButton);

        // loginLabel
        const loginLabel = new TextBox(scene, 716.2875, 453.375, "BurbankSmallMedium");
        loginLabel.text = "Login";
        loginLabel.fontSize = 45;
        loginLabel.align = 1;
        this.add(loginLabel);

        // forgotHitbox
        const forgotHitbox = scene.add.rectangle(853.7625, 620.55, 486, 81);
        forgotHitbox.alpha = 0.0001;
        forgotHitbox.isFilled = true;
        forgotHitbox.fillColor = 5694679;
        this.add(forgotHitbox);

        // forgotBar
        const forgotBar = scene.add.sprite(493.7625, 575.55, "login", "login-screen/forgot0001");
        forgotBar.setOrigin(0, 0);
        forgotBar.visible = false;
        this.add(forgotBar);

        // forgotLabel
        const forgotLabel = new TextBox(scene, 551.25, 592.425, "BurbankSmallMedium");
        forgotLabel.text = "Forgot your password?";
        forgotLabel.fontSize = 36;
        forgotLabel.align = 1;
        this.add(forgotLabel);

        // accountHitbox
        const accountHitbox = scene.add.rectangle(859.5, 747, 685.575, 162);
        accountHitbox.alpha = 0.0001;
        accountHitbox.isFilled = true;
        accountHitbox.fillColor = 5694679;
        this.add(accountHitbox);

        // accountBar
        const accountBar = scene.add.sprite(351.5, 657, "login", "login-screen/account0001");
        accountBar.setOrigin(0, 0);
        accountBar.visible = false;
        this.add(accountBar);

        // accountLabel
        const accountLabel = new TextBox(scene, 549.225, 695.1375, "BurbankSmallMedium");
        accountLabel.tintFill = true;
        accountLabel.tintTopLeft = 0;
        accountLabel.tintTopRight = 0;
        accountLabel.tintBottomLeft = 0;
        accountLabel.tintBottomRight = 0;
        accountLabel.text = "Don't have a penguin?";
        accountLabel.fontSize = 36;
        accountLabel.align = 1;
        this.add(accountLabel);

        // accountLabel2
        const accountLabel2 = new TextBox(scene, 303.4125, 750.375, "BurbankSmallMedium");
        accountLabel2.text = "Create a free account now";
        accountLabel2.fontSize = 38.25;
        accountLabel2.align = 1;
        this.add(accountLabel2);

        // rulesHitbox
        const rulesHitbox = scene.add.rectangle(852.75, 876.375, 470.7, 88.2);
        rulesHitbox.alpha = 0.0001;
        rulesHitbox.isFilled = true;
        rulesHitbox.fillColor = 5694679;
        this.add(rulesHitbox);

        // rulesBar
        const rulesBar = scene.add.sprite(503.75, 827.375, "login", "login-screen/rules0001");
        rulesBar.setOrigin(0, 0);
        rulesBar.visible = false;
        this.add(rulesBar);

        // rulesLabel
        const rulesLabel = new TextBox(scene, 551.3625, 847.35, "BurbankSmallMedium");
        rulesLabel.text = "Club Penguin Rules";
        rulesLabel.fontSize = 40.5;
        rulesLabel.align = 1;
        this.add(rulesLabel);

        // backHitbox
        const backHitbox = scene.add.rectangle(853.7625, 991.0125, 486, 81);
        backHitbox.alpha = 0.0001;
        backHitbox.isFilled = true;
        backHitbox.fillColor = 5694679;
        this.add(backHitbox);

        // backBar
        const backBar = scene.add.sprite(493.7625, 946.0125, "login", "login-screen/back0001");
        backBar.setOrigin(0, 0);
        backBar.visible = false;
        this.add(backBar);

        // backLabel
        const backLabel = new TextBox(scene, 690.75, 966.2625, "BurbankSmallMedium");
        backLabel.text = "Back";
        backLabel.fontSize = 36;
        backLabel.align = 1;
        this.add(backLabel);

        // secret
        const secret = scene.add.image(1329.75, 558.9, "login", "login-screen/secret0001");
        secret.setOrigin(0.4921875, 0.49058824);
        this.add(secret);

        // nameTextField (prefab fields)
        nameTextField.inputType = "email";
        nameTextField.fieldWidth = 456.525;
        nameTextField.fieldHeight = 63.1125;
        nameTextField.maxLength = 12;
        nameTextField.font = "Burbank Small Medium";
        nameTextField.fontSize = "45px";
        nameTextField.fontColor = "#000000";
        nameTextField.backgroundIsStroked = true;
        nameTextField.backgroundStrokeWidth = 2;
        nameTextField.backgroundStrokeColor = "#000000";
        nameTextField.marginLeft = 4.5;
        nameTextField.autocomplete = "username";

        // passwordTextField (prefab fields)
        passwordTextField.inputType = "password";
        passwordTextField.fieldWidth = 456.525;
        passwordTextField.fieldHeight = 63.1125;
        passwordTextField.maxLength = 32;
        passwordTextField.font = "Burbank Small Medium";
        passwordTextField.fontSize = "45px";
        passwordTextField.fontColor = "#000000";
        passwordTextField.backgroundIsStroked = true;
        passwordTextField.backgroundStrokeWidth = 2;
        passwordTextField.backgroundStrokeColor = "#000000";
        passwordTextField.marginLeft = 4.5;
        passwordTextField.autocomplete = "password";

        // nameLabel (prefab fields)
        nameLabel.boxWidth = 409.05;
        nameLabel.boxHeight = 52.2;
        nameLabel.horizontalAlign = 2;
        nameLabel.verticalAlign = 1;

        // passwordLabel (prefab fields)
        passwordLabel.boxWidth = 409.05;
        passwordLabel.boxHeight = 52.2;
        passwordLabel.horizontalAlign = 2;
        passwordLabel.verticalAlign = 1;

        // nameCheckLabel (prefab fields)
        nameCheckLabel.boxWidth = 760.3875;
        nameCheckLabel.boxHeight = 52.2;
        nameCheckLabel.horizontalAlign = 0;
        nameCheckLabel.verticalAlign = 1;

        // passwordCheckLabel (prefab fields)
        passwordCheckLabel.boxWidth = 760.3875;
        passwordCheckLabel.boxHeight = 52.2;
        passwordCheckLabel.horizontalAlign = 0;
        passwordCheckLabel.verticalAlign = 1;

        // loginButton (components)
        const loginButtonButtonComponent = new ButtonComponent(loginButton);
        loginButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/button"};
        loginButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/buttonHover"};
        loginButtonButtonComponent.downTexture = {"key":"login","frame":"login-screen/buttonDown"};
        loginButtonButtonComponent.handCursor = true;

        // loginLabel (prefab fields)
        loginLabel.boxWidth = 284.9625;
        loginLabel.boxHeight = 63;
        loginLabel.horizontalAlign = 1;
        loginLabel.verticalAlign = 1;

        // forgotLabel (prefab fields)
        forgotLabel.boxWidth = 602.8875;
        forgotLabel.boxHeight = 52.2;
        forgotLabel.horizontalAlign = 1;
        forgotLabel.verticalAlign = 1;

        // accountLabel (prefab fields)
        accountLabel.boxWidth = 602.8875;
        accountLabel.boxHeight = 52.2;
        accountLabel.horizontalAlign = 1;
        accountLabel.verticalAlign = 1;

        // accountLabel2 (prefab fields)
        accountLabel2.boxWidth = 1100.25;
        accountLabel2.boxHeight = 75.0375;
        accountLabel2.horizontalAlign = 1;
        accountLabel2.verticalAlign = 1;

        // rulesLabel (prefab fields)
        rulesLabel.boxWidth = 602.8875;
        rulesLabel.boxHeight = 58.5;
        rulesLabel.horizontalAlign = 1;
        rulesLabel.verticalAlign = 1;

        // backLabel (prefab fields)
        backLabel.boxWidth = 323.8875;
        backLabel.boxHeight = 52.2;
        backLabel.horizontalAlign = 1;
        backLabel.verticalAlign = 1;

        this.nameTextField = nameTextField;
        this.passwordTextField = passwordTextField;
        this.nameLabel = nameLabel;
        this.passwordLabel = passwordLabel;
        this.nameCheckbox = nameCheckbox;
        this.nameCheckLabel = nameCheckLabel;
        this.passwordCheckLabel = passwordCheckLabel;
        this.passwordCheckbox = passwordCheckbox;
        this.loginButton = loginButton;
        this.loginLabel = loginLabel;
        this.forgotHitbox = forgotHitbox;
        this.forgotBar = forgotBar;
        this.forgotLabel = forgotLabel;
        this.accountHitbox = accountHitbox;
        this.accountBar = accountBar;
        this.accountLabel = accountLabel;
        this.accountLabel2 = accountLabel2;
        this.rulesHitbox = rulesHitbox;
        this.rulesBar = rulesBar;
        this.rulesLabel = rulesLabel;
        this.backHitbox = backHitbox;
        this.backBar = backBar;
        this.backLabel = backLabel;
        this.secret = secret;

        /* START-USER-CTR-CODE */

        this.nameCheckbox.button.on('release', () => {
            this.nameCheckbox.checked = !this.nameCheckbox.checked;
            if (!this.nameCheckbox.checked) this.passwordCheckbox.checked = false;
        });
        this.passwordCheckbox.button.on('release', () => {
            if (this.passwordCheckbox.checked) {
                this.nameCheckbox.checked = false;
                this.passwordCheckbox.checked = false;
            } else {
                this.lock();

                this.scene.showSavePasswordPrompt(() => {
                    this.nameCheckbox.checked = true;
                    this.passwordCheckbox.checked = true;
                    this.scene.passwordPrompt.close();
                    this.unlock();
                }, () => {
                    this.unlock();
                });
            }
        });

        this.forgotHitbox.setInteractive({ useHandCursor: true });
        this.forgotHitbox.on('pointerover', () => {
            this.forgotBar.visible = true;
            this.forgotBar.play('forgotAnimationlogin-screen/forgot');
        });
        this.forgotHitbox.on('pointerout', () => {
            this.forgotBar.visible = false;
        });
        this.forgotHitbox.on('pointerup', () => {
            window.location.reload(); // TODO: go to URL
        });

        this.accountHitbox.setInteractive({ useHandCursor: true });
        this.accountHitbox.on('pointerover', () => {
            this.accountBar.visible = true;
            this.accountBar.play('accountAnimationlogin-screen/account');
        });
        this.accountHitbox.on('pointerout', () => {
            this.accountBar.visible = false;
        });
        this.accountHitbox.on('pointerup', () => this.scene.goToCreate());

        this.rulesHitbox.setInteractive({ useHandCursor: true });
        this.rulesHitbox.on('pointerover', () => {
            this.rulesBar.visible = true;
            this.rulesBar.play('rulesAnimationlogin-screen/rules');
        });
        this.rulesHitbox.on('pointerout', () => {
            this.rulesBar.visible = false;
        });
        this.rulesHitbox.on('pointerup', () => { if (window.jsAPI) window.jsAPI.showRules() })

        this.backHitbox.setInteractive({ useHandCursor: true });
        this.backHitbox.on('pointerover', () => {
            this.backBar.visible = true;
            this.backBar.play('backAnimationlogin-screen/back');
        });
        this.backHitbox.on('pointerout', () => {
            this.backBar.visible = false;
        });
        this.backHitbox.on('pointerup', () => this.scene.goToStart());

        this.loginButton.on('release', () => {
            this.lock();

            this.scene.login({
                name: this.nameTextField.value,
                password: this.passwordTextField.value,
                saveName: this.nameCheckbox.checked,
                savePassword: this.passwordCheckbox.checked
            }).catch(() => this.unlock());
        });

        this.nameTextField.setup();
        this.passwordTextField.setup();

        /* END-USER-CTR-CODE */
    }

    public nameTextField: TextField;
    public passwordTextField: TextField;
    public nameLabel: TextBox;
    public passwordLabel: TextBox;
    public nameCheckbox: Checkbox;
    public nameCheckLabel: TextBox;
    public passwordCheckLabel: TextBox;
    public passwordCheckbox: Checkbox;
    public loginButton: Phaser.GameObjects.Image;
    public loginLabel: TextBox;
    public forgotHitbox: Phaser.GameObjects.Rectangle;
    public forgotBar: Phaser.GameObjects.Sprite;
    public forgotLabel: TextBox;
    public accountHitbox: Phaser.GameObjects.Rectangle;
    public accountBar: Phaser.GameObjects.Sprite;
    public accountLabel: TextBox;
    public accountLabel2: TextBox;
    public rulesHitbox: Phaser.GameObjects.Rectangle;
    public rulesBar: Phaser.GameObjects.Sprite;
    public rulesLabel: TextBox;
    public backHitbox: Phaser.GameObjects.Rectangle;
    public backBar: Phaser.GameObjects.Sprite;
    public backLabel: TextBox;
    public secret: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Login;

    lock(): void {
        this.nameTextField.locked = true;
        this.passwordTextField.locked = true;
    }

    unlock(): void {
        this.nameTextField.locked = false;
        this.passwordTextField.locked = false;
    }

    localize(locale: Locale): void {
        this.nameLabel.text = locale.localize('Penguin Name:');
        this.passwordLabel.text = locale.localize('Password:');
        this.nameCheckLabel.text = locale.localize('Remember me on this computer');
        this.passwordCheckLabel.text = locale.localize('Remember my password');
        this.loginLabel.text = locale.localize('Login');
        this.forgotLabel.text = locale.localize('Forgot your password?');
        this.accountLabel.text = locale.localize('Don\'t have a penguin?');
        this.accountLabel2.text = locale.localize('Create a free account now');
        this.rulesLabel.text = locale.localize('w.login.prompt.rules');
        this.backLabel.text = locale.localize('Back');
        this.secret.setFrame(`login-screen/secret${locale.frame}`);
    }

    setVisible(value: boolean): this {
        this.nameTextField.visible = value;
        this.passwordTextField.visible = value;
        return super.setVisible(value);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
