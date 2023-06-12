const avatarPaths: { [key: string]: string } = {
    penguin: 'Penguin'
};

type UnloadCallback = (engine: Engine) => void;
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
export type ClothingSprite = Phaser.GameObjects.Sprite & { config: PaperItemConfig, animations: { [frame: number]: Phaser.Animations.Animation } };

export interface Room extends Phaser.Scene {
    roomData: RoomConfig;
    customEase?: string | Function
}

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import type Load from "../../load/Load";
import { LoaderTask } from "../../load/tasks";
import type { Avatar, AvatarCls } from "../avatar/avatar";
import type { App } from "../../app/app";
import type { MyPenguinData, PenguinData } from "../../net/types/penguin/penguin";
import type { Avatar as AvatarData } from "../../net/types/penguin/avatar";
import type Interface from "../interface/Interface";
import type World from "../World";
import type { PaperItemConfig, RoomConfig } from "../../app/config";
import RoomTrigger from "../../lib/ui/components/RoomTrigger";
import PressureTrigger from "../../lib/ui/components/PressureTrigger";
import Snowball from "../interface/prefabs/Snowball";
import SnowballTrigger from "../../lib/ui/components/SnowballTrigger";
import ButtonComponent from "../../lib/ui/components/ButtonComponent";
import Cleaner from "./cleaner";
/* END-USER-IMPORTS */

export default class Engine extends Phaser.Scene {

    constructor() {
        super("Engine");

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("engine-pack", "assets/world/engine/engine-pack.json");
    }

    editorCreate(): void {

        this.events.emit("scene-awake");
    }

    /* START-USER-CODE */

    declare cleaner: Cleaner;
    declare public game: App;

    create(data: any) {
        this.cleaner = new Cleaner(this.game);

        this.penguins = {};
        this.initialPenguins = [];
        this.avatars = {};
        this.snowballs = [];
        this.trackedTweens = [];

        this.editorCreate();

        this.sound.pauseOnBlur = false;
        this.game.events.on('focusregain', this.seekTweens, this);

        if (data.onready) data.onready(this);
    }

    get world(): World {
        return (this.scene.get('World') as World);
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    /* ============ TWEENS ============ */

    private trackedTweens: Phaser.Tweens.Tween[];

    trackTween(tween: Phaser.Tweens.Tween): void {
        if (!this.isTweenTracked(tween)) this.trackedTweens.push(tween);
    }

    isTweenTracked(tween: Phaser.Tweens.Tween): boolean {
        return this.trackedTweens.includes(tween);
    }

    untrackTween(tween: Phaser.Tweens.Tween): void {
        if (this.isTweenTracked(tween)) this.trackedTweens.splice(this.trackedTweens.indexOf(tween));
    }

    private seekTweens(delta: number): void {
        for (let tween of this.trackedTweens) {
            if (tween.isDestroyed()) this.untrackTween(tween)
            else tween.forward(delta);
        }
    }

    /* ============ MUSIC ============ */

    public currentMusicId: number;

    async playMusic(id: number): Promise<void> {
        this.stopMusic();

        let key = `music-${id}`;

        if (!this.load.cacheManager.audio.has(key)) {
            let load = this.scene.get('Load') as Load;
            let asset = `music/${id}.mp3`

            let task = load.track(new LoaderTask(this.load));
            this.load.audio(key, asset);

            this.load.start();
            await task.wait();
        }

        this.currentMusicId = id;
        this.sound.play(key, { loop: true, mute: this._musicMuted });
    }

    private _musicMuted: boolean;

    get musicMuted(): boolean {
        return this._musicMuted;
    }

    set musicMuted(value: boolean) {
        this._musicMuted = value;
        if (this.currentMusicId) {
            let key = `music-${this.currentMusicId}`;
            let sound = this.sound.get(key) as Phaser.Sound.HTML5AudioSound;
            if (sound?.setMute) sound?.setMute(value);
        }
    }

    stopMusic(): void {
        if (this.currentMusicId) {
            let key = `music-${this.currentMusicId}`;
            this.sound.stopByKey(key);
            this.currentMusicId = undefined;
        }
    }

    /* ============ ROOMS ============ */

    public initialPenguins: string[];

    public currentRoomId: number;
    public previousRoomId: number;

    public currentRoom: Room;

    async loadRoom(config: RoomConfig): Promise<void> {
        if (config.room_id == this.currentRoomId) return;

        let room = (await import(/* webpackInclude: /\.ts$/ */`../rooms/${config.path}`)).default;

        if (this.currentRoom) {
            this.currentRoom.scene.remove();
            if ('unload' in this.currentRoom) (this.currentRoom.unload as UnloadCallback)(this);
            this.events.emit('roomunload', this.currentRoom);
        }

        let load = this.scene.get('Load') as Load;
        let roomScene = await new Promise<Phaser.Scene>(resolve => {
            this.scene.add(`room-${config.room_id}`, room, true, {
                config,
                oninit: (scene: Phaser.Scene) => load.track(new LoaderTask(scene.load)),
                onready: (scene: Phaser.Scene) => resolve(scene)
            });
        });

        if (config.pin_id !== undefined) {
            let key = `clothing-icons-${config.pin_id}`;
            let task = load.track(new LoaderTask(roomScene.load));
            roomScene.load.multiatlas({
                key,
                atlasURL: `assets/clothing/icons/${config.pin_id}.json`,
                path: `assets/clothing/icons`
            });
            roomScene.load.start();
            await task.wait();

            let pin = roomScene.add.image(config.pin_x, config.pin_y, key, `${config.pin_id}/0`);
            let component = new ButtonComponent(pin);
            component.handCursor = true;
            component.pixelPerfect = true;

            pin.on('release', () => {
                // TODO: grant pin_id
            });
        }

        if (config.music_id && this.currentMusicId != config.music_id) this.playMusic(config.music_id);
        else if (!config.music_id) this.stopMusic();

        this.previousRoomId = this.currentRoomId;
        this.currentRoomId = config.room_id;

        this.currentRoom = roomScene as Room;
        this.currentRoom.roomData = config;

        this.events.emit('roomload', this.currentRoom);
    }

    async joinRoom(config: RoomConfig, x?: number, y?: number): Promise<void> {
        if (config.room_id == this.currentRoomId) return;
        let data = this.world.myPenguinData;

        let load = this.scene.get('Load') as Load;
        if (!load.isShowing) load.show();

        await this.loadRoom(config);
        this.penguins = {};
        this.snowballs = [];
        this.trackedTweens = [];
        this.initialPenguins = [data.id];

        this.interface.closeAll();
        this.interface.clearAvatarOverlays();

        let position = this.findRandomPosition();
        x = x ?? position.x;
        y = y ?? position.y;

        let avatarKey = data.avatar.transformation ?? 'penguin';

        let avatar = await this.loadAvatar(avatarKey);
        this.addPenguin(data, avatar, x, y);

        this.currentRoom.input.on('pointerup', (pointer: Phaser.Input.Pointer) => this.playerPointerUpHandler(pointer));
        this.currentRoom.input.on('pointermove', (pointer: Phaser.Input.Pointer) => this.playerPointerMoveHandler(pointer));

        load.hide();
        this.events.emit('roomjoin', this.currentRoom);
    }

    async loadInitialPenguins(): Promise<void> {

    }

    /* ============ AVATARS ============ */

    public penguins: { [id: string]: Avatar };
    public avatars: { [key: string]: AvatarCls };

    get currentPenguin(): Avatar {
        return this.penguins[this.world.myPenguinData.id];
    }

    async loadAvatar(key: string): Promise<AvatarCls> {
        if (key in this.avatars) return this.avatars[key];

        let path = avatarPaths[key];
        let module = await import(/* webpackInclude: /\.ts$/ */`../avatar/${path}`);
        let avatar: AvatarCls = module.default;

        let load = this.scene.get('Load') as Load;

        let task = load.track(new LoaderTask(this.load));
        module.load(this);

        this.load.start();
        await task.wait();

        this.avatars[key] = avatar;
        return avatar;
    }

    generateSpriteAnimations(assetKey: string, frameKey: string, prefix: string, index: number, fromFrame: number, toFrame?: number, loop = true): Phaser.Animations.Animation {
        let key = this.getSpriteAnimationKey(assetKey, prefix, index);
        if (this.anims.exists(key)) return this.anims.get(key);

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

        let animation = this.anims.create({
            key,
            frames,
            frameRate: 24,
            skipMissedFrames: true,
            repeat: frames.length > 1 && loop ? -1 : 0
        });

        if (animation == false) this.anims.get(key);
        else return animation;
    }

    getSpriteAnimationKey(assetKey: string, prefix: string, index: number): string {
        return `${assetKey}${prefix}_${index}animation`;
    }

    setupPenguin(data: PenguinData | MyPenguinData, penguin: Avatar): void {
        penguin.createAnimations(this);

        let tintFill = this.game.gameConfig.player_colors[String(data.avatar.color)];
        penguin.body_art.setTintFill(Number(tintFill));

        if (this.world.isPlayer(data)) {
            penguin.ring.visible = true;
            penguin.ring.strokeColor = 0x3399FF;
        } else if (this.world.isFriend(data)) {
            penguin.ring.visible = true;
            penguin.ring.strokeColor = 0x009900;
        } else penguin.ring.visible = false;

        penguin.hitbox.on('release', () => this.world.isPlayer(data) ? this.interface.openMyNamecard() : this.interface.openNamecard(data));
        this.interface.attachAvatarOverlay(penguin);

        penguin.overlay.nickname.text = data.name;
        penguin.overlay.balloon.x = penguin.speechBubbleOffset.x;
        penguin.overlay.balloon.y = penguin.speechBubbleOffset.y;

        penguin.penguinData = data;
    }

    addPenguin(data: PenguinData | MyPenguinData, avatar: AvatarCls, x: number, y: number): Avatar {
        if (data.id in this.penguins) return;

        let penguin = new avatar(this.currentRoom, x, y);
        this.setupPenguin(data, penguin);

        penguin.depth = penguin.y + 1;
        this.currentRoom.add.existing(penguin);

        this.penguins[data.id] = penguin;
        this.testTriggers(penguin, true, undefined, undefined, true);

        if (penguin.attachClothing) this.loadClothingSprites(penguin, data.avatar).then(() => this.events.emit(`penguinclothingload`, penguin));
        this.events.emit(`penguinadd`, penguin);
        return penguin;
    }

    removePenguin(penguin: Avatar): void {
        this.testTriggers(penguin, true, NaN, NaN);

        this.interface.removeAvatarOverlay(penguin);
        this.events.emit(`penguinremove`, penguin);

        penguin.destroy();
        delete this.penguins[penguin.penguinData.id];

    }

    testTriggers(penguin: Avatar, finishedMoving: boolean, x?: number, y?: number, prohibitJoinRoom = false): void {
        x = x ?? penguin.x;
        y = y ?? penguin.y;

        let triggers = 'triggers' in penguin.scene ? (penguin.scene.triggers as Phaser.GameObjects.Image[]) : [];

        for (let trigger of triggers) {
            let roomTrigger = RoomTrigger.getComponent(trigger);
            if (roomTrigger && finishedMoving && !prohibitJoinRoom && roomTrigger.test(x, y)) roomTrigger.execute(this, penguin);

            let pressureTrigger = PressureTrigger.getComponent(trigger);
            if (pressureTrigger) {
                let test = pressureTrigger.test(x, y);
                let state = Boolean(test);
                if (state != pressureTrigger.active) {
                    if (state && !finishedMoving) continue;
                    pressureTrigger.active = state;
                    pressureTrigger.execute(this, penguin);
                }
            }
        }
    }

    findPlayerPath(penguin: Avatar, x: number, y: number): Phaser.Math.Vector2 {
        let origin = new Phaser.Math.Vector2(penguin.x, penguin.y);
        let target = new Phaser.Math.Vector2(x, y);

        let block = 'block' in penguin.scene ? penguin.scene.block as Phaser.GameObjects.Image : undefined;
        if (block == undefined) return target;

        let distance = Math.round(Phaser.Math.Distance.BetweenPoints(origin, target));
        let stepX = (target.x - origin.x) / distance;
        let stepY = (target.y - origin.y) / distance;

        let point = new Phaser.Math.Vector2(0, 0);
        let matrix = new Phaser.GameObjects.Components.TransformMatrix();
        let parentMatrix = new Phaser.GameObjects.Components.TransformMatrix();

        let hitTest = penguin.scene.input.makePixelPerfect();
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

    randomRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    findRandomPosition(): Phaser.Math.Vector2 {
        let origin = new Phaser.Math.Vector2(this.cameras.main.centerX, this.cameras.main.centerY + 200);
        let target = new Phaser.Math.Vector2(this.cameras.main.centerX + this.randomRange(- 350, 350), this.cameras.main.centerY + this.randomRange(0, 400));

        let block = 'block' in this.currentRoom ? this.currentRoom.block as Phaser.GameObjects.Image : undefined;
        if (block == undefined) return target;

        let distance = Math.round(Phaser.Math.Distance.BetweenPoints(origin, target));
        let stepX = (target.x - origin.x) / distance;
        let stepY = (target.y - origin.y) / distance;

        let point = new Phaser.Math.Vector2(0, 0);
        let matrix = new Phaser.GameObjects.Components.TransformMatrix();
        let parentMatrix = new Phaser.GameObjects.Components.TransformMatrix();

        let pixelPerfect = this.currentRoom.input.makePixelPerfect();
        let hitTest = (x: number, y: number) => {
            if (block.parentContainer) {
                block.parentContainer.getWorldTransformMatrix(matrix, parentMatrix);
                matrix.applyInverse(x, y, point);
            } else {
                Phaser.Math.TransformXY(x, y, block.x, block.y, block.rotation, block.scaleX, block.scaleY, point);
            }

            let testX = point.x + block.displayOriginX;
            let testY = point.y + block.displayOriginY;
            return pixelPerfect({}, testX + stepX, testY + stepY, block);
        }

        while (distance > 0) {
            if (hitTest(origin.x, origin.y)) {
                break;
            }

            origin.x += stepX;
            origin.y += stepY;

            distance--;
        }

        return origin;
    }

    movePenguin(penguin: Avatar, x: number, y: number, originalX?: number, originalY?: number): void {
        // stop moving first
        penguin.scene.tweens.killTweensOf(penguin);

        let distance = Phaser.Math.Distance.BetweenPoints(penguin, { x, y });

        let angle = this.getAngle(penguin.x, penguin.y, x, y);
        let direction = this.getDirection(angle);

        if (distance < 1) {
            originalX = originalX ?? x;
            originalY = originalY ?? y;
            let angle = this.getAngle(penguin.x, penguin.y, originalX, originalY);
            let direction = this.getDirection(angle);

            penguin.playAnimation(direction);
            this.testTriggers(penguin, true);
            return;
        }

        penguin.playAnimation(direction + 8);
        penguin.scene.tweens.add({
            targets: penguin,
            x: x,
            y: y,
            ease: this.currentRoom?.customEase,
            onStart: (tween: Phaser.Tweens.Tween) => this.trackTween(tween),
            onUpdate: () => {
                penguin.depth = penguin.y + 1;
                penguin.overlay.setPosition(penguin.x, penguin.y);
                penguin.overlay.depth = penguin.depth;
                this.testTriggers(penguin, false);
            },
            onComplete: (tween: Phaser.Tweens.Tween) => {
                this.untrackTween(tween);
                penguin.playAnimation(direction);
                this.testTriggers(penguin, true);
            },
            duration: (distance / penguin.spriteSpeed) * 1000
        });
    }

    resetPenguinAction(penguin: Avatar): void {
        penguin.scene.tweens.killTweensOf(penguin);
        // TODO: send move complete
        this.testTriggers(penguin, true, undefined, undefined, true);
        penguin.playAnimation(0);
        // TODO: send actions
    }

    /* ============ CLOTHING ============ */

    async loadClothingSprites(penguin: Avatar, avatar: AvatarData): Promise<ClothingSprite[]> {
        let promise = Promise.all([
            this.loadClothingSprite(penguin, avatar.head),
            this.loadClothingSprite(penguin, avatar.face),
            this.loadClothingSprite(penguin, avatar.neck),
            this.loadClothingSprite(penguin, avatar.body),
            this.loadClothingSprite(penguin, avatar.hand),
            this.loadClothingSprite(penguin, avatar.feet)
        ]);

        this.load.start();
        return await promise;
    }

    async loadClothingSprite(penguin: Avatar, id: number): Promise<ClothingSprite> {
        if (id == 0) return;

        let config = this.game.gameConfig.paper_items[id];

        for (let [slot, clothing] of penguin.clothes) {
            if (clothing.config.paper_item_id == id) return;

            if (slot == config.type) {
                clothing.destroy();
                penguin.clothes.delete(slot);
                break;
            }
        }

        let key = `clothing-sprites-${id}`;
        let animationsKey = `${key}-animations`;

        try {
            await new Promise<void>((resolve, reject) => {
                if (this.textures.exists(key)) return resolve();

                this.load.multiatlas({
                    key,
                    atlasURL: `assets/clothing/sprites/${id}.json`,
                    path: `assets/clothing/sprites`
                });

                let completeCallback = (key_: string, type_: string) => {
                    if (key_ == key && type_ == 'multiatlas') {
                        this.load.off('filecomplete', completeCallback);
                        this.load.off('loaderror', errorCallback);

                        let item = penguin.clothes.get(config.type);
                        if (item && item.config.paper_item_id != id) reject(new Error(`Sprite ID mismatch (${item.config.paper_item_id} != ${id}). Avatar might have changed before file finished loading.`));
                        else resolve();
                    }
                }
                this.load.on('filecomplete', completeCallback);

                let errorCallback = (file: Phaser.Loader.File) => {
                    if (file.key == key && file.type == 'json') {
                        this.load.off('filecomplete', completeCallback);
                        this.load.off('loaderror', errorCallback);

                        reject(new Error(`Sprite ${id} failed to load!`));
                    }
                }
                this.load.on('loaderror', errorCallback);
            });
            await new Promise<void>((resolve, reject) => {
                if (this.cache.json.exists(animationsKey)) return resolve();

                this.load.json({
                    key: animationsKey,
                    url: `assets/clothing/sprites/${id}.anims.json`
                });

                let completeCallback = (key_: string, type_: string) => {
                    if (key_ == animationsKey && type_ == 'json') {
                        this.load.off('filecomplete', completeCallback);
                        this.load.off('loaderror', errorCallback);

                        let item = penguin.clothes.get(config.type);
                        if (item && item.config.paper_item_id != id) reject(new Error(`Sprite ID mismatch (${item.config.paper_item_id} != ${id}). Avatar might have changed before file finished loading.`));
                        else resolve();
                    }
                }
                this.load.on('filecomplete', completeCallback);

                let errorCallback = (file: Phaser.Loader.File) => {
                    if (file.key == animationsKey && file.type == 'json') {
                        this.load.off('filecomplete', completeCallback);
                        this.load.off('loaderror', errorCallback);

                        reject(new Error(`Animations for sprite ${id} failed to load!`));
                    }
                }
                this.load.on('loaderror', errorCallback);
            });
        } catch (e) {
            console.error(e);
            return;
        }

        return this.addClothingSprite(penguin, key, animationsKey, config);
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

    addClothingSprite(penguin: Avatar, key: string, animationsKey: string, config: PaperItemConfig): ClothingSprite {
        if (!this.textures.exists(key)) return;

        console.log('Adding sprite item', key);

        let sprite = this.add.sprite(0, 0, key, `${config.paper_item_id}/0`) as ClothingSprite;
        sprite.depth = this.getClothingDepth(config);
        sprite.config = config;
        sprite.animations = this.createClothingAnimations(animationsKey);

        penguin.add(sprite);
        penguin.sort('depth');

        penguin.clothes.set(config.type, sprite);
        this.resetPenguinAction(penguin);
        return sprite;
    }

    createClothingAnimations(key: string): { [frame: number]: Phaser.Animations.Animation; } {
        if (!this.cache.json.exists(key)) return;

        let data: Phaser.Types.Animations.JSONAnimations & { anims: (Phaser.Types.Animations.JSONAnimation & { index: string })[] } = this.cache.json.get(key);
        let animations: { [frame: number]: Phaser.Animations.Animation; } = {};

        for (let anim of data.anims) {
            let animation = this.anims.exists(anim.key) ? this.anims.get(anim.key) : this.anims.create(anim);

            if (animation != false) {
                let frameIndex = parseInt(anim.index);
                animations[frameIndex] = animation;
            } else console.warn(`Animation ${anim.key} failed to be created. Skipping.`);
        }

        return animations;
    }

    /* ============ SNOWBALL ============ */

    public snowballs: Snowball[];
    public maxSnowballs = 10;
    public maxSnowballHeight = 425;
    public minSnowballHeight = 350;

    getPeak(duration: number): number {
        let peak = Math.max(duration / 2, this.minSnowballHeight)
        return Math.min(peak, this.maxSnowballHeight)
    }

    getMidPoint(p1: Phaser.Types.Math.Vector2Like, p2: Phaser.Types.Math.Vector2Like): { x: number, y: number } {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        }
    }

    testSnowballTriggers(snowball: Snowball, penguin: Avatar): void {
        let triggers = 'triggers' in penguin.scene ? (penguin.scene.triggers as Phaser.GameObjects.Image[]) : [];

        for (let trigger of triggers) {
            let snowballTrigger = SnowballTrigger.getComponent(trigger);
            if (snowballTrigger && snowballTrigger.test(snowball.x, snowball.y)) snowballTrigger.execute(this, penguin, snowball);
        }
    }

    throwSnowball(penguin: Avatar, x: number, y: number): void {
        if (penguin == this.currentPenguin) this.cancelMovePlayer();
        else penguin.scene.tweens.killTweensOf(penguin);

        let startX = penguin.x + penguin.snowballOffset.x;
        let startY = penguin.y + penguin.snowballOffset.y;

        if (this.snowballs.length + 1 > this.maxSnowballs) {
            let lastSnowball = this.snowballs.shift();
            lastSnowball.destroy();
        }

        let snowballClass = 'customSnowballClass' in this.currentRoom ? this.currentRoom.customSnowballClass as typeof Snowball : Snowball;
        let snowball = new snowballClass(this.currentRoom, startX, startY);
        this.currentRoom.add.existing(snowball);

        this.snowballs.push(snowball);

        let distance = Phaser.Math.Distance.BetweenPoints(snowball, { x, y });
        let angle = this.getAngle(startX, startY, x, y);
        let direction = this.getDirectionQuarters(angle);
        let duration = (distance / snowball.speed) * 1000;
        let midPoint = this.getMidPoint(snowball, { x, y });

        let curve = new Phaser.Curves.QuadraticBezier(
            new Phaser.Math.Vector2(snowball.x, snowball.y),
            new Phaser.Math.Vector2(midPoint.x, midPoint.y - this.getPeak(duration)),
            new Phaser.Math.Vector2(x, y)
        );

        penguin.playAnimation(26 + direction);

        this.currentRoom.time.delayedCall(penguin.snowballDelay, () => this.currentRoom.tweens.add({
            targets: snowball,
            y,
            duration,
            onStart: (tween: Phaser.Tweens.Tween) => {
                this.trackTween(tween);
                snowball.start(tween);
            },
            onUpdate: (tween: Phaser.Tweens.Tween) => snowball.step(tween, curve),
            onComplete: (tween: Phaser.Tweens.Tween) => {
                this.untrackTween(tween);
                snowball.step(tween, curve);
                snowball.complete(tween);
                this.testSnowballTriggers(snowball, penguin);
            }
        }));
    }

    /* ============ PLAYER ============ */

    movePlayer(x: number, y: number): void {
        let player = this.currentPenguin;
        // TODO: send move done
        let path = this.findPlayerPath(player, x, y);
        this.movePenguin(player, path.x, path.y, x, y);
    }

    cancelMovePlayer(): void {
        let player = this.currentPenguin;

        player.scene.tweens.killTweensOf(player);
        // TODO: send move complete
        this.testTriggers(player, true);

    }

    getAngle(fromX: number, fromY: number, atX: number, atY: number): number {
        let dx = atX - fromX;
        let dy = atY - fromY;

        let angle = (Math.atan2(dy, dx) * (180 / Math.PI)) - 90;
        return (angle < 0) ? angle + 360 : angle;
    }

    getDirection(angle: number): number {
        let direction = Math.round(angle / 45);
        return (direction > 7) ? 0 : direction;
    }

    getDirectionQuarters(angle: number): number {
        var direction = Math.floor(angle / 90);
        return (direction > 3) ? 0 : direction;
    }

    lookAt(x: number, y: number): void {
        let player = this.currentPenguin;

        let angle = this.getAngle(player.x, player.y, x, y);
        let direction = this.getDirection(angle);
        player.playAnimation(direction);
    }

    actionSitDown(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(16);
        // TODO: send actions
    }

    actionSitDownLeft(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(17);
        // TODO: send actions
    }

    actionSitLeft(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(18);
        // TODO: send actions
    }

    actionSitUpLeft(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(19);
        // TODO: send actions
    }

    actionSitUp(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(20);
        // TODO: send actions
    }

    actionSitUpRight(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(21);
        // TODO: send actions
    }

    actionSitRight(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(22);
        // TODO: send actions
    }

    actionSitDownRight(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(23);
        // TODO: send actions
    }

    actionWave(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(24);
        // TODO: send actions
    }

    actionDance(): void {
        this.cancelMovePlayer();
        this.currentPenguin.playAnimation(25);
        // TODO: send actions
    }

    playerPointerMoveHandler(pointer: Phaser.Input.Pointer): void {
        let player = this.currentPenguin;
        if (!player.isIdle()) return;

        let objects = this.currentRoom.input.hitTestPointer(pointer);
        if (objects[0] != player.hitbox) this.lookAt(pointer.worldX, pointer.worldY);
    }

    playerPointerUpHandler(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonReleased()) {
            let objects = this.currentRoom.input.hitTestPointer(pointer);
            if (objects.length == 0) this.movePlayer(pointer.worldX, pointer.worldY);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
