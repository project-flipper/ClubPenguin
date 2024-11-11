
// You can write more code here

export type WorldHandler<D = any> = (data: D) => (Promise<any> | any);
export const WORLD_HANDLERS: Record<string, WorldHandler> = {};

export function handle<K extends keyof Payloads, T extends WorldHandler<Payloads[K]>>(op: K) {
    return function (handler: T, context: ClassMethodDecoratorContext): T {
        logger.info(handler, context);
        WORLD_HANDLERS[op] = handler;
        return handler;
    };
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
import { getLogger } from "@clubpenguin/lib/log";
import { ClientPayloads, Payload, Payloads } from "@clubpenguin/net/types/payload";
import { Emoji } from "@clubpenguin/net/types/message";
import ErrorArea, { CPError } from "@clubpenguin/app/ErrorArea";
import { WorldData } from "@clubpenguin/net/types/world";
import { AvatarData } from "@clubpenguin/net/types/avatar";
import { ItemType } from "./engine/clothing/itemType";
import { Direction } from "@clubpenguin/lib/math";

export let logger = getLogger('CP.world');
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

    public worldData: WorldData;
    public worldId: number;
    public myUser: MyUserData;
    public inventory: number[];

    init(): void {
        let load = this.loadScreen;
        if (!load.isShowing) load.show({ logo: true });
    }

    create(data: WorldData): void {
        this.worldData = data;
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

        if (!this.game.airtower.isConnected()) error.show(error.createError({
            message: 'shell.CONNECTION_LOST', buttonCallback: () => {
                window.location.reload();
                return false;
            }, type: 'c', code: error.CONNECTION_LOST
        }));

        this.game.airtower.on('s:message', this.onWorldMessage, this);
        this.game.airtower.on('s:disconnect', this.onWorldClose, this);

        let { data: myUser } = await this.game.airtower.getMyUser();
        this.myUser = myUser;
        this.inventory = []; // TODO: Request inventory
        for (let i in this.game.gameConfig.paper_items) {
            let paper_item = this.game.gameConfig.paper_items[i];
            if (paper_item.is_bait) continue;
            this.inventory.push(paper_item.paper_item_id);
        }

        this.postload();
        // TODO: load world here
        this.load.start();

        await load.waitAllTasksComplete();

        this.engine.init();

        await new Promise<void>(resolve => this.scene.run('Interface', {
            ui: '2014/UI2014',
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
        this.handle(data);
    }

    /**
     * Handles the closure of the world connection.
     * @param code The close code indicating the reason for the closure.
     * @param reason A string providing additional information about the closure.
     */
    onWorldClose(code: number, reason: string): void {
        let error = this.scene.get('ErrorArea') as ErrorArea;

        let err: Partial<CPError> = {
            message: 'shell.CONNECTION_LOST', buttonLabel: 'Learn More', buttonCallback: () => {
                window.location.reload();
                return false;
            }, type: 'c', code: error.CONNECTION_LOST
        };

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

    /* ========= AVATAR ========= */

    /**
     * Updates the avatar of the current user with the provided partial avatar data.
     * The avatar data is merged with the existing avatar data, and the updated avatar is sent to the server.
     * @param mask - A partial object containing the avatar data to be updated.
     */
    updateAvatar(mask: Partial<AvatarData>) {
        this.send('player:avatar', mask);
    }

    /**
     * Equips an item to the avatar based on the provided item ID.
     * Shorthands for {@link updateAvatar} with the appropriate mask for the item type.
     * @param id - The ID of the item to be worn.
     */
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

    /**
     * Removes an item from the avatar based on the provided item ID.
     * Shorthands for {@link updateAvatar} with the appropriate mask for the item type.
     * @param id - The ID of the item to be removed.
     */
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

    /* ========= ITEMS ========= */

    async buyItem(id: number, prompt = true): Promise<void> {
        let config = this.game.gameConfig.paper_items[id];
        if (!config) {
            logger.error('Couldn\'t buy unknown item', id);
            return;
        }

        if (prompt) {
            let msg = config.cost == 0 ? this.game.locale.localize('inventory_free').replace('%name%', config.label) : this.game.locale.localize('buy_inventory').replace('%name%', config.label).replace('%cost%', config.cost.toString());
            this.interface.promptShop.show(msg.replace('%name%', config.label), this.game.locale.localize('Yes'), this.game.locale.localize('No'), () => {
                this.interface.promptSpinner.show();
                this.game.airtower.buyItem(id);
            }, () => { });
            this.interface.promptShop.setLoading();

            logger.info('Loading room pin');
            let key = `clothing-icons-${id}`;
            let load = this.loadScreen;

            if (!this.textures.exists(key)) {
                let task = load.track(new LoaderTask('Icon loader', this.load));
                this.load.multiatlas({
                    key,
                    atlasURL: `assets/clothing/icons/${id}.json`,
                    path: `assets/clothing/icons`
                });
                this.load.start();
                await task.wait();
            }

            this.engine.cleaner.allocateResource('multiatlas', key);

            let icon = this.interface.promptShop.scene.add.image(0, 0, key, `${id}/0`);
            this.interface.promptShop.setIcon(icon);
        } else {
            this.interface.promptSpinner.show();
            await this.game.airtower.buyItem(id);
        }
    }

    /* ========= ACTIONS ========= */

    /**
     * Looks at the specified coordinates.
     * @param x The x-coordinate to look at.
     * @param y The y-coordinate to look at.
     */
    lookAt(x: number, y: number): void {
        let player = this.engine.player;
        let action = player.actions.get();
        let safe = player.actions.getDirectionVector(player.actions.getDirection(x, y));
        player.actions.lookAt(safe.x, safe.y);

        if (!player.actions.equals(action) && this.game.getExperimentalFeature('HANDLE_STARE_ACTION', false)) this.send('player:action', player.actions.get());
    }

    /**
     * Moves the player to the specified coordinates.
     * @param x The x-coordinate to move the player to.
     * @param y The y-coordinate to move the player to.
     */
    move(x: number, y: number): void {
        let player = this.engine.player;
        let safe = this.engine.players.findPlayerPath(player, x, y);
        let action = player.actions.get();
        player.actions.move(safe.x, safe.y);

        if (!player.actions.equals(action)) this.send('player:action', player.actions.get());
    }

    /**
     * Makes the player sit by setting the appropriate action frame.
     */
    sit(facingX: number, facingY: number): void {
        let player = this.engine.player;
        let currentAction = player.actions.get();
        player.actions.sitFacing(facingX, facingY);

        if (!player.actions.equals(currentAction)) this.send('player:action', player.actions.get());
    }

    /**
     * Makes the player sit down by setting the appropriate action frame.
     */
    sitDown(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.DOWN);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player sit down facing left by setting the appropriate action frame.
     */
    sitDownLeft(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.DOWN_LEFT);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player sit left by setting the appropriate action frame.
     */
    sitLeft(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.LEFT);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player sit up facing left by setting the appropriate action frame.
     */
    sitUpLeft(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.UP_LEFT);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player sit up by setting the appropriate action frame.
     */
    sitUp(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.UP);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player sit up facing right by setting the appropriate action frame.
     */
    sitUpRight(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.UP_RIGHT);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player sit right by setting the appropriate action frame.
     */
    sitRight(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.RIGHT);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player sit down facing right by setting the appropriate action frame.
     */
    sitDownRight(): void {
        let player = this.engine.player;
        let to = player.actions.getDirectionVector(Direction.DOWN_RIGHT);
        this.sit(to.x, to.y);
    }

    /**
     * Makes the player wave by setting the appropriate action frame.
     */
    wave(): void {
        let player = this.engine.player;
        player.actions.wave();
        this.send('player:action', player.actions.get());
    }

    /**
     * Makes the player dance by setting the appropriate action frame.
     */
    dance(): void {
        let player = this.engine.player;
        player.actions.dance();
        this.send('player:action', player.actions.get());
    }

    /**
     * Throws a snowball to the specified coordinates.
     * @param x The x-coordinate where the snowball is thrown.
     * @param y The y-coordinate where the snowball is thrown.
     */
    throwSnowball(x: number, y: number): void {
        let player = this.engine.player;
        player.actions.throw(x, y);
        this.send('player:action', player.actions.get());
    }

    /* ========= ENGINE ========= */

    /**
     * Requests the server to spawn the player in a room.
     * The server is expected to send a room:join payload in response.
     */
    async spawnRoom(): Promise<void> {
        this.send('room:join', {});
    }

    /**
     * Requests to join a specified room in the game.
     * @param roomId The ID of the room to join.
     * @param x The x-coordinate to join at.
     * @param y The y-coordinate to join at.
     */
    async joinRoom(roomId: number, x?: number, y?: number): Promise<void> {
        this.leaveWaddle();
        let roomData = this.game.gameConfig.rooms[roomId];

        if (roomData) {
            if (!(await this.engine.checkRoomExists(roomData.path))) {
                logger.warn('Room module does not exist', roomData.path);
                return;
            }

            let load = this.loadScreen;
            if (!load.isShowing) load.show();

            this.send('room:join', {
                room_id: roomId,
                x,
                y
            });
        } else {
            logger.warn('Room not found', roomId);
        }
    }

    /**
     * Joins a waddle with the specified ID.
     * @param waddleId The ID of the waddle to join.
     * @param isTable A boolean indicating whether the waddle is a table.
     */
    async joinWaddle(waddleId: number, isTable: boolean): Promise<void> {
        if (this.currentWaddleId) {
            logger.warn('Already in a waddle', this.currentWaddleId);
            return;
        }
        this.send('waddle:join', {
            waddle_id: waddleId,
            is_table: isTable
        });
    }

    public currentWaddleId: number;

    /**
     * Leaves the current waddle.
     */
    async leaveWaddle(): Promise<void> {
        if (!this.currentWaddleId) return;
        this.send('waddle:leave', {
            waddle_id: this.currentWaddleId
        });
    }

    public gameStartParams: any;

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
            this.gameStartParams = options;
            this.send('game:start', {
                game_id: gameId
            });
        } else {
            logger.warn('Game not found', gameId);
        }
    }

    public trackedEarnedStamps: number[];
    public showGameOver = true;
    public postGameRoomId: number;
    public showGameOverAfterRoomReady = false;

    async endGame(score: number, roomId?: number): Promise<void> {
        this.interface.promptSpinner.show();
        this.send('game:over', { score: Math.round(score) });

        this.postGameRoomId = roomId;
    }

    async closeGame(): Promise<void> {
        let engine = this.engine;
        if (!engine.currentGame) return;

        if (this.postGameRoomId) await this.joinRoom(this.postGameRoomId);
        else if (engine.currentRoom) await engine.resumeRoom();
        else if (engine.previousRoomId) {
            try {
                await this.joinRoom(engine.previousRoomId, engine.previousPlayerX, engine.previousPlayerY);
            } catch (e) {
                logger.error('Failed to go back to previous room.', e);
            }
        } else this.interface.showMap();
    }

    /* ======== INTERFACE ======== */

    /**
     * Sends a text message.
     * @param message The message to be sent.
     * @param allowAutopart Whether autopart messages are allowed.
     */
    async sendMessage(message: string): Promise<void> {
        this.engine.player.overlay.balloon.showMessage(message, false);
        this.send('message:create', {
            type: 'TEXT',
            message
        });
    }

    /**
     * Sends a joke message.
     * @param joke The joke ID to be sent.
     */
    async sendJoke(joke: number): Promise<void> {
        let message = this.game.gameConfig.jokes[joke];
        this.engine.player.overlay.balloon.showMessage(message, true);
        this.send('message:create', {
            type: 'JOKE',
            joke
        });
    }

    /**
     * Sends a tour message.
     */
    async sendTour(): Promise<void> {
        this.send('message:create', {
            type: 'TOUR'
        });
    }

    /**
     * Sends an emoji message.
     * @param emoji The emoji to be sent.
     */
    async sendEmoji(emoji: Emoji): Promise<void> {
        this.engine.player.overlay.balloon.showEmoji(emoji);
        this.send('message:create', {
            type: 'EMOJI',
            emoji
        });
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
    send<O extends keyof ClientPayloads, D extends ClientPayloads[O]>(op: O, d: D): void {
        this.game.airtower.send(op, d);
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
        } else if (this.events.listenerCount(payload.op) > 0) {
            logger.debug('Dispatching external', payload.op);
            this.events.emit(payload.op, payload.d);
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
        this.interface.updateUser(data);
    }

    @handle('user:update')
    async handleUserUpdate(data: Payloads['user:update']): Promise<void> {
        if (this.isMyPlayer(data)) this.myUser = data;

        this.updateUser(data, true);
    }

    @handle('room:join')
    async handleRoomJoin(data: Payloads['room:join']): Promise<void> {
        this.leaveWaddle();
        let roomData = this.game.gameConfig.rooms[data.room_id];

        if (roomData) {
            await this.engine.queueRoomJoin(roomData, data.players);

            for (let player of data.players) this.updateUser(player.user, false);
            for (let waddleData of data.waddles) {
                let waddle = this.engine.getWaddle(waddleData.waddle_id);
                if (!waddle) {
                    logger.warn('Waddle not found', waddleData.waddle_id);
                    return;
                }

                for (let playerId of waddleData.players) {
                    let player = this.engine.getPlayer(playerId);
                    if (player) waddle.place(player);
                    else logger.warn('Player not found', playerId);
                }
            }
        } else {
            logger.warn('Room not found', data.room_id);
        }
    }

    @handle('waddle:join')
    async handleWaddleJoin(data: Payloads['waddle:join']): Promise<void> {
        let player = this.engine.getPlayer(data.player);
        if (!player) {
            logger.warn('Player not found', data.player);
            return;
        }

        let waddle = this.engine.getWaddle(data.waddle_id);
        if (player == this.engine.player) {
            this.currentWaddleId = data.waddle_id;
            this.gameStartParams = waddle.options;
            this.engine.lockRoom();
        }

        waddle.place(player);
        //if (waddle.waddle_type != 'TABLE') this.interface.promptSpinner.show();
    }

    @handle('waddle:leave')
    async handleWaddleLeave(data: Payloads['waddle:leave']): Promise<void> {
        let player = this.engine.getPlayer(data.player);
        if (!player) {
            logger.warn('Player not found', data.player);
            return;
        }

        let waddle = this.engine.getWaddle(data.waddle_id);
        waddle.remove(player);

        if (player == this.engine.player) {
            this.currentWaddleId = undefined;
            this.engine.unlockRoom();
        }
    }

    @handle('game:start')
    async handleGameStart(data: Payloads['game:start']): Promise<void> {
        let gameData = this.game.gameConfig.games[data.game_id];

        if (gameData) {
            this.trackedEarnedStamps = [];
            this.showGameOver = true;
            this.postGameRoomId = undefined;
            this.showGameOverAfterRoomReady = false;

            await this.engine.queueGameStart(gameData, this.gameStartParams);
        } else {
            logger.warn('Game not found', data.game_id);
        }
    }

    @handle('game:over')
    async handleGameOver(data: Payloads['game:over']): Promise<void> {
        this.interface.promptSpinner.hide();

        let engine = this.engine;
        if (!engine.currentGame) {
            logger.warn('There are no currently active games');
            return;
        }

        let gameData = engine.currentGame.gameData;

        if (this.showGameOverAfterRoomReady) {
            this.closeGame();

            if (engine.currentRoomId == this.postGameRoomId && engine.currentRoom) this.interface.showEndGame(data.coins, this.trackedEarnedStamps, gameData);
            else engine.once('room:ready', () => {
                this.interface.showEndGame(data.coins, this.trackedEarnedStamps, gameData);
            });
        } else this.interface.showEndGame(data.coins, this.trackedEarnedStamps, gameData);
    }

    @handle('message:create')
    async handleMessageCreate(data: Payloads['message:create']): Promise<void> {
        let author = this.engine.getPlayer(data.player_id);
        if (author && !this.isMyPlayer(author.userData)) {
            let balloon = author.overlay.balloon;
            if (data.type == 'TEXT') balloon.showMessage(data.message, false);
            else if (data.type == 'EMOJI') balloon.showEmoji(data.emoji);
            else if (data.type == 'JOKE') {
                let message = this.game.gameConfig.jokes[data.joke];
                balloon.showMessage(message, true);
            }
            else logger.warn('Received unknown message type!', data);

            balloon.setBanned(data.banned);
        } else if (author) {
            let balloon = author.overlay.balloon;
            if (data.type == 'TEXT') {
                if (balloon.currentMessage == data.message) balloon.setBanned(data.banned);
            } else if (data.type == 'EMOJI') {
                if (balloon.currentEmoji == data.emoji) balloon.setBanned(data.banned);
            } else if (data.type == 'JOKE') {
                let message = this.game.gameConfig.jokes[data.joke];
                if (balloon.currentMessage == message) balloon.setBanned(data.banned);
            }
            else logger.warn('Received unknown message type!', data);
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
        let player = this.engine.getPlayer(data.player_id);
        if (player) {
            if (player.actions.equals(data)) return;

            player.actions.set(data);
        } else {
            logger.warn('Player not found', data.player_id);
        }
    }

    @handle('player:remove')
    async handlePlayerRemove(data: Payloads['player:remove']): Promise<void> {
        let removed = this.engine.removePlayer(data.user.id);
        if (!removed) {
            logger.warn('Player not found', data.user.id);
        }
    }

    @handle('inventory:add')
    async handleInventoryAdd(data: Payloads['inventory:add']): Promise<void> {
        this.inventory.push(data.item_id);
        this.interface.promptOkay.show(this.game.locale.localize('buy_inventory_done'), this.game.locale.localize('Okay'), () => { }, () => { });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
