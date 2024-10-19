
// You can write more code here

/* START OF COMPILED CODE */

import { LoaderTask } from "@clubpenguin/load/tasks";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import Interface from "../Interface";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger('CP.world.interface');
/* END-USER-IMPORTS */

export default class InventoryItem extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // button
        const button = scene.add.image(0, 0, "interface", "interface/item0001");
        this.add(button);

        // notFound
        const notFound = scene.add.image(0, 0, "interface", "interface/itemNotFound");
        notFound.visible = false;
        this.add(notFound);

        // spinner
        const spinner = scene.add.sprite(0, 0, "interface", "interface/spinner0001");
        spinner.play("interface-inventoryspinner-animation");
        this.add(spinner);

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.upTexture = {"key":"interface","frame":"interface/item0001"};
        buttonButtonComponent.overTexture = {"key":"interface","frame":"interface/item0002"};
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
        let engine = this.scene.engine;

        if (this.itemId === id) {
            if (this.playerId != playerId && engine) {
                engine.cleaner.allocateResource('multiatlas', key, playerId);
                engine.cleaner.deallocateResource('multiatlas', key, this.playerId);
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
            if (engine) engine.cleaner.allocateResource('multiatlas', key, playerId);

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

            let engine = this.scene.engine;
            let key = `clothing-icons-${this.itemId}`;

            if (engine) engine.cleaner.deallocateResource('multiatlas', key, this.playerId);
    
            this.scene.game.unloadMultiatlas(key);
            this.itemId = undefined;
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
