import { App } from "@clubpenguin/app/app";
import { AvatarData } from "@clubpenguin/net/types/avatar";
import { Player } from "@clubpenguin/world/engine/player/avatar";
import { Engine } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";
import { getLogger } from "@clubpenguin/lib/log";
import { ItemType } from "./itemType";
import { ActionFrame } from "@clubpenguin/net/types/action";

let logger = getLogger('CP.world.engine.clothing');

export type ClothingSprite = Phaser.GameObjects.Sprite & { paper_item_id: number, animations: { [frame: number]: Phaser.Animations.Animation } };

/**
 * Manages the clothing sprites for players.
 */
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
                this.engine.cleaner.deallocateResource('multiatlas', this.getSpriteKey(clothing.paper_item_id), player.userData.id);
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

    /**
     * Adds clothing sprites to a player.
     * This should only be called if a player supports clothing sprites.
     * @param player The player to add clothing sprites to.
     * @param avatar The avatar data to add clothing sprites for.
     * @returns A list of clothing sprites added to the player.
     */
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

    /**
     * Gets the key of a clothing sprite.
     * @param id The ID of the clothing sprite.
     * @returns The key of the clothing sprite.
     */
    getSpriteKey(id: number): string {
        return `clothing-sprites-${id}`;
    }

    /**
     * Gets the key of a clothing sprite's animations.
     * @param id The ID of the clothing sprite.
     * @returns The key of the clothing sprite's animations.
     */
    getSpriteAnimationKey(assetKey: string, action: number): string {
        return `${assetKey}_${action}animation`;
    }

    /**
     * Loads a clothing sprite.
     * @param id The ID of the clothing sprite to load.
     * @param startLoading Whether to start loading the sprite immediately.
     * @param playerId The ID of the player to allocate the resource to.
     */
    async loadClothingSprite(id: number, startLoading: boolean, playerId?: number): Promise<void> {
        let key = this.getSpriteKey(id);

        logger.info('Loading sprite', key);

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

        if (startLoading) this.world.load.start();
    }

    /**
     * Adds a clothing sprite to a player.
     * @param player The player to add the clothing sprite to.
     * @param type The type of the clothing sprite.
     * @param id The ID of the clothing sprite.
     * @param startLoading Whether to start loading the sprite immediately.
     * @returns The clothing sprite added to the player.
     */
    async addClothingSprite(player: Player, type: ItemType, id: number, startLoading = true): Promise<ClothingSprite> {
        if (!id) {
            let clothing = player.clothes.get(type);
            if (clothing) {
                let key = this.getSpriteKey(clothing.paper_item_id);

                this.engine.cleaner.deallocateResource('multiatlas', key, player.userData.id);
                for (let anim of Object.values(clothing.animations)) this.engine.cleaner.deallocateResource('animation', anim.key, player.userData.id);
                delete clothing.animations;
                clothing.destroy();
                player.clothes.delete(type);
            }
            return;
        }

        for (let [slot, clothing] of player.clothes) {
            logger.debug('Checking clothing', slot, clothing.paper_item_id, id);
            if (clothing.paper_item_id == id) return;

            let key = this.getSpriteKey(clothing.paper_item_id);

            if (slot == type) {
                this.engine.cleaner.deallocateResource('multiatlas', key, player.userData.id);
                for (let anim of Object.values(clothing.animations)) this.engine.cleaner.deallocateResource('animation', anim.key, player.userData.id);
                delete clothing.animations;
                clothing.destroy();
                player.clothes.delete(slot);
                break;
            }
        }

        logger.info('Adding sprite', id);

        try {
            await this.loadClothingSprite(id, startLoading, player.userData.id);
        } catch (e) {
            logger.warn(`Error loading sprite ${id} ignoring...`);
            return;
        }

        let clothing = player.clothes.get(type);
        if (clothing) {
            let key = this.getSpriteKey(clothing.paper_item_id);

            this.engine.cleaner.deallocateResource('multiatlas', key, player.userData.id);
            for (let anim of Object.values(clothing.animations)) this.engine.cleaner.deallocateResource('animation', anim.key, player.userData.id);
            delete clothing.animations;
            clothing.destroy();
            player.clothes.delete(type);
        }

        logger.info('Attaching sprite', id);
        let sprite = this.attachClothingSprite(player, type, id);
        if (sprite) player.clothes.set(type, sprite);

        this.engine.emit('clothing:add', player, sprite);

        return sprite;
    }

    /**
     * Gets the depth of a clothing item based on its type.
     * @param type The type of the clothing.
     * @returns The depth of the clothing.
     */
    getClothingDepth(type: number): number {
        switch (type) {
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
            case ItemType.OTHER:
                return 270;
        }
    }

    /**
     * Attaches a clothing sprite to a player.
     * @param player The player to attach the clothing sprite to.
     * @param type The type of the clothing sprite.
     * @param id The ID of the clothing sprite.
     * @returns The clothing sprite attached to the player.
     */
    attachClothingSprite(player: Player, type: number, id: number): ClothingSprite {
        let spriteKey = this.getSpriteKey(id);

        if (!this.world.textures.exists(spriteKey)) {
            logger.warn('Could not attach clothing (file missing)', player, id);
            return;
        }

        let sprite = this.world.add.sprite(0, 0, spriteKey, `${id}/0`) as ClothingSprite;
        sprite.depth = this.getClothingDepth(type);
        sprite.paper_item_id = id;
        sprite.animations = this.createClothingAnimations(player, spriteKey);

        player.add(sprite);
        player.sort('depth');

        return sprite;
    }

    /**
     * Attaches & builds a phaser animation to clothing sprite.
     * @param player The player to attach the clothing animation to.
     * @param spriteKey - clothing sprite key.
     * @returns Phaser animations to bind to clothing sprite.
     */
    createClothingAnimations(player: Player, spriteKey: string): { [actionFrame: number]: Phaser.Animations.Animation } {
        let animations: { [actionFrame: number]: Phaser.Animations.Animation } = {};

        let frameKeys = Object.keys(this.world.textures.get(spriteKey).frames);
        let sortedFrameKeys = frameKeys.filter(frameKey => frameKey !== "__BASE");

        sortedFrameKeys.sort((a, b) => {
            let frameA = this.parseFrame(a);
            let frameB = this.parseFrame(b);

            return frameA.actionFrame === frameB.actionFrame
                ? frameA.subframe - frameB.subframe
                : frameA.actionFrame - frameB.actionFrame;
        });

        let animationFrames: { [actionFrame: number]: { frames: Phaser.Types.Animations.AnimationFrame[], itemId: number } } = {  };

        for (let frameKey of sortedFrameKeys) {
            let { itemId, actionFrame, subframe } = this.parseFrame(frameKey);
            let isNested = subframe !== 0;

            if (!(actionFrame in animationFrames)) {
                animationFrames[actionFrame] = {
                    frames: [],
                    itemId: itemId
                };
            }

            if (!isNested) {
                this.addFrame(animationFrames[actionFrame].frames, spriteKey, `${itemId}/${actionFrame}`);
                animationFrames[actionFrame].itemId = itemId;
                continue;
            }

            this.addFrame(animationFrames[actionFrame].frames, spriteKey, `${itemId}/${actionFrame};${subframe}`);
        }

        for (let actionFrameIndex of Object.keys(animationFrames).map(x => Number(x))) {
            // TODO: remove once all frames are added
            if(!(actionFrameIndex in player.animationsMeta)) {
                logger.warn(`Unhandled action frame: ${actionFrameIndex}!`);
                continue;
            }

            let animationKey = this.getSpriteAnimationKey(spriteKey, actionFrameIndex);

            if (this.world.anims.exists(animationKey)) {
                animations[actionFrameIndex] = this.world.anims.get(animationKey);
                continue;
            }

            this.engine.cleaner.allocateResource('animation', animationKey, player.userData.id);

            if (actionFrameIndex === ActionFrame.WAVE) {
                let extraWaveFrames = {
                    start: 5,
                    end: 12,
                    spriteKey,
                    itemId: animationFrames[actionFrameIndex].itemId,
                    action: ActionFrame.WAVE
                }

                this.addFrames(animationFrames[actionFrameIndex].frames, extraWaveFrames, 2);
                this.addFrames(animationFrames[actionFrameIndex].frames, { ...extraWaveFrames, start: 1, end: 1 });
            }

            let animation = this.world.anims.create({
                key: animationKey,
                frames: animationFrames[actionFrameIndex].frames,
                frameRate: 24,
                skipMissedFrames: true,
                repeat: player.animationsMeta[actionFrameIndex as ActionFrame]?.repeat ? -1 : 0
            });

            if (!animation) {
                logger.warn(`Animation ${animationKey} failed to be created. Skipping.`);
                continue;
            };

            animations[actionFrameIndex] = animation;
        }

        return animations;
    }

    parseFrame(frameKey: string): { itemId: number, actionFrame: number, subframe: number } {
        let [itemId, tmp] = frameKey.split('/');
        let [actionFrame, subframe = 0] = tmp.split(';').map(Number);

        return { itemId: parseInt(itemId), actionFrame, subframe };
    }

    private addFrames(
        frames: Phaser.Types.Animations.AnimationFrame[],
        config: { start: number, end: number, spriteKey: string, itemId: number, action: ActionFrame },
        repeat = 1
    ) {
        let { start, end, spriteKey, itemId, action } = config;

        for (let r = 0; r < repeat; r++)
            for (let j = start; j <= end; j++)
                this.addFrame(frames, spriteKey, `${itemId}/${action};${j}`);
    }

    private addFrame(arr: Phaser.Types.Animations.AnimationFrame[], key: string, frame: string) {
        return arr.push({
            key,
            frame,
            duration: 0
        });
    }

}
