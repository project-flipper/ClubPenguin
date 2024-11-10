export enum Location {
    NOWHERE = -1,
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

/**
 * Represents an animatronic character in the game.
 * The animatronic has a location, a name, a value, and a state.
 */
class Animatronic {
    public game: FNAFNight;

    private _location: Location;
    private _state: number;

    public previousLocation: Location;
    public name: string;
    public value: number;
    public previousState: number;

    public mo: Phaser.Time.TimerEvent;
    public moRestart: Phaser.Time.TimerEvent;
    public movementTime: number;

    constructor(game: FNAFNight, location: Location, name: string, value: number) {
        this.game = game;

        this._location = undefined;
        this._state = undefined;
        this.location = location;
        this.name = name;
        this.value = value;
        this.movementTime = 1000;
    }

    /**
     * Get the current location of the animatronic.
     */
    get location(): Location {
        return this._location;
    }

    /**
     * Set the current location of the animatronic.
     */
    set location(value: Location) {
        if (this._location == value) return;
        this.previousLocation = this.location;
        this._location = value;
    }

    /**
     * Get the current state of the animatronic.
     */
    get state(): number {
        return this._state;
    }

    /**
     * Set the current state of the animatronic.
     */
    set state(value: number) {
        if (this._state == value) return;
        this.previousState = this.state;
        this._state = value;
    }

    /**
     * Check if the animatronic has moved or changed state and should trigger an update.
     * @returns Whether the animatronic has moved or changed state.
     */
    isDirty(): boolean {
        return this.location != this.previousLocation || this.state != this.previousState;
    }

    /**
     * Start moving the animatronic, calculating movement opportunities every {@link movementTime} seconds.
     * If the animatronic is already moving, it will stop the current movement and start a new one.
     * If a movement restart is scheduled, it will be cancelled and started immediately.
     */
    startMoving(): void {
        this.stopMoving();
        this.mo = this.game.time.addEvent({
            callback: this.move,
            callbackScope: this,
            loop: true,
            delay: this.movementTime
        });
    }

    /**
     * Restart the movement of the animatronic.
     * If a delay is provided, it will restart the movement after the delay in milliseconds.
     * If a restart is already scheduled, it will be cancelled and started immediately, or replaced by the new delay.
     * @param delay Delay in milliseconds to restart the movement.
     */
    restartMovement(delay?: number): void {
        if (this.isMoving) {
            this.stopMoving();
            if (delay > 0) {
                this.moRestart = this.game.time.addEvent({
                    callback: this.startMoving,
                    callbackScope: this,
                    delay: delay
                });
            } else this.startMoving();
        } else if (this.moRestart) {
            if (delay > 0) {
                this.moRestart.reset({
                    callback: this.startMoving,
                    callbackScope: this,
                    delay: delay
                });
            } else this.startMoving();
        }
    }

    /**
     * Check if the animatronic is currently moving.
     */
    get isMoving(): boolean {
        return this.mo != undefined;
    }

    /**
     * Stop the movement of the animatronic.
     * If a movement restart is scheduled, it will be cancelled.
     */
    stopMoving(): void {
        if (this.moRestart) {
            this.moRestart.remove();
            this.moRestart = undefined;
        }

        if (this.mo) {
            this.mo.remove();
            this.mo = undefined;
        }
    }

    /**
     * Computes a random number between 1 and 20 and checks if it is less than or equal to the animatronic's value.
     * This is used to determine if the animatronic has a chance to move.
     * @returns True if the animatronic has a chance to move.
     */
    hasMovementChance(): boolean {
        let rng = Phaser.Math.RND.between(1, 20);
        return rng <= this.value;
    }

    /**
     * Get the next location the animatronic will move to.
     * This method should be overridden by the subclasses to provide the specific movement patterns.
     * This method should remain pure and not have side effects.
     * @returns The next location the animatronic will move to.
     */
    nextLocation(): Location {
        return this.location;
    }

    /**
     * Checks whether a movement opportunity is available and the animatronic can move.
     * If you need to check for additional conditions, override this method.
     * @param to The location to move to. If not provided, it will move to the next location pattern.
     * @returns Whether the animatronic can move.
     */
    canMove(to: Location): boolean {
        return this.hasMovementChance();
    }

    /**
     * Moves the animatronic to the next location.
     * If additional movement logic is required, override {@link doMove}, or {@link canMove} for additional checks.
     */
    move(): void {
        let location = this.nextLocation();
        if (this.canMove(location)) this.doMove(location);
    }

    /**
     * Perform the movement of the animatronic.
     * If additional movement logic is required, override this method.
     * @param location The location to move the animatronic to. If not provided, it will move to the next location pattern.
     */
    doMove(to?: Location): void {
        this.location = to ?? this.nextLocation();
    }

    /**
     * Reset the animatronic to its initial state.
     * If additional reset logic is required, override this method.
     */
    reset(): void {

    }
};

class Freddy extends Animatronic {
    constructor(game: FNAFNight, location: Location, value: number) {
        super(game, location, 'Freddy', value);
        this.movementTime = 3020;
    }

    nextLocation(): Location {
        switch (this.location) {
            case Location.SHOW_STAGE:
                if (this.game.bonnie.location != Location.SHOW_STAGE && this.game.chica.location != Location.SHOW_STAGE) return Location.DINING_HALL;
                else return Location.SHOW_STAGE;
            case Location.DINING_HALL:
                return Location.RESTROOMS;
            case Location.RESTROOMS:
                return Location.KITCHEN;
            case Location.KITCHEN:
                return Location.EAST_HALL;
            case Location.EAST_HALL:
                return Location.EAST_HALL_CORNER;
            case Location.EAST_HALL_CORNER:
                return Location.OUTSIDE_OFFICE;
            default:
                return this.location;
        }
    }

    canMove(to: Location): boolean {
        let mo = this.hasMovementChance();
        if (this.location == Location.EAST_HALL_CORNER) {
            return mo && this.game.currentCamera != Location.EAST_HALL_CORNER;
        } else {
            return mo && !this.game.isLookingAtCameras;
        }
    }

    doMove(to?: Location): void {
        let laughVolume = 0;
        let stepsVolume = 0;
        this.location = to ?? this.nextLocation();

        if (this.location != this.previousLocation) {
            if (this.location == Location.KITCHEN) this.game.enteredKitchen(this);
            else if (this.previousLocation == Location.KITCHEN) this.game.leftKitchen(this);
            if (this.location == Location.DINING_HALL) {
                laughVolume = 0.15;
                stepsVolume = 0.3;
            } else if (this.location == Location.RESTROOMS) {
                laughVolume = 0.2;
                stepsVolume = 0.35;
            } else if (this.location == Location.KITCHEN) {
                laughVolume = 0.3;
                stepsVolume = 0.4;
            } else if (this.location == Location.EAST_HALL) {
                laughVolume = 0.4;
                stepsVolume = 0.6;
            } else if (this.location == Location.EAST_HALL_CORNER) {
                laughVolume = 0.6;
                stepsVolume = 0.75;
            }
        }

        if (this.location == Location.OUTSIDE_OFFICE) {
            if (!this.game.rightDoorClosed) {
                this.location = Location.OFFICE;
                this.game.enteredOffice(this);
                laughVolume = 0.8;
                stepsVolume = 1;
            } else {
                if (this.game.currentCamera == Location.EAST_HALL) return;
                this.reset();
                laughVolume = 0.6;
                stepsVolume = 0.75;
            }
        }

        if (this.location == this.game.currentCamera || this.previousLocation == this.game.currentCamera) this.game.breakCameras();
        if (laughVolume > 0) this.game.sound.play(Phaser.Math.RND.pick(['fnaf-Laugh_Giggle_Girl_1d', 'fnaf-Laugh_Giggle_Girl_2d', 'fnaf-Laugh_Giggle_Girl_8d']), { volume: laughVolume });
        if (stepsVolume > 0) this.game.sound.play('fnaf-running-fast3', { volume: stepsVolume });
        if (this.isDirty()) this.game.updateFrame();
    }

    reset(): void {
        this.location = Location.EAST_HALL;
    }
}

class Bonnie extends Animatronic {
    constructor(game: FNAFNight, location: Location, value: number) {
        super(game, location, 'Bonnie', value);
        this.movementTime = 4970;
    }

    nextLocation(): Location {
        switch (this.location) {
            case Location.SHOW_STAGE:
                return Phaser.Math.RND.pick([ Location.DINING_HALL, Location.BACKSTAGE ]);
            case Location.DINING_HALL:
                return Phaser.Math.RND.pick([ Location.WEST_HALL, Location.BACKSTAGE ]);
            case Location.BACKSTAGE:
                return Phaser.Math.RND.pick([ Location.DINING_HALL, Location.DINING_HALL ]);
            case Location.WEST_HALL:
                return Phaser.Math.RND.pick([ Location.WEST_HALL_CORNER, Location.SUPPLY_CLOSET ]);
            case Location.SUPPLY_CLOSET:
                return Phaser.Math.RND.pick([ Location.OUTSIDE_OFFICE, Location.WEST_HALL ]);
            case Location.WEST_HALL_CORNER:
                return Phaser.Math.RND.pick([ Location.OUTSIDE_OFFICE, Location.SUPPLY_CLOSET ]);
            case Location.OUTSIDE_OFFICE:
                return Location.OFFICE;
            default:
                return this.location;
        }
    }

    canMove(to: Location): boolean {
        return this.hasMovementChance();
    }

    doMove(to: Location): void {
        let stepsVolume = 0;
        this.location = to ?? this.nextLocation();
        if (this.location != this.previousLocation) {
            stepsVolume = 0.1;
            if (this.location == Location.DINING_HALL) {
                stepsVolume = 0.2;
                this.state = Phaser.Math.RND.between(0, 1);
            } else if (this.location == Location.WEST_HALL || this.location == Location.SUPPLY_CLOSET) {
                stepsVolume = 0.3;
            } else if (this.location == Location.WEST_HALL_CORNER) {
                stepsVolume = 0.4;
                this.state = 0;
            } else if (this.location == Location.OUTSIDE_OFFICE) {
                this.game.leftScare = false;
                this.game.leftDoorLight = false;
                stepsVolume = 0.4;
            }
            this.game.maybeGlitch();
        }
        if (this.location == Location.OFFICE) {
            this.game.leftDoorLight = false;
            if (!this.game.leftDoorClosed) this.game.enteredOffice(this);
            else {
                this.reset();
                stepsVolume = 0.3;
            }
        }
        if (this.location == this.game.currentCamera || this.previousLocation == this.game.currentCamera) this.game.breakCameras();
        if (stepsVolume > 0) this.game.sound.play('fnaf-deep-steps', { volume: stepsVolume });

        if (this.isDirty()) this.game.updateFrame();
    }

    reset(): void {
        this.location = Location.DINING_HALL;
        this.state = Phaser.Math.RND.between(0, 1);
    }
}

class Chica extends Animatronic {
    constructor(game: FNAFNight, location: Location, value: number) {
        super(game, location, 'Chica', value);
        this.movementTime = 4980;
    }

    nextLocation(): Location {
        switch (this.location) {
            case Location.SHOW_STAGE:
                return Location.DINING_HALL;
            case Location.DINING_HALL:
                return Phaser.Math.RND.pick([ Location.RESTROOMS, Location.KITCHEN ]);
            case Location.RESTROOMS:
                return Phaser.Math.RND.pick([ Location.KITCHEN, Location.EAST_HALL ]);
            case Location.KITCHEN:
                return Phaser.Math.RND.pick([ Location.RESTROOMS, Location.EAST_HALL ]);
            case Location.EAST_HALL:
                return Phaser.Math.RND.pick([ Location.DINING_HALL, Location.EAST_HALL_CORNER ]);
            case Location.EAST_HALL_CORNER:
                return Phaser.Math.RND.pick([ Location.EAST_HALL, Location.OUTSIDE_OFFICE ]);
            case Location.OUTSIDE_OFFICE:
                return Location.OFFICE;
            default:
                return this.location;
        }
    }

    canMove(): boolean {
        return this.hasMovementChance();
    }

    doMove(to: Location): void {
        let stepsVolume = 0;
        this.location = to ?? this.nextLocation();
        if (this.location != this.previousLocation) {
            stepsVolume = 0.1;
            if (this.location == Location.KITCHEN) this.game.enteredKitchen(this);
            else if (this.previousLocation == Location.KITCHEN) this.game.leftKitchen(this);
            if (this.location == Location.DINING_HALL || this.location == Location.RESTROOMS || this.location == Location.EAST_HALL) this.state = Phaser.Math.RND.between(0, 1);

            if (this.location == Location.OUTSIDE_OFFICE) {
                this.game.rightScare = false;
                this.game.rightDoorLight = false;
                stepsVolume = 0.4;
            } else if (this.location == Location.KITCHEN || this.location == Location.RESTROOMS) {
                stepsVolume = 0.2;
            } else if (this.location == Location.EAST_HALL) {
                stepsVolume = 0.3;
            } else if (this.location == Location.EAST_HALL_CORNER) {
                stepsVolume = 0.3;
                this.state = 0;
            }
            this.game.maybeGlitch();
        }
        if (this.location == Location.OFFICE) {
            this.game.rightDoorLight = false;
            if (!this.game.rightDoorClosed) this.game.enteredOffice(this);
            else {
                this.reset();
                stepsVolume = 0.4;
            }
        }
        if (this.location == this.game.currentCamera || this.previousLocation == this.game.currentCamera) this.game.breakCameras();
        if (stepsVolume > 0) this.game.sound.play('fnaf-deep-steps', { volume: stepsVolume });
        if (this.isDirty()) this.game.updateFrame();
    }

    reset(): void {
        this.location = Location.EAST_HALL;
        this.state = Phaser.Math.RND.between(0, 1);
    }
}

class Foxy extends Animatronic {
    public drainCounter: number;

    constructor(game: FNAFNight, location: Location, value: number) {
        super(game, location, 'Foxy', value);
        this.movementTime = 5010;
        this.state = 0;
        this.drainCounter = 0;
    }

    nextLocation(): Location {
        switch (this.state) {
            case 0:
            case 1:
            case 2:
                return Location.PIRATE_COVE;
            case 3:
            case 4:
            case 5:
                return Location.WEST_HALL;
            default:
                return this.location;
        }
    }

    canMove(to: Location): boolean {
        return this.hasMovementChance() && !(this.previousState <= 2 && this.game.isLookingAtCameras);
    }

    doMove(to?: Location): void {
        this.location = to ?? this.nextLocation();

        if (this.isDirty()) {
            if (this.location == Location.OFFICE) {
                if (!this.game.leftDoorClosed) this.game.showJumpscare(this);
                else {
                    this.game.sound.play('fnaf-knock2');
                    this.game.power -= 1 + this.drainCounter * 5;
                    this.game.power = Math.max(0, this.game.power);
                    this.game.events.emit('power:update', this.game.power);
                    this.drainCounter++;
                    this.reset();
                }
            } else if (!this.game.foxyRunning && this.location == Location.WEST_HALL && this.state == 4) this.game.foxyRun(false);

            if (this.location == this.game.currentCamera || this.previousLocation == this.game.currentCamera) this.game.breakCameras();
            this.game.updateFrame();
        }
    }

    move(): void {
        this.state++;
        let location = this.nextLocation();
        if (this.canMove(location)) this.doMove(location);
        else this.state = this.previousState;
    }

    reset(): void {
        this.state = Phaser.Math.RND.between(0, 1);
        this.location = Location.PIRATE_COVE;
    }
}

class GoldenFreddy extends Animatronic {
    public fadeTween: Phaser.Tweens.Tween;

    constructor(game: FNAFNight, value: number) {
        super(game, Location.NOWHERE, 'Golden Freddy', value);
        this.movementTime = Number.MAX_SAFE_INTEGER;
    }

    nextLocation(): Location {
        switch (this.location) {
            case Location.NOWHERE:
                return Location.WEST_HALL_CORNER;
            case Location.WEST_HALL_CORNER:
                return Location.OFFICE;
            default:
                return this.location;
        }
    }

    hasMovementChance(): boolean {
        return Phaser.Math.RND.between(1, 32_768) <= this.value;
    }

    doMove(to?: Location): void {
        this.location = to ?? this.nextLocation();
        if (this.location == Location.OFFICE && this.isDirty()) {
            this.fadeTween = this.game.tweens.add({
                targets: this.game.goldenFreddySprite,
                alpha: { from: 1, to: 0 },
                onStart: () => {
                    this.game.goldenFreddySprite.visible = true;
                    this.game.doFlashing();
                },
                onComplete: () => this.game.showJumpscare(this),
                duration: 2500,
            });
        }
    }

    reset(): void {
        this.location = Location.NOWHERE;
        this.game.goldenFreddySprite.visible = false;
        if (this.fadeTween) this.fadeTween.remove();
        this.fadeTween = undefined;
    }
}

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { GameConfig } from "@clubpenguin/app/config";
import { Game } from "@clubpenguin/world/engine/engine";
import FNAFUI from "./FNAFUI";
import FNAF from "./FNAF";
import { randomRange } from "@clubpenguin/lib/math";
/* END-USER-IMPORTS */

export default class FNAFNight extends Phaser.Scene implements Game {

    constructor() {
        super("FNAFNight");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("fnaf-pack", "assets/world/games/fnaf/fnaf-pack.json");
    }

    editorCreate(): void {

        // rectangle_1
        const rectangle_1 = this.add.rectangle(0, 0, 1600, 720);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.isFilled = true;
        rectangle_1.fillColor = 0;

        // office
        const office = this.add.sprite(0, 0, "fnaf", "fnaf/Office/Office Inside/126");
        office.setOrigin(0, 0);

        // officeView
        const officeView = this.add.layer();

        // rightDoor
        const rightDoor = this.add.sprite(1270, -2, "fnaf", "fnaf/Office/Door & Lights/R. Door/0");
        rightDoor.setOrigin(0, 0);
        officeView.add(rightDoor);

        // leftDoor
        const leftDoor = this.add.sprite(72, -1, "fnaf", "fnaf/Office/Door & Lights/L. Door/0");
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
        const leftButtons = this.add.image(6, 263, "fnaf", "fnaf/Office/Door & Lights/L. Light/122");
        leftButtons.setOrigin(0, 0);
        officeView.add(leftButtons);

        // rightButtons
        const rightButtons = this.add.image(1497, 273, "fnaf", "fnaf/Office/Door & Lights/R. Light/134");
        rightButtons.setOrigin(0, 0);
        officeView.add(rightButtons);

        // leftDoorButton
        const leftDoorButton = this.add.rectangle(25, 268, 62, 120);
        leftDoorButton.setOrigin(0, 0);
        leftDoorButton.alpha = 0.0001;
        leftDoorButton.isFilled = true;
        officeView.add(leftDoorButton);

        // leftLightButton
        const leftLightButton = this.add.rectangle(25, 393, 62, 120);
        leftLightButton.setOrigin(0, 0);
        leftLightButton.alpha = 0.0001;
        leftLightButton.isFilled = true;
        officeView.add(leftLightButton);

        // rightDoorButton
        const rightDoorButton = this.add.rectangle(1519, 275, 62, 120);
        rightDoorButton.setOrigin(0, 0);
        rightDoorButton.alpha = 0.0001;
        rightDoorButton.isFilled = true;
        officeView.add(rightDoorButton);

        // rightLightButton
        const rightLightButton = this.add.rectangle(1519, 398, 62, 120);
        rightLightButton.setOrigin(0, 0);
        rightLightButton.alpha = 0.0001;
        rightLightButton.isFilled = true;
        officeView.add(rightLightButton);

        // boop
        const boop = this.add.rectangle(671, 236, 16, 22);
        boop.setOrigin(0, 0);
        boop.alpha = 0.0001;
        boop.isFilled = true;
        officeView.add(boop);

        // goldenFreddySprite
        const goldenFreddySprite = this.add.image(389.5, 217.5, "fnaf", "fnaf/Other/573");
        goldenFreddySprite.setOrigin(0, 0);
        goldenFreddySprite.visible = false;

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
        this.goldenFreddySprite = goldenFreddySprite;
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
    public goldenFreddySprite!: Phaser.GameObjects.Image;
    public cameraView!: Phaser.GameObjects.Layer;

    /* START-USER-CODE */

    declare game: App;
    public fnaf: FNAF;

    public perspective: Phaser.FX.Displacement;

    public gameData: GameConfig;
    public clock: Phaser.Time.TimerEvent;
    public mo: Phaser.Time.TimerEvent;
    public currentNight = 1;
    public currentHour = 0;
    public power = 100;
    public currentCamera: Location = Location.SHOW_STAGE;
    public powerDecreaseRate = 0.125;

    public isLookingAtCameras = false;
    public isGameLocked = false;
    public isPowerOut = false;
    public isGameOver = false;
    public isFreddyLuring = false;

    public lightBlinking = true;
    public westHallLight = true;
    public leftDoorLight = false;
    public leftDoorClosed = false;
    public rightDoorLight = false;
    public rightDoorClosed = false;
    public leftScare = false;
    public rightScare = false;
    public foxyRunning = false;
    public officeLightsOn = true;
    public isBreathing = false;

    public poundingEvent: Phaser.Time.TimerEvent;
    public circusEvent: Phaser.Time.TimerEvent;
    public singingEvent: Phaser.Time.TimerEvent;
    public freddyEvent1: Phaser.Time.TimerEvent;
    public freddyEvent2: Phaser.Time.TimerEvent;
    public flashingEvent: Phaser.Time.TimerEvent;
    public activeFlashing: Phaser.Time.TimerEvent;
    public glitchingEvent: Phaser.Time.TimerEvent;
    public randomFreddyJumpscare: Phaser.Time.TimerEvent;
    public powerDrainage: Phaser.Time.TimerEvent;
    public powerPenalty: Phaser.Time.TimerEvent;

    public freddy: Freddy;
    public bonnie: Bonnie;
    public chica: Chica;
    public foxy: Foxy;
    public goldenFreddy: GoldenFreddy;

    init(data: any): void {
        this.scene.moveBelow('Interface');

        this.currentNight = Math.min(Math.max(parseInt(data.night), 1), 7);
        this.fnaf = data.game;

        this.freddy = new Freddy(this, Location.SHOW_STAGE, parseInt(data.freddyAI));
        this.bonnie = new Bonnie(this, Location.SHOW_STAGE, parseInt(data.bonnieAI));
        this.chica = new Chica(this, Location.SHOW_STAGE, parseInt(data.chicaAI));
        this.foxy = new Foxy(this, Location.PIRATE_COVE, parseInt(data.foxyAI));
        this.goldenFreddy = new GoldenFreddy(this, 1);

        if (data.oninit) data.oninit(this);
    }

    create(data: any) {
        this.scene.setVisible(false);
        this.input.setGlobalTopOnly(false);

        this.cameras.main.setZoom(1080 / 720);
        this.perspective = this.cameras.main.postFX.addDisplacement('fnaf-panoramaDisplacement', 0, 0.3);

        this.editorCreate();

        this.leftDoorButton.setInteractive();
        this.leftDoorButton.off('pointerdown');
        this.leftDoorButton.on('pointerdown', () => this.toggleLeftDoor());

        this.leftLightButton.setInteractive();
        this.leftLightButton.off('pointerdown');
        this.leftLightButton.on('pointerdown', () => this.toggleLeftLight());

        this.rightDoorButton.setInteractive();
        this.rightDoorButton.off('pointerdown');
        this.rightDoorButton.on('pointerdown', () => this.toggleRightDoor());

        this.rightLightButton.setInteractive();
        this.rightLightButton.off('pointerdown');
        this.rightLightButton.on('pointerdown', () => this.toggleRightLight());

        this.boop.setInteractive();
        this.boop.off('pointerdown');
        this.boop.on('pointerdown', () => this.sound.play('fnaf-PartyFavorraspyPart_AC01__3'));

        this.startGame();

        this.scene.add('FNAFUI', FNAFUI, true, { game: this, onready: () => {
            this.scene.setVisible(true);
            if (data.onready) data.onready(this);
        } });
    }

    startGame(): void {

        this.sound.play('fnaf-ColdPresc B', { loop: true, volume: 0.5 });
        this.sound.play('fnaf-EerieAmbienceLargeSca_MV005', { loop: true, volume: 0 });
        this.sound.play('fnaf-Buzz_Fan_Florescent2', { loop: true, volume: 0.25 });
        this.sound.play('fnaf-BallastHumMedium2', { loop: true, volume: 0 });
        this.sound.play('fnaf-robotvoice', { loop: true, volume: 0 });

        this.showOffice();

        this.clock = this.time.addEvent({
            callback: this.tick,
            callbackScope: this,
            loop: true,
            delay: 1000 * 90
        });

        this.startPowerDrainage();

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

        this.startRandomEvents();
    }

    startPowerDrainage(): void {
        if (!this.powerDrainage) this.powerDrainage = this.time.addEvent({
            callback: () => {
                if (this.power > 0) this.power -= this.powerUsage / 10;

                this.power = Math.max(0, this.power);
                if (this.power > 0) this.events.emit('power:update', this.power);

                if (this.power <= 0) this.powerOut();
            },
            delay: 1000,
            repeat: -1
        });

        if (this.currentNight == 1) return;
        let penaltyRate: number;
        switch (this.currentNight) {
            case 2:
                penaltyRate = 6000;
                break;
            case 3:
                penaltyRate = 5000;
                break;
            case 4:
                penaltyRate = 4000;
                break;
            default:
                penaltyRate = 3000;
                break;
        }

        if (!this.powerPenalty) this.powerPenalty = this.time.addEvent({
            callback: () => {
                if (this.power > 0) this.power -= 0.1;

                this.power = Math.max(0, this.power);
                if (this.power > 0) this.events.emit('power:update', this.power);

                if (this.power <= 0) this.powerOut();
            },
            delay: penaltyRate,
            repeat: -1
        });
    }

    stopPowerDrainage(): void {
        if (this.powerDrainage) {
            this.powerDrainage.remove();
            this.powerDrainage = undefined;
        }
        if (this.powerPenalty) {
            this.powerPenalty.remove();
            this.powerPenalty = undefined;
        }
    }

    setAmbienceVolume(volume: number): void {
        let sound = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-EerieAmbienceLargeSca_MV005');
        if (sound) sound.volume = volume;
    }

    nextFreddyPowerEvent(): void {
        this.clearFreddyPowerEvent();
        this.freddyEvent1 = this.time.addEvent({
            callback: () => {
                if (this.isGameOver) return;
                if (Phaser.Math.RND.between(1, 5) <= 1) {
                    if (!this.isFreddyLuring && !this.officeLightsOn) this.showJumpscare(this.freddy);
                    else if (!this.isFreddyLuring) this.showFreddyLure();
                    else this.turnLightsOff();
                }
            },
            delay: 5000
        });

        this.freddyEvent2 = this.time.addEvent({
            callback: () => {
                if (this.isGameOver) return;
                if (!this.isFreddyLuring && !this.officeLightsOn) this.showJumpscare(this.freddy);
                else if (!this.isFreddyLuring) this.showFreddyLure();
                else this.turnLightsOff();
            },
            delay: 20000
        });
    }

    showFreddyLure(): void {
        if (this.isFreddyLuring) return;
        this.lightBlinking = true;
        this.isFreddyLuring = true;
        this.sound.play('fnaf-music-box');
        this.nextFreddyPowerEvent();
    }

    turnLightsOff(): void {
        this.isFreddyLuring = false;
        this.sound.removeByKey('fnaf-music-box');
        this.sound.removeByKey('fnaf-ambience2');
        let event = this.time.addEvent({
            callback: () => {
                if (event.getOverallProgress() >= 1) {
                    this.officeLightsOn = false;
                    let fan = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-Buzz_Fan_Florescent2');
                    if (fan) fan.volume = 0;
                    this.updateFrame();
                    this.nextFreddyPowerEvent();
                    return;
                }
                this.officeLightsOn = Phaser.Math.RND.pick([false, true]);
                let fan = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-Buzz_Fan_Florescent2');
                if (fan) fan.volume = this.officeLightsOn ? 0.5 : 0;
                this.updateFrame();
            },
            delay: 50,
            repeat: 20
        });
    }

    clearFreddyPowerEvent(): void {
        if (this.freddyEvent1) {
            this.freddyEvent1.remove();
            this.freddyEvent1 = undefined;
        }
        if (this.freddyEvent2) {
            this.freddyEvent2.remove();
            this.freddyEvent2 = undefined;
        }
    }

    startRandomEvents(): void {
        this.poundingEvent = this.time.addEvent({
            callback: () => {
                if (this.isGameOver || this.sound.isPlaying('fnaf-DOOR_POUNDING_ME_D0291401') || this.isPowerOut) return;
                if (Phaser.Math.RND.between(1, 50) <= 1) {
                    this.sound.play('fnaf-DOOR_POUNDING_ME_D0291401', { volume: Phaser.Math.RND.between(0.1, 0.4) });
                    this.poundingEvent.paused = true;
                }
            },
            delay: 10000,
            repeat: -1
        });

        this.circusEvent = this.time.addEvent({
            callback: () => {
                if (this.isGameOver || this.sound.isPlaying('fnaf-circus') || this.isPowerOut) return;
                if (Phaser.Math.RND.between(1, 30) <= 1) this.sound.play('fnaf-circus', { volume: 0.05 });
            },
            delay: 5000,
            repeat: -1
        });

        this.singingEvent = this.time.addEvent({
            callback: () => {
                if (this.isGameOver || this.sound.isPlaying('fnaf-pirate-song2') || this.isPowerOut) return;
                if (Phaser.Math.RND.between(1, 30) <= 1 && this.foxy.location == Location.PIRATE_COVE && this.foxy.state == 0) this.sound.play('fnaf-pirate-song2', { volume: (this.isLookingAtCameras && this.currentCamera == Location.PIRATE_COVE) ? 0.15 : 0.05 });
            },
            delay: 4000,
            repeat: -1
        });

        this.flashingEvent = this.time.addEvent({
            callback: () => {
                if (this.isGameOver) return;
                if (Phaser.Math.RND.between(1, 1000) <= 1) this.doFlashing();
            },
            delay: 1000,
            repeat: -1
        });
    }

    doFlashing(): void {
        if (this.activeFlashing) return;

        this.activeFlashing = this.time.addEvent({
            callback: () => {
                if (this.activeFlashing.getOverallProgress() >= 1) {
                    this.events.emit('flashing:frame', 0);
                    this.activeFlashing = undefined;
                } else this.events.emit('flashing:frame', Phaser.Math.RND.weightedPick([0, 0, 0, 1, 2, 3, 4]));

                this.adjustRobotVoiceVolume();
            },
            delay: 50,
            repeat: Phaser.Math.RND.between(20, 30)
        });
    }

    stopRandomEvents(): void {
        if (this.poundingEvent) this.poundingEvent.remove();
        if (this.circusEvent) this.circusEvent.remove();
        if (this.singingEvent) this.singingEvent.remove();
        if (this.flashingEvent) this.flashingEvent.remove();
        if (this.activeFlashing) this.activeFlashing.remove();
    }

    startGlitching(): void {
        if (this.glitchingEvent) return;

        this.glitchingEvent = this.time.addEvent({
            callback: () => this.doGlitching(),
            delay: 100,
            repeat: -1
        });
    }

    maybeGlitch(): void {
        if (this.currentNight >= 4) {
            if (this.chica.location == Location.EAST_HALL_CORNER || this.bonnie.location == Location.WEST_HALL_CORNER) this.startGlitching();
            else this.stopGlitching();
        } else this.stopGlitching();
    }

    doGlitching(): void {
        if (this.isLookingAtCameras && this.currentCamera == Location.EAST_HALL_CORNER && this.chica.location == Location.EAST_HALL_CORNER) {
            this.chica.state = Phaser.Math.RND.weightedPick([0, 1, 2]);
            this.updateFrame();
        } else if (this.isLookingAtCameras && this.currentCamera == Location.WEST_HALL_CORNER && this.bonnie.location == Location.WEST_HALL_CORNER) {
            this.bonnie.state = Phaser.Math.RND.weightedPick([0, 1, 2]);
            this.updateFrame();
        }

        this.adjustRobotVoiceVolume();
    }

    adjustRobotVoiceVolume(): void {
        let robotvoice = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-robotvoice');

        if (this.isLookingAtCameras && robotvoice) {
            if (this.currentCamera == Location.EAST_HALL_CORNER && this.chica.location == Location.EAST_HALL_CORNER) {
                robotvoice.volume = Phaser.Math.Between(0.01, 0.81);
                return;
            } else if (this.currentCamera == Location.WEST_HALL_CORNER && this.bonnie.location == Location.WEST_HALL_CORNER) {
                robotvoice.volume = Phaser.Math.Between(0.01, 0.81);
                return;
            }
        }

        if ((this.chica.location == Location.EAST_HALL_CORNER || this.bonnie.location == Location.WEST_HALL_CORNER) && robotvoice) robotvoice.volume = Phaser.Math.Between(0.01, 0.21);
        else if (this.activeFlashing && robotvoice) robotvoice.volume = 1; 
        else if (robotvoice) robotvoice.volume = 0;
    }

    stopGlitching(): void {
        if (this.glitchingEvent) {
            this.glitchingEvent.remove();
            this.glitchingEvent = undefined;
        }

        this.adjustRobotVoiceVolume();
    }

    get powerUsage(): number {
        return 1 + (this.leftDoorClosed ? 1 : 0) + (this.rightDoorClosed ? 1 : 0) + (this.isLookingAtCameras ? 1 : 0) + (this.leftDoorLight ? 1 : 0) + (this.rightDoorLight ? 1 : 0);
    }

    updateFrame(): void {
        if (this.isGameLocked) return;
        let frame: string;
        if (this.isLookingAtCameras) {
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
                        if (this.commonSecret) frame = "fnaf/Locations/Backstage/555";
                        else frame = "fnaf/Locations/Backstage/205";
                    } else if (this.commonSecret) frame = "fnaf/Locations/Backstage/354";
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
                    if (this.foxy.location == Location.PIRATE_COVE) {
                        if (this.foxy.state == 0) frame = "fnaf/Locations/Pirate Cove/66";
                        else if (this.foxy.state == 1) frame = "fnaf/Locations/Pirate Cove/211";
                        else if (this.foxy.state == 2) frame = "fnaf/Locations/Pirate Cove/338";
                    } else if (this.commonSecret) frame = "fnaf/Locations/Pirate Cove/553";
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
                    if (this.chica.location == Location.EAST_HALL_CORNER) {
                        if (this.chica.state == 0) frame = "fnaf/Locations/E. Hall Corner/220";
                        else if (this.chica.state == 1) frame = "fnaf/Locations/E. Hall Corner/476";
                        else frame = "fnaf/Locations/E. Hall Corner/451";
                    } else if (this.freddy.location == Location.EAST_HALL_CORNER) frame = "fnaf/Locations/E. Hall Corner/486";
                    else {
                        if (this.eastHallCornerSecret == 1) frame = "fnaf/Locations/E. Hall Corner/549";
                        else if (this.eastHallCornerSecret == 2) frame = "fnaf/Locations/E. Hall Corner/550";
                        else if (this.eastHallCornerSecret == 3) frame = "fnaf/Locations/E. Hall Corner/551";
                        else if (this.eastHallCornerSecret == 4) frame = "fnaf/Locations/E. Hall Corner/552";
                        else frame = "fnaf/Locations/E. Hall Corner/49";
                    }
                    break;
                case Location.WEST_HALL:
                    if (this.foxyRunning) {
                        if (this.foxy.state > 3 && !this.office.anims.isPlaying) {
                            this.office.play('fnaf-foxyrunning-animation');
                            this.office.once('animationcomplete', () => {
                                this.foxy.doMove();
                                this.foxy.state = 4;
                                this.breakCameras();
                            });
                            return;
                        }
                        this.office.visible = false;
                        this.breakCameras();
                        return;
                    }
                    if (this.foxy.location == Location.WEST_HALL && this.foxy.state == 3) {
                        this.foxyRun(true);
                        return;
                    } else if (this.foxy.location == Location.WEST_HALL) {
                        this.office.visible = false;
                        this.breakCameras();
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
                    } else if (this.goldenFreddy.location == Location.WEST_HALL_CORNER) frame = "fnaf/Locations/W. Hall Corner/540";
                    else if (this.westHallCornerSecret) frame = "fnaf/Locations/W. Hall Corner/571";
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
                this.fan.visible = false;
                this.leftButtons.visible = false;
                this.rightButtons.visible = false;

                if (!this.officeLightsOn) {
                    this.office.visible = false;
                    return;
                }
                if (this.isFreddyLuring && this.lightBlinking) frame = "fnaf/Office/Office Inside/305";
                else frame = "fnaf/Office/Office Inside/304";
            }
        }

        this.office.stop();
        this.office.setFrame(frame);
    }

    showOffice(): void {
        this.stopGlitching();
        let lastCameraState = this.isLookingAtCameras;
        if (this.foxy.location == Location.PIRATE_COVE) this.foxy.restartMovement(randomRange(0.83, 16.67));

        if (this.goldenFreddy.location == Location.WEST_HALL_CORNER && this.goldenFreddy.state == 1) this.goldenFreddy.doMove();
        else this.goldenFreddy.reset();
        let fan = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-Buzz_Fan_Florescent2');
        if (fan) fan.volume = 0.25;

        this.officeView.visible = true;
        this.cameraView.visible = false;
        this.cameras.main.stopFollow();
        this.cameras.main.startFollow(this.officeScroller);
        this.isLookingAtCameras = false;
        this.updateFrame();
        this.sound.stopByKey('fnaf-MiniDV_Tape_Eject_1');
        this.setCameraSoundsVolume();

        if (this.isLookingAtCameras != lastCameraState) this.events.emit('camera:state', this.isLookingAtCameras);
        this.events.emit('usage:update', this.powerUsage);

        this.adjustRobotVoiceVolume();
    }

    public commonSecret = false;
    public eastHallSecret1 = false;
    public eastHallSecret2 = false;
    public westHallCornerSecret = false;
    public eastHallCornerSecret = 0;

    calculateSecretChance(): void {
        this.commonSecret = Phaser.Math.RND.between(1, 100) <= 1;
        this.eastHallSecret1 = Phaser.Math.RND.between(1, 100) <= 1;
        this.eastHallSecret2 = Phaser.Math.RND.between(1, 100) <= 1;
        this.westHallCornerSecret = Phaser.Math.RND.between(1, 100) <= 1;
        this.eastHallCornerSecret = Phaser.Math.RND.between(1, 100) <= 1 ? Phaser.Math.RND.between(1, 4) : 0;
    }

    showCameras(): void {
        let lastCameraState = this.isLookingAtCameras;
        let fan = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-Buzz_Fan_Florescent2');
        if (fan) fan.volume = 0.1;
        if (this.isLookingAtCameras) return this.updateFrame();

        this.officeView.visible = false;
        this.cameraView.visible = true;
        this.leftDoorLight = false;
        this.rightDoorLight = false;
        this.cameras.main.stopFollow();
        this.cameras.main.startFollow(this.cameraScroller);
        this.isLookingAtCameras = true;
        this.calculateSecretChance();
        if (!this.sound.isPlaying('fnaf-MiniDV_Tape_Eject_1')) this.sound.play('fnaf-MiniDV_Tape_Eject_1', { loop: true });
        this.setCameraSoundsVolume();

        if (this.goldenFreddy.location == Location.NOWHERE && this.bonnie.location != Location.WEST_HALL_CORNER) this.goldenFreddy.move();
        else this.goldenFreddy.reset();
        if (this.currentCamera == Location.WEST_HALL_CORNER && this.goldenFreddy.location == Location.WEST_HALL_CORNER && this.goldenFreddy.state == 0) {
            this.goldenFreddy.state = 1;
            this.sound.play('fnaf-Laugh_Giggle_Girl_1');
        }
        this.updateFrame();
        if (this.isLookingAtCameras != lastCameraState) this.events.emit('camera:state', this.isLookingAtCameras);
        this.events.emit('usage:update', this.powerUsage);

        this.adjustRobotVoiceVolume();
    }

    setCameraSoundsVolume(): void {
        try {
            let pirateSong = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-pirate-song2');
            if (pirateSong) pirateSong.volume = (this.isLookingAtCameras && this.currentCamera == Location.PIRATE_COVE) ? 0.15 : 0.05;

            let kitchenSounds = ['fnaf-OVEN-DRA_1_GEN-HDF18119', 'fnaf-OVEN-DRA_2_GEN-HDF18120', 'fnaf-OVEN-DRA_7_GEN-HDF18121', 'fnaf-OVEN-DRAWE_GEN-HDF18122'];
            for (let sound of kitchenSounds) {
                let kitchenSound = this.sound.get<Phaser.Sound.HTML5AudioSound>(sound);
                if (kitchenSound) kitchenSound.volume = this.isLookingAtCameras ? (this.currentCamera == Location.KITCHEN ? 0.75 : 0.2) : 0.1;
            }

            let musicBox = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-music-box');
            if (musicBox && !this.isPowerOut) musicBox.volume = (this.isLookingAtCameras && this.currentCamera == Location.KITCHEN) ? 0.5 : 0.05;
        } catch(e) {
            return;
        }
    }

    changeCamera(location: Location): void {
        this.currentCamera = location;
        if (this.currentCamera == Location.WEST_HALL_CORNER && this.goldenFreddy.location == Location.WEST_HALL_CORNER && this.goldenFreddy.state == 0) {
            this.goldenFreddy.state = 1;
            this.sound.play('fnaf-Laugh_Giggle_Girl_1');
        }
        if (this.currentCamera == Location.WEST_HALL && this.foxy.state == 4) this.breakCameras();
        this.updateFrame();
        this.setCameraSoundsVolume();
        this.events.emit('camera:change', this.currentCamera);

        this.adjustRobotVoiceVolume();
    }

    public camerasBroken = false;

    breakCameras(): void {
        if (this.camerasBroken || !this.isLookingAtCameras) return;
        this.camerasBroken = true;
        this.time.delayedCall(5000, () => {
            this.camerasBroken = false;
            this.updateFrame();
        });

        let sounds = ['fnaf-garble3', 'fnaf-garble2', 'fnaf-garble1', 'fnaf-COMPUTER_DIGITAL_L2076505'];
        this.sound.play(Phaser.Math.RND.pick(sounds));
    }

    openLeftDoor(): void {
        if (!this.leftDoorClosed || this.leftDoor.anims.isPlaying) return;

        this.leftDoorClosed = false;
        this.updateFrame();

        this.leftDoor.stop();
        this.leftDoor.playReverse('fnaf-leftdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');

        this.events.emit('usage:update', this.powerUsage);
    }

    closeLeftDoor(): void {
        if (this.leftDoorClosed) return;

        this.leftDoorClosed = true;
        this.updateFrame();

        this.leftDoor.stop();
        this.leftDoor.play('fnaf-leftdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');

        this.events.emit('usage:update', this.powerUsage);
    }

    toggleLeftDoor(): void {
        if (this.power <= 0 || this.leftDoor.anims.isPlaying) return;

        if (this.bonnie.location == Location.OFFICE) {
            this.sound.play('fnaf-error');
            return;
        }

        if (this.leftDoorClosed) this.openLeftDoor();
        else this.closeLeftDoor();
    }

    openRightDoor(): void {
        if (!this.rightDoorClosed) return;

        this.rightDoorClosed = false;
        this.updateFrame();

        this.rightDoor.stop();
        this.rightDoor.playReverse('fnaf-rightdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');

        this.events.emit('usage:update', this.powerUsage);
    }

    closeRightDoor(): void {
        if (this.rightDoorClosed) return;

        this.rightDoorClosed = true;
        this.updateFrame();

        this.rightDoor.stop();
        this.rightDoor.play('fnaf-rightdoor-animation');
        this.sound.play('fnaf-SFXBible_12478');

        this.events.emit('usage:update', this.powerUsage);
    }

    toggleRightDoor(): void {
        if (this.power <= 0 || this.rightDoor.anims.isPlaying) return;

        if (this.chica.location == Location.OFFICE) {
            this.sound.play('fnaf-error');
            return;
        }

        if (this.rightDoorClosed) this.openRightDoor();
        else this.closeRightDoor();
    }

    toggleLeftLight(): void {
        if (this.power <= 0) return;

        if (this.bonnie.location == Location.OFFICE) {
            this.sound.play('fnaf-error');
            return;
        }

        this.rightDoorLight = false;
        this.leftDoorLight = !this.leftDoorLight;
        this.lightBlinking = true;
        this.updateFrame();
        if (!this.leftScare && this.leftDoorLight && this.bonnie.location == Location.OUTSIDE_OFFICE) {
            this.leftScare = true;
            this.sound.play('fnaf-windowscare');
        }

        this.events.emit('usage:update', this.powerUsage);
    }

    toggleRightLight(): void {
        if (this.power <= 0) return;

        if (this.chica.location == Location.OFFICE) {
            this.sound.play('fnaf-error');
            return;
        }

        this.leftDoorLight = false;
        this.rightDoorLight = !this.rightDoorLight;
        this.lightBlinking = true;
        this.updateFrame();
        if (!this.rightScare && this.rightDoorLight && this.chica.location == Location.OUTSIDE_OFFICE) {
            this.rightScare = true;
            this.sound.play('fnaf-windowscare');
        }

        this.events.emit('usage:update', this.powerUsage);
    }

    enteredOffice(animatronic: Animatronic): void {
        if (animatronic == this.bonnie) {
            this.rightDoorLight = false;
        } else if (animatronic == this.chica || animatronic == this.freddy) {
            this.leftDoorLight = false;
        }

        if (this.isLookingAtCameras) {
            if (animatronic == this.freddy) this.startWhisper();
            else this.startBreathing();
        }

        if (this.animatronicToJumpscare) return;

        this.animatronicToJumpscare = animatronic;
        this.events.on('camera:state', animatronic != this.freddy ? this.jumpscareOnCameraFlip : this.startRandomFreddyJumpscare, this);
        if (animatronic != this.freddy) this.time.delayedCall(30000, () => {
            if (!this.isGameOver && this.isLookingAtCameras) this.showOffice();
        });
    }

    startRandomFreddyJumpscare(): void {
        if (!this.randomFreddyJumpscare) this.randomFreddyJumpscare = this.time.addEvent({
            callback: () => {
                if (Phaser.Math.RND.between(1, 4) <= 1 && !this.isPowerOut) {
                    this.showJumpscare(this.freddy);
                    this.randomFreddyJumpscare.remove();
                    this.randomFreddyJumpscare = undefined;
                }
            },
            delay: 1000,
            repeat: -1
        });
    }

    public animatronicToJumpscare: Animatronic;

    jumpscareOnCameraFlip(isLookingAtCameras: boolean): void {
        if (!isLookingAtCameras) {
            this.stopBreathing();
            this.showJumpscare(this.animatronicToJumpscare);
        }
    }

    startBreathing(): void {
        if (this.isBreathing) return;
        this.isBreathing = true;
        this.time.delayedCall(Phaser.Math.RND.between(1000, 2500), () => this.breathe());
    }

    startWhisper(): void {
        if (this.isBreathing) return;
        this.isBreathing = true;
        this.sound.play('fnaf-whispering2', { loop: true });
    }

    breathe(): void {
        let keys = ['fnaf-Vocals_Breaths_S_35972014', 'fnaf-Vocals_Breaths_S_35972006', 'fnaf-Vocals_Breaths_S_35972008', 'fnaf-Vocals_Breaths_S_35972012'];
        let key = Phaser.Math.RND.pick(keys);
        this.sound.play(key);
        let sound = this.sound.get<Phaser.Sound.HTML5AudioSound>(key);
        if (sound) sound.on('complete', () => {
            if (this.isBreathing) this.time.delayedCall(Phaser.Math.RND.between(1000, 2500), () => this.breathe());
        });
    }

    stopBreathing(): void {
        this.isBreathing = false;
        let keys = ['fnaf-Vocals_Breaths_S_35972014', 'fnaf-Vocals_Breaths_S_35972006', 'fnaf-Vocals_Breaths_S_35972008', 'fnaf-Vocals_Breaths_S_35972012'];
        for (let key of keys) this.sound.removeByKey(key);
        this.sound.removeByKey('fnaf-whispering2');
    }

    enteredKitchen(animatronic: Animatronic): void {
        let key: string;
        let volume: number;
        if (animatronic == this.freddy) {
            key = 'fnaf-music-box';
            volume = (this.isLookingAtCameras && this.currentCamera == Location.KITCHEN) ? 0.5 : 0.05;
        } else {
            let keys = ['fnaf-OVEN-DRA_1_GEN-HDF18119', 'fnaf-OVEN-DRA_2_GEN-HDF18120', 'fnaf-OVEN-DRA_7_GEN-HDF18121', 'fnaf-OVEN-DRAWE_GEN-HDF18122'];
            key = Phaser.Math.RND.pick(keys);
            volume = this.isLookingAtCameras ? (this.currentCamera == Location.KITCHEN ? 0.75 : 0.2) : 0.1;
        }
        this.sound.play(key, { volume });
        let sound = this.sound.get<Phaser.Sound.HTML5AudioSound>(key);
        if (sound) sound.on('complete', () => {
            sound.destroy();
            if (animatronic.location == Location.KITCHEN) this.enteredKitchen(animatronic);
        });
    }

    leftKitchen(animatronic: Animatronic): void {
        if (animatronic == this.freddy && !this.isFreddyLuring) this.sound.removeByKey('fnaf-music-box');
        else {
            let keys = ['fnaf-OVEN-DRA_1_GEN-HDF18119', 'fnaf-OVEN-DRA_2_GEN-HDF18120', 'fnaf-OVEN-DRA_7_GEN-HDF18121', 'fnaf-OVEN-DRAWE_GEN-HDF18122'];
            for (let key of keys) this.sound.removeByKey(key);
        }
    }

    showJumpscare(animatronic: Animatronic): void {
        if (this.isGameOver) return;
        if (this.isLookingAtCameras) this.showOffice();

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
            this.office.on('animationcomplete', () => this.endGame());
        } else if (animatronic == this.bonnie) {
            this.sound.play('fnaf-XSCREAM');
            this.office.play('fnaf-bonniejumpscare-animation');
            this.officeScroller.setPosition(800, 360);
            this.time.delayedCall(1500, () => this.endGame());
        } else if (animatronic == this.chica) {
            this.sound.play('fnaf-XSCREAM');
            this.office.play('fnaf-chicajumpscare-animation');
            this.officeScroller.setPosition(800, 360);
            this.time.delayedCall(1500, () => this.endGame());
        } else if (animatronic == this.freddy) {
            this.sound.play('fnaf-XSCREAM');
            if (this.power <= 0) {
                this.office.visible = true;
                this.office.play('fnaf-freddyjumpscare-animation');
                this.officeScroller.setPosition(640, 360);
            } else this.office.play('fnaf-freddypeekaboojumpscare-animation');

            this.office.on('animationcomplete', () => this.endGame());
        } else if (animatronic == this.goldenFreddy) {
            this.sound.play('fnaf-XSCREAM2');
            this.office.setFrame('fnaf/Jumpscares/548');
            this.officeScroller.setPosition(640, 360);
            this.time.delayedCall(1500, () => window.location.replace('about:blank'));
        }

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
            case 6:
                this.endGame();
                return;
        }

        this.events.emit('hour:update', this.currentHour);
    }

    update(time: number, delta: number): void {
        if (this.isGameOver) return;

        let light = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-BallastHumMedium2');
        if (this.leftDoorLight || this.rightDoorLight) {
            this.lightBlinking = Phaser.Math.RND.weightedPick([true, true, true, false]);
            if (light) light.volume = this.lightBlinking ? 1 : 0;
            this.updateFrame();
        } else if (!this.leftDoorLight && !this.rightDoorLight && light) light.volume = 0;

        if (this.isLookingAtCameras) {
            if (this.currentCamera == Location.WEST_HALL && !this.foxyRunning) {
                this.westHallLight = Phaser.Math.RND.weightedPick([true, false]);
                this.updateFrame();
            }
        }

        if (this.isFreddyLuring) {
            let light = this.lightBlinking;
            this.lightBlinking = Phaser.Math.RND.weightedPick([true, false]);
            if (this.lightBlinking != light) this.updateFrame();
        }
    }

    foxyRun(fromCameras = false): void {
        this.sound.play('fnaf-run');
        this.foxyRunning = true;
        if (fromCameras) this.foxy.state = 5;
        else this.foxy.state = 4;
        this.time.delayedCall(fromCameras ? 1500 : 2500, () => {
            this.foxy.stopMoving();
            this.foxy.doMove(Location.OFFICE);
            if (!this.isGameOver) this.foxy.startMoving();
            this.foxyRunning = false;
        });
        this.updateFrame();
    }

    powerOut(): void {
        this.stopPowerDrainage();
        this.events.emit('power:update', 0);

        this.events.off('camera:state', this.jumpscareOnCameraFlip, this);
        this.events.off('camera:state', this.startRandomFreddyJumpscare, this);
        this.showOffice();
        this.sound.play('fnaf-ambience2', { loop: true, volume: 0.5 });

        this.openLeftDoor();
        this.openRightDoor();
        this.leftDoorLight = false;
        this.rightDoorLight = false;

        this.freddy.stopMoving();
        this.bonnie.stopMoving();
        this.chica.stopMoving();
        this.foxy.stopMoving();
        this.goldenFreddy.reset();

        this.updateFrame();

        let fan = this.sound.get<Phaser.Sound.HTML5AudioSound>('fnaf-Buzz_Fan_Florescent2');
        if (fan) fan.volume = 0;
        this.sound.play('fnaf-powerdown');

        this.nextFreddyPowerEvent();
    }

    endGame(): void {
        if (this.isGameOver) return;
        this.isGameOver = true;
        this.input.setGlobalTopOnly(true);

        this.stopRandomEvents();
        this.freddy.stopMoving();
        this.bonnie.stopMoving();
        this.chica.stopMoving();
        this.foxy.stopMoving();
        this.clock.remove(false);

        let score = 200 * this.currentHour;
        if (this.currentHour == 6) {
            score += 200;
            localStorage.setItem('fnaf-night', (this.currentNight + 1).toString());
        }
        score *= 1 + (this.currentNight / 5);
        this.time.delayedCall(this.currentHour == 6 ? 5000 : 2000, () => this.fnaf.endGame(score, this.currentNight, this.currentHour == 6));

        this.fnaf.stopAllSounds();
        this.events.emit('game:end', this.currentHour);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
