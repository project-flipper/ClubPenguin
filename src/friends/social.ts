import * as CP from "@clubpenguin/club_penguin";
import $ from "jquery";

export class Environment {
    static VERSION: '0.0.1'

    static DEBUG_CONFIG: string = "true";
    static DEBUG: boolean = true;
    static FRIENDS_BASE_URL: string = `${window.location.protocol}//${window.location.host}`;
    static CLUBPENGUIN_CONTENT_URL: string;
    static BOSH_PATH: string = "/friends/bind";
    static PRESENCE_LIMIT_CONFIG: string = "true";
    static PRESENCE_LIMIT: boolean = false;
    static PRESENCE_TIME_PERIOD: string = "120";
    static MAX_PRESENCE_UPDATES: string = "1";
    static DIMG_LOGGING_HOST: string = "log.data.disney.com";
    static DIMG_LOGGING_APP_ID: string = "cpfriends";
    static ROOMS_PATH: string = "/config/{0}/rooms.json";
    static WORLDS_PATH: string = "/config/{0}/worlds.json";
    static CHARACTERS_PATH: string = "/config/{0}/characters.json";
    static MASCOTS_PATH: string = "/config/{0}/mascots.json";
    static JUMP_STATUS_FOR_ROOMS_URL: string = `${window.location.protocol}//${window.location.host}/jump_world`;
    static JUMP_STATUS_POLLING_INTERVAL: number = 60000;
    static LANDS_PATH: string = "/config/{0}/lands.json";
    static MARKUP_PATH: string = "/config/markup.json";
    static TEXT_PATH: string = "/config/{0}/text.json";
    static IMAGES_PATH: string = "/config/images.json";
    static BEST_FRIENDS_ENABLED_THRESHHOLD: number = 10;

    static init(): void {
        if (DisneySocial.getUrlVar("debug") == undefined && this.DEBUG_CONFIG !== "true") {
            this.DEBUG = false;
        }
        if (this.PRESENCE_LIMIT_CONFIG == "true") {
            this.PRESENCE_LIMIT = true;
        }
        DisneySocial.debugMode = this.DEBUG;
    }

    static getAvatarUrl: ReturnType<import("@clubpenguin/net/airtower").Airtower['createAvatarUrlCallback']>
}

export class EventAbstract {
    private listeners: Record<string, Function[]>;
    private gameListeners: Record<string, string[]>;

    constructor() {
        this.listeners = {};
        this.gameListeners = {};
    }

    addListener(event: string, listener: Function): void {
        if (!event || typeof event !== 'string' || !listener || typeof listener !== 'function') {
            return;
        }
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        if (this.listeners[event].indexOf(listener) < 0) {
            this.listeners[event].push(listener);
        }
    }

    removeListener(event: string, listener: Function): void {
        if (!event || typeof event !== 'string' || !listener || typeof listener !== 'function' || !this.listeners[event]) {
            return;
        }
        const index = this.listeners[event].indexOf(listener);
        if (index >= 0) {
            this.listeners[event].splice(index, 1);
        }
    }

    addGameListener(event: string, namespace: string): void {
        if (this.gameListeners[event] == undefined) {
            this.gameListeners[event] = [];
        }
        if (this.gameListeners[event].indexOf(namespace) < 0) {
            this.gameListeners[event].push(namespace);
        }
    }

    updateListeners(event: string, ...args: any[]): boolean {
        if (!event || typeof event !== 'string') {
            return false;
        }
        if (this.listeners[event]) {
            for (const listener of this.listeners[event]) {
                try {
                    listener.apply(null, args);
                } catch (e) { }
            }
        }
        if (this.gameListeners && this.gameListeners[event]) {
            const safeArgs = args.map(arg => {
                switch (DisneySocial.typeOf(arg)) {
                    case "string":
                    case "boolean":
                    case "number":
                    case "array":
                        return arg;
                    default:
                        return arg.tagName ? arg : undefined;
                }
            }).filter(arg => arg !== undefined);

            for (const listener of this.gameListeners[event]) {
                try {
                    CP.friendsEventHandler(event, safeArgs);
                } catch (e) { }
            }
        }
        return true;
    }
}

export class SocialEvent {
    static LAND_CHANGE: string = "landChange";
    static ROOM_UPDATE: string = "roomUpdate";
    static EVENT_STOPPED: string = "eventStopped";
    private static eventManager: EventAbstract;

    static addListener(event: string, listener: Function): void {
        this.eventManager.addListener(event, listener);
    }

    static addGameListener(event: string, namespace: string): void {
        this.eventManager.addGameListener(event, namespace);
    }

    static initEventManager(): void {
        this.eventManager = new EventAbstract();
    }

    static updateListeners(event: string, ...args: any[]): void {
        this.eventManager.updateListeners(event, ...args);
    }
}

export class SocialAPI {
    static setCurrentLand(land: string): void {
        DisneySocial.setCurrentLand(land);
    }
}

export interface CharactersData {
    [key: string]: any;
}

export interface LandData {
    [key: string]: any;
}

export interface WorldData {
    [key: string]: any;
}

export interface RoomData {
    [key: string]: any;
}

export interface MascotData {
    [key: string]: any;
}

export class Data {
    static lands: LandData = {};
    static worlds: WorldData = {};
    static rooms: RoomData = {};
    static characters: CharactersData = {};
    static mascots: MascotData = {};

    static init(): void {
        const e = DisneySocial;
        const i = Environment;

        $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.CHARACTERS_PATH), {
            cache: true,
            dataType: "json",
            success: function (data: CharactersData) {
                Data.characters = data;
            }
        });

        $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.LANDS_PATH), {
            cache: true,
            dataType: "json",
            success: function (data: LandData) {
                Data.lands = data;
            }
        });

        $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.WORLDS_PATH), {
            cache: true,
            dataType: "json",
            success: function (data: WorldData) {
                Data.worlds = data;
            }
        });

        $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.ROOMS_PATH), {
            cache: true,
            dataType: "json",
            success: function (data: RoomData) {
                Data.rooms = data;
            }
        });

        $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.MASCOTS_PATH), {
            cache: true,
            dataType: "json",
            success: function (data: MascotData) {
                Data.mascots = data;
            }
        });
    }
}

export class DisneySocial {
    static Environment = Environment;
    static EventAbstract = EventAbstract;
    static Event = SocialEvent;
    static API = SocialAPI;
    static Data = Data;

    static debugMode: boolean = true;
    static currentLand: string = "disney:land:clubpenguin";
    static ieVer: number = 0;
    static pageLang: string = "en";

    /**
     * Initializes the social module.
     * 
     * This method sets up the necessary configurations for the social module,
     * including retrieving the page language and extending jQuery with a custom
     * `allData` function if jQuery is available.
     * 
     * The `allData` function retrieves all data associated with the first element
     * in the jQuery collection, utilizing jQuery's internal data cache.
     */
    static init(): void {
        this.getPageLang();
        if (typeof $ !== 'undefined') {
            ($.fn as any).allData = function () {
                const e = $.data(this.get(0));
                let cache = 'cache' in $ ? $.cache as Record<any, any> : {};
                return cache[e];
            };
        }
    }

    /**
     * Retrieves the language of the current page.
     * 
     * This method checks the `lang` attribute of the document's root element (`<html>`).
     * If the `lang` attribute is present and not empty, it converts it to lowercase and returns it.
     * Otherwise, it defaults to returning "en".
     * 
     * @returns The language of the current page in lowercase, or "en" if not specified.
     */
    static getPageLang(): string {
        let lang = "en";
        if (document.documentElement.lang && document.documentElement.lang !== "") {
            lang = document.documentElement.lang.toLowerCase();
        }
        this.pageLang = lang;
        return lang;
    }

    /**
     * Retrieves a DOM element associated with a specific land.
     * @param elementId The ID of the element to retrieve. If not provided, the current land ID is used.
     * @returns The corresponding HTMLElement if found, otherwise null.
     */
    static getLandDOMElement(elementId?: string): HTMLElement {
        elementId = elementId || DisneySocial.currentLand;
        if (elementId == undefined) {
            return;
        }
        return document.querySelector(`.${elementId.replace(/(:|\.)/g, "_")}_player`);
    }

    static setCurrentLand(land?: string): void {
        if (land == undefined) {
            delete DisneySocial.currentLand;
        } else {
            DisneySocial.currentLand = land;
        }
        SocialEvent.updateListeners(SocialEvent.LAND_CHANGE, land);
    }

    static getUrl(...args: any[]): string {
        let path: string;
        let versionSuffix: string | boolean = args[args.length - 1];
        const hasVersionSuffix = typeof versionSuffix === "boolean";

        if (hasVersionSuffix) {
            versionSuffix = "";
            args.pop();
        } else {
            versionSuffix = `?v=${Environment.VERSION}`;
        }

        if (args.length === 1) {
            path = `${Environment.FRIENDS_BASE_URL}/${args[0]}`;
        } else {
            path = `${args[0]}${args[1]}`;
        }

        return `${path}${versionSuffix}`;
    }

    static getUrlForLanguage(...args: any[]): string {
        if (args.length == 1) {
            return this.getUrl(args[0].replace(/\{0\}/g, DisneySocial.pageLang));
        } else {
            return this.getUrl(args[0], args[1].replace(/\{0\}/g, DisneySocial.pageLang));
        }
    }

    static getJavascriptSafeUrl(url: string): string {
        return `${location.protocol}//${location.hostname}:${location.port}${url}?v=${Environment.VERSION}`;
    }

    static getUrlVars(): Record<string, string> {
        const vars: Record<string, string> = {};
        const parts = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        for (const part of parts) {
            const [key, value] = part.split("=");
            vars[key] = value;
        }
        return vars;
    }

    static getUrlVar(key: string): string | undefined {
        return this.getUrlVars()[key];
    }

    static logDebug(): void { }

    static log(msg: any): void {
        if (typeof console !== 'undefined') {
            console.info(msg);
        }
    }

    static logWarn(msg: any): void {
        if (typeof console !== 'undefined') {
            console.warn(msg);
        }
    }

    static logError(msg: any): void {
        if (typeof console !== 'undefined') {
            if (typeof console.trace == 'function') {
                console.trace();
            }
            if (msg) {
                console.error("Error: ", msg, msg.name, msg.message);
            } else {
                console.error("Undefined error.");
            }
        }
    }

    static typeOf(obj: any): string {
        let typeOf: string = typeof obj;
        if (typeOf == "object") {
            if (obj) {
                if (obj instanceof Array) {
                    typeOf = "array";
                }
            } else {
                typeOf = "null";
            }
        }
        return typeOf;
    }

    /**
     * Checks if the given value is numeric.
     * @param obj The value to check.
     * @returns `true` if the value is numeric, otherwise `false`.
     */
    static isNumeric(obj: any): boolean {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    }

    /**
     * Checks if the provided value is a finite number.
     * @param obj The value to check.
     * @returns `true` if the value is a finite number, otherwise `false`.
     */
    static isNumber(obj: any): boolean {
        return typeof obj == "number" && isFinite(obj);
    }

    static isValidSwid(swid: any): boolean {
        return swid != null && swid !== "";
    }

    /**
     * Checks if the argument at the specified index is undefined. If it is,
     * schedules a callback to be executed after a short delay with the arguments
     * provided and an additional `true` value appended to the end.
     * @param index The index of the argument to check.
     * @param context The context (`this` value) to use when calling the callback.
     * @param callback The function to call if the argument is undefined.
     * @param args An object containing the arguments to pass to the callback.
     * @returns `true` if the argument at the specified index is undefined and the callback is scheduled; otherwise, `false`.
     */
    static shortCircuit(index: number, context: any, callback: Function, args: { [index: number]: any }): boolean {
        if (args[index] === undefined) {
            setTimeout(() => {
                const callbackArgs = Array.prototype.slice.call(args, 0);
                callbackArgs.push(true);
                callback.apply(context, callbackArgs);
            }, 5);
            return true;
        }
        return false;
    }

    /**
     * Augments JavaScript built-in types.
     * @depracated This method is not needed in TypeScript.
     */
    static augmentTypes(): void {
        // Should not be needed in TypeScript
    }

    static stopEvent(event: Event | JQuery.Event): void {
        if (event.cancelable) {
            event.preventDefault();
        }
        event.stopImmediatePropagation();
        if (SocialEvent) {
            SocialEvent.updateListeners(SocialEvent.EVENT_STOPPED, event);
        }
    }

    static unbindAll(element: JQuery.Selector | HTMLElement | JQuery): boolean {
        if (!element) {
            return false;
        }
        $(element as JQuery.Selector).off().find("*").each(function () {
            $(this).off();
        });
        return true;
    }
}
