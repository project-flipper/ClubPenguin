export type CPErrorSize = { w: number, h: number };

export type CPErrorType = 'c' | 's';

export type CPErrorData = {
    size: CPErrorSize,
    message: string,
    buttonLabel: string,
    buttonCallback: () => boolean,
    type: CPErrorType,
    code: number,
    localized?: boolean
};

export class CPError extends Error {
    public size: CPErrorSize;
    public message: string;
    public buttonLabel: string;
    public buttonCallback: () => boolean;
    public type: CPErrorType;
    public code: number;
    public localized?: boolean;

    constructor(data: CPErrorData) {
        super('This error object should be raised inside ErrorArea.shield');

        this.size = data.size;
        this.message = data.message;
        this.buttonLabel = data.buttonLabel;
        this.buttonCallback = data.buttonCallback;
        this.type = data.type;
        this.code = data.code;
        this.localized = data.localized ?? false;
    }
}

/* START OF COMPILED CODE */

import InputBlocker from "../lib/ui/components/InputBlocker";
import TextBox from "../lib/ui/TextBox";
import ButtonComponent from "../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import { App } from "./app";
import { HTTPError } from "@clubpenguin/net/airtower";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.app.error');
/* END-USER-IMPORTS */

export default class ErrorArea extends Phaser.Scene {

    constructor() {
        super("ErrorArea");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    _preload(): void {

        this.load.pack("app-pack", "assets/app/app-pack.json");
    }

    editorCreate(): void {

        // cover
        const cover = this.add.rectangle(0, 0, 1710, 1080);
        cover.setOrigin(0, 0);
        cover.isFilled = true;
        cover.fillColor = 0;
        cover.fillAlpha = 0.4;

        // errorWindow
        const errorWindow = this.add.container(0, 0);

        // body
        const body = this.add.nineslice(0, -30.2625, "app", "app/error", 796.5, 528.525, 46, 46, 46, 46);
        body.setOrigin(0, 0);
        errorWindow.add(body);

        // message
        const message = new TextBox(this, 58.5, 18, "BurbankSmallMedium");
        message.text = " Error Message\n Error Message\n Error Message\n Error Message\n Error Message\n Error Message";
        message.fontSize = -36;
        message.align = 0;
        errorWindow.add(message);

        // buttonContainer
        const buttonContainer = this.add.container(216, 333);
        errorWindow.add(buttonContainer);

        // button
        const button = this.add.image(0, 0, "app", "app/button");
        button.setOrigin(0, 0);
        buttonContainer.add(button);

        // buttonLabel
        const buttonLabel = new TextBox(this, 37.4625, 28.6875, "BurbankSmallBold");
        buttonLabel.text = "Ok";
        buttonLabel.fontSize = -45;
        buttonLabel.align = 1;
        buttonContainer.add(buttonLabel);

        // code
        const code = new TextBox(this, 38.25, 427.5, "BurbankSmallMedium");
        code.tintFill = true;
        code.tintTopLeft = 9976322;
        code.tintTopRight = 9976322;
        code.tintBottomLeft = 9976322;
        code.tintBottomRight = 9976322;
        code.text = "c0";
        code.fontSize = -22.5;
        code.align = 2;
        errorWindow.add(code);

        // cover (components)
        new InputBlocker(cover);

        // message (prefab fields)
        message.boxWidth = 686.25;
        message.boxHeight = 290.7;
        message.horizontalAlign = 1;
        message.verticalAlign = 1;

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.upTexture = {"key":"app","frame":"app/button"};
        buttonButtonComponent.overTexture = {"key":"app","frame":"app/buttonHover"};
        buttonButtonComponent.downTexture = {"key":"app","frame":"app/buttonDown"};
        buttonButtonComponent.handCursor = true;

        // buttonLabel (prefab fields)
        buttonLabel.boxWidth = 282.2625;
        buttonLabel.boxHeight = 63;
        buttonLabel.verticalAlign = 1;

        // code (prefab fields)
        code.boxWidth = 729;
        code.boxHeight = 38.7;
        code.horizontalAlign = 2;
        code.verticalAlign = 1;

        this.cover = cover;
        this.body = body;
        this.message = message;
        this.button = button;
        this.buttonLabel = buttonLabel;
        this.buttonContainer = buttonContainer;
        this.code = code;
        this.errorWindow = errorWindow;

        this.events.emit("scene-awake");
    }

    public cover!: Phaser.GameObjects.Rectangle;
    public body!: Phaser.GameObjects.NineSlice;
    public message!: TextBox;
    public button!: Phaser.GameObjects.Image;
    public buttonLabel!: TextBox;
    public buttonContainer!: Phaser.GameObjects.Container;
    public code!: TextBox;
    public errorWindow!: Phaser.GameObjects.Container;

    /* START-USER-CODE */

    declare game: App;

    public WINDOW_SMALL = { w: 796.5, h: 450 };
    public WINDOW_MEDIUM = { w: 796.5, h: 540 };
    public WINDOW_LARGE = { w: 796.5, h: 585 };
    public WINDOW_EXTRA_LARGE = { w: 1035, h: 630 };

    create(data: any): void {

        this.editorCreate();

        this.hide();

        if (data.onready) data.onready(this);
    }

    showError(size: CPErrorSize = this.WINDOW_SMALL, message: string, buttonLabel: string, buttonCallback: () => boolean, code: string): void {
        logger.info('Showing game error');

        this.body.width = size.w;
        this.body.height = size.h;

        this.errorWindow.x = 855 - (this.body.width / 2);
        this.errorWindow.y = 540 - (this.body.height / 2);

        this.message.text = message;

        this.message.boxWidth = this.body.width - 90;
        this.message.x = (this.body.width / 2) - (this.message.width / 2);
        this.message.y = ((this.body.height - this.button.height) / 2) - (this.message.height / 2);

        this.code.text = code;

        this.code.x = (this.body.width - 27) - this.code.width;
        this.code.y = this.body.height - 85.5;

        this.buttonContainer.x = (this.body.width / 2) - (this.button.width / 2);
        this.buttonContainer.y = this.body.height - 180;

        this.buttonLabel.text = buttonLabel;

        this.button.off('release');
        this.button.on('release', () => { if (buttonCallback()) this.hide(); });

        this.cover.visible = true;
        this.errorWindow.visible = true;
    }

    show(error: CPErrorData): void {
        this.showError(error.size, error.message, error.buttonLabel, error.buttonCallback, this.makeCode(error.type, error.code));
    }

    hide(): void {
        this.cover.visible = false;
        this.errorWindow.visible = false;

        this.button.off('release');
    }

    /* CODE */

    makeCode(type: CPErrorType, code: number): string {
        return `${type}${code}`
    }

    public DEFAULT_ERROR = -1;
    public CONNECTION_LOST = 1;
    public TIME_OUT = 2;
    public MULTI_CONNECTIONS = 3;
    public DISCONNECT = 4;
    public KICK = 5;
    public CONNECTION_NOT_ALLOWED = 6;
    public NAME_NOT_FOUND = 100;
    public PASSWORD_WRONG = 101;
    public SERVER_FULL = 103;
    public OLD_SALT_ERROR = 104;
    public PASSWORD_REQUIRED = 130;
    public PASSWORD_SHORT = 131;
    public PASSWORD_LONG = 132;
    public NAME_REQUIRED = 140;
    public NAME_SHORT = 141;
    public NAME_LONG = 142;
    public LOGIN_FLOODING = 150;
    public PLAYER_IN_ROOM = 200;
    public ROOM_FULL = 210;
    public GAME_FULL = 211;
    public ROOM_CAPACITY_RULE = 212;
    public ROOM_DOES_NOT_EXIST = 213;
    public ALREADY_OWN_INVENTORY_ITEM = 400;
    public NOT_ENOUGH_COINS = 401;
    public MAX_FURNITURE_ITEMS = 403;
    public MAX_PUFFLECARE_ITEMS = 406;
    public MAX_PUFFLEHAT_ITEMS = 407;
    public ALREADY_OWN_SUPERPLAY_ITEM = 408;
    public MAX_CJ_MATS = 409;
    public ITEM_NOT_EXIST = 402;
    public ITEM_NOT_AVAILABLE = 410;
    public NOT_ENOUGH_MEDALS = 405;
    public NAME_NOT_ALLOWED = 441;
    public IGLOO_PUFFLE_LIMIT = 443;
    public MAX_PUFFLE_LIMIT = 440;
    public ALREADY_OWN_IGLOO = 500;
    public ALREADY_OWN_FLOOR = 501;
    public ALREADY_OWN_LOCATION = 502;
    public BAN_DURATION = 601;
    public BAN_AN_HOUR = 602;
    public BAN_FOREVER = 603;
    public AUTO_BAN = 610;
    public HACKING_AUTO_BAN = 611;
    public GAME_CHEAT = 800;
    public ACCOUNT_NOT_ACTIVATE = 900;
    public BUDDY_LIMIT = 901;
    public PLAY_TIME_UP = 910;
    public OUT_PLAY_TIME = 911;
    public GROUNDED = 913;
    public PLAY_TIME_ENDING = 914;
    public PLAY_HOURS_ENDING = 915;
    public PLAY_HOURS_UP = 916;
    public PLAY_HOURS_HASNT_START = 917;
    public PLAY_HOURS_UPDATE = 918;
    public SYSTEM_REBOOT = 990;
    public NOT_MEMBER = 999;
    public NO_DB_CONNECTION = 1000;
    public NO_SOCKET_CONNECTION = 10001;
    public TIMEOUT = 10002;
    public PASSWORD_SAVE_PROMPT = 10003;
    public SOCKET_LOST_CONNECTION = 10004;
    public LOAD_ERROR = 10005;
    public MAX_IGLOO_FURNITURE_ERROR = 10006;
    public MULTIPLE_CONNECTIONS = 10007;
    public CONNECTION_TIMEOUT = 10008;
    public MAX_STAMPBOOK_COVER_ITEMS = 10009;
    public WEB_SERVICE_LOAD_ERROR = 10010;
    public WEB_SERVICE_SEND_ERROR = 10011;
    public CHROME_MAC_LOGIN_ERROR = 10104;
    public REDEMPTION_CONNECTION_LOST = 20001;
    public REDEMPTION_ALREADY_HAVE_ITEM = 20002;
    public REDEMPTION_SERVER_FULL = 20103;
    public NAME_REQUIRED_REDEMPTION = 20140;
    public NAME_SHORT_REDEMPTION = 20141;
    public PASSWORD_REQUIRED_REDEMPTION = 20130;
    public PASSWORD_SHORT_REDEMPTION = 20131;
    public REDEMPTION_BOOK_ID_NOT_EXIST = 20710;
    public REDEMPTION_BOOK_ALREADY_REDEEMED = 20711;
    public REDEMPTION_WRONG_BOOK_ANSWER = 20712;
    public REDEMPTION_BOOK_TOO_MANY_ATTEMPTS = 20713;
    public REDEMPTION_CODE_NOT_FOUND = 20720;
    public REDEMPTION_CODE_ALREADY_REDEEMED = 20721;
    public REDEMPTION_TOO_MANY_ATTEMPTS = 20722;
    public REDEMPTION_CATALOG_NOT_AVAILABLE = 20723;
    public REDEMPTION_NO_EXCLUSIVE_REDEEMS = 20724;
    public REDEMPTION_CODE_GROUP_REDEEMED = 20725;
    public REDEMPTION_CODE_EXPIRED = 20726;
    public REDEMPTION_PUFFLES_MAX = 20730;
    public REDEMPTION_PUFFLE_INVALID = 21700;
    public REDEMPTION_PUFFLE_CODE_MAX = 21701;
    public REDEMPTION_CODE_TOO_SHORT = 21702;
    public REDEMPTION_CODE_TOO_LONG = 21703;
    public GOLDEN_CODE_NOT_READY = 21704;
    public REDEMPTION_PUFFLE_NAME_EMPTY = 21705;

    async shield<T>(func: Promise<T> | (() => T), err_func?: (e: any) => Partial<CPErrorData> | undefined): Promise<{ ok: boolean, result: Awaited<T> }> {
        try {
            let promise: Promise<T>;

            if (typeof func === 'function') promise = Promise.resolve(func());
            else promise = Promise.resolve(func);

            return { ok: true, result: await promise };
        } catch (e) {
            let error: CPErrorData;
            try {
                error = err_func ? this.createError(err_func(e)) : this.inferError(e);
            } catch (_) {
                throw e;
            }

            this.show(error);

            return { ok: false, result: undefined }
        }
    }

    createError(data?: Partial<CPErrorData>): CPErrorData {
        return this.localize({
            size: data?.size ?? this.WINDOW_SMALL,
            message: data?.message ?? 'shell.DEFAULT_ERROR',
            buttonLabel: data?.buttonLabel ?? 'Okay',
            buttonCallback: data?.buttonCallback ?? (() => true),
            type: data?.type ?? 'c',
            code: data?.code ?? this.DEFAULT_ERROR,
            localized: data?.localized ?? false
        });
    }

    localize(e: CPErrorData): CPErrorData {
        if (e.localized) return e;

        let copy = { ...e };
        copy.message = this.game.locale.localize(e.message, 'error_lang');
        copy.buttonLabel = this.game.locale.localize(e.buttonLabel);
        copy.localized = true;
        return copy;
    }

    inferError(e: any): CPErrorData {
        if (e instanceof CPError) {
            return this.localize(e);
        } else if (e instanceof HTTPError) {
            return this.createError();
        } else {
            this.createError();
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
