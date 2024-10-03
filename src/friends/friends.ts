import * as CP from "@clubpenguin/club_penguin";
import { EventAbstract, DisneySocial, Data, Environment } from "./social";
import { FriendsUI } from "./ui";

export class RosterItem {
    swid: string;
    name: string;
    safeChatName: string;
    weight: number;
    canJumpTo: boolean;
    groups: string[];
    presence: Presence;
    character: boolean;
    jumpAvailable: boolean;

    constructor(swid: string = "", name: string = "", weight: number = 0, canJumpTo: boolean = false, groups?: string[], presence?: Presence) {
        this.swid = swid;
        this.name = name;
        this.weight = weight;
        this.canJumpTo = canJumpTo;
        this.groups = groups ?? [];
        this.presence = presence;
    }
}

export class Presence {
    status: string;
    id: string;
    location: { land: string; room: number, world: string };
    mobile: boolean;

    constructor(status: string = "", id: string = "", location?: { land: string; room: number, world: string }) {
        this.status = status;
        this.id = id;
        this.location = location;
        this.mobile = false;
    }
}

export class LandPresence {
    ns: string;
    id: number;
    location: { land?: string; room?: string };

    constructor(ns: string = "", id: number = 0, location?: { land: string; room: string }) {
        this.ns = ns;
        this.id = id;
        this.location = location ?? {};
    }
}

export class StanzaConstants {
    static XMLNS = "xmlns";
    static JID = "jid";
    static ID = "id";
    static FROM = "from";
    static IQ = "iq";
    static IQ_GET = "get";
    static IQ_SET = "set";
    static IQ_TYPE_ERROR = "error";
    static IQ_TYPE_RESULT = "result";
    static IQ_QUERY = "query";
    static IQ_ITEM = "item";
    static IQ_CHARACTER = "character";
    static IQ_NAME = "name";
    static LAND = "land";
    static STANZA_TYPE = "type";
    static PRESENCE = "presence";
    static SUBSCRIPTION = "subscription";
    static SUBSCRIPTION_REMOVE = "remove";
    static SUBSCRIPTION_BOTH = "both";
    static IGNORE_ITEM = "item";
    static IGNORE_JID = "jid";
    static IGNORE_REMOVE = "remove";
    static PRESENCE_TYPE_ERROR = "error";
    static PRESENCE_TYPE_SUBSCRIBE = "subscribe";
    static PRESENCE_TYPE_SUBSCRIBED = "subscribed";
    static PRESENCE_TYPE_UNSUBSCRIBED = "unsubscribed";
    static PRESENCE_TYPE_UNAVAILABLE = "unavailable";
    static SETTING_ITEM = "setting";
    static SETTING_NAME = "name";
    static SETTING_VALUE = "value";
    static SETTING_REMOVE = "remove";
    static WEIGHT = "weight";
    static MESSAGE = "message";
}

export class EventWarning {
    static FRIENDS_LIMIT: string = "friendsLimit";
    static IGNORED_LIMIT: string = "ignoreLimit";
    static BEST_FRIENDS_LIMIT: string = "bestFriendsLimit";
}

export class FriendsEvent {
    static Warning = EventWarning;

    static USER_PRESENCE_UPDATE = "userPresenceUpdate";
    static FRIENDS_NEW = "friendsNew";
    static FRIENDS_UPDATE = "friendsUpdate";
    static FRIENDS_GOT_SETTINGS = "friendsGotSettings";
    static FRIENDS_WEIGHT_UPDATE = "friendsWeightUpdate";
    static FRIENDS_REMOVE = "friendsRemove";
    static PENDING_UPDATE = "pendingUpdate";
    static PENDING_REMOVE = "pendingRemove";
    static HUD_UPDATE = "hudUpdate";
    static SHOWING_NOTIFICATION = "showingNotification";
    static CLOSED_NOTIFICATION = "closedNotification";
    static CHARACTER_INVITE = "characterInvite";
    static IGNORED_UPDATE = "ignoredUpdate";
    static FRIENDS_JUMP = "friendsJump";
    static FRIENDS_JUMP_AVAILABLE = "friendsJumpAvailable";
    static FRIENDS_JUMP_FAILED = "friendsJumpFailed";
    static JUMP_STATUS_FOR_ROOMS_UPDATE = "jumpStatusForRoomsUpdate";
    static SHOW_PLAYER_CARD = "showPlayerCard";
    static SHOW_CHARACTER_CARD = "showCharacterCard";
    static DISCONNECTED = "disconnected";
    static CONNECTED = "connected";
    static FIND_PLAYER = "findPlayer";
    static FOUND_PLAYER = "foundPlayer";
    static FIND_PLAYER_NOT_FOUND = "findPlayerNotFound";
    static FIND_PLAYER_EXISTING_FRIEND = "findPlayerExistingFriend";
    static FIND_PLAYER_EXISTING_IGNORE = "findPlayerExistingIgnore";
    static SAFE_CHAT_CONNECTION_UPDATE = "safeChatConnectionUpdate";
    static RECEIVED_SNOWBALL = "receivedSnowball";

    private static eventManager: EventAbstract;

    static addListener(event: string, listener: Function): void {
        this.eventManager.addListener(event, listener);
    }

    static addGameListener(event: string, namespace: string): void {
        this.eventManager.addGameListener(event, namespace);
    }

    static initEventManager(): void {
        this.eventManager = new EventAbstract();
    }

    static updateListeners(event: string, ...args: any[]): void {
        this.eventManager.updateListeners(event, ...args);
    }
}

export class FriendsAPI {
    static currentHudVisibilityTimeout: ReturnType<typeof setTimeout> | null = null;
    static getFriends(): { [swid: string]: RosterItem } {
        return DisneyFriends.activeUser.getRoster().getFriends();
    }

    static getOnlineFriends(): { [swid: string]: RosterItem } {
        return DisneyFriends.activeUser.getRoster().getOnlineFriends();
    }

    static getIgnored(): { [swid: string]: RosterItem } {
        return DisneyFriends.activeUser.getRoster().getIgnored();
    }

    static connect(swid: string, serviceUri?: string): void {
        DisneyFriends.activeConnection = new Connection(serviceUri);
        DisneyFriends.activeConnection.connect();
        DisneyFriends.activeConnection.swid = swid;
    }

    static getSwid(): string {
        if (DisneyFriends.activeConnection !== undefined && DisneyFriends.activeConnection !== null) {
            return DisneyFriends.activeConnection.swid;
        }
    }

    static disconnect(reason: string): void {
        if (DisneyFriends.activeConnection && reason == "gameTimeout") {
            this.toggle(false);
        }
    }

    static requestFriendship(swid: string): void {
        DisneyFriends.activeUser.roster.requestFriendship(swid);
    }

    static acceptFriendship(swid: string): void {
        DisneyFriends.activeUser.roster.acceptFriendship(swid);
    }

    static rejectFriendship(swid: string): void {
        DisneyFriends.activeUser.roster.rejectFriendship(swid);
    }

    static toggle(state?: boolean): void {
        if (state == null) {
            FriendsUI.toggleFriendsSection();
        } else if (state) {
            FriendsUI.showFriendsSection();
        } else {
            FriendsUI.hideFriendsSection();
        }
    }

    static updateFriend(e: any): void {
        DisneyFriends.activeUser.roster.updateFriend(e);
    }

    static connectedToSafeChat(): boolean {
        return DisneyFriends.activeUser.connectedToSafeChat;
    }

    static jumpToFriend(e: string): boolean {
        return this.jump(e, Jump.MAKE_RESERVATION_AND_DO_THE_JUMP);
    }

    static jumpToCharacter(character: any): void {
        if (character !== undefined && character.id !== undefined && character.location !== undefined) {
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_JUMP, {
                id: character.id,
                location: character.location,
                type: Jump.DO_THE_JUMP
            });
        }
    }

    static jump(swid: string, jumpType: any): boolean {
        const friends = this.getFriends();
        if (friends[swid] !== undefined && friends[swid].presence !== undefined && friends[swid].presence.id !== undefined) {
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_JUMP, {
                id: friends[swid].presence.id,
                location: friends[swid].presence.location,
                swid: swid,
                type: jumpType
            });
            return true;
        }
        return false;
    }

    static pollJumpStatus(e: any): void {
        Jump.pollJumpStatus(e);
    }

    static getJumpStatus(e: any): void {
        //DisneyFriendsJump.getJumpStatus(e);
    }

    static findPlayerByName(e: string): void {
        FriendsEvent.updateListeners(FriendsEvent.FIND_PLAYER, e);
    }

    static foundPlayer(player: any): void {
        if (player.playerId > 0) {
            if (DisneyFriends.activeUser.roster.findFriend(player.swid) !== undefined) {
                FriendsEvent.updateListeners(FriendsEvent.FIND_PLAYER_EXISTING_FRIEND, player.name);
            } else if (DisneyFriends.activeUser.roster.findIgnore(player.swid) !== undefined) {
                FriendsEvent.updateListeners(FriendsEvent.FIND_PLAYER_EXISTING_IGNORE, player.name);
            } else {
                FriendsEvent.updateListeners(FriendsEvent.FOUND_PLAYER, player);
            }
        } else {
            FriendsEvent.updateListeners(FriendsEvent.FIND_PLAYER_NOT_FOUND, player.name);
        }
    }

    static showPlayerCard(swid: string): void {
        const player = DisneyFriends.activeUser.roster.findGuest(swid);
        let land: string;
        if (player !== undefined && player.presence !== undefined && player.presence.location !== undefined) {
            land = player.presence.location.land;
        } else if (player !== undefined) {
            land = "disney:land:clubpenguin";
        }
        if (DisneySocial.currentLand == land) {
            FriendsEvent.updateListeners(FriendsEvent.SHOW_PLAYER_CARD, swid);
        }
    }

    static showCharacterCard(id: string): void {
        if (DisneyFriends.activeUser.roster.findGuest(id) !== undefined) {
            FriendsEvent.updateListeners(FriendsEvent.SHOW_CHARACTER_CARD, id);
        }
    }

    static showingNotification(): void {
        FriendsEvent.updateListeners(FriendsEvent.SHOWING_NOTIFICATION);
    }

    static closedNotification(): void {
        FriendsEvent.updateListeners(FriendsEvent.CLOSED_NOTIFICATION);
    }

    static hudVisibilityChanged(state: boolean): void {
        if (!DisneySocial.shortCircuit(1, this, arguments.callee, arguments)) {
            if (typeof this.currentHudVisibilityTimeout == "number") {
                clearTimeout(this.currentHudVisibilityTimeout);
            }
            if (state) {
                this.currentHudVisibilityTimeout = setTimeout(() => {
                    FriendsEvent.updateListeners(FriendsEvent.HUD_UPDATE, state);
                }, 500);
            } else {
                FriendsEvent.updateListeners(FriendsEvent.HUD_UPDATE, state);
            }
        }
    }
}

export class User {
    connection: Connection;
    settings: Settings;
    roster: Roster;
    isPreActivated: boolean;
    presenceUpdateCount: number;
    lastPresenceSent: number;
    presence: any;
    connectedToSafeChat: boolean;

    constructor(connection: Connection) {
        this.connection = connection;
        this.settings = null;
        this.roster = null;
        this.isPreActivated = false;
        this.presenceUpdateCount = 0;
        this.lastPresenceSent = 0;
        this.presence = {};
    }

    getRoster(): Roster {
        return this.roster;
    }

    setRoster(e: any): void {
        this.roster = e;
    }

    getSettings(): Settings {
        return this.settings;
    }

    setSettings(e: any): void {
        this.settings = e;
    }

    getPresence(): any {
        return this.presence;
    }

    setIsPreActivated(e: boolean): void {
        this.isPreActivated = e;
    }
}

export class Roster {
    connection: Connection;
    user: User;
    friends: { [swid: string]: RosterItem };
    pending: { [swid: string]: RosterItem };
    ignored: { [swid: string]: RosterItem };
    snowballReceipts: { [ticket: string]: any };

    constructor(connection: Connection, user: User) {
        this.connection = connection;
        this.user = user;
        this.friends = {};
        this.pending = {};
        this.ignored = {};
        this.snowballReceipts = {};
    }

    getFriends(): { [swid: string]: RosterItem } {
        return this.friends;
    }

    findGuest(swid: string): RosterItem {
        let i = this.findFriend(swid);
        if (i == undefined) {
            i = this.findPending(swid);
        }
        if (i == undefined) {
            i = this.findIgnore(swid);
        }
        return i;
    }

    findFriend(swid: string): RosterItem {
        return this.friends[swid];
    }

    findIgnore(swid: string): RosterItem {
        return this.ignored[swid];
    }

    findPending(swid: string): RosterItem {
        return this.pending[swid];
    }

    getOnlineFriends(): any {
        const i: any = {};
        for (const e in this.friends) {
            const n = this.friends[e];
            if (n.presence.status !== FriendsPresence.Status.OFFLINE) {
                i[e] = n;
            }
        }
        return i;
    }

    getIgnored(): { [swid: string]: RosterItem } {
        return this.ignored;
    }

    getPending(): { [swid: string]: RosterItem } {
        return this.pending;
    }

    requestFriendship(swid: string): void {
        CP.sendBuddyRequest(swid);
    }

    acceptFriendship(swid: string): void {
        CP.sendAcceptBuddyRequest(swid);
        delete this.pending[swid];
        FriendsEvent.updateListeners(FriendsEvent.PENDING_REMOVE, swid);
    }

    rejectFriendship(swid: string): void {
        CP.sendRejectBuddyRequest(swid);
        delete this.pending[swid];
        FriendsEvent.updateListeners(FriendsEvent.PENDING_REMOVE, swid);
    }

    updateFriend(data: RosterItem): void {
        this.friends[data.swid] = $.extend({}, this.friends[data.swid], data);
        FriendsEvent.updateListeners(FriendsEvent.FRIENDS_UPDATE, this.friends);
    }

    addIgnoredResultHandler(element: JQuery.Selector | HTMLElement | JQuery): boolean {
        const isError = $(element as JQuery.Selector).attr(StanzaConstants.STANZA_TYPE) === StanzaConstants.IQ_TYPE_ERROR;
        const errorCode = $(element as JQuery.Selector).find("error").prop("code");

        if (isError && errorCode === "7") {
            FriendsEvent.updateListeners(EventWarning.IGNORED_LIMIT);
            return false;
        }

        return false;
    }

    populateRoster(roster: { swid: string, name: string, presence: string }[]): void {
        roster.forEach(item => {
            this.addFriendItem(item.swid, item.name, item.presence);
        });
        FriendsEvent.updateListeners(FriendsEvent.FRIENDS_UPDATE, this.friends);
    }

    populateIgnored(swids: string[]): void {
        this.ignored = {};
        swids.filter(Boolean).forEach((item) => {
            const [swid, name] = item.split("|");
            this.addIgnoredItem(swid, name);
        });
        FriendsEvent.updateListeners(FriendsEvent.IGNORED_UPDATE, this.ignored);
    }

    populatePending(swids: string[]): void {
        swids.filter(Boolean).forEach((item) => {
            const [swid, name] = item.split("|");
            const pending = this.addPendingItem(swid, name);
            FriendsEvent.updateListeners(FriendsEvent.PENDING_UPDATE, pending);
        });
    }

    populateBestFriends(swids: string[]): void {
        swids.filter(Boolean).forEach((item) => {
            FriendsUI.setBestFriend(item);
        });
    }

    populateBestCharacters(swids: string[]): void {
        swids.filter(Boolean).forEach((item) => {
            FriendsUI.setBestFriend("character_" + item);
        });
    }

    populateCharacterRoster(roster: { id: string, presence: string }[]): void {
        roster.filter(Boolean).forEach((item) => {
            this.addCharacterItem(item.id, item.presence);
            if (item.presence == FriendsPresence.Status.ONLINE) {
                FriendsEvent.updateListeners(FriendsEvent.CHARACTER_INVITE, item.id);
            }
        });
        FriendsEvent.updateListeners(FriendsEvent.FRIENDS_UPDATE, this.friends);
    }

    rosterUpdateHandler(details: string[] | string, added: boolean): void {
        if (added == false) {
            const removed = this.removeFriendItem(details as string);
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_REMOVE, removed);
        } else {
            let [ swid, name, presence ] = details as string[];
            const status = parseInt(presence, 10) ? FriendsPresence.Status.ONLINE : FriendsPresence.Status.OFFLINE;
            const added = this.addFriendItem(swid, name, status);
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_NEW, added);
        }
    }

    characterRosterUpdateHandler(details: [string, string]): void {
        let [ id, status ] = details;
        const added = this.addCharacterItem(id, status);
        FriendsEvent.updateListeners(FriendsEvent.FRIENDS_NEW, added);
    }

    ignoreUpdateHandler(items: string | string[], i: boolean): void {
        if (i == false && typeof items == "string") {
            this.removeIgnoredItem(items);
            FriendsEvent.updateListeners(FriendsEvent.IGNORED_UPDATE, this.ignored);
        } else if (i == true && typeof items == "object") {
            this.addIgnoredItem(items[0], items[1]);
            FriendsEvent.updateListeners(FriendsEvent.IGNORED_UPDATE, this.ignored);
        }
    }

    buddyRequestHandler(details: any[]): void {
        const [swid, name] = details;
        const pending = this.addPendingItem(swid, name);
        FriendsEvent.updateListeners(FriendsEvent.PENDING_UPDATE, pending);
    }

    friendOffline(swidd: string): void {
        const i = this.friends[swidd];
        if (i !== undefined) {
            i.presence.status = FriendsPresence.Status.OFFLINE;
            delete i.presence.id;
            delete i.presence.location;
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_UPDATE, i);
        }
    }

    friendOnline(details: [string, string, number]): void {
        const [swid, world, room] = details;
        const s = this.friends[swid];
        if (s !== undefined) {
            s.presence.status = FriendsPresence.Status.ONLINE;
            s.presence.location.world = world;
            s.presence.location.room = room;
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_UPDATE, s);
        }
    }

    addCharacterItem(id: string, status: string): any {
        const t = new Presence(status, id, {
            land: "disney:land:clubpenguin",
            room: null,
            world: null
        });
        t.mobile = false;
        const n = new RosterItem("character_" + id, Data.mascots[id].name);
        n.character = true;
        n.safeChatName = n.name;
        n.presence = t;
        this.friends[id] = n;
        return n;
    }

    characterOffline(id: string): void {
        const i = this.friends[id];
        if (i !== undefined) {
            i.presence.status = FriendsPresence.Status.OFFLINE;
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_UPDATE, i);
        }
    }

    characterOnline(details: [string, string, number]): void {
        const [id, world, room] = details;
        const s = this.friends[id];
        if (s !== undefined) {
            s.presence.status = FriendsPresence.Status.ONLINE;
            s.presence.location.world = world;
            s.presence.location.room = room;
            FriendsEvent.updateListeners(FriendsEvent.FRIENDS_UPDATE, s);
        }
    }

    mascotInvite(e: string): void {
        FriendsEvent.updateListeners(FriendsEvent.CHARACTER_INVITE, e);
    }

    addFriendItem(swid: string, name: string, status: string): RosterItem {
        const s = new Presence(status, swid, {
            land: "disney:land:clubpenguin",
            room: null,
            world: null
        });
        s.mobile = false;
        const t = new RosterItem(swid, name);
        t.safeChatName = name;
        t.groups = [];
        t.jumpAvailable = false;
        t.presence = s;
        this.friends[swid] = t;
        return t;
    }

    removeFriendItem(swid: string): string {
        delete this.friends[swid];
        return swid;
    }

    addPendingItem(swid: string, name: string): any {
        const t = new Presence(FriendsPresence.Status.PENDING);
        const n = new RosterItem(swid, name);
        n.presence = t;
        this.pending[swid] = n;
        return n;
    }

    addIgnoredItem(swid: string, name: string): any {
        const n = new RosterItem(swid, name);;
        n.safeChatName = name;
        this.ignored[swid] = n;
        return n;
    }

    removeIgnoredItem(swid: string): string {
        delete this.ignored[swid];
        return swid;
    }
}

export class Settings {
    connection: Connection;
    settings: Record<string, string>;

    constructor(connection: Connection) {
        this.connection = connection;
        this.settings = {};
    }

    settingRequestHandler(): boolean {
        return false;
    }

    settingRequestResultHandler(settings: string[]): boolean {
        this.settings = {};
        if (settings.length > 0) {
            this.settings[Settings.Constants.BEST_HINT_COUNT] = settings.shift();
            this.settings[Settings.Constants.NOTIFICATION_AWARE] = settings.shift();
            this.settings[Settings.Constants.FRIENDS_ENABLED] = settings.shift();
            this.settings[Settings.Constants.BEST_FRIEND_ENABLED] = settings.shift();
        }
        FriendsEvent.updateListeners(FriendsEvent.FRIENDS_GOT_SETTINGS, this.settings);
        return false;
    }

    getSetting(e: string): any {
        return this.settings[e];
    }

    addSetting(e: string, i: any): void {
        this.settings[e] = i;
    }

    static Constants = {
        BEST_FRIEND_ENABLED: "be",
        BEST_HINT_COUNT: "bc",
        NOTIFICATION_AWARE: "na",
        FRIENDS_ENABLED: "fe"
    };
}

export class Character {
    connection: any;

    constructor(connection: any) {
        this.connection = connection;
    }

    messageHandler(e: any): boolean {
        e = $(e).find("presence");
        FriendsEvent.updateListeners(FriendsEvent.CHARACTER_INVITE, e[0]);
        return true;
    }
}

export class FriendsPresence {
    static Status = {
        OFFLINE: "offline",
        ONLINE: "online",
        PENDING: "pending"
    };

    static MobileRoomID = 1100;

    static DetailLevel = {
        STATUS: 0,
        LAND: 1,
        LAND_DETAILS: 2
    };
}

export class Connection {
    serviceUri: string;
    password: string | null = null;
    swid: string | null = null;
    user: any = null;
    connectionStatus: boolean = false;
    characterHandler: Character | null = null;
    disconnectReason: string = "";
    retries: number = 0;
    hasConnected: boolean = false;

    UNLOADING = "unloading";
    GAME_TIMEOUT = "gameTimeout";
    SERVICE_UNAVAILABLE = "503";
    LOW_RECONNECT_TIME_OUT_MAX_ITERATIONS = 2;
    LOW_RECONNECT_TIME_OUT_LENGTH = 15000;
    LOW_RECONNECT_TIME_OUT_RANDOMIZER = 15000;
    HIGH_RECONNECT_TIME_OUT_LENGTH = 240000;
    HIGH_RECONNECT_TIME_OUT_RANDOMIZER = 60000;

    constructor(serviceUri: string) {
        this.serviceUri = serviceUri;
    }

    connect(): void {
        if (this.user == null) {
            this.user = new User(this);
        }
        this.connectionStatus = true;
        DisneyFriends.activeUser = this.user;

        let roster = new Roster(this, this.user);
        this.user.setRoster(roster);

        let settings = new Settings(this);
        this.user.setSettings(settings);

        this.characterHandler = new Character(this);
        this.disconnectReason = "";

        FriendsEvent.updateListeners(FriendsEvent.CONNECTED, { sid: "sid" });

        this.retries = 0;
        this.hasConnected = true;
    }
}

export class Jump {
    static MAKE_RESERVATION = 1;
    static DO_THE_JUMP = 2;
    static MAKE_RESERVATION_AND_DO_THE_JUMP = 3;
    static START_OF_IGLOO_ROOM_IDS = 1000;

    static availableRoomLocations: Record<number, number[]> = {};
    static availableIglooLocations: Record<number, { open: number[], closed: number[] }> = {};
    static lastPollTimestamp: number = 0;
    static pendingJump: any = null;
    static jumpEnabled: boolean = false;

    static canJump(worldId: number, roomId: number): boolean {
        if (!this.jumpEnabled) return false;

        if ($.inArray(roomId, this.availableRoomLocations[worldId]) !== -1) return true;

        const iglooLocations = this.availableIglooLocations[worldId];
        if (iglooLocations == undefined) return false;

        if ($.inArray(roomId, iglooLocations.open) !== -1) return true;

        if ($.inArray(roomId, iglooLocations.closed) !== -1) {
            const onlineFriends = DisneyFriends.activeUser.getRoster().getOnlineFriends();
            for (const friendId in onlineFriends) {
                if (onlineFriends.hasOwnProperty(friendId)) {
                    const friendPresenceId = onlineFriends[friendId].presence.id;
                    if (friendPresenceId !== undefined && friendPresenceId + this.START_OF_IGLOO_ROOM_IDS == roomId) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    static pollJumpStatus(e: boolean): void {
        if (this.jumpEnabled) {
            if (e) {
                this.startPolling();
            } else {
                this.stopPolling();
            }
        }
    }

    static startPolling(): void {
        if (!this.pollInterval) {
            if (this.lastPollTimestamp + Environment.JUMP_STATUS_POLLING_INTERVAL < new Date().getTime()) {
                this.pollJumpState();
            }
            this.pollInterval = setInterval(this.pollJumpState, Environment.JUMP_STATUS_POLLING_INTERVAL);
        }
    }

    static stopPolling(): boolean {
        if (!this.pollInterval) return false;
        clearInterval(this.pollInterval);
        this.pollInterval = undefined;
        return true;
    }

    static pollJumpState(): void {
        const uniqueWorlds = this.findUniqueWorlds();
        if (uniqueWorlds.length > 0) {
            this.queryJumpStateServiceForRooms(uniqueWorlds);
            this.lastPollTimestamp = new Date().getTime();
        }
    }

    static findUniqueWorlds(): number[] {
        if (DisneyFriends.activeUser == null) return [];

        const uniqueWorlds: Record<number, boolean> = {};
        const onlineFriends = DisneyFriends.activeUser.getRoster().getOnlineFriends();

        for (const friendId in onlineFriends) {
            if (onlineFriends.hasOwnProperty(friendId)) {
                const friendPresenceLocation = onlineFriends[friendId].presence.location;
                if (friendPresenceLocation !== undefined && friendPresenceLocation !== null) {
                    uniqueWorlds[friendPresenceLocation.world] = true;
                }
            }
        }

        return Object.keys(uniqueWorlds).map(Number);
    }

    static queryJumpStateServiceForRooms(worlds: number[]): void {
        const query = {
            s: DisneyFriends.activeConnection.swid,
            l: DisneySocial.getPageLang(),
            w: worlds
        };

        $.ajax(Environment.JUMP_STATUS_FOR_ROOMS_URL, {
            dataType: "jsonp",
            data: { query: JSON.stringify(query) },
            success: this.processJumpStateResponseForRooms
        });
    }

    static processJumpStateResponseForRooms(response: any[]): void {
        this.availableRoomLocations = {};
        this.availableIglooLocations = {};

        for (const room of response) {
            this.availableRoomLocations[room.w] = room.r;
            this.availableIglooLocations[room.w] = {
                open: room.o,
                closed: room.c
            };
        }

        FriendsEvent.updateListeners(FriendsEvent.JUMP_STATUS_FOR_ROOMS_UPDATE, null);
    }

    static pollInterval: ReturnType<typeof setInterval> | undefined;
}

export class DisneyFriends {
    static StanzaConstants = StanzaConstants;
    static Event = FriendsEvent;
    static API = FriendsAPI;
    static User = User;
    static Roster = Roster;
    static Settings = Settings;
    static Character = Character;
    static Presence = FriendsPresence;
    static Connection = Connection;
    static Jump = Jump;
    static UI = FriendsUI;
    static Data = {
        RosterItem,
        Presence,
        LandPresence
    };

    static PRESENCE_DOMAIN: string = "d";

    static createJidFromSwid(swid: string): string {
        return `${swid}@${this.PRESENCE_DOMAIN}`;
    }

    static activeConnection: Connection = null;
    static activeUser: User = null;
}
