import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { Engine } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.world.engine.music');

/**
 * Manages the music in the game.
 */
export class MusicManager {
    public engine: Engine;

    public currentMusicId: number;
    private _musicMuted: boolean;

    constructor(engine: Engine) {
        this.engine = engine;

        this._musicMuted = false;
    }

    get world(): World {
        return this.engine.world;
    }

    /**
     * Plays a music track by ID.
     * @param id The ID of the music to play.
     */
    async play(id: number): Promise<void> {
        if (this.currentMusicId == id) return;
        if (!id) return this.stop();
        this.stop();

        let key = `music-${id}`;

        if (!this.world.load.cacheManager.audio.has(key)) {
            let load = this.world.loadScreen;
            let asset = `music/${id}.mp3`

            let task = load.track(new LoaderTask('Music loader', this.world.load));
            this.world.load.audio(key, asset);

            this.world.load.start();
            await task.wait();

            if (!this.world.load.cacheManager.audio.has(key)) {
                logger.warn('Music could not be loaded. ID:', id);
                return;
            }
        }

        logger.info('Playing music by ID', id);

        this.currentMusicId = id;
        if (!this.muted) this.world.sound.play(key, { loop: true });
    }

    /**
     * Whether the music is currently muted.
     * On mute, the music will stop playing entirely and will start again when unmuted.
     */
    get muted(): boolean {
        return this._musicMuted;
    }

    set muted(value: boolean) {
        this._musicMuted = value;
        if (this.currentMusicId) {
            let key = `music-${this.currentMusicId}`;
            if (value) {
                this.world.sound.stopByKey(key);
            } else if (!this.world.load.cacheManager.audio.has(key)) {
                this.world.sound.play(key, { loop: true });
            }
        }
    }

    /**
     * Stops the currently playing music.
     */
    stop(): void {
        if (this.currentMusicId) {
            let key = `music-${this.currentMusicId}`;
            this.world.sound.stopByKey(key);
            this.currentMusicId = undefined;
        }
    }
}
