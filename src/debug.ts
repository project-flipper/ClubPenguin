import { App } from "@clubpenguin/app/app";
import { Config } from "@clubpenguin/app/config";
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
import { AnimationFrame } from "@clubpenguin/world/engine/player/animationFrame";

let logger = getLogger('CP.debug');

export class Debug {
    appCallback: () => App;

    constructor(callback: () => App) {
        this.appCallback = callback;
        logger.info('Debug layer available under %cCP.debug', 'font-weight: bold');
        window.addEventListener("error", e => {
            console.error(e.error);
            localStorage.setItem('lastError', `"${e.message}" thrown at ${e.filename}:${e.lineno}`);
        });
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
            id: this.INTERNAL_ID,
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
            public_stampbook: false,
            member: membership,
            mascot_id: mascotId,
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

        let actions: AnimationFrame[] = [
            AnimationFrame.IDLE_DOWN,
            AnimationFrame.IDLE_DOWN_LEFT,
            AnimationFrame.IDLE_LEFT,
            AnimationFrame.IDLE_UP_LEFT,
            AnimationFrame.IDLE_UP,
            AnimationFrame.IDLE_UP_RIGHT,
            AnimationFrame.IDLE_RIGHT,
            AnimationFrame.IDLE_DOWN_RIGHT,
            AnimationFrame.SIT_DOWN,
            AnimationFrame.SIT_DOWN_LEFT,
            AnimationFrame.SIT_LEFT,
            AnimationFrame.SIT_UP_LEFT,
            AnimationFrame.SIT_UP,
            AnimationFrame.SIT_UP_RIGHT,
            AnimationFrame.SIT_RIGHT,
            AnimationFrame.SIT_DOWN_RIGHT,
            AnimationFrame.WAVE,
            AnimationFrame.DANCE
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
                id: this.INTERNAL_ID,
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
                public_stampbook: Boolean(Math.floor(Math.random() * 2)),
                member,
                relationship: {
                    type: RelationshipType.FRIEND,
                    since: ''
                }
            };

            let player = await this.engine.players.createPlayer(data, this.world.cameras.main.centerX + this.randomRange(-350, +350), this.world.cameras.main.centerY + this.randomRange(0, +400));
            this.engine.players.addPlayer(player);
            player.actions.fromFrame(this.getRandomItem(actions));

            this.INTERNAL_ID += 1;
        }
    }

    async randomizeAvatar(): Promise<void> {
        let itemsByType = this.getItemsByType();

        let colors: number[] = [];
        for (let idx in this.gameConfig.player_colors) {
            colors.push(parseInt(idx));
        }

        let avatar: AvatarData = {
            color: this.getRandomItem(colors),
            head: this.getRandomItem(itemsByType[2]),
            face: this.getRandomItem(itemsByType[3]),
            neck: this.getRandomItem(itemsByType[4]),
            body: this.getRandomItem(itemsByType[5]),
            hand: this.getRandomItem(itemsByType[6]),
            feet: this.getRandomItem(itemsByType[7]),
            photo: this.getRandomItem(itemsByType[9]),
            flag: this.getRandomItem(itemsByType[8]),
        }

        await this.world.updateAvatar(avatar);
    }

    putItem(id: number): void {
        this.world.wearItem(id);
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