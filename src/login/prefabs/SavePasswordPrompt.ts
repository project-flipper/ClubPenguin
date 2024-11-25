
// You can write more code here

/* START OF COMPILED CODE */

import TextBox from "../../lib/ui/TextBox";
import ButtonComponent from "../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class SavePasswordPrompt extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // carousel
        const carousel = scene.add.image(343.9125, 292.6125, "login", "login-screen/carousel0");
        carousel.setOrigin(0, 0);
        this.add(carousel);

        // text1
        const text1 = new TextBox(scene, 397.35, 336.375, "BurbankSmallBold");
        text1.tintFill = true;
        text1.tintTopLeft = 0;
        text1.tintTopRight = 0;
        text1.tintBottomLeft = 0;
        text1.tintBottomRight = 0;
        text1.text = "They could spend your coins";
        text1.fontSize = 49.5;
        text1.align = 0;
        text1.maxWidth = 0;
        this.add(text1);

        // text2
        const text2 = new TextBox(scene, 397.35, 336.375, "BurbankSmallBold");
        text2.visible = false;
        text2.text = "\nThey could change your igloo.\n";
        text2.fontSize = 49.5;
        text2.align = 0;
        text2.maxWidth = 531.7875;
        this.add(text2);

        // text3
        const text3 = new TextBox(scene, 397.35, 336.375, "BurbankSmallBold");
        text3.visible = false;
        text3.tintFill = true;
        text3.tintTopLeft = 0;
        text3.tintTopRight = 0;
        text3.tintBottomLeft = 0;
        text3.tintBottomRight = 0;
        text3.text = "They could get your penguin banned";
        text3.fontSize = 49.5;
        text3.align = 0;
        text3.maxWidth = 549.7875;
        this.add(text3);

        // login_screen_warn
        const login_screen_warn = scene.add.image(258.75, 114.75, "login", "login-screen/warn");
        login_screen_warn.setOrigin(0, 0);
        this.add(login_screen_warn);

        // closeButton
        const closeButton = scene.add.image(1359.7875, 132.1875, "login", "login-screen/closeButton");
        closeButton.setOrigin(0, 0);
        this.add(closeButton);

        // title
        const title = new TextBox(scene, 356.625, 176.7375, "BurbankSmallMedium");
        title.text = "If you save your password here, anyone who \nuses this computer could access your account.";
        title.fontSize = 38.25;
        title.align = 0;
        this.add(title);

        // saveButton
        const saveButton = scene.add.image(358.425, 802.35, "login", "login-screen/saveButton");
        saveButton.setOrigin(0, 0);
        this.add(saveButton);

        // saveLabel
        const saveLabel = new TextBox(scene, 363.425, 802.35, "BurbankSmallBold");
        saveLabel.text = "Save password";
        saveLabel.fontSize = 31.5;
        saveLabel.align = 1;
        this.add(saveLabel);

        // dontSaveButton
        const dontSaveButton = scene.add.image(720, 802.35, "login", "login-screen/saveButton");
        dontSaveButton.setOrigin(0, 0);
        this.add(dontSaveButton);

        // dontSaveLabel
        const dontSaveLabel = new TextBox(scene, 725.63, 802.35, "BurbankSmallBold");
        dontSaveLabel.text = "Don't save password";
        dontSaveLabel.fontSize = 31.5;
        dontSaveLabel.align = 1;
        this.add(dontSaveLabel);

        // learnButton
        const learnButton = scene.add.image(1142.775, 836.6625, "login", "login-screen/learnButton");
        learnButton.setOrigin(0, 0);
        this.add(learnButton);

        // learnLabel
        const learnLabel = new TextBox(scene, 1142.775, 836.6625, "BurbankSmallBold");
        learnLabel.text = "En savoir plus";
        learnLabel.fontSize = 27;
        learnLabel.align = 1;
        this.add(learnLabel);

        // text1 (prefab fields)
        text1.boxWidth = 522.7875;
        text1.boxHeight = 281.7;

        // text2 (prefab fields)
        text2.boxWidth = 531.7875;
        text2.boxHeight = 281.7;

        // text3 (prefab fields)
        text3.boxWidth = 549.7875;
        text3.boxHeight = 236.25;

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/closeButton"};
        closeButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/closeButtonHover"};
        closeButtonButtonComponent.downTexture = {"key":"login","frame":"login-screen/closeButtonDown"};
        closeButtonButtonComponent.handCursor = true;

        // title (prefab fields)
        title.boxWidth = 1001.25;
        title.boxHeight = 117.225;

        // saveButton (components)
        const saveButtonButtonComponent = new ButtonComponent(saveButton);
        saveButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/saveButton"};
        saveButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/saveButtonHover"};
        saveButtonButtonComponent.handCursor = true;

        // saveLabel (prefab fields)
        saveLabel.boxWidth = 316.075;
        saveLabel.boxHeight = 120.825;
        saveLabel.horizontalAlign = 1;
        saveLabel.verticalAlign = 1;

        // dontSaveButton (components)
        const dontSaveButtonButtonComponent = new ButtonComponent(dontSaveButton);
        dontSaveButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/saveButton"};
        dontSaveButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/saveButtonHover"};
        dontSaveButtonButtonComponent.handCursor = true;

        // dontSaveLabel (prefab fields)
        dontSaveLabel.boxWidth = 310.5;
        dontSaveLabel.boxHeight = 120.825;
        dontSaveLabel.horizontalAlign = 1;
        dontSaveLabel.verticalAlign = 1;

        // learnButton (components)
        const learnButtonButtonComponent = new ButtonComponent(learnButton);
        learnButtonButtonComponent.upTexture = {"key":"login","frame":"login-screen/learnButton"};
        learnButtonButtonComponent.overTexture = {"key":"login","frame":"login-screen/learnButtonHover"};
        learnButtonButtonComponent.handCursor = true;

        // learnLabel (prefab fields)
        learnLabel.boxWidth = 215.4375;
        learnLabel.boxHeight = 67.95;
        learnLabel.horizontalAlign = 1;
        learnLabel.verticalAlign = 1;

        this.carousel = carousel;
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.closeButton = closeButton;
        this.title = title;
        this.saveButton = saveButton;
        this.saveLabel = saveLabel;
        this.dontSaveButton = dontSaveButton;
        this.dontSaveLabel = dontSaveLabel;
        this.learnButton = learnButton;
        this.learnLabel = learnLabel;

        /* START-USER-CTR-CODE */

        this.learnButton.on('release', () => window.location.href = __environment__.links.playerSafety);

        /* END-USER-CTR-CODE */
    }

    public carousel: Phaser.GameObjects.Image;
    public text1: TextBox;
    public text2: TextBox;
    public text3: TextBox;
    public closeButton: Phaser.GameObjects.Image;
    public title: TextBox;
    public saveButton: Phaser.GameObjects.Image;
    public saveLabel: TextBox;
    public dontSaveButton: Phaser.GameObjects.Image;
    public dontSaveLabel: TextBox;
    public learnButton: Phaser.GameObjects.Image;
    public learnLabel: TextBox;

    /* START-USER-CODE */

    localize(locale: Locale): void {
        this.title.text = locale.localize('save_password_warning_msg');
        this.text1.text = locale.localize('player_safety_lose_coins');
        this.text2.text = locale.localize('player_safety_changed_igloo');
        this.text3.text = locale.localize('player_safety_banned');
        this.saveLabel.text = locale.localize('save_password');
        this.dontSaveLabel.text = locale.localize('dont_save_password');
        this.learnLabel.text = locale.localize('learn_more');
    }

    public carouselEvent: Phaser.Time.TimerEvent;
    public carouselIndex: number = 0;

    startCarousel(): void {
        this.carouselIndex = 0;
        this.stepCarousel();

        if (!this.carouselEvent) {
            this.carouselEvent = this.scene.time.addEvent({
                delay: 3000,
                loop: true,
                callback: () => {
                    if (this.carouselIndex != 2) this.carouselIndex += 1;
                    else this.carouselIndex = 0;
                    this.stepCarousel();
                }
            });
        }
    }

    stepCarousel(): void {
        this.text1.visible = this.carouselIndex === 0;
        this.text2.visible = this.carouselIndex === 1;
        this.text3.visible = this.carouselIndex === 2;

        this.carousel.setFrame(`login-screen/carousel${this.carouselIndex}`);
    }

    stopCarousel(): void {
        this.carouselEvent.remove();
        this.carouselEvent = undefined;
    }

    close(): void {
        this.visible = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
