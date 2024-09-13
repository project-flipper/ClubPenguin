import { App } from './app/app';
import Config from './app/config';
import { Airtower } from './net/airtower';
import { Membership } from './net/types/penguin/membership';
import { UserData } from './net/types/penguin/penguin';
import { RelationshipType } from './net/types/penguin/relationship';
import { Avatar as AvatarData } from './net/types/penguin/avatar';
import World from './world/World';
import { Avatar } from './world/engine/avatar/avatar';
import Interface from './world/interface/Interface';
import { Engine, Room } from './world/engine/engine';

export class Debug {
    appCallback: () => App;

    constructor(callback: () => App) {
        this.appCallback = callback;
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
        let membership: Membership = member != undefined ? {
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

        let avatar = await this.engine.players.loadAvatar('penguin');
        limit = limit ?? this.engine.currentRoom.roomData.max_users;

        let actions: number[] = [
            0, 1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
        ];

        for (let i = 0; i < limit; i++) {
            let randomRank = Math.floor(Math.random() * 5);
            let member: Membership = randomRank > 0 ? {
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
            player.playAnimation(this.getRandomItem(actions));

            this.INTERNAL_ID += 1;
        }
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
        this.world.joinRoom(roomId.toString());
    }

    play(gameId: string): void {
        let gameConfig = this.gameConfig.games[gameId];
        if (!gameConfig) return;
        console.log('Loading game', gameConfig);
        this.engine.startGame(gameConfig);
    }

    changeLanguage(language: string): void {
        this.app.locale.setLanguage(language);
        this.app.locale.load();
    }
}