
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../lib/components/ButtonComponent";
import Paperdoll from "../../lib/ui/Paperdoll";
import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Login, { SavedAccount } from "../Login";
/* END-USER-IMPORTS */

export default class PlayerItem extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // button
        const button = scene.add.image(-225, -272.25, "login", "login-screen/itemback0001");
        button.setOrigin(0, 0);
        this.add(button);

        // paperdoll
        const paperdoll = new Paperdoll(scene, 0.11, 0.34);
        this.add(paperdoll);

        // playername
        const playername = new TextBox(scene, -213.75, 264.38, "CCComiccrazy-BoldItalicShadow");
        playername.text = "BASIL";
        playername.fontSize = 49.5;
        playername.dropShadowX = 0;
        playername.dropShadowY = 0;
        playername.dropShadowAlpha = 1;
        playername.dropShadowColor = 13158;
        this.add(playername);

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.upTexture = {"key":"login","frame":"login-screen/itemback0001"};
        buttonButtonComponent.overTexture = {"key":"login","frame":"login-screen/itemback0002"};
        buttonButtonComponent.handCursor = true;
        buttonButtonComponent.pixelPerfect = true;

        // paperdoll (prefab fields)
        paperdoll.interactive = false;
        paperdoll.showBackground = false;
        paperdoll.showPin = false;

        // playername (prefab fields)
        playername.boxWidth = 427.5;
        playername.boxHeight = 70.3125;
        playername.horizontalAlign = 1;
        playername.verticalAlign = 1;

        this.button = button;
        this.paperdoll = paperdoll;
        this.playername = playername;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public button: Phaser.GameObjects.Image;
    public paperdoll: Paperdoll;
    public playername: TextBox;

    /* START-USER-CODE */

    declare scene: Login;

    setup(account: SavedAccount, goesBackToGallery = false): void {
        this.playername.text = account.user.username;
        this.paperdoll.setup(account.user.avatar, account.user.id);
        this.button.off('release');
        this.button.on('release', () => goesBackToGallery ? this.scene.showPlayerSelection(this.scene.getSavedAccounts()) : this.scene.showExistingPlayer(account));
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
