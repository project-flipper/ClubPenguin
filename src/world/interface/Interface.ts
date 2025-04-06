export interface Content extends Phaser.Scene {
    unload(interface_: Interface): void;
    hidesInterface?: boolean
    aboveInterface?: boolean
}

export interface ContentCls {
    new(): Content;
}

export interface UI extends Phaser.GameObjects.Layer {
    snowballCrosshairActive: boolean;
    chatValue: string;
    openNamecard(data: UserData): void;
    openMyNamecard(): void;
    isNamecardOpen(): boolean;
    isPlayerNamecardOpen(): boolean;
    closeNamecard(): void;
    updateUser(user: AnyUserData): void;
    repositionNamecard(x: number, y: number): void;
    tick(time: number, delta: number): void;
    lock(): void;
    unlock(): void;
    localize(locale: Locale): void;
    unload(interface_: Interface): void;
}

export interface UICls {
    new(scene: Interface): UI;
    preload(scene: Phaser.Scene): void;
}

/* START OF COMPILED CODE */

import InputBlocker from "../../lib/components/InputBlocker";
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
import { AnyUserData, UserData } from "@clubpenguin/net/types/user";
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

        // uiHolder
        const uiHolder = this.add.layer();

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

        // endGameBlock (components)
        new InputBlocker(endGameBlock);

        // promptBlock (components)
        new InputBlocker(promptBlock);

        this.avatarOverlays = avatarOverlays;
        this.uiHolder = uiHolder;
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

        this.events.emit("scene-awake");
    }

    public avatarOverlays!: Phaser.GameObjects.Layer;
    public uiHolder!: Phaser.GameObjects.Layer;
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

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
        if (data.oninit) data.oninit(this);
    }

    public ui: UI;

    async importUI(path: string): Promise<UICls> {
        return (await import(/* webpackInclude: /\.ts$/ */`@clubpenguin/world/ui/${path}`)).default as UICls;
    }

    async loadUI(path: string): Promise<void> {
        logger.info('Loading UI', path);
        this.removeUI();

        let ui = await this.importUI(path);

        let task = this.loadScreen.track(new LoaderTask('UI loader', this.load));
        this.load.pack('ui-pack', 'assets/world/ui/2014/ui-pack.json');
        this.load.on('loaderror', console.error);
        this.load.start();
        logger.info('Waiting on UI assets');
        await task.wait();

        this.ui = new ui(this);
        this.uiHolder.add(this.ui);
        this.game.locale.register(this.ui.localize, this.ui);
        logger.info('UI ready');
    }

    removeUI(): void {
        if (!this.ui) return;

        this.ui.unload(this);
        this.ui.destroy();
        this.ui = undefined;
    }

    public quickKeys = false;

    public emoji0: Phaser.Input.Keyboard.KeyCombo;
    public emoji1: Phaser.Input.Keyboard.KeyCombo;
    public emoji2: Phaser.Input.Keyboard.KeyCombo;
    public emoji3: Phaser.Input.Keyboard.KeyCombo;
    public emoji4: Phaser.Input.Keyboard.KeyCombo;
    public emoji5: Phaser.Input.Keyboard.KeyCombo;
    public emoji6: Phaser.Input.Keyboard.KeyCombo;
    public emoji7: Phaser.Input.Keyboard.KeyCombo;
    public emoji8: Phaser.Input.Keyboard.KeyCombo;
    public emoji9: Phaser.Input.Keyboard.KeyCombo;
    public emojiF: Phaser.Input.Keyboard.KeyCombo;
    public emojiG: Phaser.Input.Keyboard.KeyCombo;
    public emojiH: Phaser.Input.Keyboard.KeyCombo;
    public emojiP: Phaser.Input.Keyboard.KeyCombo;
    public emojiM: Phaser.Input.Keyboard.KeyCombo;
    public emojiL: Phaser.Input.Keyboard.KeyCombo;
    public emojiC: Phaser.Input.Keyboard.KeyCombo;
    public emojiT: Phaser.Input.Keyboard.KeyCombo;
    public fullscreen: Phaser.Input.Keyboard.KeyCombo;

    create(data: any) {

        this.editorCreate();

        this.engine.on('room:load', () => this.quickKeys = true);
        this.engine.on('room:unload', () => {
            this.quickKeys = false;
            this.closeAll();
            this.clearAvatarOverlays();
        });

        this.emoji1 = this.input.keyboard.createCombo('e1', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji2 = this.input.keyboard.createCombo('e2', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji3 = this.input.keyboard.createCombo('e3', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji4 = this.input.keyboard.createCombo('e4', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji5 = this.input.keyboard.createCombo('e5', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji6 = this.input.keyboard.createCombo('e6', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji7 = this.input.keyboard.createCombo('e7', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji8 = this.input.keyboard.createCombo('e8', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji9 = this.input.keyboard.createCombo('e9', { resetOnWrongKey: true, resetOnMatch: true });
        this.emoji0 = this.input.keyboard.createCombo('e0', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiF = this.input.keyboard.createCombo('ef', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiG = this.input.keyboard.createCombo('eg', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiH = this.input.keyboard.createCombo('eh', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiP = this.input.keyboard.createCombo('ep', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiM = this.input.keyboard.createCombo('em', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiL = this.input.keyboard.createCombo('el', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiC = this.input.keyboard.createCombo('ec', { resetOnWrongKey: true, resetOnMatch: true });
        this.emojiT = this.input.keyboard.createCombo('et', { resetOnWrongKey: true, resetOnMatch: true });
        this.fullscreen = this.input.keyboard.createCombo([Phaser.Input.Keyboard.KeyCodes.CTRL, Phaser.Input.Keyboard.KeyCodes.SHIFT, Phaser.Input.Keyboard.KeyCodes.ENTER], { resetOnWrongKey: true, resetOnMatch: true });

        this.input.keyboard.on('keydown', this.keydownHandler, this);
        this.input.keyboard.on('keycombomatch', this.processEmojiCombo, this);

        this.game.locale.register(this.localize, this);
        this.events.on('shutdown', this.stop, this);

        this.loadUI(data.ui).then(() => data.onready && data.onready(this));
    }

    stop(): void {
        this.removeUI();
        this.input.keyboard.off('keydown', this.keydownHandler, this);
        this.input.keyboard.off('keycombomatch', this.processEmojiCombo, this);

        this.game.locale.unregister(this.localize);
        this.game.unloadAssetPack('interface-pack');
    }

    get world(): World {
        return this.scene.get('World') as World;
    }

    get engine(): Engine {
        return this.world?.engine;
    }

    get loadScreen(): Load {
        return this.scene.get('Load') as Load;
    }

    localize(locale: Locale): void {

    }

    /**
     * If the snowball crosshair is visible, updates its position to the current pointer position.
     * If any namecard is visible, updates the photo mask position to the other namecard's position.
     * @param time The current time.
     * @param delta The delta time in ms since the last frame.
     */
    update(time: number, delta: number): void {
        if (this.ui) this.ui.tick(time, delta);
    }

    /**
     * Shorthand method to show the map.
     */
    showMap(): void {
        this.loadContent('map', async () => (await import('@clubpenguin/world/content/map/Map')).default);
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
        let moving = this.world.engine.player.actions.isMoving;
        switch (event.key) {
            case 'ArrowDown':
                if (!moving) this.world.sitDown();
                handled = true;
                break;
            case 'ArrowLeft':
                if (!moving) this.world.sitLeft();
                handled = true;
                break;
            case 'ArrowUp':
                if (!moving) this.world.sitUp();
                handled = true;
                break;
            case 'ArrowRight':
                if (!moving) this.world.sitRight();
                handled = true;
                break;
            case 'Enter':
                this.sendMessage();
                handled = true;
                break;
            case 'w':
                if (!moving) this.world.wave();
                handled = true;
                break;
            case 's':
                if (!moving) this.world.sit(this.input.activePointer.worldX, this.input.activePointer.worldY);
                handled = true;
                break;
            case 'd':
                if (!moving) this.world.dance();
                handled = true;
                break;
            case 't':
                // Prioritize combo
                let delta = this.game.now() - this.lastFart;
                if (delta < 1) return;
                if (this.ui) this.ui.snowballCrosshairActive = true;
                handled = true;
                break;
            case 'j':
                let joke = Phaser.Math.RND.between(0, this.game.gameConfig.jokes.length);
                this.world.sendJoke(joke);
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
            this.world.resetInactivityTimer();
    
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

        this.world.resetInactivityTimer();

        switch (combo) {
            case this.emoji1:
                this.world.sendEmoji(Emoji.LAUGHING);
                break;
            case this.emoji2:
                this.world.sendEmoji(Emoji.HAPPY);
                break;
            case this.emoji3:
                this.world.sendEmoji(Emoji.INDIFFERENT);
                break;
            case this.emoji4:
                this.world.sendEmoji(Emoji.SAD);
                break;
            case this.emoji5:
                this.world.sendEmoji(Emoji.SURPRISED);
                break;
            case this.emoji6:
                this.world.sendEmoji(Emoji.POKING_OUT_TONGUE);
                break;
            case this.emoji7:
                this.world.sendEmoji(Emoji.WINKING);
                break;
            case this.emoji8:
                this.world.sendEmoji(Emoji.SICK);
                break;
            case this.emoji9:
                this.world.sendEmoji(Emoji.MAD);
                break;
            case this.emoji0:
                this.world.sendEmoji(Emoji.UPSET);
                break;
            case this.emojiF:
                this.world.sendEmoji(Emoji.FLOWER);
                break;
            case this.emojiG:
                this.world.sendEmoji(Emoji.CONTROLLER);
                break;
            case this.emojiH:
                this.world.sendEmoji(Emoji.HEART);
                break;
            case this.emojiP:
                this.world.sendEmoji(Emoji.PUFFLE);
                break;
            case this.emojiM:
                this.world.sendEmoji(Emoji.COIN);
                break;
            case this.emojiL:
                this.world.sendEmoji(Emoji.SHAMROCK);
                break;
            case this.emojiC:
                this.world.sendEmoji(Emoji.COFFEE);
                break;
            case this.emojiT:
                this.world.sendEmoji(Emoji.TOOT);
                this.lastFart = this.game.now();
                break;
            case this.fullscreen:
                this.game.scale.toggleFullscreen();
                break;
        }
    }

    /**
     * Sends the current typed message in the chat.
     */
    sendMessage(): void {
        this.hideHint();

        if (!this.ui) return;

        let message = this.ui.chatValue;
        if (message.length > 0) {
            this.world.resetInactivityTimer();
    
            this.world.sendMessage(message);
            this.ui.chatValue = '';
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
        this.ui.openNamecard(data);
    }

    /**
     * Opens the player's namecard interface.
     */
    openMyNamecard(): void {
        this.ui.openMyNamecard();
    }

    /**
     * Checks if the namecard is currently open.
     * @returns Whether the namecard is open.
     */
    isNamecardOpen(): boolean {
        return this.ui.isNamecardOpen();
    }

    /**
     * Checks if the player's namecard is currently open.
     * @returns Whether the player's namecard is open.
     */
    isPlayerNamecardOpen(): boolean {
        return this.ui.isPlayerNamecardOpen();
    }

    /**
     * Closes the namecard.
     */
    closeNamecard(): void {
        this.ui.closeNamecard();
    }

    updateUser(data: AnyUserData): void {
        this.ui.updateUser(data);
    }

    repositionNamecard(x: number, y: number): void {
        this.ui.repositionNamecard(x, y);
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
        this.hideEndGame();
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
    hideEndGame(): void {
        this.endGameProgress.visible = false;
        this.endGameCongrats.visible = false;
        this.endGameCompleted.visible = false;
        this.endGameNoNewStamps.visible = false;
        this.endGameNoStamps.visible = false;
        this.endGameBlock.visible = false;
    }

    /**
     * Closes the end game screen and returns to the world.
     */
    closeEndGame(): void {
        this.hideEndGame();
        this.world.closeGame();
    }

    /* ============ CONTENT ============ */

    public currentPopup: Content;
    public currentContent: Content;
    public currentWindow: Content;
    private _prevVisible: boolean;

    /**
     * Loads and shows dynamic content.
     * @param name The name of the content to be loaded.
     * @param callback A promise that resolves to the content class to be loaded.
     * @param data Any additional data to be passed to the content class.
     */
    async loadContent(name: string, callback: () => Promise<ContentCls>, data?: any): Promise<void> {
        let load = this.loadScreen;
        try {
            this.closeContent();
            this.ui.lock();

            if (!load.isShowing) load.show({ mini: true });

            let contentCls = await callback();
            let contentScene = await new Promise<Content>(resolve => {
                this.scene.add('interface-content', contentCls, true, {
                    ...data,
                    oninit: (scene: Content) => {
                        load.track(new LoaderTask('Content loader', scene.load));
                        scene.scene.moveBelow('Interface');
                        if (scene.aboveInterface) scene.scene.moveAbove('Interface');
                    },
                    onready: (scene: Content) => resolve(scene)
                });
            });

            this.currentContent = contentScene;

            this.events.emit('contentload', this.currentContent);
            this.ui.lock();

            if (this.currentContent.hidesInterface) {
                if (this._prevVisible === undefined) this._prevVisible = this.isShowing;
                this.hide(false);
            }

            load.hide();
        } catch (e) {
            this.ui.unlock();
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
        this.ui.unlock();

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
        if (this.ui) {
            this.ui.visible = true;
            this.ui.unlock();
        }
        this.avatarOverlays.visible = true;
    }

    /**
     * Whether the interface is currently showing.
     */
    get isShowing(): boolean {
        return this.ui && this.ui.visible;
    }

    /**
     * Hides the interface.
     * @param closeAll Whether to close all interface elements.
     */
    hide(closeAll = true): void {
        if (this.ui) {
            this.ui.visible = false;
            this.ui.lock();
        }
        this.avatarOverlays.visible = false;
        if (closeAll) this.closeAll();
    }

    /**
     * Closes all interface elements.
     */
    closeAll(): void {
        this.closeNamecard();
        this.hideHint();
        this.closeContent();
        if (this.ui) this.ui.chatValue = '';
        this.closePrompt();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
