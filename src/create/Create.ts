/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../lib/ui/components/ButtonComponent";
import Paperdoll from "./prefabs/Paperdoll";
import ColorSelector from "./sections/ColorSelector";
import TextBox from "../lib/ui/TextBox";
import ChooseNameArea from "./sections/ChooseNameArea";
import PasswordArea from "./sections/PasswordArea";
import EmailArea from "./sections/EmailArea";
import CheckBoxTerms from "./sections/CheckBoxTerms";
import CheckBoxRules from "./sections/CheckBoxRules";
import PaperdollAlternate from "./prefabs/PaperdollAlternate";
import InputBlocker from "../lib/ui/components/InputBlocker";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import ErrorArea from "@clubpenguin/app/ErrorArea";
import { Locale } from "@clubpenguin/app/locale";
import ColorSwatch from '@clubpenguin/create/prefabs/ColorSwatch';
import Load from '@clubpenguin/load/Load';
import { LoaderTask } from '@clubpenguin/load/tasks';
import { CreateUserForm } from '@clubpenguin/net/types/api';
/* END-USER-IMPORTS */

export default class Create extends Phaser.Scene {

    constructor() {
        super("Create");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    editorPreload(): void {

        this.load.pack("create-pack", "assets/create/create-pack.json");
    }

    editorCreate(): void {

        // staticGraphics
        const staticGraphics = this.add.container(0, 0);

        // background
        const background = this.add.rectangle(0, 0, 1710, 1080);
        background.setOrigin(0, 0);
        background.isFilled = true;
        staticGraphics.add(background);

        // mainBackground
        const mainBackground = this.add.image(855, 0, "create", "create-module/mainBackgroundSignUp");
        mainBackground.setOrigin(0.5, 0);
        staticGraphics.add(mainBackground);

        // logo
        const logo = this.add.image(110.25, 13.5, "create", "create-module/logo");
        logo.setOrigin(0, 0);
        staticGraphics.add(logo);

        // signUpState
        const signUpState = this.add.container(0, 0);

        // paperdoll
        const paperdoll = new Paperdoll(this, 308.25, 225);
        signUpState.add(paperdoll);

        // colorSelector
        const colorSelector = new ColorSelector(this, 832.5, 94.5);
        signUpState.add(colorSelector);

        // nextButton
        const nextButton = this.add.image(1267.987548828125, 911.25, "create", "create-module/nextButton");
        nextButton.setOrigin(0, 0);
        signUpState.add(nextButton);

        // nextButtonLabelTextBox
        const nextButtonLabelTextBox = new TextBox(this, 1270.574951171875, 911.25, "BurbankSmallBold");
        nextButtonLabelTextBox.text = "Next";
        nextButtonLabelTextBox.fontSize = -33.75;
        nextButtonLabelTextBox.dropShadowX = 4.5;
        nextButtonLabelTextBox.dropShadowY = 4.5;
        nextButtonLabelTextBox.dropShadowAlpha = 0.61;
        nextButtonLabelTextBox.dropShadowColor = 13658;
        signUpState.add(nextButtonLabelTextBox);

        // create_module_nextButtonArrow
        const create_module_nextButtonArrow = this.add.image(1426.5, 929.0250244140625, "create", "create-module/nextButtonArrow");
        create_module_nextButtonArrow.setOrigin(0, 0);
        signUpState.add(create_module_nextButtonArrow);

        // chooseNameArea
        const chooseNameArea = new ChooseNameArea(this, 168.75, 787.5);
        signUpState.add(chooseNameArea);

        // passwordArea
        const passwordArea = new PasswordArea(this, 832.5, 330.75);
        signUpState.add(passwordArea);

        // emailArea
        const emailArea = new EmailArea(this, 832.5, 562.5);
        signUpState.add(emailArea);

        // termsArea
        const termsArea = new CheckBoxTerms(this, 933.75, 798.75);
        signUpState.add(termsArea);

        // rulesArea
        const rulesArea = new CheckBoxRules(this, 933.75, 855);
        signUpState.add(rulesArea);

        // confirmationState
        const confirmationState = this.add.container(0, 0);
        confirmationState.visible = false;

        // confirmationAsset
        const confirmationAsset = this.add.image(0, -10, "create", "create-module/confirmationAsset");
        confirmationAsset.setOrigin(-0.08983, -0.08507);
        confirmationState.add(confirmationAsset);

        // paperdollAlternate
        const paperdollAlternate = new PaperdollAlternate(this, 382.5, 220.5);
        confirmationState.add(paperdollAlternate);

        // envelope
        const envelope = this.add.image(312.75, 272.25, "create", "create-module/envelope");
        envelope.setOrigin(0, 0);
        confirmationState.add(envelope);

        // confirmationNameTextBox
        const confirmationNameTextBox = new TextBox(this, 407.25, 830.25, "BurbankSmallBold");
        confirmationNameTextBox.tintTopLeft = 2270451;
        confirmationNameTextBox.tintTopRight = 2270451;
        confirmationNameTextBox.tintBottomLeft = 2270451;
        confirmationNameTextBox.tintBottomRight = 2270451;
        confirmationNameTextBox.text = "BanduPengu12";
        confirmationNameTextBox.fontSize = -49.5;
        confirmationState.add(confirmationNameTextBox);

        // confirmationApprovedTextBox
        const confirmationApprovedTextBox = new TextBox(this, 141.75, 888.75, "BurbankSmallBold");
        confirmationApprovedTextBox.tintTopLeft = 3355443;
        confirmationApprovedTextBox.tintTopRight = 3355443;
        confirmationApprovedTextBox.tintBottomLeft = 3355443;
        confirmationApprovedTextBox.tintBottomRight = 3355443;
        confirmationApprovedTextBox.text = "Until it is checked, your penguin name will appear as numbers. Approved names are updated within 2 days.";
        confirmationApprovedTextBox.fontSize = -18;
        confirmationApprovedTextBox.maxWidth = 911.25;
        confirmationState.add(confirmationApprovedTextBox);

        // confirmationActivationTextBox
        const confirmationActivationTextBox = new TextBox(this, 110.25, 940.5, "BurbankSmallBold");
        confirmationActivationTextBox.tintTopLeft = 6381921;
        confirmationActivationTextBox.tintTopRight = 6381921;
        confirmationActivationTextBox.tintBottomLeft = 6381921;
        confirmationActivationTextBox.tintBottomRight = 6381921;
        confirmationActivationTextBox.text = "An activation email has been sent to:";
        confirmationActivationTextBox.fontSize = -22.5;
        confirmationActivationTextBox.maxWidth = 990;
        confirmationState.add(confirmationActivationTextBox);

        // confirmationEmailTextBox
        const confirmationEmailTextBox = new TextBox(this, 110.25, 963, "BurbankSmallBold");
        confirmationEmailTextBox.tintTopLeft = 6381921;
        confirmationEmailTextBox.tintTopRight = 6381921;
        confirmationEmailTextBox.tintBottomLeft = 6381921;
        confirmationEmailTextBox.tintBottomRight = 6381921;
        confirmationEmailTextBox.text = "parent@mail.com";
        confirmationEmailTextBox.fontSize = -22.5;
        confirmationEmailTextBox.maxWidth = 990;
        confirmationState.add(confirmationEmailTextBox);

        // confirmationBubbleTextBox
        const confirmationBubbleTextBox = new TextBox(this, 713.25, 180, "BurbankSmallBold");
        confirmationBubbleTextBox.tintTopLeft = 3223857;
        confirmationBubbleTextBox.tintTopRight = 3223857;
        confirmationBubbleTextBox.tintBottomLeft = 3223857;
        confirmationBubbleTextBox.tintBottomRight = 3223857;
        confirmationBubbleTextBox.text = "Ask your parent to check their email to play.";
        confirmationBubbleTextBox.fontSize = -31.5;
        confirmationBubbleTextBox.maxWidth = 315;
        confirmationState.add(confirmationBubbleTextBox);

        // member
        const member = this.add.container(1129.5, 150.75);
        confirmationState.add(member);

        // memberBadge
        const memberBadge = this.add.image(107.8875, 12.825, "create", "create-module/badge0001");
        memberBadge.setOrigin(0, 0);
        member.add(memberBadge);

        // memberTtitleTextBox
        const memberTtitleTextBox = new TextBox(this, -20.25, 193.725, "BurbankSmallBold");
        memberTtitleTextBox.tintTopLeft = 164045;
        memberTtitleTextBox.tintTopRight = 164045;
        memberTtitleTextBox.tintBottomLeft = 164045;
        memberTtitleTextBox.tintBottomRight = 164045;
        memberTtitleTextBox.text = "Members can:";
        memberTtitleTextBox.fontSize = -38;
        member.add(memberTtitleTextBox);

        // heading1TextBox
        const heading1TextBox = new TextBox(this, -20.25, 276.6375, "BurbankSmallBold");
        heading1TextBox.tintTopLeft = 6381921;
        heading1TextBox.tintTopRight = 6381921;
        heading1TextBox.tintBottomLeft = 6381921;
        heading1TextBox.tintBottomRight = 6381921;
        heading1TextBox.text = "Play games";
        heading1TextBox.fontSize = -26.25;
        heading1TextBox.maxWidth = 459;
        member.add(heading1TextBox);

        // body1TextBox
        const body1TextBox = new TextBox(this, -20.25, 306.9, "BurbankSmallMedium");
        body1TextBox.tintTopLeft = 6381921;
        body1TextBox.tintTopRight = 6381921;
        body1TextBox.tintBottomLeft = 6381921;
        body1TextBox.tintBottomRight = 6381921;
        body1TextBox.text = "access all game levels";
        body1TextBox.fontSize = -26.25;
        body1TextBox.maxWidth = 459;
        member.add(body1TextBox);

        // heading2TextBox
        const heading2TextBox = new TextBox(this, -20.25, 353.5875, "BurbankSmallBold");
        heading2TextBox.tintTopLeft = 6381921;
        heading2TextBox.tintTopRight = 6381921;
        heading2TextBox.tintBottomLeft = 6381921;
        heading2TextBox.tintBottomRight = 6381921;
        heading2TextBox.text = "Adopt pets";
        heading2TextBox.fontSize = -26.25;
        heading2TextBox.maxWidth = 459;
        member.add(heading2TextBox);

        // body2TextBox
        const body2TextBox = new TextBox(this, -20.25, 382.725, "BurbankSmallMedium");
        body2TextBox.tintTopLeft = 6381921;
        body2TextBox.tintTopRight = 6381921;
        body2TextBox.tintBottomLeft = 6381921;
        body2TextBox.tintBottomRight = 6381921;
        body2TextBox.text = "adopt up to 20 pet puffles";
        body2TextBox.fontSize = -26.25;
        body2TextBox.maxWidth = 459;
        member.add(body2TextBox);

        // heading3TextBox
        const heading3TextBox = new TextBox(this, -20.1375, 458.4375, "BurbankSmallBold");
        heading3TextBox.tintTopLeft = 6381921;
        heading3TextBox.tintTopRight = 6381921;
        heading3TextBox.tintBottomLeft = 6381921;
        heading3TextBox.tintBottomRight = 6381921;
        heading3TextBox.text = "Decorate your igloo";
        heading3TextBox.fontSize = -26.25;
        heading3TextBox.maxWidth = 459;
        member.add(heading3TextBox);

        // body3TextBox
        const body3TextBox = new TextBox(this, -20.1375, 488.475, "BurbankSmallMedium");
        body3TextBox.tintTopLeft = 6381921;
        body3TextBox.tintTopRight = 6381921;
        body3TextBox.tintBottomLeft = 6381921;
        body3TextBox.tintBottomRight = 6381921;
        body3TextBox.text = "invite your friends for a party";
        body3TextBox.fontSize = -26.25;
        body3TextBox.maxWidth = 459;
        member.add(body3TextBox);

        // heading4TextBox
        const heading4TextBox = new TextBox(this, -20.1375, 534.9375, "BurbankSmallBold");
        heading4TextBox.tintTopLeft = 6381921;
        heading4TextBox.tintTopRight = 6381921;
        heading4TextBox.tintBottomLeft = 6381921;
        heading4TextBox.tintBottomRight = 6381921;
        heading4TextBox.text = "Dress up";
        heading4TextBox.fontSize = -26.25;
        heading4TextBox.maxWidth = 459;
        member.add(heading4TextBox);

        // body4TextBox
        const body4TextBox = new TextBox(this, -20.1375, 565.2, "BurbankSmallMedium");
        body4TextBox.tintTopLeft = 6381921;
        body4TextBox.tintTopRight = 6381921;
        body4TextBox.tintBottomLeft = 6381921;
        body4TextBox.tintBottomRight = 6381921;
        body4TextBox.text = "buy exclusive clothing";
        body4TextBox.fontSize = -26.25;
        body4TextBox.maxWidth = 459;
        member.add(body4TextBox);

        // memberButton
        const memberButton = this.add.image(13.3875, 695.7, "create", "create-module/memberButton");
        memberButton.setOrigin(0, 0);
        member.add(memberButton);

        // memberButtonTextBox
        const memberButtonTextBox = new TextBox(this, 13.3875, 695.7, "BurbankSmallBold");
        memberButtonTextBox.tintTopLeft = 6434816;
        memberButtonTextBox.tintTopRight = 6434816;
        memberButtonTextBox.tintBottomLeft = 6434816;
        memberButtonTextBox.tintBottomRight = 6434816;
        memberButtonTextBox.text = "Learn More About Membership";
        memberButtonTextBox.fontSize = -29.25;
        memberButtonTextBox.maxWidth = 390;
        memberButtonTextBox.dropShadowX = 0;
        memberButtonTextBox.dropShadowY = 1;
        memberButtonTextBox.dropShadowAlpha = 0.6;
        memberButtonTextBox.dropShadowColor = 16777215;
        member.add(memberButtonTextBox);

        // preloader
        const preloader = this.add.container(0, 0);
        preloader.visible = false;

        // cover
        const cover = this.add.rectangle(0, 0, 1710, 1080);
        cover.setOrigin(0, 0);
        cover.isFilled = true;
        cover.fillColor = 0;
        cover.fillAlpha = 0.52;
        preloader.add(cover);

        // spinner
        const spinner = this.add.sprite(812, 497, "create", "create-module/spinner0001");
        spinner.setOrigin(0, 0);
        preloader.add(spinner);

        // logo (components)
        const logoButtonComponent = new ButtonComponent(logo);
        logoButtonComponent.handCursor = true;

        // nextButton (components)
        const nextButtonButtonComponent = new ButtonComponent(nextButton);
        nextButtonButtonComponent.upTexture = {"key":"create","frame":"create-module/nextButton"};
        nextButtonButtonComponent.overTexture = {"key":"create","frame":"create-module/nextButtonHover"};
        nextButtonButtonComponent.handCursor = true;

        // nextButtonLabelTextBox (prefab fields)
        nextButtonLabelTextBox.boxWidth = 202.275;
        nextButtonLabelTextBox.boxHeight = 69;
        nextButtonLabelTextBox.horizontalAlign = 1;
        nextButtonLabelTextBox.verticalAlign = 1;

        // confirmationNameTextBox (prefab fields)
        confirmationNameTextBox.boxWidth = 393.75;
        confirmationNameTextBox.boxHeight = 90;
        confirmationNameTextBox.horizontalAlign = 1;

        // confirmationApprovedTextBox (prefab fields)
        confirmationApprovedTextBox.boxWidth = 911.25;
        confirmationApprovedTextBox.boxHeight = 117;
        confirmationApprovedTextBox.horizontalAlign = 1;

        // confirmationActivationTextBox (prefab fields)
        confirmationActivationTextBox.boxWidth = 990;
        confirmationActivationTextBox.boxHeight = 117;
        confirmationActivationTextBox.horizontalAlign = 1;

        // confirmationEmailTextBox (prefab fields)
        confirmationEmailTextBox.boxWidth = 990;
        confirmationEmailTextBox.boxHeight = 112.5;
        confirmationEmailTextBox.horizontalAlign = 1;

        // confirmationBubbleTextBox (prefab fields)
        confirmationBubbleTextBox.boxWidth = 315;
        confirmationBubbleTextBox.boxHeight = 225;
        confirmationBubbleTextBox.horizontalAlign = 1;

        // memberTtitleTextBox (prefab fields)
        memberTtitleTextBox.boxWidth = 459.5625;
        memberTtitleTextBox.boxHeight = 47.5875;
        memberTtitleTextBox.horizontalAlign = 1;

        // heading1TextBox (prefab fields)
        heading1TextBox.boxWidth = 459;
        heading1TextBox.boxHeight = 48.375;
        heading1TextBox.horizontalAlign = 1;

        // body1TextBox (prefab fields)
        body1TextBox.boxWidth = 459;
        body1TextBox.boxHeight = 48.375;
        body1TextBox.horizontalAlign = 1;

        // heading2TextBox (prefab fields)
        heading2TextBox.boxWidth = 459;
        heading2TextBox.boxHeight = 48.375;
        heading2TextBox.horizontalAlign = 1;

        // body2TextBox (prefab fields)
        body2TextBox.boxWidth = 459;
        body2TextBox.boxHeight = 48.375;
        body2TextBox.horizontalAlign = 1;

        // heading3TextBox (prefab fields)
        heading3TextBox.boxWidth = 459;
        heading3TextBox.boxHeight = 48.375;
        heading3TextBox.horizontalAlign = 1;

        // body3TextBox (prefab fields)
        body3TextBox.boxWidth = 459;
        body3TextBox.boxHeight = 48.375;
        body3TextBox.horizontalAlign = 1;

        // heading4TextBox (prefab fields)
        heading4TextBox.boxWidth = 459;
        heading4TextBox.boxHeight = 48.375;
        heading4TextBox.horizontalAlign = 1;

        // body4TextBox (prefab fields)
        body4TextBox.boxWidth = 459;
        body4TextBox.boxHeight = 48.375;
        body4TextBox.horizontalAlign = 1;

        // memberButton (components)
        const memberButtonButtonComponent = new ButtonComponent(memberButton);
        memberButtonButtonComponent.upTexture = {"key":"create","frame":"create-module/memberButton"};
        memberButtonButtonComponent.overTexture = {"key":"create","frame":"create-module/memberButtonHover"};
        memberButtonButtonComponent.handCursor = true;

        // memberButtonTextBox (prefab fields)
        memberButtonTextBox.boxWidth = 390;
        memberButtonTextBox.boxHeight = 86;
        memberButtonTextBox.horizontalAlign = 1;
        memberButtonTextBox.verticalAlign = 1;

        // cover (components)
        new InputBlocker(cover);

        this.background = background;
        this.mainBackground = mainBackground;
        this.logo = logo;
        this.staticGraphics = staticGraphics;
        this.paperdoll = paperdoll;
        this.colorSelector = colorSelector;
        this.nextButton = nextButton;
        this.nextButtonLabelTextBox = nextButtonLabelTextBox;
        this.chooseNameArea = chooseNameArea;
        this.passwordArea = passwordArea;
        this.emailArea = emailArea;
        this.termsArea = termsArea;
        this.rulesArea = rulesArea;
        this.signUpState = signUpState;
        this.paperdollAlternate = paperdollAlternate;
        this.confirmationNameTextBox = confirmationNameTextBox;
        this.confirmationApprovedTextBox = confirmationApprovedTextBox;
        this.confirmationActivationTextBox = confirmationActivationTextBox;
        this.confirmationEmailTextBox = confirmationEmailTextBox;
        this.confirmationBubbleTextBox = confirmationBubbleTextBox;
        this.memberBadge = memberBadge;
        this.memberTtitleTextBox = memberTtitleTextBox;
        this.heading1TextBox = heading1TextBox;
        this.body1TextBox = body1TextBox;
        this.heading2TextBox = heading2TextBox;
        this.body2TextBox = body2TextBox;
        this.heading3TextBox = heading3TextBox;
        this.body3TextBox = body3TextBox;
        this.heading4TextBox = heading4TextBox;
        this.body4TextBox = body4TextBox;
        this.memberButton = memberButton;
        this.memberButtonTextBox = memberButtonTextBox;
        this.member = member;
        this.confirmationState = confirmationState;
        this.spinner = spinner;
        this.preloader = preloader;

        this.events.emit("scene-awake");
    }

    public background!: Phaser.GameObjects.Rectangle;
    public mainBackground!: Phaser.GameObjects.Image;
    public logo!: Phaser.GameObjects.Image;
    public staticGraphics!: Phaser.GameObjects.Container;
    public paperdoll!: Paperdoll;
    public colorSelector!: ColorSelector;
    public nextButton!: Phaser.GameObjects.Image;
    public nextButtonLabelTextBox!: TextBox;
    public chooseNameArea!: ChooseNameArea;
    public passwordArea!: PasswordArea;
    public emailArea!: EmailArea;
    public termsArea!: CheckBoxTerms;
    public rulesArea!: CheckBoxRules;
    public signUpState!: Phaser.GameObjects.Container;
    public paperdollAlternate!: PaperdollAlternate;
    public confirmationNameTextBox!: TextBox;
    public confirmationApprovedTextBox!: TextBox;
    public confirmationActivationTextBox!: TextBox;
    public confirmationEmailTextBox!: TextBox;
    public confirmationBubbleTextBox!: TextBox;
    public memberBadge!: Phaser.GameObjects.Image;
    public memberTtitleTextBox!: TextBox;
    public heading1TextBox!: TextBox;
    public body1TextBox!: TextBox;
    public heading2TextBox!: TextBox;
    public body2TextBox!: TextBox;
    public heading3TextBox!: TextBox;
    public body3TextBox!: TextBox;
    public heading4TextBox!: TextBox;
    public body4TextBox!: TextBox;
    public memberButton!: Phaser.GameObjects.Image;
    public memberButtonTextBox!: TextBox;
    public member!: Phaser.GameObjects.Container;
    public confirmationState!: Phaser.GameObjects.Container;
    public spinner!: Phaser.GameObjects.Sprite;
    public preloader!: Phaser.GameObjects.Container;

    /* START-USER-CODE */

    declare public game: App;

    init(): void {
        let load = this.scene.get('Load') as Load;

        load.track(new LoaderTask(this.load));
        if (!load.isShowing) load.show();
    }

    preload(): void {
        this.editorPreload();
    }

    public brandingContainer: Phaser.GameObjects.DOMElement;
    public initialState: Phaser.GameObjects.Container;

    create(): void {

        this.editorCreate();

        this.spinner.play('create-spinner-animation');

        this.initialState = this.signUpState;

        this.logo.on('release', () => this.goToStart());

        this.nextButton.on('release', () => this.post());

        this.colorSelector.on('swatchselect', (swatch: ColorSwatch) => {
            this.paperdoll.setColor(swatch.color);
        });

        this.game.locale.register(this.localize, this);
        this.events.on('shutdown', () => {
            if (window.jsAPI) window.jsAPI.showNav();

            this.game.locale.unregister(this.localize);
            this.game.unloadAssetPack('create-pack');
        });

        if (window.jsAPI) window.jsAPI.hideNav();

        this.brandingContainer = this.game.fixDomGO(this.add.dom(
            0, 0, 'div',
            `bottom: 0; right: 0;`,
        ));
        this.brandingContainer.visible = false;
        this.brandingContainer.setOrigin(0, 0);
        this.brandingContainer.setHTML(
            'This site is protected by reCAPTCHA and the Google ' +
            '<a href="https://policies.google.com/privacy">Privacy Policy</a> and ' +
            '<a href="https://policies.google.com/terms">Terms of Service</a> apply.'
        );

        grecaptcha.ready(() => {
            let load = this.scene.get('Load') as Load;
            if (load.isShowing) load.waitAllTasksComplete().then(() => load.hide());

            this.show(this.initialState);

            this.tweens.add({
                targets: [this.staticGraphics, this.initialState],
                alpha: { from: 0, to: 1 },
                ease: 'Linear',
                duration: 200
            });
        });
    }

    localize(locale: Locale): void {
        this.nextButtonLabelTextBox.text = locale.localize('next_button', 'create_module');
        this.chooseNameArea.localize(locale);
        this.colorSelector.localize(locale);
        this.passwordArea.localize(locale);
        this.emailArea.localize(locale);
        this.termsArea.localize(locale);
        this.rulesArea.localize(locale);
        this.confirmationBubbleTextBox.text = locale.localize('confirmation_bubble', 'create_module');
        this.confirmationActivationTextBox.text = locale.localize('confirmation_email', 'create_module');
        this.confirmationApprovedTextBox.text = locale.localize('confirmation_approval', 'create_module');
        this.memberTtitleTextBox.text = locale.localize('confirmation_memberperk1', 'create_module');
        this.heading1TextBox.text = locale.localize('confirmation_memberperk2', 'create_module');
        this.body1TextBox.text = locale.localize('confirmation_memberperk3', 'create_module');
        this.heading2TextBox.text = locale.localize('confirmation_memberperk4', 'create_module');
        this.body2TextBox.text = locale.localize('confirmation_memberperk5', 'create_module');
        this.heading3TextBox.text = locale.localize('confirmation_memberperk6', 'create_module');
        this.body3TextBox.text = locale.localize('confirmation_memberperk7', 'create_module');
        this.heading4TextBox.text = locale.localize('confirmation_memberperk8', 'create_module');
        this.body4TextBox.text = locale.localize('confirmation_memberperk9', 'create_module');
        this.memberButtonTextBox.text = locale.localize('confirmation_learn_member', 'create_module');
    }

    show(container: Phaser.GameObjects.Container): void {
        if (container === this.confirmationState) {
            this.brandingContainer.visible = false;
            this.signUpState.visible = false;
            this.confirmationState.visible = true;

            this.lock();

            this.confirmationNameTextBox.text = this.chooseNameArea.textField.value;
            this.confirmationEmailTextBox.text = this.emailArea.textField.value;

            this.paperdollAlternate.contentFill.setTintFill(this.colorSelector.selected.color);

            this.mainBackground.setFrame("create-module/mainBackgroundConfirmation");
        } else {
            this.brandingContainer.visible = true;
            this.signUpState.visible = true;
            this.confirmationState.visible = false;

            this.unlock();

            this.paperdoll.contentFill.setTintFill(this.colorSelector.selected.color);

            this.mainBackground.setFrame("create-module/mainBackgroundSignUp");
        }
    }

    lock(): void {
        this.chooseNameArea.textField.locked = true;
        this.passwordArea.textField1.locked = true;
        this.passwordArea.textField2.locked = true;
        this.emailArea.textField.locked = true;
    }

    unlock(): void {
        this.chooseNameArea.textField.locked = false;
        this.passwordArea.textField1.locked = false;
        this.passwordArea.textField2.locked = false;
        this.emailArea.textField.locked = false;
    }

    async getFormData(token: string): Promise<CreateUserForm> {
        return {
            name: this.chooseNameArea.textField.value,
            color: this.colorSelector.selected.colorId,
            password: this.passwordArea.textField1.value,
            email: this.emailArea.textField.value,
            token
        };
    }

    async post(): Promise<void> {
        this.lock();

        let hasErrors = false;

        if (this.chooseNameArea.textField.value.length == 0) {
            hasErrors = true;
            this.chooseNameArea.showError(this.game.locale.localize('create.NO_USERNAME', 'error_lang'));
        }

        if (this.passwordArea.textField1.value.length == 0) {
            hasErrors = true;
            this.passwordArea.showError(this.game.locale.localize('create.NO_PASSWORD', 'error_lang'));
        } else if (this.passwordArea.textField2.value.length == 0) {
            hasErrors = true;
            this.passwordArea.showError(this.game.locale.localize('create.NO_REPEAT_PASSWORD', 'error_lang'));
        } else if (this.passwordArea.textField1.value != this.passwordArea.textField2.value) {
            hasErrors = true;
            this.passwordArea.showError(this.game.locale.localize('create.PASSWORD_MISMATCH', 'error_lang'));
        }

        if (this.emailArea.textField.value.length == 0) {
            hasErrors = true;
            this.emailArea.showError(this.game.locale.localize('create.NO_EMAIL', 'error_lang'));
        }

        if (!this.termsArea.checkbox.flag) {
            hasErrors = true;
            this.termsArea.showError(this.game.locale.localize('create.NOT_AGREED_TERMS', 'error_lang'));
        }

        if (!this.rulesArea.checkbox.flag) {
            hasErrors = true;
            this.rulesArea.showError(this.game.locale.localize('create.NOT_AGREED_RULES', 'error_lang'));
        }

        if (hasErrors) return this.unlock();

        this.preloader.visible = true;

        try {
            let token = await grecaptcha.execute(__webpack_options__.RECAPTCHA_SITE_KEY, { action: 'register' });
            var response = await this.game.airtower.createAccount(await this.getFormData(token));
        } catch (e) {
            if (e.data?.error) {
                for (let error in e.data?.error) {
                    let err: { type: string, loc: string[], msg: string } = e.data?.error[error];
                    for (let loc of err.loc) {
                        switch (loc) {
                            case 'name':
                                this.chooseNameArea.showError(err.msg);
                                break;
                            case 'password':
                                this.passwordArea.showError(err.msg);
                                break;
                            case 'email':
                                this.emailArea.showError(err.msg);
                                break;
                            case 'body':
                                // Root loc
                                break;
                            default:
                                console.warn('Unknown error location!', err.type, err.msg);
                                break;
                        }
                    }
                }

                this.preloader.visible = false;
                this.unlock();
                return;
            }

            let error = this.scene.get('ErrorArea') as ErrorArea;
            error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.DEFAULT_ERROR', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.preloader.visible = false;
                this.unlock();
                return true;
            }, error.makeCode('c', error.DEFAULT_ERROR));

            throw e;
        }

        console.debug(response);

        if (response.data?.user_id) this.show(this.confirmationState);
        else {
            let error = this.scene.get('ErrorArea') as ErrorArea;
            error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.DEFAULT_ERROR', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.preloader.visible = false;
                this.unlock();
                return true;
            }, error.makeCode('c', error.DEFAULT_ERROR));
        }

        this.preloader.visible = false;
    }

    goToStart(): void {
        this.scene.start('Startscreen');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
