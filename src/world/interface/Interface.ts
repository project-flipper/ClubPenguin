export interface Content extends Phaser.Scene {
    unload(interface_: Interface): void;
    hidesInterface?: boolean
}

export interface ContentCls {
    new(): Content;
}

/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../lib/ui/components/ButtonComponent";
import TextField from "../../lib/ui/TextField";
import EmoteMenu from "./prefabs/EmoteMenu";
import ActionsMenu from "./prefabs/ActionsMenu";
import Namecard from "./prefabs/Namecard";
import PlayerNamecard from "./prefabs/PlayerNamecard";
import Hint from "./prefabs/Hint";
/* START-USER-IMPORTS */
import type { PenguinData } from "../../net/types/penguin/penguin";
import type { Avatar } from "../avatar/avatar";
import AvatarOverlay from "./prefabs/AvatarOverlay";
import type World from "../World";
import type Engine from "../engine/Engine";
import type { Locale } from "../../app/locale";
import type { App } from "../../app/app";
import Load from "../../load/Load";
import { LoaderTask } from "../../load/tasks";
import ErrorArea from "../../app/ErrorArea";
/* END-USER-IMPORTS */

export default class Interface extends Phaser.Scene {

    constructor() {
        super("Interface");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("interface-pack", "assets/world/interface/interface-pack.json");
    }

    editorCreate(): void {

        // avatarOverlays
        const avatarOverlays = this.add.layer();

        // ui
        const ui = this.add.layer();

        // interface_dock
        const interface_dock = this.add.image(211.5, 978.75, "interface", "interface/dock");
        interface_dock.setOrigin(0, 0);
        ui.add(interface_dock);

        // chatLog
        const chatLog = this.add.container(855, -4.5);
        ui.add(chatLog);

        // interface_messagesTabBody
        const interface_messagesTabBody = this.add.image(0, 9, "interface", "interface/messagesTabBody");
        interface_messagesTabBody.setOrigin(0.5, 1);
        interface_messagesTabBody.visible = false;
        chatLog.add(interface_messagesTabBody);

        // interface_messagesTab
        const interface_messagesTab = this.add.image(0, 0, "interface", "interface/messagesTab");
        interface_messagesTab.setOrigin(0.5, 0);
        chatLog.add(interface_messagesTab);

        // interface_messagesTabArrow0001
        const interface_messagesTabArrow0001 = this.add.image(0, 18, "interface", "interface/messagesTabArrow0001");
        chatLog.add(interface_messagesTabArrow0001);

        // puffleButton
        const puffleButton = this.add.image(277.20001220703125, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(puffleButton);

        // emojiButton
        const emojiButton = this.add.image(344.70001220703125, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(emojiButton);

        // actionButton
        const actionButton = this.add.image(412.20001220703125, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(actionButton);

        // snowballButton
        const snowballButton = this.add.image(479.70001220703125, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(snowballButton);

        // chatBg
        const chatBg = this.add.image(521.5499877929688, 1007.4375, "interface", "interface/chatBg");
        chatBg.setOrigin(0, 0);
        ui.add(chatBg);

        // chat
        const chat = new TextField(this, 590.4500122070312, 1020.5999755859375);
        ui.add(chat);

        // chatButton
        const chatButton = this.add.image(547.2000122070312, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(chatButton);

        // sendButton
        const sendButton = this.add.image(1154.699951171875, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(sendButton);

        // playerButton
        const playerButton = this.add.image(1222.199951171875, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(playerButton);

        // friendsButton
        const friendsButton = this.add.image(1289.8125, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(friendsButton);

        // iglooButton
        const iglooButton = this.add.image(1357.199951171875, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(iglooButton);

        // settingsButton
        const settingsButton = this.add.image(1424.699951171875, 1037.925048828125, "interface", "interface/dockButton0001");
        ui.add(settingsButton);

        // puffleButtonIcon
        const puffleButtonIcon = this.add.image(276.5249938964844, 1035.675048828125, "interface", "interface/puffleButtonIcon0001");
        ui.add(puffleButtonIcon);

        // emojiIcon
        const emojiIcon = this.add.image(344.25, 1035.9000244140625, "interface", "interface/emojiIcon");
        ui.add(emojiIcon);

        // actionIcon
        const actionIcon = this.add.image(410.17498779296875, 1033.987548828125, "interface", "interface/actionIcon");
        ui.add(actionIcon);

        // snowballIcon
        const snowballIcon = this.add.image(479.4750061035156, 1035.449951171875, "interface", "interface/snowballIcon");
        ui.add(snowballIcon);

        // chatIcon
        const chatIcon = this.add.image(547.2000122070312, 1037.925048828125, "interface", "interface/chatIcon0001");
        ui.add(chatIcon);

        // sendIcon
        const sendIcon = this.add.image(1156.2750244140625, 1035.7874755859375, "interface", "interface/sendIcon0001");
        ui.add(sendIcon);

        // playerIcon
        const playerIcon = this.add.image(1221.75, 1035.112548828125, "interface", "interface/playerIcon0001");
        ui.add(playerIcon);

        // friendsIcon
        const friendsIcon = this.add.image(1289.137451171875, 1036.9124755859375, "interface", "interface/friendsIcon");
        ui.add(friendsIcon);

        // settingsIcon
        const settingsIcon = this.add.image(1424.4749755859375, 1035.675048828125, "interface", "interface/settingsIcon");
        ui.add(settingsIcon);

        // iglooIcon
        const iglooIcon = this.add.image(1357.762451171875, 1037.925048828125, "interface", "interface/iglooIcon0001");
        ui.add(iglooIcon);

        // emoteMenu
        const emoteMenu = new EmoteMenu(this, 238.5, 437.2875061035156);
        emoteMenu.visible = false;
        ui.add(emoteMenu);

        // actionsMenu
        const actionsMenu = new ActionsMenu(this, 336.6000061035156, 528.75);
        actionsMenu.visible = false;
        ui.add(actionsMenu);

        // snowballCrosshair
        const snowballCrosshair = this.add.image(855, 540, "interface", "interface/snowballCrosshair");
        snowballCrosshair.visible = false;
        ui.add(snowballCrosshair);

        // mailIcon
        const mailIcon = this.add.image(198, 78.75, "interface", "interface/mailIcon0001");
        mailIcon.setOrigin(0.5, 0.6327);
        ui.add(mailIcon);

        // newsIcon
        const newsIcon = this.add.image(87.75, 72.5625, "interface", "interface/newsIcon0001");
        ui.add(newsIcon);

        // newsLabel
        const newsLabel = this.add.image(114.75, 108, "interface", "interface/newsLabel0001");
        ui.add(newsLabel);

        // safetyIcon
        const safetyIcon = this.add.image(1604.25, 90.11250305175781, "interface", "interface/safetyIcon0001");
        ui.add(safetyIcon);

        // mapIcon
        const mapIcon = this.add.image(108, 990, "interface", "interface/mapIcon0001");
        ui.add(mapIcon);

        // phoneIcon
        const phoneIcon = this.add.image(99.11250305175781, 850.3875122070312, "interface", "interface/phoneIcon0001");
        ui.add(phoneIcon);

        // namecard
        const namecard = new Namecard(this, 269, 213);
        namecard.visible = false;
        ui.add(namecard);

        // playerNamecard
        const playerNamecard = new PlayerNamecard(this, 269, 213);
        playerNamecard.visible = false;
        ui.add(playerNamecard);

        // hint
        const hint = new Hint(this, 718, 540);
        this.add.existing(hint);
        hint.visible = false;

        // border
        const border = this.add.rectangle(0, 0, 1710, 1080);
        border.setOrigin(0, 0);
        border.visible = false;
        border.isStroked = true;
        border.lineWidth = 18;

        // photo_mask
        const photo_mask = this.add.image(287, 303, "interface", "interface/namecardPhoto");
        photo_mask.setOrigin(0, 0);
        photo_mask.visible = false;

        // interface_dock (components)
        new InputBlocker(interface_dock);

        // interface_messagesTabBody (components)
        new InputBlocker(interface_messagesTabBody);

        // interface_messagesTab (components)
        const interface_messagesTabButtonComponent = new ButtonComponent(interface_messagesTab);
        interface_messagesTabButtonComponent.handCursor = true;

        // puffleButton (components)
        const puffleButtonButtonComponent = new ButtonComponent(puffleButton);
        puffleButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        puffleButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        puffleButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        puffleButtonButtonComponent.handCursor = true;
        puffleButtonButtonComponent.pixelPerfect = true;

        // emojiButton (components)
        const emojiButtonButtonComponent = new ButtonComponent(emojiButton);
        emojiButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        emojiButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        emojiButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        emojiButtonButtonComponent.handCursor = true;
        emojiButtonButtonComponent.pixelPerfect = true;

        // actionButton (components)
        const actionButtonButtonComponent = new ButtonComponent(actionButton);
        actionButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        actionButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        actionButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        actionButtonButtonComponent.handCursor = true;
        actionButtonButtonComponent.pixelPerfect = true;

        // snowballButton (components)
        const snowballButtonButtonComponent = new ButtonComponent(snowballButton);
        snowballButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        snowballButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        snowballButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
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
        chat.font = "BurbankSmallMedium";
        chat.fontSize = -27;
        chat.fontColor = "#ffffffff";
        chat.backgroundIsFilled = false;
        chat.backgroundIsStroked = false;

        // chatButton (components)
        const chatButtonButtonComponent = new ButtonComponent(chatButton);
        chatButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        chatButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        chatButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        chatButtonButtonComponent.handCursor = true;
        chatButtonButtonComponent.pixelPerfect = true;

        // sendButton (components)
        const sendButtonButtonComponent = new ButtonComponent(sendButton);
        sendButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        sendButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        sendButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        sendButtonButtonComponent.handCursor = true;
        sendButtonButtonComponent.pixelPerfect = true;

        // playerButton (components)
        const playerButtonButtonComponent = new ButtonComponent(playerButton);
        playerButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        playerButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        playerButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        playerButtonButtonComponent.handCursor = true;
        playerButtonButtonComponent.pixelPerfect = true;

        // friendsButton (components)
        const friendsButtonButtonComponent = new ButtonComponent(friendsButton);
        friendsButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        friendsButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        friendsButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        friendsButtonButtonComponent.handCursor = true;
        friendsButtonButtonComponent.pixelPerfect = true;

        // iglooButton (components)
        const iglooButtonButtonComponent = new ButtonComponent(iglooButton);
        iglooButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        iglooButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        iglooButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        iglooButtonButtonComponent.handCursor = true;
        iglooButtonButtonComponent.pixelPerfect = true;

        // settingsButton (components)
        const settingsButtonButtonComponent = new ButtonComponent(settingsButton);
        settingsButtonButtonComponent.upTexture = { "key": "interface", "frame": "interface/dockButton0001" };
        settingsButtonButtonComponent.overTexture = { "key": "interface", "frame": "interface/dockButton0002" };
        settingsButtonButtonComponent.downTexture = { "key": "interface", "frame": "interface/dockButton0003" };
        settingsButtonButtonComponent.handCursor = true;
        settingsButtonButtonComponent.pixelPerfect = true;

        // snowballCrosshair (components)
        const snowballCrosshairButtonComponent = new ButtonComponent(snowballCrosshair);
        snowballCrosshairButtonComponent.handCursor = true;

        // mailIcon (components)
        const mailIconButtonComponent = new ButtonComponent(mailIcon);
        mailIconButtonComponent.upTexture = { "key": "interface", "frame": "interface/mailIcon0001" };
        mailIconButtonComponent.overTexture = { "key": "interface", "frame": "interface/mailIcon0002" };
        mailIconButtonComponent.handCursor = true;
        mailIconButtonComponent.pixelPerfect = true;

        // newsIcon (components)
        const newsIconButtonComponent = new ButtonComponent(newsIcon);
        newsIconButtonComponent.upTexture = { "key": "interface", "frame": "interface/newsIcon0001" };
        newsIconButtonComponent.overTexture = { "key": "interface", "frame": "interface/newsIcon0002" };
        newsIconButtonComponent.handCursor = true;
        newsIconButtonComponent.pixelPerfect = true;

        // safetyIcon (components)
        const safetyIconButtonComponent = new ButtonComponent(safetyIcon);
        safetyIconButtonComponent.upTexture = { "key": "interface", "frame": "interface/safetyIcon0001" };
        safetyIconButtonComponent.overTexture = { "key": "interface", "frame": "interface/safetyIcon0002" };
        safetyIconButtonComponent.handCursor = true;
        safetyIconButtonComponent.pixelPerfect = true;

        // mapIcon (components)
        const mapIconButtonComponent = new ButtonComponent(mapIcon);
        mapIconButtonComponent.upTexture = { "key": "interface", "frame": "interface/mapIcon0001" };
        mapIconButtonComponent.overTexture = { "key": "interface", "frame": "interface/mapIcon0002" };
        mapIconButtonComponent.handCursor = true;
        mapIconButtonComponent.pixelPerfect = true;

        // phoneIcon (components)
        const phoneIconButtonComponent = new ButtonComponent(phoneIcon);
        phoneIconButtonComponent.upTexture = { "key": "interface", "frame": "interface/phoneIcon0001" };
        phoneIconButtonComponent.overTexture = { "key": "interface", "frame": "interface/phoneIconOver" };
        phoneIconButtonComponent.handCursor = true;
        phoneIconButtonComponent.pixelPerfect = true;

        this.avatarOverlays = avatarOverlays;
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
        this.ui = ui;
        this.hint = hint;
        this.photo_mask = photo_mask;

        this.events.emit("scene-awake");
    }

    public avatarOverlays!: Phaser.GameObjects.Layer;
    public puffleButton!: Phaser.GameObjects.Image;
    public emojiButton!: Phaser.GameObjects.Image;
    public actionButton!: Phaser.GameObjects.Image;
    public snowballButton!: Phaser.GameObjects.Image;
    public chatBg!: Phaser.GameObjects.Image;
    public chat!: TextField;
    public chatButton!: Phaser.GameObjects.Image;
    public sendButton!: Phaser.GameObjects.Image;
    public playerButton!: Phaser.GameObjects.Image;
    public friendsButton!: Phaser.GameObjects.Image;
    public iglooButton!: Phaser.GameObjects.Image;
    public settingsButton!: Phaser.GameObjects.Image;
    public puffleButtonIcon!: Phaser.GameObjects.Image;
    public chatIcon!: Phaser.GameObjects.Image;
    public sendIcon!: Phaser.GameObjects.Image;
    public playerIcon!: Phaser.GameObjects.Image;
    public friendsIcon!: Phaser.GameObjects.Image;
    public settingsIcon!: Phaser.GameObjects.Image;
    public emoteMenu!: EmoteMenu;
    public actionsMenu!: ActionsMenu;
    public snowballCrosshair!: Phaser.GameObjects.Image;
    public mailIcon!: Phaser.GameObjects.Image;
    public newsIcon!: Phaser.GameObjects.Image;
    public newsLabel!: Phaser.GameObjects.Image;
    public safetyIcon!: Phaser.GameObjects.Image;
    public mapIcon!: Phaser.GameObjects.Image;
    public phoneIcon!: Phaser.GameObjects.Image;
    public namecard!: Namecard;
    public playerNamecard!: PlayerNamecard;
    public ui!: Phaser.GameObjects.Layer;
    public hint!: Hint;
    public photo_mask!: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
        if (data.oninit) data.oninit(this);
    }

    public quickKeys = false;

    create(data: any) {

        this.editorCreate();

        this.mapIcon.on('release', this.showMap, this);

        let mask = this.photo_mask.createBitmapMask();
        this.namecard.paperdoll.mask = mask;
        this.playerNamecard.paperdoll.mask = mask;

        this.snowballCrosshair.on('release', () => {
            this.engine.throwSnowball(this.engine.player, this.snowballCrosshair.x, this.snowballCrosshair.y);
            this.snowballCrosshair.visible = false;
        });

        this.puffleButton.on('over', () => {
            this.showLocalizedHint(this.puffleButton, 'w.app.hud.tooltip.puffletricks');
        });
        this.puffleButton.on('out', () => {
            this.hideHint();
        });
        this.puffleButton.on('release', () => {
            this.hideHint();
        });

        this.emojiButton.on('over', () => {
            this.showLocalizedHint(this.emojiButton, 'emote_hint');
        });
        this.emojiButton.on('out', () => {
            this.hideHint();
        });
        this.emojiButton.on('release', () => {
            this.hideHint();
            this.emoteMenu.visible = !this.emoteMenu.visible;
        });

        this.actionButton.on('over', () => {
            this.showLocalizedHint(this.actionButton, 'action_hint');
        });
        this.actionButton.on('out', () => {
            this.hideHint();
        });
        this.actionButton.on('release', () => {
            this.hideHint();
            this.actionsMenu.visible = !this.actionsMenu.visible;
        });

        this.snowballButton.on('over', () => {
            this.showLocalizedHint(this.snowballButton, 'throw_hint');
        });
        this.snowballButton.on('out', () => {
            this.hideHint();
        });
        this.snowballButton.on('release', () => {
            this.hideHint();
            this.snowballCrosshair.visible = !this.snowballCrosshair.visible;
        });

        this.chatButton.on('over', () => {
            this.showLocalizedHint(this.chatButton, 'safe_hint');
        });
        this.chatButton.on('out', () => {
            this.hideHint();
        });
        this.chatButton.on('release', () => {
            this.hideHint();
        });

        this.sendButton.on('over', () => {
            this.showLocalizedHint(this.sendButton, 'send_hint');
        });
        this.sendButton.on('out', () => {
            this.hideHint();
        });
        this.sendButton.on('release', () => {
            this.sendMessage();
        });

        this.playerButton.on('over', () => {
            this.showLocalizedHint(this.playerButton, 'player_hint');
        });
        this.playerButton.on('out', () => {
            this.hideHint();
        });
        this.playerButton.on('release', () => {
            this.hideHint();
            if (!this.isPlayerNamecardOpen()) this.openMyNamecard();
        });

        this.friendsButton.on('over', () => {
            this.showLocalizedHint(this.friendsButton, 'friend_hint');
        });
        this.friendsButton.on('out', () => {
            this.hideHint();
        });
        this.friendsButton.on('release', () => {
            this.hideHint();
            this.game.friends.toggle();
        });

        this.iglooButton.on('over', () => {
            this.showLocalizedHint(this.iglooButton, 'home_hint');
        });
        this.iglooButton.on('out', () => {
            this.hideHint();
        });
        this.iglooButton.on('release', () => {
            this.hideHint();
        });

        this.settingsButton.on('over', () => {
            this.showLocalizedHint(this.settingsButton, 'help_hint');
        });
        this.settingsButton.on('out', () => {
            this.hideHint();
        });
        this.settingsButton.on('release', () => {
            this.hideHint();
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (!this.input.hitTestPointer(pointer).includes(this.actionsMenu.bg) && !this.input.hitTestPointer(pointer).includes(this.actionButton)) this.actionsMenu.visible = false;
            if (!this.input.hitTestPointer(pointer).includes(this.emoteMenu.bg) && !this.input.hitTestPointer(pointer).includes(this.emojiButton)) this.emoteMenu.visible = false;
        });

        this.engine.events.on('roomload', () => this.quickKeys = true);
        this.engine.events.on('roomunload', () => this.quickKeys = false);

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => this.keydownHandler(event));
        this.chat.handleKeyUp = (event) => {
            if (event.key == 'Enter') {
                event.preventDefault();
                this.sendMessage();
                return false;
            } else return true;
        }

        this.game.locale.register(this.localize, this);
        this.events.on('shutdown', () => {
            this.game.locale.unregister(this.localize);
            this.game.unloadAssetPack('interface-pack');
        });

        if (data.onready) data.onready(this);
    }

    get world(): World {
        return (this.scene.get('World') as World);
    }

    get engine(): Engine {
        return (this.scene.get('Engine') as Engine);
    }

    localize(locale: Locale): void {
        this.namecard.localize(locale);
        this.playerNamecard.localize(locale);

        this.chat.filterRegex = new RegExp(locale.localize('chat_restrict'), 'g');
    }

    update(time: number, delta: number): void {
        if (this.snowballCrosshair.visible) this.snowballCrosshair.setPosition(this.input.activePointer.x, this.input.activePointer.y);

        if (this.namecard.visible) this.photo_mask.setPosition(this.namecard.x + 18, this.namecard.y + 90);
        else if (this.playerNamecard.visible) this.photo_mask.setPosition(this.playerNamecard.x + 18, this.playerNamecard.y + 90);
    }

    showMap(): void {
        this.loadContent(async () => (await import('./content/map/Map')).default);
    }

    /* ============ INPUT ============ */

    keydownHandler(event: KeyboardEvent): void {
        if (!this.game.hasFocus || !this.quickKeys) return;
        if (document.activeElement !== document.body) return;

        switch (event.key) {
            case 'ArrowDown':
                this.engine.actionSitDown();
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'ArrowLeft':
                this.engine.actionSitLeft();
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'ArrowUp':
                this.engine.actionSitUp();
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'ArrowRight':
                this.engine.actionSitRight();
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'Enter':
                this.sendMessage();
                break;
            case 'w':
                this.engine.actionWave();
                event.stopPropagation();
                break;
            case 'd':
                this.engine.actionDance();
                event.stopPropagation();
                break;
            case 't':
                this.snowballCrosshair.visible = true;
                event.stopPropagation();
                break;
        }
    }

    sendMessage(): void {
        this.hideHint();
        if (this.chat.value.length > 0) {
            this.engine.player.overlay.balloon.showMessage(this.chat.value);
            this.chat.value = '';
        }
    }

    /* ============ AVATAR OVERLAYS ============ */

    attachAvatarOverlay(penguin: Avatar): void {
        let overlay = new AvatarOverlay(this, penguin.x, penguin.y);
        this.avatarOverlays.add(overlay);

        penguin.overlay = overlay;
    }

    removeAvatarOverlay(penguin: Avatar): void {
        let overlay = penguin?.overlay;
        this.avatarOverlays.remove(overlay);
    }

    clearAvatarOverlays(): void {
        this.avatarOverlays.removeAll(true);
    }

    /* ============ NAMECARD ============ */

    openNamecard(data: PenguinData): void {
        if (this.world.isPlayer(data)) return this.openMyNamecard();
        if (this.playerNamecard.visible) {
            this.playerNamecard.visible = false;
            this.namecard.setPosition(this.playerNamecard.x, this.playerNamecard.y);
        }

        this.namecard.setup(data);
        this.namecard.visible = true;
    }

    openMyNamecard(): void {
        if (this.namecard.visible) {
            this.namecard.visible = false;
            this.playerNamecard.setPosition(this.namecard.x, this.namecard.y);
        }

        let data = this.world.myPenguinData;

        this.playerNamecard.setup(data);
        this.playerNamecard.visible = true;
    }

    isNamecardOpen(): boolean {
        return this.namecard.visible;
    }

    isPlayerNamecardOpen(): boolean {
        return this.playerNamecard.visible;
    }

    closeNamecard(): void {
        this.namecard.visible = false;
        this.playerNamecard.visible = false;
    }

    /* ============ HINT ============ */

    showHint(at: Phaser.Types.Math.Vector2Like, message: string, offsetX = 0, offsetY = -63): void {
        this.hint.hide();

        let x = at.x;
        let y = at.y;

        while ('parentContainer' in at && at.parentContainer != null) {
            at = at.parentContainer
            x += at.x;
            y += at.y;
        }

        this.hint.x = x + offsetX;
        this.hint.y = y + offsetY;

        this.hint.show(message);
    }

    showLocalizedHint(at: Phaser.Types.Math.Vector2Like, message: string, offsetX?: number, offsetY?: number): void {
        this.game.locale.immediate((locale: Locale) => this.showHint(at, locale.localize(message), offsetX, offsetY));
    }

    hideHint(): void {
        this.hint.hide();
    }

    /* ============ CONTENT ============ */

    public currentContent: Content;
    private _prevVisible: boolean;

    async loadContent(callback: () => Promise<ContentCls>, data?: any): Promise<void> {
        try {
            this.closeContent();
            this.chat.locked = true;

            let load = this.scene.get('Load') as Load;
            if (!load.isShowing) load.show({ mini: true });

            let contentCls = await callback();
            let contentScene = await new Promise<Content>(resolve => {
                this.scene.add('interface-content', contentCls, true, {
                    ...data,
                    oninit: (scene: Content) => load.track(new LoaderTask(scene.load)),
                    onready: (scene: Content) => resolve(scene)
                });
            });

            this.currentContent = contentScene;

            this.events.emit('contentload', this.currentContent);
            this.chat.locked = true;

            if (this.currentContent.hidesInterface) {
                if (this._prevVisible === undefined) this._prevVisible = this.isShowing;
                this.hide(false);
            }

            load.hide();
        } catch (e) {
            this.chat.locked = false;
            this.closeContent();

            let error = this.scene.get('ErrorArea') as ErrorArea;
            error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.LOAD_ERROR', 'error_lang'), this.game.locale.localize('Okay'), () => {
                let load = this.scene.get('Load') as Load;
                load.hide();
                return true;
            }, error.makeCode('c', error.LOAD_ERROR));

            throw e;
        }
    }

    closeContent(): void {
        if (!this.currentContent) return;

        this.currentContent.scene.remove();
        if ('unload' in this.currentContent) this.currentContent.unload(this);

        this.events.emit('contentunload', this.currentContent);
        this.currentContent = undefined;
        this.chat.locked = false;

        if (this._prevVisible !== undefined) {
            if (this._prevVisible) this.show();
            else this.hide();
            this._prevVisible = undefined;
        }
    }

    safeCloseContent(): void {
        // ensure the pointerup event finishes before re-allowing room input
        setTimeout(() => this.closeContent(), 10);
    }

    /* ============ VISIBILITY ============ */

    show(): void {
        this.ui.visible = true;
        this.chat.locked = false;
    }

    get isShowing(): boolean {
        return this.ui.visible;
    }

    hide(closeAll = true): void {
        this.ui.visible = false;
        if (closeAll) this.closeAll();
        this.chat.locked = true;
    }

    closeAll(): void {
        this.closeNamecard();
        this.hideHint();
        this.closeContent();
        this.chat.value = '';
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
