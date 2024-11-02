enum View {
    CAMERAS,
    OFFICE
}

/* START OF COMPILED CODE */

import ButtonComponent from "../../../lib/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import FNAF, { Location } from "./FNAF";
/* END-USER-IMPORTS */

export default class FNAF_UI extends Phaser.Scene {

    constructor() {
        super("FNAF_UI");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    editorCreate(): void {

        // camstatic
        const camstatic = this.add.sprite(-70, 0, "fnaf", "fnaf/Static & Menu/Full Static/12");
        camstatic.setOrigin(0, 0);
        camstatic.alpha = 0.25;
        camstatic.alphaTopLeft = 0.25;
        camstatic.alphaTopRight = 0.25;
        camstatic.alphaBottomLeft = 0.25;
        camstatic.alphaBottomRight = 0.25;
        camstatic.play("fnaf-static-animation");

        // fastLeft
        const fastLeft = this.add.rectangle(0, 0, 164, 720);
        fastLeft.setOrigin(0, 0);
        fastLeft.alpha = 0.01;
        fastLeft.isFilled = true;

        // fastRight
        const fastRight = this.add.rectangle(1140, 0, 164, 720);
        fastRight.setOrigin(1, 0);
        fastRight.alpha = 0.01;
        fastRight.isFilled = true;

        // scrollLeft
        const scrollLeft = this.add.rectangle(164, 0, 256, 720);
        scrollLeft.setOrigin(0, 0);
        scrollLeft.alpha = 0.01;
        scrollLeft.isFilled = true;
        scrollLeft.fillColor = 7763574;

        // scrollRight
        const scrollRight = this.add.rectangle(976, 0, 256, 720);
        scrollRight.setOrigin(1, 0);
        scrollRight.alpha = 0.01;
        scrollRight.isFilled = true;
        scrollRight.fillColor = 7763574;

        // monitor
        const monitor = this.add.sprite(-70, 0, "fnaf", "fnaf/Office/Monitor/0");
        monitor.setOrigin(0, 0);
        monitor.visible = false;

        // blipper
        const blipper = this.add.sprite(-70, 0, "fnaf", "fnaf/Static & Menu/Divided Static/4");
        blipper.setOrigin(0, 0);
        blipper.visible = false;

        // usageLabel
        const usageLabel = this.add.image(25, 677, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/209");
        usageLabel.setOrigin(0, 0);

        // powerLabel
        const powerLabel = this.add.image(25, 646, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/207");
        powerLabel.setOrigin(0, 0);

        // usage
        const usage = this.add.image(105, 667, "fnaf", "fnaf/Office/Door & Lights/Power/212");
        usage.setOrigin(0, 0);

        // cameraFlipper
        const cameraFlipper = this.add.image(570, 720, "fnaf", "fnaf/Other/420");
        cameraFlipper.setOrigin(0.5, 1);

        // cams
        const cams = this.add.layer();

        // muteCall
        const muteCall = this.add.image(36, 32, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/481");
        muteCall.setOrigin(0, 0);
        cams.add(muteCall);

        // location
        const location = this.add.image(723, 309, "fnaf", "fnaf/Locations/Names/54");
        location.setOrigin(0, 0);
        cams.add(location);

        // rec
        const rec = this.add.sprite(7, 67, "fnaf", "fnaf/Other/7");
        rec.setOrigin(0, 0);
        rec.play("fnaf-rec-animation");
        cams.add(rec);

        // map
        const map = this.add.sprite(719, 320, "fnaf", "fnaf/Office/Map/145");
        map.setOrigin(0, 0);
        map.play("fnaf-map-animation");
        cams.add(map);

        // camframe
        const camframe = this.add.image(-70, 0, "fnaf", "fnaf/Other/11");
        camframe.setOrigin(0, 0);
        cams.add(camframe);

        // cam1a
        const cam1a = this.add.sprite(828, 343, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam1a.setOrigin(0, 0);
        cams.add(cam1a);

        // cam1b
        const cam1b = this.add.sprite(804, 396, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam1b.setOrigin(0, 0);
        cams.add(cam1b);

        // cam1c
        const cam1c = this.add.sprite(773, 475, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam1c.setOrigin(0, 0);
        cams.add(cam1c);

        // cam2a
        const cam2a = this.add.sprite(824, 590, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam2a.setOrigin(0, 0);
        cams.add(cam2a);

        // cam2b
        const cam2b = this.add.sprite(824, 632, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam2b.setOrigin(0, 0);
        cams.add(cam2b);

        // cam4a
        const cam4a = this.add.sprite(932, 590, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam4a.setOrigin(0, 0);
        cams.add(cam4a);

        // cam4b
        const cam4b = this.add.sprite(932, 631, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam4b.setOrigin(0, 0);
        cams.add(cam4b);

        // cam3
        const cam3 = this.add.sprite(743, 572, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam3.setOrigin(0, 0);
        cams.add(cam3);

        // cam7
        const cam7 = this.add.sprite(1036, 425, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam7.setOrigin(0, 0);
        cams.add(cam7);

        // cam6
        const cam6 = this.add.sprite(1026, 557, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam6.setOrigin(0, 0);
        cams.add(cam6);

        // cam5
        const cam5 = this.add.sprite(700, 425, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/167");
        cam5.setOrigin(0, 0);
        cams.add(cam5);

        // fnaf_Numbers___Nights_Camera_and_Nights_170
        const fnaf_Numbers___Nights_Camera_and_Nights_170 = this.add.image(836, 350, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/170");
        fnaf_Numbers___Nights_Camera_and_Nights_170.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_170);

        // fnaf_Numbers___Nights_Camera_and_Nights_171
        const fnaf_Numbers___Nights_Camera_and_Nights_171 = this.add.image(813, 403, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/171");
        fnaf_Numbers___Nights_Camera_and_Nights_171.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_171);

        // fnaf_Numbers___Nights_Camera_and_Nights_177
        const fnaf_Numbers___Nights_Camera_and_Nights_177 = this.add.image(782, 482, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/177");
        fnaf_Numbers___Nights_Camera_and_Nights_177.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_177);

        // fnaf_Numbers___Nights_Camera_and_Nights_172
        const fnaf_Numbers___Nights_Camera_and_Nights_172 = this.add.image(830, 597, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/172");
        fnaf_Numbers___Nights_Camera_and_Nights_172.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_172);

        // fnaf_Numbers___Nights_Camera_and_Nights_165
        const fnaf_Numbers___Nights_Camera_and_Nights_165 = this.add.image(830, 639, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/165");
        fnaf_Numbers___Nights_Camera_and_Nights_165.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_165);

        // fnaf_Numbers___Nights_Camera_and_Nights_169
        const fnaf_Numbers___Nights_Camera_and_Nights_169 = this.add.image(939, 597, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/169");
        fnaf_Numbers___Nights_Camera_and_Nights_169.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_169);

        // fnaf_Numbers___Nights_Camera_and_Nights_173
        const fnaf_Numbers___Nights_Camera_and_Nights_173 = this.add.image(938, 638, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/173");
        fnaf_Numbers___Nights_Camera_and_Nights_173.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_173);

        // fnaf_Numbers___Nights_Camera_and_Nights_175
        const fnaf_Numbers___Nights_Camera_and_Nights_175 = this.add.image(1034, 563, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/175");
        fnaf_Numbers___Nights_Camera_and_Nights_175.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_175);

        // fnaf_Numbers___Nights_Camera_and_Nights_168
        const fnaf_Numbers___Nights_Camera_and_Nights_168 = this.add.image(750, 580, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/168");
        fnaf_Numbers___Nights_Camera_and_Nights_168.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_168);

        // fnaf_Numbers___Nights_Camera_and_Nights_176
        const fnaf_Numbers___Nights_Camera_and_Nights_176 = this.add.image(1043, 432, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/176");
        fnaf_Numbers___Nights_Camera_and_Nights_176.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_176);

        // fnaf_Numbers___Nights_Camera_and_Nights_174
        const fnaf_Numbers___Nights_Camera_and_Nights_174 = this.add.image(706, 433, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/174");
        fnaf_Numbers___Nights_Camera_and_Nights_174.setOrigin(0, 0);
        cams.add(fnaf_Numbers___Nights_Camera_and_Nights_174);

        // cameraDisabled
        const cameraDisabled = this.add.image(385, 116, "fnaf", "fnaf/Numbers & Nights/Camera and Nights/42");
        cameraDisabled.setOrigin(0, 0);
        cams.add(cameraDisabled);

        // power
        const power = this.add.bitmapText(168, 638, "BurbankBigCondensatedBlack", "100%");
        power.text = "100%";
        power.fontSize = -30;

        // hour
        const hour = new TextBox(this, 1016, 32, "BurbankBigCondensatedBlack");
        this.add.existing(hour);
        hour.text = "12 AM";
        hour.fontSize = -35;

        // night
        const night = new TextBox(this, 1016, 65, "BurbankSmallMedium");
        this.add.existing(night);
        night.text = "Night 1";
        night.fontSize = -15;

        // close
        const close = this.add.image(1115, 40, "interface", "interface/promptClose0001");
        close.scaleX = 0.5;
        close.scaleY = 0.5;

        // lists
        const camsbtn = [cam5, cam6, cam7, cam3, cam4b, cam4a, cam2b, cam2a, cam1c, cam1b, cam1a];

        // cameraFlipper (components)
        new ButtonComponent(cameraFlipper);

        // hour (prefab fields)
        hour.boxWidth = 75;
        hour.boxHeight = 100;
        hour.horizontalAlign = 2;

        // night (prefab fields)
        night.boxWidth = 75;
        night.boxHeight = 100;
        night.horizontalAlign = 2;

        // close (components)
        const closeButtonComponent = new ButtonComponent(close);
        closeButtonComponent.upTexture = {"key":"interface","frame":"interface/promptClose0001"};
        closeButtonComponent.overTexture = {"key":"interface","frame":"interface/promptClose0002"};
        closeButtonComponent.downTexture = {"key":"interface","frame":"interface/promptClose0003"};
        closeButtonComponent.handCursor = true;
        closeButtonComponent.pixelPerfect = true;

        this.camstatic = camstatic;
        this.fastLeft = fastLeft;
        this.fastRight = fastRight;
        this.scrollLeft = scrollLeft;
        this.scrollRight = scrollRight;
        this.monitor = monitor;
        this.blipper = blipper;
        this.usageLabel = usageLabel;
        this.powerLabel = powerLabel;
        this.usage = usage;
        this.cameraFlipper = cameraFlipper;
        this.muteCall = muteCall;
        this.location = location;
        this.cam1a = cam1a;
        this.cam1b = cam1b;
        this.cam1c = cam1c;
        this.cam2a = cam2a;
        this.cam2b = cam2b;
        this.cam4a = cam4a;
        this.cam4b = cam4b;
        this.cam3 = cam3;
        this.cam7 = cam7;
        this.cam6 = cam6;
        this.cam5 = cam5;
        this.cameraDisabled = cameraDisabled;
        this.cams = cams;
        this.power = power;
        this.hour = hour;
        this.night = night;
        this.close = close;
        this.camsbtn = camsbtn;

        this.events.emit("scene-awake");
    }

    public camstatic!: Phaser.GameObjects.Sprite;
    public fastLeft!: Phaser.GameObjects.Rectangle;
    public fastRight!: Phaser.GameObjects.Rectangle;
    public scrollLeft!: Phaser.GameObjects.Rectangle;
    public scrollRight!: Phaser.GameObjects.Rectangle;
    public monitor!: Phaser.GameObjects.Sprite;
    public blipper!: Phaser.GameObjects.Sprite;
    public usageLabel!: Phaser.GameObjects.Image;
    public powerLabel!: Phaser.GameObjects.Image;
    public usage!: Phaser.GameObjects.Image;
    public cameraFlipper!: Phaser.GameObjects.Image;
    public muteCall!: Phaser.GameObjects.Image;
    public location!: Phaser.GameObjects.Image;
    public cam1a!: Phaser.GameObjects.Sprite;
    public cam1b!: Phaser.GameObjects.Sprite;
    public cam1c!: Phaser.GameObjects.Sprite;
    public cam2a!: Phaser.GameObjects.Sprite;
    public cam2b!: Phaser.GameObjects.Sprite;
    public cam4a!: Phaser.GameObjects.Sprite;
    public cam4b!: Phaser.GameObjects.Sprite;
    public cam3!: Phaser.GameObjects.Sprite;
    public cam7!: Phaser.GameObjects.Sprite;
    public cam6!: Phaser.GameObjects.Sprite;
    public cam5!: Phaser.GameObjects.Sprite;
    public cameraDisabled!: Phaser.GameObjects.Image;
    public cams!: Phaser.GameObjects.Layer;
    public power!: Phaser.GameObjects.BitmapText;
    public hour!: TextBox;
    public night!: TextBox;
    public close!: Phaser.GameObjects.Image;
    private camsbtn!: Phaser.GameObjects.Sprite[];

    /* START-USER-CODE */

    init(data: any) {
        this.scene.moveBelow('Interface');
        this.fnaf = data.game;
    }

    public fnaf: FNAF;
    public currentView: View;

    public scrollingLeft: boolean = false;
    public scrollingFarLeft: boolean = false;
    public scrollingRight: boolean = false;
    public scrollingFarRight: boolean = false;

    create() {

        this.editorCreate();

        this.cameras.main.setZoom(1080 / 720);
        this.cameras.main.setOrigin(0, 0);

        this.startCall();

        this.scrollLeft.setInteractive();
        this.scrollLeft.on('pointerover', () => this.scrollingLeft = true);
        this.scrollLeft.on('pointerout', () => this.scrollingLeft = false);

        this.fastLeft.setInteractive();
        this.fastLeft.on('pointerover', () => this.scrollingFarLeft = true);
        this.fastLeft.on('pointerout', () => this.scrollingFarLeft = false);

        this.scrollRight.setInteractive();
        this.scrollRight.on('pointerover', () => this.scrollingRight = true);
        this.scrollRight.on('pointerout', () => this.scrollingRight = false);

        this.fastRight.setInteractive();
        this.fastRight.on('pointerover', () => this.scrollingFarRight = true);
        this.fastRight.on('pointerout', () => this.scrollingFarRight = false);

        this.cameraFlipper.on('out', () => this.cameraFlipper.alpha = 1);
        this.cameraFlipper.on('over', () => {
            if (this.fnaf.isGameLocked) return;
            this.cameraFlipper.alpha = 0.01;
            if (this.monitor.anims.isPlaying) return;

            if (this.fnaf.lookingAtCameras) this.flipCamerasDown();
            else this.flipCamerasUp();
        });

        this.close.on('release', () => this.fnaf.endGame());

        this.cam1a.setInteractive();
        this.cam1a.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.SHOW_STAGE);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam1a.play('fnaf-cam-animation');
        });

        this.cam1a.play('fnaf-cam-animation');

        this.cam1b.setInteractive();
        this.cam1b.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.DINING_HALL);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam1b.play('fnaf-cam-animation');
        });

        this.cam1c.setInteractive();
        this.cam1c.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.PIRATE_COVE);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam1c.play('fnaf-cam-animation');
        });

        this.cam2a.setInteractive();
        this.cam2a.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.WEST_HALL);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam2a.play('fnaf-cam-animation');
        });

        this.cam2b.setInteractive();
        this.cam2b.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.WEST_HALL_CORNER);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam2b.play('fnaf-cam-animation');
        });

        this.cam3.setInteractive();
        this.cam3.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.SUPPLY_CLOSET);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam3.play('fnaf-cam-animation');
        });

        this.cam4a.setInteractive();
        this.cam4a.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.EAST_HALL);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam4a.play('fnaf-cam-animation');
        });

        this.cam4b.setInteractive();
        this.cam4b.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.EAST_HALL_CORNER);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam4b.play('fnaf-cam-animation');
        });

        this.cam5.setInteractive();
        this.cam5.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.BACKSTAGE);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam5.play('fnaf-cam-animation');
        });

        this.cam6.setInteractive();
        this.cam6.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.KITCHEN);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam6.play('fnaf-cam-animation');
        });

        this.cam7.setInteractive();
        this.cam7.on('pointerdown', () => {
            this.fnaf.changeCamera(Location.RESTROOMS);
            this.blipCameras();
            this.camsbtn.forEach(cam => {
                cam.stop();
                cam.setFrame("fnaf/Numbers & Nights/Camera and Nights/167");
            });
            this.cam7.play('fnaf-cam-animation');
        });

        this.fnaf.events.on('usage:update', this.onUsageUpdate, this);
        this.fnaf.events.on('power:update', this.onPowerUpdate, this);
        this.fnaf.events.on('hour:update', this.onHourUpdate, this);
        this.fnaf.events.on('camera:change', this.onCameraChange, this);
        this.fnaf.events.on('jumpscare:show', this.onJumpscareShow, this);

        this.fnaf.events.on('camera:state', (state: boolean) => {
            if (state) this.setView(View.CAMERAS);
            else this.setView(View.OFFICE);
        });
        this.setView(View.OFFICE);
        this.onCameraChange(this.fnaf.currentCamera);
        this.onHourUpdate(this.fnaf.currentHour);
        this.onPowerUpdate(this.fnaf.power);
        this.onUsageUpdate(this.fnaf.powerUsage);
    }

    startCall(): void {
        this.muteCall.visible = false;
        this.muteCall.setInteractive();
        let call = this.time.delayedCall(5000, () => this.muteCall.visible = true);
        switch (this.fnaf.currentNight) {
            case 1:
                this.sound.play('fnaf-voiceover1c');
                this.muteCall.once('pointerdown', () => {
                    this.muteCall.visible = false;
                    this.sound.stopByKey('fnaf-voiceover1c');
                });
                break;
            case 2:
                this.sound.play('fnaf-voiceover2a');
                this.muteCall.once('pointerdown', () => {
                    this.muteCall.visible = false;
                    this.sound.stopByKey('fnaf-voiceover2a');
                });
                break;
            case 3:
                this.sound.play('fnaf-voiceover3');
                this.muteCall.once('pointerdown', () => {
                    this.muteCall.visible = false;
                    this.sound.stopByKey('fnaf-voiceover3');
                });
                break;
            case 4:
                this.sound.play('fnaf-voiceover4');
                this.muteCall.once('pointerdown', () => {
                    this.muteCall.visible = false;
                    this.sound.stopByKey('fnaf-voiceover4');
                });
                break;
            case 5:
                this.sound.play('fnaf-voiceover5');
                this.muteCall.once('pointerdown', () => {
                    this.muteCall.visible = false;
                    this.sound.stopByKey('fnaf-voiceover5');
                });
                break;
            default:
                call.remove(false);
                break;
        }
    }

    onUsageUpdate(usage: number): void {
        let usageFrame = "fnaf/Office/Door & Lights/Power/212";
        if (this.fnaf.powerUsage >= 5) usageFrame = "fnaf/Office/Door & Lights/Power/455";
        else if (this.fnaf.powerUsage >= 4) usageFrame = "fnaf/Office/Door & Lights/Power/456";
        else if (this.fnaf.powerUsage >= 3) usageFrame = "fnaf/Office/Door & Lights/Power/214";
        else if (this.fnaf.powerUsage >= 2) usageFrame = "fnaf/Office/Door & Lights/Power/213";
        else usageFrame = "fnaf/Office/Door & Lights/Power/212";

        this.usage.visible = true;
        this.usage.setFrame(usageFrame);
    }

    onPowerUpdate(power: number): void {
        if (power <= 0) {
            if (this.fnaf.lookingAtCameras) this.flipCamerasDown();
            this.usage.visible = false;
            this.hour.visible = false;
            this.power.visible = false;
            this.night.visible = false;
            this.cameraFlipper.visible = false;
            this.usageLabel.visible = false;
            this.powerLabel.visible = false;
        } else {
            this.power.text = `${Math.round(this.fnaf.power)}%`;
        }
    }

    onHourUpdate(hour: number): void {
        this.hour.text = `${hour == 0 ? 12 : (hour > 12 ? hour - 12 : hour)} ${hour < 12 ? 'AM' : 'PM'}`;
        this.night.text = `Night ${this.fnaf.currentNight}`;
    }

    onCameraChange(location: Location): void {
        this.cameraDisabled.visible = false;
        switch (location) {
            case Location.SHOW_STAGE:
                this.location.setFrame("fnaf/Locations/Names/54");
                break;
            case Location.DINING_HALL:
                this.location.setFrame("fnaf/Locations/Names/72");
                break;
            case Location.PIRATE_COVE:
                this.location.setFrame("fnaf/Locations/Names/73");
                break;
            case Location.RESTROOMS:
                this.location.setFrame("fnaf/Locations/Names/77");
                break;
            case Location.KITCHEN:
                this.cameraDisabled.visible = true;
                this.location.setFrame("fnaf/Locations/Names/78");
                break;
            case Location.EAST_HALL:
                this.location.setFrame("fnaf/Locations/Names/79");
                break;
            case Location.EAST_HALL_CORNER:
                this.location.setFrame("fnaf/Locations/Names/75");
                break;
            case Location.WEST_HALL:
                this.location.setFrame("fnaf/Locations/Names/74");
                break;
            case Location.WEST_HALL_CORNER:
                this.location.setFrame("fnaf/Locations/Names/75");
                break;
            case Location.SUPPLY_CLOSET:
                this.location.setFrame("fnaf/Locations/Names/50");
                break;
            case Location.BACKSTAGE:
                this.location.setFrame("fnaf/Locations/Names/71");
                break;
        }
    }

    onJumpscareShow(): void {
        if (this.currentView == View.CAMERAS) this.flipCamerasDown(false);
        this.usage.visible = false;
        this.hour.visible = false;
        this.power.visible = false;
        this.night.visible = false;
        this.cameraFlipper.visible = false;
        this.usageLabel.visible = false;
        this.powerLabel.visible = false;
    }

    update(time: number, delta: number): void {
        if (this.fnaf.isGameLocked) return;
        this.fnaf.officeScroller.x -= this.scrollingLeft ? delta * 0.1 : 0;
        this.fnaf.officeScroller.x -= this.scrollingFarLeft ? delta * 0.5 : 0;
        this.fnaf.officeScroller.x += this.scrollingRight ? delta * 0.1 : 0;
        this.fnaf.officeScroller.x += this.scrollingFarRight ? delta * 0.5 : 0;
        this.fnaf.officeScroller.x = Math.min(Math.max(570, this.fnaf.officeScroller.x), 1030);
    }

    flipCamerasDown(showGame = true): void {
        this.sound.stopByKey('fnaf-CAMERA_VIDEO_LOA_60105303');
        this.sound.play('fnaf-put-down');
        this.monitor.playReverse('fnaf-monitorflip-animation');
        if (showGame) this.fnaf.showOffice();
        this.setView(View.OFFICE);
    }

    flipCamerasUp(showGame = true): void {
        this.sound.play('fnaf-CAMERA_VIDEO_LOA_60105303');
        this.monitor.play('fnaf-monitorflip-animation');
        this.monitor.once('animationcomplete', () => {
            if (showGame) this.fnaf.showCameras();
            this.setView(View.CAMERAS);
            this.blipCameras();
        });
    }

    blipCameras(): void {
        if (!this.fnaf.lookingAtCameras) return;

        this.sound.play('fnaf-blip3');
        this.blipper.visible = true;
        this.blipper.play('fnaf-dividedstatic-animation');
    }

    setView(view: View) {
        this.currentView = view;
        this.cams.visible = view == View.CAMERAS;
        this.blipper.visible = view == View.CAMERAS;
        this.location.visible = view == View.CAMERAS;
        this.camstatic.visible = view == View.CAMERAS;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
