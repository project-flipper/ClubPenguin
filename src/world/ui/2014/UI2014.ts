
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/components/InputBlocker";
import ButtonComponent from "../../../lib/components/ButtonComponent";
import TextField from "../../../lib/ui/TextField";
import EmoteMenu from "./prefabs/EmoteMenu";
import ActionsMenu from "./prefabs/ActionsMenu";
import Namecard from "./prefabs/Namecard";
import PlayerNamecard from "./prefabs/PlayerNamecard";
/* START-USER-IMPORTS */
import Interface, { UI } from "../../interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import { AnyUserData, UserData } from "@clubpenguin/net/types/user";
/* END-USER-IMPORTS */

export default class UI2014 extends Phaser.GameObjects.Layer implements UI {

    constructor(scene: Phaser.Scene) {
        super(scene);

        // dock
        const dock = scene.add.image(211.5, 978.75, "ui-2014", "2014/dock");
        dock.setOrigin(0, 0);
        this.add(dock);

        // chatLog
        const chatLog = scene.add.container(855, -4.5);
        this.add(chatLog);

        // ui2014_messagesTabBody
        const ui2014_messagesTabBody = scene.add.image(0, 9, "ui-2014", "2014/messagesTabBody");
        ui2014_messagesTabBody.setOrigin(0.5, 1);
        ui2014_messagesTabBody.visible = false;
        chatLog.add(ui2014_messagesTabBody);

        // ui2014_messagesTab
        const ui2014_messagesTab = scene.add.image(0, 0, "ui-2014", "2014/messagesTab");
        ui2014_messagesTab.setOrigin(0.5, 0);
        chatLog.add(ui2014_messagesTab);

        // ui2014_messagesTabArrow0001
        const ui2014_messagesTabArrow0001 = scene.add.image(0, 18, "ui-2014", "2014/messagesTabArrow0001");
        chatLog.add(ui2014_messagesTabArrow0001);

        // puffleButton
        const puffleButton = scene.add.image(277.20001220703125, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(puffleButton);

        // emojiButton
        const emojiButton = scene.add.image(344.70001220703125, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(emojiButton);

        // actionButton
        const actionButton = scene.add.image(412.20001220703125, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(actionButton);

        // snowballButton
        const snowballButton = scene.add.image(479.70001220703125, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(snowballButton);

        // chatBg
        const chatBg = scene.add.image(521.5499877929688, 1007.4375, "ui-2014", "2014/chatBg");
        chatBg.setOrigin(0, 0);
        this.add(chatBg);

        // chat
        const chat = new TextField(scene, 590.4500122070312, 1020.5999755859375);
        this.add(chat);

        // chatButton
        const chatButton = scene.add.image(547.2000122070312, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(chatButton);

        // sendButton
        const sendButton = scene.add.image(1154.699951171875, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(sendButton);

        // playerButton
        const playerButton = scene.add.image(1222.199951171875, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(playerButton);

        // friendsButton
        const friendsButton = scene.add.image(1289.8125, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(friendsButton);

        // iglooButton
        const iglooButton = scene.add.image(1357.199951171875, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(iglooButton);

        // settingsButton
        const settingsButton = scene.add.image(1424.699951171875, 1037.925048828125, "ui-2014", "2014/dockButton0001");
        this.add(settingsButton);

        // puffleButtonIcon
        const puffleButtonIcon = scene.add.image(276.5249938964844, 1035.675048828125, "ui-2014", "2014/puffleButtonIcon0001");
        this.add(puffleButtonIcon);

        // emojiIcon
        const emojiIcon = scene.add.image(344.25, 1035.9000244140625, "ui-2014", "2014/emojiIcon");
        this.add(emojiIcon);

        // actionIcon
        const actionIcon = scene.add.image(410.17498779296875, 1033.987548828125, "ui-2014", "2014/actionIcon");
        this.add(actionIcon);

        // snowballIcon
        const snowballIcon = scene.add.image(479.4750061035156, 1035.449951171875, "ui-2014", "2014/snowballIcon");
        this.add(snowballIcon);

        // chatIcon
        const chatIcon = scene.add.image(547.2000122070312, 1037.925048828125, "ui-2014", "2014/chatIcon0001");
        this.add(chatIcon);

        // sendIcon
        const sendIcon = scene.add.image(1156.2750244140625, 1035.7874755859375, "ui-2014", "2014/sendIcon0001");
        this.add(sendIcon);

        // playerIcon
        const playerIcon = scene.add.image(1221.75, 1035.112548828125, "ui-2014", "2014/playerIcon0001");
        this.add(playerIcon);

        // friendsIcon
        const friendsIcon = scene.add.image(1289.137451171875, 1036.9124755859375, "ui-2014", "2014/friendsIcon");
        this.add(friendsIcon);

        // settingsIcon
        const settingsIcon = scene.add.image(1424.4749755859375, 1035.675048828125, "ui-2014", "2014/settingsIcon");
        this.add(settingsIcon);

        // iglooIcon
        const iglooIcon = scene.add.image(1357.762451171875, 1037.925048828125, "ui-2014", "2014/iglooIcon0001");
        this.add(iglooIcon);

        // emoteMenu
        const emoteMenu = new EmoteMenu(scene, 238.5, 437.2875061035156);
        emoteMenu.visible = false;
        this.add(emoteMenu);

        // actionsMenu
        const actionsMenu = new ActionsMenu(scene, 336.6000061035156, 528.75);
        actionsMenu.visible = false;
        this.add(actionsMenu);

        // snowballCrosshair
        const snowballCrosshair = scene.add.image(855, 540, "ui-2014", "2014/snowballCrosshair");
        snowballCrosshair.visible = false;
        this.add(snowballCrosshair);

        // mailIcon
        const mailIcon = scene.add.image(198, 78.75, "ui-2014", "2014/mailIcon0001");
        mailIcon.setOrigin(0.5, 0.6327);
        this.add(mailIcon);

        // newsIcon
        const newsIcon = scene.add.image(87.75, 72.5625, "ui-2014", "2014/newsIcon0001");
        this.add(newsIcon);

        // newsLabel
        const newsLabel = scene.add.image(114.75, 108, "ui-2014", "2014/newsLabel0001");
        this.add(newsLabel);

        // safetyIcon
        const safetyIcon = scene.add.image(1604.25, 90.11250305175781, "ui-2014", "2014/safetyIcon0001");
        this.add(safetyIcon);

        // mapIcon
        const mapIcon = scene.add.image(108, 990, "ui-2014", "2014/mapIcon0001");
        this.add(mapIcon);

        // phoneIcon
        const phoneIcon = scene.add.image(99.11250305175781, 850.3875122070312, "ui-2014", "2014/phoneIcon0001");
        this.add(phoneIcon);

        // namecard
        const namecard = new Namecard(scene, 269, 213);
        namecard.visible = false;
        this.add(namecard);

        // playerNamecard
        const playerNamecard = new PlayerNamecard(scene, 269, 213);
        playerNamecard.visible = false;
        this.add(playerNamecard);

        // photo_mask
        const photo_mask = scene.add.image(287, 303, "ui-2014", "2014/namecardPhoto");
        photo_mask.setOrigin(0, 0);
        photo_mask.visible = false;
        this.add(photo_mask);

        // dock (components)
        new InputBlocker(dock);

        // ui2014_messagesTabBody (components)
        new InputBlocker(ui2014_messagesTabBody);

        // ui2014_messagesTab (components)
        const ui2014_messagesTabButtonComponent = new ButtonComponent(ui2014_messagesTab);
        ui2014_messagesTabButtonComponent.handCursor = true;

        // puffleButton (components)
        const puffleButtonButtonComponent = new ButtonComponent(puffleButton);
        puffleButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        puffleButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        puffleButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        puffleButtonButtonComponent.handCursor = true;
        puffleButtonButtonComponent.pixelPerfect = true;

        // emojiButton (components)
        const emojiButtonButtonComponent = new ButtonComponent(emojiButton);
        emojiButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        emojiButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        emojiButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        emojiButtonButtonComponent.handCursor = true;
        emojiButtonButtonComponent.pixelPerfect = true;

        // actionButton (components)
        const actionButtonButtonComponent = new ButtonComponent(actionButton);
        actionButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        actionButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        actionButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        actionButtonButtonComponent.handCursor = true;
        actionButtonButtonComponent.pixelPerfect = true;

        // snowballButton (components)
        const snowballButtonButtonComponent = new ButtonComponent(snowballButton);
        snowballButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        snowballButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        snowballButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        snowballButtonButtonComponent.handCursor = true;
        snowballButtonButtonComponent.pixelPerfect = true;

        // chat (prefab fields)
        chat.inputType = "text";
        chat.fieldWidth = 525;
        chat.fieldHeight = 42.4125;
        chat.value = "";
        chat.maxLength = 48;
        chat.disabled = false;
        chat.readOnly = false;
        chat.font = "Burbank Small Medium";
        chat.fontSize = "27px";
        chat.fontColor = "#ffffffff";
        chat.backgroundIsFilled = false;
        chat.backgroundIsStroked = false;
        chat.marginLeft = 4.5;

        // chatButton (components)
        const chatButtonButtonComponent = new ButtonComponent(chatButton);
        chatButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        chatButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        chatButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        chatButtonButtonComponent.handCursor = true;
        chatButtonButtonComponent.pixelPerfect = true;

        // sendButton (components)
        const sendButtonButtonComponent = new ButtonComponent(sendButton);
        sendButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        sendButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        sendButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        sendButtonButtonComponent.handCursor = true;
        sendButtonButtonComponent.pixelPerfect = true;

        // playerButton (components)
        const playerButtonButtonComponent = new ButtonComponent(playerButton);
        playerButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        playerButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        playerButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        playerButtonButtonComponent.handCursor = true;
        playerButtonButtonComponent.pixelPerfect = true;

        // friendsButton (components)
        const friendsButtonButtonComponent = new ButtonComponent(friendsButton);
        friendsButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        friendsButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        friendsButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        friendsButtonButtonComponent.handCursor = true;
        friendsButtonButtonComponent.pixelPerfect = true;

        // iglooButton (components)
        const iglooButtonButtonComponent = new ButtonComponent(iglooButton);
        iglooButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        iglooButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        iglooButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        iglooButtonButtonComponent.handCursor = true;
        iglooButtonButtonComponent.pixelPerfect = true;

        // settingsButton (components)
        const settingsButtonButtonComponent = new ButtonComponent(settingsButton);
        settingsButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/dockButton0001"};
        settingsButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/dockButton0002"};
        settingsButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/dockButton0003"};
        settingsButtonButtonComponent.handCursor = true;
        settingsButtonButtonComponent.pixelPerfect = true;

        // snowballCrosshair (components)
        const snowballCrosshairButtonComponent = new ButtonComponent(snowballCrosshair);
        snowballCrosshairButtonComponent.handCursor = true;

        // mailIcon (components)
        const mailIconButtonComponent = new ButtonComponent(mailIcon);
        mailIconButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/mailIcon0001"};
        mailIconButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/mailIcon0002"};
        mailIconButtonComponent.handCursor = true;
        mailIconButtonComponent.pixelPerfect = true;

        // newsIcon (components)
        const newsIconButtonComponent = new ButtonComponent(newsIcon);
        newsIconButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/newsIcon0001"};
        newsIconButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/newsIcon0002"};
        newsIconButtonComponent.handCursor = true;
        newsIconButtonComponent.pixelPerfect = true;

        // safetyIcon (components)
        const safetyIconButtonComponent = new ButtonComponent(safetyIcon);
        safetyIconButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/safetyIcon0001"};
        safetyIconButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/safetyIcon0002"};
        safetyIconButtonComponent.handCursor = true;
        safetyIconButtonComponent.pixelPerfect = true;

        // mapIcon (components)
        const mapIconButtonComponent = new ButtonComponent(mapIcon);
        mapIconButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/mapIcon0001"};
        mapIconButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/mapIcon0002"};
        mapIconButtonComponent.handCursor = true;
        mapIconButtonComponent.pixelPerfect = true;

        // phoneIcon (components)
        const phoneIconButtonComponent = new ButtonComponent(phoneIcon);
        phoneIconButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/phoneIcon0001"};
        phoneIconButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/phoneIconOver"};
        phoneIconButtonComponent.handCursor = true;
        phoneIconButtonComponent.pixelPerfect = true;

        this.puffleButton = puffleButton;
        this.emojiButton = emojiButton;
        this.actionButton = actionButton;
        this.snowballButton = snowballButton;
        this.chatBg = chatBg;
        this.chat = chat;
        this.chatButton = chatButton;
        this.sendButton = sendButton;
        this.playerButton = playerButton;
        this.friendsButton = friendsButton;
        this.iglooButton = iglooButton;
        this.settingsButton = settingsButton;
        this.puffleButtonIcon = puffleButtonIcon;
        this.chatIcon = chatIcon;
        this.sendIcon = sendIcon;
        this.playerIcon = playerIcon;
        this.friendsIcon = friendsIcon;
        this.settingsIcon = settingsIcon;
        this.emoteMenu = emoteMenu;
        this.actionsMenu = actionsMenu;
        this.snowballCrosshair = snowballCrosshair;
        this.mailIcon = mailIcon;
        this.newsIcon = newsIcon;
        this.newsLabel = newsLabel;
        this.safetyIcon = safetyIcon;
        this.mapIcon = mapIcon;
        this.phoneIcon = phoneIcon;
        this.namecard = namecard;
        this.playerNamecard = playerNamecard;
        this.photo_mask = photo_mask;

        /* START-USER-CTR-CODE */

        this.mapIcon.on('release', () => this.scene.showMap());

        let mask = this.photo_mask.createBitmapMask();
        this.namecard.paperdoll.mask = mask;
        this.playerNamecard.paperdoll.mask = mask;

        this.snowballCrosshair.on('release', () => {
            this.scene.world.throwSnowball(this.snowballCrosshair.x, this.snowballCrosshair.y);
            this.snowballCrosshair.visible = false;
        });

        this.puffleButton.on('over', () => {
            this.scene.showLocalizedHint(this.puffleButton, 'w.app.hud.tooltip.puffletricks');
        });
        this.puffleButton.on('out', () => {
            this.scene.hideHint();
        });
        this.puffleButton.on('release', () => {
            this.scene.hideHint();
        });

        this.emojiButton.on('over', () => {
            this.scene.showLocalizedHint(this.emojiButton, 'emote_hint');
        });
        this.emojiButton.on('out', () => {
            this.scene.hideHint();
        });
        this.emojiButton.on('release', () => {
            this.scene.hideHint();
            this.emoteMenu.visible = !this.emoteMenu.visible;
        });

        this.actionButton.on('over', () => {
            this.scene.showLocalizedHint(this.actionButton, 'action_hint');
        });
        this.actionButton.on('out', () => {
            this.scene.hideHint();
        });
        this.actionButton.on('release', () => {
            this.scene.hideHint();
            this.actionsMenu.visible = !this.actionsMenu.visible;
        });

        this.snowballButton.on('over', () => {
            this.scene.showLocalizedHint(this.snowballButton, 'throw_hint');
        });
        this.snowballButton.on('out', () => {
            this.scene.hideHint();
        });
        this.snowballButton.on('release', () => {
            this.scene.hideHint();
            this.snowballCrosshair.visible = !this.snowballCrosshair.visible;
        });

        this.chatButton.on('over', () => {
            this.scene.showLocalizedHint(this.chatButton, 'safe_hint');
        });
        this.chatButton.on('out', () => {
            this.scene.hideHint();
        });
        this.chatButton.on('release', () => {
            this.scene.hideHint();
        });

        this.sendButton.on('over', () => {
            this.scene.showLocalizedHint(this.sendButton, 'send_hint');
        });
        this.sendButton.on('out', () => {
            this.scene.hideHint();
        });
        this.sendButton.on('release', () => {
            this.scene.sendMessage();
        });

        this.playerButton.on('over', () => {
            this.scene.showLocalizedHint(this.playerButton, 'player_hint');
        });
        this.playerButton.on('out', () => {
            this.scene.hideHint();
        });
        this.playerButton.on('release', () => {
            this.scene.hideHint();
            if (!this.scene.isPlayerNamecardOpen()) this.scene.openMyNamecard();
        });

        this.friendsButton.on('over', () => {
            this.scene.showLocalizedHint(this.friendsButton, 'friend_hint');
        });
        this.friendsButton.on('out', () => {
            this.scene.hideHint();
        });
        this.friendsButton.on('release', () => {
            this.scene.hideHint();
            this.scene.game.friends.toggle();
        });

        this.iglooButton.on('over', () => {
            this.scene.showLocalizedHint(this.iglooButton, 'home_hint');
        });
        this.iglooButton.on('out', () => {
            this.scene.hideHint();
        });
        this.iglooButton.on('release', () => {
            this.scene.hideHint();
        });

        this.settingsButton.on('over', () => {
            this.scene.showLocalizedHint(this.settingsButton, 'help_hint');
        });
        this.settingsButton.on('out', () => {
            this.scene.hideHint();
        });
        this.settingsButton.on('release', () => {
            this.scene.hideHint();
            this.scene.loadContent(async () => (await import('@clubpenguin/world/content/help/Help')).default);
        });

        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (!this.scene.input.hitTestPointer(pointer).includes(this.actionsMenu.bg) && !this.scene.input.hitTestPointer(pointer).includes(this.actionButton)) this.actionsMenu.visible = false;
            if (!this.scene.input.hitTestPointer(pointer).includes(this.emoteMenu.bg) && !this.scene.input.hitTestPointer(pointer).includes(this.emojiButton)) this.emoteMenu.visible = false;
        });

        this.chat.handleKeyUp = (event) => {
            if (event.key == 'Enter') {
                event.preventDefault();
                this.scene.sendMessage();
                return false;
            } else return true;
        }

        /* END-USER-CTR-CODE */
    }

    public puffleButton: Phaser.GameObjects.Image;
    public emojiButton: Phaser.GameObjects.Image;
    public actionButton: Phaser.GameObjects.Image;
    public snowballButton: Phaser.GameObjects.Image;
    public chatBg: Phaser.GameObjects.Image;
    public chat: TextField;
    public chatButton: Phaser.GameObjects.Image;
    public sendButton: Phaser.GameObjects.Image;
    public playerButton: Phaser.GameObjects.Image;
    public friendsButton: Phaser.GameObjects.Image;
    public iglooButton: Phaser.GameObjects.Image;
    public settingsButton: Phaser.GameObjects.Image;
    public puffleButtonIcon: Phaser.GameObjects.Image;
    public chatIcon: Phaser.GameObjects.Image;
    public sendIcon: Phaser.GameObjects.Image;
    public playerIcon: Phaser.GameObjects.Image;
    public friendsIcon: Phaser.GameObjects.Image;
    public settingsIcon: Phaser.GameObjects.Image;
    public emoteMenu: EmoteMenu;
    public actionsMenu: ActionsMenu;
    public snowballCrosshair: Phaser.GameObjects.Image;
    public mailIcon: Phaser.GameObjects.Image;
    public newsIcon: Phaser.GameObjects.Image;
    public newsLabel: Phaser.GameObjects.Image;
    public safetyIcon: Phaser.GameObjects.Image;
    public mapIcon: Phaser.GameObjects.Image;
    public phoneIcon: Phaser.GameObjects.Image;
    public namecard: Namecard;
    public playerNamecard: PlayerNamecard;
    public photo_mask: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Interface;

    static preload(scene: Phaser.Scene) {
        scene.load.pack('ui-pack', 'assets/world/ui/2014/ui-pack.json');
    }

    unload(scene: Interface): void {
        scene.game.unloadAssetPack('ui-pack');
    }

    get snowballCrosshairActive(): boolean {
        return this.snowballCrosshair.visible;
    }

    set snowballCrosshairActive(active: boolean) {
        this.snowballCrosshair.visible = active;
    }

    localize(locale: Locale) {
        this.namecard.localize(locale);
        this.playerNamecard.localize(locale);

        this.chat.filterRegex = new RegExp(locale.localize('chat_restrict'), 'g');
    }

    /**
     * If the snowball crosshair is visible, updates its position to the current pointer position.
     * If any namecard is visible, updates the photo mask position to the other namecard's position.
     * @param time The current time.
     * @param delta The delta time in ms since the last frame.
     */
    tick(time: number, delta: number): void {
        if (this.snowballCrosshair.visible) this.snowballCrosshair.setPosition(this.scene.input.activePointer.x, this.scene.input.activePointer.y);
    }

    /* ========== NAMECARD ========== */

    /**
     * Opens the namecard for a given user. If the user is the current player, the player's namecard is opened.
     * @param data The user data for the player whose namecard is to be opened.
     */
    openNamecard(data: UserData): void {
        if (this.scene.world.isMyPlayer(data)) return this.openMyNamecard();
        if (this.playerNamecard.visible) this.playerNamecard.visible = false;

        this.namecard.paperdoll.clear();
        this.namecard.setup(data);
        this.namecard.visible = true;
    }

    /**
     * Opens the player's namecard interface.
     */
    openMyNamecard(): void {
        if (this.namecard.visible) this.namecard.visible = false;

        let data = this.scene.world.myUser;

        this.playerNamecard.paperdoll.clear();
        this.playerNamecard.setup(data);
        this.playerNamecard.closeInventory();
        this.playerNamecard.visible = true;
    }

    /**
     * Checks if the namecard is currently open.
     * @returns Whether the namecard is open.
     */
    isNamecardOpen(): boolean {
        return this.namecard.visible;
    }

    /**
     * Checks if the player's namecard is currently open.
     * @returns Whether the player's namecard is open.
     */
    isPlayerNamecardOpen(): boolean {
        return this.playerNamecard.visible;
    }

    /**
     * Closes the namecard.
     */
    closeNamecard(): void {
        this.namecard.visible = false;
        this.playerNamecard.visible = false;
    }

    /**
     * Updates the user data in the UI.
     * 
     * This method checks if the player namecard or the namecard is open and updates
     * the respective card with the provided user data. It ensures that the data is
     * only updated if the user ID matches the open namecard.
     * @param data - The user data to update.
     */
    updateUser(data: AnyUserData): void {
        if (this.isPlayerNamecardOpen() && this.scene.world.isMyPlayer(data)) this.playerNamecard.setup(data);
        else if (this.isNamecardOpen() && !this.scene.world.isMyPlayer(data) && data.id == this.namecard.userId) this.namecard.setup(data);
    }

    repositionNamecard(x: number, y: number): void {
        this.namecard.setPosition(x, y);
        this.playerNamecard.setPosition(x, y);
        this.photo_mask.setPosition(x + 18, y + 90);
    }

    /* ========== INPUT ========== */

    lock(): void {
        this.chat.locked = true;
    }

    unlock(): void {
        this.chat.locked = false;
    }

    get chatValue(): string {
        return this.chat.value;
    }

    set chatValue(value: string) {
        this.chat.value = value;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
