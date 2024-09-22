import { App } from "@clubpenguin/app/app";
import Config from "@clubpenguin/app/config";
import { Airtower } from "@clubpenguin/net/airtower";
import { MembershipData } from "@clubpenguin/net/types/membership";
import { UserData } from "@clubpenguin/net/types/user";
import { RelationshipType } from "@clubpenguin/net/types/relationship";
import { AvatarData as AvatarData } from "@clubpenguin/net/types/avatar";
import World from "@clubpenguin/world/World";
import { Avatar } from "@clubpenguin/world/engine/player/avatar";
import Interface from "@clubpenguin/world/interface/Interface";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import { getLogger } from "@clubpenguin/lib/log";
import { ItemType } from "./world/engine/clothing/itemType";

let logger = getLogger('CP.debug');

export class Debug {
    appCallback: () => App;

    constructor(callback: () => App) {
        this.appCallback = callback;
        logger.info('Debug layer available under %cCP.debug', 'font-weight: bold');
        window.addEventListener("error", e => localStorage.setItem('lastError', `"${e.message}" thrown at ${e.filename}:${e.lineno}`));
    }

    get app(): App {
        return this.appCallback();
    }

    get gameConfig(): Config {
        return this.app.gameConfig;
    }

    get airtower(): Airtower {
        return this.app.airtower;
    }

    get engine(): Engine {
        return this.world.engine;
    }

    get room(): Room {
        return this.engine.currentRoom;
    }

    get player(): Avatar {
        return this.engine.player;
    }

    get world(): World {
        return this.app.scene.getScene('World') as World;
    }

    get interface(): Interface {
        return this.app.scene.getScene('Interface') as Interface;
    }

    INTERNAL_ID = 10000;

    async spawn(name: string, color: number, member?: number, mascotId?: number): Promise<void> {
        let membership: MembershipData = member != undefined ? {
            level: member,
            since: ''
        } : undefined;

        let data: UserData = {
            id: this.INTERNAL_ID.toString(),
            username: name,
            nickname: name,
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
                type: RelationshipType.FRIEND,
                since: ''
            }
        };

        let player = await this.engine.players.createPlayer(data, this.world.cameras.main.centerX, this.world.cameras.main.centerY + 200);
        this.engine.players.addPlayer(player);

        this.INTERNAL_ID += 1;
        logger.debug('Added mock player with ID', player.userData.id);
    }

    getItemsByType() {
        let paperItems = this.app.gameConfig.paper_items;
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
        for (let idx in this.gameConfig.player_colors) {
            colors.push(parseInt(idx));
        }

        limit = limit ?? this.engine.currentRoom.roomData.max_users;

        let actions: number[] = [
            0, 1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
        ];

        logger.debug('Starting stress test using', limit, 'mocked players');
        for (let i = 0; i < limit; i++) {
            let randomRank = Math.floor(Math.random() * 5);
            let member: MembershipData = randomRank > 0 ? {
                level: randomRank,
                since: ''
            } : undefined;
            let username = `P${this.INTERNAL_ID}`;

            let data: UserData = {
                id: this.INTERNAL_ID.toString(),
                username,
                nickname: username,
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
                    type: RelationshipType.FRIEND,
                    since: ''
                }
            };

            let player = await this.engine.players.createPlayer(data, this.world.cameras.main.centerX + this.randomRange(-350, +350), this.world.cameras.main.centerY + this.randomRange(0, +400));
            this.engine.players.addPlayer(player);
            player.actions.set({ player: data.id, frame: this.getRandomItem(actions) });

            this.INTERNAL_ID += 1;
        }
    }

    putItem(id: number): void {
        let item = this.app.gameConfig.paper_items[id];
        if (!item) {
            logger.error('Item not found');
            return;
        }

        let player = this.world.engine.player;
        let user = player.userData;
        switch (item.type) {
            case ItemType.COLOR:
                user.avatar.color = id;
                break;
            case ItemType.HEAD:
                user.avatar.color = id;
                break;
            case ItemType.FACE:
                user.avatar.face = id;
                break;
            case ItemType.NECK:
                user.avatar.neck = id;
                break;
            case ItemType.BODY:
                user.avatar.body = id;
                break;
            case ItemType.HAND:
                user.avatar.hand = id;
                break;
            case ItemType.FEET:
                user.avatar.feet = id;
                break;
            case ItemType.FLAG:
                user.avatar.flag = id;
                break;
            case ItemType.PHOTO:
                user.avatar.photo = id;
                break;
            case ItemType.BOOK:
            default:
                logger.error('Item type invalid', item.type);
                return;
        }

        this.world.handle({
            op: 'player:update',
            d: {
                user,
                x: player.x,
                y: player.y,
                action: {
                    frame: 0,
                    player: user.id
                }
            }
        });
    }

    getRandomAvatar(): AvatarData {
        let itemsByType = this.getItemsByType();

        let colors: number[] = [];
        for (let idx in this.gameConfig.player_colors) {
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
        logger.debug('Joining room', roomId);
        this.world.joinRoom(roomId);
    }

    play(gameId: string): void {
        logger.debug('Starting game', gameId);
        this.world.startGame(gameId);
    }

    async changeLanguage(language: string): Promise<void> {
        logger.debug('Changing game language to', language);
        this.app.locale.setLanguage(language);
        try {
            await this.app.locale.load();
            logger.warn('Game language successfully changed. Some features will remain unchanged until a full reload is performed');
        } catch(e) {
            logger.error('Couldn\'t change game language', e);
        }
    }
}