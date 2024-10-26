import { Locale, Language } from "@clubpenguin/app/locale";
import { Config } from "@clubpenguin/app/config";
import { Friends } from "@clubpenguin/friends/disney_friends";
import { Airtower } from "@clubpenguin/net/airtower";
import { getLogger } from "@clubpenguin/lib/log";
import Cleaner from "@clubpenguin/lib/cleaner";

export let logger = getLogger('CP.app');

export interface Dependency {
    mount(app: App): void;
    unmount(app: App): void;
}

interface AppParams {
    language: string,
    environmentType: string,
    apiPath: string,
    cacheVersion: string,
    contentVersion: string,
    minigameVersion: string
}

/**
 * The Club Penguin game root.
 * All internal systems and state is stored within.
 */
export class App extends Phaser.Game {
    public locale: Locale;
    public airtower: Airtower;
    public gameConfig: Config;
    public friends: Friends;
    public cleaner: Cleaner;
    public dependencies: Record<string, Dependency>;

    public environmentType: string;
    public lastBlur?: number;

    public cacheVersion: string;
    public contentVersion: string;
    public minigameVersion: string;

    constructor(config: Phaser.Types.Core.GameConfig, params: AppParams) {
        super(config);

        this.cleaner = new Cleaner(this);

        this.locale = new Locale(this, params.language);
        this.airtower = new Airtower(this, params.apiPath);
        this.gameConfig = new Config(this);
        this.friends = new Friends(this);

        this.input.globalTopOnly = true;

        this.environmentType = params.environmentType;
        this.cacheVersion = params.cacheVersion;
        this.contentVersion = params.contentVersion;
        this.minigameVersion = params.minigameVersion;

        this.dependencies = {};
    }

    /**
     * Gets a translated message to warn users about devtool usage.
     * @returns The translated message.
     */
    getDevtoolsWarnMessage(): string {
        switch (this.locale.language) {
            case Language.PT:
                return (
                    '%cESPERE!\n%cSua conta pode estar em perigo.\n\n' +
                    '%cQualquer criminoso pode induzi-lo a inserir códigos aqui que podem dar acesso à sua conta ou causar sua suspensão.\n\n' +
                    '%cSe você sabe o que está fazendo, considere se juntar à nossa equipe :)'
                );
            case Language.FR:
                return (
                    '%cATTENDEZ!\n%cVotre compte peut être en danger.\n\n' +
                    '%cTout criminel pourrait vous inciter à saisir ici des codes qui pourraient lui donner accès à votre compte ou entraîner votre suspension.\n\n' +
                    '%cSi vous savez ce que vous faites, envisagez de rejoindre notre équipe :)'
                );
            case Language.ES:
                return (
                    '%c¡ESPERA!\n%cTu cuenta puede correr peligro.\n\n' +
                    '%cCualquier malhechor podría engañarte al introducir códigos aquí que les puede dar acceso a tu cuenta, o causarle una suspención.\n\n' +
                    '%cSi sabes lo que estás haciendo, considera unirte a nuestro equipo :)'
                );
            case Language.DE:
                return (
                    '%cWARTEN!\n%cIhr Konto könnte in Gefahr sein.\n\n' +
                    '%cKriminelle könnten Sie dazu verleiten, hier Code einzuführen, der ihnen Zugriff auf Ihr Konto verschafft oder Sie sperrt.\n\n' +
                    '%cWenn Sie wissen, was Sie tun, denken Sie darüber nach, unserem Team beizutreten :)'
                );
            case Language.RU:
                return (
                    '%cЖДАТЬ!\n%cВаш аккаунт может быть в опасности.\n\n' +
                    '%cЗлоумышленники могут обманом заставить вас ввести здесь код, который может дать им доступ к вашей учетной записи или заблокировать вас.\n\n' +
                    '%cЕсли вы знаете, что делаете, рассмотрите возможность присоединиться к нашей команде :)'
                );
            default:
                return (
                    '%cWAIT!\n%cYour account might be in danger.\n\n' +
                    '%cBad actors might trick you into introducing code here that could give them access to your account or get you banned.\n\n' +
                    '%cIf you know what you\'re doing, consider joining our team :)'
                );
        }
    }

    step(time: number, delta: number): void {
        try {
            super.step(time, delta);
        } catch(e) {
            console.error(e);
            this.onCrash(e);
            throw e;
        }
    }

    onCrash(e: any): void {

    }

    /**
     * Modifies a DOM GameObject to remove Phaser references in it.
     * These references are not used by Phaser itself currently.
     * @param dom The DOM GameObject to modify.
     * @returns The modified DOM GameObject.
     */
    fixDomGO<T extends Phaser.GameObjects.DOMElement>(dom: T): T {
        logger.debug('Removing Phaser reference from DOM element', dom);
        if ('phaser' in dom.node) delete dom.node['phaser'];
        return dom;
    }

    protected onBlur(): void {
        this.lastBlur = window.performance.now(); // TODO: is it safe to employ this API? Will it maintain accuracy when a freeze occurs?
        logger.info('Snapshotting blur event');
        super.onBlur();
    }

    protected onFocus(): void {
        let now = window.performance.now();
        logger.info('Dispatching focusregain event');
        this.events.emit('focusregain', now - this.lastBlur);
        super.onFocus();
    }

    /**
     * Removes a JSON asset from the game cache.
     * @param assetKey The asset key associated.
     */
    unloadJSON(assetKey: string): void {
        if (this.cache.json.exists(assetKey)) this.cache.json.remove(assetKey);
    }

    /**
     * Removes a multiatlas asset from the game cache.
     * @param assetKey The asset key associated.
     */
    unloadMultiatlas(assetKey: string): void {
        this.unloadImage(assetKey);
        this.unloadJSON(assetKey);
    }

    /**
     * Removes an audio asset from the game cache.
     * @param assetKey The asset key associated.
     */
    unloadAudio(assetKey: string): void {
        if (this.cache.audio.exists(assetKey)) this.cache.audio.remove(assetKey);
    }

    /**
     * Removes an animation asset from the game cache.
     * @param assetKey The asset key associated.
     */
    unloadAnimation(assetKey: string): void {
        if (this.cache.json.exists(assetKey)) {
            let animations = this.cache.json.get(assetKey) as Phaser.Types.Animations.JSONAnimations;
            for (let animation of animations.anims) this.anims.remove(animation.key);
    
            this.cache.json.remove(assetKey);
        }
        if (this.anims.exists(assetKey)) this.anims.remove(assetKey);
    }

    /**
     * Removes an image asset from the game cache.
     * @param assetKey The asset key associated.
     */
    unloadImage(assetKey: string): void {
        if (this.textures.exists(assetKey)) this.textures.removeKey(assetKey);
    }

    /**
     * Removes a bitmap font asset from the game cache.
     * @param assetKey The asset key associated.
     */
    unloadBitmapFont(assetKey: string): void {
        if (!this.cache.bitmapFont.exists(assetKey)) return;

        let font = this.cache.bitmapFont.get(assetKey);
        this.unloadImage(font.texture);

        this.cache.bitmapFont.remove(assetKey);
    }

    /**
     * Removes an asset pack and all of its contents from the game cache.
     * @param assetKey The asset key associated.
     */
    unloadAssetPack(key: string): boolean {
        if (!this.cache.json.exists(key)) return false;

        let pack: any = this.cache.json.get(key);

        for (let k in pack) {
            let v = pack[k];

            if ('files' in v && Array.isArray(v.files)) {
                for (let file of v.files) {
                    let assetKey = file.key;
                    let type = file.type;

                    if (!(assetKey && type)) continue;

                    switch (type) {
                        case 'json':
                            this.unloadJSON(assetKey);
                            break;
                        case 'multiatlas':
                            this.unloadMultiatlas(assetKey);
                            break;
                        case 'audio':
                            this.unloadAudio(assetKey);
                            break;
                        case 'animation':
                            this.unloadAnimation(assetKey);
                            break;
                        case 'image':
                            this.unloadImage(assetKey);
                            break;
                        case 'bitmapFont':
                            this.unloadBitmapFont(assetKey);
                            break;
                        default:
                            logger.warn('Could not remove unknown pack asset type!', type);
                            break;
                    }
                }
            }
        }

        this.cache.json.remove(key);
        return true;
    }
}
