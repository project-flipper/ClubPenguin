import { App } from "@clubpenguin/app/app";
import PressureTrigger from "@clubpenguin/lib/components/PressureTrigger";
import RoomTrigger from "@clubpenguin/lib/components/RoomTrigger";
import GameTrigger from "@clubpenguin/lib/components/GameTrigger";
import WaddleTrigger from "@clubpenguin/lib/components/WaddleTrigger";
import Trigger from "@clubpenguin/lib/components/Trigger";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { AnimationFrame } from "./animationFrame";
import { AnyUserData } from "@clubpenguin/net/types/user";
import { Engine } from "@clubpenguin/world/engine/engine";
import { Avatar, AvatarCls, Player, PlayerLoadingState } from "@clubpenguin/world/engine/player/avatar";
import World from "@clubpenguin/world/World";
import { ClothingSprite } from "../clothing/clothingManager";
import { Actions } from "./actions";
import ContentTrigger from "@clubpenguin/lib/components/ContentTrigger";

/**
 * Manages the players in the current room.
 */
export class PlayerManager {
    public DEFAULT_AVATAR = 'penguin';

    public engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;

        this.avatars = {};
        this.players = {};

        this.engine.on('clothing:add', (player: Player, sprite: ClothingSprite) => {
            if (player.loadingState == PlayerLoadingState.READY) player.actions.reset();
        });
        this.engine.on('clothing:ready', (player: Player) => {
            player.actions.set(player.actions.get(), true);
        });
        this.engine.on('room:unload', () => {
            this.players = {};
        });
    }

    get world(): World {
        return this.engine.world;
    }

    get app(): App {
        return this.engine.app;
    }

    public avatars: { [key: string]: AvatarCls };
    public players: { [id: number]: Player };

    /**
     * Loads an avatar class from the given key.
     * @param key The key of the avatar to load.
     * @returns The avatar class.
     */
    async loadAvatar(key: string): Promise<AvatarCls> {
        if (key in this.avatars) return this.avatars[key];

        let module = await import(/* webpackInclude: /\.ts$/ */`@clubpenguin/world/avatar/${key}`);
        let avatar: AvatarCls = module.default;

        let load = this.engine.loadScreen;

        let task = load.track(new LoaderTask('Avatar loader', this.world.load));
        module.load(this.world);

        this.world.load.start();
        await task.wait();

        this.avatars[key] = avatar;
        return avatar;
    }

    /**
     * Creates the animations for a sprite.
     * @param assetKey The key of the asset to generate the animation for.
     * @param frameKey The key of the frame to generate the animation for.
     * @param prefix The prefix of the animation to generate.
     * @param frame The action frame id of the animation to generate.
     * @param meta The metadata of the animation to generate.
     * @returns The generated animation.
     */
    generateSpriteAnimations(
        assetKey: string, 
        frameKey: string, 
        prefix: string, 
        frame: AnimationFrame,
        meta: { totalFrames: number; repeat: boolean; }
    ): Phaser.Animations.Animation {
        let key = this.getSpriteAnimationKey(assetKey, prefix, frame);
        if (this.world.anims.exists(key)) return this.world.anims.get(key);

        let isNested = meta.totalFrames !== 1;
        let fromFrame = isNested ? 1 : 0;
        let toFrame = isNested ? meta.totalFrames : null;
    
        let frames: Phaser.Types.Animations.AnimationFrame[] = [];
    
        if (frame === AnimationFrame.WAVE) {
            let conf = { start: 1, end: 12, assetKey, frameKey, prefix, frame };
            this.addFrames(frames, conf);
            this.addFrames(frames, { ...conf, start: 5 }, 2);
            this.addFrames(frames, { ...conf, start: 1, end: 1 });
        } else {
            if (toFrame !== null) {
                this.addFrames(frames, { start: fromFrame, end: toFrame, assetKey, frameKey, prefix, frame: frame });
            } else {
                frames.push({ key: assetKey, frame: `${frameKey}/${prefix}/${frame}`, duration: 0 });
            }
        }

        let animation = this.world.anims.create({
            key,
            frames,
            frameRate: 24,
            skipMissedFrames: true,
            repeat: frames.length > 1 && meta.repeat ? -1 : 0
        });

        return animation || this.world.anims.get(key);
    }
    
    private addFrames(
        frames: Phaser.Types.Animations.AnimationFrame[], 
        config: { start: number, end: number, assetKey: string, frameKey: string, prefix: string, frame: AnimationFrame }, 
        repeat = 1
    ) {
        let { start, end, assetKey, frameKey, prefix, frame: action } = config;

        for (let r = 0; r < repeat; r++) {
            for (let i = start; i <= end; i++) frames.push({ key: assetKey, frame: `${frameKey}/${prefix}/${action};${i}`, duration: 0 });
        }
    }

    /**
     * Gets the key of a generated animation.
     * @param assetKey The key of the asset to which the animation was generated for.
     * @param prefix The prefix of the generated animation.
     * @param index The index of the generated animation.
     * @returns The key of a generated animation.
     */
    getSpriteAnimationKey(assetKey: string, prefix: string, index: number): string {
        return `${assetKey}${prefix}_${index}animation`;
    }

    /**
     * Converts an avatar instance to a player.
     * @param avatar The avatar to convert to a player.
     * @param data The user data to attach to the player.
     * @returns The converted player.
     */
    avatarToPlayer(avatar: Avatar, data: AnyUserData): Player {
        let player = avatar as Player;

        player.userData = data;
        player.clothes = new Map();
        player.actions = new Actions(player);
        player.loadingState = PlayerLoadingState.NOT_LOADED;

        return player;
    }

    /**
     * Creates a player with the given user data.
     * @param data The user data to create the player with.
     * @param x The x-coordinate to create the player at.
     * @param y THE y-coordinate to create the player at.
     * @returns The created player.
     */
    async createPlayer(data: AnyUserData, x?: number, y?: number): Promise<Player> {
        if (!this.engine.currentRoom) throw new Error('Players cannot exist without a room');

        let avatarKey = data.avatar.transformation ?? this.DEFAULT_AVATAR;

        let avatarCls = await this.loadAvatar(avatarKey);
        let avatar = new avatarCls(this.engine.currentRoom, x, y);

        let player = this.avatarToPlayer(avatar, data);
        return player;
    }

    /**
     * Sets up a player with the given user data.
     * This method sets up the player's animations, actions, and overlay.
     * @param player The player to setup.
     * @param data The user data to setup the player with.
     */
    setupPlayer(player: Player, data: AnyUserData): void {
        player.createAnimations(this.engine);
        player.actions.reset();

        player.hitbox.on('release', () => this.world.isMyPlayer(player.userData) ? this.world.interface.openMyNamecard() : this.world.interface.openNamecard(player.userData));
        this.world.interface.attachPlayerOverlay(player);

        this._updatePlayer(player, data);
    }

    /**
     * Updates a player with the given user data.
     * This method only updates the player's color, ring and overlay.
     * @param player The player to update.
     * @param data The user data to update the player with.
     */
    _updatePlayer(player: Player, data: AnyUserData): void {
        let tintFill = this.app.gameConfig.player_colors[String(data.avatar.color)];
        player.body_art.setTint(Number(tintFill));

        if (this.world.isMyPlayer(data)) {
            player.ring.visible = true;
            player.ring.strokeColor = 0x3399FF;
        } else if (this.world.isFriend(data)) {
            player.ring.visible = true;
            player.ring.strokeColor = 0x009900;
        } else player.ring.visible = false;

        player.overlay.nickname.text = data.nickname;
        player.overlay.balloon.x = player.speechBubbleOffset.x;
        player.overlay.balloon.y = player.speechBubbleOffset.y;
    }

    /**
     * Adds a player to the current room.
     * @param player The player to add.
     * @returns The added player.
     */
    addPlayer(player: Player): Player {
        if (player.userData.id in this.players) return;

        this.setupPlayer(player, player.userData);
        player.depth = player.y + 1;
        this.engine.currentRoom.add.existing(player);

        this.players[player.userData.id] = player;
        this.testTriggers(player, true, NaN, NaN, true);

        this.engine.emit('player:add', player);
        return player;
    }

    /**
     * Updates a player with the given user data.
     * @param player The player to update.
     * @param data The user data to update the player with.
     */
    updatePlayer(player: Player, data: AnyUserData): void {
        this._updatePlayer(player, data);
        player.userData = data;
        this.engine.emit('player:update', player);
    }

    /**
     * Removes a player from the current room.
     * @param player The player to remove.
     */
    removePlayer(player: Player): void {
        this.world.interface.removePlayerOverlay(player);
        this.engine.emit('player:remove', player);

        if (player.actions) player.actions.stopMoving();
        this.testTriggers(player, true, NaN, NaN);

        if (player.overlay) player.overlay.destroy();

        let cleaner = this.engine.cleaner;
        if (player.userData.id in cleaner.playersUsingResources) {
            for (let resKey of cleaner.playersUsingResources[player.userData.id]) {
                let [type, key] = cleaner.fromKey(resKey);
                cleaner.deallocateResource(type, key, player.userData.id);
            }
        }

        player.destroy();
        delete this.players[player.userData.id];
    }

    /**
     * Tests all triggers in the current room against the given player.
     * @param player The player to test triggers for.
     * @param finishedMoving Whether the player has finished moving.
     * @param x The x-coordinate to test triggers at.
     * @param y The y-coordinate to test triggers at.
     * @param prohibitJoinRoom Whether to prohibit the player from joining a room. This will be overriden if the player is not ready.
     */
    testTriggers(player: Player, finishedMoving: boolean, x?: number, y?: number, prohibitJoinRoom = false): void {
        x = x ?? player.x;
        y = y ?? player.y;

        prohibitJoinRoom = prohibitJoinRoom || player.loadingState != PlayerLoadingState.READY;

        for (let trigger of this.engine.triggers) {
            if (trigger instanceof Trigger && finishedMoving && trigger.test(x, y)) trigger.execute(this.engine, player);
            if (trigger instanceof RoomTrigger && finishedMoving && !prohibitJoinRoom && trigger.test(x, y)) trigger.execute(this.engine, player);
            if (trigger instanceof ContentTrigger && finishedMoving && !prohibitJoinRoom && trigger.test(x, y)) trigger.execute(this.engine, player);
            if (trigger instanceof GameTrigger && finishedMoving && !prohibitJoinRoom && trigger.test(x, y)) trigger.execute(this.engine, player);
            if (trigger instanceof WaddleTrigger && finishedMoving && !prohibitJoinRoom && trigger.test(x, y)) trigger.execute(this.engine, player);
            if (trigger instanceof PressureTrigger) trigger.execute(this.engine, player, trigger.test(x, y), finishedMoving);
        }
    }

    /**
     * Finds a path for the given player to the given coordinates.
     * This method uses pixel-perfect hit testing against a room's boundaries to find the path.
     * @param player The player to find the path for.
     * @param x The x-coordinate to find the path to.
     * @param y The y-coordinate to find the path to.
     * @returns The path to the given coordinates.
     */
    findPlayerPath(player: Player, x: number, y: number): Phaser.Math.Vector2 {
        let origin = new Phaser.Math.Vector2(player.x, player.y);
        let target = new Phaser.Math.Vector2(x, y);

        let block = 'block' in player.scene ? player.scene.block as Phaser.GameObjects.Image : undefined;
        if (block == undefined) return target;

        let distance = Math.round(Phaser.Math.Distance.BetweenPoints(origin, target));
        let stepX = (target.x - origin.x) / distance;
        let stepY = (target.y - origin.y) / distance;

        let point = new Phaser.Math.Vector2(0, 0);
        let matrix = new Phaser.GameObjects.Components.TransformMatrix();
        let parentMatrix = new Phaser.GameObjects.Components.TransformMatrix();

        let hitTest = player.scene.input.makePixelPerfect();
        while (distance > 0) {
            if (block.parentContainer) {
                block.parentContainer.getWorldTransformMatrix(matrix, parentMatrix);
                matrix.applyInverse(origin.x, origin.y, point);
            } else {
                Phaser.Math.TransformXY(origin.x, origin.y, block.x, block.y, block.rotation, block.scaleX, block.scaleY, point);
            }

            let testX = point.x + block.displayOriginX;
            let testY = point.y + block.displayOriginY;
            if (hitTest({}, testX + stepX, testY + stepY, block)) {
                break;
            }

            origin.x += stepX;
            origin.y += stepY;

            distance--;
        }

        return origin;
    }
}
