import Phaser from "phaser";

import { App } from "@clubpenguin/app/app";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.app.locale');

export enum Language {
    EN = 1,
    PT = 2,
    FR = 3,
    ES = 4,
    DE = 5,
    RU = 6
}

// compat
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

    setLanguage(lang: string): void {
        this.language = getLanguageByAbbreviation(lang);
        this.abbreviation = this.getLanguageAbbreviation(this.language);
        this.bitmask = this.getLanguageBitmask(this.language);
        this.string = this.getLanguageString(this.language);
        this.frame = this.getLanguageFrame(this.language);

        logger.info('Language set to', lang);

        this.emit(LocaleEvents.LANGUAGE_CHANGE, this.language);
    }

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

    getLanguageFrame(lang: Language): string {
        return lang.toString().padStart(4, '0');
    }

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

    async load(): Promise<void> {
        let load = this.app.scene.getScene('Load') as Load;
        let loader = load.load;
        let cache = load.cache;
        load.track(new LoaderTask('Locale loader', loader));

        let key = `locale-${this.abbreviation}`
        if (cache.json.exists(key)) cache.json.remove(key);

        loader.json(key, `config/${this.abbreviation}/game_strings.json`)

        logger.info('Loading locale');
        loader.start();
        await load.waitAllTasksComplete();
        if (loader.totalFailed > 0) throw new Error(`Locale files failed to load! ${loader.totalFailed} failed out of ${loader.totalToLoad}`);

        this.data = cache.json.get(key);
        logger.info('Locale received');
        this.emit(LocaleEvents.DATA_LOADED, this.data);
    }

    localize(key: string, domain = 'lang'): string {
        return this.data[domain][key] ?? key;
    }

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

    immediate(task: LocaleTaskCallback, context?: any): void {
        context = context ?? this;

        if (this.data) {
            try {
                task.call(context, this);
            } catch (e) {
                logger.error('Localization task threw an error!', e);
            }
        } else {
            this.once(LocaleEvents.DATA_LOADED, () => task.call(context, this));
        }
    }

    register(task: LocaleTaskCallback, context?: any): void {
        context = context ?? this;

        if (!this.isRegistered(task)) this.tasks.push({ callback: task, context });
        if (this.data) {
            try {
                task.call(context, this);
            } catch (e) {
                logger.error('Localization task threw an error!', e);
            }
        }
    }

    isRegistered(task: LocaleTaskCallback): boolean {
        for (let i = 0; i < this.tasks.length; i++) {
            let item = this.tasks[i];
            if (item.callback == task) return true;
        }
        return false;
    }

    unregister(task: LocaleTaskCallback): boolean {
        for (let i = 0; i < this.tasks.length; i++) {
            let item = this.tasks[i];

            if (item.callback == task) {
                this.tasks.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
