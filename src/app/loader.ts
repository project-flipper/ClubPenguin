import { logger } from "@clubpenguin/app/app";

/**
 * Set a querystring in the specified URL.
 * @param url The URL string.
 * @param key The querystring key.
 * @param value The value to set in this querystring.
 * @param shouldReplace Whether to replace the querystring if the key is already present.
 * @returns The modified URL.
 */
export function setQuery(url: string, key: string, value: string, shouldReplace = true): string {
    let re = new RegExp(`([?&])${key}=.*?(&|#|$)(.*)`, 'gi');
    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null) {
            if (shouldReplace) return url.replace(re, `$1${key}=${value}$2$3`);
            else return url;
        } else {
            let hash = url.split('#');

            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');

            if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
            return url;
        }
    } else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            let hash = url.split('#');

            url = `${hash[0]}${separator}${key}=${value}`;

            if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
            return url;
        } else return url;
    }
}

/**
 * A modified version of Phaser's LoaderPlugin to implement strategic cache busting.
 */
export class LoaderPlugin extends Phaser.Loader.LoaderPlugin {
    static cacheVersion: string;

    addFile(file: Phaser.Loader.File | Phaser.Loader.File[]): void {
        if (!Array.isArray(file)) this.maybeAddCacheVersion(file);
        else for (let f of file) this.maybeAddCacheVersion(f);

        super.addFile(file);
    }

    /**
     * Adds a cache busting querystring on non-absolute file requests.
     * @param file The file that is currently being loaded.
     * @returns Whether a cache buster querystring was added.
     */
    maybeAddCacheVersion(file: Phaser.Loader.File): boolean {
        if ((file.url as string).match(/^(?:blob:|data:|capacitor:\/\/|http:\/\/|https:\/\/|\/\/)/)) return;

        let cacheVersion = LoaderPlugin.cacheVersion;
        if (cacheVersion !== undefined) {
            let rewritten = setQuery(file.url as string, 'v', cacheVersion, false);
            logger.debug('Rewriting the URL', file.url, 'to', rewritten);
            file.url = rewritten;
            return true;
        }

        return false;
    }
}

export type FontFaceFileConfig = Phaser.Types.Loader.FileConfig & {
    family: string,
    cache: Phaser.Cache.BaseCache
};

/**
 * A custom file loader for fonts.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FontFace
 */
export class FontFaceFile extends Phaser.Loader.File {
    public family: string;

    constructor(loader: Phaser.Loader.LoaderPlugin, key: FontFaceFileConfig);
    constructor(loader: Phaser.Loader.LoaderPlugin, key: string, url: string, family: string, xhrSettings: Phaser.Types.Loader.XHRSettingsObject);
    constructor(loader: Phaser.Loader.LoaderPlugin, key: string | FontFaceFileConfig, url?: string, family?: string, xhrSettings?: Phaser.Types.Loader.XHRSettingsObject) {
        let type = 'fontFace';
        let extension = 'ttf';

        if (typeof key === 'object') {
            let config = key;
            key = config.key;
            family = config.family;
            url = config.url as string;
            xhrSettings = config.xhrSettings !== false ? config.xhrSettings : undefined;
        }

        let fileConfig: FontFaceFileConfig = {
            type,
            key,
            url,
            family,
            extension,
            responseType: 'arraybuffer',
            cache: loader.cacheManager.binary,
            xhrSettings
        };
        super(loader, fileConfig);

        this.family = family;
    }

    onProcess(): void {
        this.state = Phaser.Loader.FILE_PROCESSING;

        let font = new FontFace(this.family, this.xhrLoader.response as ArrayBuffer);
        font.load().then(() => {
            this.onProcessComplete();
            document.fonts.add(font);
        }).catch(e => {
            this.onProcessError();

            logger.error(`Failed to load font ${this.key} from ${this.url}`, e);
        });
    }
}
