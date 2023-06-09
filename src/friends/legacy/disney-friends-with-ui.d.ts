interface DisneyFriendsConnection {
    serviceUri: string;
    password?: string;
    swid?: string;
    user?: DisneyFriendsUser;
    connectionStatus: boolean;

    UNLOADING: "unloading";
    GAME_TIMEOUT: "gameTimeout";
    SERVICE_UNAVAILABLE: "503";
    LOW_RECONNECT_TIME_OUT_MAX_ITERATIONS: 2;
    LOW_RECONNECT_TIME_OUT_LENGTH: 15e3;
    LOW_RECONNECT_TIME_OUT_RANDOMIZER: 15e3;
    HIGH_RECONNECT_TIME_OUT_LENGTH: 24e4;
    HIGH_RECONNECT_TIME_OUT_RANDOMIZER: 6e4;

    disconnectReason: string;
    retries: number;
    hasConnected: boolean;
}

interface DisneyFriendsSettings {
    connection: DisneyFriendsConnection;
    settings: any;

    settingRequestHandler(): boolean;
    settingRequestResultHandler(settings: any[]): boolean;
    getSetting(key: string): string;
    addSetting(key: string, value: string): void;
}

type DisneyFriendsPresence = {
    id: string,
    status: string,
    mobile: boolean,
    location: {
        land: "disney:land:clubpenguin",
        world: string,
        room: number
    }
}

interface DisneyFriendsUser {
    connection: DisneyFriendsConnection;
    settings?: DisneyFriendsSettings;
    roster?: DisneyFriendsRoster;
    isPreActivated: boolean;
    presenceUpdateCount: number;
    lastPresenceSent: number;
    presence: any;

    getRoster(): DisneyFriendsRoster;
    setRoster(roster: DisneyFriendsRoster): void;
    getSettings(): DisneyFriendsSettings;
    setSettings(settings: DisneyFriendsSettings): void;
    getPresence(): {};
    setIsPreActivated(state: boolean): void;
}

type DisneyFriendsRosterFriend = {
    swid: string,
    name: string,
    weight: number,
    canJumpTo: boolean,
    groups: [],
    presence: DisneyFriendsPresence
};

type DisneyFriendsRosterPending = {
    swid: string,
    name: string,
    safeChatName: string,
    presence: {
        status: string
    }
}

type DisneyFriendsRosterIgnored = {
    swid: string,
    name: string,
    safeChatName: string
};

interface DisneyFriendsRoster {
    connection: DisneyFriendsConnection;
    user: DisneyFriendsUser
    friends: { [swid: string]: DisneyFriendsRosterFriend };
    pending: { [swid: string]: DisneyFriendsRosterPending };
    ignored: { [swid: string]: DisneyFriendsRosterIgnored };
    snowballReceipts: {}

    getFriends(): DisneyFriendsRoster['friends'];
    findGuest(swid: string): {};
    findFriend(swid: string): {};
    findIgnore(swid: string): {};
    findPending(swid: string): {};
    getOnlineFriends(): DisneyFriendsRosterFriend[];
    getIgnored(): DisneyFriendsRoster['ignored'];
    getPending(): DisneyFriendsRoster['pending'];
    updateFriend(friend: DisneyFriendsRosterFriend): void;
    populateRoster(data: { swid: string, name: string, presence: string }[]): void;
    populateCharacterRoster(data: { id: string, presence: string }[]): void;
    populateIgnored(data: any[]): void;
    populatePending(data: string[]): void;
    populateBestFriends(swids: string[]): void;
    characterRosterUpdateHandler(id: string, name: string): void;
    ignoreUpdateHandler(data: any[]): void;
    buddyRequestHandler(data: string[]): void;
    friendOffline(swid: string): void;
    friendOnline(swid: string, presenceId: string, world: string, roomId: number): void;
    characterOffline(id: string): void;
    characterOnline(id: string): void;
    mascotInvite(id: string): void;
    addFriendItem(data: string): void;
    updateFriendItem(data: string, n: boolean): void;
    removeFriendItem(swid: string): void;
    addCharacterItem(id: string, name: string): void;
    removeCharacterItem(id: string): void;
    addPendingItem(swid: string, name: string): DisneyFriendsRosterPending;
    updateIgnoredItem(elementId: string): DisneyFriendsRosterIgnored;
}

declare namespace Disney {
    let Friends: {
        PRESENCE_DOMAIN: "d",
        createJidFromSwid(swid: string): string,
        activeConnection?: DisneyFriendsConnection,
        activeUser?: DisneyFriendsUser,
        API: {
            connect(swid: string): void
            disconnect(reason: string): void
            toggle(state: boolean): void
            foundPlayer(data: any): void
        },
        Event: {
            addGameListener(event: string, namespace: string): void
        },
        Presence: {
            Status: {
                OFFLINE: "offline",
                ONLINE: "online",
                PENDING: "pending"
            },
            MobileRoomID: 1100,
            DetailLevel: {
                STATUS: 0,
                LAND: 1,
                LAND_DETAILS: 2
            }
        },
        Connection: new (uri?: string) => DisneyFriendsConnection,
        User: new (connection: DisneyFriendsConnection) => DisneyFriendsUser,
        Roster: new (connection: DisneyFriendsConnection, user: DisneyFriendsUser) => DisneyFriendsRoster,
        Settings: {
            new(connection: DisneyFriendsConnection): DisneyFriendsUser,
            Constants: {
                BEST_FRIEND_ENABLED: "be",
                BEST_HINT_COUNT: "bc",
                NOTIFICATION_AWARE: "na",
                FRIENDS_ENABLED: "fe"
            }
        },
        UI: {
            HudNotification: {
                reposition(): void
            }
        },
    }
}

declare global {
    interface Window {
        Disney: typeof Disney
    }
}

export function init(paths: {
    basePath: string,
    avatarUrl: string
}): void;
