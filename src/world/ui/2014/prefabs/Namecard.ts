
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../../lib/components/InputBlocker";
import Paperdoll from "../../../../lib/ui/Paperdoll";
import TextBox from "../../../../lib/ui/TextBox";
import MemberBadge from "./MemberBadge";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import Interface from "@clubpenguin/world/interface/Interface";
import { UserData } from "@clubpenguin/net/types/user";
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class Namecard extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

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
        nickname.fontSize = 36;
        nickname.align = 1;
        this.add(nickname);

        // badge
        const badge = new MemberBadge(scene, 72.5625, 67.6125);
        this.add(badge);

        // moderatorEditButton
        const moderatorEditButton = scene.add.image(387, 89.8875, "ui-2014", "2014/namecardModerator0001");
        moderatorEditButton.setOrigin(0, 0);
        this.add(moderatorEditButton);

        // closeButton
        const closeButton = scene.add.image(450, 54, "ui-2014", "2014/namecardClose0001");
        this.add(closeButton);

        // friendButton
        const friendButton = scene.add.image(49.6125, 616.5, "ui-2014", "2014/namecardButton0001");
        this.add(friendButton);

        // friendsButtonDisabled
        const friendsButtonDisabled = scene.add.image(49.6125, 616.5, "ui-2014", "2014/namecardButtonDisabled");
        friendsButtonDisabled.visible = false;
        this.add(friendsButtonDisabled);

        // friendsButtonIcon
        const friendsButtonIcon = scene.add.image(49.6125, 616.5, "ui-2014", "2014/namecardFriendsButtonDisabled");
        this.add(friendsButtonIcon);

        // locateButton
        const locateButton = scene.add.image(117.1125, 616.5, "ui-2014", "2014/namecardButton0001");
        this.add(locateButton);

        // locateButtonDisabled
        const locateButtonDisabled = scene.add.image(117.1125, 616.5, "ui-2014", "2014/namecardButtonDisabled");
        locateButtonDisabled.visible = false;
        this.add(locateButtonDisabled);

        // locateButtonIcon
        const locateButtonIcon = scene.add.image(117.1125, 616.5, "ui-2014", "2014/namecardLocateButtonDisabled");
        this.add(locateButtonIcon);

        // iglooButton
        const iglooButton = scene.add.image(184.5, 616.5, "ui-2014", "2014/namecardButton0001");
        this.add(iglooButton);

        // iglooButtonDisabled
        const iglooButtonDisabled = scene.add.image(184.5, 616.5, "ui-2014", "2014/namecardButtonDisabled");
        iglooButtonDisabled.visible = false;
        this.add(iglooButtonDisabled);

        // iglooButtonIcon
        const iglooButtonIcon = scene.add.image(184.5, 616.5, "ui-2014", "2014/namecardIglooButtonDisabled");
        this.add(iglooButtonIcon);

        // mailButton
        const mailButton = scene.add.image(252, 616.5, "ui-2014", "2014/namecardButton0001");
        this.add(mailButton);

        // mailButtonDisabled
        const mailButtonDisabled = scene.add.image(252, 616.5, "ui-2014", "2014/namecardButtonDisabled");
        mailButtonDisabled.visible = false;
        this.add(mailButtonDisabled);

        // mailButtonIcon
        const mailButtonIcon = scene.add.image(252, 616.5, "ui-2014", "2014/namecardMailButtonDisabled");
        this.add(mailButtonIcon);

        // stampbookButton
        const stampbookButton = scene.add.image(319.5, 616.5, "ui-2014", "2014/namecardButton0001");
        this.add(stampbookButton);

        // stampbookButtonDisabled
        const stampbookButtonDisabled = scene.add.image(319.5, 616.5, "ui-2014", "2014/namecardButtonDisabled");
        stampbookButtonDisabled.visible = false;
        this.add(stampbookButtonDisabled);

        // stampbookButtonIcon
        const stampbookButtonIcon = scene.add.image(319.5, 616.5, "ui-2014", "2014/namecardStampbookButtonDisabled");
        this.add(stampbookButtonIcon);

        // ignoreButton
        const ignoreButton = scene.add.image(387, 616.5, "ui-2014", "2014/namecardButton0001");
        this.add(ignoreButton);

        // ignoreButtonDisabled
        const ignoreButtonDisabled = scene.add.image(387, 616.5, "ui-2014", "2014/namecardButtonDisabled");
        ignoreButtonDisabled.visible = false;
        this.add(ignoreButtonDisabled);

        // ignoreButtonIcon
        const ignoreButtonIcon = scene.add.image(387, 616.5, "ui-2014", "2014/namecardIgnoreButtonDisabled");
        this.add(ignoreButtonIcon);

        // reportButton
        const reportButton = scene.add.image(454.5, 616.5, "ui-2014", "2014/namecardButton0001");
        this.add(reportButton);

        // reportButtonDisabled
        const reportButtonDisabled = scene.add.image(454.5, 616.5, "ui-2014", "2014/namecardButtonDisabled");
        reportButtonDisabled.visible = false;
        this.add(reportButtonDisabled);

        // reportButtonIcon
        const reportButtonIcon = scene.add.image(454.5, 616.5, "ui-2014", "2014/namecardReportButtonDisabled");
        this.add(reportButtonIcon);

        // photo (components)
        new InputBlocker(photo);

        // paperdoll (prefab fields)
        paperdoll.interactive = false;

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

        // friendButton (components)
        const friendButtonButtonComponent = new ButtonComponent(friendButton);
        friendButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        friendButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        friendButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
        friendButtonButtonComponent.handCursor = true;
        friendButtonButtonComponent.pixelPerfect = true;

        // friendsButtonDisabled (components)
        new InputBlocker(friendsButtonDisabled);

        // locateButton (components)
        const locateButtonButtonComponent = new ButtonComponent(locateButton);
        locateButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        locateButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        locateButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
        locateButtonButtonComponent.handCursor = true;
        locateButtonButtonComponent.pixelPerfect = true;

        // locateButtonDisabled (components)
        new InputBlocker(locateButtonDisabled);

        // iglooButton (components)
        const iglooButtonButtonComponent = new ButtonComponent(iglooButton);
        iglooButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        iglooButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        iglooButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
        iglooButtonButtonComponent.handCursor = true;
        iglooButtonButtonComponent.pixelPerfect = true;

        // iglooButtonDisabled (components)
        new InputBlocker(iglooButtonDisabled);

        // mailButton (components)
        const mailButtonButtonComponent = new ButtonComponent(mailButton);
        mailButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        mailButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        mailButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
        mailButtonButtonComponent.handCursor = true;
        mailButtonButtonComponent.pixelPerfect = true;

        // mailButtonDisabled (components)
        new InputBlocker(mailButtonDisabled);

        // stampbookButton (components)
        const stampbookButtonButtonComponent = new ButtonComponent(stampbookButton);
        stampbookButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        stampbookButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        stampbookButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
        stampbookButtonButtonComponent.handCursor = true;
        stampbookButtonButtonComponent.pixelPerfect = true;

        // stampbookButtonDisabled (components)
        new InputBlocker(stampbookButtonDisabled);

        // ignoreButton (components)
        const ignoreButtonButtonComponent = new ButtonComponent(ignoreButton);
        ignoreButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        ignoreButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        ignoreButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
        ignoreButtonButtonComponent.handCursor = true;
        ignoreButtonButtonComponent.pixelPerfect = true;

        // ignoreButtonDisabled (components)
        new InputBlocker(ignoreButtonDisabled);

        // reportButton (components)
        const reportButtonButtonComponent = new ButtonComponent(reportButton);
        reportButtonButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/namecardButton0001"};
        reportButtonButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/namecardButton0002"};
        reportButtonButtonComponent.downTexture = {"key":"ui-2014","frame":"2014/namecardButton0003"};
        reportButtonButtonComponent.handCursor = true;
        reportButtonButtonComponent.pixelPerfect = true;

        // reportButtonDisabled (components)
        new InputBlocker(reportButtonDisabled);

        this.bg = bg;
        this.tab = tab;
        this.paperdoll = paperdoll;
        this.avatar = avatar;
        this.nickname = nickname;
        this.badge = badge;
        this.moderatorEditButton = moderatorEditButton;
        this.closeButton = closeButton;
        this.friendButton = friendButton;
        this.friendsButtonDisabled = friendsButtonDisabled;
        this.friendsButtonIcon = friendsButtonIcon;
        this.locateButton = locateButton;
        this.locateButtonDisabled = locateButtonDisabled;
        this.locateButtonIcon = locateButtonIcon;
        this.iglooButton = iglooButton;
        this.iglooButtonDisabled = iglooButtonDisabled;
        this.iglooButtonIcon = iglooButtonIcon;
        this.mailButton = mailButton;
        this.mailButtonDisabled = mailButtonDisabled;
        this.mailButtonIcon = mailButtonIcon;
        this.stampbookButton = stampbookButton;
        this.stampbookButtonDisabled = stampbookButtonDisabled;
        this.stampbookButtonIcon = stampbookButtonIcon;
        this.ignoreButton = ignoreButton;
        this.ignoreButtonDisabled = ignoreButtonDisabled;
        this.ignoreButtonIcon = ignoreButtonIcon;
        this.reportButton = reportButton;
        this.reportButtonDisabled = reportButtonDisabled;
        this.reportButtonIcon = reportButtonIcon;

        /* START-USER-CTR-CODE */

        this.tab.setInteractive({
            draggable: true
        });
        this.bg.setInteractive({
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

        this.friendButton.on('over', () => {
            this.scene.showLocalizedHint(this.friendButton, this.friendHint);
        });
        this.friendButton.on('out', () => {
            this.scene.hideHint();
        });
        this.friendButton.on('release', () => {
            this.scene.hideHint();
        });

        this.locateButton.on('over', () => {
            this.scene.showLocalizedHint(this.locateButton, 'profile_hint');
        });
        this.locateButton.on('out', () => {
            this.scene.hideHint();
        });
        this.locateButton.on('release', () => {
            this.scene.hideHint();
        });

        this.locateButton.on('over', () => {
            this.scene.showLocalizedHint(this.locateButton, this.locateHint);
        });
        this.locateButton.on('out', () => {
            this.scene.hideHint();
        });
        this.locateButton.on('release', () => {
            this.scene.hideHint();
        });

        this.iglooButton.on('over', () => {
            this.scene.showLocalizedHint(this.iglooButton, 'visit_home_hint');
        });
        this.iglooButton.on('out', () => {
            this.scene.hideHint();
        });
        this.iglooButton.on('release', () => {
            this.scene.hideHint();
        });

        this.mailButton.on('over', () => {
            this.scene.showLocalizedHint(this.mailButton, 'send_mail_hint');
        });
        this.mailButton.on('out', () => {
            this.scene.hideHint();
        });
        this.mailButton.on('release', () => {
            this.scene.hideHint();
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

        this.ignoreButton.on('over', () => {
            this.scene.showLocalizedHint(this.ignoreButton, this.ignoreHint);
        });
        this.ignoreButton.on('out', () => {
            this.scene.hideHint();
        });
        this.ignoreButton.on('release', () => {
            this.scene.hideHint();
        });

        this.reportButton.on('over', () => {
            this.scene.showLocalizedHint(this.reportButton, this.reportHint);
        });
        this.reportButton.on('out', () => {
            this.scene.hideHint();
        });
        this.reportButton.on('release', () => {
            this.scene.hideHint();
        });

        this.closeButton.on('release', () => {
            this.scene.closeNamecard();
        });

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.NineSlice;
    public tab: Phaser.GameObjects.Image;
    public paperdoll: Paperdoll;
    public avatar: Phaser.GameObjects.Image;
    public nickname: TextBox;
    public badge: MemberBadge;
    public moderatorEditButton: Phaser.GameObjects.Image;
    public closeButton: Phaser.GameObjects.Image;
    public friendButton: Phaser.GameObjects.Image;
    public friendsButtonDisabled: Phaser.GameObjects.Image;
    public friendsButtonIcon: Phaser.GameObjects.Image;
    public locateButton: Phaser.GameObjects.Image;
    public locateButtonDisabled: Phaser.GameObjects.Image;
    public locateButtonIcon: Phaser.GameObjects.Image;
    public iglooButton: Phaser.GameObjects.Image;
    public iglooButtonDisabled: Phaser.GameObjects.Image;
    public iglooButtonIcon: Phaser.GameObjects.Image;
    public mailButton: Phaser.GameObjects.Image;
    public mailButtonDisabled: Phaser.GameObjects.Image;
    public mailButtonIcon: Phaser.GameObjects.Image;
    public stampbookButton: Phaser.GameObjects.Image;
    public stampbookButtonDisabled: Phaser.GameObjects.Image;
    public stampbookButtonIcon: Phaser.GameObjects.Image;
    public ignoreButton: Phaser.GameObjects.Image;
    public ignoreButtonDisabled: Phaser.GameObjects.Image;
    public ignoreButtonIcon: Phaser.GameObjects.Image;
    public reportButton: Phaser.GameObjects.Image;
    public reportButtonDisabled: Phaser.GameObjects.Image;
    public reportButtonIcon: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Interface;

    public userId: number;

    public friendHint: string;
    public locateHint: string;
    public ignoreHint: string;
    public reportHint: string;

    setup(data: UserData): void {
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
        } else {
            this.badge.visible = false;
        }

        if (this.scene.world.isMascot(data)) {
            this.friendButton.visible = !this.scene.world.isFriend(data);
            this.friendsButtonIcon.setFrame(this.friendButton.visible ? '2014/namecardFriendsButtonIcon' : '2014/namecardFriendsButtonDisabled');
        } else {
            this.friendsButtonIcon.setFrame(this.scene.world.isFriend(data) ? '2014/namecardFriendsButtonUnfriend' : '2014/namecardFriendsButtonIcon');
            this.friendButton.visible = true;
        }
        this.friendHint = this.scene.world.isFriend(data) ? 'remove_buddy_hint' : 'add_buddy_hint';
        this.friendsButtonDisabled.visible = !this.friendButton.visible;

        if (this.scene.world.isMascot(data)) {
            this.locateButton.visible = true; // TODO: check for item
            this.locateButtonIcon.setFrame('2014/namecardLocateButtonGift');
            this.locateHint = 'free_item_hint';
        } else if (this.scene.world.isMyPlayerModerator()) {
            this.locateButton.visible = true;
            this.locateButtonIcon.setFrame('2014/namecardLocateButtonMute');
            this.locateHint = 'mute_player_hint';
        } else {
            this.locateButton.visible = this.scene.world.isFriend(data) ? (data.presence ? data.presence.world_id == this.scene.world.worldId : false) : false;
            this.locateButtonIcon.setFrame(this.locateButton.visible ? '2014/namecardLocateButtonIcon' : '2014/namecardLocateButtonDisabled');
            this.locateHint = 'online_hint';
        }
        this.locateButtonDisabled.visible = !this.locateButton.visible;

        this.iglooButton.visible = data?.igloo_id != undefined;
        this.iglooButtonIcon.setFrame(this.iglooButton.visible ? '2014/namecardIglooButtonIcon' : '2014/namecardIglooButtonDisabled');
        this.iglooButtonDisabled.visible = !this.iglooButton.visible;

        this.mailButton.visible = !this.scene.world.isMascot(data);
        this.mailButtonIcon.setFrame(this.mailButton.visible ? '2014/namecardMailButtonIcon' : '2014/namecardMailButtonDisabled');
        this.mailButtonDisabled.visible = !this.mailButton.visible;

        this.stampbookButton.visible = data.public_stampbook ? true : false;
        this.stampbookButtonIcon.setFrame(this.stampbookButton.visible ? '2014/namecardStampbookButtonIcon' : '2014/namecardStampbookButtonDisabled');
        this.stampbookButtonDisabled.visible = !this.stampbookButton.visible;

        if (this.scene.world.isMyPlayerModerator() && !this.scene.world.isMascot(data)) {
            this.reportButton.visible = true;
            this.ignoreButton.visible = true;

            this.ignoreHint = 'kick_player_hint';
            this.reportHint = 'ban_player_hint';
        } else {
            this.reportButton.visible = !this.scene.world.isMascot(data);
            this.ignoreButton.visible = !this.scene.world.isMascot(data);

            this.ignoreHint = this.scene.world.isIgnored(data) ? 'remove_ignore_hint' : 'add_ignore_hint';
            this.reportHint = 'report_player_hint';
        }
        this.ignoreButtonIcon.setFrame(this.ignoreButton.visible ? '2014/namecardIgnoreButtonIcon' : (this.scene.world.isIgnored(data) ? '2014/namecardIgnoreButtonUnignore' : '2014/namecardIgnoreButtonDisabled'));
        this.ignoreButtonDisabled.visible = !this.ignoreButton.visible;

        this.reportButtonIcon.setFrame(this.reportButton.visible ? '2014/namecardReportButtonIcon' : '2014/namecardReportButtonDisabled')
        this.reportButtonDisabled.visible = !this.reportButton.visible;

        this.moderatorEditButton.visible = this.scene.world.isMyPlayerModerator();
    }

    localize(locale: Locale): void {
        this.badge.localize(locale);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
