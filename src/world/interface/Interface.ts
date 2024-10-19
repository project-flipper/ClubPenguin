export interface Content extends Phaser.Scene {
    unload(interface_: Interface): void;
    hidesInterface?: boolean
}

export interface ContentCls {
    new(): Content;
}

/* START OF COMPILED CODE */

import InputBlocker from "../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../lib/ui/components/ButtonComponent";
import TextField from "../../lib/ui/TextField";
import EmoteMenu from "./prefabs/EmoteMenu";
import ActionsMenu from "./prefabs/ActionsMenu";
import Namecard from "./prefabs/Namecard";
import PlayerNamecard from "./prefabs/PlayerNamecard";
import EndGameProgress from "./prefabs/EndGameProgress";
import EndGameCongrats from "./prefabs/EndGameCongrats";
import EndGameCompleted from "./prefabs/EndGameCompleted";
import EndGameNoNewStamps from "./prefabs/EndGameNoNewStamps";
import EndGameNoStamps from "./prefabs/EndGameNoStamps";
import PromptQuestion from "./prefabs/PromptQuestion";
import PromptOkay from "./prefabs/PromptOkay";
import PromptSpinner from "./prefabs/PromptSpinner";
import PromptIgloo from "./prefabs/PromptIgloo";
import PromptShop from "./prefabs/PromptShop";
import PromptCoin from "./prefabs/PromptCoin";
import PromptInput from "./prefabs/PromptInput";
import PromptError from "./prefabs/PromptError";
import Hint from "./prefabs/Hint";
/* START-USER-IMPORTS */
import { UserData } from "@clubpenguin/net/types/user";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import AvatarOverlay from "./prefabs/AvatarOverlay";
import World from "@clubpenguin/world/World";
import { Engine } from "@clubpenguin/world/engine/engine";
import { Locale } from "@clubpenguin/app/locale";
import { App } from "@clubpenguin/app/app";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import ErrorArea from "@clubpenguin/app/ErrorArea";
import { Emoji } from "@clubpenguin/net/types/message";
import { GameConfig } from "@clubpenguin/app/config";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.world.interface');
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

        // endGame
        const endGame = this.add.layer();

        // endGameBlock
        const endGameBlock = this.add.rectangle(0, 0, 1710, 1080);
        endGameBlock.setOrigin(0, 0);
        endGameBlock.visible = false;
        endGameBlock.isFilled = true;
        endGameBlock.fillColor = 0;
        endGameBlock.fillAlpha = 0.25;
        endGame.add(endGameBlock);

        // endGameProgress
        const endGameProgress = new EndGameProgress(this, 0, 0);
        endGameProgress.visible = false;
        endGame.add(endGameProgress);

        // endGameCongrats
        const endGameCongrats = new EndGameCongrats(this, 0, 0);
        endGameCongrats.visible = false;
        endGame.add(endGameCongrats);

        // endGameCompleted
        const endGameCompleted = new EndGameCompleted(this, 0, 0);
        endGameCompleted.visible = false;
        endGame.add(endGameCompleted);

        // endGameNoNewStamps
        const endGameNoNewStamps = new EndGameNoNewStamps(this, 0, 0);
        endGameNoNewStamps.visible = false;
        endGame.add(endGameNoNewStamps);

        // endGameNoStamps
        const endGameNoStamps = new EndGameNoStamps(this, 0, 0);
        endGameNoStamps.visible = false;
        endGame.add(endGameNoStamps);

        // prompt
        const prompt = this.add.layer();

        // promptBlock
        const promptBlock = this.add.rectangle(0, 0, 1710, 1080);
        promptBlock.setOrigin(0, 0);
        promptBlock.visible = false;
        promptBlock.isFilled = true;
        promptBlock.fillColor = 0;
        promptBlock.fillAlpha = 0.25;
        prompt.add(promptBlock);

        // promptQuestion
        const promptQuestion = new PromptQuestion(this, 0, 0);
        promptQuestion.visible = false;
        prompt.add(promptQuestion);

        // promptOkay
        const promptOkay = new PromptOkay(this, 0, 0);
        promptOkay.visible = false;
        prompt.add(promptOkay);

        // promptSpinner
        const promptSpinner = new PromptSpinner(this, 0, 0);
        promptSpinner.visible = false;
        prompt.add(promptSpinner);

        // promptIgloo
        const promptIgloo = new PromptIgloo(this, 0, 0);
        promptIgloo.visible = false;
        prompt.add(promptIgloo);

        // promptShop
        const promptShop = new PromptShop(this, 0, 0);
        promptShop.visible = false;
        prompt.add(promptShop);

        // promptCoin
        const promptCoin = new PromptCoin(this, 0, 0);
        promptCoin.visible = false;
        prompt.add(promptCoin);

        // promptInput
        const promptInput = new PromptInput(this, 0, 0);
        promptInput.visible = false;
        prompt.add(promptInput);

        // promptError
        const promptError = new PromptError(this, 0, 0);
        promptError.visible = false;
        prompt.add(promptError);

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
        puffleButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        puffleButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        puffleButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        puffleButtonButtonComponent.handCursor = true;
        puffleButtonButtonComponent.pixelPerfect = true;

        // emojiButton (components)
        const emojiButtonButtonComponent = new ButtonComponent(emojiButton);
        emojiButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        emojiButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        emojiButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        emojiButtonButtonComponent.handCursor = true;
        emojiButtonButtonComponent.pixelPerfect = true;

        // actionButton (components)
        const actionButtonButtonComponent = new ButtonComponent(actionButton);
        actionButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        actionButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        actionButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        actionButtonButtonComponent.handCursor = true;
        actionButtonButtonComponent.pixelPerfect = true;

        // snowballButton (components)
        const snowballButtonButtonComponent = new ButtonComponent(snowballButton);
        snowballButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        snowballButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        snowballButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
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
        chatButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        chatButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        chatButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        chatButtonButtonComponent.handCursor = true;
        chatButtonButtonComponent.pixelPerfect = true;

        // sendButton (components)
        const sendButtonButtonComponent = new ButtonComponent(sendButton);
        sendButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        sendButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        sendButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        sendButtonButtonComponent.handCursor = true;
        sendButtonButtonComponent.pixelPerfect = true;

        // playerButton (components)
        const playerButtonButtonComponent = new ButtonComponent(playerButton);
        playerButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        playerButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        playerButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        playerButtonButtonComponent.handCursor = true;
        playerButtonButtonComponent.pixelPerfect = true;

        // friendsButton (components)
        const friendsButtonButtonComponent = new ButtonComponent(friendsButton);
        friendsButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        friendsButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        friendsButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        friendsButtonButtonComponent.handCursor = true;
        friendsButtonButtonComponent.pixelPerfect = true;

        // iglooButton (components)
        const iglooButtonButtonComponent = new ButtonComponent(iglooButton);
        iglooButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        iglooButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        iglooButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        iglooButtonButtonComponent.handCursor = true;
        iglooButtonButtonComponent.pixelPerfect = true;

        // settingsButton (components)
        const settingsButtonButtonComponent = new ButtonComponent(settingsButton);
        settingsButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/dockButton0001"};
        settingsButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/dockButton0002"};
        settingsButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/dockButton0003"};
        settingsButtonButtonComponent.handCursor = true;
        settingsButtonButtonComponent.pixelPerfect = true;

        // snowballCrosshair (components)
        const snowballCrosshairButtonComponent = new ButtonComponent(snowballCrosshair);
        snowballCrosshairButtonComponent.handCursor = true;

        // mailIcon (components)
        const mailIconButtonComponent = new ButtonComponent(mailIcon);
        mailIconButtonComponent.upTexture = {"key":"interface","frame":"interface/mailIcon0001"};
        mailIconButtonComponent.overTexture = {"key":"interface","frame":"interface/mailIcon0002"};
        mailIconButtonComponent.handCursor = true;
        mailIconButtonComponent.pixelPerfect = true;

        // newsIcon (components)
        const newsIconButtonComponent = new ButtonComponent(newsIcon);
        newsIconButtonComponent.upTexture = {"key":"interface","frame":"interface/newsIcon0001"};
        newsIconButtonComponent.overTexture = {"key":"interface","frame":"interface/newsIcon0002"};
        newsIconButtonComponent.handCursor = true;
        newsIconButtonComponent.pixelPerfect = true;

        // safetyIcon (components)
        const safetyIconButtonComponent = new ButtonComponent(safetyIcon);
        safetyIconButtonComponent.upTexture = {"key":"interface","frame":"interface/safetyIcon0001"};
        safetyIconButtonComponent.overTexture = {"key":"interface","frame":"interface/safetyIcon0002"};
        safetyIconButtonComponent.handCursor = true;
        safetyIconButtonComponent.pixelPerfect = true;

        // mapIcon (components)
        const mapIconButtonComponent = new ButtonComponent(mapIcon);
        mapIconButtonComponent.upTexture = {"key":"interface","frame":"interface/mapIcon0001"};
        mapIconButtonComponent.overTexture = {"key":"interface","frame":"interface/mapIcon0002"};
        mapIconButtonComponent.handCursor = true;
        mapIconButtonComponent.pixelPerfect = true;

        // phoneIcon (components)
        const phoneIconButtonComponent = new ButtonComponent(phoneIcon);
        phoneIconButtonComponent.upTexture = {"key":"interface","frame":"interface/phoneIcon0001"};
        phoneIconButtonComponent.overTexture = {"key":"interface","frame":"interface/phoneIconOver"};
        phoneIconButtonComponent.handCursor = true;
        phoneIconButtonComponent.pixelPerfect = true;

        // endGameBlock (components)
        new InputBlocker(endGameBlock);

        // promptBlock (components)
        new InputBlocker(promptBlock);

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
        this.endGameBlock = endGameBlock;
        this.endGameProgress = endGameProgress;
        this.endGameCongrats = endGameCongrats;
        this.endGameCompleted = endGameCompleted;
        this.endGameNoNewStamps = endGameNoNewStamps;
        this.endGameNoStamps = endGameNoStamps;
        this.endGame = endGame;
        this.promptBlock = promptBlock;
        this.promptQuestion = promptQuestion;
        this.promptOkay = promptOkay;
        this.promptSpinner = promptSpinner;
        this.promptIgloo = promptIgloo;
        this.promptShop = promptShop;
        this.promptCoin = promptCoin;
        this.promptInput = promptInput;
        this.promptError = promptError;
        this.prompt = prompt;
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
    public endGameBlock!: Phaser.GameObjects.Rectangle;
    public endGameProgress!: EndGameProgress;
    public endGameCongrats!: EndGameCongrats;
    public endGameCompleted!: EndGameCompleted;
    public endGameNoNewStamps!: EndGameNoNewStamps;
    public endGameNoStamps!: EndGameNoStamps;
    public endGame!: Phaser.GameObjects.Layer;
    public promptBlock!: Phaser.GameObjects.Rectangle;
    public promptQuestion!: PromptQuestion;
    public promptOkay!: PromptOkay;
    public promptSpinner!: PromptSpinner;
    public promptIgloo!: PromptIgloo;
    public promptShop!: PromptShop;
    public promptCoin!: PromptCoin;
    public promptInput!: PromptInput;
    public promptError!: PromptError;
    public prompt!: Phaser.GameObjects.Layer;
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
            this.world.throwSnowball(this.snowballCrosshair.x, this.snowballCrosshair.y);
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

        this.engine.on('room:load', () => this.quickKeys = true);
        this.engine.on('room:unload', () => {
            this.quickKeys = false;
            this.closeAll();
            this.clearAvatarOverlays();
        });

        this.input.keyboard.createCombo('e1', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e2', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e3', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e4', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e5', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e6', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e7', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e8', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e9', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('e0', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('ef', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('eg', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('eh', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('ep', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('em', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('el', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('ec', { resetOnWrongKey: true, resetOnMatch: true });
        this.input.keyboard.createCombo('et', { resetOnWrongKey: true, resetOnMatch: true });

        this.input.keyboard.on('keydown', this.keydownHandler, this);
        this.input.keyboard.on('keycombomatch', this.processEmojiCombo, this);

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
        return this.world?.engine;
    }

    get loadScreen(): Load {
        return this.scene.get('Load') as Load;
    }

    localize(locale: Locale): void {
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
    update(time: number, delta: number): void {
        if (this.snowballCrosshair.visible) this.snowballCrosshair.setPosition(this.input.activePointer.x, this.input.activePointer.y);

        if (this.namecard.visible) this.photo_mask.setPosition(this.namecard.x + 18, this.namecard.y + 90);
        else if (this.playerNamecard.visible) this.photo_mask.setPosition(this.playerNamecard.x + 18, this.playerNamecard.y + 90);
    }

    /**
     * Shorthand method to show the map.
     */
    showMap(): void {
        this.loadContent(async () => (await import('@clubpenguin/world/content/map/Map')).default);
    }

    /* ============ INPUT ============ */

    /**
     * Whether the interface should process input.
     */
    get canProcessInput(): boolean {
        // Canvas elements cannot have be set as active, so body it is.
        return this.game.hasFocus && document.activeElement == document.body && !this.engine.currentGame;
    }

    public lastFart: number;

    /**
     * Handles keyboard input for player actions, such as sitting, waving, and sending messages.
     * @param event The keyboard event.
     */
    keydownHandler(event: KeyboardEvent): void {
        if (!this.canProcessInput) return;

        let handled = false;
        switch (event.key) {
            case 'ArrowDown':
                this.world.sitDown();
                handled = true;
                break;
            case 'ArrowLeft':
                this.world.sitLeft();
                handled = true;
                break;
            case 'ArrowUp':
                this.world.sitUp();
                handled = true;
                break;
            case 'ArrowRight':
                this.world.sitRight();
                handled = true;
                break;
            case 'Enter':
                this.sendMessage();
                handled = true;
                break;
            case 'w':
                this.world.wave();
                handled = true;
                break;
            case 's':
                this.world.sit(this.input.activePointer.worldX, this.input.activePointer.worldY);
                handled = true;
                break;
            case 'd':
                this.world.dance();
                handled = true;
                break;
            case 't':
                // Prioritize combo
                let delta = window.performance.now() - this.lastFart;
                if (delta < 1) return;
                this.snowballCrosshair.visible = true;
                handled = true;
                break;
            case 'j':
                let joke = Phaser.Math.RND.pick(this.game.gameConfig.jokes);
                this.world.sendMessage(joke, true);
                handled = true;
                break;
            case '?':
                this.world.sendEmoji(Emoji.QUESTION);
                handled = true;
                break;
            case '!':
                this.world.sendEmoji(Emoji.EXCLAMATION);
                handled = true;
                break;
        }
        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Processes an emoji combo.
     * @param combo The combo that was matched.
     */
    processEmojiCombo(combo: Phaser.Input.Keyboard.KeyCombo): void {
        if (!this.canProcessInput) return;

        switch (combo.keyCodes[1]) {
            case 49:
                this.world.sendEmoji(Emoji.LAUGHING);
                break;
            case 50:
                this.world.sendEmoji(Emoji.HAPPY);
                break;
            case 51:
                this.world.sendEmoji(Emoji.INDIFFERENT);
                break;
            case 52:
                this.world.sendEmoji(Emoji.SAD);
                break;
            case 53:
                this.world.sendEmoji(Emoji.SURPRISED);
                break;
            case 54:
                this.world.sendEmoji(Emoji.POKING_OUT_TONGUE);
                break;
            case 55:
                this.world.sendEmoji(Emoji.WINKING);
                break;
            case 56:
                this.world.sendEmoji(Emoji.SICK);
                break;
            case 57:
                this.world.sendEmoji(Emoji.MAD);
                break;
            case 48:
                this.world.sendEmoji(Emoji.UPSET);
                break;
            case 70:
                this.world.sendEmoji(Emoji.FLOWER);
                break;
            case 71:
                this.world.sendEmoji(Emoji.CONTROLLER);
                break;
            case 72:
                this.world.sendEmoji(Emoji.HEART);
                break;
            case 80:
                this.world.sendEmoji(Emoji.PUFFLE);
                break;
            case 77:
                this.world.sendEmoji(Emoji.COIN);
                break;
            case 76:
                this.world.sendEmoji(Emoji.SHAMROCK);
                break;
            case 67:
                this.world.sendEmoji(Emoji.COFFEE);
                break;
            case 84:
                this.world.sendEmoji(Emoji.TOOT);
                this.lastFart = window.performance.now();
                break;
        }

    }

    /**
     * Sends the current typed message in the chat.
     */
    sendMessage(): void {
        this.hideHint();

        let message = this.chat.value;
        if (message.length > 0) {
            this.world.sendMessage(message, false);
            this.chat.value = '';
        }
    }

    /* ============ AVATAR OVERLAYS ============ */

    /**
     * Attaches an overlay to the specified player.
     * @param player The player to whom the overlay will be attached.
     */
    attachPlayerOverlay(player: Player): void {
        let overlay = new AvatarOverlay(this, player.x, player.y);
        this.avatarOverlays.add(overlay);

        player.overlay = overlay;
    }

    /**
     * Removes the overlay associated with the given player.
     * @param player The player whose overlay is to be removed.
     */
    removePlayerOverlay(player: Player): void {
        let overlay = player?.overlay;
        this.avatarOverlays.remove(overlay);
    }

    /**
     * Clears avatar overlays from all players.
     */
    clearAvatarOverlays(): void {
        this.avatarOverlays.removeAll(true);
    }

    /* ============ NAMECARD ============ */

    /**
     * Opens the namecard for a given user. If the user is the current player, the player's namecard is opened.
     * @param data The user data for the player whose namecard is to be opened.
     */
    openNamecard(data: UserData): void {
        if (this.world.isMyPlayer(data)) return this.openMyNamecard();
        if (this.playerNamecard.visible) {
            this.playerNamecard.visible = false;
            this.namecard.setPosition(this.playerNamecard.x, this.playerNamecard.y);
        }

        this.namecard.paperdoll.clear();
        this.namecard.setup(data);
        this.namecard.visible = true;
    }

    /**
     * Opens the player's namecard interface.
     */
    openMyNamecard(): void {
        if (this.namecard.visible) {
            this.namecard.visible = false;
            this.playerNamecard.setPosition(this.namecard.x, this.namecard.y);
        }

        let data = this.world.myUser;

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

    /* ============ HINT ============ */

    /**
     * Displays a hint message at a specified position.
     * @param at The initial position where the hint should be displayed. This can be a vector or an object with a parent container.
     * @param message The hint message to be displayed.
     * @param offsetX Optional horizontal offset for the hint position.
     * @param offsetY Optional vertical offset for the hint position.
     */
    showHint(at: Phaser.Types.Math.Vector2Like, message: string, offsetX = 0, offsetY = -63): void {
        this.hint.hide();

        let x = at.x;
        let y = at.y;

        while ('parentContainer' in at && at.parentContainer != null) {
            at = at.parentContainer as Phaser.Types.Math.Vector2Like;
            x += at.x;
            y += at.y;
        }

        this.hint.x = x + offsetX;
        this.hint.y = y + offsetY;

        this.hint.show(message);
    }

    /**
     * Displays a hint message at a specified position when the locale is available.
     * @param at The initial position where the hint should be displayed. This can be a vector or an object with a parent container.
     * @param message The localized hint message to be displayed.
     * @param offsetX Optional horizontal offset for the hint position.
     * @param offsetY Optional vertical offset for the hint position.
     */
    showLocalizedHint(at: Phaser.Types.Math.Vector2Like, message: string, offsetX?: number, offsetY?: number): void {
        this.game.locale.immediate((locale: Locale) => this.showHint(at, locale.localize(message), offsetX, offsetY));
    }

    /**
     * Hides the hint message.
     */
    hideHint(): void {
        this.hint.hide();
    }

    /* ============ PROMPT ============ */

    /**
     * Closes all prompt dialogs.
     */
    closePrompt(): void {
        this.promptCoin.close();
        this.promptError.close();
        this.promptIgloo.close();
        this.promptInput.close();
        this.promptOkay.close();
        this.promptQuestion.close();
        this.promptShop.close();
        this.promptSpinner.close();
        this.promptBlock.visible = false;
    }

    /* ============ END GAME ============ */

    /**
     * Displays the end game screen with the final score and game configuration data.
     * @param score The final score achieved in the game.
     * @param stamps The stamps earned during the game session.
     * @param gameData The configuration data for the game.
     */
    showEndGame(score: number, stamps: number[], gameData: GameConfig): void {
        this.closeEndGame();
        if (stamps.length == 0) {
            this.endGameNoStamps.setup(score, stamps, gameData);
            this.endGameNoStamps.visible = true;
        } else if (stamps.length == 1) {
            this.endGameCompleted.setup(score, stamps, gameData);
            this.endGameCompleted.visible = true;
        } else if (stamps.length == 2) {
            this.endGameNoNewStamps.setup(score, stamps, gameData);
            this.endGameNoNewStamps.visible = true;
        } else if (stamps.length == 3) {
            this.endGameProgress.setup(score, stamps, gameData);
            this.endGameProgress.visible = true;
        } else {
            this.endGameCongrats.setup(score, stamps, gameData);
            this.endGameCongrats.visible = true;
        }
        this.endGameBlock.visible = true;
    }

    /**
     * Hides the end game screen.
     */
    closeEndGame(): void {
        this.endGameProgress.visible = false;
        this.endGameCongrats.visible = false;
        this.endGameCompleted.visible = false;
        this.endGameNoNewStamps.visible = false;
        this.endGameNoStamps.visible = false;
        this.endGameBlock.visible = false;
    }

    /* ============ CONTENT ============ */

    public currentContent: Content;
    private _prevVisible: boolean;

    /**
     * Loads and shows dynamic content.
     * @param callback A promise that resolves to the content class to be loaded.
     * @param data Any additional data to be passed to the content class.
     */
    async loadContent(callback: () => Promise<ContentCls>, data?: any): Promise<void> {
        let load = this.loadScreen;
        try {
            this.closeContent();
            this.chat.locked = true;

            if (!load.isShowing) load.show({ mini: true });

            let contentCls = await callback();
            let contentScene = await new Promise<Content>(resolve => {
                this.scene.add('interface-content', contentCls, true, {
                    ...data,
                    oninit: (scene: Content) => load.track(new LoaderTask('Content loader', scene.load)),
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
                load.hide();
                return true;
            }, error.makeCode('c', error.LOAD_ERROR));

            logger.error('Content failed to load', e);
        }
    }

    /**
     * Closes the current content.
     */
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

    /**
     * Safely closes the current content.
     */
    safeCloseContent(): void {
        // ensure the pointerup event finishes before re-allowing room input
        setTimeout(() => this.closeContent(), 10);
    }

    /* ============ VISIBILITY ============ */

    get contentShowing(): boolean {
        return this.currentContent !== undefined || this.promptBlock.visible || this.endGameBlock.visible;
    }

    /**
     * Shows the interface.
     */
    show(): void {
        this.ui.visible = true;
        this.avatarOverlays.visible = true;
        this.chat.locked = false;
    }

    /**
     * Whether the interface is currently showing.
     */
    get isShowing(): boolean {
        return this.ui.visible;
    }

    /**
     * Hides the interface.
     * @param closeAll Whether to close all interface elements.
     */
    hide(closeAll = true): void {
        this.ui.visible = false;
        this.avatarOverlays.visible = false;
        if (closeAll) this.closeAll();
        this.chat.locked = true;
    }

    /**
     * Closes all interface elements.
     */
    closeAll(): void {
        this.closeNamecard();
        this.hideHint();
        this.closeContent();
        this.chat.value = '';
        this.closePrompt();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
