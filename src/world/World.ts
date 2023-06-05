
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import type Load from "../load/Load";
import { LoaderTask } from "../load/tasks";
import type Interface from "./interface/Interface";
import type { BasePenguinData, MyPenguinData, PenguinData } from '../net/types/penguin/penguin';
import type Engine from "./engine/Engine";
import type { App } from "../app/app";
import { RelationshipType } from "../net/types/penguin/relationship";
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
    }

    editorCreate(): void {

        this.events.emit("scene-awake");
    }

    /* START-USER-CODE */

    declare public game: App;

    get engine(): Engine {
        return (this.scene.get('Engine') as Engine);
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    public worldId: number;
    public myPenguinData: MyPenguinData;

    init(): void {
        let load = this.scene.get('Load') as Load;
        if (!load.isShowing) load.show({ logo: true });
    }

    create(data: { id: number }): void {
        this.worldId = data.id;
        this.myPenguinData = {
            id: '1000',
            name: 'Dan',
            avatar: {
                color: 7,
                head: 21073,
                face: 2104,
                neck: 10214,
                body: 4449,
                hand: 5501,
                feet: 6050,
                /*head: 0,
                face: 101,
                neck: 10214,
                body: 0,
                hand: 0,
                feet: 0,*/
                flag: 0,
                photo: 9269
            },
            iglooId: 0,
            member: {
                level: 5,
                since: ''
            },
            moderator: false,
            stealth: false
        };

        this.editorCreate();

        this.startWorld();
    }

    async startWorld(): Promise<void> {
        let load = this.scene.get('Load') as Load;
        load.track(new LoaderTask(this.load));

        this.postload();
        // TODO: load world here
        this.load.start();

        await load.waitAllTasksComplete();

        await new Promise<void>(resolve => this.scene.run('Interface', {
            oninit: (scene: Interface) => load.track(new LoaderTask(scene.load)),
            onready: () => resolve()
        }));

        await load.waitAllTasksComplete();

        let engine = await new Promise<Engine>(resolve => this.scene.run('Engine', {
            onready: (scene: Engine) => resolve(scene)
        }));

        this.game.friends.connect([
            {
                id: '10000001',
                name: 'Ray',
                avatar: {
                    color: 2,
                    head: 0,
                    face: 0,
                    neck: 0,
                    body: 0,
                    hand: 0,
                    feet: 0,
                    photo: 0,
                    flag: 0
                },
                publicStampbook: false,
                relationship: {
                    type: RelationshipType.FRIEND,
                    since: ''
                }
            },
            {
                id: '10000002',
                name: 'Koji',
                avatar: {
                    color: 2,
                    head: 0,
                    face: 0,
                    neck: 0,
                    body: 0,
                    hand: 0,
                    feet: 0,
                    photo: 0,
                    flag: 0
                },
                publicStampbook: false,
                relationship: {
                    type: RelationshipType.FRIEND,
                    since: ''
                }
            },
            {
                id: '10000003',
                name: 'ugly',
                avatar: {
                    color: 6,
                    head: 0,
                    face: 0,
                    neck: 0,
                    body: 0,
                    hand: 0,
                    feet: 0,
                    photo: 0,
                    flag: 0
                },
                publicStampbook: false,
                relationship: {
                    type: RelationshipType.FRIEND,
                    since: ''
                }
            },
            {
                id: '10000004',
                name: 'vanessa\'s mom',
                avatar: {
                    color: 2,
                    head: 0,
                    face: 0,
                    neck: 0,
                    body: 0,
                    hand: 0,
                    feet: 0,
                    photo: 0,
                    flag: 0
                },
                publicStampbook: false,
                relationship: {
                    type: RelationshipType.FRIEND,
                    since: ''
                }
            }
        ], [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '16', '28', '31', '32', '33'
        ], true, true, true);

        let roomConfig = this.game.gameConfig.rooms[this.getRandomItem(['100', '800', '801'])];
        console.log('Mocking room join on room', roomConfig);
        await engine.joinRoom(roomConfig);
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

    isPlayer(data: BasePenguinData): data is MyPenguinData {
        return data.id == this.myPenguinData.id;
    }

    isPlayerModerator(): boolean {
        return this.myPenguinData.moderator;
    }

    isMascot(data: BasePenguinData): boolean {
        return data.mascotId != undefined;
    }

    isMember(data: BasePenguinData): boolean {
        return data?.member != undefined;
    }

    isPending(data: PenguinData): boolean {
        return data.relationship?.type == RelationshipType.PENDING;
    }

    isFriend(data: PenguinData): boolean {
        return [RelationshipType.FRIEND, RelationshipType.BEST_FRIEND].includes(data.relationship?.type);
    }

    isBestFriend(data: PenguinData): boolean {
        return data.relationship?.type == RelationshipType.BEST_FRIEND;
    }

    isIgnored(data: PenguinData): boolean {
        return data.relationship?.type == RelationshipType.IGNORED;
    }

    openNamecardById(id: string): void {
        // TODO: fetch penguin data
        this.interface.openNamecard({
            id: id,
            name: 'Penguin of ' + id,
            avatar: {
                color: 2,
                head: 0,
                face: 0,
                neck: 0,
                body: 0,
                hand: 0,
                feet: 0,
                photo: 0,
                flag: 0
            },
            relationship: {
                type: RelationshipType.FRIEND,
                since: ''
            },
            publicStampbook: false
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
