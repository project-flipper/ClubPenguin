
// You can write more code here

/* START OF COMPILED CODE */

import PlayerItem from "../prefabs/PlayerItem";
import MiniPlayerItem from "../prefabs/MiniPlayerItem";
import ButtonComponent from "../../lib/components/ButtonComponent";
import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Login, { SavedAccount } from "../Login";
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class PlayerSelection extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // gallery1
        const gallery1 = scene.add.container(0, 0);
        gallery1.visible = false;
        this.add(gallery1);

        // login_screen_itembg
        const login_screen_itembg = scene.add.image(580.5, 90, "login", "login-screen/itembg");
        login_screen_itembg.setOrigin(0, 0);
        gallery1.add(login_screen_itembg);

        // item0
        const item0 = new PlayerItem(scene, 855, 411.75);
        gallery1.add(item0);

        // gallery2
        const gallery2 = scene.add.container(0, 0);
        gallery2.visible = false;
        this.add(gallery2);

        // login_screen_itembg_1
        const login_screen_itembg_1 = scene.add.image(288, 90, "login", "login-screen/itembg");
        login_screen_itembg_1.setOrigin(0, 0);
        gallery2.add(login_screen_itembg_1);

        // login_screen_itembg_2
        const login_screen_itembg_2 = scene.add.image(873, 90, "login", "login-screen/itembg");
        login_screen_itembg_2.setOrigin(0, 0);
        gallery2.add(login_screen_itembg_2);

        // item1
        const item1 = new PlayerItem(scene, 562.5, 411.75);
        gallery2.add(item1);

        // item2
        const item2 = new PlayerItem(scene, 1147.5, 411.75);
        gallery2.add(item2);

        // gallery3
        const gallery3 = scene.add.container(0, 0);
        gallery3.visible = false;
        this.add(gallery3);

        // login_screen_itembg3
        const login_screen_itembg3 = scene.add.image(85.5, 90, "login", "login-screen/itembg3");
        login_screen_itembg3.setOrigin(0, 0);
        gallery3.add(login_screen_itembg3);

        // item3
        const item3 = new PlayerItem(scene, 369, 411.75);
        gallery3.add(item3);

        // item4
        const item4 = new PlayerItem(scene, 855, 411.75);
        gallery3.add(item4);

        // item5
        const item5 = new PlayerItem(scene, 1341, 411.75);
        gallery3.add(item5);

        // gallery4
        const gallery4 = scene.add.container(0, 0);
        gallery4.visible = false;
        this.add(gallery4);

        // login_screen_itembg4
        const login_screen_itembg4 = scene.add.image(74.25, 177.75, "login", "login-screen/itembg4");
        login_screen_itembg4.setOrigin(0, 0);
        gallery4.add(login_screen_itembg4);

        // login_screen_itembg_3
        const login_screen_itembg_3 = scene.add.image(861.75, 177.75, "login", "login-screen/itembg4");
        login_screen_itembg_3.setOrigin(0, 0);
        gallery4.add(login_screen_itembg_3);

        // login_screen_itembg_4
        const login_screen_itembg_4 = scene.add.image(74.25, 515.25, "login", "login-screen/itembg4");
        login_screen_itembg_4.setOrigin(0, 0);
        gallery4.add(login_screen_itembg_4);

        // login_screen_itembg_5
        const login_screen_itembg_5 = scene.add.image(861.75, 515.25, "login", "login-screen/itembg4");
        login_screen_itembg_5.setOrigin(0, 0);
        gallery4.add(login_screen_itembg_5);

        // item6
        const item6 = new MiniPlayerItem(scene, 222.75, 407.25);
        gallery4.add(item6);

        // item7
        const item7 = new MiniPlayerItem(scene, 1010.25, 407.25);
        gallery4.add(item7);

        // item8
        const item8 = new MiniPlayerItem(scene, 222.75, 744.75);
        gallery4.add(item8);

        // item9
        const item9 = new MiniPlayerItem(scene, 1010.25, 744.75);
        gallery4.add(item9);

        // gallery5
        const gallery5 = scene.add.container(0, 0);
        gallery5.visible = false;
        this.add(gallery5);

        // login_screen_itembg5
        const login_screen_itembg5 = scene.add.image(119.25, 90, "login", "login-screen/itembg5");
        login_screen_itembg5.setOrigin(0, 0);
        gallery5.add(login_screen_itembg5);

        // item10
        const item10 = new MiniPlayerItem(scene, 270, 319.5);
        gallery5.add(item10);

        // item11
        const item11 = new MiniPlayerItem(scene, 967.5, 319.5);
        gallery5.add(item11);

        // item12
        const item12 = new MiniPlayerItem(scene, 270, 567);
        gallery5.add(item12);

        // item13
        const item13 = new MiniPlayerItem(scene, 967.5, 567);
        gallery5.add(item13);

        // item14
        const item14 = new MiniPlayerItem(scene, 270, 814.5);
        gallery5.add(item14);

        // item15
        const item15 = new MiniPlayerItem(scene, 967.5, 814.5);
        gallery5.add(item15);

        // differentButton
        const differentButton = scene.add.image(856.01, 988.65, "login", "login-screen/moreGalleryHover");
        differentButton.alpha = 0.01;
        differentButton.alphaTopLeft = 0.01;
        differentButton.alphaTopRight = 0.01;
        differentButton.alphaBottomLeft = 0.01;
        differentButton.alphaBottomRight = 0.01;
        this.add(differentButton);

        // different
        const different = scene.add.sprite(856.01, 988.65, "login", "login-screen/moreGallery0001");
        different.visible = false;
        this.add(different);

        // differentLabel
        const differentLabel = new TextBox(scene, 136.35, 961.43, "BurbankSmallMedium");
        differentLabel.text = "Login as a different penguin";
        differentLabel.fontSize = -36;
        this.add(differentLabel);

        // differentButton (components)
        const differentButtonButtonComponent = new ButtonComponent(differentButton);
        differentButtonButtonComponent.handCursor = true;

        // differentLabel (prefab fields)
        differentLabel.boxWidth = 1431.225;
        differentLabel.boxHeight = 52.2;
        differentLabel.horizontalAlign = 1;
        differentLabel.verticalAlign = 1;

        this.item0 = item0;
        this.gallery1 = gallery1;
        this.item1 = item1;
        this.item2 = item2;
        this.gallery2 = gallery2;
        this.item3 = item3;
        this.item4 = item4;
        this.item5 = item5;
        this.gallery3 = gallery3;
        this.item6 = item6;
        this.item7 = item7;
        this.item8 = item8;
        this.item9 = item9;
        this.gallery4 = gallery4;
        this.item10 = item10;
        this.item11 = item11;
        this.item12 = item12;
        this.item13 = item13;
        this.item14 = item14;
        this.item15 = item15;
        this.gallery5 = gallery5;
        this.differentButton = differentButton;
        this.different = different;
        this.differentLabel = differentLabel;

        /* START-USER-CTR-CODE */

        this.differentButton.on('out', () => {
            this.different.visible = false;
            this.different.stop();
        });
        this.differentButton.on('over', () => {
            this.different.visible = true;
            this.different.play('differentAnimationlogin-animation');
        });
        this.differentButton.on('release', () => this.scene.showNewPlayer());

        /* END-USER-CTR-CODE */
    }

    public item0: PlayerItem;
    public gallery1: Phaser.GameObjects.Container;
    public item1: PlayerItem;
    public item2: PlayerItem;
    public gallery2: Phaser.GameObjects.Container;
    public item3: PlayerItem;
    public item4: PlayerItem;
    public item5: PlayerItem;
    public gallery3: Phaser.GameObjects.Container;
    public item6: MiniPlayerItem;
    public item7: MiniPlayerItem;
    public item8: MiniPlayerItem;
    public item9: MiniPlayerItem;
    public gallery4: Phaser.GameObjects.Container;
    public item10: MiniPlayerItem;
    public item11: MiniPlayerItem;
    public item12: MiniPlayerItem;
    public item13: MiniPlayerItem;
    public item14: MiniPlayerItem;
    public item15: MiniPlayerItem;
    public gallery5: Phaser.GameObjects.Container;
    public differentButton: Phaser.GameObjects.Image;
    public different: Phaser.GameObjects.Sprite;
    public differentLabel: TextBox;

    /* START-USER-CODE */

    declare scene: Login;

    setup(accounts: SavedAccount[]): void {
        this.gallery1.visible = false;
        this.gallery2.visible = false;
        this.gallery3.visible = false;
        this.gallery4.visible = false;
        this.gallery5.visible = false;

        let amount = Object.keys(accounts).length;
        if (amount == 1) {
            this.gallery1.visible = true;
            this.item0.setup(accounts[0]);
        } else if (amount == 2) {
            this.gallery2.visible = true;
            this.item1.setup(accounts[0]);
            this.item2.setup(accounts[1]);
        } else if (amount == 3) {
            this.gallery3.visible = true;
            this.item3.setup(accounts[0]);
            this.item4.setup(accounts[1]);
            this.item5.setup(accounts[2]);
        } else if (amount == 4) {
            this.gallery4.visible = true;
            this.item6.setup(accounts[0]);
            this.item7.setup(accounts[1]);
            this.item8.setup(accounts[2]);
            this.item9.setup(accounts[3]);
        } else if (amount == 5 || amount == 6) {
            this.gallery5.visible = true;
            this.item10.setup(accounts[0]);
            this.item11.setup(accounts[1]);
            this.item12.setup(accounts[2]);
            this.item13.setup(accounts[3]);
            this.item14.setup(accounts[4]);
            if (amount == 5) this.item15.visible = false;
            else {
                this.item15.visible = true;
                this.item15.setup(accounts[5]);
            }
        }
    }

    localize(locale: Locale): void {
        this.differentLabel.text = locale.localize('Login as a different penguin');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
