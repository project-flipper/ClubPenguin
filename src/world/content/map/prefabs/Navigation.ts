
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TextBox from "../../../../lib/ui/TextBox";
import ButtonComponent from "../../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import MapScene, { MapCategory } from "../Map";
/* END-USER-IMPORTS */

export default class Navigation extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.image(-8, -8, "map", "map/navBase");
        bg.setOrigin(0, 0);
        this.add(bg);

        // gamesLabel
        const gamesLabel = new TextBox(scene, 30.6, 185.9625, "BurbankSmallBold");
        gamesLabel.tintFill = true;
        gamesLabel.tintTopLeft = 6710886;
        gamesLabel.tintTopRight = 6710886;
        gamesLabel.tintBottomLeft = 6710886;
        gamesLabel.tintBottomRight = 6710886;
        gamesLabel.text = "Games";
        gamesLabel.fontSize = -22.5;
        this.add(gamesLabel);

        // placesLabel
        const placesLabel = new TextBox(scene, 207.9, 185.9625, "BurbankSmallBold");
        placesLabel.tintFill = true;
        placesLabel.tintTopLeft = 6710886;
        placesLabel.tintTopRight = 6710886;
        placesLabel.tintBottomLeft = 6710886;
        placesLabel.tintBottomRight = 6710886;
        placesLabel.text = "Places";
        placesLabel.fontSize = -22.5;
        this.add(placesLabel);

        // shopLabel
        const shopLabel = new TextBox(scene, 380.25, 185.9625, "BurbankSmallBold");
        shopLabel.tintFill = true;
        shopLabel.tintTopLeft = 6710886;
        shopLabel.tintTopRight = 6710886;
        shopLabel.tintBottomLeft = 6710886;
        shopLabel.tintBottomRight = 6710886;
        shopLabel.text = "Shop";
        shopLabel.fontSize = -22.5;
        this.add(shopLabel);

        // petsLabel
        const petsLabel = new TextBox(scene, 550.0125, 185.9625, "BurbankSmallBold");
        petsLabel.tintFill = true;
        petsLabel.tintTopLeft = 6710886;
        petsLabel.tintTopRight = 6710886;
        petsLabel.tintBottomLeft = 6710886;
        petsLabel.tintBottomRight = 6710886;
        petsLabel.text = "Pets";
        petsLabel.fontSize = -22.5;
        this.add(petsLabel);

        // gamesButton
        const gamesButton = scene.add.image(42.975, 40.95, "map", "map/gamesButton0001");
        gamesButton.setOrigin(0, 0);
        this.add(gamesButton);

        // placesButton
        const placesButton = scene.add.image(215.6625, 40.95, "map", "map/placesButton0001");
        placesButton.setOrigin(0, 0);
        this.add(placesButton);

        // shopButton
        const shopButton = scene.add.image(388.35, 40.95, "map", "map/shopButton0001");
        shopButton.setOrigin(0, 0);
        this.add(shopButton);

        // petsButton
        const petsButton = scene.add.image(561.0375, 40.95, "map", "map/petsButton0001");
        petsButton.setOrigin(0, 0);
        this.add(petsButton);

        // puffleGames
        const puffleGames = scene.add.container(728.55, 2.025);
        puffleGames.visible = false;
        this.add(puffleGames);

        // map_puffleBase
        const map_puffleBase = scene.add.image(0, 0, "map", "map/puffleBase");
        map_puffleBase.setOrigin(0, 0);
        puffleGames.add(map_puffleBase);

        // map_puffleIcon
        const map_puffleIcon = scene.add.image(64.91253662109375, 66.48749685287476, "map", "map/puffleIcon");
        map_puffleIcon.setOrigin(0, 0);
        puffleGames.add(map_puffleIcon);

        // hide_btn
        const hide_btn = scene.add.image(275.73748779296875, 140.17499685287476, "map", "map/hide_button0001");
        hide_btn.setOrigin(0, 0);
        puffleGames.add(hide_btn);

        // petsHintLabel
        const petsHintLabel = new TextBox(scene, 241.98748779296875, 32.962499141693115, "BurbankSmallBold");
        petsHintLabel.tintFill = true;
        petsHintLabel.tintTopLeft = 3355443;
        petsHintLabel.tintTopRight = 3355443;
        petsHintLabel.tintBottomLeft = 3355443;
        petsHintLabel.tintBottomRight = 3355443;
        petsHintLabel.text = "Different colored puffles play different games.";
        petsHintLabel.fontSize = -22.5;
        puffleGames.add(petsHintLabel);

        // petsButtonLabel
        const petsButtonLabel = new TextBox(scene, 281.8125, 147.4500060081482, "BurbankSmallBold");
        petsButtonLabel.tintFill = true;
        petsButtonLabel.tintTopLeft = 18267;
        petsButtonLabel.tintTopRight = 18267;
        petsButtonLabel.tintBottomLeft = 18267;
        petsButtonLabel.tintBottomRight = 18267;
        petsButtonLabel.text = "Hide games";
        petsButtonLabel.fontSize = -22.5;
        puffleGames.add(petsButtonLabel);

        // gamesLabel (prefab fields)
        gamesLabel.boxWidth = 152.325;
        gamesLabel.boxHeight = 43.0875;
        gamesLabel.horizontalAlign = 1;
        gamesLabel.verticalAlign = 1;

        // placesLabel (prefab fields)
        placesLabel.boxWidth = 150.3;
        placesLabel.boxHeight = 43.0875;
        placesLabel.horizontalAlign = 1;
        placesLabel.verticalAlign = 1;

        // shopLabel (prefab fields)
        shopLabel.boxWidth = 148.95;
        shopLabel.boxHeight = 43.0875;
        shopLabel.horizontalAlign = 1;
        shopLabel.verticalAlign = 1;

        // petsLabel (prefab fields)
        petsLabel.boxWidth = 154.8;
        petsLabel.boxHeight = 43.0875;
        petsLabel.horizontalAlign = 1;
        petsLabel.verticalAlign = 1;

        // gamesButton (components)
        const gamesButtonButtonComponent = new ButtonComponent(gamesButton);
        gamesButtonButtonComponent.handCursor = true;
        gamesButtonButtonComponent.pixelPerfect = true;

        // placesButton (components)
        const placesButtonButtonComponent = new ButtonComponent(placesButton);
        placesButtonButtonComponent.handCursor = true;
        placesButtonButtonComponent.pixelPerfect = true;

        // shopButton (components)
        const shopButtonButtonComponent = new ButtonComponent(shopButton);
        shopButtonButtonComponent.handCursor = true;
        shopButtonButtonComponent.pixelPerfect = true;

        // petsButton (components)
        const petsButtonButtonComponent = new ButtonComponent(petsButton);
        petsButtonButtonComponent.handCursor = true;
        petsButtonButtonComponent.pixelPerfect = true;

        // hide_btn (components)
        const hide_btnButtonComponent = new ButtonComponent(hide_btn);
        hide_btnButtonComponent.upTexture = { "key": "map", "frame": "map/hide_button0001" };
        hide_btnButtonComponent.overTexture = { "key": "map", "frame": "map/hide_button0002" };
        hide_btnButtonComponent.downTexture = { "key": "map", "frame": "map/hide_button0003" };
        hide_btnButtonComponent.handCursor = true;
        hide_btnButtonComponent.pixelPerfect = true;

        // petsHintLabel (prefab fields)
        petsHintLabel.boxWidth = 324.225;
        petsHintLabel.boxHeight = 113.175;
        petsHintLabel.horizontalAlign = 1;
        petsHintLabel.verticalAlign = 1;

        // petsButtonLabel (prefab fields)
        petsButtonLabel.boxWidth = 238.6125;
        petsButtonLabel.boxHeight = 43.3125;
        petsButtonLabel.horizontalAlign = 1;
        petsButtonLabel.verticalAlign = 1;

        this.bg = bg;
        this.gamesLabel = gamesLabel;
        this.placesLabel = placesLabel;
        this.shopLabel = shopLabel;
        this.petsLabel = petsLabel;
        this.gamesButton = gamesButton;
        this.placesButton = placesButton;
        this.shopButton = shopButton;
        this.petsButton = petsButton;
        this.hide_btn = hide_btn;
        this.petsHintLabel = petsHintLabel;
        this.petsButtonLabel = petsButtonLabel;
        this.puffleGames = puffleGames;

        /* START-USER-CTR-CODE */

        this.gamesButton.on('over', () => this.gamesButton.setFrame(this.scene.category == MapCategory.GAMES ? 'map/gamesButton0004' : 'map/gamesButton0002'));
        this.gamesButton.on('out', () => this.gamesButton.setFrame(this.scene.category == MapCategory.GAMES ? 'map/gamesButton0003' : 'map/gamesButton0001'));
        this.gamesButton.on('release', () => this.toggleSelected(MapCategory.GAMES));

        this.placesButton.on('over', () => this.placesButton.setFrame(this.scene.category == MapCategory.PLACES ? 'map/placesButton0004' : 'map/placesButton0002'));
        this.placesButton.on('out', () => this.placesButton.setFrame(this.scene.category == MapCategory.PLACES ? 'map/placesButton0003' : 'map/placesButton0001'));
        this.placesButton.on('release', () => this.toggleSelected(MapCategory.PLACES));

        this.shopButton.on('over', () => this.shopButton.setFrame(this.scene.category == MapCategory.SHOP ? 'map/shopButton0004' : 'map/shopButton0002'));
        this.shopButton.on('out', () => this.shopButton.setFrame(this.scene.category == MapCategory.SHOP ? 'map/shopButton0003' : 'map/shopButton0001'));
        this.shopButton.on('release', () => this.toggleSelected(MapCategory.SHOP));

        this.petsButton.on('over', () => this.petsButton.setFrame(this.scene.category == MapCategory.PETS ? 'map/petsButton0004' : 'map/petsButton0002'));
        this.petsButton.on('out', () => this.petsButton.setFrame(this.scene.category == MapCategory.PETS ? 'map/petsButton0003' : 'map/petsButton0001'));
        this.petsButton.on('release', () => this.toggleSelected(MapCategory.PETS));

        this.hide_btn.on('release', () => this.toggleSelected(MapCategory.PET_GAMES));

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.Image;
    public gamesLabel: TextBox;
    public placesLabel: TextBox;
    public shopLabel: TextBox;
    public petsLabel: TextBox;
    public gamesButton: Phaser.GameObjects.Image;
    public placesButton: Phaser.GameObjects.Image;
    public shopButton: Phaser.GameObjects.Image;
    public petsButton: Phaser.GameObjects.Image;
    public hide_btn: Phaser.GameObjects.Image;
    public petsHintLabel: TextBox;
    public petsButtonLabel: TextBox;
    public puffleGames: Phaser.GameObjects.Container;

    /* START-USER-CODE */

    declare scene: MapScene;

    toggleSelected(category: MapCategory): void {
        switch (category) {
            case MapCategory.GAMES:
                if (this.scene.category == MapCategory.GAMES) {
                    this.scene.showCategory(MapCategory.NO_CATEGORY);
                    this.gamesButton.setFrame('map/gamesButton0001');
                } else {
                    this.scene.showCategory(MapCategory.GAMES);
                    this.gamesButton.setFrame('map/gamesButton0003');
                }
                this.placesButton.setFrame('map/placesButton0001');
                this.shopButton.setFrame('map/shopButton0001');
                this.petsButton.setFrame('map/petsButton0001');
                this.puffleGames.visible = false;
                break;
            case MapCategory.PLACES:
                if (this.scene.category == MapCategory.PLACES) {
                    this.scene.showCategory(MapCategory.NO_CATEGORY);
                    this.placesButton.setFrame('map/placesButton0001');
                } else {
                    this.scene.showCategory(MapCategory.PLACES);
                    this.placesButton.setFrame('map/placesButton0003');
                }
                this.gamesButton.setFrame('map/gamesButton0001');
                this.shopButton.setFrame('map/shopButton0001');
                this.petsButton.setFrame('map/petsButton0001');
                this.puffleGames.visible = false;
                break;
            case MapCategory.SHOP:
                if (this.scene.category == MapCategory.SHOP) {
                    this.scene.showCategory(MapCategory.NO_CATEGORY);
                    this.shopButton.setFrame('map/shopButton0001');
                } else {
                    this.scene.showCategory(MapCategory.SHOP);
                    this.shopButton.setFrame('map/shopButton0003');
                }
                this.gamesButton.setFrame('map/gamesButton0001');
                this.placesButton.setFrame('map/placesButton0001');
                this.petsButton.setFrame('map/petsButton0001');
                this.puffleGames.visible = false;
                break;
            case MapCategory.PETS:
                if (this.scene.category == MapCategory.PETS) {
                    this.puffleGames.visible = false;
                    this.scene.showCategory(MapCategory.NO_CATEGORY);
                    this.petsButton.setFrame('map/petsButton0001');
                } else {
                    this.puffleGames.visible = true;
                    this.scene.showCategory(MapCategory.PETS);
                    this.petsButton.setFrame('map/petsButton0003');
                }
                this.gamesButton.setFrame('map/gamesButton0001');
                this.placesButton.setFrame('map/placesButton0001');
                this.shopButton.setFrame('map/shopButton0001');
                break;
            case MapCategory.PET_GAMES:
                if (this.scene.category == MapCategory.PET_GAMES) {
                    this.scene.showCategory(MapCategory.PETS);
                    this.petsHintLabel.text = this.scene.game.locale.localize('w.map.walk.puffle');
                    this.petsButtonLabel.text = this.scene.game.locale.localize('w.map.show.games');
                } else {
                    this.scene.showCategory(MapCategory.PET_GAMES);
                    this.petsHintLabel.text = this.scene.game.locale.localize('w.map.puffle.play.games');
                    this.petsButtonLabel.text = this.scene.game.locale.localize('w.map.hide.games');
                }
                this.gamesButton.setFrame('map/gamesButton0001');
                this.placesButton.setFrame('map/placesButton0001');
                this.shopButton.setFrame('map/shopButton0001');
                this.petsButton.setFrame('map/petsButton0003');
                this.puffleGames.visible = true;
                break;
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
