export class SoundManager {
    private source: Phaser.Sound.BaseSoundManager;

    constructor(source: Phaser.Sound.BaseSoundManager) {
        this.source = source;
        this.source.volume
    }

    play(key: string, config: Phaser.Types.Sound.SoundConfig) {
        return this.source.play(key, config);
    }
}
