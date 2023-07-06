if ('Phaser' in global) delete global['Phaser'];
Phaser.Plugins.PluginCache.register('Loader', LoaderPlugin, 'load');

import 'devtools-detect';
import Phaser from 'phaser';
import { App } from './app/app';
import Bootstrap from './boot/Bootstrap';
import Startscreen from './start/Startscreen';
import Create from './create/Create';
import Login from './login/Login';
import Redemption from './redemption/Redemption';
import Load from './load/Load';
import ErrorArea from './app/ErrorArea';
import Notifications from './world/notifications/Notifications';
import Engine from './world/engine/Engine';
import InternalErrorArea from './app/InternalErrorArea';
import Logo from './logo/Logo';
import World from './world/World';
import Interface from './world/interface/Interface';
import { Debug } from './debug';
import { LoaderPlugin } from './app/loader';

let app: App;

interface RunParams {
    parentId: string,
    elementId: string,
    elementClassName: string,
    language: string,
    apiPath: string,
    mediaPath: string,
    crossOrigin: string,
    cacheVersion: string,
    contentVersion: string,
    minigameVersion: string,
    environmentType: string
}

declare global {
    /* ========== WEBPACK VARIABLES ========== */
    const __webpack_options__: {
        EXPOSE_DEBUG: boolean,
        RECAPTCHA_SITE_KEY: string
    };
    const __webpack_public_path__: string;

    /* ========== PLAY PAGE ========== */
    interface Window {
        jsAPI: {
            showNav(): void;
            hideNav(): void;
            showRules(): void;
        };
        handleGameError: (options?: { handled: boolean }) => void;
    }
}

function onAppCrash(): void {
    if (window.handleGameError) window.handleGameError({ handled: false });
    stop(true);
}

export function isBrowserCompatible(): boolean {
    return (
        typeof fetch == 'function' &&
        typeof crypto == 'object' &&
        typeof crypto.subtle == 'object' &&
        typeof WebSocket == 'function'
    );
}

export function run(params: RunParams): void {
    stop();

    app = new App({
        parent: params.parentId,
        fullscreenTarget: params.parentId,
        autoFocus: true,
        title: 'Club Penguin',
        banner: false,
        backgroundColor: 0xffffff,
        transparent: false,
        scene: [
            Bootstrap,
            Create,
            Login,
            Redemption,
            Startscreen,
            World,
            Engine,
            Interface,
            Load,
            Logo,
            Notifications,
            ErrorArea,
            InternalErrorArea
        ],
        width: 1710,
        height: 1080,
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        fps: {
            target: 24,
            limit: 24
        },
        dom: {
            createContainer: true
        },
        input: {
            mouse: {
                target: params.parentId
            },
            touch: {
                target: params.parentId
            }
        },
        physics: {
            default: 'matter',
            matter: {
                gravity: {
                    y: 0
                },
                enableSleeping: true,
                debug: params.environmentType == 'dev'
            }
        },
        loader: {
            baseURL: params.mediaPath,
            maxParallelDownloads: 10,
            crossOrigin: params.crossOrigin
        },
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
        callbacks: {
            postBoot: (app: App) => {
                if (params.elementId) app.canvas.id = params.elementId;
                if (params.elementClassName) app.canvas.className = params.elementClassName;

                app.canvas.addEventListener('contextlost', onAppCrash);
                app.canvas.addEventListener('webglcontextlost', onAppCrash);

                app.friends.init(params.mediaPath, app.airtower.createAvatarUrlCallback());
            }
        }
    }, {
        language: params.language,
        apiPath: params.apiPath,
        cacheVersion: params.cacheVersion,
        contentVersion: params.contentVersion,
        minigameVersion: params.minigameVersion,
        environmentType: params.environmentType
    });

    LoaderPlugin.cacheVersion = params.cacheVersion;
}

export function isRunning(): boolean {
    return app !== undefined;
}

export function sizeChange(repositionFriends = false): void {
    if (!isRunning()) return;

    if (app.scale.getParentBounds()) app.scale.refresh();
    if (repositionFriends) app.friends.reposition();
}

export function handleShowPreactivation(): void {

}

export function friendsEventHandler(event: string, params: any[]): void {
    if (!isRunning()) return;

    app.friends.friendsEventHandler(event, params);
}

export function sendBuddyRequest(swid: string): void {
    if (!isRunning()) return;

    app.friends.sendBuddyRequest(swid);
}

export function sendAcceptBuddyRequest(swid: string): void {
    if (!isRunning()) return;

    app.friends.sendAcceptBuddyRequest(swid);
}

export function sendRejectBuddyRequest(swid: string): void {
    if (!isRunning()) return;

    app.friends.sendRejectBuddyRequest(swid);
}

export function sendToggleBestFriend(swid: string): void {
    if (!isRunning()) return;

    app.friends.sendToggleBestFriend(swid);
}

export function sendToggleBestCharacter(id: string): void {
    if (!isRunning()) return;

    app.friends.sendToggleBestCharacter(id);
}

export function stop(terminate = false): void {
    if (isRunning()) {
        //app.airtower.close();
        app.destroy(false, terminate);
    }
}

export let debug: Debug;

if (__webpack_options__.EXPOSE_DEBUG) debug = new Debug(() => app);
