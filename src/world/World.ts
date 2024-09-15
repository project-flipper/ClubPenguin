
// You can write more code here

let SPAWN_ROOMS = [
    100, // town
    200, // village
    230, // mtn
    300, // plaza
    400, // beach
    800, // dock
    801, // forts
    802, // rink
    //805, // berg
    807, // shack
    809, // forest
    810, // cove

];

export type WorldHandler<D = any> = (data: D) => (Promise<any> | any);
export const WORLD_HANDLERS: Record<string, WorldHandler> = {};

export function handle<K extends keyof Payloads, T extends WorldHandler<Payloads[K]>>(op: K) {
    return function (handler: T, context: ClassMethodDecoratorContext): T {
        logger.info(handler, context);
        WORLD_HANDLERS[op] = handler;
        return handler;
    }
}

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import Interface from "./interface/Interface";
import { BaseUserData, MyUserData, UserData } from "@clubpenguin/net/types/user";
import { Engine } from "@clubpenguin/world/engine/engine";
import { App } from "@clubpenguin/app/app";
import { RelationshipType } from "@clubpenguin/net/types/relationship";
import { PlayerData } from "@clubpenguin/net/types/player";
import { ActionData, ActionFrame } from "@clubpenguin/net/types/action";
import { getLogger } from "@clubpenguin/lib/log";
import { Payload, Payloads } from "@clubpenguin/net/types/payload";
import { Emoji, MessageData } from "@clubpenguin/net/types/message";

let logger = getLogger('CP.world');
/* END-USER-IMPORTS */

export default class World extends Phaser.Scene {

    constructor() {
        super("World");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    postload(): void {

        this.load.pack("world-pack", "assets/app/world-pack.json");
        this.load.pack("engine-pack", "assets/world/engine/engine-pack.json");
    }

    editorCreate(): void {

        this.events.emit("scene-awake");
    }

    /* START-USER-CODE */

    declare public game: App;
    public engine: Engine;

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    public worldId: number;
    public myUser: MyUserData;

    init(): void {
        let load = this.scene.get('Load') as Load;
        if (!load.isShowing) load.show({ logo: true });
    }

    create(data: { id: number, name: string }): void {
        this.worldId = data.id;

        this.editorCreate();

        this.startWorld();
    }

    async startWorld(): Promise<void> {
        let load = this.scene.get('Load') as Load;
        load.track(new LoaderTask('World loader', this.load));

        let myUser = await this.game.airtower.getMyUser()
        this.myUser = myUser.data;

        this.postload();
        // TODO: load world here
        this.load.start();

        await load.waitAllTasksComplete();

        this.engine = new Engine(this);

        await new Promise<void>(resolve => this.scene.run('Interface', {
            oninit: (scene: Interface) => load.track(new LoaderTask('Interface loader', scene.load)),
            onready: () => resolve()
        }));

        await load.waitAllTasksComplete();

        let friendList = await this.game.airtower.getFriends();
        let friends = friendList.data.filter(user => user.mascotId == undefined);
        let characters = friendList.data.filter(user => user.mascotId != undefined).map(user => user.id);

        this.game.friends.connect(friends, characters, true, true, true);

        let roomId = this.getRandomItem(SPAWN_ROOMS);
        logger.info('Mocking room join on room', roomId);
        await this.joinRoom(roomId);
    }

    public standardPenguinTimeOffset = 0;

    getStandardPenguinTime(): Date {
        let now = new Date();
        now.setTime(now.getTime() + this.standardPenguinTimeOffset * 60000);
        return now;
    }

    getRandomItem<T>(array: T[]): T {
        let idx = Math.floor(Math.random() * array.length);
        return array[idx];
    }

    isPlayer(data: BaseUserData): data is MyUserData {
        return data.id == this.myUser.id;
    }

    isPlayerModerator(): boolean {
        return this.myUser.moderator;
    }

    isMascot(data: BaseUserData): boolean {
        return data.mascotId != undefined;
    }

    isMember(data: BaseUserData): boolean {
        return data?.member != undefined;
    }

    isPending(data: UserData): boolean {
        return data.relationship?.type == RelationshipType.PENDING;
    }

    isFriend(data: UserData): boolean {
        return [RelationshipType.FRIEND, RelationshipType.BEST_FRIEND].includes(data.relationship?.type);
    }

    isBestFriend(data: UserData): boolean {
        return data.relationship?.type == RelationshipType.BEST_FRIEND;
    }

    isIgnored(data: UserData): boolean {
        return data.relationship?.type == RelationshipType.IGNORED;
    }

    /* ========= PLAYER ========= */

    move(x: number, y: number): void {
        let player = this.engine.player;
        let safe = this.engine.players.findPlayerPath(player, x, y)
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.WADDLE,
            fromX: this.engine.player.x,
            fromY: this.engine.player.y,
            destinationX: safe.x,
            destinationY: safe.y
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitDown(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_DOWN
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitDownLeft(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_DOWN_LEFT
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitLeft(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_UP_LEFT
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitUpLeft(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_UP_LEFT
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitUp(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_UP
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitUpRight(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_UP_RIGHT
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitRight(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_RIGHT
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    sitDownRight(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.SIT_DOWN_RIGHT
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    wave(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.WAVE
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    dance(): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.DANCE
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    throwSnowball(x: number, y: number): void {
        let action: ActionData = {
            player: this.engine.player.userData.id,
            frame: ActionFrame.THROW,
            fromX: this.engine.player.x,
            fromY: this.engine.player.y,
            destinationX: x,
            destinationY: y
        };
        // TODO: Request
        this.handle({
            op: 'player:action',
            d: action
        });
    }

    /* ========= ENGINE ========= */

    async joinRoom(roomId: number, x?: number, y?: number): Promise<void> {
        let roomData = this.game.gameConfig.rooms[roomId];

        if (roomData) {
            let position = this.engine.findSafePoint(roomData);
            x = x ?? position.x;
            y = y ?? position.y;

            // TODO: Request
            this.handle({
                op: 'room:join',
                d: {
                    roomId: roomId,
                    players: [
                        { user: this.myUser, x: x, y: y, action: { player: this.myUser.id, frame: 0 } }
                    ]
                }
            });
        }
    }

    async startGame(gameId: string, options?: any): Promise<void> {
        let gameData = this.game.gameConfig.games[gameId];

        if (gameData) {
            // TODO: Request
            await this.engine.startGame(gameData, options);
        }
    }

    /* ======== INTERFACE ======== */

    async sendMessage(message?: string, allowAutopart: boolean = false): Promise<void> {
        this.interface.sendMessage(message, allowAutopart);
    }

    async sendEmoji(emoji: Emoji): Promise<void> {
        this.interface.sendEmoji(emoji);
    }

    async openNamecardById(id: string): Promise<void> {
        // TODO: fetch penguin data
        if (id == this.myUser.id) {
            this.openMyNamecard();
            return;
        }

        let r = await this.game.airtower.getUserById(id);

        this.interface.openNamecard(r.data);
    }

    openMyNamecard(): void {
        this.interface.openMyNamecard();
    }

    /* ========== HANDLERS ========== */

    handle<O extends keyof Payloads, D extends Payloads[O]>(payload: Payload<Payloads, O, D>): void {
        if (payload.op in WORLD_HANDLERS) {
            logger.info('Handling', payload.op);
            try {
                WORLD_HANDLERS[payload.op].call(this, payload.d);
            } catch (e) {
                logger.error('Uncaught error in world handler', payload.op, e);
            }
        } else {
            logger.warn('Missing handler for op', payload.op, 'ignoring');
        }
    }

    @handle('room:join')
    async handleRoomJoin(data: Payloads['room:join']): Promise<void> {
        let roomData = this.game.gameConfig.rooms[data.roomId];

        if (roomData) {
            await this.engine.joinRoom(roomData, data.players);
        } 
    }

    @handle('message:create')
    async handleMessageCreate(data: Payloads['message:create']): Promise<void> {
        let author = this.engine.getPlayer(data.author);
        if (author) {
            if (data.type == 'TEXT') author.overlay.balloon.showMessage(data.message, data.multipart);
            else if (data.type == 'EMOJI') author.overlay.balloon.showEmoji(data.emoji);
            else logger.warn('Received unknown message type!', data);

            author.overlay.balloon.setBanned(data.banned);
        }
    }

    @handle('player:action')
    async handlePlayerAction(data: Payloads['player:action']): Promise<void> {
        let player = this.engine.getPlayer(data.player);
        if (player) {
            player.actions.set(data);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
