import { LoaderTask } from "@clubpenguin/load/tasks";
import { logger } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";

/**
 * Manages the music in the game.
 */
export class MusicManager {
    public world: World;

    public currentMusicId: number;
    private _musicMuted: boolean;

    constructor(world: World) {
        this.world = world;

        this._musicMuted = false;
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
        if (this._musicMuted == value) return;
        this._musicMuted = value;
        let id = this.currentMusicId;
        if (id) {
            let key = `music-${id}`;
            if (value) this.world.sound.removeByKey(key);
            else {
                this.stop();
                this.play(id);
            }
        }
    }

    /**
     * Stops the currently playing music.
     */
    stop(): void {
        if (this.currentMusicId) {
            let key = `music-${this.currentMusicId}`;
            this.world.sound.removeByKey(key);
            this.currentMusicId = undefined;
        }
    }
}
