enum InventorySort {
    ALL_OTHER = -1,
    ALL_ITEMS = 0,
    COLOR = 1,
    HEAD,
    FACE,
    NECK,
    BODY,
    HAND,
    FEET,
    FLAG,
    PHOTO,
    OTHER,
}

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
import InventoryItem from "./InventoryItem";
/* START-USER-IMPORTS */
import Interface from "../Interface";
/* END-USER-IMPORTS */

export default class PlayerInventory extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.image(247.1625, -8.4375, "interface", "interface/inventoryBg");
        bg.setOrigin(0, 0);
        this.add(bg);

        // sortBg
        const sortBg = scene.add.image(767.25, 679.5, "interface", "interface/inventorySortBg");
        this.add(sortBg);

        // tab
        const tab = scene.add.image(1063.25, 180, "interface", "interface/namecardInventoryTabOpen");
        tab.setOrigin(0.09, 0.5);
        this.add(tab);

        // scroll
        const scroll = scene.add.image(1012.3875, 319.275, "interface", "interface/inventoryScroll");
        this.add(scroll);

        // backButton
        const backButton = scene.add.image(1012.5, 55.0125, "interface", "interface/inventoryBackButton0001");
        this.add(backButton);

        // nextButton
        const nextButton = scene.add.image(1012.5, 583.7625, "interface", "interface/inventoryBackButton0001");
        this.add(nextButton);

        // sortButton
        const sortButton = scene.add.image(767.25, 675, "interface", "interface/inventorySortButton0001");
        this.add(sortButton);

        // sortText
        const sortText = new TextBox(scene, 637.76, 654.75, "BurbankSmallMedium");
        sortText.tintFill = true;
        sortText.tintTopLeft = 0;
        sortText.tintTopRight = 0;
        sortText.tintBottomLeft = 0;
        sortText.tintBottomRight = 0;
        sortText.text = "Head Items";
        sortText.fontSize = -24.75;
        sortText.align = 1;
        sortText.maxWidth = 259.0875;
        this.add(sortText);

        // item0
        const item0 = new InventoryItem(scene, 596.25, 99);
        this.add(item0);

        // item1
        const item1 = new InventoryItem(scene, 744.75, 99);
        this.add(item1);

        // item2
        const item2 = new InventoryItem(scene, 893.25, 99);
        item2.visible = true;
        this.add(item2);

        // item3
        const item3 = new InventoryItem(scene, 596.25, 247.5);
        this.add(item3);

        // item4
        const item4 = new InventoryItem(scene, 744.75, 247.5);
        this.add(item4);

        // item5
        const item5 = new InventoryItem(scene, 893.25, 247.5);
        this.add(item5);

        // item6
        const item6 = new InventoryItem(scene, 596.25, 396);
        this.add(item6);

        // item7
        const item7 = new InventoryItem(scene, 744.75, 396);
        this.add(item7);

        // item8
        const item8 = new InventoryItem(scene, 893.25, 396);
        this.add(item8);

        // item9
        const item9 = new InventoryItem(scene, 596.25, 544.5);
        this.add(item9);

        // item10
        const item10 = new InventoryItem(scene, 744.75, 544.5);
        this.add(item10);

        // item11
        const item11 = new InventoryItem(scene, 893.25, 544.5);
        this.add(item11);

        // lists
        const items = [item0, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11];

        // bg (components)
        new InputBlocker(bg);

        // tab (components)
        const tabButtonComponent = new ButtonComponent(tab);
        tabButtonComponent.handCursor = true;
        tabButtonComponent.pixelPerfect = true;

        // backButton (components)
        const backButtonButtonComponent = new ButtonComponent(backButton);
        backButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/inventoryBackButton0001"};
        backButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/inventoryBackButton0002"};
        backButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/inventoryBackButton0003"};
        backButtonButtonComponent.handCursor = true;
        backButtonButtonComponent.pixelPerfect = true;

        // nextButton (components)
        const nextButtonButtonComponent = new ButtonComponent(nextButton);
        nextButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/inventoryNextButton0001"};
        nextButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/inventoryNextButton0002"};
        nextButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/inventoryNextButton0003"};
        nextButtonButtonComponent.handCursor = true;
        nextButtonButtonComponent.pixelPerfect = true;

        // sortButton (components)
        const sortButtonButtonComponent = new ButtonComponent(sortButton);
        sortButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/inventorySortButton0001"};
        sortButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/inventorySortButton0002"};
        sortButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/inventorySortButton0002"};
        sortButtonButtonComponent.handCursor = true;
        sortButtonButtonComponent.pixelPerfect = true;

        // sortText (prefab fields)
        sortText.boxWidth = 259.0875;
        sortText.boxHeight = 41.4;
        sortText.horizontalAlign = 1;
        sortText.verticalAlign = 1;

        this.tab = tab;
        this.backButton = backButton;
        this.nextButton = nextButton;
        this.sortButton = sortButton;
        this.sortText = sortText;
        this.items = items;

        /* START-USER-CTR-CODE */

        this.backButton.on('release', () => {
            this.showPage(this.currentPage - 1);
        });

        this.nextButton.on('release', () => {
            this.showPage(this.currentPage + 1);
        });

        /* END-USER-CTR-CODE */
    }

    public tab: Phaser.GameObjects.Image;
    public backButton: Phaser.GameObjects.Image;
    public nextButton: Phaser.GameObjects.Image;
    public sortButton: Phaser.GameObjects.Image;
    public sortText: TextBox;
    public items: InventoryItem[];

    /* START-USER-CODE */

    declare scene: Interface;
    public currentPage: number;
    public sortCategory: InventorySort;
    public userId: number;
    public inventory: number[];

    setup(userId: number): void {
        this.userId = userId;

        if (this.sortCategory == undefined) this.setCategory(InventorySort.ALL_ITEMS);
        else {
            this.inventory = this.computeInventory();
            this.showPage(this.currentPage);
        }
    }

    setCategory(category: InventorySort): void {
        this.sortCategory = category;
        this.inventory = this.computeInventory();
        this.showPage(0);

        this.scene.game.locale.immediate(locale => {
            let key: string;
            switch (category) {
                case InventorySort.COLOR:
                    key = 'colour_items';
                    break;
                case InventorySort.HEAD:
                    key = 'head_items';
                    break;
                case InventorySort.FACE:
                    key = 'face_items';
                    break;
                case InventorySort.NECK:
                    key = 'neck_items';
                    break;
                case InventorySort.BODY:
                    key = 'body_items';
                    break;
                case InventorySort.HAND:
                    key = 'hand_items';
                    break;
                case InventorySort.FEET:
                    key = 'feet_items';
                    break;
                case InventorySort.FLAG:
                    key = 'flag_items';
                    break;
                case InventorySort.PHOTO:
                    key = 'photo_items';
                    break;
                case InventorySort.OTHER:
                    key = 'award_items';
                    break;
                case InventorySort.ALL_OTHER:
                    key = 'other_items';
                    break;
                default:
                    key = 'all_items';
                    break;
            }
            this.sortText.text = locale.localize(key);
        });
    }

    computeInventory(): number[] {
        let inventory: number[];
        let items = this.scene.game.gameConfig.paper_items;
        if (this.sortCategory == 0) inventory = this.scene.world.inventory;
        else {
            inventory = this.scene.world.inventory.filter(id => {
                let item = items[id];
                if (this.sortCategory == InventorySort.ALL_OTHER) return [InventorySort.OTHER, InventorySort.PHOTO, InventorySort.FLAG].includes(item.type);
                else return item.type == this.sortCategory;
            });
        }

        inventory.sort((a, b) => {
            let itemA = items[a];
            let itemB = items[b];

            if (itemA.type === itemB.type) {
                return itemA.paper_item_id - itemB.paper_item_id;
            }

            return itemA.type - itemB.type;
        });

        return inventory;
    }

    showPage(page: number): void {
        let itemsPerPage = this.items.length;
        let totalPages = Math.ceil(this.inventory.length / itemsPerPage);

        if (page < 0) page = 0;
        if (page >= totalPages) page = totalPages - 1;

        let start = page * itemsPerPage;
        let end = start + itemsPerPage;
        let pageItems = this.inventory.slice(start, end);

        this.items.forEach((item, i) => {
            if (i < pageItems.length) {
                item.visible = true;
                item.load(pageItems[i], this.userId);
            } else {
                item.visible = false;
            }
        });

        this.currentPage = page;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
