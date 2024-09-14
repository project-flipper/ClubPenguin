import Phaser from "phaser";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { Engine } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";

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

    async playMusic(id: number): Promise<void> {
        if (this.currentMusicId == id) return;
        if (!id) return this.stopMusic();
        this.stopMusic();

        let key = `music-${id}`;

        if (!this.world.load.cacheManager.audio.has(key)) {
            let load = this.world.scene.get('Load') as Load;
            let asset = `music/${id}.mp3`

            let task = load.track(new LoaderTask(this.world.load));
            this.world.load.audio(key, asset);

            this.world.load.start();
            await task.wait();

            if (!this.world.load.cacheManager.audio.has(key)) {
                console.warn('Music could not be loaded. ID:', id);
                return;
            }
        }

        this.currentMusicId = id;
        this.world.sound.play(key, { loop: true, mute: this._musicMuted });
    }

    get musicMuted(): boolean {
        return this._musicMuted;
    }

    set musicMuted(value: boolean) {
        this._musicMuted = value;
        if (this.currentMusicId) {
            let key = `music-${this.currentMusicId}`;
            let sound = this.world.sound.get(key) as Phaser.Sound.HTML5AudioSound;
            if (sound?.setMute) sound?.setMute(value);
        }
    }

    stopMusic(): void {
        if (this.currentMusicId) {
            let key = `music-${this.currentMusicId}`;
            this.world.sound.stopByKey(key);
            this.currentMusicId = undefined;
        }
    }
}
