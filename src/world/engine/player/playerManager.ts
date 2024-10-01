import Phaser from "phaser";

import { App } from "@clubpenguin/app/app";
import PressureTrigger from "@clubpenguin/lib/ui/components/PressureTrigger";
import RoomTrigger from "@clubpenguin/lib/ui/components/RoomTrigger";
import Trigger from "@clubpenguin/lib/ui/components/Trigger";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { AnyUserData } from "@clubpenguin/net/types/user";
import { Avatar, AvatarCls, Player } from "@clubpenguin/world/engine/player/avatar";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";
import { Actions } from "./actions";
import { ClothingSprite } from "../clothing/clothingManager";

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

        this.engine.on('clothing:ready', (player: Player) => player.actions.reset());
        this.engine.on('clothing:add', (player: Player, sprite: ClothingSprite) => player.actions.reset());
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
     * The current player.
     */
    get player(): Player {
        return this.players[this.world.myUser.id];
    }

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
     * @param index The index of the animation to generate.
     * @param fromFrame The starting frame of the animation.
     * @param toFrame The ending frame of the animation.
     * @param loop Whether the animation should loop.
     * @returns The generated animation.
     */
    generateSpriteAnimations(assetKey: string, frameKey: string, prefix: string, index: number, fromFrame: number, toFrame?: number, loop = true): Phaser.Animations.Animation {
        let key = this.getSpriteAnimationKey(assetKey, prefix, index);
        if (this.world.anims.exists(key)) return this.world.anims.get(key);

        let frames: Phaser.Types.Animations.AnimationFrame[] = [];
        if (toFrame != undefined) {
            for (let i = fromFrame; i <= toFrame; i++) {
                frames.push({
                    key: assetKey,
                    frame: `${frameKey}/${prefix}${index}_${String(i).padStart(4, '0')}`,
                    duration: 0
                });
            }
        } else {
            frames = [{
                key: assetKey,
                frame: `${frameKey}/${prefix}${index}`,
                duration: 0
            }];
        }

        let animation = this.world.anims.create({
            key,
            frames,
            frameRate: 24,
            skipMissedFrames: true,
            repeat: frames.length > 1 && loop ? -1 : 0
        });

        if (animation == false) this.world.anims.get(key);
        else return animation;
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

        player.hitbox.on('release', () => this.world.isMyPlayer(data) ? this.world.interface.openMyNamecard() : this.world.interface.openNamecard(data));
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
        player.body_art.setTintFill(Number(tintFill));

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
        this.testTriggers(player, true, undefined, undefined, true);

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
        this.testTriggers(player, true, NaN, NaN);

        this.world.interface.removePlayerOverlay(player);
        this.engine.emit('player:remove', player);

        player.destroy();
        delete this.players[player.userData.id];

    }

    /**
     * Tests all triggers in the current room against the given player.
     * @param player The player to test triggers for.
     * @param finishedMoving Whether the player has finished moving.
     * @param x The x-coordinate to test triggers at.
     * @param y The y-coordinate to test triggers at.
     * @param prohibitJoinRoom Whether to prohibit the player from joining a room.
     */
    testTriggers(player: Player, finishedMoving: boolean, x?: number, y?: number, prohibitJoinRoom = false): void {
        x = x ?? player.x;
        y = y ?? player.y;

        let scene = player.scene as Room;
        let triggers = 'triggers' in scene ? scene.triggers : [];

        for (let trigger of triggers) {
            let genericTrigger = Trigger.getComponent(trigger);
            if (genericTrigger && finishedMoving && !prohibitJoinRoom && genericTrigger.test(x, y)) genericTrigger.execute(this.engine, player);

            let roomTrigger = RoomTrigger.getComponent(trigger);
            if (roomTrigger && finishedMoving && !prohibitJoinRoom && roomTrigger.test(x, y)) roomTrigger.execute(this.engine, player);

            let pressureTrigger = PressureTrigger.getComponent(trigger);
            if (pressureTrigger) {
                let test = pressureTrigger.test(x, y);
                let state = Boolean(test);
                if (state != pressureTrigger.active) {
                    if (state && !finishedMoving) continue;
                    pressureTrigger.active = state;
                    pressureTrigger.execute(this.engine, player);
                }
            }
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

    enablePlayerPhysics(): void {
        this.player.scene.matter.add.gameObject(this.player, {
            shape: {
                type: 'circle',
                radius: 25
            },
            isStatic: false
        });
    }

}
