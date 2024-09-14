import Phaser from "phaser";

import { Locale } from "@clubpenguin/app/locale";
import Config from "@clubpenguin/app/config";
import { Friends } from "@clubpenguin/friends/disney_friends";
import { Airtower } from "@clubpenguin/net/airtower";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.app');

interface AppParams {
    language: string,
    environmentType: string,
    apiPath: string,
    cacheVersion: string,
    contentVersion: string,
    minigameVersion: string
}

export class App extends Phaser.Game {
    public locale: Locale;
    public airtower: Airtower;
    public gameConfig: Config;
    public friends: Friends;

    public environmentType: string;
    public lastBlur?: number;

    public cacheVersion: string;
    public contentVersion: string;
    public minigameVersion: string;

    constructor(config: Phaser.Types.Core.GameConfig, params: AppParams) {
        super(config);

        this.locale = new Locale(this, params.language);
        this.airtower = new Airtower(this, params.apiPath);
        this.gameConfig = new Config(this);
        this.friends = new Friends(this);

        this.input.globalTopOnly = true;

        this.environmentType = params.environmentType;
        this.cacheVersion = params.cacheVersion;
        this.contentVersion = params.contentVersion;
        this.minigameVersion = params.minigameVersion;
    }

    fixDomGO<T extends Phaser.GameObjects.DOMElement>(dom: T): T {
        logger.debug('Removing Phaser reference from DOM element', dom);
        if ('phaser' in dom.node) delete dom.node['phaser'];
        return dom;
    }

    protected onBlur(): void {
        this.lastBlur = window.performance.now();
        logger.info('Snapshotting blur event');
        super.onBlur();
    }

    protected onFocus(): void {
        let now = window.performance.now();
        logger.info('Dispatching focusregain event');
        this.events.emit('focusregain', now - this.lastBlur);
        super.onFocus();
    }

    unloadJSON(assetKey: string): void {
        if (this.cache.json.exists(assetKey)) this.cache.json.remove(assetKey);
    }

    unloadMultiatlas(assetKey: string): void {
        this.unloadImage(assetKey);
        this.unloadJSON(assetKey);
    }

    unloadAudio(assetKey: string): void {
        if (this.cache.audio.exists(assetKey)) this.cache.audio.remove(assetKey);
    }

    unloadAnimation(assetKey: string): void {
        if (!this.cache.json.exists(assetKey)) return;

        let animations = this.cache.json.get(assetKey);
        for (let animation of animations.anims) this.anims.remove(animation.key);

        this.cache.json.remove(assetKey);
    }

    unloadImage(assetKey: string): void {
        if (this.textures.exists(assetKey)) this.textures.removeKey(assetKey);
    }

    unloadBitmapFont(assetKey: string): void {
        if (!this.cache.bitmapFont.exists(assetKey)) return;

        let font = this.cache.bitmapFont.get(assetKey);
        this.unloadImage(font.texture);

        this.cache.bitmapFont.remove(assetKey);
    }

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
