import Phaser from 'phaser';
import type { App } from '../app/app';
import type HandlerInit from './legacy/legacy_handler';
import type Interface from '../world/interface/Interface';
import type World from '../world/World';
import { PenguinData } from '../net/types/penguin/penguin';
import { RelationshipType } from '../net/types/penguin/relationship';

export enum FriendsEvents {
    USER_PRESENCE_UPDATE = "userPresenceUpdate",
    FRIENDS_NEW = "friendsNew",
    FRIENDS_UPDATE = "friendsUpdate",
    FRIENDS_GOT_SETTINGS = "friendsGotSettings",
    FRIENDS_WEIGHT_UPDATE = "friendsWeightUpdate",
    FRIENDS_REMOVE = "friendsRemove",
    PENDING_UPDATE = "pendingUpdate",
    PENDING_REMOVE = "pendingRemove",
    HUD_UPDATE = "hudUpdate",
    SHOWING_NOTIFICATION = "showingNotification",
    CLOSED_NOTIFICATION = "closedNotification",
    CHARACTER_INVITE = "characterInvite",
    IGNORED_UPDATE = "ignoredUpdate",
    IGNORE_LIMIT = "ignoreLimit",
    FRIENDS_JUMP = "friendsJump",
    FRIENDS_JUMP_AVAILABLE = "friendsJumpAvailable",
    FRIENDS_JUMP_FAILED = "friendsJumpFailed",
    JUMP_STATUS_FOR_ROOMS_UPDATE = "jumpStatusForRoomsUpdate",
    SHOW_PLAYER_CARD = "showPlayerCard",
    SHOW_CHARACTER_CARD = "showCharacterCard",
    DISCONNECTED = "disconnected",
    CONNECTED = "connected",
    FIND_PLAYER = "findPlayer",
    FOUND_PLAYER = "foundPlayer",
    FIND_PLAYER_NOT_FOUND = "findPlayerNotFound",
    FIND_PLAYER_EXISTING_FRIEND = "findPlayerExistingFriend",
    FIND_PLAYER_EXISTING_IGNORE = "findPlayerExistingIgnore",
    SAFE_CHAT_CONNECTION_UPDATE = "safeChatConnectionUpdate",
    RECEIVED_SNOWBALL = "receivedSnowball",
}

export enum Presence {
    ONLINE = 'online',
    OFFLINE = 'offline',
    PENDING = 'pending'
}

export class Friends extends Phaser.Events.EventEmitter {
    public app: App;
    protected instance: typeof window.Disney;

    public namespace = "disney:land:clubpenguin";

    constructor(app: App) {
        super();
        this.app = app;
    }

    get world(): World {
        return this.app.scene.getScene('World') as World;
    }

    get interface(): Interface {
        return this.app.scene.getScene('Interface') as Interface;
    }

    async init(...params: Parameters<typeof HandlerInit>): Promise<void> {
        if (this.instance) return;

        this.instance = (await import('./legacy/legacy_handler')).default(...params);

        this.on(FriendsEvents.CONNECTED, this.onConnected, this);
        this.on(FriendsEvents.DISCONNECTED, this.onDisconnected, this);
        this.on(FriendsEvents.SHOW_PLAYER_CARD, this.onShowPlayerCard, this);
        this.on(FriendsEvents.SHOW_CHARACTER_CARD, this.onShowCharacterCard, this);
        this.on(FriendsEvents.FIND_PLAYER, this.onFindPlayer, this);

    }

    addListener(event: string, fn: Function, context?: any): this {
        super.addListener(event, fn, context);
        this.instance.Friends.Event.addGameListener(event, this.namespace);
        return this;
    }

    on(event: string, fn: Function, context?: any): this {
        super.on(event, fn, context);
        this.instance.Friends.Event.addGameListener(event, this.namespace);
        return this;
    }

    connect(friends: PenguinData[], characters: string[], notificationsEnabled: boolean, friendsEnabled: boolean, bestFriendsEnabled: boolean): void {
        this.instance.Friends.API.connect(this.world.myPenguinData.id);

        let roster = friends.filter(data => data.relationship.type == RelationshipType.FRIEND || data.relationship.type == RelationshipType.BEST_FRIEND);
        let bestFriends = friends.filter(data => data.relationship.type == RelationshipType.BEST_FRIEND).map(data => data.id);

        this.instance.Friends.activeUser.settings.settingRequestResultHandler([
            bestFriends.length, notificationsEnabled, friendsEnabled, bestFriendsEnabled
        ]);
        this.instance.Friends.activeUser.roster.populateRoster(roster.map(data => ({ swid: data.id, name: data.nickname, presence: Presence.OFFLINE.toString() })));
        this.instance.Friends.activeUser.roster.populateBestFriends(bestFriends);
        this.instance.Friends.activeUser.roster.populateCharacterRoster(characters.map(id => ({ id, presence: Presence.OFFLINE.toString() })));
    }

    reposition(): void {
        if (this.instance) this.instance.Friends.UI.HudNotification
    }

    disconnect(): void {
        this.instance.Friends.API.disconnect("gameTimeout");
    }

    toggle(state?: boolean): void {
        this.instance.Friends.API.toggle(state);
    }

    /** Disney Friends API */

    onConnected(data: { sid: number }): void {

    }

    onDisconnected(): void {

    }

    onShowPlayerCard(swid: string) {
        this.world.openNamecardById(swid);
    }

    onShowCharacterCard(id: string) {
        this.world.openNamecardById(id);
    }

    async onFindPlayer(name: string) {
        let user;
        try {
            user = await this.app.airtower.getUserByName(name);
        } catch(e) {
            user = undefined;
        }

        let player = user != undefined ? {
            playerId: user.data.id,
            swid: user.data.id,
            name: name
        } : {
            playerId: 0
        };
        this.instance.Friends.API.foundPlayer(player);
    }

    friendsEventHandler(event: string, params: any[]): void {
        this.emit(event, ...params);
    }

    sendBuddyRequest(swid: string): void {

    }

    sendAcceptBuddyRequest(swid: string): void {
        this.sendBuddyRequest(swid);
    }

    sendRejectBuddyRequest(swid: string): void {

    }

    sendToggleBestFriend(swid: string): void {

    }

    sendToggleBestCharacter(id: string): void {

    }
}
