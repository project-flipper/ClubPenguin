
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../lib/components/ButtonComponent";
import TextBox from "../../lib/ui/TextBox";
import Paperdoll from "../../lib/ui/Paperdoll";
/* START-USER-IMPORTS */
import Login, { SavedAccount } from "../Login";
/* END-USER-IMPORTS */

export default class MiniPlayerItem extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // button
        const button = scene.add.image(-101.25, -177.75, "login", "login-screen/itemback40001");
        button.setOrigin(0, 0);
        this.add(button);

        // playername
        const playername = new TextBox(scene, 108, -94.5, "CCComiccrazy-BoldItalicShadow");
        playername.text = "BASIL";
        playername.fontSize = 49.5;
        playername.dropShadowX = 0;
        playername.dropShadowY = 0;
        playername.dropShadowAlpha = 1;
        playername.dropShadowColor = 13158;
        this.add(playername);

        // paperdoll
        const paperdoll = new Paperdoll(scene, -0.34, 0);
        this.add(paperdoll);

        // paperdollMask
        const paperdollMask = scene.add.image(-101.25, -177.75, "login", "login-screen/item4mask");
        paperdollMask.setOrigin(0, 0);
        paperdollMask.visible = false;
        this.add(paperdollMask);

        // button (components)
        const buttonButtonComponent = new ButtonComponent(button);
        buttonButtonComponent.upTexture = {"key":"login","frame":"login-screen/itemback40001"};
        buttonButtonComponent.overTexture = {"key":"login","frame":"login-screen/itemback40002"};
        buttonButtonComponent.handCursor = true;
        buttonButtonComponent.pixelPerfect = true;

        // playername (prefab fields)
        playername.boxWidth = 427.5;
        playername.boxHeight = 70.3125;
        playername.horizontalAlign = 1;
        playername.verticalAlign = 1;

        // paperdoll (prefab fields)
        paperdoll.showBackground = false;
        paperdoll.showPin = false;

        this.button = button;
        this.playername = playername;
        this.paperdoll = paperdoll;
        this.paperdollMask = paperdollMask;

        /* START-USER-CTR-CODE */

        this.paperdoll.mask = this.paperdollMask.createBitmapMask();

        /* END-USER-CTR-CODE */
    }

    public button: Phaser.GameObjects.Image;
    public playername: TextBox;
    public paperdoll: Paperdoll;
    public paperdollMask: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Login;

    setup(account: SavedAccount): void {
        this.playername.text = account.user.username;
        this.paperdoll.setup(account.user.avatar, account.user.id);
        this.button.off('release');
        this.button.on('release', () => this.scene.showExistingPlayer(account));
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
