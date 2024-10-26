import { App, logger } from "@clubpenguin/app/app";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { LoaderPlugin } from "./loader";

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
    pin_y: number,
    safe_start_x: number,
    safe_end_x: number,
    safe_start_y: number,
    safe_end_y: number,
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
    game_key: string,
    name: string,
    room_id: number,
    music_id: number,
    stamp_group_id: number
    path: string
    show_player_in_room: boolean,
    is_hybrid: boolean
}

export class Config {
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

    addGlobalConfig(loader: Phaser.Loader.LoaderPlugin, cache: Phaser.Cache.CacheManager, key: string): string {
        let cacheKey = `config-global-${key}`;
        if (cache.json.exists(cacheKey)) cache.json.remove(cacheKey);

        loader.json(cacheKey, `config/${key}.json?v=${LoaderPlugin.cacheVersion}`);
        return cacheKey;
    }

    addLocalConfig(loader: Phaser.Loader.LoaderPlugin, cache: Phaser.Cache.CacheManager, locale: string, key: string): string {
        let cacheKey = `config-${locale}-${key}`;
        if (cache.json.exists(cacheKey)) cache.json.remove(cacheKey);

        loader.json(cacheKey, `config/${locale}/${key}.json?v=${LoaderPlugin.cacheVersion}`);
        return cacheKey;
    }

    async load(locale: string): Promise<void> {
        let load = this.app.scene.getScene('Load') as Load;
        let loader = load.load;
        let cache = load.cache;

        let task = load.track(new LoaderTask('Configs loader', loader));

        let general = this.addGlobalConfig(loader, cache, 'general');
        let penguin_action_frames = this.addGlobalConfig(loader, cache, 'penguin_action_frames');
        let player_colors = this.addGlobalConfig(loader, cache, 'player_colors');

        let games = this.addLocalConfig(loader, cache, locale, 'games');
        let furniture_items = this.addLocalConfig(loader, cache, locale, 'furniture_items');
        let igloo_floors = this.addLocalConfig(loader, cache, locale, 'igloo_floors');
        let igloo_locations = this.addLocalConfig(loader, cache, locale, 'igloo_locations');
        let igloo_music_tracks = this.addLocalConfig(loader, cache, locale, 'igloo_music_tracks');
        let igloos = this.addLocalConfig(loader, cache, locale, 'igloos');
        let jokes = this.addLocalConfig(loader, cache, locale, 'jokes');
        let mascot_messages = this.addLocalConfig(loader, cache, locale, 'mascot_messages');
        let mascots = this.addLocalConfig(loader, cache, locale, 'mascots');
        let paper_items = this.addLocalConfig(loader, cache, locale, 'paper_items');
        let rooms = this.addLocalConfig(loader, cache, locale, 'rooms');

        logger.info('Loading game configs');
        loader.start();
        let result = await task.wait();
        if (result.data.totalFailed > 0) throw new Error(`Game configs failed to load! ${result.data.totalFailed} failed out of ${result.data.totalFailed + result.data.totalComplete}`);

        this.general = cache.json.get(general);
        this.penguin_action_frames = cache.json.get(penguin_action_frames);
        this.player_colors = cache.json.get(player_colors);

        this.games = cache.json.get(games);
        this.furniture_items = cache.json.get(furniture_items);
        this.igloo_floors = cache.json.get(igloo_floors);
        this.igloo_locations = cache.json.get(igloo_locations);
        this.igloo_music_tracks = cache.json.get(igloo_music_tracks);
        this.igloos = cache.json.get(igloos);
        this.jokes = cache.json.get(jokes);
        this.mascot_messages = cache.json.get(mascot_messages);
        this.mascots = cache.json.get(mascots);
        this.paper_items = cache.json.get(paper_items);
        this.rooms = cache.json.get(rooms);

        logger.info('Game configs received');
    }
}
