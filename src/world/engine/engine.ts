/**
 * The `Engine` class is responsible for managing the game world, including players, rooms, and games.
 * It extends `EventEmitter` to handle various events within the game.
 * 
 * @extends EventEmitter
 */
import EventEmitter from "eventemitter3";

import { App } from "@clubpenguin/app/app";
import { GameConfig, RoomConfig } from "@clubpenguin/app/config";
import ErrorArea from "@clubpenguin/app/ErrorArea";
import { getLogger } from "@clubpenguin/lib/log";
import { randomRange } from "@clubpenguin/lib/math";
import { TweenTracker } from "@clubpenguin/lib/tweenTracker";
import ButtonComponent from "@clubpenguin/lib/components/ButtonComponent";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { PlayerData } from "@clubpenguin/net/types/player";
import { AnyUserData } from "@clubpenguin/net/types/user";
import Interface from "@clubpenguin/world/interface/Interface";
import Snowball from "@clubpenguin/world/interface/prefabs/Snowball";
import World from "../World";
import Cleaner from "@clubpenguin/lib/cleaner";
import { ClothingManager } from "./clothing/clothingManager";
import { HybridGame } from "./hybrid/hybridGame";
import { MusicManager } from "./music/musicManager";
import { Player } from "./player/avatar";
import { PlayerManager } from "./player/playerManager";
import { SnowballManager } from "./snowballs/snowballManager";
import WaddleTrigger from "@clubpenguin/lib/components/WaddleTrigger";
import { MaximumConcurrency } from "@clubpenguin/lib/concurrent";

export let logger = getLogger('CP.world.engine');

export interface Room extends Phaser.Scene {
    safeX?: number;
    safeY?: number;
    roomData?: RoomConfig;
    customEase?: string | Function,
    customSnowballClass?: typeof Snowball,
    triggers?: Phaser.GameObjects.Image[];
    beforeUnload?(engine: Engine): void;
    unload?(engine: Engine): void;
}

export interface Game extends Phaser.Scene {
    gameData: GameConfig;
    beforeUnload?(engine: Engine): void;
    unload?(engine: Engine): void;
}


/**
 * The Engine is responsible for managing the game world, including players, rooms, and games.
 * It extends EventEmitter to handle various events regarding room and game management.
 */
export class Engine extends EventEmitter {
    public world: World;

    public tweenTracker: TweenTracker;
    public cleaner: Cleaner;

    public music: MusicManager;
    public players: PlayerManager;
    public clothing: ClothingManager;
    public snowballs: SnowballManager;

    public roomConcurrency: MaximumConcurrency;
    public gameConcurrency: MaximumConcurrency;

    constructor(world: World) {
        super();

        this.world = world;

        this.tweenTracker = new TweenTracker();

        this.music = new MusicManager(world);
        this.players = new PlayerManager(this);
        this.clothing = new ClothingManager(this);
        this.snowballs = new SnowballManager(this);

        this.roomConcurrency = new MaximumConcurrency(1);
        this.gameConcurrency = new MaximumConcurrency(1);
    }

    get app(): App {
        return this.world.game;
    }

    get interface(): Interface {
        return (this.world.scene.get('Interface') as Interface);
    }

    get loadScreen(): Load {
        return this.world.scene.get('Load') as Load;
    }

    init(): void {
        this.cleaner = new Cleaner(this.app);
        this.world.sound.pauseOnBlur = false;
        this.world.game.events.on('focusregain', (delta: number) => this.tweenTracker.seekTweens(delta));
    }

    /* ============ PLAYER ============ */

    /**
     * Gets the current player instance.
     */
    get player(): Player {
        return this.getPlayer(this.world.myUser.id);
    }

    /**
     * Checks if a player with the given ID exists in the game world.
     * @param id The unique ID of the player.
     * @returns Whether the player exists.
     */
    playerExists(id: number): boolean {
        return id in this.players.players;
    }

    /**
     * Retrieves a player by their ID.
     * @param id The ID of the player.
     * @returns The player associated with the given ID.
     */
    getPlayer(id: number): Player {
        return this.players.players[id];
    }

    /**
     * Adds a player to the game world. If the player already exists, updates the player's data.
     * @param data - The data of the player to be added or updated.
     */
    async addPlayer(data: PlayerData): Promise<Player> {
        if (this.playerExists(data.user.id)) return this.updatePlayer(data);

        let player = await this.players.createPlayer(data.user, data.x, data.y);
        this.players.addPlayer(player);
        player.actions.set(data.action);
        logger.info('Player added', data);
        return player;
    }

    /**
     * Updates the player's state with the provided data.
     * @param data The data containing the player's new state.
     */
    updatePlayer(data: PlayerData): Player {
        let player = this.getPlayer(data.user.id);
        this.players.updatePlayer(player, data.user);
        player.x = data.x;
        player.y = data.y;
        player.actions.set(data.action);
        return player;
    }

    /**
     * Updates the player with the given user data if they exist in the world.
     * @param data The data to update the player with.
     */
    updatePlayerWith(data: AnyUserData): Player {
        let player = this.getPlayer(data.id);
        if (player) this.players.updatePlayer(player, data);
        return player;
    }

    /**
     * Removes a player from the game world by their ID.
     * @param id The ID of the player to be removed.
     * @returns Whether the player was successfully removed.
     */
    removePlayer(id: number): boolean {
        let player = this.getPlayer(id);
        if (!player) return false;

        this.players.removePlayer(player);
        return true;
    }

    /**
     * Handles the player's pointer move event.
     * 
     * This method checks if the player is idle and if so, it performs a hit test
     * to determine if the pointer is over any objects in the current room. If the 
     * pointer is not over the player's hitbox, the player will look at the pointer's 
     * world coordinates.
     * @param pointer The pointer that triggered the event.
     */
    playerPointerMoveHandler(pointer: Phaser.Input.Pointer): void {
        let player = this.player;
        if (!player || !player.actions.isIdle()) return;

        let objects = this.currentRoom.input.hitTestPointer(pointer);
        if (objects[0] != player.hitbox) this.world.lookAt(pointer.worldX, pointer.worldY);
    }

    /**
     * Handles the player's pointer up event.
     * 
     * This method checks if the left mouse button was released. If so, it performs a hit test to determine
     * if any objects were clicked. If no objects were clicked, it moves the player to the pointer's world coordinates.
     * @param pointer The pointer that triggered the event.
     */
    playerPointerUpHandler(pointer: Phaser.Input.Pointer): void {
        let player = this.player;
        if (!player) return;

        if (pointer.leftButtonReleased()) {
            let objects = this.currentRoom.input.hitTestPointer(pointer);
            if (objects.length == 0) this.world.move(pointer.worldX, pointer.worldY);
        }
    }

    /* ============ ROOMS ============ */

    public currentRoomId: number;
    public previousRoomId: number;
    public previousPlayerX: number;
    public previousPlayerY: number;

    public currentRoom: Room;

    /**
     * Gets the triggers in the current room.
     */
    get triggers(): Phaser.GameObjects.Image[] {
        return 'triggers' in this.currentRoom ? this.currentRoom.triggers : [];
    }

    /**
     * Gets a waddle trigger by its ID.
     * @param id The ID of the waddle trigger.
     * @returns The waddle trigger with the given ID.
     */
    getWaddle(id: number): WaddleTrigger {
        for (let trigger of this.triggers) {
            let waddle = WaddleTrigger.getComponent(trigger);
            if (waddle && waddle.waddle_id == id) return waddle;
        }
    }

    /**
     * Imports a room module dynamically.
     * @param path The path of the room module to import.
     * @returns A promise that resolves to the default export of the imported room module.
     */
    async importRoomModule(path: string): Promise<any> {
        return (await import(/* webpackInclude: /\.ts$/ */`@clubpenguin/world/rooms/${path}`)).default;
    }

    removeRoomModule(path: string): boolean {
        try {
            //delete require.cache[require.resolve(/* webpackInclude: /\.ts$/ */ `@clubpenguin/world/rooms/${path}`)];
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Checks if a room exists.
     * @param path The path to the room.
     * @returns A promise that resolves to a boolean indicating whether the room exists or not.
     */
    async checkRoomExists(path: string): Promise<boolean> {
        try {
            await this.importRoomModule(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Loads a room based on the provided configuration.
     * If a pin ID is specified in the configuration, the corresponding pin is loaded and added to the room.
     * The room's background music is played based on the music ID in the configuration.
     * An event 'room:load' is emitted when the room is successfully loaded.
     * @param config The configuration object for the room to be loaded.
     */
    async loadRoom(config: RoomConfig): Promise<void> {
        if (config.room_id == this.currentRoomId) return;

        logger.info('Loading room by path', config.path);
        let room = await this.importRoomModule(config.path);

        this.unloadRoom();
        this.unloadGame();

        let key = `room-${config.room_id}`;
        logger.info('Creating room scene by key', key);

        let load = this.loadScreen;
        let roomScene: Room;
        try {
            roomScene = await new Promise<Room>(resolve => {
                this.world.scene.add(key, room, true, {
                    config,
                    oninit: (scene: Room) => load.track(new LoaderTask('Room loader', scene.load)),
                    onready: (scene: Room) => resolve(scene)
                });
            });
        } catch (e) {
            this.world.scene.remove(key);
            throw e;
        }

        if (config.pin_id !== undefined) {
            logger.info('Loading room pin');
            let key = `clothing-icons-${config.pin_id}`;

            if (!this.world.textures.exists(key)) {
                let task = load.track(new LoaderTask('Pin loader', roomScene.load));
                roomScene.load.multiatlas({
                    key,
                    atlasURL: `assets/clothing/icons/${config.pin_id}.json`,
                    path: `assets/clothing/icons`
                });
                roomScene.load.start();
                await task.wait();
            }

            this.cleaner.allocateResource('multiatlas', key);

            let pin = roomScene.add.image(config.pin_x, config.pin_y, key, `${config.pin_id}/0`);
            let component = new ButtonComponent(pin);
            component.handCursor = true;
            component.pixelPerfect = true;

            pin.on('release', () => this.world.buyItem(config.pin_id, true));
        }

        await this.music.play(config.music_id);

        this.currentRoomId = config.room_id;

        this.currentRoom = roomScene as Room;
        this.currentRoom.roomData = config;

        this.unlockRoom();

        this.emit('room:load', this.currentRoom);
    }

    /**
     * Unloads the current room, if any, and performs necessary cleanup.
     * Emits a 'room:unload' event when the room is successfully unloaded.
     */
    unloadRoom(): void {
        if (this.currentRoom) {
            this.previousPlayerX = this.player?.x;
            this.previousPlayerY = this.player?.y;

            if ('beforeUnload' in this.currentRoom) this.currentRoom.beforeUnload(this);
            this.currentRoom.scene.remove();
            if ('unload' in this.currentRoom) this.currentRoom.unload(this);
            this.removeRoomModule(this.currentRoom.roomData.path);
            this.emit('room:unload', this.currentRoom);

            this.previousRoomId = this.currentRoomId;
            this.currentRoom = undefined;
            this.currentRoomId = undefined;

            this.tweenTracker.reset();
        }

        this.cleaner.purge();
    }

    /**
     * Joins a room with the specified configuration and players.
     * Once the room is ready, it emits a 'room:ready' event.
     * @param config The configuration for the room to join.
     * @param players An array of player data to add to the room.
     */
    async joinRoom(config: RoomConfig, players: PlayerData[]): Promise<void> {
        if (config.room_id == this.currentRoomId) return;

        let load = this.loadScreen;
        if (!load.isShowing) load.show();

        try {
            await this.loadRoom(config);
        } catch (e) {
            this.unloadRoom();

            if (this.previousRoomId) {
                try {
                    await this.world.joinRoom(this.previousRoomId, this.previousPlayerX, this.previousPlayerY);
                } catch (ne) {
                    logger.error('Failed to go back to previous room.', e, ne);
                }
            }

            let error = this.world.scene.get('ErrorArea') as ErrorArea;
            error.show(error.createError({
                message: 'shell.ROOM_FULL',
                buttonCallback: () => {
                    this.interface.showMap();
                    return true;
                },
                code: error.ROOM_FULL
            }));

            load.hide();
            logger.error('Room failed to load', e);

            throw e;
        }

        logger.debug('Setting up room');

        this.interface.closeAll();
        this.interface.clearAvatarOverlays();

        let waitForLoad: Promise<void>[] = [];

        for (let playerData of players) {
            let player = await this.addPlayer(playerData);
            player.actions.set(playerData.action);

            if (this.world.isMyPlayer(playerData.user)) waitForLoad.push(new Promise<void>(resolve => {
                let clothingCallback = (p: Player) => {
                    if (p == player) {
                        resolve();
                        this.off('clothing:ready', clothingCallback);
                        this.off('player:remove', removeCallback);
                    }
                };

                let removeCallback = (p: Player) => {
                    if (p == player) {
                        resolve();
                        this.off('clothing:ready', clothingCallback);
                    }
                };

                this.on('clothing:ready', clothingCallback);
                this.once('player:remove', removeCallback);
            }));
        }

        this.currentRoom.input.on('pointerup', (pointer: Phaser.Input.Pointer) => this.playerPointerUpHandler(pointer));
        this.currentRoom.input.on('pointermove', (pointer: Phaser.Input.Pointer) => this.playerPointerMoveHandler(pointer));

        await Promise.all(waitForLoad);

        this.interface.show();
        load.hide();
        this.emit('room:ready', this.currentRoom);
    }

    /**
     * Queues a room join with the specified configuration and players.
     * If there are any rooms in the queue, it clears the queue and joins the room.
     * @param config The configuration for the room to join.
     * @param players The array of player data to add to the room.
     */
    queueRoomJoin(config: RoomConfig, players: PlayerData[]): Promise<void> {
        if (this.roomConcurrency.inQueue > 0) this.roomConcurrency.clear('Room operation outdated');
        return this.roomConcurrency.run(async () => this.joinRoom(config, players));
    }

    /**
     * Finds a safe point within the specified room configuration.
     * @param data The configuration of the room, containing the safe zone boundaries.
     * @returns A Phaser.Math.Vector2 object representing a random safe point within the specified boundaries.
     */
    findSafePoint(data: RoomConfig): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(randomRange(data.safe_start_x, data.safe_end_x), randomRange(data.safe_start_y, data.safe_end_y));
    }

    public roomLocked = false;

    /**
     * Locks the current room and the world by disabling keyboard and input interactions.
     */
    lockRoom(): void {
        if (this.currentRoom) {
            this.currentRoom.input.keyboard.enabled = false;
            this.currentRoom.input.enabled = false;
        }
        this.world.input.keyboard.enabled = false;
        this.world.input.enabled = false;

        this.roomLocked = true;
    }

    /**
     * Unlocks the current room and the world, enabling keyboard and input interactions.
     */
    unlockRoom(): void {
        if (this.currentRoom) {
            this.currentRoom.input.keyboard.enabled = true;
            this.currentRoom.input.enabled = true;
        }
        this.world.input.keyboard.enabled = true;
        this.world.input.enabled = true;

        this.roomLocked = false;
    }

    /* ============ GAMES ============ */

    public currentGame: Game;

    /**
     * Imports a game module dynamically.
     * @param path The path of the game module to import.
     * @returns A promise that resolves to the default export of the imported game module.
     */
    async importGameModule(path: string): Promise<any> {
        return (await import(/* webpackInclude: /\.ts$/ */`@clubpenguin/world/games/${path}`)).default;
    }

    removeGameModule(path: string): boolean {
        try {
            //delete require.cache[require.resolve(/* webpackInclude: /\.ts$/ */ `@clubpenguin/world/games/${path}`)];
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Checks if a game exists.
     * @param path The path to the game.
     * @returns A promise that resolves to a boolean indicating whether the game exists or not.
     */
    async checkGameExists(path: string): Promise<boolean> {
        try {
            await this.importGameModule(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Loads a game based on the provided configuration.
     * Depending on whether the game is hybrid or not, it either creates a Ruffle instance or dynamically imports the game module.
     * Emits a 'game:load' event when the game is successfully loaded.
     * @param config The configuration object for the game to be loaded.
     * @param options Optional parameters that can be passed to the game.
     */
    async loadGame(config: GameConfig, options?: any): Promise<void> {
        if (this.currentGame && config == this.currentGame.gameData) return;

        let cls: Game;
        if (config.is_hybrid) {
            cls = new HybridGame(config);
        } else {
            cls = await this.importGameModule(config.path);
        }

        if (config.room_id != 0) {
            this.unloadRoom();
            this.currentRoomId = config.room_id;
        } else this.lockRoom();
        this.unloadGame();

        let key = `game-${config.name}`;

        let load = this.loadScreen;
        let game: Game;
        try {
            game = await new Promise<Game>(resolve => {
                this.world.scene.add(key, cls, true, {
                    config,
                    options,
                    oninit: (scene: Game) => load.track(new LoaderTask('Game loader', scene.load)),
                    onready: (scene: Game) => resolve(scene)
                });
            });
        } catch (e) {
            this.world.scene.remove(key);
            throw e;
        }

        await this.music.play(config.music_id);

        this.currentGame = game;
        this.currentGame.gameData = config;

        this.emit('game:load', this.currentGame);
    }

    /**
     * Unloads the current game, if any, and performs necessary cleanup.
     * Emits a 'game:unload' event when the game is successfully unloaded.
     */
    unloadGame(): void {
        if (this.currentGame) {
            if ('beforeUnload' in this.currentGame) this.currentGame.beforeUnload(this);
            this.currentGame.scene.remove();
            if ('unload' in this.currentGame) this.currentGame.unload(this);
            if (this.app.loop.fpsLimit != __webpack_options__.FPS_LIMIT) this.app.setFPSLimit(__webpack_options__.FPS_LIMIT);
            this.removeGameModule(this.currentGame.gameData.path);
            this.emit('game:unload', this.currentGame);
            this.currentGame = undefined;
        }

        this.cleaner.purge();
    }

    /**
     * Starts the game with the provided configuration and options.
     * Emits a 'game:ready' event when the game is ready.
     * @param config The configuration for the game to start.
     * @param options Optional parameters for game initialization.
     */
    async startGame(config: GameConfig, options?: any): Promise<void> {
        if (this.currentGame && config == this.currentGame.gameData) return;

        let isWidgetLike = config.room_id == 0;

        let load = this.loadScreen;
        if (!load.isShowing) load.show({ mini: isWidgetLike });

        try {
            await this.loadGame(config, options);
        } catch (e) {
            if (this.currentRoom == undefined && this.previousRoomId) {
                try {
                    await this.world.joinRoom(this.previousRoomId, this.previousPlayerX, this.previousPlayerY);
                } catch (ne) {
                    logger.error('Failed to go back to previous room.', e, ne);
                }
            }

            this.unloadGame();

            let error = this.world.scene.get('ErrorArea') as ErrorArea;
            error.show(error.createError({
                message: 'shell.GAME_FULL',
                buttonCallback: () => {
                    if (config.room_id != 0) this.interface.showMap();
                    return true;
                },
                code: error.GAME_FULL
            }));

            load.hide();
            logger.error('Game failed to load', e);

            throw e;
        }

        if (!isWidgetLike) this.interface.hide();
        this.emit('game:ready', this.currentGame);
    }

    /**
     * Queues a game start with the provided configuration and options.
     * If there are any games in the queue, it clears the queue and starts the game.
     * @param config The configuration for the game to start.
     * @param options The options for the game.
     */
    async queueGameStart(config: GameConfig, options?: any): Promise<void> {
        if (this.gameConcurrency.inQueue > 0) this.gameConcurrency.clear('Game operation outdated');
        return this.gameConcurrency.run(() => this.startGame(config, options));
    }

    /**
     * Ends the current game.
     */
    endGame(): void {
        let load = this.loadScreen;
        if (!load.isShowing) load.show();

        this.unloadGame();
    }

    /**
     * Resumes the current room by unlocking it, playing the room's music, and showing the interface.
     * @returns {Promise<void>} A promise that resolves when the room has been resumed.
     */
    async resumeRoom(): Promise<void> {
        if (!this.currentRoom) return;

        let load = this.loadScreen;
        if (!load.isShowing) load.show();

        this.unlockRoom();
        let config = this.currentRoom.roomData;

        await this.music.play(config.music_id);

        this.interface.show();
        load.hide();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
