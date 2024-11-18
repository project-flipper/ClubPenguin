
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/components/InputBlocker";
import TextBox from "../../../lib/ui/TextBox";
import ButtonComponent from "../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { GameConfig } from "@clubpenguin/app/config";
import Load from "@clubpenguin/load/Load";
import { Engine, Game } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";
import FNAFNight from "./FNAFNight";
import Interface from "@clubpenguin/world/interface/Interface";
/* END-USER-IMPORTS */

export default class FNAF extends Phaser.Scene implements Game {

    constructor() {
        super("FNAF");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("fnaf-pregame-pack", "assets/world/games/fnaf/fnaf-pregame-pack.json");
    }

    editorCreate(): void {

        // rectangle
        const rectangle = this.add.rectangle(0, 0, 1140, 720);
        rectangle.setOrigin(0, 0);
        rectangle.isFilled = true;
        rectangle.fillColor = 0;

        // menu
        const menu = this.add.layer();

        // freddy
        const freddy = this.add.image(-70, 0, "fnaf-pregame", "fnaf-pregame/Static & Menu/Menu/431");
        freddy.setOrigin(0, 0);
        menu.add(freddy);

        // menustatic
        const menustatic = this.add.sprite(-70, 0, "fnaf-pregame", "fnaf-pregame/Static & Menu/Full Static/12");
        menustatic.setOrigin(0, 0);
        menustatic.alpha = 0.25;
        menustatic.alphaTopLeft = 0.25;
        menustatic.alphaTopRight = 0.25;
        menustatic.alphaBottomLeft = 0.25;
        menustatic.alphaBottomRight = 0.25;
        menustatic.play("fnaf-pregame-static-animation");
        menu.add(menustatic);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_444
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_444 = this.add.image(103, 68, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/444");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_444.setOrigin(0, 0);
        menu.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_444);

        // newGame
        const newGame = this.add.image(103, 404, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/448");
        newGame.setOrigin(0, 0);
        menu.add(newGame);

        // continueGame
        const continueGame = this.add.image(103, 475, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/449");
        continueGame.setOrigin(0, 0);
        menu.add(continueGame);

        // sixthNight
        const sixthNight = this.add.image(103, 549, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/443");
        sixthNight.setOrigin(0, 0);
        menu.add(sixthNight);

        // customNight
        const customNight = this.add.image(103, 617, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/526");
        customNight.setOrigin(0, 0);
        menu.add(customNight);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_433
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_433 = this.add.image(904, 686, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/433");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_433.setOrigin(0, 0);
        menu.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_433);

        // bar
        const bar = this.add.image(-94, -38, "fnaf-pregame", "fnaf-pregame/Other/Misc/452");
        bar.setOrigin(0, 0);
        bar.alpha = 0.25;
        bar.alphaTopLeft = 0.25;
        bar.alphaTopRight = 0.25;
        bar.alphaBottomLeft = 0.25;
        bar.alphaBottomRight = 0.25;
        menu.add(bar);

        // carot
        const carot = this.add.image(53, 480, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/450");
        carot.setOrigin(0, 0);
        menu.add(carot);

        // menublip
        const menublip = this.add.sprite(-70, 0, "fnaf-pregame", "fnaf-pregame/Static & Menu/Menu Static/22");
        menublip.setOrigin(0, 0);
        menublip.visible = false;
        menu.add(menublip);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_475
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_475 = this.add.image(103, 517, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/475");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_475.setOrigin(0, 0);
        menu.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_475);

        // nightNumber
        const nightNumber = this.add.bitmapText(174, 515, "BurbankSmallMedium", "5\n");
        nightNumber.text = "5\n";
        nightNumber.fontSize = 25;
        menu.add(nightNumber);

        // star1
        const star1 = this.add.image(103, 310, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/432");
        star1.setOrigin(0, 0);
        menu.add(star1);

        // star2
        const star2 = this.add.image(180, 310, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/432");
        star2.setOrigin(0, 0);
        menu.add(star2);

        // star3
        const star3 = this.add.image(257, 310, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/432");
        star3.setOrigin(0, 0);
        menu.add(star3);

        // customize
        const customize = this.add.layer();
        customize.visible = false;

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_524
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_524 = this.add.image(378, 40, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/524");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_524.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_524);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_593
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_593 = this.add.image(56, 652, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/593");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_593.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_593);

        // customizeReady
        const customizeReady = this.add.image(924, 628, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/530");
        customizeReady.setOrigin(0, 0);
        customize.add(customizeReady);

        // fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_527
        const fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_527 = this.add.image(105.09375, 187, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Custom Night and Rare Screens/527");
        fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_527.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_527);

        // fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_528
        const fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_528 = this.add.image(358.921875, 187, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Custom Night and Rare Screens/528");
        fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_528.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_528);

        // fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_529
        const fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_529 = this.add.image(612.75, 187, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Custom Night and Rare Screens/529");
        fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_529.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_529);

        // fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_536
        const fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_536 = this.add.image(866.578125, 187, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Custom Night and Rare Screens/536");
        fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_536.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Custom_Night_and_Rare_Screens_536);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_531
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_531 = this.add.image(136, 119, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/531");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_531.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_531);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_533
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_533 = this.add.image(646, 119, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/533");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_533.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_533);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_534
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_534 = this.add.image(917, 119, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/534");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_534.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_534);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_535
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_535 = this.add.image(381, 119, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/535");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_535.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_535);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_537
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_537 = this.add.image(107, 425, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/537");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_537.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_537);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights = this.add.image(360, 425, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/537");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_1
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_1 = this.add.image(613, 425, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/537");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_1.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_1);

        // fnaf_pregame_Numbers___Nights_Camera_and_Nights_2
        const fnaf_pregame_Numbers___Nights_Camera_and_Nights_2 = this.add.image(867, 425, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/537");
        fnaf_pregame_Numbers___Nights_Camera_and_Nights_2.setOrigin(0, 0);
        customize.add(fnaf_pregame_Numbers___Nights_Camera_and_Nights_2);

        // freddyAISub
        const freddyAISub = this.add.image(105, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/542");
        freddyAISub.setOrigin(0, 0);
        customize.add(freddyAISub);

        // freddyAIAdd
        const freddyAIAdd = this.add.image(269, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/541");
        freddyAIAdd.setOrigin(0, 0);
        customize.add(freddyAIAdd);

        // freddyAI
        const freddyAI = new TextBox(this, 139, 470);
        freddyAI.text = "1";
        freddyAI.fontSize = 50;
        customize.add(freddyAI);

        // bonnieAISub
        const bonnieAISub = this.add.image(362, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/542");
        bonnieAISub.setOrigin(0, 0);
        customize.add(bonnieAISub);

        // bonnieAIAdd
        const bonnieAIAdd = this.add.image(526, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/541");
        bonnieAIAdd.setOrigin(0, 0);
        customize.add(bonnieAIAdd);

        // bonnieAI
        const bonnieAI = new TextBox(this, 396, 470);
        bonnieAI.text = "3";
        bonnieAI.fontSize = 50;
        customize.add(bonnieAI);

        // chicaAISub
        const chicaAISub = this.add.image(612, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/542");
        chicaAISub.setOrigin(0, 0);
        customize.add(chicaAISub);

        // chicaAIAdd
        const chicaAIAdd = this.add.image(776, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/541");
        chicaAIAdd.setOrigin(0, 0);
        customize.add(chicaAIAdd);

        // chicaAI
        const chicaAI = new TextBox(this, 646, 470);
        chicaAI.text = "3";
        chicaAI.fontSize = 50;
        customize.add(chicaAI);

        // foxyAISub
        const foxyAISub = this.add.image(865, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/542");
        foxyAISub.setOrigin(0, 0);
        customize.add(foxyAISub);

        // foxyAIAdd
        const foxyAIAdd = this.add.image(1029, 470, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/541");
        foxyAIAdd.setOrigin(0, 0);
        customize.add(foxyAIAdd);

        // foxyAI
        const foxyAI = new TextBox(this, 899, 470);
        foxyAI.text = "1";
        foxyAI.fontSize = 50;
        customize.add(foxyAI);

        // goldenFreddy
        const goldenFreddy = this.add.image(-70, 0, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Custom Night and Rare Screens/548");
        goldenFreddy.setOrigin(0, 0);
        goldenFreddy.visible = false;
        customize.add(goldenFreddy);

        // ad
        const ad = this.add.image(-70, 0, "fnaf-pregame", "fnaf-pregame/Static & Menu/Menu/574");
        ad.setOrigin(0, 0);
        ad.visible = false;

        // loading
        const loading = this.add.layer();
        loading.visible = false;

        // whatnight
        const whatnight = this.add.image(456.5, 270, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/453");
        whatnight.setOrigin(0, 0);
        loading.add(whatnight);

        // waitclock
        const waitclock = this.add.image(1070, 657, "fnaf-pregame", "fnaf-pregame/Numbers & Nights/Camera and Nights/482");
        waitclock.setOrigin(0, 0);
        waitclock.visible = false;
        loading.add(waitclock);

        // waitblip
        const waitblip = this.add.sprite(-70, 0, "fnaf-pregame", "fnaf-pregame/Static & Menu/Load/4");
        waitblip.setOrigin(0, 0);
        waitblip.visible = false;
        loading.add(waitblip);

        // close
        const close = this.add.image(1115, 40, "interface", "interface/promptClose0001");
        close.scaleX = 0.5;
        close.scaleY = 0.5;

        // rectangle (components)
        new InputBlocker(rectangle);

        // freddyAI (prefab fields)
        freddyAI.boxWidth = 130;
        freddyAI.boxHeight = 52;
        freddyAI.horizontalAlign = 1;
        freddyAI.verticalAlign = 1;

        // bonnieAI (prefab fields)
        bonnieAI.boxWidth = 130;
        bonnieAI.boxHeight = 52;
        bonnieAI.horizontalAlign = 1;
        bonnieAI.verticalAlign = 1;

        // chicaAI (prefab fields)
        chicaAI.boxWidth = 130;
        chicaAI.boxHeight = 52;
        chicaAI.horizontalAlign = 1;
        chicaAI.verticalAlign = 1;

        // foxyAI (prefab fields)
        foxyAI.boxWidth = 130;
        foxyAI.boxHeight = 52;
        foxyAI.horizontalAlign = 1;
        foxyAI.verticalAlign = 1;

        // goldenFreddy (components)
        new InputBlocker(goldenFreddy);

        // ad (components)
        new InputBlocker(ad);

        // close (components)
        const closeButtonComponent = new ButtonComponent(close);
        closeButtonComponent.upTexture = {"key":"interface","frame":"interface/promptClose0001"};
        closeButtonComponent.overTexture = {"key":"interface","frame":"interface/promptClose0002"};
        closeButtonComponent.downTexture = {"key":"interface","frame":"interface/promptClose0003"};
        closeButtonComponent.handCursor = true;
        closeButtonComponent.pixelPerfect = true;

        this.freddy = freddy;
        this.menustatic = menustatic;
        this.newGame = newGame;
        this.continueGame = continueGame;
        this.sixthNight = sixthNight;
        this.customNight = customNight;
        this.bar = bar;
        this.carot = carot;
        this.menublip = menublip;
        this.nightNumber = nightNumber;
        this.star1 = star1;
        this.star2 = star2;
        this.star3 = star3;
        this.menu = menu;
        this.customizeReady = customizeReady;
        this.freddyAISub = freddyAISub;
        this.freddyAIAdd = freddyAIAdd;
        this.freddyAI = freddyAI;
        this.bonnieAISub = bonnieAISub;
        this.bonnieAIAdd = bonnieAIAdd;
        this.bonnieAI = bonnieAI;
        this.chicaAISub = chicaAISub;
        this.chicaAIAdd = chicaAIAdd;
        this.chicaAI = chicaAI;
        this.foxyAISub = foxyAISub;
        this.foxyAIAdd = foxyAIAdd;
        this.foxyAI = foxyAI;
        this.goldenFreddy = goldenFreddy;
        this.customize = customize;
        this.ad = ad;
        this.whatnight = whatnight;
        this.waitclock = waitclock;
        this.waitblip = waitblip;
        this.loading = loading;
        this.close = close;

        this.events.emit("scene-awake");
    }

    public freddy!: Phaser.GameObjects.Image;
    public menustatic!: Phaser.GameObjects.Sprite;
    public newGame!: Phaser.GameObjects.Image;
    public continueGame!: Phaser.GameObjects.Image;
    public sixthNight!: Phaser.GameObjects.Image;
    public customNight!: Phaser.GameObjects.Image;
    public bar!: Phaser.GameObjects.Image;
    public carot!: Phaser.GameObjects.Image;
    public menublip!: Phaser.GameObjects.Sprite;
    public nightNumber!: Phaser.GameObjects.BitmapText;
    public star1!: Phaser.GameObjects.Image;
    public star2!: Phaser.GameObjects.Image;
    public star3!: Phaser.GameObjects.Image;
    public menu!: Phaser.GameObjects.Layer;
    public customizeReady!: Phaser.GameObjects.Image;
    public freddyAISub!: Phaser.GameObjects.Image;
    public freddyAIAdd!: Phaser.GameObjects.Image;
    public freddyAI!: TextBox;
    public bonnieAISub!: Phaser.GameObjects.Image;
    public bonnieAIAdd!: Phaser.GameObjects.Image;
    public bonnieAI!: TextBox;
    public chicaAISub!: Phaser.GameObjects.Image;
    public chicaAIAdd!: Phaser.GameObjects.Image;
    public chicaAI!: TextBox;
    public foxyAISub!: Phaser.GameObjects.Image;
    public foxyAIAdd!: Phaser.GameObjects.Image;
    public foxyAI!: TextBox;
    public goldenFreddy!: Phaser.GameObjects.Image;
    public customize!: Phaser.GameObjects.Layer;
    public ad!: Phaser.GameObjects.Image;
    public whatnight!: Phaser.GameObjects.Image;
    public waitclock!: Phaser.GameObjects.Image;
    public waitblip!: Phaser.GameObjects.Sprite;
    public loading!: Phaser.GameObjects.Layer;
    public close!: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare game: App;

    public gameData: GameConfig;
    public currentNight: number = 1;
    public beatGame: boolean = false;
    public beatSixth: boolean = false;
    public beatNightmare: boolean = false;

    public customFreddyAI: number = 1;
    public customBonnieAI: number = 3;
    public customChicaAI: number = 3;
    public customFoxyAI: number = 1;

    get world(): World {
        return this.scene.get('World') as World;
    }

    get interface(): Interface {
        return this.scene.get('Interface') as Interface;
    }

    get loadScreen(): Load {
        return this.scene.get('Load') as Load;
    }

    init(data: any): void {
        let savedNight = localStorage.getItem('fnaf-night');
        this.currentNight = savedNight ? parseInt(savedNight) : 1;

        let beatGame = localStorage.getItem('fnaf-beat-game');
        this.beatGame = beatGame ? beatGame == 'true' : false;

        let beatSixth = localStorage.getItem('fnaf-beat-sixth');
        this.beatSixth = beatSixth ? beatSixth == 'true' : false;

        let beatNightmare = localStorage.getItem('fnaf-beat-nightmare');
        this.beatNightmare = beatNightmare ? beatNightmare == 'true' : false;

        let freddyAI = localStorage.getItem('fnaf-custom-freddy-ai');
        this.customFreddyAI = freddyAI ? Math.max(Math.min(parseInt(freddyAI), 20), 0) : 1;

        let bonnieAI = localStorage.getItem('fnaf-custom-bonnie-ai');
        this.customBonnieAI = bonnieAI ? Math.max(Math.min(parseInt(bonnieAI), 20), 0) : 3;

        let chicaAI = localStorage.getItem('fnaf-custom-chica-ai');
        this.customChicaAI = chicaAI ? Math.max(Math.min(parseInt(chicaAI), 20), 0) : 3;

        let foxyAI = localStorage.getItem('fnaf-custom-foxy-ai');
        this.customFoxyAI = foxyAI ? Math.max(Math.min(parseInt(foxyAI), 20), 0) : 1;

        if (data.oninit) data.oninit(this);
    }

    create(data: any) {

        this.game.setFPSLimit(60);
        this.editorCreate();

        this.cameras.main.setZoom(1080 / 720);
        this.cameras.main.centerOn(570, 360);

        this.close.on('release', () => this.endGame(0));

        if (data.options?.level) {
            this.loadNight(data.options.level);
        } else {
            this.setupMenu();
            this.setupCustomize();
        }

        if (data.onready) data.onready(this);
        if (this.loadScreen.isShowing) this.loadScreen.hide();

        if (!data.options?.level) {
            this.sound.play('fnaf-pregame-static2');
            this.sound.play('fnaf-pregame-darkness-music', { loop: true });
            this.menublip.play('fnaf-pregame-load-animation');
        }
    }

    setupMenu(): void {
        this.nightNumber.text = Math.min(this.currentNight, 5).toString();

        this.newGame.setInteractive();
        this.newGame.on('pointerover', () => {
            let y = this.carot.y;
            this.carot.y = this.newGame.y + 5;
            if (y != this.carot.y) this.sound.play('fnaf-pregame-blip3');
        })
        this.newGame.on('pointerdown', () => {
            this.setCurrentNight(1);
            this.ad.visible = true;
            this.tweens.chain({
                targets: this.ad,
                tweens: [
                    {
                        alpha: { from: 0, to: 1 },
                        hold: 2000,
                        duration: 3000
                    },
                    {
                        alpha: { from: 1, to: 0 },
                        onStart: () => this.menu.visible = false,
                        duration: 3000
                    }
                ],
                onComplete: () => {
                    this.startNight(1);
                }
            });
        });

        this.continueGame.setInteractive();
        this.continueGame.on('pointerover', () => {
            let y = this.carot.y;
            this.carot.y = this.continueGame.y + 5;
            if (y != this.carot.y) this.sound.play('fnaf-pregame-blip3');
        })
        this.continueGame.on('pointerdown', () => {
            this.startNight(Math.min(this.currentNight, 5));
        });

        this.sixthNight.setInteractive();
        this.sixthNight.on('pointerover', () => {
            let y = this.carot.y;
            this.carot.y = this.sixthNight.y + 5;
            if (y != this.carot.y) this.sound.play('fnaf-pregame-blip3');
        });
        this.sixthNight.on('pointerdown', () => {
            this.startNight(6);
        });

        this.customNight.setInteractive();
        this.customNight.on('pointerover', () => {
            let y = this.carot.y;
            this.carot.y = this.customNight.y + 5;
            if (y != this.carot.y) this.sound.play('fnaf-pregame-blip3');
        });
        this.customNight.on('pointerdown', () => {
            this.customize.visible = true;
            this.menu.visible = false;
        });

        this.sixthNight.visible = this.beatGame;
        this.star1.visible = this.beatGame;
        this.customNight.visible = this.beatSixth;
        this.star2.visible = this.beatSixth;
        this.star3.visible = this.beatNightmare;

        this.tweens.add({
            targets: this.bar,
            y: { from: -38, to: 720 },
            duration: 7500,
            repeat: -1
        });

        this.time.addEvent({
            callback: () => {
                let value = Phaser.Math.RND.between(1, 100);
                if (value == 99) this.freddy.setFrame('fnaf-pregame/Static & Menu/Menu/440');
                else if (value == 98) this.freddy.setFrame('fnaf-pregame/Static & Menu/Menu/440');
                else if (value == 97) this.freddy.setFrame('fnaf-pregame/Static & Menu/Menu/441');
                else if (value < 97) this.freddy.setFrame('fnaf-pregame/Static & Menu/Menu/431');
            },
            delay: 80,
            repeat: -1
        });
        this.time.addEvent({
            callback: () => {
                this.freddy.alpha = Phaser.Math.RND.between(0, 100) / 100;
            },
            delay: 300,
            repeat: -1
        });
    }

    setupCustomize(): void {
        this.freddyAISub.setInteractive();
        this.freddyAISub.on('pointerdown', () => {
            this.customFreddyAI = Math.max(this.customFreddyAI - 1, 0);
            this.freddyAI.text = this.customFreddyAI.toString();
        });
        this.freddyAIAdd.setInteractive();
        this.freddyAIAdd.on('pointerdown', () => {
            this.customFreddyAI = Math.min(this.customFreddyAI + 1, 20);
            this.freddyAI.text = this.customFreddyAI.toString();
        });
        this.freddyAI.text = this.customFreddyAI.toString();

        this.bonnieAISub.setInteractive();
        this.bonnieAISub.on('pointerdown', () => {
            this.customBonnieAI = Math.max(this.customBonnieAI - 1, 0);
            this.bonnieAI.text = this.customBonnieAI.toString();
        });
        this.bonnieAIAdd.setInteractive();
        this.bonnieAIAdd.on('pointerdown', () => {
            this.customBonnieAI = Math.min(this.customBonnieAI + 1, 20);
            this.bonnieAI.text = this.customBonnieAI.toString();
        });
        this.bonnieAI.text = this.customBonnieAI.toString();

        this.chicaAISub.setInteractive();
        this.chicaAISub.on('pointerdown', () => {
            this.customChicaAI = Math.max(this.customChicaAI - 1, 0);
            this.chicaAI.text = this.customChicaAI.toString();
        });

        this.chicaAIAdd.setInteractive();
        this.chicaAIAdd.on('pointerdown', () => {
            this.customChicaAI = Math.min(this.customChicaAI + 1, 20);
            this.chicaAI.text = this.customChicaAI.toString();
        });
        this.chicaAI.text = this.customChicaAI.toString();

        this.foxyAISub.setInteractive();
        this.foxyAISub.on('pointerdown', () => {
            this.customFoxyAI = Math.max(this.customFoxyAI - 1, 0);
            this.foxyAI.text = this.customFoxyAI.toString();
        });

        this.foxyAIAdd.setInteractive();
        this.foxyAIAdd.on('pointerdown', () => {
            this.customFoxyAI = Math.min(this.customFoxyAI + 1, 20);
            this.foxyAI.text = this.customFoxyAI.toString();
        });
        this.foxyAI.text = this.customFoxyAI.toString();

        this.customizeReady.setInteractive();
        this.customizeReady.on('pointerdown', () => {
            if (this.customFreddyAI == 1 && this.customBonnieAI == 9 && this.customChicaAI == 8 && this.customFoxyAI == 7) {
                this.goldenFreddy.visible = true;
                this.sound.play('fnaf-pregame-XSCREAM2');
                this.time.delayedCall(1500, () => window.location.replace('about:blank'));
            } else {
                this.saveCustomizedNight();
                this.startNight(7);
            }
        });
    }

    startNight(night: number): void {
        this.close.visible = false;
        this.stopAllSounds();

        this.menu.visible = false;
        this.customize.visible = false;
        this.loading.visible = true;

        this.waitclock.visible = false;
        this.waitblip.visible = true;
        this.waitblip.play('fnaf-pregame-blip-animation');
        this.sound.play('fnaf-pregame-blip3');

        this.whatnight.visible = true;
        let frame: string;
        switch (night) {
            case 1:
                frame = 'fnaf-pregame/Numbers & Nights/Camera and Nights/453';
                break;
            case 2:
                frame = 'fnaf-pregame/Numbers & Nights/Camera and Nights/454';
                break;
            case 3:
                frame = 'fnaf-pregame/Numbers & Nights/Camera and Nights/472';
                break;
            case 4:
                frame = 'fnaf-pregame/Numbers & Nights/Camera and Nights/473';
                break;
            case 5:
                frame = 'fnaf-pregame/Numbers & Nights/Camera and Nights/474';
                break;
            case 6:
                frame = 'fnaf-pregame/Numbers & Nights/Camera and Nights/446';
                break;
            default:
                frame = 'fnaf-pregame/Numbers & Nights/Camera and Nights/538';
                break;
        }
        this.whatnight.setFrame(frame);

        this.tweens.add({
            targets: this.whatnight,
            alpha: { from: 1, to: 0 },
            onComplete: () => {
                this.waitclock.visible = true;
                this.close.visible = false;
                this.loadNight(night);
            },
            delay: 3000,
            duration: 1500
        });
    }

    loadNight(night: number): void {
        this.close.visible = false;

        let freddyAI: number;
        let bonnieAI: number;
        let chicaAI: number;
        let foxyAI: number;

        switch (night) {
            case 1:
                freddyAI = 0;
                bonnieAI = 0;
                chicaAI = 0;
                foxyAI = 0;
                break;
            case 2:
                freddyAI = 0;
                bonnieAI = 3;
                chicaAI = 1;
                foxyAI = 1;
                break;
            case 3:
                freddyAI = 1;
                bonnieAI = 0;
                chicaAI = 5;
                foxyAI = 2;
                break;
            case 4:
                freddyAI = Phaser.Math.RND.between(1, 2);
                bonnieAI = 2;
                chicaAI = 4;
                foxyAI = 6;
                break;
            case 5:
                freddyAI = 3;
                bonnieAI = 5;
                chicaAI = 7;
                foxyAI = 5;
                break;
            case 6:
                freddyAI = 4;
                bonnieAI = 10;
                chicaAI = 12;
                foxyAI = 16;
                break;
            default:
                freddyAI = parseInt(this.freddyAI.text);
                bonnieAI = parseInt(this.bonnieAI.text);;
                chicaAI = parseInt(this.chicaAI.text);
                foxyAI = parseInt(this.foxyAI.text);
                break;
        }

        this.scene.add('FNAFNight', FNAFNight, true, { night, game: this, freddyAI, bonnieAI, chicaAI, foxyAI });
    }

    saveCustomizedNight(): void {
        localStorage.setItem('fnaf-custom-freddy-ai', this.customFreddyAI.toString());
        localStorage.setItem('fnaf-custom-bonnie-ai', this.customBonnieAI.toString());
        localStorage.setItem('fnaf-custom-chica-ai', this.customChicaAI.toString());
        localStorage.setItem('fnaf-custom-foxy-ai', this.customFoxyAI.toString());
    }

    setCurrentNight(night: number): void {
        this.currentNight = night;
        localStorage.setItem('fnaf-night', Math.min(Math.max(night, 1), 5).toString());
    }

    setBeatGame(beat: boolean): void {
        this.beatGame = beat;
        localStorage.setItem('fnaf-beat-game', beat.toString());
    }

    setBeatSixth(beat: boolean): void {
        this.beatSixth = beat;
        localStorage.setItem('fnaf-beat-sixth', beat.toString());
    }

    setBeatNightmare(beat: boolean): void {
        this.beatNightmare = beat;
        localStorage.setItem('fnaf-beat-nightmare', beat.toString());
    }

    endGame(score: number, night = 0, didWin = false): void {
        if (night > 0 && didWin) {
            if (night < 5) {
                this.setCurrentNight(night + 1);
            } else if (night == 5) {
                this.setBeatGame(true);
            } else if (night == 6) {
                this.setBeatSixth(true);
            } else if (night == 7 && this.customFreddyAI == 20 && this.customBonnieAI == 20 && this.customChicaAI == 20 && this.customFoxyAI == 20) {
                this.setBeatNightmare(true);
            }
        }

        this.world.endGame(score);
    }

    stopAllSounds(): void {
        for (let sound of this.sound.getAllPlaying()) {
            if (sound.key.startsWith('fnaf-')) sound.destroy();
        }
    }

    beforeUnload?(engine: Engine): void {
        this.stopAllSounds();
        this.input.setGlobalTopOnly(true);
        this.scene.remove('FNAFNight');
        this.scene.remove('FNAFUI');
    }

    unload?(engine: Engine): void {
        engine.app.unloadAssetPack('fnaf-pregame-pack');
        engine.app.unloadAssetPack('fnaf-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
