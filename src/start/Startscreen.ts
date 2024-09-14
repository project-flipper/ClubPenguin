/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../lib/ui/components/InputBlocker";
import ButtonComponent from "../lib/ui/components/ButtonComponent";
import TextBox from "../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { Language, Locale } from "@clubpenguin/app/locale";
import { App } from "@clubpenguin/app/app";
import { BaseBillboard } from "@clubpenguin/start/billboard/Billboard";
/* END-USER-IMPORTS */

export default class Startscreen extends Phaser.Scene {

    constructor() {
        super("Startscreen");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("start-pack", "assets/start/start-pack.json");
    }

    editorCreate(): void {

        // background
        const background = this.add.image(0, 0, "club_penguin");
        background.setOrigin(0, 0);

        // billboardContainer
        const billboardContainer = this.add.container(157.5, 28.125);

        // startscreen
        const startscreen = this.add.container(0, 0);

        // backingGraphic
        const backingGraphic = this.add.rectangle(990, 645.75, 562.5, 112.5);
        backingGraphic.setOrigin(0, 0);
        backingGraphic.isFilled = true;
        backingGraphic.fillAlpha = 0.45;
        startscreen.add(backingGraphic);

        // module
        const module = this.add.image(855, 650.9250000000001, "start", "start-screen/module");
        module.setOrigin(0.5, 0);
        startscreen.add(module);

        // createAccountGraphic
        const createAccountGraphic = this.add.image(225, 808.425, "start", "start-screen/createPenguinGraphic0001");
        createAccountGraphic.setOrigin(0, 0);
        startscreen.add(createAccountGraphic);

        // createAccountButton
        const createAccountButton = this.add.image(405, 888.75, "start", "start-screen/mainButton");
        createAccountButton.setOrigin(0, 0);
        startscreen.add(createAccountButton);

        // createPenguinTextBox
        const createPenguinTextBox = new TextBox(this, 405, 888.75, "BurbankSmallBold");
        createPenguinTextBox.text = "Create a Penguin";
        createPenguinTextBox.fontSize = -40;
        startscreen.add(createPenguinTextBox);

        // loginButton
        const loginButton = this.add.image(922.5, 888.75, "start", "start-screen/mainButton");
        loginButton.setOrigin(0, 0);
        startscreen.add(loginButton);

        // loginTextBox
        const loginTextBox = new TextBox(this, 922.5, 888.75, "BurbankSmallBold");
        loginTextBox.text = "Login";
        loginTextBox.fontSize = -45;
        startscreen.add(loginTextBox);

        // loginButtonGraphic
        const loginButtonGraphic = this.add.image(1285.0875, 798.75, "start", "start-screen/loginGraphic0001");
        loginButtonGraphic.setOrigin(0, 0);
        startscreen.add(loginButtonGraphic);

        // logo
        const logo = this.add.image(855, 686.25, "start", "start-screen/logo");
        logo.setOrigin(0.5, 0);
        startscreen.add(logo);

        // memberButton
        const memberButton = this.add.image(1113.75, 654.75, "start", "start-screen/memberButton");
        memberButton.setOrigin(0, 0);
        startscreen.add(memberButton);

        // membershipTextBox
        const membershipTextBox = new TextBox(this, 1185.75, 654.75, "BurbankSmallBold");
        membershipTextBox.tintFill = false;
        membershipTextBox.tintTopLeft = 21147;
        membershipTextBox.tintTopRight = 21147;
        membershipTextBox.tintBottomLeft = 21147;
        membershipTextBox.tintBottomRight = 21147;
        membershipTextBox.text = "Learn More About Membership";
        membershipTextBox.fontSize = -18;
        startscreen.add(membershipTextBox);

        // memberBadge
        const memberBadge = this.add.image(1120.5, 664.75, "start", "start-screen/memberBadge0001");
        memberBadge.setOrigin(0, 0);
        startscreen.add(memberBadge);

        // fadebg
        const fadebg = this.add.image(0, 0, "club_penguin");
        fadebg.setOrigin(0, 0);

        // background (components)
        new InputBlocker(background);

        // createAccountButton (components)
        const createAccountButtonButtonComponent = new ButtonComponent(createAccountButton);
        createAccountButtonButtonComponent.upTexture = {"key":"start","frame":"start-screen/mainButton"};
        createAccountButtonButtonComponent.overTexture = {"key":"start","frame":"start-screen/mainButtonHover"};
        createAccountButtonButtonComponent.handCursor = true;

        // createPenguinTextBox (prefab fields)
        createPenguinTextBox.boxWidth = 396;
        createPenguinTextBox.boxHeight = 103;
        createPenguinTextBox.horizontalAlign = 1;
        createPenguinTextBox.verticalAlign = 1;

        // loginButton (components)
        const loginButtonButtonComponent = new ButtonComponent(loginButton);
        loginButtonButtonComponent.upTexture = {"key":"start","frame":"start-screen/mainButton"};
        loginButtonButtonComponent.overTexture = {"key":"start","frame":"start-screen/mainButtonHover"};
        loginButtonButtonComponent.handCursor = true;

        // loginTextBox (prefab fields)
        loginTextBox.boxWidth = 396;
        loginTextBox.boxHeight = 103;
        loginTextBox.horizontalAlign = 1;
        loginTextBox.verticalAlign = 1;

        // logo (components)
        const logoButtonComponent = new ButtonComponent(logo);
        logoButtonComponent.handCursor = true;

        // memberButton (components)
        const memberButtonButtonComponent = new ButtonComponent(memberButton);
        memberButtonButtonComponent.upTexture = {"key":"start","frame":"start-screen/memberButton"};
        memberButtonButtonComponent.overTexture = {"key":"start","frame":"start-screen/memberButtonHover"};
        memberButtonButtonComponent.handCursor = true;

        // membershipTextBox (prefab fields)
        membershipTextBox.boxWidth = 315;
        membershipTextBox.boxHeight = 73;
        membershipTextBox.horizontalAlign = 1;
        membershipTextBox.verticalAlign = 1;

        // fadebg (components)
        new InputBlocker(fadebg);

        this.billboardContainer = billboardContainer;
        this.createAccountGraphic = createAccountGraphic;
        this.createAccountButton = createAccountButton;
        this.createPenguinTextBox = createPenguinTextBox;
        this.loginButton = loginButton;
        this.loginTextBox = loginTextBox;
        this.loginButtonGraphic = loginButtonGraphic;
        this.logo = logo;
        this.memberButton = memberButton;
        this.membershipTextBox = membershipTextBox;
        this.memberBadge = memberBadge;
        this.startscreen = startscreen;
        this.fadebg = fadebg;

        this.events.emit("scene-awake");
    }

    public billboardContainer!: Phaser.GameObjects.Container;
    public createAccountGraphic!: Phaser.GameObjects.Image;
    public createAccountButton!: Phaser.GameObjects.Image;
    public createPenguinTextBox!: TextBox;
    public loginButton!: Phaser.GameObjects.Image;
    public loginTextBox!: TextBox;
    public loginButtonGraphic!: Phaser.GameObjects.Image;
    public logo!: Phaser.GameObjects.Image;
    public memberButton!: Phaser.GameObjects.Image;
    public membershipTextBox!: TextBox;
    public memberBadge!: Phaser.GameObjects.Image;
    public startscreen!: Phaser.GameObjects.Container;
    public fadebg!: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare game: App;
    public billboard: BaseBillboard;

    init(): void {
        let load = this.scene.get('Load') as Load;

        load.track(new LoaderTask('Startscreen loader', this.load));
        if (!load.isShowing) load.show();
    }

    create(): void {

        this.editorCreate();

        this.logo.on('out', () => { });
        this.logo.on('over', () => { });
        this.logo.on('release', this.goToHome, this);

        this.memberButton.on('release', this.goToMember, this);

        this.createAccountButton.on('out', () => this.createAccountGraphic.setFrame("start-screen/createPenguinGraphic0001"));
        this.createAccountButton.on('over', () => this.createAccountGraphic.setFrame("start-screen/createPenguinGraphic0002"));
        this.createAccountButton.on('release', this.goToCreate, this);

        this.loginButton.on('out', () => this.loginButtonGraphic.setFrame("start-screen/loginGraphic0001"));
        this.loginButton.on('over', () => this.loginButtonGraphic.setFrame("start-screen/loginGraphic0002"));
        this.loginButton.on('release', this.goToLogin, this);

        this.loadContent();
    }

    async loadContent(): Promise<void> {
        let load = this.scene.get('Load') as Load;
        if (!load.isShowing) load.show();

        try {
            let billboardCls = (await import('@clubpenguin/start/billboard/Billboard')).default(this);
            let task = load.track(new LoaderTask('Billboard loader', this.load));
            billboardCls.preload(this.load);
            this.load.start();

            await task.wait();

            let billboard = new billboardCls(this, 0, 0);
            this.billboardContainer.add(billboard);

            this.billboard = billboard;
        } catch (e) {
            console.error('Billboard failed to load', e)
        }

        this.game.locale.register(this.localize, this);
        this.events.on('shutdown', () => {
            this.game.locale.unregister(this.localize);
            if (this.billboard) this.billboard.unload(this.game);
            this.game.unloadAssetPack('start-pack');
        });

        load.hide();

        this.tweens.add({
            targets: this.fadebg,
            alpha: { from: 1, to: 0 },
            ease: 'Linear',
            duration: 200
        });
    }

    localize(locale: Locale): void {
        this.memberBadge.setFrame(`start-screen/memberBadge${locale.frame}`);
        this.membershipTextBox.text = locale.localize('membership_button', 'start_module');
        this.loginTextBox.text = locale.localize('start_button', 'start_module');
        this.createPenguinTextBox.text = locale.localize('create_button', 'start_module');

        if (locale.language == Language.RU) this.logo.setFrame('start-screen/logoRu');
        else this.logo.setFrame('start-screen/logo');

        if (this.billboard) this.billboard.localize(locale);
    }

    goToHome(): void {

    }

    goToMember(): void {

    }

    goToCreate(): void {
        this.scene.start('Create');
    }

    goToLogin(): void {
        this.scene.start('Login');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
