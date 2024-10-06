
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../lib/ui/components/ButtonComponent";
import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Phaser from "phaser";

import Login from "@clubpenguin/login/Login";
import { WorldData } from "@clubpenguin/net/types/world";
/* END-USER-IMPORTS */

export default class WorldTile extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // tile
        const tile = scene.add.image(0, 0, "login", "login-screen/worldTile");
        tile.setOrigin(0, 0);
        this.add(tile);

        // safeChat
        const safeChat = scene.add.image(479.925, 23.4, "login", "login-screen/safeChat");
        safeChat.setOrigin(0, 0);
        this.add(safeChat);

        // population1
        const population1 = scene.add.image(556.0875, 15.8625, "login", "login-screen/populationOff");
        population1.setOrigin(-0.17657, -0.12228);
        this.add(population1);

        // population2
        const population2 = scene.add.image(609.3, 15.8625, "login", "login-screen/populationOff");
        population2.setOrigin(-0.17657, -0.12228);
        this.add(population2);

        // population3
        const population3 = scene.add.image(662.5125, 15.8625, "login", "login-screen/populationOff");
        population3.setOrigin(-0.17657, -0.12228);
        this.add(population3);

        // population4
        const population4 = scene.add.image(715.9499999999999, 15.8625, "login", "login-screen/populationOff");
        population4.setOrigin(-0.17657, -0.12228);
        this.add(population4);

        // population5
        const population5 = scene.add.image(769.05, 15.8625, "login", "login-screen/populationOff");
        population5.setOrigin(-0.17657, -0.12228);
        this.add(population5);

        // full
        const full = scene.add.image(536.2875, -6, "login", "login-screen/full0001");
        full.setOrigin(0, 0.00699);
        this.add(full);

        // worldName
        const worldName = new TextBox(scene, 97.98750000000003, 9.5625, "BurbankSmallMedium");
        worldName.text = "World";
        worldName.fontSize = -51.75;
        this.add(worldName);

        // buddy
        const buddy = scene.add.image(22.725, 20.5875, "login", "login-screen/buddy");
        buddy.setOrigin(0, 0);
        this.add(buddy);

        // tile (components)
        const tileButtonComponent = new ButtonComponent(tile);
        tileButtonComponent.upTexture = {"key":"login","frame":"login-screen/worldTile"};
        tileButtonComponent.overTexture = {"key":"login","frame":"login-screen/worldTileSelect"};
        tileButtonComponent.handCursor = true;
        tileButtonComponent.pixelPerfect = true;

        // worldName (prefab fields)
        worldName.boxWidth = 357.4125;
        worldName.boxHeight = 85.6125;
        worldName.verticalAlign = 1;

        this.tile = tile;
        this.safeChat = safeChat;
        this.population1 = population1;
        this.population2 = population2;
        this.population3 = population3;
        this.population4 = population4;
        this.population5 = population5;
        this.full = full;
        this.worldName = worldName;
        this.buddy = buddy;

        /* START-USER-CTR-CODE */

        this.tile.on('release', () => {
            (this.scene as Login).joinWorld(this.worldData);
        });

        /* END-USER-CTR-CODE */
    }

    public tile: Phaser.GameObjects.Image;
    public safeChat: Phaser.GameObjects.Image;
    public population1: Phaser.GameObjects.Image;
    public population2: Phaser.GameObjects.Image;
    public population3: Phaser.GameObjects.Image;
    public population4: Phaser.GameObjects.Image;
    public population5: Phaser.GameObjects.Image;
    public full: Phaser.GameObjects.Image;
    public worldName: TextBox;
    public buddy: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    public worldData: WorldData;

    setPopulation(value: number): void {
        let off = 'login-screen/populationOff';
        let on = 'login-screen/populationOn';

        this.population1.setFrame(value > 0 ? on : off);
        this.population2.setFrame(value > 1 ? on : off);
        this.population3.setFrame(value > 2 ? on : off);
        this.population4.setFrame(value > 3 ? on : off);
        this.population5.setFrame(value > 4 ? on : off);

        this.full.visible = value > 5 ? true : false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
