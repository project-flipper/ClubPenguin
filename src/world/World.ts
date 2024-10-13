
// You can write more code here

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

/* START-USER-IMPORTS */
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import Interface from "./interface/Interface";
import { AnyUserData, MyUserData, UserData } from "@clubpenguin/net/types/user";
import { Engine } from "@clubpenguin/world/engine/engine";
import { App } from "@clubpenguin/app/app";
import { RelationshipType } from "@clubpenguin/net/types/relationship";
import { ActionData, ActionFrame } from "@clubpenguin/net/types/action";
import { getLogger } from "@clubpenguin/lib/log";
import { ClientPayload, ClientPayloads, Payload, Payloads } from "@clubpenguin/net/types/payload";
import { Emoji } from "@clubpenguin/net/types/message";
import ErrorArea, { CPError } from "@clubpenguin/app/ErrorArea";
import { WorldData } from "@clubpenguin/net/types/world";
import { AvatarData } from "@clubpenguin/net/types/avatar";
import { ItemType } from "./engine/clothing/itemType";

let logger = getLogger('CP.world');
/* END-USER-IMPORTS */

export default class World extends Phaser.Scene {
    constructor() {
        super("World");

        /* START-USER-CTR-CODE */

        this.engine = new Engine(this);

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

    get loadScreen(): Load {
        return this.scene.get('Load') as Load;
    }

    public worldId: number;
    public myUser: MyUserData;
    public inventory: number[];

    init(): void {
        let load = this.loadScreen;
        if (!load.isShowing) load.show({ logo: true });
    }

    create(data: WorldData): void {
        this.worldId = data.id;

        this.editorCreate();

        this.startWorld();
    }

    /**
     * Starts the world by connecting to the world server and loading the world assets
     * Also initializes the engine and interface, then requests a room to spawn in.
     */
    async startWorld(): Promise<void> {
        let load = this.loadScreen;
        load.track(new LoaderTask('World loader', this.load));

        let error = this.scene.get('ErrorArea') as ErrorArea;

        if (!this.game.airtower.isConnected()) error.show(error.createError({ message: 'shell.CONNECTION_LOST', buttonCallback: () => {
            window.location.reload();
            return false;
        }, type: 'c', code: error.CONNECTION_LOST}));

        this.game.airtower.on('ws:message', this.onWorldMessage, this);
        this.game.airtower.on('ws:close', this.onWorldClose, this);

        await this.game.airtower.sendAuth();

        let { data: myUser } = await this.game.airtower.getMyUser();
        this.myUser = myUser;
        this.inventory = []; // TODO: Request inventory
        for (let i in this.game.gameConfig.paper_items) {
            this.inventory.push(this.game.gameConfig.paper_items[i].paper_item_id);
        }

        this.postload();
        // TODO: load world here
        this.load.start();

        await load.waitAllTasksComplete();

        this.engine.init();

        await new Promise<void>(resolve => this.scene.run('Interface', {
            oninit: (scene: Interface) => load.track(new LoaderTask('Interface loader', scene.load)),
            onready: () => resolve()
        }));

        await load.waitAllTasksComplete();

        let { data: friendList } = await this.game.airtower.getFriends();
        let friends = friendList.filter(user => user.mascot_id == undefined);
        let characters = friendList.filter(user => user.mascot_id != undefined).map(user => user.id.toString());

        this.game.friends.connect(this.myUser.id.toString(), friends, characters, true, true, friendList.length > 10, false);

        await this.spawnRoom();
    }

    /**
     * Handles incoming world messages by parsing the data and delegating it to the appropriate handler.
     * @param data The raw message data received from the world server.
     */
    onWorldMessage(data: any) {
        let payload = JSON.parse(data);
        this.handle(payload);
    }

    /**
     * Handles the closure of the world connection.
     * @param code The close code indicating the reason for the closure.
     * @param reason A string providing additional information about the closure.
     */
    onWorldClose(code: number, reason: string): void {
        let error = this.scene.get('ErrorArea') as ErrorArea;

        let err: Partial<CPError> = { message: 'shell.CONNECTION_LOST', buttonCallback: () => {
            window.location.reload();
            return false;
        }, type: 'c', code: error.CONNECTION_LOST};

        if (code == 4000) {
            // TODO: Add close codes
        }

        error.show(error.createError(err));
    }

    /**
     * The offset, in hours, from UTC to the Standard Penguin Time.
     */
    public standardPenguinTimeOffset = -8;

    /**
     * Gets the current Standard Penguin Time (PST).
     * This method calculates the current time in the PST timezone by adjusting
     * the current UTC time with the Standard Penguin Time offset.
     * @returns The current date and time in PST.
     */
    getStandardPenguinTime(): Date {
        let now = new Date();
        let utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        let pst = new Date(utc + (this.standardPenguinTimeOffset * 3600000));
        return pst;
    }

    /**
     * Checks if the provided user data corresponds to the current player.
     * @param data The user data to check.
     * @returns Whether the provided user data is for the current player.
     */
    isMyPlayer(data: AnyUserData): data is MyUserData {
        return data.id == this.myUser.id;
    }

    /**
     * Checks if the current player is a moderator.
     * @returns Whether the player is a moderator.
     */
    isMyPlayerModerator(): boolean {
        return this.myUser.is_moderator;
    }

    /**
     * Checks if the provided user data corresponds to a mascot.
     * @param data The user data to check.
     * @returns Whether the user is a mascot.
     */
    isMascot(data: AnyUserData): boolean {
        return data.mascot_id != undefined;
    }

    /**
     * Checks if the user is a member.
     * @param data The user data to check.
     * @returns Whether the user is a member.
     */
    isMember(data: AnyUserData): boolean {
        return data?.member != undefined;
    }

    /**
     * Checks if the user's relationship status is pending.
     * @param data The user data containing relationship information.
     * @returns Whether the relationship type is pending.
     */
    isPending(data: UserData): boolean {
        return data.relationship?.type == RelationshipType.PENDING;
    }

    /**
     * Checks if the user's relationship is a friend or best friend.
     * @param data The user data to check.
     * @returns Whether the user is a friend or best friend.
     */
    isFriend(data: UserData): boolean {
        return [RelationshipType.FRIEND, RelationshipType.BEST_FRIEND].includes(data.relationship?.type);
    }

    /**
     * Checks if the user's relationship is a best friend.
     * @param data The user data to check.
     * @returns Whether the user is a best friend.
     */
    isBestFriend(data: UserData): boolean {
        return data.relationship?.type == RelationshipType.BEST_FRIEND;
    }

    /**
     * Checks if the user is ignored.
     * @param data The user data to check.
     * @returns Whether the user is ignored.
     */
    isIgnored(data: UserData): boolean {
        return data.relationship?.type == RelationshipType.IGNORED;
    }

    /* ========= PLAYER ========= */

    
    updateAvatar(mask: Partial<AvatarData>) {
        let player = this.engine.player;
        let user = this.myUser;
        user.avatar = { ...user.avatar, ...mask };
        this.handle({
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

    wearItem(id: number) {
        let config = this.game.gameConfig.paper_items[id];
        if (!config) {
            logger.error('Couldn\'t wear unknown item', id);
            return;
        }

        let mask = {} as Partial<AvatarData>;

        switch (config.type) {
            case ItemType.COLOR:
                mask.color = id;
                break;
            case ItemType.HEAD:
                mask.head = id;
                break;
            case ItemType.FACE:
                mask.face = id;
                break;
            case ItemType.NECK:
                mask.neck = id;
                break;
            case ItemType.BODY:
                mask.body = id;
                break;
            case ItemType.HAND:
                mask.hand = id;
                break;
            case ItemType.FEET:
                mask.feet = id;
                break;
            case ItemType.FLAG:
                mask.flag = id;
                break;
            case ItemType.PHOTO:
                mask.photo = id;
                break;
            case ItemType.OTHER:
            default:
                logger.error('Item type invalid', config.type);
                return;
        }

        this.updateAvatar(mask);
    }

    removeItem(id: number) {
        let config = this.game.gameConfig.paper_items[id];
        if (!config) {
            logger.error('Couldn\'t remove unknown item', id);
            return;
        }

        let mask = {} as Partial<AvatarData>;

        switch (config.type) {
            case ItemType.COLOR:
                mask.color = 0;
                break;
            case ItemType.HEAD:
                mask.head = 0;
                break;
            case ItemType.FACE:
                mask.face = 0;
                break;
            case ItemType.NECK:
                mask.neck = 0;
                break;
            case ItemType.BODY:
                mask.body = 0;
                break;
            case ItemType.HAND:
                mask.hand = 0;
                break;
            case ItemType.FEET:
                mask.feet = 0;
                break;
            case ItemType.FLAG:
                mask.flag = 0;
                break;
            case ItemType.PHOTO:
                mask.photo = 0;
                break;
            case ItemType.OTHER:
            default:
                logger.error('Item type invalid', config.type);
                return;
        }

        this.updateAvatar(mask);
    }

    /**
     * Moves the player to the specified coordinates.
     * @param x The x-coordinate to move the player to.
     * @param y The y-coordinate to move the player to.
     */
    move(x: number, y: number): void {
        let player = this.engine.player;
        let safe = this.engine.players.findPlayerPath(player, x, y)
        let action: ActionData = {
            frame: ActionFrame.WADDLE,
            x: safe.x,
            y: safe.y
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit by setting the appropriate action frame.
     */
    sit(facingX: number, facingY: number): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_DOWN + player.actions.getDirection(facingX, facingY)
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit down by setting the appropriate action frame.
     */
    sitDown(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_DOWN
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit down facing left by setting the appropriate action frame.
     */
    sitDownLeft(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_DOWN_LEFT
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit left by setting the appropriate action frame.
     */
    sitLeft(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_LEFT
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit up facing left by setting the appropriate action frame.
     */
    sitUpLeft(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_UP_LEFT
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit up by setting the appropriate action frame.
     */
    sitUp(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_UP
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit up facing right by setting the appropriate action frame.
     */
    sitUpRight(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_UP_RIGHT
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit right by setting the appropriate action frame.
     */
    sitRight(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_RIGHT
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player sit down facing right by setting the appropriate action frame.
     */
    sitDownRight(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.SIT_DOWN_RIGHT
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player wave by setting the appropriate action frame.
     */
    wave(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.WAVE
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Makes the player dance by setting the appropriate action frame.
     */
    dance(): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.DANCE
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /**
     * Throws a snowball to the specified coordinates.
     * @param x The x-coordinate where the snowball is thrown.
     * @param y The y-coordinate where the snowball is thrown.
     */
    throwSnowball(x: number, y: number): void {
        let player = this.engine.player;
        let action: ActionData = {
            frame: ActionFrame.THROW,
            x: x,
            y: y
        };

        if (player.actions.equals(action)) return;
        player.actions.set(action);

        this.send({
            op: 'player:action',
            d: action
        });
    }

    /* ========= ENGINE ========= */

    /**
     * Requests the server to spawn the player in a room.
     * The server is expected to send a room:join payload in response.
     */
    async spawnRoom(): Promise<void> {
        this.send({
            op: 'room:spawn',
            d: {}
        });
    }

    /**
     * Requests to join a specified room in the game.
     * @param roomId The ID of the room to join.
     * @param x The x-coordinate to join at.
     * @param y The y-coordinate to join at.
     */
    async joinRoom(roomId: number, x?: number, y?: number): Promise<void> {
        let roomData = this.game.gameConfig.rooms[roomId];

        if (roomData) {
            if (!(await this.engine.checkRoomExists(roomData.path))) {
                logger.warn('Room module does not exist', roomData.path);
                return;
            }

            let load = this.loadScreen;
            if (!load.isShowing) load.show();

            this.send({
                op: 'room:join',
                d: {
                    room_id: roomId,
                    x,
                    y
                }
            });
        } else {
            logger.warn('Room not found', roomId);
        }
    }

    /**
     * Requests to start a game.
     * @param gameId The ID of the game to start.
     * @param options Optional parameters to pass to the game.
     */
    async startGame(gameId: string, options?: any): Promise<void> {
        let gameData = this.game.gameConfig.games[gameId];

        if (gameData) {
            if (!gameData.is_hybrid && !(await this.engine.checkGameExists(gameData.path))) {
                logger.warn('Game module does not exist', gameData.path);
                return;
            }

            let load = this.loadScreen;
            if (!load.isShowing) load.show();

            // TODO: Request
            await this.engine.startGame(gameData, options);
        } else {
            logger.warn('Game not found', gameId);
        }
    }

    /* ======== INTERFACE ======== */

    /**
     * Sends a text message.
     * @param message The message to be sent.
     * @param allowAutopart Whether autopart messages are allowed.
     */
    async sendMessage(message: string, allowAutopart: boolean = false): Promise<void> {
        this.engine.player.overlay.balloon.showMessage(message, allowAutopart);
    }

    /**
     * Sends an emoji message.
     * @param emoji The emoji to be sent.
     */
    async sendEmoji(emoji: Emoji): Promise<void> {
        this.engine.player.overlay.balloon.showEmoji(emoji);
    }

    /**
     * Opens the namecard for a user by their ID.
     * 
     * If the provided ID matches the player's ID, it opens the player's namecard.
     * Otherwise, it fetches the user data for the given ID and opens the corresponding namecard.
     * 
     * @param id The ID of the user whose namecard is to be opened.
     */
    async openNamecardById(id: number): Promise<void> {
        if (id == this.myUser.id) {
            this.openMyNamecard();
            return;
        }

        let r = await this.game.airtower.getUserById(id);

        this.interface.openNamecard(r.data);
    }

    /**
     * Opens the player's namecard.
     */
    openMyNamecard(): void {
        this.interface.openMyNamecard();
    }

    /* ========== HANDLERS ========== */

    /**
     * Sends a payload to the server.
     * @param payload The payload to be sent, which includes the operation key and the associated data.
     */
    send<O extends keyof ClientPayloads, D extends ClientPayloads[O]>(payload: ClientPayload<ClientPayloads, O, D>): void {
        this.game.airtower.send(payload);
    }

    /**
     * Handles incoming payloads by dispatching them to the appropriate handler based on the operation type.
     * @param payload The payload containing the operation and data to be handled.
     */
    handle<O extends keyof Payloads, D extends Payloads[O]>(payload: Payload<Payloads, O, D>): void {
        if (payload.op in WORLD_HANDLERS) {
            logger.debug('Handling', payload.op);
            try {
                WORLD_HANDLERS[payload.op].call(this, payload.d);
            } catch (e) {
                logger.error('Uncaught error in world handler', payload.op, e);
            }
        } else {
            logger.warn('Missing handler for op', payload.op, 'ignoring');
        }
    }

    updateUser(data: AnyUserData, updatePlayer = true): void {
        if (this.isMyPlayer(data)) this.myUser = data;
        else {
            // TODO: update friends list if relationship changes
        }

        if (updatePlayer) this.engine.updatePlayerWith(data);

        if (this.interface.playerNamecard.visible && this.isMyPlayer(data)) this.interface.playerNamecard.setup(data);
        else if (this.interface.namecard.visible && !this.isMyPlayer(data) && data.id == this.interface.namecard.userId) this.interface.namecard.setup(data);
    }

    @handle('user:update')
    async handleUserUpdate(data: Payloads['user:update']): Promise<void> {
        if (this.isMyPlayer(data)) this.myUser = data;

        this.updateUser(data);
    }

    @handle('room:join')
    async handleRoomJoin(data: Payloads['room:join']): Promise<void> {
        let roomData = this.game.gameConfig.rooms[data.room_id];

        if (roomData) {
            await this.engine.joinRoom(roomData, data.players);
        } 
    }

    @handle('message:create')
    async handleMessageCreate(data: Payloads['message:create']): Promise<void> {
        let author = this.engine.getPlayer(data.player_id);
        if (author) {
            if (data.type == 'TEXT') author.overlay.balloon.showMessage(data.message, data.multipart);
            else if (data.type == 'EMOJI') author.overlay.balloon.showEmoji(data.emoji);
            else logger.warn('Received unknown message type!', data);

            author.overlay.balloon.setBanned(data.banned);
        }
    }

    @handle('player:add')
    async handlePlayerAdd(data: Payloads['player:add']): Promise<void> {
        this.engine.addPlayer(data);
    }

    @handle('player:update')
    async handlePlayerUpdate(data: Payloads['player:update']): Promise<void> {
        this.engine.updatePlayer(data);
        this.updateUser(data.user, false);
    }

    @handle('player:action')
    async handlePlayerAction(data: Payloads['player:action']): Promise<void> {
        let player = this.engine.getPlayer(data.player);
        if (player) {
            if (player.actions.equals(data)) return;

            player.actions.set(data);
        }
    }

    @handle('player:remove')
    async handlePlayerRemove(data: Payloads['player:remove']): Promise<void> {
        this.engine.removePlayer(data.user.id);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
