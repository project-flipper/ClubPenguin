
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/components/InputBlocker";
import ButtonComponent from "../../../lib/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import Interface, { Content } from "@clubpenguin/world/interface/Interface";
import { App } from "@clubpenguin/app/app";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
import { Engine } from "@clubpenguin/world/engine/engine";
/* END-USER-IMPORTS */

export default class Help extends Phaser.Scene implements Content {

    constructor() {
        super("Help");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("help-pack", "assets/world/content/help/help-pack.json");
    }

    editorCreate(): void {

        // rectangle_1
        const rectangle_1 = this.add.rectangle(0, 0, 1710, 1080);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.alpha = 0.25;
        rectangle_1.isFilled = true;
        rectangle_1.fillColor = 0;

        // help_base
        const help_base = this.add.nineslice(459, 171, "help", "help/base", 796.5, 675, 112.5, 112.5, 112.5, 112.5);
        help_base.setOrigin(0, 0);

        // managebtn
        const managebtn = this.add.image(855, 652.84, "help", "help/bigbutton0001");

        // closebtn
        const closebtn = this.add.image(1188.11, 231.86, "help", "help/close0001");

        // ignoredbtn
        const ignoredbtn = this.add.image(1028.02, 773.89, "help", "help/button0001");

        // help_friends
        const help_friends = this.add.image(613.57, 753.75, "help", "help/friends");
        help_friends.setOrigin(0, 0);

        // help_skull
        this.add.image(1028.14, 771.64, "help", "help/skull");

        // check1
        const check1 = this.add.image(771.41, 490.05, "help", "help/check0001");
        check1.setOrigin(0.4125, 0.6);

        // check1hit
        const check1hit = this.add.image(771.41, 490.05, "help", "help/check0001");
        check1hit.setOrigin(0.4125, 0.6);
        check1hit.alpha = 0.0001;
        check1hit.alphaTopLeft = 0.0001;
        check1hit.alphaTopRight = 0.0001;
        check1hit.alphaBottomLeft = 0.0001;
        check1hit.alphaBottomRight = 0.0001;

        // check2
        const check2 = this.add.image(771.41, 550.8, "help", "help/check0001");
        check2.setOrigin(0.4125, 0.6);

        // check2hit
        const check2hit = this.add.image(771.41, 550.8, "help", "help/check0001");
        check2hit.setOrigin(0.4125, 0.6);
        check2hit.alpha = 0.0001;
        check2hit.alphaTopLeft = 0.0001;
        check2hit.alphaTopRight = 0.0001;
        check2hit.alphaBottomLeft = 0.0001;
        check2hit.alphaBottomRight = 0.0001;

        // title
        const title = new TextBox(this, 546.75, 238.5, "CCComiccrazyBoldItalicShadow");
        this.add.existing(title);
        title.text = "SETTINGS";
        title.fontSize = 45;

        // serverName
        const serverName = new TextBox(this, 548.32, 335.14, "BurbankSmallMedium");
        this.add.existing(serverName);
        serverName.tintFill = true;
        serverName.tintTopLeft = 0;
        serverName.tintTopRight = 0;
        serverName.tintBottomLeft = 0;
        serverName.tintBottomRight = 0;
        serverName.text = "You're on Server Name";
        serverName.fontSize = 36;

        // accountAge
        const accountAge = new TextBox(this, 548.32, 393.64, "BurbankSmallMedium");
        this.add.existing(accountAge);
        accountAge.tintFill = true;
        accountAge.tintTopLeft = 0;
        accountAge.tintTopRight = 0;
        accountAge.tintBottomLeft = 0;
        accountAge.tintBottomRight = 0;
        accountAge.text = "Your penguin is 252 days old";
        accountAge.fontSize = 36;

        // muteMusic
        const muteMusic = new TextBox(this, 806.96, 465.64, "BurbankSmallMedium");
        this.add.existing(muteMusic);
        muteMusic.tintFill = true;
        muteMusic.tintTopLeft = 0;
        muteMusic.tintTopRight = 0;
        muteMusic.tintBottomLeft = 0;
        muteMusic.tintBottomRight = 0;
        muteMusic.text = "Mute Music";
        muteMusic.fontSize = 36;

        // muteAllSounds
        const muteAllSounds = new TextBox(this, 806.96, 526.39, "BurbankSmallMedium");
        this.add.existing(muteAllSounds);
        muteAllSounds.tintFill = true;
        muteAllSounds.tintTopLeft = 0;
        muteAllSounds.tintTopRight = 0;
        muteAllSounds.tintBottomLeft = 0;
        muteAllSounds.tintBottomRight = 0;
        muteAllSounds.text = "Mute All Sounds";
        muteAllSounds.fontSize = 36;

        // manageAccount
        const manageAccount = new TextBox(this, 567, 623.25, "BurbankSmallBold");
        this.add.existing(manageAccount);
        manageAccount.text = "Manage Account";
        manageAccount.fontSize = 45;

        // buddies
        const buddies = new TextBox(this, 660.38, 746.89, "BurbankSmallMedium");
        this.add.existing(buddies);
        buddies.tintFill = true;
        buddies.tintTopLeft = 0;
        buddies.tintTopRight = 0;
        buddies.tintBottomLeft = 0;
        buddies.tintBottomRight = 0;
        buddies.text = "20/100 Buddies";
        buddies.fontSize = 36;

        // rectangle_1 (components)
        new InputBlocker(rectangle_1);

        // managebtn (components)
        const managebtnButtonComponent = new ButtonComponent(managebtn);
        managebtnButtonComponent.upTexture = {"key":"help","frame":"help/bigbutton0001"};
        managebtnButtonComponent.overTexture = {"key":"help","frame":"help/bigbutton0002"};
        managebtnButtonComponent.downTexture = {"key":"help","frame":"help/bigbutton0003"};
        managebtnButtonComponent.handCursor = true;
        managebtnButtonComponent.pixelPerfect = true;

        // closebtn (components)
        const closebtnButtonComponent = new ButtonComponent(closebtn);
        closebtnButtonComponent.upTexture = {"key":"help","frame":"help/close0001"};
        closebtnButtonComponent.overTexture = {"key":"help","frame":"help/close0002"};
        closebtnButtonComponent.downTexture = {"key":"help","frame":"help/close0003"};
        closebtnButtonComponent.handCursor = true;
        closebtnButtonComponent.pixelPerfect = true;

        // ignoredbtn (components)
        const ignoredbtnButtonComponent = new ButtonComponent(ignoredbtn);
        ignoredbtnButtonComponent.upTexture = {"key":"help","frame":"help/button0001"};
        ignoredbtnButtonComponent.overTexture = {"key":"help","frame":"help/button0002"};
        ignoredbtnButtonComponent.downTexture = {"key":"help","frame":"help/button0003"};
        ignoredbtnButtonComponent.handCursor = true;
        ignoredbtnButtonComponent.pixelPerfect = true;

        // check1 (components)
        const check1ButtonComponent = new ButtonComponent(check1);
        check1ButtonComponent.handCursor = true;
        check1ButtonComponent.pixelPerfect = true;
        check1ButtonComponent.hitbox = check1hit;

        // check2 (components)
        const check2ButtonComponent = new ButtonComponent(check2);
        check2ButtonComponent.handCursor = true;
        check2ButtonComponent.pixelPerfect = true;
        check2ButtonComponent.hitbox = check2hit;

        // title (prefab fields)
        title.boxWidth = 616.3875;
        title.boxHeight = 66.6;
        title.horizontalAlign = 1;

        // serverName (prefab fields)
        serverName.boxWidth = 613.4625;
        serverName.boxHeight = 52.2;
        serverName.horizontalAlign = 1;
        serverName.verticalAlign = 1;

        // accountAge (prefab fields)
        accountAge.boxWidth = 613.4625;
        accountAge.boxHeight = 52.2;
        accountAge.horizontalAlign = 1;
        accountAge.verticalAlign = 1;

        // muteMusic (prefab fields)
        muteMusic.boxWidth = 356.175;
        muteMusic.boxHeight = 52.2;
        muteMusic.horizontalAlign = 0;
        muteMusic.verticalAlign = 1;

        // muteAllSounds (prefab fields)
        muteAllSounds.boxWidth = 356.175;
        muteAllSounds.boxHeight = 52.2;
        muteAllSounds.horizontalAlign = 0;
        muteAllSounds.verticalAlign = 1;

        // manageAccount (prefab fields)
        manageAccount.boxWidth = 575.8875;
        manageAccount.boxHeight = 63;
        manageAccount.horizontalAlign = 1;
        manageAccount.verticalAlign = 1;

        // buddies (prefab fields)
        buddies.boxWidth = 322.7625;
        buddies.boxHeight = 52.2;
        buddies.horizontalAlign = 0;
        buddies.verticalAlign = 1;

        this.managebtn = managebtn;
        this.closebtn = closebtn;
        this.ignoredbtn = ignoredbtn;
        this.check1 = check1;
        this.check2 = check2;
        this.title = title;
        this.serverName = serverName;
        this.accountAge = accountAge;
        this.muteMusic = muteMusic;
        this.muteAllSounds = muteAllSounds;
        this.manageAccount = manageAccount;
        this.buddies = buddies;

        this.events.emit("scene-awake");
    }

    public managebtn!: Phaser.GameObjects.Image;
    public closebtn!: Phaser.GameObjects.Image;
    public ignoredbtn!: Phaser.GameObjects.Image;
    public check1!: Phaser.GameObjects.Image;
    public check2!: Phaser.GameObjects.Image;
    public title!: TextBox;
    public serverName!: TextBox;
    public accountAge!: TextBox;
    public muteMusic!: TextBox;
    public muteAllSounds!: TextBox;
    public manageAccount!: TextBox;
    public buddies!: TextBox;

    /* START-USER-CODE */

    // Write your code here

    declare game: App;

    public hidesInterface = false;

    get world(): World {
        return this.scene.get('World') as World;
    }

    get engine(): Engine {
        return this.world.engine;
    }

    get interface(): Interface {
        return this.scene.get('Interface') as Interface;
    }

    init(data: any): void {
        this.scene.moveBelow('Interface');
        this.scene.moveAbove('Interface');

        if (data.oninit) data.oninit(this);
    }

    public musicMuted: boolean;
    public soundMuted: boolean;

    create(data: any) {

        this.editorCreate();

        this.check1.on('release', () => {
            if (this.soundMuted) {
                this.soundMuted = false;
                this.musicMuted = false;
            } else {
                this.musicMuted = !this.musicMuted;
            }

            this.setMusicState();
        });
        this.check2.on('release', () => {
            this.soundMuted = !this.soundMuted;

            this.setMusicState();
        });
        this.closebtn.on('release', () => this.interface.safeCloseContent());

        this.musicMuted = this.engine.music.muted;
        this.soundMuted = this.sound.mute;

        this.setMusicState();
        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    setMusicState(): void {
        this.engine.music.muted = this.musicMuted || this.soundMuted;
        this.sound.mute = this.soundMuted;

        this.check1.setFrame(this.musicMuted || this.soundMuted ? 'help/check0002' : 'help/check0001');
        this.check2.setFrame(this.soundMuted ? 'help/check0002' : 'help/check0001');
    }

    localize(locale: Locale): void {
        // TODO: Get the actual number of buddies and account age
        let days = 0;
        let friends = 0;
        let maxFriends = 0;
        this.title.text = locale.localize('Settings').toUpperCase();
        this.serverName.text = locale.localize('Youre on %servername%').replace('%servername%', this.world.worldData.name);
        this.accountAge.text = locale.localize('Your penguin is %0 %1 old').replace('%0', days.toString()).replace('%1', locale.localize(days === 1 ? 'Day' : 'Days'));
        this.muteMusic.text = locale.localize('Mute Music');
        this.muteAllSounds.text = locale.localize('w.settings.muteAllSounds');
        this.manageAccount.text = locale.localize('Manage Account');
        this.buddies.text = `${friends}/${maxFriends} ${locale.localize('Buddies')}`;
    }

    unload(interface_: Interface): void {
        this.game.locale.unregister(this.localize);
        interface_.game.unloadAssetPack('help-pack');
    }


    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
