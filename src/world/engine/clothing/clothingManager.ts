import { App } from "@clubpenguin/app/app";
import { PaperItemConfig } from "@clubpenguin/app/config";
import { AvatarData } from "@clubpenguin/net/types/avatar";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import { Engine } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";
import Phaser from "phaser";
import { getLogger } from "@clubpenguin/lib/log";
import { ItemType } from "./itemType";

let logger = getLogger('CP.world.engine.clothing');

export type ClothingSprite = Phaser.GameObjects.Sprite & { config: PaperItemConfig, animations: { [frame: number]: Phaser.Animations.Animation } };

export class ClothingManager {
    public engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;

        this.engine.on('player:add', (player: Player) => {
            if (player.attachClothing) this.addClothingSprites(player, player.userData.avatar);
        });
        this.engine.on('player:update', (player: Player) => {
            if (player.attachClothing) this.addClothingSprites(player, player.userData.avatar);
            this.engine.cleaner.collect();
        });
        this.engine.on('player:remove', (player: Player) => {
            for (let [_, clothing] of player.clothes) {
                this.engine.cleaner.deallocateResource('multiatlas', this.getSpriteKey(clothing.config.paper_item_id), player.userData.id);
                this.engine.cleaner.deallocateResource('json', this.getSpriteAnimationsKey(clothing.config.paper_item_id), player.userData.id);
            }
            this.engine.cleaner.collect();
        });
    }

    get world(): World {
        return this.engine.world;
    }

    get app(): App {
        return this.engine.app;
    }

    async addClothingSprites(player: Player, avatar: AvatarData): Promise<ClothingSprite[]> {
        let promise = Promise.all([
            this.addClothingSprite(player, ItemType.HEAD, avatar.head, false),
            this.addClothingSprite(player, ItemType.FACE, avatar.face, false),
            this.addClothingSprite(player, ItemType.NECK, avatar.neck, false),
            this.addClothingSprite(player, ItemType.BODY, avatar.body, false),
            this.addClothingSprite(player, ItemType.HAND, avatar.hand, false),
            this.addClothingSprite(player, ItemType.FEET, avatar.feet, false)
        ]);

        this.world.load.start();
        let sprites = await promise;

        this.engine.emit('clothing:ready', player);

        return sprites;
    }

    getSpriteKey(id: number): string {
        return `clothing-sprites-${id}`;
    }

    getSpriteAnimationsKey(id: number): string {
        return `${this.getSpriteKey(id)}-animations`;
    }

    async loadClothingSprite(config: PaperItemConfig, startLoading: boolean, playerId?: string): Promise<void> {
        let id = config.paper_item_id;

        let key = this.getSpriteKey(id);
        let animationsKey = this.getSpriteAnimationsKey(id);

        logger.info('Loading sprite', key, animationsKey);

        let loadSprite = new Promise<void>((resolve, reject) => {
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

                    this.engine.cleaner.allocateResource(type_, key_, playerId);
                    resolve();
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

        let loadAnimations = new Promise<void>((resolve, reject) => {
            if (this.world.cache.json.exists(animationsKey)) return resolve();

            this.world.load.json({
                key: animationsKey,
                url: `assets/clothing/sprites/${id}.anims.json`
            });

            let completeCallback = (key_: string, type_: string) => {
                if (key_ == animationsKey && type_ == 'json') {
                    this.world.load.off('filecomplete', completeCallback);
                    this.world.load.off('loaderror', errorCallback);

                    this.engine.cleaner.allocateResource(type_, key_, playerId);
                    resolve();
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

        if (startLoading) this.world.load.start();

        await Promise.all([
            loadSprite,
            loadAnimations
        ]);
    }

    async addClothingSprite(player: Player, type: ItemType, id: number, startLoading = true): Promise<ClothingSprite> {
        if (!id) {
            let clothing = player.clothes.get(type);
            if (clothing) {
                let key = this.getSpriteKey(clothing.config.paper_item_id);
                let animationsKey = this.getSpriteAnimationsKey(clothing.config.paper_item_id);

                this.engine.cleaner.deallocateResource('multiatlas', key, player.userData.id);
                this.engine.cleaner.deallocateResource('json', animationsKey, player.userData.id);
                clothing.destroy();
                player.clothes.delete(type);
            }
            return;
        }

        let config = this.app.gameConfig.paper_items[id];
        logger.info('Adding sprite', config);

        let key = this.getSpriteKey(id);
        let animationsKey = this.getSpriteAnimationsKey(id);

        for (let [slot, clothing] of player.clothes) {
            if (clothing.config.paper_item_id == id) return;

            let key = this.getSpriteKey(clothing.config.paper_item_id);
            let animationsKey = this.getSpriteAnimationsKey(clothing.config.paper_item_id);
    
            if (slot == config.type) {
                this.engine.cleaner.deallocateResource('multiatlas', key, player.userData.id);
                this.engine.cleaner.deallocateResource('json', animationsKey, player.userData.id);
                clothing.destroy();
                player.clothes.delete(slot);
                break;
            }
        }

        try {
            await this.loadClothingSprite(config, startLoading, player.userData.id);
        } catch (e) {
            logger.warn(`Error loading sprite ${id} ignoring...`);
            return;
        }

        logger.info('Attaching sprite', config);
        let sprite = this.attachClothingSprite(player, config);
        player.clothes.set(config.type, sprite);

        this.engine.emit('clothing:add', player, sprite);

        return sprite;
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

    attachClothingSprite(player: Player, config: PaperItemConfig): ClothingSprite {
        let key = this.getSpriteKey(config.paper_item_id);
        let animationsKey = this.getSpriteAnimationsKey(config.paper_item_id);

        if (!this.world.textures.exists(key)) {
            logger.warn('Could not attach clothing (file missing)', player, config);
            return;
        }

        let sprite = this.world.add.sprite(0, 0, key, `${config.paper_item_id}/0`) as ClothingSprite;
        sprite.depth = this.getClothingDepth(config);
        sprite.config = config;
        sprite.animations = this.createClothingAnimations(animationsKey);

        player.add(sprite);
        player.sort('depth');

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
            } else logger.warn(`Animation ${anim.key} failed to be created. Skipping.`);
        }

        return animations;
    }
}
