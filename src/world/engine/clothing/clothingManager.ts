import { App } from "@clubpenguin/app/app";
import { PaperItemConfig } from "@clubpenguin/app/config";
import { Avatar } from "@clubpenguin/net/types/penguin/avatar";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import { Engine } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";
import Phaser from "phaser";

export type ClothingSprite = Phaser.GameObjects.Sprite & { config: PaperItemConfig, animations: { [frame: number]: Phaser.Animations.Animation } };

export enum ItemType {
    COLOR = 1,
    HEAD,
    FACE,
    NECK,
    BODY,
    HAND,
    FEET,
    FLAG,
    PHOTO,
    BOOK
};

export class ClothingManager {
    public engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;

        this.engine.on('player:add', (player: Player) => {
            if (player.attachClothing) this.loadClothingSprites(player, player.penguinData.avatar);
        });
    }

    get world(): World {
        return this.engine.world;
    }

    get app(): App {
        return this.engine.app;
    }

    async loadClothingSprites(player: Player, avatar: Avatar): Promise<ClothingSprite[]> {
        let promise = Promise.all([
            this.loadClothingSprite(player, avatar.head),
            this.loadClothingSprite(player, avatar.face),
            this.loadClothingSprite(player, avatar.neck),
            this.loadClothingSprite(player, avatar.body),
            this.loadClothingSprite(player, avatar.hand),
            this.loadClothingSprite(player, avatar.feet)
        ]);

        this.world.load.start();
        let sprites = await promise;

        this.engine.emit('player:clothing:load', player);

        return sprites;
    }

    async loadClothingSprite(player: Player, id: number): Promise<ClothingSprite> {
        if (id == 0) return;

        let config = this.app.gameConfig.paper_items[id];

        for (let [slot, clothing] of player.clothes) {
            if (clothing.config.paper_item_id == id) return;

            if (slot == config.type) {
                clothing.destroy();
                player.clothes.delete(slot);
                break;
            }
        }

        let key = `clothing-sprites-${id}`;
        let animationsKey = `${key}-animations`;

        try {
            await new Promise<void>((resolve, reject) => {
                if (this.world.textures.exists(key)) return resolve();

                this.world.load.multiatlas({
                    key,
                    atlasURL: `assets/clothing/sprites/${id}.json`,
                    path: `assets/clothing/sprites`
                });

                let completeCallback = (key_: string, type_: string) => {
                    if (key_ == key && type_ == 'multiatlas') {
                        this.world.load.off('filecomplete', completeCallback);
                        this.world.load.off('loaderror', errorCallback);

                        let item = player.clothes.get(config.type);
                        if (item && item.config.paper_item_id != id) reject(new Error(`Sprite ID mismatch (${item.config.paper_item_id} != ${id}). Avatar might have changed before file finished loading.`));
                        else resolve();
                    }
                }
                this.world.load.on('filecomplete', completeCallback);

                let errorCallback = (file: Phaser.Loader.File) => {
                    if (file.key == key && file.type == 'json') {
                        this.world.load.off('filecomplete', completeCallback);
                        this.world.load.off('loaderror', errorCallback);

                        reject(new Error(`Sprite ${id} failed to load!`));
                    }
                }
                this.world.load.on('loaderror', errorCallback);
            });
            await new Promise<void>((resolve, reject) => {
                if (this.world.cache.json.exists(animationsKey)) return resolve();

                this.world.load.json({
                    key: animationsKey,
                    url: `assets/clothing/sprites/${id}.anims.json`
                });

                let completeCallback = (key_: string, type_: string) => {
                    if (key_ == animationsKey && type_ == 'json') {
                        this.world.load.off('filecomplete', completeCallback);
                        this.world.load.off('loaderror', errorCallback);

                        let item = player.clothes.get(config.type);
                        if (item && item.config.paper_item_id != id) reject(new Error(`Sprite ID mismatch (${item.config.paper_item_id} != ${id}). Avatar might have changed before file finished loading.`));
                        else resolve();
                    }
                }
                this.world.load.on('filecomplete', completeCallback);

                let errorCallback = (file: Phaser.Loader.File) => {
                    if (file.key == animationsKey && file.type == 'json') {
                        this.world.load.off('filecomplete', completeCallback);
                        this.world.load.off('loaderror', errorCallback);

                        reject(new Error(`Animations for sprite ${id} failed to load!`));
                    }
                }
                this.world.load.on('loaderror', errorCallback);
            });
        } catch (e) {
            console.error(e);
            return;
        }

        return this.addClothingSprite(player, key, animationsKey, config);
    }

    getClothingDepth(config: PaperItemConfig): number {
        switch (config.type) {
            case ItemType.HEAD:
                return 260;
            case ItemType.FACE:
                return 250;
            case ItemType.HAND:
                return 240;
            case ItemType.NECK:
                return 230;
            case ItemType.BODY:
                return 220;
            case ItemType.FEET:
                return 210;
            case ItemType.BOOK:
                return 270;
        }
    }

    addClothingSprite(player: Player, key: string, animationsKey: string, config: PaperItemConfig): ClothingSprite {
        if (!this.world.textures.exists(key)) return;

        console.log('Adding sprite item', key);

        let sprite = this.world.add.sprite(0, 0, key, `${config.paper_item_id}/0`) as ClothingSprite;
        sprite.depth = this.getClothingDepth(config);
        sprite.config = config;
        sprite.animations = this.createClothingAnimations(animationsKey);

        player.add(sprite);
        player.sort('depth');

        player.clothes.set(config.type, sprite);
        player.actions.reset();
        return sprite;
    }

    createClothingAnimations(key: string): { [frame: number]: Phaser.Animations.Animation; } {
        if (!this.world.cache.json.exists(key)) return;

        let data: Phaser.Types.Animations.JSONAnimations & { anims: (Phaser.Types.Animations.JSONAnimation & { index: string })[] } = this.world.cache.json.get(key);
        let animations: { [frame: number]: Phaser.Animations.Animation; } = {};

        for (let anim of data.anims) {
            let animation = this.world.anims.exists(anim.key) ? this.world.anims.get(anim.key) : this.world.anims.create(anim);

            if (animation != false) {
                let frameIndex = parseInt(anim.index);
                animations[frameIndex] = animation;
            } else console.warn(`Animation ${anim.key} failed to be created. Skipping.`);
        }

        return animations;
    }
}
