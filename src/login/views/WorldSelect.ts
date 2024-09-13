
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../../lib/ui/components/ButtonComponent";
import TextBox from "../../lib/ui/TextBox";
import WorldTile from "../prefabs/WorldTile";
/* START-USER-IMPORTS */
import { WorldData } from "@clubpenguin/net/types/world";
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class WorldSelect extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // more
        const more = scene.add.image(1336.3875, 608.7375000000001, "login", "login-screen/more0001");
        more.setOrigin(0.0379108635097493, 0.24303135888501742);
        this.add(more);

        // login_screen_buddies
        const login_screen_buddies = scene.add.image(217.575, 1004.7375, "login", "login-screen/buddies");
        login_screen_buddies.setOrigin(0, 0);
        this.add(login_screen_buddies);

        // login_screen_population
        const login_screen_population = scene.add.image(622.125, 1008.45, "login", "login-screen/population");
        login_screen_population.setOrigin(0, 0);
        this.add(login_screen_population);

        // login_screen_chat
        const login_screen_chat = scene.add.image(1138.6125, 1015.9875, "login", "login-screen/chat");
        login_screen_chat.setOrigin(0, 0);
        this.add(login_screen_chat);

        // items
        const items = scene.add.image(1482.6375, 44.4375, "login", "login-screen/items0001");
        items.setOrigin(0, 0);
        this.add(items);

        // serversLabel
        const serversLabel = new TextBox(scene, 208.2375, 67.5, "CCComiccrazy-BoldItalicShadow");
        serversLabel.setOrigin(0, 0);
        serversLabel.text = "Your Suggested Servers";
        serversLabel.fontSize = 45;
        serversLabel.align = 1;
        this.add(serversLabel);

        // buddiesLabel
        const buddiesLabel = new TextBox(scene, 262.4625, 998.775, "BurbankSmallMedium");
        buddiesLabel.text = "Buddies online";
        buddiesLabel.fontSize = -31.5;
        this.add(buddiesLabel);

        // populationLabel
        const populationLabel = new TextBox(scene, 656.2125, 1005.3, "BurbankSmallMedium");
        populationLabel.text = "Amount of penguins online";
        populationLabel.fontSize = -31.5;
        this.add(populationLabel);

        // safeChatLabel
        const safeChatLabel = new TextBox(scene, 1182.825, 1005.525, "BurbankSmallMedium");
        safeChatLabel.text = "Ultimate safe chat";
        safeChatLabel.fontSize = -31.5;
        this.add(safeChatLabel);

        // world5
        const world5 = new WorldTile(scene, 420.75, 663.75);
        this.add(world5);

        // world4
        const world4 = new WorldTile(scene, 420.75, 549);
        this.add(world4);

        // world3
        const world3 = new WorldTile(scene, 420.75, 434.25);
        this.add(world3);

        // world2
        const world2 = new WorldTile(scene, 420.75, 319.5);
        this.add(world2);

        // world1
        const world1 = new WorldTile(scene, 420.75, 204.75);
        this.add(world1);

        // lists
        const suggestedWorlds = [world1, world2, world3, world4, world5];

        // more (components)
        const moreButtonComponent = new ButtonComponent(more);
        moreButtonComponent.handCursor = true;
        moreButtonComponent.pixelPerfect = true;

        // items (components)
        const itemsButtonComponent = new ButtonComponent(items);
        itemsButtonComponent.handCursor = true;
        itemsButtonComponent.pixelPerfect = true;

        // serversLabel (prefab fields)
        serversLabel.boxWidth = 1293.525;
        serversLabel.boxHeight = 66.6;
        serversLabel.horizontalAlign = 1;
        serversLabel.verticalAlign = 1;

        // buddiesLabel (prefab fields)
        buddiesLabel.boxWidth = 273.0375;
        buddiesLabel.boxHeight = 47.25;
        buddiesLabel.verticalAlign = 1;

        // populationLabel (prefab fields)
        populationLabel.boxWidth = 452.925;
        populationLabel.boxHeight = 47.25;
        populationLabel.verticalAlign = 1;

        // safeChatLabel (prefab fields)
        safeChatLabel.boxWidth = 464.0625;
        safeChatLabel.boxHeight = 47.25;
        safeChatLabel.verticalAlign = 1;

        this.more = more;
        this.items = items;
        this.serversLabel = serversLabel;
        this.buddiesLabel = buddiesLabel;
        this.populationLabel = populationLabel;
        this.safeChatLabel = safeChatLabel;
        this.world5 = world5;
        this.world4 = world4;
        this.world3 = world3;
        this.world2 = world2;
        this.world1 = world1;
        this.suggestedWorlds = suggestedWorlds;

        /* START-USER-CTR-CODE */

        this.serversLabel.setOrigin(0);

        /* END-USER-CTR-CODE */
    }

    public more: Phaser.GameObjects.Image;
    public items: Phaser.GameObjects.Image;
    public serversLabel: TextBox;
    public buddiesLabel: TextBox;
    public populationLabel: TextBox;
    public safeChatLabel: TextBox;
    public world5: WorldTile;
    public world4: WorldTile;
    public world3: WorldTile;
    public world2: WorldTile;
    public world1: WorldTile;
    public suggestedWorlds: WorldTile[];

    /* START-USER-CODE */

    setup(data: WorldData[]): void {
        for (let i = 0; i < 5; i++) {
            let world = data[i];
            let tile = this.suggestedWorlds[i];

            if (!world) {
                tile.visible = false;
                continue;
            }

            tile.worldName.text = world.name;
            tile.buddy.visible = world.buddies;
            tile.safeChat.visible = world.safeChat;
            tile.setPopulation(world.population);
        }
    }

    localize(locale: Locale): void {
        this.serversLabel.text = locale.localize('Your Suggested Servers').toUpperCase();
        this.buddiesLabel.text = locale.localize('Buddies online');
        this.populationLabel.text = locale.localize('Amount of penguins online');
        this.safeChatLabel.text = locale.localize('Ultimate safe chat');
        this.more.setFrame(`login-screen/more${locale.frame}`);
        this.items.setFrame(`login-screen/items${locale.frame}`);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
