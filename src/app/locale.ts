import Phaser from "phaser";

import { App } from "@clubpenguin/app/app";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { getLogger } from "@clubpenguin/lib/log";
import { LoaderPlugin } from "./loader";

let logger = getLogger('CP.app.locale');

/**
 * Represents a supported game language by ID.
 */
export enum Language {
    EN = 1,
    PT = 2,
    FR = 3,
    ES = 4,
    DE = 5,
    RU = 6
}

/**
 * Converts an abbreviation string of a language to its {@link Language} value.
 * This is mainly used for backwards compatibility with the Flash client and playpage.
 * @param lang The language abbreviation
 * @returns The corresponding enum value.
 */
export function getLanguageByAbbreviation(lang: string): Language {
    switch (lang) {
        case 'en':
            return Language.EN;
        case 'pt':
            return Language.PT;
        case 'fr':
            return Language.FR;
        case 'es':
            return Language.ES;
        case 'de':
            return Language.DE;
        case 'ru':
            return Language.RU;
    }
}

export type LocaleTaskCallback = (locale: Locale) => any;
export type LocaleTask = {
    callback: LocaleTaskCallback,
    context?: any
};

export enum LocaleEvents {
    LANGUAGE_CHANGE = 'languagechange',
    DATA_LOADED = 'dataloaded'
}

/**
 * The game locale handler.
 */
export class Locale extends Phaser.Events.EventEmitter {
    public app: App;
    public data: { [domain: string]: { [key: string]: string } };

    public language: Language;
    public abbreviation: string;
    public bitmask: number;
    public string: string;
    public frame: string;

    private tasks: LocaleTask[];

    constructor(app: App, language: string) {
        super();

        this.app = app;
        this.tasks = [];

        this.setLanguage(language);
        this.on(LocaleEvents.DATA_LOADED, this.runTasks, this);
    }

    /**
     * Sets the current locale.
     * This function only signals a language change but will have no effect until {@link Locale.load} is called.
     * @param lang The language abbreviation.
     */
    setLanguage(lang: string): void {
        this.language = getLanguageByAbbreviation(lang);
        this.abbreviation = this.getLanguageAbbreviation(this.language);
        this.bitmask = this.getLanguageBitmask(this.language);
        this.string = this.getLanguageString(this.language);
        this.frame = this.getLanguageFrame(this.language);

        logger.info('Language set to', lang);

        this.emit(LocaleEvents.LANGUAGE_CHANGE, this.language);
    }

    /**
     * Returns the string representation of a language.
     * @param lang The language value.
     * @returns The corresponding abbreviation.
     */
    getLanguageAbbreviation(lang: Language): string {
        switch (lang) {
            case Language.EN:
                return 'en';
            case Language.PT:
                return 'pt';
            case Language.FR:
                return 'fr';
            case Language.ES:
                return 'es';
            case Language.DE:
                return 'de';
            case Language.RU:
                return 'ru';
        }
    }

    /**
     * Returns the bitmask value of a language.
     * @param lang The language value.
     * @returns The corresponding bitmask.
     */
    getLanguageBitmask(lang: Language): number {
        switch (lang) {
            case Language.EN:
                return 1;
            case Language.PT:
                return 2;
            case Language.FR:
                return 4;
            case Language.ES:
                return 8;
            case Language.DE:
                return 32;
            case Language.RU:
                return 64;
        }
    }

    /**
     * Returns the animation frame associated with a language.
     * @param lang The language value.
     * @returns The corresponding frame string.
     */
    getLanguageFrame(lang: Language): string {
        return lang.toString().padStart(4, '0');
    }

    /**
     * Returns the full language string representation.
     * @param lang The language value.
     * @returns The corresponding language string.
     */
    getLanguageString(lang: Language): string {
        switch (lang) {
            case Language.EN:
                return 'en_US';
            case Language.PT:
                return 'pt_BR';
            case Language.FR:
                return 'fr_FR';
            case Language.ES:
                return 'es_LA';
            case Language.DE:
                return 'de_DE';
            case Language.RU:
                return 'ru_RU';
        }
    }

    /**
     * Loads the locale.
     * Upon success, any localization tasks registered will be called to produce localization changes.
     */
    async load(): Promise<void> {
        let load = this.app.scene.getScene('Load') as Load;
        let loader = load.load;
        let cache = load.cache;
        load.track(new LoaderTask('Locale loader', loader));

        let key = `locale-${this.abbreviation}`
        if (cache.json.exists(key)) cache.json.remove(key);

        loader.json(key, this.app.airtower.getAbsoluteUrl(`/web_service/${this.abbreviation}/game_strings.json`, { v: LoaderPlugin.cacheVersion }))

        logger.info('Loading locale');
        loader.start();
        await load.waitAllTasksComplete();
        if (loader.totalFailed > 0) throw new Error(`Locale files failed to load! ${loader.totalFailed} failed out of ${loader.totalToLoad}`);

        this.data = cache.json.get(key);
        logger.info('Locale received');
        this.emit(LocaleEvents.DATA_LOADED, this.data);
    }

    /**
     * 
     * @param key The string key.
     * @param domain The domain the category is in.
     * @returns The localized string if found, otherwise returned as a placeholder.
     */
    localize(key: string, domain = 'lang'): string {
        return (domain in this.data && this.data[domain][key]) ?? `**${key}**`;
    }

    /**
     * Runs all callbacks registered for localization.
     * You should not call this manually, instead let {@link Locale.load} signal locale changes.
     */
    private runTasks(): void {
        if (!this.data) return;

        for (let task of this.tasks) {
            try {
                task.callback.call(task.context, this);
            } catch (e) {
                logger.error('Localization task threw an error!', e);
            }
        }
    }

    /**
     * If the locale has been loaded, immediately call this callback.
     * If no locale has been loaded, schedule this callback once.
     * @param callback The callback to register.
     * @param context The context to call this task with.
     */
    immediate(callback: LocaleTaskCallback, context?: any): void {
        context = context ?? this;

        if (this.data) {
            try {
                callback.call(context, this);
            } catch (e) {
                logger.error('Localization task threw an error!', e);
            }
        } else {
            this.once(LocaleEvents.DATA_LOADED, () => callback.call(context, this));
        }
    }

    /**
     * Registers a callback for locale changes.
     * If the locale has been loaded, immediately call this callback.
     * Upon any locale changes, this callback will be called again as needed.
     * @param callback The callback to register.
     * @param context The context to call this task with.
     */
    register(callback: LocaleTaskCallback, context?: any): void {
        context = context ?? this;

        if (!this.isRegistered(callback)) this.tasks.push({ callback: callback, context });
        if (this.data) {
            try {
                callback.call(context, this);
            } catch (e) {
                logger.error('Localization task threw an error!', e);
            }
        }
    }

    /**
     * Checks whether a callback is currently registered for locale changes.
     * @param callback The callback to check for.
     * @returns Whether it is currently registered.
     */
    isRegistered(callback: LocaleTaskCallback): boolean {
        for (let i = 0; i < this.tasks.length; i++) {
            let item = this.tasks[i];
            if (item.callback == callback) return true;
        }
        return false;
    }

    /**
     * Removes a callback from further calls from locale changes.
     * @param callback The callback to unregister.
     * @returns Whether unregistering the callback was successful.
     */
    unregister(callback: LocaleTaskCallback): boolean {
        for (let i = 0; i < this.tasks.length; i++) {
            let item = this.tasks[i];

            if (item.callback == callback) {
                this.tasks.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
