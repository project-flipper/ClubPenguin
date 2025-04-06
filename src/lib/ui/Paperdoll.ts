function pathByItemType(type: ItemType): string {
    switch (type) {
        case ItemType.PHOTO:
            return 'photos';
        case ItemType.FLAG:
            return 'icons';
        default:
            return 'paper';
    }
}

type ItemPromiseReturn = () => void;
type PaperItem = Phaser.GameObjects.Image & { config: PaperItemConfig, isBack: boolean };

export enum Layer {
    TOP = 7500,
    PUFFLE = 7250,
    HAND = 7000,
    BETWEEN_HAND_AND_HEAD = 6500,
    HEAD = 6000,
    BETWEEN_HEAD_AND_FACE = 5500,
    FACE = 5000,
    BETWEEN_FACE_AND_NECK = 4500,
    NECK = 4000,
    BETWEEN_NECK_AND_BODY = 3500,
    BODY = 3000,
    BETWEEN_BODY_AND_FEET = 2500,
    FEET = 2000,
    BETWEEN_FEET_AND_BACK = 1500,
    BACK = 1000,
    BOTTOM = 500
}

/* START OF COMPILED CODE */

import DepthEnabled from "../components/DepthEnabled";
import ButtonComponent from "../components/ButtonComponent";
/* START-USER-IMPORTS */
import { AvatarData } from "@clubpenguin/net/types/avatar";
import { App } from "@clubpenguin/app/app";
import { PaperItemConfig } from "@clubpenguin/app/config";
import { ItemType } from "@clubpenguin/world/engine/clothing/itemType";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Paperdoll extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // back_container
        const back_container = scene.add.container(-231.075, -231.525);
        this.add(back_container);

        // photo_button
        const photo_button = scene.add.image(0, 0, "interface", "interface/namecardMask");
        photo_button.setOrigin(0, 0);
        photo_button.visible = false;
        photo_button.alpha = 0.0001;
        photo_button.alphaTopLeft = 0.0001;
        photo_button.alphaTopRight = 0.0001;
        photo_button.alphaBottomLeft = 0.0001;
        photo_button.alphaBottomRight = 0.0001;
        back_container.add(photo_button);

        // flag_container
        const flag_container = scene.add.container(-172.125, -134.775);
        this.add(flag_container);

        // behind_container
        const behind_container = scene.add.container(0, 0);
        this.add(behind_container);

        // body_art
        const body_art = scene.add.image(-148.5, -141.6375, "body");
        body_art.setOrigin(0, 0);
        this.add(body_art);

        // outline_art
        const outline_art = scene.add.image(-155.1375, -145.57500000000002, "outline");
        outline_art.setOrigin(0, 0);
        this.add(outline_art);

        // back_container (components)
        const back_containerDepthEnabled = new DepthEnabled(back_container);
        back_containerDepthEnabled.depth = -15;

        // photo_button (components)
        const photo_buttonButtonComponent = new ButtonComponent(photo_button);
        photo_buttonButtonComponent.handCursor = true;
        photo_buttonButtonComponent.pixelPerfect = true;

        // flag_container (components)
        const flag_containerDepthEnabled = new DepthEnabled(flag_container);
        flag_containerDepthEnabled.automaticSort = false;
        flag_containerDepthEnabled.depth = -10;

        // behind_container (components)
        const behind_containerDepthEnabled = new DepthEnabled(behind_container);
        behind_containerDepthEnabled.automaticSort = false;
        behind_containerDepthEnabled.depth = -5;

        // body_art (components)
        const body_artDepthEnabled = new DepthEnabled(body_art);
        body_artDepthEnabled.automaticSort = false;

        // outline_art (components)
        const outline_artDepthEnabled = new DepthEnabled(outline_art);
        outline_artDepthEnabled.automaticSort = false;
        outline_artDepthEnabled.depth = 1;

        this.photo_button = photo_button;
        this.back_container = back_container;
        this.flag_container = flag_container;
        this.behind_container = behind_container;
        this.body_art = body_art;
        this.outline_art = outline_art;

        /* START-USER-CTR-CODE */

        this.game = scene.game as App;
        this.items = new Map();

        this.photo_button.on('release', () => {
            this.world.removeItem(this.items.get(ItemType.PHOTO)[0].config.paper_item_id);
            this.photo_button.visible = false;
        });

        /* END-USER-CTR-CODE */
    }

    public photo_button: Phaser.GameObjects.Image;
    public back_container: Phaser.GameObjects.Container;
    public flag_container: Phaser.GameObjects.Container;
    public behind_container: Phaser.GameObjects.Container;
    public body_art: Phaser.GameObjects.Image;
    public outline_art: Phaser.GameObjects.Image;
    public interactive: boolean = true;
    public showBackground: boolean = true;
    public showPin: boolean = true;
    public fadeAfterLoad: boolean = true;

    /* START-USER-CODE */

    public game: App;

    public avatarData: AvatarData;
    public items: Map<ItemType, PaperItem[]>;

    get world(): World {
        return this.scene.scene.get('World') as World;
    }

    public playerId: number;

    setup(data: AvatarData, playerId: number): void {
        let previousPlayerId = this.playerId;
        this.playerId = playerId;
        this.photo_button.visible = false;
        this.avatarData = data;

        let tintFill = this.game.gameConfig.player_colors[String(data.color)];
        this.body_art.setTintFill(Number(tintFill));

        this.load(data, previousPlayerId);
    }

    load(data: AvatarData, previousPlayerId?: number): Promise<void[][]> {
        let loader = this.scene.load;

        let promises = [
            this.loadItem(ItemType.HEAD, data.head, previousPlayerId),
            this.loadItem(ItemType.FACE, data.face, previousPlayerId),
            this.loadItem(ItemType.NECK, data.neck, previousPlayerId),
            this.loadItem(ItemType.BODY, data.body, previousPlayerId),
            this.loadItem(ItemType.HAND, data.hand, previousPlayerId),
            this.loadItem(ItemType.FEET, data.feet, previousPlayerId),
        ];
        if (this.showBackground) promises.push(this.loadItem(ItemType.PHOTO, data.photo, previousPlayerId));
        if (this.showPin) promises.push(this.loadItem(ItemType.FLAG, data.flag, previousPlayerId));

        loader.start();
        return Promise.all(promises);
    }

    loadItem(type: ItemType, id: number, previousPlayerId?: number): Promise<void[]> {
        if (!id) {
            if (this.items.has(type)) this.removeItem(type, previousPlayerId);
            return;
        }

        let config = this.game.gameConfig.paper_items[id];

        if (!config) return;

        if (this.items.has(type)) {
            let array = this.items.get(type);
            if (array[0].config.paper_item_id == id) return;

            this.removeItem(type, previousPlayerId);
        }

        let path = pathByItemType(type);
        let key = `clothing-${path}-${id}`;

        let promises: Promise<void>[] = [];
        if (this.scene.textures.exists(key)) {
            this.game.cleaner.allocateResource('multiatlas', key, this.playerId);
            this.addItem(type, config, key, id.toString(), false);
        } else {
            promises.push(new Promise<void>(resolve => {
                this.scene.load.multiatlas({
                    key,
                    atlasURL: `assets/clothing/${path}/${id}.json`,
                    path: `assets/clothing/${path}`
                });

                let completeCallback = (key_: string, type_: string) => {
                    if (key_ == key && type_ == 'multiatlas') {
                        this.scene.load.off('filecomplete', completeCallback);
                        this.scene.load.off('loaderror', errorCallback);

                        this.game.cleaner.allocateResource(type_, key_, this.playerId);

                        if (!this.hasItem(id)) {
                            this.game.cleaner.markTrash(type_, key_);
                            return resolve();
                        } else this.game.cleaner.allocateResource(type_, key_, this.playerId);

                        this.addItem(type, config, key, id.toString(), false);
                        resolve();
                    }
                }
                this.scene.load.on('filecomplete', completeCallback);

                let errorCallback = (file: Phaser.Loader.File) => {
                    if (file.key == key && file.type == 'json') {
                        this.scene.load.off('filecomplete', completeCallback);
                        this.scene.load.off('loaderror', errorCallback);

                        resolve();
                    }
                }
                this.scene.load.on('loaderror', errorCallback);
            }));
        }

        if (config.has_back) {
            let back_key = `${key}_back`;

            if (this.scene.textures.exists(back_key)) {
                this.game.cleaner.allocateResource('multiatlas', back_key, this.playerId);
                this.addItem(type, config, back_key, `${id}_back`, true);
            } else {
                promises.push(new Promise(resolve => {
                    this.scene.load.multiatlas({
                        key: back_key,
                        atlasURL: `assets/clothing/${path}/${id}_back.json`,
                        path: `assets/clothing/${path}`
                    });

                    let completeCallback = (key_: string, type_: string) => {
                        if (key_ == key && type_ == 'multiatlas') {
                            this.scene.load.off('filecomplete', completeCallback);
                            this.scene.load.off('loaderror', errorCallback);

                            if (!this.hasItem(id)) {
                                this.game.cleaner.markTrash(type_, key_);
                                return resolve();
                            } else this.game.cleaner.allocateResource(type_, key_, this.playerId);

                            this.addItem(type, config, back_key, `${id}_back`, true);
                            resolve();
                        }
                    }
                    this.scene.load.on('filecomplete', completeCallback);

                    let errorCallback = (file: Phaser.Loader.File) => {
                        if (file.key == key && file.type == 'json') {
                            this.scene.load.off('filecomplete', completeCallback);
                            this.scene.load.off('loaderror', errorCallback);

                            resolve();
                        }
                    }
                    this.scene.load.on('loaderror', errorCallback);
                }));
            }
        }

        return Promise.all(promises);
    }

    loadPuffleItem(id: number): Promise<ItemPromiseReturn> {
        return;
    }

    getLayer(type: ItemType): Layer {
        switch (type) {
            case ItemType.HAND:
                return Layer.HAND;
            case ItemType.HEAD:
                return Layer.HEAD;
            case ItemType.FACE:
                return Layer.FACE;
            case ItemType.NECK:
                return Layer.NECK;
            case ItemType.FEET:
                return Layer.FEET;
            case ItemType.PUFFLE:
                return Layer.PUFFLE;
            case ItemType.BODY:
            default:
                return Layer.BODY;
        }
    }

    addItem(type: ItemType, config: PaperItemConfig, key: string, path: string, isBack: boolean): void {
        if (!this.scene.textures.exists(key)) return;

        let image = this.scene.add.image(0, 0, key, `${path}/0`) as PaperItem;
        image.alpha = this.fadeAfterLoad ? 0 : 1;
        image.scale = type == ItemType.FLAG ? 0.66 : 1;
        image.depth = config.custom_depth ?? (isBack ? Layer.BACK : this.getLayer(config.type));
        image.config = config;
        image.isBack = isBack;

        this.attachItem(type, image, isBack);

        this.sort('depth');

        if (this.interactive && type != ItemType.PHOTO) {
            image.setInteractive({ useHandCursor: true, pixelPerfect: true });
            image.on('pointerup', () => this.world.removeItem(config.paper_item_id));
        } else if (this.interactive && type == ItemType.PHOTO) {
            this.photo_button.visible = true;
        }

        if (this.fadeAfterLoad) this.scene.tweens.add({
            targets: image,
            alpha: { from: 0, to: 1 },
            duration: 150
        });
    };

    hasItem(id: number): boolean {
        let data = this.avatarData;
        return (
            id == data.head ||
            id == data.face ||
            id == data.neck ||
            id == data.body ||
            id == data.hand ||
            id == data.feet ||
            id == data.photo ||
            id == data.flag
        );
    }

    attachItem(type: ItemType, image: PaperItem, isBack: boolean): void {
        if (!this.items.has(type)) this.items.set(type, []);

        let array = this.items.get(type);
        array.push(image);

        switch (type) {
            case ItemType.PHOTO:
                this.back_container.add(image);
                break;
            case ItemType.FLAG:
                this.flag_container.add(image);
                break;
            default:
                if (isBack) {
                    this.behind_container.add(image);
                    this.back_container.sort('depth');
                } else {
                    this.add(image);
                }
                break;
        }
    }

    removeItem(type: ItemType, previousPlayerId?: number): void {
        if (!this.items.has(type)) return;

        let array = this.items.get(type);
        for (let item of array) {
            let key = item.texture.key;
            item.destroy();
            this.game.cleaner.deallocateResource('multiatlas', key, previousPlayerId);
        }

        this.game.cleaner.collect();

        this.items.delete(type);
    }

    clear(): void {
        for (let [type, _] of this.items) this.removeItem(type, this.playerId);
        this.items.clear();
    }

    destroy(fromScene?: boolean): void {
        this.clear();
        super.destroy(fromScene);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
