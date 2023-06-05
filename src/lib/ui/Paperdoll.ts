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

/* START OF COMPILED CODE */

import Phaser from "phaser";
import DepthEnabled from "./components/DepthEnabled";
import ButtonComponent from "./components/ButtonComponent";
/* START-USER-IMPORTS */
import type { Avatar } from "../../net/types/penguin/avatar";
import type { App } from "../../app/app";
import type { PaperItemConfig } from "../../app/config";
import { ItemType } from "../../world/engine/Engine";
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
        photo_button.alpha = 0.01;
        photo_button.alphaTopLeft = 0.01;
        photo_button.alphaTopRight = 0.01;
        photo_button.alphaBottomLeft = 0.01;
        photo_button.alphaBottomRight = 0.01;
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
            this.removeItem(ItemType.PHOTO);
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

    /* START-USER-CODE */

    public game: App;

    public avatarData: Avatar;
    public items: Map<ItemType, Phaser.GameObjects.Image[]>;

    setup(data: Avatar): void {
        this.photo_button.visible = false;
        this.avatarData = data;
        console.log(data);

        let tintFill = this.game.gameConfig.player_colors[String(data.color)];
        this.body_art.setTintFill(Number(tintFill));

        this.load(data);
    }

    async load(data: Avatar): Promise<void> {
        let loader = this.scene.load;
        Promise.all([
            this.loadItem(ItemType.HEAD, data.head),
            this.loadItem(ItemType.FACE, data.face),
            this.loadItem(ItemType.NECK, data.neck),
            this.loadItem(ItemType.BODY, data.body),
            this.loadItem(ItemType.HAND, data.hand),
            this.loadItem(ItemType.FEET, data.feet),
            this.loadItem(ItemType.PHOTO, data.photo),
            this.loadItem(ItemType.FLAG, data.flag)
        ]).then(callbacks => {
            for (let callback of callbacks.flat()) callback();
        });
        loader.start();
    }

    loadItem(type: ItemType, id: number): Promise<ItemPromiseReturn[]> {
        if (id == 0) return Promise.resolve([]);

        let config = this.game.gameConfig.paper_items[id];
        let path = pathByItemType(type);
        let key = `clothing-${path}-${id}`;

        let promises: Promise<ItemPromiseReturn>[] = [];

        if (this.scene.textures.exists(key)) {
            promises.push(new Promise(resolve => resolve(() => this.addItem(type, config, key, id.toString(), false))));
        } else {
            promises.push(new Promise(resolve => {
                this.scene.load.multiatlas({
                    key,
                    atlasURL: `assets/clothing/${path}/${id}.json`,
                    path: `assets/clothing/${path}`
                });

                let completeCallback = (key_: string, type_: string) => {
                    if (key_ == key && type_ == 'multiatlas') {
                        this.scene.load.off('filecomplete', completeCallback);
                        this.scene.load.off('loaderror', errorCallback);

                        if (!this.hasItem(id)) return resolve(() => { });
                        resolve(() => this.addItem(type, config, key, id.toString(), false))
                    }
                }
                this.scene.load.on('filecomplete', completeCallback);

                let errorCallback = (file: Phaser.Loader.File) => {
                    if (file.key == key && file.type == 'json') {
                        this.scene.load.off('filecomplete', completeCallback);
                        this.scene.load.off('loaderror', errorCallback);

                        resolve(() => { });
                    }
                }
                this.scene.load.on('loaderror', errorCallback);
            }));
        }

        if (config.has_back) {
            let back_key = `${key}_back`;

            if (this.scene.textures.exists(back_key)) {
                promises.push(new Promise(resolve => resolve(() => this.addItem(type, config, back_key, `${id}_back`, true))));
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

                            if (!this.hasItem(id)) return resolve(() => { });
                            resolve(() => this.addItem(type, config, back_key, `${id}_back`, true))
                        }
                    }
                    this.scene.load.on('filecomplete', completeCallback);

                    let errorCallback = (file: Phaser.Loader.File) => {
                        if (file.key == key && file.type == 'json') {
                            this.scene.load.off('filecomplete', completeCallback);
                            this.scene.load.off('loaderror', errorCallback);

                            resolve(() => { });
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

    addItem(type: ItemType, config: PaperItemConfig, key: string, path: string, isBack: boolean): void {
        if (!this.scene.textures.exists(key)) return;

        console.log('Adding item', key, 'with path', path);

        let image = this.scene.add.image(0, 0, key, `${path}/0`);
        image.alpha = 0;
        image.depth = config.layer;

        this.attachItem(type, image, isBack);

        this.sort('depth');

        if (this.interactive && type != ItemType.PHOTO) {
            image.setInteractive({ useHandCursor: true, pixelPerfect: true });
            image.on('pointerup', () => this.removeItem(type));
        } else if (this.interactive && type == ItemType.PHOTO) {
            this.photo_button.visible = true;
        }

        this.scene.tweens.add({
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

    attachItem(type: ItemType, image: Phaser.GameObjects.Image, isBack: boolean): void {
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

    removeItem(type: ItemType): void {
        if (!this.items.has(type)) return;

        let array = this.items.get(type);
        for (let item of array) {
            let key = item.texture.key;
            item.destroy();
            this.game.unloadMultiatlas(key);
        }
    }

    clear(): void {
        for (let [_type, items] of this.items) {
            for (let item of items) {
                let key = item.texture.key;
                item.destroy();
                this.game.unloadMultiatlas(key);
            }
        }
        this.items.clear();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
