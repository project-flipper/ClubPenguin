
// You can write more code here

/* START OF COMPILED CODE */

import PlayerInventory from "./PlayerInventory";
import InputBlocker from "../../../../lib/components/InputBlocker";
import Paperdoll from "../../../../lib/ui/Paperdoll";
import TextBox from "../../../../lib/ui/TextBox";
import MemberBadge from "./MemberBadge";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import Interface from "@clubpenguin/world/interface/Interface";
import { MyUserData } from "@clubpenguin/net/types/user";
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class PlayerNamecard extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // inventory
        const inventory = new PlayerInventory(scene, 0, 0);
        this.add(inventory);

        // bg
        const bg = scene.add.nineslice(-9, -15.4, "ui-2014", "2014/namecardBg", 522, 710.775, 46, 46, 46, 46);
        bg.setOrigin(0, 0);
        this.add(bg);

        // tab
        const tab = scene.add.image(135, -52.52, "ui-2014", "2014/namecardTab");
        tab.setOrigin(0, 0);
        this.add(tab);

        // photo
        const photo = scene.add.image(18, 90, "ui-2014", "2014/namecardPhoto");
        photo.setOrigin(0, 0);
        this.add(photo);

        // paperdoll
        const paperdoll = new Paperdoll(scene, 249.075, 321.525);
        this.add(paperdoll);

        // avatar
        const avatar = scene.add.image(6.8625, 113.175, "ui-2014", "2014/namecardAvatar0001");
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
        const star = scene.add.image(67.5, 67.5, "ui-2014", "2014/playerStar");
        this.add(star);

        // moderatorEditButton
        const moderatorEditButton = scene.add.image(387, 89.8875, "ui-2014", "2014/namecardModerator0001");
        moderatorEditButton.setOrigin(0, 0);
        this.add(moderatorEditButton);

        // closeButton
        const closeButton = scene.add.image(450, 54, "ui-2014", "2014/namecardClose0001");
        this.add(closeButton);

        // ui2014_coin
        const ui2014_coin = scene.add.image(48.0375, 578.025, "ui-2014", "2014/coin");
        this.add(ui2014_coin);

        // stampbookButton
        const stampbookButton = scene.add.image(48.825, 638.775, "ui-2014", "2014/namecardButton0001");
        this.add(stampbookButton);

        // stampbookButtonIcon
        const stampbookButtonIcon = scene.add.image(48.825, 638.775, "ui-2014", "2014/namecardStampbookButtonIcon");
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
        const inventoryTab = scene.add.image(504, 180, "ui-2014", "2014/namecardInventoryTab");
        inventoryTab.setOrigin(0.09, 0.5);
        this.add(inventoryTab);

        // photo (components)
        new InputBlocker(photo);

        // nickname (prefab fields)
        nickname.boxWidth = 369.7875;
        nickname.boxHeight = 60.75;
        nickname.horizontalAlign = 1;
        nickname.verticalAlign = 1;

        // moderatorEditButton (components)
        const moderatorEditButtonButtonComponent = new ButtonComponent(moderatorEditButton);
        moderatorEditButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardModerator0001"};
        moderatorEditButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardModerator0002"};
        moderatorEditButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardModerator0003"};
        moderatorEditButtonButtonComponent.handCursor = true;
        moderatorEditButtonButtonComponent.pixelPerfect = true;

        // closeButton (components)
        const closeButtonButtonComponent = new ButtonComponent(closeButton);
        closeButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardClose0001"};
        closeButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardClose0002"};
        closeButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardClose0003"};
        closeButtonButtonComponent.handCursor = true;
        closeButtonButtonComponent.pixelPerfect = true;

        // stampbookButton (components)
        const stampbookButtonButtonComponent = new ButtonComponent(stampbookButton);
        stampbookButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        stampbookButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        stampbookButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
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

        this.bg.setInteractive({
            draggable: true
        });
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
            this.scene.repositionNamecard(startX - this.tab.x + dragX, startY - this.tab.y + dragY);
        });
        this.bg.on('dragstart', () => {
            startX = this.x;
            startY = this.y;
        });
        this.bg.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.scene.repositionNamecard(startX - this.bg.x + dragX, startY - this.bg.y + dragY);
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
        this.inventory.tab.on('release', () => this.closeInventory());

        this.closeButton.on('release', () => {
            this.scene.closeNamecard();
        });

        /* END-USER-CTR-CODE */
    }

    public inventory: PlayerInventory;
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

        this.inventory.setup(data.id);
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
