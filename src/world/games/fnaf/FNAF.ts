export enum Location {
    OFFICE = 0,
    OUTSIDE_OFFICE,
    BACKSTAGE,
    DINING_HALL,
    KITCHEN,
    EAST_HALL_CORNER,
    EAST_HALL,
    PIRATE_COVE,
    RESTROOMS,
    SHOW_STAGE,
    SUPPLY_CLOSET,
    WEST_HALL_CORNER,
    WEST_HALL,
}

class Animatronic {
    public game: FNAF;

    public location: Location;
    public name: string;
    public value: number;
    public state: number;

    public mo: Phaser.Time.TimerEvent;
    public movementTime: number;

    constructor(game: FNAF, location: Location, name: string, value: number) {
        this.game = game;

        this.location = location;
        this.name = name;
        this.value = value;
        this.movementTime = 1000;
        this.state = 0;
    }

    startMoving(): void {
        this.stopMoving();
        this.mo = this.game.time.addEvent({
            callback: this.move,
            callbackScope: this,
            loop: true,
            delay: this.movementTime
        });
    }

    get isMoving(): boolean {
        return this.mo != undefined;
    }

    stopMoving(): void {
        if (this.mo) {
            this.mo.remove();
            this.mo = undefined;
        }
    }

    hasMovementChance(): boolean {
        let rng = Phaser.Math.RND.between(1, 20);
        logger.info(`[${this.name}] RNG: ${rng} <= ${this.value} = ${rng <= this.value}`);
        return rng <= this.value;
    }

    computeMove(): Location {
        return this.location;
    }

    move(): void {
        if (this.hasMovementChance) this.location = this.computeMove();
    }

    reset(): void {

    }
};

class Freddy extends Animatronic {
    constructor(game: FNAF, location: Location, value: number) {
        super(game, location, 'Freddy', value);
        this.movementTime = 3020;
    }

    computeMove(): Location {
        switch (this.location) {
            case Location.SHOW_STAGE:
                if (this.game.bonnie.location != Location.SHOW_STAGE && this.game.chica.location != Location.SHOW_STAGE) return Location.DINING_HALL;
                else return Location.SHOW_STAGE;
            case Location.DINING_HALL:
                return Phaser.Math.RND.pick([ Location.EAST_HALL, Location.RESTROOMS, Location.KITCHEN ]);
            case Location.EAST_HALL:
                return Location.EAST_HALL_CORNER;
            case Location.EAST_HALL_CORNER:
                return Location.OFFICE;
            default:
                return Location.OFFICE;
        }
    }

    canMove(): boolean {
        return this.hasMovementChance() && !this.lookingAtMe();
    }

    lookingAtMe(): boolean {
        return this.game.currentCamera == Location.EAST_HALL_CORNER;
    }

    move(): void {
        if (this.canMove()) {
            let lastLocation = this.location;
            this.location = this.computeMove();
            if (this.location != lastLocation) {
                this.game.sound.play('fnaf-deep-steps');
                this.game.sound.play(Phaser.Math.RND.pick(['fnaf-Laugh_Giggle_Girl_1d', 'fnaf-Laugh_Giggle_Girl_2d', 'fnaf-Laugh_Giggle_Girl_8d']));
            }
            this.game.updateFrame();
        }
    }

    reset(): void {
        this.location = Location.DINING_HALL;
    }
}

class Bonnie extends Animatronic {
    constructor(game: FNAF, location: Location, value: number) {
        super(game, location, 'Bonnie', value);
        this.movementTime = 4970;
    }

    computeMove(): Location {
        switch (this.location) {
            case Location.SHOW_STAGE:
                return Location.DINING_HALL;
            case Location.DINING_HALL:
                return Phaser.Math.RND.pick([ Location.WEST_HALL, Location.BACKSTAGE ]);
            case Location.BACKSTAGE:
                return Location.DINING_HALL;
            case Location.WEST_HALL:
                return Phaser.Math.RND.pick([ Location.WEST_HALL_CORNER, Location.SUPPLY_CLOSET]);
            case Location.WEST_HALL_CORNER:
                return Location.OUTSIDE_OFFICE;
            default:
                return Location.OFFICE;
        }
    }

    canMove(): boolean {
        return this.hasMovementChance();
    }

    move(): void {
        if (this.canMove()) {
            let lastLocation = this.location;
            this.location = this.computeMove();
            if (this.location == Location.DINING_HALL) this.state = Phaser.Math.RND.between(0, 1);
            if (this.location != lastLocation) this.game.sound.play('fnaf-deep-steps');
            if (this.location == Location.OFFICE) {
                if (!this.game.rightDoorClosed) this.game.showJumpscare(this);
                else {
                    this.game.sound.play('fnaf-deep-steps');
                    this.reset();
                }
            }
            if (this.location == this.game.currentCamera || lastLocation == this.game.currentCamera) this.game.breakCameras();
            this.game.updateFrame();
        }
    }

    reset(): void {
        this.location = Location.DINING_HALL;
    }
}

class Chica extends Animatronic {
    constructor(game: FNAF, location: Location, value: number) {
        super(game, location, 'Chica', value);
        this.movementTime = 4980;
    }

    computeMove(): Location {
        switch (this.location) {
            case Location.SHOW_STAGE:
                return Location.DINING_HALL;
            case Location.DINING_HALL:
                return Phaser.Math.RND.pick([ Location.EAST_HALL, Location.RESTROOMS, Location.KITCHEN ]);
            case Location.RESTROOMS:
                return Phaser.Math.RND.pick([ Location.DINING_HALL, Location.KITCHEN ]);
            case Location.KITCHEN:
                return Phaser.Math.RND.pick([ Location.EAST_HALL, Location.DINING_HALL ]);
            case Location.EAST_HALL:
                return Location.EAST_HALL_CORNER;
            case Location.EAST_HALL_CORNER:
                return Location.OUTSIDE_OFFICE;
            default:
                return Location.OFFICE;
        }
    }

    canMove(): boolean {
        return this.hasMovementChance();
    }

    move(): void {
        if (this.canMove()) {
            let lastLocation = this.location;
            this.location = this.computeMove();
            if (this.location == Location.DINING_HALL || this.location == Location.RESTROOMS || this.location == Location.EAST_HALL) this.state = Phaser.Math.RND.between(0, 1);
            if (this.location != lastLocation) this.game.sound.play('fnaf-deep-steps');
            if (this.location == Location.OFFICE) {
                if (!this.game.rightDoorClosed) this.game.showJumpscare(this);
                else {
                    this.game.sound.play('fnaf-deep-steps');
                    this.reset();
                }
            }
            if (this.location == this.game.currentCamera || lastLocation == this.game.currentCamera) this.game.breakCameras();
            this.game.updateFrame();
        }
    }

    reset(): void {
        this.location = Location.DINING_HALL;
    }
}

class Foxy extends Animatronic {
    public state: number;

    constructor(game: FNAF, location: Location, value: number) {
        super(game, location, 'Foxy', value);
        this.movementTime = 5010;
        this.state = 0;
    }

    computeMove(): Location {
        if (this.state < 3) {
            return Location.PIRATE_COVE;
        } else if (this.state == 3) {
            return Location.WEST_HALL;
        } else {
            return Location.OFFICE;
        }
    }

    canMove(): boolean {
        return this.hasMovementChance() && !this.game.lookingAtCameras;
    }

    move(): void {
        if (this.canMove()) this.doMove();
    }

    doMove(): void {
        let lastLocation = this.location;
        this.location = this.computeMove();
        this.state++;

        this.game.updateFrame();
        if (this.location == Location.OFFICE) {
            if (!this.game.leftDoorClosed) this.game.showJumpscare(this);
            else {
                this.game.sound.play('fnaf-knock2');
                this.reset();
            }
        } else if (this.location != lastLocation && this.location == Location.WEST_HALL) this.game.foxyRun();
    }

    reset(): void {
        this.state = 0;
        this.location = Location.PIRATE_COVE;
    }
}

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { GameConfig } from "@clubpenguin/app/config";
import Load from "@clubpenguin/load/Load";
import { Engine, Game } from "@clubpenguin/world/engine/engine";
import World from "@clubpenguin/world/World";
import FNAF_UI from "./FNAF_UI";
import { getLogger } from "@clubpenguin/lib/log";

let logger = getLogger("CP.FNAF");
/* END-USER-IMPORTS */

export default class FNAF extends Phaser.Scene implements Game {

    constructor() {
        super("FNAF");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("fnaf-pack", "assets/world/games/2013/fnaf/fnaf-pack.json");
    }

    editorCreate(): void {

        // rectangle_1
        const rectangle_1 = this.add.rectangle(0, 0, 1600, 720);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.isFilled = true;
        rectangle_1.fillColor = 0;

        // office
        const office = this.add.sprite(0, 0, "fnaf", "fnaf/Office/Office Inside/227");
        office.setOrigin(0, 0);

        // officeView
        const officeView = this.add.layer();

        // rightDoor
        const rightDoor = this.add.sprite(1273, 0, "fnaf", "fnaf/Office/Door & Lights/R. Door/0");
        rightDoor.setOrigin(0, 0);
        officeView.add(rightDoor);

        // leftDoor
        const leftDoor = this.add.sprite(70, 0, "fnaf", "fnaf/Office/Door & Lights/L. Door/0");
        leftDoor.setOrigin(0, 0);
        officeView.add(leftDoor);

        // fan
        const fan = this.add.sprite(780, 303, "fnaf", "fnaf/Office/Fan/57");
        fan.setOrigin(0, 0);
        fan.play("fnaf-fan-animation");
        officeView.add(fan);

        // officeScroller
        const officeScroller = this.add.image(800, 360, "_MISSING");
        officeScroller.visible = false;
        officeView.add(officeScroller);

        // cameraScroller
        const cameraScroller = this.add.image(570, 360, "_MISSING");
        cameraScroller.visible = false;
        officeView.add(cameraScroller);

        // leftButtons
        const leftButtons = this.add.image(-1, 270, "fnaf", "fnaf/Office/Door & Lights/L. Light/122");
        leftButtons.setOrigin(0, 0);
        officeView.add(leftButtons);

        // rightButtons
        const rightButtons = this.add.image(1498, 270, "fnaf", "fnaf/Office/Door & Lights/R. Light/134");
        rightButtons.setOrigin(0, 0);
        officeView.add(rightButtons);

        // leftDoorButton
        const leftDoorButton = this.add.rectangle(51, 351, 64, 64);
        leftDoorButton.alpha = 0.01;
        leftDoorButton.isFilled = true;
        officeView.add(leftDoorButton);

        // leftLightButton
        const leftLightButton = this.add.rectangle(50, 431, 64, 64);
        leftLightButton.alpha = 0.01;
        leftLightButton.isFilled = true;
        officeView.add(leftLightButton);

        // rightDoorButton
        const rightDoorButton = this.add.rectangle(1544, 353, 64, 64);
        rightDoorButton.alpha = 0.01;
        rightDoorButton.isFilled = true;
        officeView.add(rightDoorButton);

        // rightLightButton
        const rightLightButton = this.add.rectangle(1543, 433, 64, 64);
        rightLightButton.alpha = 0.01;
        rightLightButton.isFilled = true;
        officeView.add(rightLightButton);

        // boop
        const boop = this.add.rectangle(680, 244, 16, 16);
        boop.alpha = 0.01;
        boop.isFilled = true;
        officeView.add(boop);

        // cameraView
        const cameraView = this.add.layer();

        this.office = office;
        this.rightDoor = rightDoor;
        this.leftDoor = leftDoor;
        this.fan = fan;
        this.officeScroller = officeScroller;
        this.cameraScroller = cameraScroller;
        this.leftButtons = leftButtons;
        this.rightButtons = rightButtons;
        this.leftDoorButton = leftDoorButton;
        this.leftLightButton = leftLightButton;
        this.rightDoorButton = rightDoorButton;
        this.rightLightButton = rightLightButton;
        this.boop = boop;
        this.officeView = officeView;
        this.cameraView = cameraView;

        this.events.emit("scene-awake");
    }

    public office!: Phaser.GameObjects.Sprite;
    public rightDoor!: Phaser.GameObjects.Sprite;
    public leftDoor!: Phaser.GameObjects.Sprite;
    public fan!: Phaser.GameObjects.Sprite;
    public officeScroller!: Phaser.GameObjects.Image;
    public cameraScroller!: Phaser.GameObjects.Image;
    public leftButtons!: Phaser.GameObjects.Image;
    public rightButtons!: Phaser.GameObjects.Image;
    public leftDoorButton!: Phaser.GameObjects.Rectangle;
    public leftLightButton!: Phaser.GameObjects.Rectangle;
    public rightDoorButton!: Phaser.GameObjects.Rectangle;
    public rightLightButton!: Phaser.GameObjects.Rectangle;
    public boop!: Phaser.GameObjects.Rectangle;
    public officeView!: Phaser.GameObjects.Layer;
    public cameraView!: Phaser.GameObjects.Layer;

    /* START-USER-CODE */

    declare game: App;

    public gameData: GameConfig;
    public clock: Phaser.Time.TimerEvent;
    public mo: Phaser.Time.TimerEvent;
    public currentNight = 1;
    public currentHour = 0;
    public power = 100;
    public currentCamera: Location = Location.SHOW_STAGE;
    public powerDecreaseRate = 0.125;

    public lookingAtCameras = false;
    public isGameLocked = false;

    public lightBlinking = true;
    public westHallLight = true;
    public leftDoorLight = false;
    public leftDoorClosed = false;
    public rightDoorLight = false;
    public rightDoorClosed = false;
    public leftScare = false;
    public rightScare = false;
    public foxyRunning = false;

    public freddy: Freddy;
    public bonnie: Bonnie;
    public chica: Chica;
    public foxy: Foxy;

    get loadScreen(): Load {
        return this.scene.get('Load') as Load;
    }

    get world(): World {
        return this.scene.get('World') as World;
    }

    init(data: any): void {
        this.scene.moveBelow('Interface');

        this.currentNight = 5//Phaser.Math.RND.between(1, 6);

        let freddyAI: number;
        let bonnieAI: number;
        let chicaAI: number;
        let foxyAI: number;

        switch (this.currentNight) {
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
                freddyAI = 20;
                bonnieAI = 20;
                chicaAI = 20;
                foxyAI = 20;
                break;
        }

        this.freddy = new Freddy(this, Location.SHOW_STAGE, freddyAI);
        this.bonnie = new Bonnie(this, Location.SHOW_STAGE, bonnieAI);
        this.chica = new Chica(this, Location.SHOW_STAGE, chicaAI);
        this.foxy = new Foxy(this, Location.PIRATE_COVE, foxyAI);

        if (data.oninit) data.oninit(this);
    }

    create(data: any) {
        this.input.setGlobalTopOnly(false);
        this.scene.add('FNAF_UI', FNAF_UI, true, { game: this });

        this.editorCreate();

        this.leftDoorButton.setInteractive();
        this.leftDoorButton.on('pointerdown', () => this.toggleLeftDoor());

        this.leftLightButton.setInteractive();
        this.leftLightButton.on('pointerdown', () => this.toggleLeftLight());

        this.rightDoorButton.setInteractive();
        this.rightDoorButton.on('pointerdown', () => this.toggleRightDoor());

        this.rightLightButton.setInteractive();
        this.rightLightButton.on('pointerdown', () => this.toggleRightLight());

        this.boop.setInteractive();
        this.boop.on('pointerdown', () => this.sound.play('fnaf-PartyFavorraspyPart_AC01__3'));

        this.cameras.main.setZoom(1080 / 720);

        this.sound.play('fnaf-ambience2', { loop: true });
        this.sound.play('fnaf-ColdPresc B', { loop: true, volume: 0.5 });
        this.sound.play('fnaf-EerieAmbienceLargeSca_MV005', { loop: true });
        this.sound.play('fnaf-Buzz_Fan_Florescent2', { loop: true });
        this.sound.play('fnaf-BallastHumMedium2', { loop: true });

        this.showOffice();

        this.clock = this.time.addEvent({
            callback: this.tick,
            callbackScope: this,
            loop: true,
            delay: 1000 * 60
        });

        this.freddy.startMoving();
        this.bonnie.startMoving();
        this.chica.startMoving();
        this.foxy.startMoving();

        this.tweens.add({
            targets: this.cameraScroller,
            x: { from: 570, to: 1030 },
            duration: 5000,
            yoyo: true,
            hold: 2500,
            repeatDelay: 2500,
            repeat: -1
        });

        if (data.onready) data.onready(this);
        if (this.loadScreen.isShowing) this.loadScreen.hide();
    }

    get powerUsage(): number {
        return 1 + (this.leftDoorClosed ? 1 : 0) + (this.rightDoorClosed ? 1 : 0) + (this.lookingAtCameras ? 1 : 0) + (this.leftDoorLight ? 1 : 0) + (this.rightDoorLight ? 1 : 0);
    }

    updateFrame(): void {
        if (this.isGameLocked) return;
        let frame: string;
        if (this.lookingAtCameras) {
            if (this.camerasBroken) {
                this.office.visible = false;
                return;
            } else this.office.visible = true;

            switch (this.currentCamera) {
                case Location.SHOW_STAGE:
                    if (this.bonnie.location == Location.SHOW_STAGE && this.chica.location == Location.SHOW_STAGE) frame = "fnaf/Locations/Show Stage/19";
                    else if (this.bonnie.location == Location.SHOW_STAGE) frame = "fnaf/Locations/Show Stage/223";
                    else if (this.chica.location == Location.SHOW_STAGE) frame = "fnaf/Locations/Show Stage/68";
                    else if (this.freddy.location == Location.SHOW_STAGE) {
                        frame = "fnaf/Locations/Show Stage/224";
                    } else frame = "fnaf/Locations/Show Stage/484";
                    break;
                case Location.DINING_HALL:
                    if (this.chica.location == Location.DINING_HALL) {
                        if (this.chica.state == 0) frame = "fnaf/Locations/Dining Hall/215";
                        else frame = "fnaf/Locations/Dining Hall/222";
                    } else if (this.bonnie.location == Location.DINING_HALL) {
                        if (this.bonnie.state == 0) frame = "fnaf/Locations/Dining Hall/90";
                        else frame = "fnaf/Locations/Dining Hall/120";
                    } else if (this.freddy.location == Location.DINING_HALL) frame = "fnaf/Locations/Dining Hall/492";
                    else frame = "fnaf/Locations/Dining Hall/48";
                    break;
                case Location.BACKSTAGE:
                    if (this.bonnie.location == Location.BACKSTAGE) {
                        if (this.backstageSecret) frame = "fnaf/Locations/Backstage/555";
                        else frame = "fnaf/Locations/Backstage/205";
                    } else if (this.backstageSecret) frame = "fnaf/Locations/Backstage/354";
                    else frame = "fnaf/Locations/Backstage/83";
                    break;
                case Location.KITCHEN:
                    this.office.visible = false;
                    return;
                case Location.RESTROOMS:
                    if (this.chica.location == Location.RESTROOMS) {
                        if (this.chica.state == 0) frame = "fnaf/Locations/Restrooms/217";
                        else frame = "fnaf/Locations/Restrooms/219";
                    } else if (this.freddy.location == Location.RESTROOMS) frame = "fnaf/Locations/Restrooms/494";
                    else frame = "fnaf/Locations/Restrooms/41";
                    break;
                case Location.PIRATE_COVE:
                    if (this.foxy.location == Location.PIRATE_COVE && this.foxy.state < 3) {
                        if (this.foxy.state == 0) frame = "fnaf/Locations/Pirate Cove/66";
                        else if (this.foxy.state == 1) frame = "fnaf/Locations/Pirate Cove/211";
                        else if (this.foxy.state == 2) frame = "fnaf/Locations/Pirate Cove/338";
                    } else if (this.pirateCoveSecret) frame = "fnaf/Locations/Pirate Cove/553";
                    else frame = "fnaf/Locations/Pirate Cove/240";
                    break;
                case Location.EAST_HALL:
                    if (this.chica.location == Location.EAST_HALL) {
                        if (this.chica.state == 0) frame = "fnaf/Locations/East Hall/221";
                        else frame = "fnaf/Locations/East Hall/226";
                    } else if (this.freddy.location == Location.EAST_HALL) frame = "fnaf/Locations/East Hall/487";
                    else if (this.eastHallSecret1) frame = "fnaf/Locations/East Hall/554";
                    else if (this.eastHallSecret2) frame = "fnaf/Locations/East Hall/546";
                    else frame = "fnaf/Locations/East Hall/67";
                    break;
                case Location.EAST_HALL_CORNER:
                    if (this.freddy.location == Location.EAST_HALL_CORNER) frame = "fnaf/Locations/E. Hall Corner/486";
                    else if (this.chica.location == Location.EAST_HALL_CORNER) {
                        if (this.chica.state == 0) frame = "fnaf/Locations/E. Hall Corner/451";
                        else if (this.chica.state == 1) frame = "fnaf/Locations/E. Hall Corner/476";
                        else frame = "fnaf/Locations/E. Hall Corner/220";
                    } else frame = "fnaf/Locations/E. Hall Corner/49";
                    break;
                case Location.WEST_HALL:
                    if (this.foxyRunning) {
                        if (!this.office.anims.isPlaying) this.office.play('fnaf-foxyrunning-animation');
                        return;
                    }
                    if (this.westHallLight) {
                        if (this.bonnie.location == Location.WEST_HALL) frame = "fnaf/Locations/West Hall/206";
                        else frame = "fnaf/Locations/West Hall/44";
                    } else frame = "fnaf/Locations/West Hall/43";
                    break;
                case Location.SUPPLY_CLOSET:
                    if (this.bonnie.location == Location.SUPPLY_CLOSET) frame = "fnaf/Locations/Supply Closet/190";
                    else frame = "fnaf/Locations/Supply Closet/62";
                    break;
                case Location.WEST_HALL_CORNER:
                    if (this.bonnie.location == Location.WEST_HALL_CORNER) {
                        if (this.bonnie.state == 0) frame = "fnaf/Locations/W. Hall Corner/478";
                        else if (this.bonnie.state == 1) frame = "fnaf/Locations/W. Hall Corner/479";
                        else frame = "fnaf/Locations/W. Hall Corner/188";
                    } else if (this.westHallCornerSecret) frame = "fnaf/Locations/W. Hall Corner/571";
                    else frame = "fnaf/Locations/W. Hall Corner/0";
                    break;
            }
        } else {
            this.office.visible = true;

            if (this.power > 0) {
                frame = "fnaf/Office/Office Inside/39";

                if (this.leftDoorLight && this.lightBlinking) {
                    if (this.bonnie.location == Location.OUTSIDE_OFFICE) frame = "fnaf/Office/Office Inside/225";
                    else frame = "fnaf/Office/Office Inside/58";
                }
                if (this.rightDoorLight && this.lightBlinking) {
                    if (this.chica.location == Location.OUTSIDE_OFFICE) frame = "fnaf/Office/Office Inside/227";
                    else frame = "fnaf/Office/Office Inside/127";
                }

                let leftButtonsFrame: string;

                if (this.leftDoorClosed && this.leftDoorLight) leftButtonsFrame = "fnaf/Office/Door & Lights/L. Light/130";
                else if (this.leftDoorClosed) leftButtonsFrame = "fnaf/Office/Door & Lights/L. Light/124";
                else if (this.leftDoorLight) leftButtonsFrame = "fnaf/Office/Door & Lights/L. Light/125";
                else leftButtonsFrame = "fnaf/Office/Door & Lights/L. Light/122";

                this.leftButtons.setFrame(leftButtonsFrame);
                this.leftButtons.visible = true;

                let rightButtonsFrame: string;

                if (this.rightDoorClosed && this.rightDoorLight) rightButtonsFrame = "fnaf/Office/Door & Lights/R. Light/47";
                else if (this.rightDoorClosed) rightButtonsFrame = "fnaf/Office/Door & Lights/R. Light/135";
                else if (this.rightDoorLight) rightButtonsFrame = "fnaf/Office/Door & Lights/R. Light/131";
                else rightButtonsFrame = "fnaf/Office/Door & Lights/R. Light/134";

                this.rightButtons.setFrame(rightButtonsFrame);
                this.rightButtons.visible = true;

                this.fan.visible = true;

            } else {
                frame = "fnaf/Office/Office Inside/304";
                this.fan.visible = false;
                this.leftButtons.visible = false;
                this.rightButtons.visible = false;
            }
        }

        this.office.stop();
        this.office.setFrame(frame);
    }

    showOffice(): void {
        let fan = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-Buzz_Fan_Florescent2');
        if (fan) fan.volume = 0.25;

        this.officeView.visible = true;
        this.cameraView.visible = false;
        this.cameras.main.stopFollow();
        this.cameras.main.startFollow(this.officeScroller);
        this.lookingAtCameras = false;
        this.updateFrame();
        this.sound.stopByKey('fnaf-MiniDV_Tape_Eject_1');

        this.events.emit('camera:state', this.lookingAtCameras);
    }

    public backstageSecret = false;
    public pirateCoveSecret = false;
    public eastHallSecret1 = false;
    public eastHallSecret2 = false;
    public westHallCornerSecret = false;

    calculateSecretChance(): void {
        this.backstageSecret = Phaser.Math.RND.weightedPick([false, false, false, false, false, true]);
        this.pirateCoveSecret = Phaser.Math.RND.weightedPick([false, false, false, false, false, true]);
        this.eastHallSecret1 = Phaser.Math.RND.weightedPick([false, false, false, false, false, false, true]);
        this.eastHallSecret2 = Phaser.Math.RND.weightedPick([false, false, false, false, false, false, true]);
        this.westHallCornerSecret = Phaser.Math.RND.weightedPick([false, false, false, false, false, true]);
    }

    showCameras(): void {
        let fan = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-Buzz_Fan_Florescent2');
        if (fan) fan.volume = 0.1;
        if (this.lookingAtCameras) return this.updateFrame();

        this.officeView.visible = false;
        this.cameraView.visible = true;
        this.cameras.main.stopFollow();
        this.cameras.main.startFollow(this.cameraScroller);
        this.lookingAtCameras = true;
        this.calculateSecretChance();
        this.updateFrame();
        if (!this.sound.isPlaying('fnaf-MiniDV_Tape_Eject_1')) this.sound.play('fnaf-MiniDV_Tape_Eject_1', { loop: true });

        this.events.emit('camera:state', this.lookingAtCameras);
    }

    changeCamera(location: Location): void {
        this.currentCamera = location;
        this.updateFrame();
        this.events.emit('camera:change', this.currentCamera);
    }

    public camerasBroken = false;

    breakCameras(): void {

    }

    openLeftDoor(): void {
        if (!this.leftDoorClosed || this.leftDoor.anims.isPlaying) return;

        this.leftDoorClosed = false;
        this.updateFrame();

        this.leftDoor.playReverse('fnaf-leftdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');
    }

    closeLeftDoor(): void {
        if (this.leftDoorClosed || this.leftDoor.anims.isPlaying) return;

        this.leftDoorClosed = true;
        this.updateFrame();

        this.leftDoor.play('fnaf-leftdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');
    }

    toggleLeftDoor(): void {
        if (this.power <= 0) return;

        if (this.leftDoorClosed) this.openLeftDoor();
        else this.closeLeftDoor();
    }

    openRightDoor(): void {
        if (!this.rightDoorClosed || this.rightDoor.anims.isPlaying) return;

        this.rightDoorClosed = false;
        this.updateFrame();

        this.rightDoor.playReverse('fnaf-rightdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');

        this.events.emit('usage:update', this.powerUsage);
    }

    closeRightDoor(): void {
        if (this.rightDoorClosed || this.rightDoor.anims.isPlaying) return;

        this.rightDoorClosed = true;
        this.updateFrame();

        this.rightDoor.play('fnaf-rightdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');

        this.events.emit('usage:update', this.powerUsage);
    }

    toggleRightDoor(): void {
        if (this.power <= 0) return;

        if (this.rightDoorClosed) this.openRightDoor();
        else this.closeRightDoor();
    }

    toggleLeftLight(): void {
        if (this.power <= 0) return;

        this.rightDoorLight = false;
        this.leftDoorLight = !this.leftDoorLight;
        this.lightBlinking = true;
        this.updateFrame();

        this.events.emit('usage:update', this.powerUsage);
    }

    toggleRightLight(): void {
        if (this.power <= 0) return;

        this.leftDoorLight = false;
        this.rightDoorLight = !this.rightDoorLight;
        this.lightBlinking = true;
        this.updateFrame();

        this.events.emit('usage:update', this.powerUsage);
    }

    showJumpscare(animatronic: Animatronic): void {
        if (this.isGameLocked) return;
        this.showOffice();
        this.updateFrame();

        this.isGameLocked = true;
        this.leftDoor.visible = false;
        this.rightDoor.visible = false;
        this.leftButtons.visible = false;
        this.rightButtons.visible = false;
        this.fan.visible = false;

        this.freddy.stopMoving();
        this.bonnie.stopMoving();
        this.chica.stopMoving();
        this.foxy.stopMoving();

        this.events.emit('jumpscare:show', animatronic);

        if (animatronic == this.foxy) {
            this.sound.play('fnaf-XSCREAM');
            this.office.play('fnaf-foxyjumpscare-animation');
            this.officeScroller.setPosition(570, 360);
        } else if (animatronic == this.bonnie) {
            this.sound.play('fnaf-XSCREAM');
            this.office.play('fnaf-bonniejumpscare-animation');
            this.officeScroller.setPosition(800, 360);
        } else if (animatronic == this.chica) {
            this.sound.play('fnaf-XSCREAM');
            this.office.play('fnaf-chicajumpscare-animation');
            this.officeScroller.setPosition(800, 360);
        } else if (animatronic == this.freddy) {
            this.sound.play('fnaf-XSCREAM');
            if (this.power <= 0) {
                this.office.visible = true;
                this.office.play('fnaf-freddyjumpscare-animation');
            } else this.office.play('fnaf-freddypeekaboojumpscare-animation');
            this.officeScroller.setPosition(800, 360);
        }

        this.time.delayedCall(2000, () => this.endGame());
    }

    tick(): void {
        this.currentHour++;

        switch (this.currentHour) {
            case 2:
                this.bonnie.value++;
                break;
            case 3:
                this.bonnie.value++;
                this.chica.value++;
                this.foxy.value++;
                break;
            case 4:
                this.bonnie.value++;
                this.chica.value++;
                this.foxy.value++;
                break;
        }

        this.events.emit('hour:update', this.currentHour);
    }

    update(time: number, delta: number): void {
        let light = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-BallastHumMedium2');
        if (this.leftDoorLight || this.rightDoorLight) {
            this.lightBlinking = Phaser.Math.RND.weightedPick([true, true, true, false]);
            if (light) light.volume = this.lightBlinking ? 1 : 0;
            this.updateFrame();
        } else if (!this.leftDoorLight && !this.rightDoorLight && light) light.volume = 0; 

        if (this.lookingAtCameras) {
            if (this.currentCamera == Location.EAST_HALL_CORNER && this.chica.location == Location.EAST_HALL_CORNER) {
                this.chica.state = Phaser.Math.RND.between(0, 2);
                this.updateFrame();
            } else if (this.currentCamera == Location.WEST_HALL_CORNER && this.bonnie.location == Location.WEST_HALL_CORNER) {
                this.bonnie.state = Phaser.Math.RND.between(0, 2);
                this.updateFrame();
            } else if (this.currentCamera == Location.WEST_HALL) {
                this.westHallLight = Phaser.Math.RND.weightedPick([true, false]);
                this.updateFrame();
            }
        }

        if (this.power > 0 && !this.isGameLocked) {
            this.power -= this.powerUsage * (delta / 1000) * this.powerDecreaseRate;
            if (this.power <= 0) this.powerOut();
            this.events.emit('power:update', this.power);
        }
    }

    foxyRun(): void {
        this.sound.play('fnaf-run');
        this.foxyRunning = true;
        this.time.delayedCall(1500, () => {
            this.foxy.stopMoving();
            this.foxy.doMove();
            if (!this.isGameLocked) this.foxy.startMoving();
        });
        this.updateFrame();
    }

    powerOut(): void {
        this.isGameLocked = true;
        this.showOffice();

        this.openLeftDoor();
        this.openRightDoor();
        this.leftDoorLight = false;
        this.rightDoorLight = false;

        this.freddy.stopMoving();
        this.bonnie.stopMoving();
        this.chica.stopMoving();
        this.foxy.stopMoving();

        this.updateFrame();

        this.sound.stopByKey('fnaf-Buzz_Fan_Florescent2');
        this.sound.play('fnaf-powerdown');
    }

    endGame(): void {
        this.input.setGlobalTopOnly(true);

        this.freddy.stopMoving();
        this.bonnie.stopMoving();
        this.chica.stopMoving();
        this.foxy.stopMoving();
        this.clock.remove(false);

        let score = 100 * this.currentHour;
        if (this.currentHour == 6) score += 200;
        score *= 1 + (this.currentNight / 5);
        this.world.endGame(score);
    }

    beforeUnload(engine: Engine): void {
        for (let sound of this.sound.getAllPlaying()) {
            if (sound.key.startsWith('fnaf-')) sound.stop();
            console.log(sound.key);
        }
        this.input.setGlobalTopOnly(true);
        this.scene.remove('FNAF_UI');
    }

    unload(engine: Engine): void {
        engine.app.unloadAssetPack('fnaf-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
