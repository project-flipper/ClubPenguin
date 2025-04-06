
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import Interface from "@clubpenguin/world/interface/Interface";
import { getLogger } from "@clubpenguin/lib/log";
import { LoaderTask } from "@clubpenguin/load/tasks";

let logger = getLogger('CP.world.interface');
/* END-USER-IMPORTS */

export default class InventoryItem extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // button
        const button = scene.add.image(0, 0, "ui-2014", "2014/item0001");
        this.add(button);

        // notFound
        const notFound = scene.add.image(0, 0, "ui-2014", "2014/itemNotFound");
        notFound.visible = false;
        this.add(notFound);

        // spinner
        const spinner = scene.add.sprite(0, 0, "ui-2014", "2014/spinner0001");
        spinner.play("ui-inventoryspinner-animation");
        this.add(spinner);

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/item0001"};
        buttonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/item0002"};
        buttonButtonComponent.handCursor = true;
        buttonButtonComponent.pixelPerfect = true;

        this.button = button;
        this.notFound = notFound;
        this.spinner = spinner;

        /* START-USER-CTR-CODE */

        this.button.on('release', () => {
            if (this.itemId) this.scene.world.wearItem(this.itemId);
        });

        /* END-USER-CTR-CODE */
    }

    public button: Phaser.GameObjects.Image;
    public notFound: Phaser.GameObjects.Image;
    public spinner: Phaser.GameObjects.Sprite;

    /* START-USER-CODE */

    declare scene: Interface;
    public item: Phaser.GameObjects.Image;
    public itemId: number;
    public playerId: number;

    async load(id: number, playerId?: number): Promise<void> {
        let key = `clothing-icons-${id}`;
        let app = this.scene.game;

        if (this.itemId === id) {
            if (this.playerId != playerId) {
                app.cleaner.allocateResource('multiatlas', key, playerId);
                app.cleaner.deallocateResource('multiatlas', key, this.playerId);
                this.playerId = playerId;
            }
            return;
        }

        this.unload();
        this.itemId = id;

        this.spinner.visible = true;
        this.notFound.visible = false;

        logger.info('Loading clothing icon', id);

        let load = this.scene.loadScreen;

        if (!this.scene.textures.exists(key)) {
            let task = load.track(new LoaderTask('Pin loader', this.scene.load));
            this.scene.load.multiatlas({
                key,
                atlasURL: `assets/clothing/icons/${id}.json`,
                path: `assets/clothing/icons`
            });
            this.scene.load.start();
            await task.wait();
        }

        if (this.itemId != id) return;

        if (this.scene.textures.exists(key)) {
            this.playerId = playerId;
            app.cleaner.allocateResource('multiatlas', key, playerId);

            this.item = this.scene.add.image(0, 0, key, `${id}/0`);
            this.add(this.item);
        } else {
            this.notFound.visible = true;
        }

        this.itemId = id;
        this.spinner.visible = false;
    }

    unload(): void {
        if (this.item) {
            this.item.destroy();
            this.item = undefined;

            let key = `clothing-icons-${this.itemId}`;

            this.scene.game.cleaner.deallocateResource('multiatlas', key, this.playerId);

            this.scene.game.unloadMultiatlas(key);
            this.itemId = undefined;
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
