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

import InputBlocker from "../../../../lib/components/InputBlocker";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
import InventoryItem from "./InventoryItem";
import TextBox from "../../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Interface from "@clubpenguin/world/interface/Interface";
/* END-USER-IMPORTS */

export default class PlayerInventory extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.image(247.1625, -8.4375, "ui-2014", "2014/inventoryBg");
        bg.setOrigin(0, 0);
        this.add(bg);

        // sortBg
        const sortBg = scene.add.image(767.25, 679.5, "ui-2014", "2014/inventorySortBg");
        this.add(sortBg);

        // tab
        const tab = scene.add.image(1063.25, 180, "ui-2014", "2014/namecardInventoryTabOpen");
        tab.setOrigin(0.09, 0.5);
        this.add(tab);

        // scroll
        const scroll = scene.add.image(1012.3875, 319.275, "ui-2014", "2014/inventoryScroll");
        this.add(scroll);

        // backButton
        const backButton = scene.add.image(1012.5, 55.0125, "ui-2014", "2014/inventoryBackButton0001");
        this.add(backButton);

        // nextButton
        const nextButton = scene.add.image(1012.5, 583.7625, "ui-2014", "2014/inventoryNextButton0001");
        this.add(nextButton);

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

        // sortButton
        const sortButton = scene.add.image(767.25, 675, "ui-2014", "2014/inventorySortButton0001");
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

        // sortHeadButton
        const sortHeadButton = scene.add.image(767.25, 17.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortHeadButton);

        // sortHeadLabel
        const sortHeadLabel = new TextBox(scene, 635.29, -1.8, "BurbankSmallMedium");
        sortHeadLabel.tintFill = true;
        sortHeadLabel.tintTopLeft = 0;
        sortHeadLabel.tintTopRight = 0;
        sortHeadLabel.tintBottomLeft = 0;
        sortHeadLabel.tintBottomRight = 0;
        sortHeadLabel.text = "Head";
        sortHeadLabel.fontSize = -24.75;
        sortHeadLabel.align = 1;
        sortHeadLabel.maxWidth = 264.0375;
        this.add(sortHeadLabel);

        // sortFaceButton
        const sortFaceButton = scene.add.image(767.25, 89.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortFaceButton);

        // sortFaceLabel
        const sortFaceLabel = new TextBox(scene, 635.29, 70.2, "BurbankSmallMedium");
        sortFaceLabel.tintFill = true;
        sortFaceLabel.tintTopLeft = 0;
        sortFaceLabel.tintTopRight = 0;
        sortFaceLabel.tintBottomLeft = 0;
        sortFaceLabel.tintBottomRight = 0;
        sortFaceLabel.text = "Face";
        sortFaceLabel.fontSize = -24.75;
        sortFaceLabel.align = 1;
        sortFaceLabel.maxWidth = 264.0375;
        this.add(sortFaceLabel);

        // sortNeckButton
        const sortNeckButton = scene.add.image(767.25, 161.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortNeckButton);

        // sortNeckLabel
        const sortNeckLabel = new TextBox(scene, 635.29, 142.2, "BurbankSmallMedium");
        sortNeckLabel.tintFill = true;
        sortNeckLabel.tintTopLeft = 0;
        sortNeckLabel.tintTopRight = 0;
        sortNeckLabel.tintBottomLeft = 0;
        sortNeckLabel.tintBottomRight = 0;
        sortNeckLabel.text = "Neck";
        sortNeckLabel.fontSize = -24.75;
        sortNeckLabel.align = 1;
        sortNeckLabel.maxWidth = 264.0375;
        this.add(sortNeckLabel);

        // sortBodyButton
        const sortBodyButton = scene.add.image(767.25, 233.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortBodyButton);

        // sortBodyLabel
        const sortBodyLabel = new TextBox(scene, 635.29, 214.2, "BurbankSmallMedium");
        sortBodyLabel.tintFill = true;
        sortBodyLabel.tintTopLeft = 0;
        sortBodyLabel.tintTopRight = 0;
        sortBodyLabel.tintBottomLeft = 0;
        sortBodyLabel.tintBottomRight = 0;
        sortBodyLabel.text = "Body";
        sortBodyLabel.fontSize = -24.75;
        sortBodyLabel.align = 1;
        sortBodyLabel.maxWidth = 264.0375;
        this.add(sortBodyLabel);

        // sortHandButton
        const sortHandButton = scene.add.image(767.25, 305.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortHandButton);

        // sortHandLabel
        const sortHandLabel = new TextBox(scene, 635.29, 286.2, "BurbankSmallMedium");
        sortHandLabel.tintFill = true;
        sortHandLabel.tintTopLeft = 0;
        sortHandLabel.tintTopRight = 0;
        sortHandLabel.tintBottomLeft = 0;
        sortHandLabel.tintBottomRight = 0;
        sortHandLabel.text = "Hand";
        sortHandLabel.fontSize = -24.75;
        sortHandLabel.align = 1;
        sortHandLabel.maxWidth = 264.0375;
        this.add(sortHandLabel);

        // sortFeetButton
        const sortFeetButton = scene.add.image(767.25, 377.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortFeetButton);

        // sortFeetLabel
        const sortFeetLabel = new TextBox(scene, 635.29, 358.2, "BurbankSmallMedium");
        sortFeetLabel.tintFill = true;
        sortFeetLabel.tintTopLeft = 0;
        sortFeetLabel.tintTopRight = 0;
        sortFeetLabel.tintBottomLeft = 0;
        sortFeetLabel.tintBottomRight = 0;
        sortFeetLabel.text = "Feet";
        sortFeetLabel.fontSize = -24.75;
        sortFeetLabel.align = 1;
        sortFeetLabel.maxWidth = 264.0375;
        this.add(sortFeetLabel);

        // sortColorButton
        const sortColorButton = scene.add.image(767.25, 449.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortColorButton);

        // sortColorLabel
        const sortColorLabel = new TextBox(scene, 635.29, 430.2, "BurbankSmallMedium");
        sortColorLabel.tintFill = true;
        sortColorLabel.tintTopLeft = 0;
        sortColorLabel.tintTopRight = 0;
        sortColorLabel.tintBottomLeft = 0;
        sortColorLabel.tintBottomRight = 0;
        sortColorLabel.text = "Color";
        sortColorLabel.fontSize = -24.75;
        sortColorLabel.align = 1;
        sortColorLabel.maxWidth = 264.0375;
        this.add(sortColorLabel);

        // sortOtherButton
        const sortOtherButton = scene.add.image(767.25, 526.16, "ui-2014", "2014/inventoryOtherButton0001");
        this.add(sortOtherButton);

        // sortOtherLabel
        const sortOtherLabel = new TextBox(scene, 635.29, 506.7, "BurbankSmallMedium");
        sortOtherLabel.tintFill = true;
        sortOtherLabel.tintTopLeft = 0;
        sortOtherLabel.tintTopRight = 0;
        sortOtherLabel.tintBottomLeft = 0;
        sortOtherLabel.tintBottomRight = 0;
        sortOtherLabel.text = "Other";
        sortOtherLabel.fontSize = -24.75;
        sortOtherLabel.align = 1;
        sortOtherLabel.maxWidth = 264.0375;
        this.add(sortOtherLabel);

        // sortAllButton
        const sortAllButton = scene.add.image(767.25, 598.16, "ui-2014", "2014/inventoryButton0001");
        this.add(sortAllButton);

        // sortAllLabel
        const sortAllLabel = new TextBox(scene, 635.29, 578.7, "BurbankSmallMedium");
        sortAllLabel.tintFill = true;
        sortAllLabel.tintTopLeft = 0;
        sortAllLabel.tintTopRight = 0;
        sortAllLabel.tintBottomLeft = 0;
        sortAllLabel.tintBottomRight = 0;
        sortAllLabel.text = "All";
        sortAllLabel.fontSize = -24.75;
        sortAllLabel.align = 1;
        sortAllLabel.maxWidth = 264.0375;
        this.add(sortAllLabel);

        // sortFlagsButton
        const sortFlagsButton = scene.add.image(1064.25, 449.66, "ui-2014", "2014/inventoryButton0001");
        this.add(sortFlagsButton);

        // sortFlagsLabel
        const sortFlagsLabel = new TextBox(scene, 932.29, 430.2, "BurbankSmallMedium");
        sortFlagsLabel.tintFill = true;
        sortFlagsLabel.tintTopLeft = 0;
        sortFlagsLabel.tintTopRight = 0;
        sortFlagsLabel.tintBottomLeft = 0;
        sortFlagsLabel.tintBottomRight = 0;
        sortFlagsLabel.text = "Pins/Flags";
        sortFlagsLabel.fontSize = -24.75;
        sortFlagsLabel.align = 1;
        sortFlagsLabel.maxWidth = 264.0375;
        this.add(sortFlagsLabel);

        // sortAwardsButton
        const sortAwardsButton = scene.add.image(1064.25, 526.16, "ui-2014", "2014/inventoryButton0001");
        this.add(sortAwardsButton);

        // sortAwardsLabel
        const sortAwardsLabel = new TextBox(scene, 932.29, 506.7, "BurbankSmallMedium");
        sortAwardsLabel.tintFill = true;
        sortAwardsLabel.tintTopLeft = 0;
        sortAwardsLabel.tintTopRight = 0;
        sortAwardsLabel.tintBottomLeft = 0;
        sortAwardsLabel.tintBottomRight = 0;
        sortAwardsLabel.text = "Awards";
        sortAwardsLabel.fontSize = -24.75;
        sortAwardsLabel.align = 1;
        sortAwardsLabel.maxWidth = 264.0375;
        this.add(sortAwardsLabel);

        // sortPhotosButton
        const sortPhotosButton = scene.add.image(1064.25, 598.16, "ui-2014", "2014/inventoryButton0001");
        this.add(sortPhotosButton);

        // sortPhotosLabel
        const sortPhotosLabel = new TextBox(scene, 932.29, 578.7, "BurbankSmallMedium");
        sortPhotosLabel.tintFill = true;
        sortPhotosLabel.tintTopLeft = 0;
        sortPhotosLabel.tintTopRight = 0;
        sortPhotosLabel.tintBottomLeft = 0;
        sortPhotosLabel.tintBottomRight = 0;
        sortPhotosLabel.text = "Backgrounds";
        sortPhotosLabel.fontSize = -24.75;
        sortPhotosLabel.align = 1;
        sortPhotosLabel.maxWidth = 264.0375;
        this.add(sortPhotosLabel);

        // lists
        const items = [item0, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11];
        const categories = [sortAllButton, sortOtherButton, sortColorButton, sortFeetButton, sortHandButton, sortBodyButton, sortNeckButton, sortFaceButton, sortHeadButton, sortAllLabel, sortOtherLabel, sortColorLabel, sortFeetLabel, sortHandLabel, sortBodyLabel, sortNeckLabel, sortFaceLabel, sortHeadLabel];
        const moreCategories = [sortPhotosButton, sortAwardsButton, sortFlagsButton, sortPhotosLabel, sortAwardsLabel, sortFlagsLabel];

        // bg (components)
        new InputBlocker(bg);

        // tab (components)
        const tabButtonComponent = new ButtonComponent(tab);
        tabButtonComponent.handCursor = true;
        tabButtonComponent.pixelPerfect = true;

        // backButton (components)
        const backButtonButtonComponent = new ButtonComponent(backButton);
        backButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryBackButton0001"};
        backButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryBackButton0002"};
        backButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryBackButton0003"};
        backButtonButtonComponent.handCursor = true;
        backButtonButtonComponent.pixelPerfect = true;

        // nextButton (components)
        const nextButtonButtonComponent = new ButtonComponent(nextButton);
        nextButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryNextButton0001"};
        nextButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryNextButton0002"};
        nextButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryNextButton0003"};
        nextButtonButtonComponent.handCursor = true;
        nextButtonButtonComponent.pixelPerfect = true;

        // sortButton (components)
        const sortButtonButtonComponent = new ButtonComponent(sortButton);
        sortButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventorySortButton0001"};
        sortButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventorySortButton0002"};
        sortButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventorySortButton0002"};
        sortButtonButtonComponent.handCursor = true;
        sortButtonButtonComponent.pixelPerfect = true;

        // sortText (prefab fields)
        sortText.boxWidth = 259.0875;
        sortText.boxHeight = 41.4;
        sortText.horizontalAlign = 1;
        sortText.verticalAlign = 1;

        // sortHeadButton (components)
        const sortHeadButtonButtonComponent = new ButtonComponent(sortHeadButton);
        sortHeadButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortHeadButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortHeadButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortHeadButtonButtonComponent.handCursor = true;
        sortHeadButtonButtonComponent.pixelPerfect = true;

        // sortHeadLabel (prefab fields)
        sortHeadLabel.boxWidth = 264.0375;
        sortHeadLabel.boxHeight = 41.4;
        sortHeadLabel.horizontalAlign = 1;
        sortHeadLabel.verticalAlign = 1;

        // sortFaceButton (components)
        const sortFaceButtonButtonComponent = new ButtonComponent(sortFaceButton);
        sortFaceButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortFaceButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortFaceButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortFaceButtonButtonComponent.handCursor = true;
        sortFaceButtonButtonComponent.pixelPerfect = true;

        // sortFaceLabel (prefab fields)
        sortFaceLabel.boxWidth = 264.0375;
        sortFaceLabel.boxHeight = 41.4;
        sortFaceLabel.horizontalAlign = 1;
        sortFaceLabel.verticalAlign = 1;

        // sortNeckButton (components)
        const sortNeckButtonButtonComponent = new ButtonComponent(sortNeckButton);
        sortNeckButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortNeckButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortNeckButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortNeckButtonButtonComponent.handCursor = true;
        sortNeckButtonButtonComponent.pixelPerfect = true;

        // sortNeckLabel (prefab fields)
        sortNeckLabel.boxWidth = 264.0375;
        sortNeckLabel.boxHeight = 41.4;
        sortNeckLabel.horizontalAlign = 1;
        sortNeckLabel.verticalAlign = 1;

        // sortBodyButton (components)
        const sortBodyButtonButtonComponent = new ButtonComponent(sortBodyButton);
        sortBodyButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortBodyButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortBodyButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortBodyButtonButtonComponent.handCursor = true;
        sortBodyButtonButtonComponent.pixelPerfect = true;

        // sortBodyLabel (prefab fields)
        sortBodyLabel.boxWidth = 264.0375;
        sortBodyLabel.boxHeight = 41.4;
        sortBodyLabel.horizontalAlign = 1;
        sortBodyLabel.verticalAlign = 1;

        // sortHandButton (components)
        const sortHandButtonButtonComponent = new ButtonComponent(sortHandButton);
        sortHandButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortHandButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortHandButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortHandButtonButtonComponent.handCursor = true;
        sortHandButtonButtonComponent.pixelPerfect = true;

        // sortHandLabel (prefab fields)
        sortHandLabel.boxWidth = 264.0375;
        sortHandLabel.boxHeight = 41.4;
        sortHandLabel.horizontalAlign = 1;
        sortHandLabel.verticalAlign = 1;

        // sortFeetButton (components)
        const sortFeetButtonButtonComponent = new ButtonComponent(sortFeetButton);
        sortFeetButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortFeetButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortFeetButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortFeetButtonButtonComponent.handCursor = true;
        sortFeetButtonButtonComponent.pixelPerfect = true;

        // sortFeetLabel (prefab fields)
        sortFeetLabel.boxWidth = 264.0375;
        sortFeetLabel.boxHeight = 41.4;
        sortFeetLabel.horizontalAlign = 1;
        sortFeetLabel.verticalAlign = 1;

        // sortColorButton (components)
        const sortColorButtonButtonComponent = new ButtonComponent(sortColorButton);
        sortColorButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortColorButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortColorButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortColorButtonButtonComponent.handCursor = true;
        sortColorButtonButtonComponent.pixelPerfect = true;

        // sortColorLabel (prefab fields)
        sortColorLabel.boxWidth = 264.0375;
        sortColorLabel.boxHeight = 41.4;
        sortColorLabel.horizontalAlign = 1;
        sortColorLabel.verticalAlign = 1;

        // sortOtherButton (components)
        const sortOtherButtonButtonComponent = new ButtonComponent(sortOtherButton);
        sortOtherButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryOtherButton0001"};
        sortOtherButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryOtherButton0002"};
        sortOtherButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryOtherButton0002"};
        sortOtherButtonButtonComponent.handCursor = true;
        sortOtherButtonButtonComponent.pixelPerfect = true;

        // sortOtherLabel (prefab fields)
        sortOtherLabel.boxWidth = 264.0375;
        sortOtherLabel.boxHeight = 41.4;
        sortOtherLabel.horizontalAlign = 1;
        sortOtherLabel.verticalAlign = 1;

        // sortAllButton (components)
        const sortAllButtonButtonComponent = new ButtonComponent(sortAllButton);
        sortAllButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortAllButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortAllButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortAllButtonButtonComponent.handCursor = true;
        sortAllButtonButtonComponent.pixelPerfect = true;

        // sortAllLabel (prefab fields)
        sortAllLabel.boxWidth = 264.0375;
        sortAllLabel.boxHeight = 41.4;
        sortAllLabel.horizontalAlign = 1;
        sortAllLabel.verticalAlign = 1;

        // sortFlagsButton (components)
        const sortFlagsButtonButtonComponent = new ButtonComponent(sortFlagsButton);
        sortFlagsButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortFlagsButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortFlagsButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortFlagsButtonButtonComponent.handCursor = true;
        sortFlagsButtonButtonComponent.pixelPerfect = true;

        // sortFlagsLabel (prefab fields)
        sortFlagsLabel.boxWidth = 264.0375;
        sortFlagsLabel.boxHeight = 41.4;
        sortFlagsLabel.horizontalAlign = 1;
        sortFlagsLabel.verticalAlign = 1;

        // sortAwardsButton (components)
        const sortAwardsButtonButtonComponent = new ButtonComponent(sortAwardsButton);
        sortAwardsButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortAwardsButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortAwardsButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortAwardsButtonButtonComponent.handCursor = true;
        sortAwardsButtonButtonComponent.pixelPerfect = true;

        // sortAwardsLabel (prefab fields)
        sortAwardsLabel.boxWidth = 264.0375;
        sortAwardsLabel.boxHeight = 41.4;
        sortAwardsLabel.horizontalAlign = 1;
        sortAwardsLabel.verticalAlign = 1;

        // sortPhotosButton (components)
        const sortPhotosButtonButtonComponent = new ButtonComponent(sortPhotosButton);
        sortPhotosButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/inventoryButton0001"};
        sortPhotosButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortPhotosButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/inventoryButton0002"};
        sortPhotosButtonButtonComponent.handCursor = true;
        sortPhotosButtonButtonComponent.pixelPerfect = true;

        // sortPhotosLabel (prefab fields)
        sortPhotosLabel.boxWidth = 264.0375;
        sortPhotosLabel.boxHeight = 41.4;
        sortPhotosLabel.horizontalAlign = 1;
        sortPhotosLabel.verticalAlign = 1;

        this.tab = tab;
        this.backButton = backButton;
        this.nextButton = nextButton;
        this.sortButton = sortButton;
        this.sortText = sortText;
        this.sortHeadButton = sortHeadButton;
        this.sortHeadLabel = sortHeadLabel;
        this.sortFaceButton = sortFaceButton;
        this.sortFaceLabel = sortFaceLabel;
        this.sortNeckButton = sortNeckButton;
        this.sortNeckLabel = sortNeckLabel;
        this.sortBodyButton = sortBodyButton;
        this.sortBodyLabel = sortBodyLabel;
        this.sortHandButton = sortHandButton;
        this.sortHandLabel = sortHandLabel;
        this.sortFeetButton = sortFeetButton;
        this.sortFeetLabel = sortFeetLabel;
        this.sortColorButton = sortColorButton;
        this.sortColorLabel = sortColorLabel;
        this.sortOtherButton = sortOtherButton;
        this.sortOtherLabel = sortOtherLabel;
        this.sortAllButton = sortAllButton;
        this.sortAllLabel = sortAllLabel;
        this.sortFlagsButton = sortFlagsButton;
        this.sortFlagsLabel = sortFlagsLabel;
        this.sortAwardsButton = sortAwardsButton;
        this.sortAwardsLabel = sortAwardsLabel;
        this.sortPhotosButton = sortPhotosButton;
        this.sortPhotosLabel = sortPhotosLabel;
        this.items = items;
        this.categories = categories;
        this.moreCategories = moreCategories;

        /* START-USER-CTR-CODE */

        this.backButton.on('release', () => {
            this.showPage(this.currentPage - 1);
        });

        this.nextButton.on('release', () => {
            this.showPage(this.currentPage + 1);
        });

        this.sortButton.on('release', () => {
            if (this.showingCategories) this.hideCategories();
            else this.showCategories();
        });

        this.sortHeadButton.on('release', () => {
            this.setCategory(InventorySort.HEAD)
            this.hideCategories();
        });
        this.sortFaceButton.on('release', () => {
            this.setCategory(InventorySort.FACE)
            this.hideCategories();
        });
        this.sortNeckButton.on('release', () => {
            this.setCategory(InventorySort.NECK)
            this.hideCategories();
        });
        this.sortBodyButton.on('release', () => {
            this.setCategory(InventorySort.BODY)
            this.hideCategories();
        });
        this.sortHandButton.on('release', () => {
            this.setCategory(InventorySort.HAND)
            this.hideCategories();
        });
        this.sortFeetButton.on('release', () => {
            this.setCategory(InventorySort.FEET)
            this.hideCategories();
        });
        this.sortColorButton.on('release', () => {
            this.setCategory(InventorySort.COLOR)
            this.hideCategories();
        });
        this.sortOtherButton.on('release', () => {
            this.setCategory(InventorySort.ALL_OTHER)
            this.hideCategories();
        });
        this.sortOtherButton.on('over', () => {
            this.showMoreCategories();
        });
        this.sortAllButton.on('release', () => {
            this.setCategory(InventorySort.ALL_ITEMS)
            this.hideCategories();
        });
        this.sortFlagsButton.on('release', () => {
            this.setCategory(InventorySort.FLAG)
            this.hideCategories();
        });
        this.sortAwardsButton.on('release', () => {
            this.setCategory(InventorySort.OTHER)
            this.hideCategories();
        });
        this.sortPhotosButton.on('release', () => {
            this.setCategory(InventorySort.PHOTO)
            this.hideCategories();
        });

        /* END-USER-CTR-CODE */
    }

    public tab: Phaser.GameObjects.Image;
    public backButton: Phaser.GameObjects.Image;
    public nextButton: Phaser.GameObjects.Image;
    public sortButton: Phaser.GameObjects.Image;
    public sortText: TextBox;
    public sortHeadButton: Phaser.GameObjects.Image;
    public sortHeadLabel: TextBox;
    public sortFaceButton: Phaser.GameObjects.Image;
    public sortFaceLabel: TextBox;
    public sortNeckButton: Phaser.GameObjects.Image;
    public sortNeckLabel: TextBox;
    public sortBodyButton: Phaser.GameObjects.Image;
    public sortBodyLabel: TextBox;
    public sortHandButton: Phaser.GameObjects.Image;
    public sortHandLabel: TextBox;
    public sortFeetButton: Phaser.GameObjects.Image;
    public sortFeetLabel: TextBox;
    public sortColorButton: Phaser.GameObjects.Image;
    public sortColorLabel: TextBox;
    public sortOtherButton: Phaser.GameObjects.Image;
    public sortOtherLabel: TextBox;
    public sortAllButton: Phaser.GameObjects.Image;
    public sortAllLabel: TextBox;
    public sortFlagsButton: Phaser.GameObjects.Image;
    public sortFlagsLabel: TextBox;
    public sortAwardsButton: Phaser.GameObjects.Image;
    public sortAwardsLabel: TextBox;
    public sortPhotosButton: Phaser.GameObjects.Image;
    public sortPhotosLabel: TextBox;
    public items: InventoryItem[];
    public categories: Array<Phaser.GameObjects.Image|TextBox>;
    public moreCategories: Array<Phaser.GameObjects.Image|TextBox>;

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

        this.hideCategories();

        this.scene.game.locale.immediate(locale => {
            this.sortColorLabel.text = locale.localize('colour_items');
            this.sortHeadLabel.text = locale.localize('head_items');
            this.sortFaceLabel.text = locale.localize('face_items');
            this.sortNeckLabel.text = locale.localize('neck_items');
            this.sortBodyLabel.text = locale.localize('body_items');
            this.sortHandLabel.text = locale.localize('hand_items');
            this.sortFeetLabel.text = locale.localize('feet_items');
            this.sortOtherLabel.text = locale.localize('other_items');
            this.sortAllLabel.text = locale.localize('all_items');
            this.sortFlagsLabel.text = locale.localize('flag_items');
            this.sortPhotosLabel.text = locale.localize('photo_items');
            this.sortAwardsLabel.text = locale.localize('award_items');
        });
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

    get showingCategories(): boolean {
            return this.categories[0].visible;
    }

    showCategories(): void {
        this.categories.forEach(cat => cat.visible = true);
        this.moreCategories.forEach(cat => cat.visible = false);
    }

    get showingMoreCategories(): boolean {
        return this.moreCategories[0].visible;
    }

    showMoreCategories(): void {
        this.categories.forEach(cat => cat.visible = true);
        this.moreCategories.forEach(cat => cat.visible = true);
    }

    hideCategories(): void {
        this.categories.forEach(cat => cat.visible = false);
        this.moreCategories.forEach(cat => cat.visible = false);
    }

    hideMoreCategories(): void {
        this.moreCategories.forEach(cat => cat.visible = false);
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

        let engine = this.scene.engine;
        if (engine) engine.cleaner.collect();

        this.currentPage = page;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
