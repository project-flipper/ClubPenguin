
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../lib/components/InputBlocker";
import ButtonComponent from "../../lib/components/ButtonComponent";
import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import { WorldData } from "@clubpenguin/net/types/world";
import WorldTile from "../prefabs/WorldTile";
import { Locale } from "@clubpenguin/app/locale";
import Login from "../Login";
/* END-USER-IMPORTS */

export default class MoreServers extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // rectangle_1
        const rectangle_1 = scene.add.rectangle(0, 0, 1710, 1080);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.alpha = 0.0001;
        rectangle_1.isFilled = true;
        this.add(rectangle_1);

        // login_screen_moreserversbg
        const login_screen_moreserversbg = scene.add.image(121.5, 40.5, "login", "login-screen/moreserversbg");
        login_screen_moreserversbg.setOrigin(0, 0);
        this.add(login_screen_moreserversbg);

        // close
        const close = scene.add.image(1550.25, 108.11, "login", "login-screen/moreserversclose0001");
        this.add(close);

        // login_screen_moreserversscroll
        const login_screen_moreserversscroll = scene.add.image(1448.21, 214.31, "login", "login-screen/moreserversscroll");
        login_screen_moreserversscroll.setOrigin(0, 0);
        this.add(login_screen_moreserversscroll);

        // up
        const up = scene.add.image(1476, 211.73, "login", "login-screen/moreserversup0001");
        this.add(up);

        // down
        const down = scene.add.image(1476, 963.45, "login", "login-screen/moreserversdown0001");
        this.add(down);

        // worlds
        const worlds = scene.add.container(240.75, 180);
        this.add(worlds);

        // serversLabel
        const serversLabel = new TextBox(scene, 208.24, 92.25, "CCComiccrazy-BoldItalicShadow");
        serversLabel.setOrigin(0, 0);
        serversLabel.text = "PLEASE SELECT A SERVER";
        serversLabel.fontSize = 45;
        serversLabel.align = 1;
        this.add(serversLabel);

        // rectangle_1 (components)
        new InputBlocker(rectangle_1);

        // close (components)
        const closeButtonComponent = new ButtonComponent(close);
        closeButtonComponent.upTexture = {"key":"login","frame":"login-screen/moreserversclose0001"};
        closeButtonComponent.overTexture = {"key":"login","frame":"login-screen/moreserversclose0002"};
        closeButtonComponent.downTexture = {"key":"login","frame":"login-screen/moreserversclose0003"};
        closeButtonComponent.handCursor = true;
        closeButtonComponent.pixelPerfect = true;

        // up (components)
        const upButtonComponent = new ButtonComponent(up);
        upButtonComponent.upTexture = {"key":"login","frame":"login-screen/moreserversup0001"};
        upButtonComponent.overTexture = {"key":"login","frame":"login-screen/moreserversup0002"};
        upButtonComponent.downTexture = {"key":"login","frame":"login-screen/moreserversup0003"};
        upButtonComponent.handCursor = true;
        upButtonComponent.pixelPerfect = true;

        // down (components)
        const downButtonComponent = new ButtonComponent(down);
        downButtonComponent.upTexture = {"key":"login","frame":"login-screen/moreserversdown0001"};
        downButtonComponent.overTexture = {"key":"login","frame":"login-screen/moreserversdown0002"};
        downButtonComponent.downTexture = {"key":"login","frame":"login-screen/moreserversdown0003"};
        downButtonComponent.handCursor = true;
        downButtonComponent.pixelPerfect = true;

        // serversLabel (prefab fields)
        serversLabel.boxWidth = 1293.525;
        serversLabel.boxHeight = 66.6;
        serversLabel.horizontalAlign = 1;
        serversLabel.verticalAlign = 1;

        this.close = close;
        this.up = up;
        this.down = down;
        this.worlds = worlds;
        this.serversLabel = serversLabel;

        /* START-USER-CTR-CODE */

        this.close.on('release', () => {
            this.visible = false;
            this.scene.worldSelect.visible = true;
        });
        this.up.on('release', () => this.showPage(this.currentPage - 1));
        this.down.on('release', () => this.showPage(this.currentPage + 1));

        /* END-USER-CTR-CODE */
    }

    public close: Phaser.GameObjects.Image;
    public up: Phaser.GameObjects.Image;
    public down: Phaser.GameObjects.Image;
    public worlds: Phaser.GameObjects.Container;
    public serversLabel: TextBox;

    /* START-USER-CODE */

    declare scene: Login;

    worldData: WorldData[];
    currentPage = 0;
    rowsPerPage = 10;
    columnsPerPage = 2;
    pages: WorldData[][][];

    setup(data: WorldData[]): void {
        this.worldData = data.sort((a, b) => a.name.localeCompare(b.name));
        this.pages = this.computePages();
        this.showPage(0);
    }

    computePages(): WorldData[][][] {
        let paginatedData: WorldData[][][] = [];
        let totalPages = Math.ceil(this.worldData.length / (this.rowsPerPage * this.columnsPerPage));

        for (let page = 0; page < totalPages; page++) {
            let startIndex = page * this.rowsPerPage * this.columnsPerPage;
            let endIndex = startIndex + this.rowsPerPage * this.columnsPerPage;

            let pageData: WorldData[][] = [];
            for (let i = startIndex; i < endIndex; i += this.columnsPerPage) {
                let row = this.worldData.slice(i, i + this.columnsPerPage);
                pageData.push(row);
            }

            paginatedData.push(pageData);
        }

        return paginatedData;
    }

    showPage(page: number): void {
        this.currentPage = Math.max(Math.min(page, this.pages.length - 1), 0);
        let pageData = this.pages[this.currentPage];

        this.worlds.removeAll(true);

        let y = 0;
        for (let row of pageData) {
            let x = 0;

            for (let world of row) {
                let tile = new WorldTile(this.scene, x, y);
                tile.scale = 0.662167021;
                tile.setup(world);
                this.worlds.add(tile);

                x += 595.8;
            }

            y += 69.975;
        }
    }

    localize(locale: Locale): void {
        this.serversLabel.text = locale.localize('Please Select a Server').toUpperCase();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
