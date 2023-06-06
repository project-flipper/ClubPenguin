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

export var app: App;

interface RunParams {
    parentId: string,
    elementId: string,
    elementClassName: string,
    language: string,
    apiPath: string,
    mediaPath: string,
    cacheVersion: string,
    clientVersion: string,
    contentVersion: string,
    minigameVersion: string,
    environmentType: string
}

export function run(params: RunParams): void {
    stop();

    app = new App({
        parent: params.parentId,
        title: 'Club Penguin',
        banner: true,
        backgroundColor: 0xffffff,
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
            default: 'arcade',
            arcade: {
                debug: true,
                gravity: {
                    x: 0,
                    y: 0
                }
            }
        },
        loader: {
            baseURL: params.mediaPath,
            maxParallelDownloads: 10
        },
        powerPreference: 'high-performance'
    }, {
        language: params.language,
        apiPath: params.apiPath,
        cacheVersion: params.cacheVersion,
        clientVersion: params.clientVersion,
        contentVersion: params.contentVersion,
        minigameVersion: params.minigameVersion,
        environmentType: params.environmentType
    });

    if (params.elementId) app.canvas.id = params.elementId;
    if (params.elementClassName) app.canvas.className = params.elementClassName;

    app.friends.init();
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

export function stop(): void {
    if (isRunning()) app.destroy(false);
}

declare global {
    interface Window {
        jsAPI: {
            showNav(): void;
            hideNav(): void;
            showRules(): void;
        }
    }
}


/** DEBUG LAYER */

class Debug {
    INTERNAL_ID = 10000;

    get engine(): Engine {
        return app.scene.getScene('Engine') as Engine;
    }

    get world(): World {
        return app.scene.getScene('World') as World;
    }

    get interface(): Interface {
        return app.scene.getScene('Interface') as Interface;
    }

    async spawn(name: string, color: number, member?: number, mascotId?: number): Promise<void> {
        let membership: import('./net/types/penguin/membership').Membership = member != undefined ? {
            level: member,
            since: ''
        } : undefined;

        let data: import('./net/types/penguin/penguin').PenguinData = {
            id: this.INTERNAL_ID.toString(),
            name,
            avatar: {
                color,
                head: 0,
                face: 1924,
                neck: 0,
                body: 4022,
                hand: 0,
                feet: 0,
                photo: 0,
                flag: 0
            },
            publicStampbook: false,
            member: membership,
            mascotId,
            relationship: {
                type: 'friend' as import('./net/types/penguin/relationship').RelationshipType.FRIEND,
                since: ''
            }
        };

        let avatar = await this.engine.loadAvatar('penguin');
        this.engine.addPenguin(data, avatar, this.engine.cameras.main.centerX, this.engine.cameras.main.centerY + 200);

        this.INTERNAL_ID += 1;
    }

    getItemsByType() {
        let paperItems = app.gameConfig.paper_items;
        let itemsByType: { [type: number]: number[] } = {};
        for (let idx in paperItems) {
            let item = paperItems[idx];

            if (item.is_bait) continue;

            if (!(item.type in itemsByType)) itemsByType[item.type] = [];

            itemsByType[item.type].push(item.paper_item_id);
        }
        return itemsByType;
    }

    async stressTest(limit?: number): Promise<void> {
        let itemsByType = this.getItemsByType();

        let colors: number[] = [];
        for (let idx in app.gameConfig.player_colors) {
            colors.push(parseInt(idx));
        }

        let avatar = await this.engine.loadAvatar('penguin');
        limit = limit ?? this.engine.currentRoom.roomData.max_users;

        let actions: number[] = [
            0, 1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
        ];

        for (let i = 0; i < limit; i++) {
            let randomRank = Math.floor(Math.random() * 5);
            let member: import('./net/types/penguin/membership').Membership = randomRank > 0 ? {
                level: randomRank,
                since: ''
            } : undefined;

            let data: import('./net/types/penguin/penguin').PenguinData = {
                id: this.INTERNAL_ID.toString(),
                name: `P${this.INTERNAL_ID}`,
                avatar: {
                    color: this.getRandomItem(colors),
                    head: this.getRandomItem(itemsByType[2]),
                    face: this.getRandomItem(itemsByType[3]),
                    neck: this.getRandomItem(itemsByType[4]),
                    body: this.getRandomItem(itemsByType[5]),
                    hand: this.getRandomItem(itemsByType[6]),
                    feet: this.getRandomItem(itemsByType[7]),
                    photo: this.getRandomItem(itemsByType[9]),
                    flag: 0,
                },
                publicStampbook: Boolean(Math.floor(Math.random() * 2)),
                member,
                relationship: {
                    type: 'friend' as import('./net/types/penguin/relationship').RelationshipType.FRIEND,
                    since: ''
                }
            };

            let penguin = this.engine.addPenguin(data, avatar, this.engine.cameras.main.centerX + this.randomRange(-350, +350), this.engine.cameras.main.centerY + this.randomRange(0, +400));
            penguin.playAnimation(this.getRandomItem(actions));

            this.INTERNAL_ID += 1;
        }
    }

    getRandomAvatar(): import('./net/types/penguin/avatar').Avatar {
        let itemsByType = this.getItemsByType();

        let colors: number[] = [];
        for (let idx in app.gameConfig.player_colors) {
            colors.push(parseInt(idx));
        }

        return {
            color: this.getRandomItem(colors),
            head: this.getRandomItem(itemsByType[2]),
            face: this.getRandomItem(itemsByType[3]),
            neck: this.getRandomItem(itemsByType[4]),
            body: this.getRandomItem(itemsByType[5]),
            hand: this.getRandomItem(itemsByType[6]),
            feet: this.getRandomItem(itemsByType[7]),
            photo: this.getRandomItem(itemsByType[9]),
            flag: 0,
        }
    }

    randomRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    getRandomItem<T>(array: T[]): T {
        let idx = Math.floor(Math.random() * array.length);
        return array[idx];
    }

    teleport(roomId: number): void {
        let roomConfig = app.gameConfig.rooms[roomId.toString()];
        if (!roomConfig) return;
        console.log('Mocking room join on room', roomConfig);
        this.engine.joinRoom(roomConfig);
    }

    changeLanguage(language: string): void {
        app.locale.setLanguage(language);
        app.locale.load();
    }
}

export let debug = new Debug();
