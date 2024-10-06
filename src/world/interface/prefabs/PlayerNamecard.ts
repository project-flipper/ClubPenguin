
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import Paperdoll from "../../../lib/ui/Paperdoll";
import TextBox from "../../../lib/ui/TextBox";
import MemberBadge from "./MemberBadge";
/* START-USER-IMPORTS */
import Phaser from "phaser";

import Interface from "../Interface";
import { MyUserData } from "@clubpenguin/net/types/user";
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class PlayerNamecard extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // inventory
        const inventory = scene.add.container(0, 0);
        this.add(inventory);

        // interface_inventoryBg
        const interface_inventoryBg = scene.add.image(247.1625, -8.4375, "interface", "interface/inventoryBg");
        interface_inventoryBg.setOrigin(0, 0);
        inventory.add(interface_inventoryBg);

        // interface_inventorySortBg
        const interface_inventorySortBg = scene.add.image(767.25, 668.475, "interface", "interface/inventorySortBg");
        inventory.add(interface_inventorySortBg);

        // inventoryTabOpen
        const inventoryTabOpen = scene.add.image(1064.25, 180, "interface", "interface/namecardInventoryTabOpen");
        inventoryTabOpen.setOrigin(0.09, 0.5);
        inventory.add(inventoryTabOpen);

        // interface_inventoryScroll
        const interface_inventoryScroll = scene.add.image(1012.3875, 319.275, "interface", "interface/inventoryScroll");
        inventory.add(interface_inventoryScroll);

        // inventoryBackButton
        const inventoryBackButton = scene.add.image(1012.5, 55.0125, "interface", "interface/inventoryBackButton0001");
        inventory.add(inventoryBackButton);

        // inventoryNextButton
        const inventoryNextButton = scene.add.image(1012.5, 583.7625, "interface", "interface/inventoryBackButton0001");
        inventory.add(inventoryNextButton);

        // bg
        const bg = scene.add.nineslice(-9, -15.4, "interface", "interface/namecardBg", 522, 710.775, 46, 46, 46, 46);
        bg.setOrigin(0, 0);
        this.add(bg);

        // tab
        const tab = scene.add.image(135, -52.52, "interface", "interface/namecardTab");
        tab.setOrigin(0, 0);
        this.add(tab);

        // photo
        const photo = scene.add.image(18, 90, "interface", "interface/namecardPhoto");
        photo.setOrigin(0, 0);
        this.add(photo);

        // paperdoll
        const paperdoll = new Paperdoll(scene, 249.075, 321.525);
        this.add(paperdoll);

        // avatar
        const avatar = scene.add.image(6.8625, 113.175, "interface", "interface/namecardAvatar0001");
        avatar.setOrigin(-0.0208, 0.05);
        avatar.visible = false;
        this.add(avatar);

        // nickname
        const nickname = new TextBox(scene, 66.6, 37, "BurbankSmallMedium");
        nickname.tintFill = true;
        nickname.tintTopLeft = 0;
        nickname.tintTopRight = 0;
        nickname.tintBottomLeft = 0;
        nickname.tintBottomRight = 0;
        nickname.text = "Nickname";
        nickname.fontSize = -36;
        nickname.align = 1;
        this.add(nickname);

        // badge
        const badge = new MemberBadge(scene, 72.5625, 67.6125);
        this.add(badge);

        // star
        const star = scene.add.image(67.5, 67.5, "interface", "interface/playerStar");
        this.add(star);

        // moderatorEditButton
        const moderatorEditButton = scene.add.image(387, 89.8875, "interface", "interface/namecardModerator0001");
        moderatorEditButton.setOrigin(0, 0);
        this.add(moderatorEditButton);

        // closeButton
        const closeButton = scene.add.image(450, 54, "interface", "interface/namecardClose0001");
        this.add(closeButton);

        // interface_coin
        const interface_coin = scene.add.image(48.0375, 578.025, "interface", "interface/coin");
        this.add(interface_coin);

        // stampbookButton
        const stampbookButton = scene.add.image(48.825, 638.775, "interface", "interface/namecardButton0001");
        this.add(stampbookButton);

        // stampbookButtonIcon
        const stampbookButtonIcon = scene.add.image(48.825, 638.775, "interface", "interface/namecardStampbookButtonIcon");
        this.add(stampbookButtonIcon);

        // coins
        const coins = new TextBox(scene, 83.475, 566.1, "BurbankSmallMedium");
        coins.tintFill = true;
        coins.tintTopLeft = 0;
        coins.tintTopRight = 0;
        coins.tintBottomLeft = 0;
        coins.tintBottomRight = 0;
        coins.text = "Your Coins: 000000";
        coins.fontSize = -22.5;
        this.add(coins);

        // stamps
        const stamps = new TextBox(scene, 83.475, 618.975, "BurbankSmallMedium");
        stamps.tintFill = true;
        stamps.tintTopLeft = 0;
        stamps.tintTopRight = 0;
        stamps.tintBottomLeft = 0;
        stamps.tintBottomRight = 0;
        stamps.text = "Your Stamps: 355/355";
        stamps.fontSize = -22.5;
        this.add(stamps);

        // inventoryTab
        const inventoryTab = scene.add.image(504, 180, "interface", "interface/namecardInventoryTab");
        inventoryTab.setOrigin(0.09, 0.5);
        this.add(inventoryTab);

        // interface_inventoryBg (components)
        new InputBlocker(interface_inventoryBg);

        // inventoryTabOpen (components)
        const inventoryTabOpenButtonComponent = new ButtonComponent(inventoryTabOpen);
        inventoryTabOpenButtonComponent.handCursor = true;
        inventoryTabOpenButtonComponent.pixelPerfect = true;

        // inventoryBackButton (components)
        const inventoryBackButtonButtonComponent = new ButtonComponent(inventoryBackButton);
        inventoryBackButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/inventoryBackButton0001"};
        inventoryBackButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/inventoryBackButton0002"};
        inventoryBackButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/inventoryBackButton0003"};
        inventoryBackButtonButtonComponent.handCursor = true;
        inventoryBackButtonButtonComponent.pixelPerfect = true;

        // inventoryNextButton (components)
        const inventoryNextButtonButtonComponent = new ButtonComponent(inventoryNextButton);
        inventoryNextButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/inventoryNextButton0001"};
        inventoryNextButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/inventoryNextButton0002"};
        inventoryNextButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/inventoryNextButton0003"};
        inventoryNextButtonButtonComponent.handCursor = true;
        inventoryNextButtonButtonComponent.pixelPerfect = true;

        // bg (components)
        new InputBlocker(bg);

        // nickname (prefab fields)
        nickname.boxWidth = 369.7875;
        nickname.boxHeight = 60.75;
        nickname.horizontalAlign = 1;
        nickname.verticalAlign = 1;

        // moderatorEditButton (components)
        const moderatorEditButtonButtonComponent = new ButtonComponent(moderatorEditButton);
        moderatorEditButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/namecardModerator0001"};
        moderatorEditButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/namecardModerator0002"};
        moderatorEditButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/namecardModerator0003"};
        moderatorEditButtonButtonComponent.handCursor = true;
        moderatorEditButtonButtonComponent.pixelPerfect = true;

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/namecardClose0001"};
        closeButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/namecardClose0002"};
        closeButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/namecardClose0003"};
        closeButtonButtonComponent.handCursor = true;
        closeButtonButtonComponent.pixelPerfect = true;

        // stampbookButton (components)
        const stampbookButtonButtonComponent = new ButtonComponent(stampbookButton);
        stampbookButtonButtonComponent.upTexture = {"key":"interface","frame":"interface/namecardButton0001"};
        stampbookButtonButtonComponent.overTexture = {"key":"interface","frame":"interface/namecardButton0002"};
        stampbookButtonButtonComponent.downTexture = {"key":"interface","frame":"interface/namecardButton0003"};
        stampbookButtonButtonComponent.handCursor = true;
        stampbookButtonButtonComponent.pixelPerfect = true;

        // coins (prefab fields)
        coins.boxWidth = 249.525;
        coins.boxHeight = 38.7;
        coins.verticalAlign = 1;

        // stamps (prefab fields)
        stamps.boxWidth = 256.275;
        stamps.boxHeight = 36;
        stamps.verticalAlign = 1;

        // inventoryTab (components)
        const inventoryTabButtonComponent = new ButtonComponent(inventoryTab);
        inventoryTabButtonComponent.handCursor = true;
        inventoryTabButtonComponent.pixelPerfect = true;

        this.inventoryTabOpen = inventoryTabOpen;
        this.inventoryBackButton = inventoryBackButton;
        this.inventoryNextButton = inventoryNextButton;
        this.inventory = inventory;
        this.bg = bg;
        this.tab = tab;
        this.paperdoll = paperdoll;
        this.avatar = avatar;
        this.nickname = nickname;
        this.badge = badge;
        this.star = star;
        this.moderatorEditButton = moderatorEditButton;
        this.closeButton = closeButton;
        this.stampbookButton = stampbookButton;
        this.coins = coins;
        this.stamps = stamps;
        this.inventoryTab = inventoryTab;

        /* START-USER-CTR-CODE */

        this.tab.setInteractive({
            draggable: true
        });
        var startX = 0;
        var startY = 0;
        this.tab.on('dragstart', () => {
            startX = this.x;
            startY = this.y;
        });
        this.tab.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(startX - this.tab.x + dragX, startY - this.tab.y + dragY);
        });

        this.stampbookButton.on('over', () => {
            this.scene.showLocalizedHint(this.stampbookButton, 'stamp_book_hint');
        });
        this.stampbookButton.on('out', () => {
            this.scene.hideHint();
        });
        this.stampbookButton.on('release', () => {
            this.scene.hideHint();
        });

        this.inventoryTab.on('release', () => this.openInventory());
        this.inventoryTabOpen.on('release', () => this.closeInventory());

        this.closeButton.on('release', () => {
            this.scene.namecard.setPosition(this.x, this.y);
            this.scene.closeNamecard();
        });

        /* END-USER-CTR-CODE */
    }

    public inventoryTabOpen: Phaser.GameObjects.Image;
    public inventoryBackButton: Phaser.GameObjects.Image;
    public inventoryNextButton: Phaser.GameObjects.Image;
    public inventory: Phaser.GameObjects.Container;
    public bg: Phaser.GameObjects.NineSlice;
    public tab: Phaser.GameObjects.Image;
    public paperdoll: Paperdoll;
    public avatar: Phaser.GameObjects.Image;
    public nickname: TextBox;
    public badge: MemberBadge;
    public star: Phaser.GameObjects.Image;
    public moderatorEditButton: Phaser.GameObjects.Image;
    public closeButton: Phaser.GameObjects.Image;
    public stampbookButton: Phaser.GameObjects.Image;
    public coins: TextBox;
    public stamps: TextBox;
    public inventoryTab: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Interface;

    public userId: number;

    setup(data: MyUserData): void {
        this.userId = data.id;

        this.nickname.text = data.nickname;

        if (data.avatar.transformation) {
            this.avatar.visible = true;
        } else {
            this.avatar.visible = false;
            this.paperdoll.setup(data.avatar, data.id);
        }

        if (this.scene.world.isMember(data)) {
            this.badge.visible = true;
            this.badge.setLevel(data.member.level);
            this.star.visible = false;
        } else {
            this.badge.visible = false;
            this.star.visible = true;
        }

        this.moderatorEditButton.visible = this.scene.world.isMyPlayerModerator();

        this.scene.game.locale.immediate(locale => {
            this.coins.text = locale.localize('widget_coins').replace('%total%', '0');
            this.stamps.text = locale.localize('widget_stamps').replace('%numerator%', '0').replace('%denominator%', '0');
        });
    }

    openInventory(): void {
        this.inventoryTab.visible = false;
        this.inventory.visible = true;
    }

    closeInventory(): void {
        this.inventoryTab.visible = true;
        this.inventory.visible = false;
    }

    localize(locale: Locale): void {
        this.badge.localize(locale);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
