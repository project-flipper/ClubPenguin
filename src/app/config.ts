import type Load from "../load/Load";
import { LoaderTask } from "../load/tasks";
import type { App } from "./app";
import Phaser from "phaser";

export interface GeneralConfig {
    mascot_options: {
        migrator_active: boolean
    },
    party_options: {
        fair_ticket_active: boolean,
        hunt_active: boolean,
        itemRewardID: number,
        isMapNoteActive: boolean,
        showPartyAnnouncement: boolean,
        party_icon_active: boolean
    },
    igloo_options: {
        contestRunning: boolean
    },
    oops_test: {
        testEnabled: boolean
    },
    island_options: {
        isDaytime: boolean
    },
    party_dates: { [date: string]: string }
}

export interface RoomConfig {
    room_id: number,
    room_key: string,
    name: string,
    display_name: string,
    music_id: number,
    is_member: boolean,
    path: string,
    max_users: number,
    jump_enabled: boolean,
    required_item?: number,
    short_name: string,
    pin_id?: number,
    pin_x?: number,
    pin_y: number
}

export interface PaperItemConfig {
    paper_item_id: number,
    type: number,
    cost: number,
    is_member: boolean,
    label: string,
    prompt: string,
    layer: number,
    is_epf?: boolean,
    custom_depth?: number,
    has_translations?: boolean,
    is_back?: boolean,
    has_back?: boolean,
    make_tour_guide?: boolean,
    make_secret_agent?: boolean,
    is_medal?: boolean,
    is_gift?: boolean,
    no_purchase_popup?: boolean,
    exclusive?: number,
    is_bait?: boolean
    is_game_achievable?: boolean
}

export interface GameConfig {
    name: string,
    room_id: number,
    music_id: number,
    stamp_group_id: number
    path: string
    show_player_in_room: boolean
}

export default class Config {
    public app: App;

    constructor(app: App) {
        this.app = app;
    }

    public general: GeneralConfig;
    public penguin_action_frames: { [id: string]: { head: number, face: number, neck: number, body: number, hand: number, feet: number, secret_frame: number }[] };
    public player_colors: { [id: string]: string };

    public games: { [id: string]: GameConfig }
    public furniture_items: any;
    public igloo_floors: any;
    public igloo_locations: any;
    public igloo_music_tracks: any;
    public igloos: any;
    public jokes: string[];
    public mascot_messages: any;
    public mascots: any;
    public paper_items: { [itemId: string]: PaperItemConfig; };
    public rooms: { [roomId: string]: RoomConfig; };

    addGlobalConfig(loader: Phaser.Loader.LoaderPlugin, cache: Phaser.Cache.CacheManager, key: string): void {
        if (cache.json.exists(`config-global-${key}`)) cache.json.remove(`config-global-${key}`);
        loader.json(`config-global-${key}`, `config/${key}.json`);
    }

    getGlobalConfig(cache: Phaser.Cache.CacheManager, key: string): any {
        return cache.json.get(`config-global-${key}`);
    }

    addLocalConfig(loader: Phaser.Loader.LoaderPlugin, cache: Phaser.Cache.CacheManager, locale: string, key: string): void {
        if (cache.json.exists(`config-${locale}-${key}`)) cache.json.remove(`config-${locale}-${key}`);
        loader.json(`config-${locale}-${key}`, `config/${locale}/${key}.json`);
    }

    getLocalConfig(cache: Phaser.Cache.CacheManager, locale: string, key: string): any {
        return cache.json.get(`config-${locale}-${key}`);
    }

    async load(locale: string): Promise<void> {
        let load = this.app.scene.getScene('Load') as Load;
        let loader = load.load;
        let cache = load.cache;

        let task = load.track(new LoaderTask(loader));

        this.addGlobalConfig(loader, cache, 'general');
        this.addGlobalConfig(loader, cache, 'penguin_action_frames');
        this.addGlobalConfig(loader, cache, 'player_colors');

        this.addLocalConfig(loader, cache, locale, 'games');
        this.addLocalConfig(loader, cache, locale, 'furniture_items');
        this.addLocalConfig(loader, cache, locale, 'igloo_floors');
        this.addLocalConfig(loader, cache, locale, 'igloo_locations');
        this.addLocalConfig(loader, cache, locale, 'igloo_music_tracks');
        this.addLocalConfig(loader, cache, locale, 'igloos');
        this.addLocalConfig(loader, cache, locale, 'jokes');
        this.addLocalConfig(loader, cache, locale, 'mascot_messages');
        this.addLocalConfig(loader, cache, locale, 'mascots');
        this.addLocalConfig(loader, cache, locale, 'paper_items');
        this.addLocalConfig(loader, cache, locale, 'rooms');

        loader.start();
        let result = await task.wait();
        if (result.data.totalFailed > 0) throw new Error(`Game configs failed to load! ${result.data.totalFailed} failed out of ${result.data.totalFailed + result.data.totalComplete}`);

        this.general = this.getGlobalConfig(cache, 'general');
        this.penguin_action_frames = this.getGlobalConfig(cache, 'penguin_action_frames');
        this.player_colors = this.getGlobalConfig(cache, 'player_colors');

        this.games = this.getLocalConfig(cache, locale, 'games');
        this.furniture_items = this.getLocalConfig(cache, locale, 'furniture_items');
        this.igloo_floors = this.getLocalConfig(cache, locale, 'igloo_floors');
        this.igloo_locations = this.getLocalConfig(cache, locale, 'igloo_locations');
        this.igloo_music_tracks = this.getLocalConfig(cache, locale, 'igloo_music_tracks');
        this.igloos = this.getLocalConfig(cache, locale, 'igloos');
        this.jokes = this.getLocalConfig(cache, locale, 'jokes');
        this.mascot_messages = this.getLocalConfig(cache, locale, 'mascot_messages');
        this.mascots = this.getLocalConfig(cache, locale, 'mascots');
        this.paper_items = this.getLocalConfig(cache, locale, 'paper_items');
        this.rooms = this.getLocalConfig(cache, locale, 'rooms');
    }
}
