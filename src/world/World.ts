
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
        let action: ActionData = {
            frame: ActionFrame.WADDLE,
            fromX: this.engine.player.x,
            fromY: this.engine.player.y,
            destinationX: x,
            destinationY: y
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitDown(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_DOWN
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitDownLeft(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_DOWN_LEFT
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitLeft(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_UP_LEFT
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitUpLeft(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_UP_LEFT
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitUp(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_UP
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitUpRight(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_UP_RIGHT
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitRight(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_RIGHT
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    sitDownRight(): void {
        let action: ActionData = {
            frame: ActionFrame.SIT_DOWN_RIGHT
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    wave(): void {
        let action: ActionData = {
            frame: ActionFrame.WAVE
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    dance(): void {
        let action: ActionData = {
            frame: ActionFrame.DANCE
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    throwSnowball(x: number, y: number): void {
        let action: ActionData = {
            frame: ActionFrame.THROW,
            fromX: this.engine.player.x,
            fromY: this.engine.player.y,
            destinationX: x,
            destinationY: y
        };
        this.engine.player.actions.set(action);
        // TODO: Request
    }

    /* ========= ENGINE ========= */

    async joinRoom(roomId: number, x?: number, y?: number): Promise<void> {
        let roomData = this.game.gameConfig.rooms[roomId];

        if (roomData) {
            let position = this.engine.findSafePoint(roomData);
            x = x ?? position.x;
            y = y ?? position.y;
    
            // TODO: Request
            let players: PlayerData[] = [{ user: this.myUser, x: x, y: y, action: { frame: 0 } }];
            await this.engine.joinRoom(roomData, players);
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

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
