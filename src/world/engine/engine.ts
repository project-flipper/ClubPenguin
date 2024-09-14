import EventEmitter from "eventemitter3";
import Phaser from "phaser";

import { App } from "@clubpenguin/app/app";
import { GameConfig, RoomConfig } from "@clubpenguin/app/config";
import ErrorArea from "@clubpenguin/app/ErrorArea";
import { randomRange } from "@clubpenguin/lib/math";
import { TweenTracker } from "@clubpenguin/lib/tweenTracker";
import ButtonComponent from "@clubpenguin/lib/ui/components/ButtonComponent";
import PressureTrigger from "@clubpenguin/lib/ui/components/PressureTrigger";
import RoomTrigger from "@clubpenguin/lib/ui/components/RoomTrigger";
import SnowballTrigger from "@clubpenguin/lib/ui/components/SnowballTrigger";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import Interface from "../interface/Interface";
import Snowball from "../interface/prefabs/Snowball";
import World from "../World";
import { Player } from "./player/avatar";
import { PlayerManager } from "./player/playerManager";
import Cleaner from "./cleaner";
import { ClothingManager } from "./clothing/clothingManager";
import { HybridGame } from "./hybrid/hybridGame";
import { MusicManager } from "./music/musicManager";
import { SnowballManager } from "./snowballs/snowballManager";
import { PlayerData } from "@clubpenguin/net/types/player";

export type Trigger =
    | RoomTrigger
    | PressureTrigger
    | SnowballTrigger;

export interface Room extends Phaser.Scene {
    safeX?: number;
    safeY?: number;
    roomData?: RoomConfig;
    customEase?: string | Function,
    customSnowballClass?: typeof Snowball,
    triggers?: Phaser.GameObjects.Image[];
    unload(engine: Engine): void;
}

export interface Game extends Phaser.Scene {
    gameData: GameConfig;
    unload(engine: Engine): void;
}


export class Engine extends EventEmitter {
    public world: World;

    public tweenTracker: TweenTracker;
    public cleaner: Cleaner;

    public music: MusicManager;
    public players: PlayerManager;
    public clothing: ClothingManager;
    public snowballs: SnowballManager;

    constructor(world: World) {
        super();

        this.world = world;

        this.tweenTracker = new TweenTracker();
        this.cleaner = new Cleaner(this);

        this.music = new MusicManager(this);
        this.players = new PlayerManager(this);
        this.clothing = new ClothingManager(this);
        this.snowballs = new SnowballManager(this);

        this.world.sound.pauseOnBlur = false;
        this.world.game.events.on('focusregain', (delta: number) => this.tweenTracker.seekTweens(delta));
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

    /* ============ PLAYER ============ */

    get player(): Player {
        return this.players.player;
    }

    playerPointerMoveHandler(pointer: Phaser.Input.Pointer): void {
        let player = this.player;
        if (!player || !player.actions.isIdle()) return;

        let objects = this.currentRoom.input.hitTestPointer(pointer);
        if (objects[0] != player.hitbox) player.actions.lookAt(pointer.worldX, pointer.worldY);
    }

    playerPointerUpHandler(pointer: Phaser.Input.Pointer): void {
        let player = this.player;
        if (!player) return;

        if (pointer.leftButtonReleased()) {
            let objects = this.currentRoom.input.hitTestPointer(pointer);
            if (objects.length == 0) {
                let safe = this.players.findPlayerPath(player, pointer.worldX, pointer.worldY);
                this.world.move(safe.x, safe.y);
            }
        }
    }

    /* ============ ROOMS ============ */

    public currentRoomId: number;
    public previousRoomId: number;
    public previousPlayerX: number;
    public previousPlayerY: number;

    public currentRoom: Room;

    async loadRoom(config: RoomConfig): Promise<void> {
        if (config.room_id == this.currentRoomId) return;

        let room = (await import(/* webpackInclude: /\.ts$/ */`@clubpenguin/world/rooms/${config.path}`)).default;

        this.unloadRoom();
        this.unloadGame();

        let load = this.loadScreen;
        let roomScene = await new Promise<Room>(resolve => {
            this.world.scene.add(`room-${config.room_id}`, room, true, {
                config,
                oninit: (scene: Room) => load.track(new LoaderTask('Room loader', scene.load)),
                onready: (scene: Room) => resolve(scene)
            });
        });

        if (config.pin_id !== undefined) {
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

            let pin = roomScene.add.image(config.pin_x, config.pin_y, key, `${config.pin_id}/0`);
            let component = new ButtonComponent(pin);
            component.handCursor = true;
            component.pixelPerfect = true;

            pin.on('release', () => {
                // TODO: grant pin_id
            });
        }

        await this.music.playMusic(config.music_id);

        this.currentRoomId = config.room_id;

        this.currentRoom = roomScene as Room;
        this.currentRoom.roomData = config;

        this.unlockRoom();

        this.emit('room:load', this.currentRoom);
    }

    unloadRoom(): void {
        if (this.currentRoom) {
            this.previousPlayerX = this.players.player?.x;
            this.previousPlayerY = this.players.player?.y;

            this.currentRoom.scene.remove();
            if ('unload' in this.currentRoom) this.currentRoom.unload(this);
            this.emit('room:unload', this.currentRoom);

            this.previousRoomId = this.currentRoomId;
            this.currentRoom = undefined;
            this.currentRoomId = undefined;

            this.tweenTracker.reset();
        }
    }

    async joinRoom(config: RoomConfig, players: PlayerData[]): Promise<void> {
        if (config.room_id == this.currentRoomId) return;

        let load = this.loadScreen;
        if (!load.isShowing) load.show();

        try {
            await this.loadRoom(config);
        } catch (e) {
            if (this.currentRoom == undefined && this.previousRoomId) {
                try {
                    await this.world.joinRoom(this.previousRoomId, this.previousPlayerX, this.previousPlayerY);
                } catch (ne) {
                    console.error('Failed to go back to previous room.', e, ne);
                }
            }

            let error = this.world.scene.get('ErrorArea') as ErrorArea;
            error.showError(error.WINDOW_SMALL, this.app.locale.localize('shell.ROOM_FULL', 'error_lang'), this.app.locale.localize('Okay'), () => {
                this.interface.showMap();
                return true;
            }, error.makeCode('c', error.ROOM_FULL));

            load.hide();
            throw e;
        }

        this.interface.closeAll();
        this.interface.clearAvatarOverlays();

        for (let playerData of players) {
            let player = await this.players.createPlayer(playerData.user, playerData.x, playerData.y);
            this.players.addPlayer(player);
            player.actions.set(playerData.action);
        }

        this.currentRoom.input.on('pointerup', (pointer: Phaser.Input.Pointer) => this.playerPointerUpHandler(pointer));
        this.currentRoom.input.on('pointermove', (pointer: Phaser.Input.Pointer) => this.playerPointerMoveHandler(pointer));

        this.interface.show();
        load.hide();
        this.emit('room:ready', this.currentRoom);
    }

    findSafePoint(data: RoomConfig): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(randomRange(data.safe_start_x, data.safe_end_x), randomRange(data.safe_start_y, data.safe_end_y));
    }

    async loadInitialPenguins(): Promise<void> {

    }

    public roomLocked = false;

    lockRoom(): void {
        if (this.currentRoom) {
            this.currentRoom.input.keyboard.enabled = false;
            this.currentRoom.input.enabled = false;
        }
        this.world.input.keyboard.enabled = false;
        this.world.input.enabled = false;

        this.roomLocked = true;
    }

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

    async loadGame(config: GameConfig, options?: any): Promise<void> {
        if (this.currentGame && config == this.currentGame.gameData) return;

        let cls: Game;
        if (config.is_hybrid) {
            cls = new HybridGame(config);
        } else {
            cls = (await import(/* webpackInclude: /\.ts$/ */`@clubpenguin/world/games/${config.path}`)).default;
        }

        if (!config.show_player_in_room) this.unloadRoom();
        else this.lockRoom();
        this.unloadGame();

        let load = this.loadScreen;
        let game = await new Promise<Game>(resolve => {
            this.world.scene.add(`game-${config.name}`, cls, true, {
                config,
                options,
                oninit: (scene: Game) => load.track(new LoaderTask('Game loader', scene.load)),
                onready: (scene: Game) => resolve(scene)
            });
        });

        await this.music.playMusic(config.music_id);

        this.currentGame = game;
        this.currentGame.gameData = config;

        this.emit('game:load', this.currentGame);
    }

    unloadGame(): void {
        if (this.currentGame) {
            this.currentGame.scene.remove();
            if ('unload' in this.currentGame) this.currentGame.unload(this);
            this.emit('game:unload', this.currentGame);
            this.currentGame = undefined;
        }
    }

    async startGame(config: GameConfig, options?: any): Promise<void> {
        if (this.currentGame && config == this.currentGame.gameData) return;

        let load = this.loadScreen;
        if (!load.isShowing) load.show();

        try {
            await this.loadGame(config, options);
        } catch (e) {
            if (this.currentRoom == undefined && this.previousRoomId) {
                try {
                    await this.world.joinRoom(this.previousRoomId, this.previousPlayerX, this.previousPlayerY);
                } catch (ne) {
                    console.error('Failed to go back to previous room.', e, ne);
                }
            }

            let error = this.world.scene.get('ErrorArea') as ErrorArea;
            error.showError(error.WINDOW_SMALL, this.app.locale.localize('shell.GAME_FULL', 'error_lang'), this.app.locale.localize('Okay'), () => {
                this.interface.showMap();
                return true;
            }, error.makeCode('c', error.GAME_FULL));

            load.hide();
            throw e;
        }

        this.interface.hide();
        this.emit('game:ready', this.currentGame);
    }

    async endGame(score: number, roomConfig: RoomConfig): Promise<void> {
        let load = this.loadScreen;
        if (!load.isShowing) load.show();

        let gameData = this.currentGame.gameData;
        this.unloadGame();

        this.on('room:ready', () => {
            this.interface.showEndGame(score, gameData);
        });

        if (roomConfig) {
            console.log('join room');
            await this.world.joinRoom(roomConfig.room_id);
        } else if (this.currentRoom) {
            console.log('unlocking room');
            this.unlockRoom();
            let config = this.currentRoom.roomData;

            await this.music.playMusic(config.music_id);

            this.interface.show();
            load.hide();
        } else if (this.previousRoomId) {
            console.log('restoring room');
            try {
                await this.world.joinRoom(this.previousRoomId, this.previousPlayerX, this.previousPlayerY);
            } catch (e) {
                console.error('Failed to go back to previous room.', e);
            }
        } else this.interface.showMap();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
