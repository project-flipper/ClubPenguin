
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../lib/components/ButtonComponent";
import PlayerItem from "../prefabs/PlayerItem";
import Checkbox from "../prefabs/Checkbox";
import TextBox from "../../lib/ui/TextBox";
import TextField from "../../lib/ui/TextField";
/* START-USER-IMPORTS */
import { Locale } from "@clubpenguin/app/locale";
import Login, { SavedAccount } from "../Login";
/* END-USER-IMPORTS */

export default class ExistingPlayer extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // forgot
        const forgot = scene.add.sprite(1081.01, 680.51, "login", "login-screen/forgotExisting0001");
        forgot.visible = false;
        this.add(forgot);

        // forget
        const forget = scene.add.sprite(1081.01, 748.01, "login", "login-screen/forgotExisting0001");
        forget.visible = false;
        this.add(forget);

        // forgotButton
        const forgotButton = scene.add.image(1081.01, 680.51, "login", "login-screen/forgotExistingHover");
        forgotButton.alpha = 0.0001;
        forgotButton.alphaTopLeft = 0.0001;
        forgotButton.alphaTopRight = 0.0001;
        forgotButton.alphaBottomLeft = 0.0001;
        forgotButton.alphaBottomRight = 0.0001;
        this.add(forgotButton);

        // forgetButton
        const forgetButton = scene.add.image(1081.01, 748.01, "login", "login-screen/forgotExistingHover");
        forgetButton.alpha = 0.0001;
        forgetButton.alphaTopLeft = 0.0001;
        forgetButton.alphaTopRight = 0.0001;
        forgetButton.alphaBottomLeft = 0.0001;
        forgetButton.alphaBottomRight = 0.0001;
        this.add(forgetButton);

        // login_screen_itembg
        const login_screen_itembg = scene.add.image(265.5, 105.75, "login", "login-screen/itembg");
        login_screen_itembg.setOrigin(0, 0);
        this.add(login_screen_itembg);

        // item
        const item = new PlayerItem(scene, 540, 427.5);
        this.add(item);

        // nameCheckbox
        const nameCheckbox = new Checkbox(scene, 916.31, 366.41);
        this.add(nameCheckbox);

        // passwordCheckbox
        const passwordCheckbox = new Checkbox(scene, 916.31, 429.41);
        this.add(passwordCheckbox);

        // nameCheckLabel
        const nameCheckLabel = new TextBox(scene, 962.44, 344.59, "BurbankSmallMedium");
        nameCheckLabel.tintFill = true;
        nameCheckLabel.tintTopLeft = 0;
        nameCheckLabel.tintTopRight = 0;
        nameCheckLabel.tintBottomLeft = 0;
        nameCheckLabel.tintBottomRight = 0;
        nameCheckLabel.text = "Remember me on this computer";
        nameCheckLabel.fontSize = -36;
        nameCheckLabel.align = 0;
        nameCheckLabel.maxWidth = 760.3875;
        this.add(nameCheckLabel);

        // passwordCheckLabel
        const passwordCheckLabel = new TextBox(scene, 962.44, 403.09, "BurbankSmallMedium");
        passwordCheckLabel.tintFill = true;
        passwordCheckLabel.tintTopLeft = 0;
        passwordCheckLabel.tintTopRight = 0;
        passwordCheckLabel.tintBottomLeft = 0;
        passwordCheckLabel.tintBottomRight = 0;
        passwordCheckLabel.text = "Remember my password";
        passwordCheckLabel.fontSize = -36;
        passwordCheckLabel.align = 0;
        passwordCheckLabel.maxWidth = 760.3875;
        this.add(passwordCheckLabel);

        // passwordLabel
        const passwordLabel = new TextBox(scene, 885.94, 182.59, "BurbankSmallMedium");
        passwordLabel.tintFill = true;
        passwordLabel.tintTopLeft = 0;
        passwordLabel.tintTopRight = 0;
        passwordLabel.tintBottomLeft = 0;
        passwordLabel.tintBottomRight = 0;
        passwordLabel.text = "Password:";
        passwordLabel.fontSize = -36;
        passwordLabel.align = 2;
        this.add(passwordLabel);

        // passwordTextField
        const passwordTextField = new TextField(scene, 886.73, 245.03);
        this.add(passwordTextField);

        // loginButton
        const loginButton = scene.add.image(878.85, 489.83, "login", "login-screen/button");
        loginButton.setOrigin(0, 0);
        this.add(loginButton);

        // loginLabel
        const loginLabel = new TextBox(scene, 910.91, 518.4, "BurbankSmallMedium");
        loginLabel.text = "Sign In";
        loginLabel.fontSize = -45;
        loginLabel.align = 1;
        this.add(loginLabel);

        // secret
        const secret = scene.add.image(1455.75, 875.25, "login", "login-screen/secret0001");
        secret.setOrigin(0.4921875, 0.49058824);
        this.add(secret);

        // differentButton
        const differentButton = scene.add.image(853.76, 988.76, "login", "login-screen/moreGalleryHover");
        differentButton.alpha = 0.0001;
        differentButton.alphaTopLeft = 0.0001;
        differentButton.alphaTopRight = 0.0001;
        differentButton.alphaBottomLeft = 0.0001;
        differentButton.alphaBottomRight = 0.0001;
        this.add(differentButton);

        // different
        const different = scene.add.sprite(853.76, 988.76, "login", "login-screen/moreGallery0001");
        different.visible = false;
        this.add(different);

        // differentLabel
        const differentLabel = new TextBox(scene, 406.58, 963, "BurbankSmallMedium");
        differentLabel.text = "Login as a different penguin";
        differentLabel.fontSize = -36;
        this.add(differentLabel);

        // forgotLabel
        const forgotLabel = new TextBox(scene, 875.48, 655.88, "BurbankSmallMedium");
        forgotLabel.text = "Forgot your password?";
        forgotLabel.fontSize = -36;
        forgotLabel.align = 1;
        this.add(forgotLabel);

        // forgetLabel
        const forgetLabel = new TextBox(scene, 874.69, 723.15, "BurbankSmallMedium");
        forgetLabel.text = "Forget my penguin";
        forgetLabel.fontSize = -36;
        forgetLabel.align = 1;
        this.add(forgetLabel);

        // forgotButton (components)
        const forgotButtonButtonComponent = new ButtonComponent(forgotButton);
        forgotButtonButtonComponent.handCursor = true;

        // forgetButton (components)
        const forgetButtonButtonComponent = new ButtonComponent(forgetButton);
        forgetButtonButtonComponent.handCursor = true;

        // nameCheckbox (prefab fields)
        nameCheckbox.checked = true;

        // nameCheckLabel (prefab fields)
        nameCheckLabel.boxWidth = 657.45;
        nameCheckLabel.boxHeight = 52.2;
        nameCheckLabel.horizontalAlign = 0;
        nameCheckLabel.verticalAlign = 1;

        // passwordCheckLabel (prefab fields)
        passwordCheckLabel.boxWidth = 657.45;
        passwordCheckLabel.boxHeight = 52.2;
        passwordCheckLabel.horizontalAlign = 0;
        passwordCheckLabel.verticalAlign = 1;

        // passwordLabel (prefab fields)
        passwordLabel.boxWidth = 452.7;
        passwordLabel.boxHeight = 52.2;
        passwordLabel.horizontalAlign = 0;
        passwordLabel.verticalAlign = 1;

        // passwordTextField (prefab fields)
        passwordTextField.inputType = "password";
        passwordTextField.fieldWidth = 456.6375;
        passwordTextField.fieldHeight = 63;
        passwordTextField.maxLength = 32;
        passwordTextField.font = "BurbankSmallMedium";
        passwordTextField.fontSize = -45;
        passwordTextField.fontColor = "#000000";
        passwordTextField.backgroundIsFilled = true;
        passwordTextField.backgroundIsStroked = true;
        passwordTextField.backgroundStrokeWidth = 2;
        passwordTextField.backgroundStrokeColor = "#000000";
        passwordTextField.autocomplete = "password";

        // loginButton (components)
        const loginButtonButtonComponent = new ButtonComponent(loginButton);
        loginButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/button"};
        loginButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/buttonHover"};
        loginButtonButtonComponent.downTexture = {"key":"login","frame":"login-screen/buttonDown"};
        loginButtonButtonComponent.handCursor = true;

        // loginLabel (prefab fields)
        loginLabel.boxWidth = 293.2875;
        loginLabel.boxHeight = 63;
        loginLabel.horizontalAlign = 1;
        loginLabel.verticalAlign = 1;

        // differentButton (components)
        const differentButtonButtonComponent = new ButtonComponent(differentButton);
        differentButtonButtonComponent.handCursor = true;

        // differentLabel (prefab fields)
        differentLabel.boxWidth = 896.625;
        differentLabel.boxHeight = 52.2;
        differentLabel.horizontalAlign = 1;
        differentLabel.verticalAlign = 1;

        // forgotLabel (prefab fields)
        forgotLabel.boxWidth = 622.9125;
        forgotLabel.boxHeight = 52.2;
        forgotLabel.horizontalAlign = 0;
        forgotLabel.verticalAlign = 1;

        // forgetLabel (prefab fields)
        forgetLabel.boxWidth = 535.95;
        forgetLabel.boxHeight = 52.2;
        forgetLabel.horizontalAlign = 0;
        forgetLabel.verticalAlign = 1;

        this.forgot = forgot;
        this.forget = forget;
        this.forgotButton = forgotButton;
        this.forgetButton = forgetButton;
        this.item = item;
        this.nameCheckbox = nameCheckbox;
        this.passwordCheckbox = passwordCheckbox;
        this.nameCheckLabel = nameCheckLabel;
        this.passwordCheckLabel = passwordCheckLabel;
        this.passwordLabel = passwordLabel;
        this.passwordTextField = passwordTextField;
        this.loginButton = loginButton;
        this.loginLabel = loginLabel;
        this.secret = secret;
        this.differentButton = differentButton;
        this.different = different;
        this.differentLabel = differentLabel;
        this.forgotLabel = forgotLabel;
        this.forgetLabel = forgetLabel;

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

        this.forgotButton.on('over', () => {
            this.forgot.visible = true;
            this.forgot.play('differentAnimationlogin-animation');
        });
        this.forgotButton.on('out', () => {
            this.forgot.visible = false;
        });
        this.forgotButton.on('release', () => {
            window.location.reload(); // TODO: go to URL
        });

        this.forgetButton.on('over', () => {
            this.forget.visible = true;
            this.forget.play('differentAnimationlogin-animation');
        });
        this.forgetButton.on('out', () => {
            this.forget.visible = false;
        });

        this.differentButton.on('out', () => {
            this.different.visible = false;
            this.different.stop();
        });
        this.differentButton.on('over', () => {
            this.different.visible = true;
            this.different.play('differentAnimationlogin-animation');
        });
        this.differentButton.on('release', () => this.scene.showInitialState());

        this.passwordTextField.setup();

        /* END-USER-CTR-CODE */
    }

    public forgot: Phaser.GameObjects.Sprite;
    public forget: Phaser.GameObjects.Sprite;
    public forgotButton: Phaser.GameObjects.Image;
    public forgetButton: Phaser.GameObjects.Image;
    public item: PlayerItem;
    public nameCheckbox: Checkbox;
    public passwordCheckbox: Checkbox;
    public nameCheckLabel: TextBox;
    public passwordCheckLabel: TextBox;
    public passwordLabel: TextBox;
    public passwordTextField: TextField;
    public loginButton: Phaser.GameObjects.Image;
    public loginLabel: TextBox;
    public secret: Phaser.GameObjects.Image;
    public differentButton: Phaser.GameObjects.Image;
    public different: Phaser.GameObjects.Sprite;
    public differentLabel: TextBox;
    public forgotLabel: TextBox;
    public forgetLabel: TextBox;

    /* START-USER-CODE */

    declare scene: Login;

    setup(account: SavedAccount): void {
        this.item.setup(account, true);
        this.passwordCheckbox.checked = Boolean(account.key);

        this.passwordTextField.placeholder = account.key ? '*************' : '';

        this.loginButton.off('release');
        this.loginButton.on('release', () => {
            this.scene.login({
                name: account.user.username,
                password: this.passwordTextField.value,
                saveName: this.nameCheckbox.checked,
                savePassword: this.passwordCheckbox.checked,
                key: this.passwordTextField.value ? undefined : account.key
            }).catch(() => this.unlock());
        });

        this.forgetButton.off('release');
        this.forgetButton.on('release', () => {
            this.scene.deleteAccount(account.user.id);
            this.scene.showInitialState();
        });
    }

    localize(locale: Locale): void {
        this.passwordLabel.text = locale.localize('Password:');
        this.nameCheckLabel.text = locale.localize('Remember me on this computer');
        this.passwordCheckLabel.text = locale.localize('Remember my password');
        this.loginLabel.text = locale.localize('Login');
        this.forgotLabel.text = locale.localize('Forgot your password?');
        this.forgetLabel.text = locale.localize('Forget my penguin');
        this.secret.setFrame(`login-screen/secret${locale.frame}`);
        this.differentLabel.text = locale.localize('Login as a different penguin');
    }

    lock(): void {
        this.passwordTextField.locked = true;
    }

    unlock(): void {
        this.passwordTextField.locked = false;

    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
