import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.app.loader');

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
