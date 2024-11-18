enum Floor {
    ROOF,
    GYM,
    LOBBY
}

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/components/InputBlocker";
import ButtonComponent from "../../../lib/components/ButtonComponent";
import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Locale } from "@clubpenguin/app/locale";
import { Engine } from "@clubpenguin/world/engine/engine";
import Interface, { Content } from "@clubpenguin/world/interface/Interface";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class HotelElevator extends Phaser.Scene implements Content {

    constructor() {
        super("HotelElevator");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("hotelelevator-pack", "assets/world/content/hotelelevator/hotelelevator-pack.json");
    }

    editorCreate(): void {

        // hotelelevator_base
        const hotelelevator_base = this.add.image(0, 0, "hotelelevator", "hotelelevator/base");
        hotelelevator_base.setOrigin(0, 0);

        // hotelelevator_slot
        const hotelelevator_slot = this.add.image(429.75, 265.5, "hotelelevator", "hotelelevator/slot");
        hotelelevator_slot.setOrigin(0, 0);

        // hotelelevator_slot_1
        const hotelelevator_slot_1 = this.add.image(429.75, 508.5, "hotelelevator", "hotelelevator/slot");
        hotelelevator_slot_1.setOrigin(0, 0);

        // hotelelevator_slot_2
        const hotelelevator_slot_2 = this.add.image(429.75, 751.5, "hotelelevator", "hotelelevator/slot");
        hotelelevator_slot_2.setOrigin(0, 0);

        // close
        const close = this.add.image(1620, 36, "hotelelevator", "hotelelevator/close0001");
        close.setOrigin(0, 0);

        // roof
        const roof = this.add.image(152.89, 241.99, "hotelelevator", "hotelelevator/roof0001");
        roof.setOrigin(0, 0);

        // hotelelevator_roof0004
        const hotelelevator_roof0004 = this.add.image(152.89, 241.99, "hotelelevator", "hotelelevator/roof0004");
        hotelelevator_roof0004.setOrigin(0, 0);
        hotelelevator_roof0004.alpha = 0.0001;
        hotelelevator_roof0004.alphaTopLeft = 0.0001;
        hotelelevator_roof0004.alphaTopRight = 0.0001;
        hotelelevator_roof0004.alphaBottomLeft = 0.0001;
        hotelelevator_roof0004.alphaBottomRight = 0.0001;

        // gym
        const gym = this.add.image(152.89, 484.99, "hotelelevator", "hotelelevator/gym0001");
        gym.setOrigin(0, 0);

        // hotelelevator_gym0004
        const hotelelevator_gym0004 = this.add.image(152.89, 484.99, "hotelelevator", "hotelelevator/gym0004");
        hotelelevator_gym0004.setOrigin(0, 0);
        hotelelevator_gym0004.alpha = 0.0001;
        hotelelevator_gym0004.alphaTopLeft = 0.0001;
        hotelelevator_gym0004.alphaTopRight = 0.0001;
        hotelelevator_gym0004.alphaBottomLeft = 0.0001;
        hotelelevator_gym0004.alphaBottomRight = 0.0001;

        // lobby
        const lobby = this.add.image(152.89, 727.99, "hotelelevator", "hotelelevator/lobby0001");
        lobby.setOrigin(0, 0);

        // hotelelevator_lobby0004
        const hotelelevator_lobby0004 = this.add.image(152.89, 727.99, "hotelelevator", "hotelelevator/lobby0004");
        hotelelevator_lobby0004.setOrigin(0, 0);
        hotelelevator_lobby0004.alpha = 0.0001;
        hotelelevator_lobby0004.alphaTopLeft = 0.0001;
        hotelelevator_lobby0004.alphaTopRight = 0.0001;
        hotelelevator_lobby0004.alphaBottomLeft = 0.0001;
        hotelelevator_lobby0004.alphaBottomRight = 0.0001;

        // titleShadow
        const titleShadow = new TextBox(this, 488.48, 117, "CatseyeCyrillicBold");
        this.add.existing(titleShadow);
        titleShadow.tintFill = true;
        titleShadow.tintTopLeft = 15581522;
        titleShadow.tintTopRight = 15581522;
        titleShadow.tintBottomLeft = 15581522;
        titleShadow.tintBottomRight = 15581522;
        titleShadow.text = "ELEVATOR";
        titleShadow.fontSize = 83.25;
        titleShadow.align = 0;

        // title
        const title = new TextBox(this, 492.98, 112.5, "CatseyeCyrillicBold");
        this.add.existing(title);
        title.tintFill = true;
        title.tintTopLeft = 7160861;
        title.tintTopRight = 7160861;
        title.tintBottomLeft = 7160861;
        title.tintBottomRight = 7160861;
        title.text = "ELEVATOR";
        title.fontSize = 83.25;
        title.align = 0;

        // roofLabelShadow
        const roofLabelShadow = new TextBox(this, 479.59, 270, "CatseyeCyrillicBold");
        this.add.existing(roofLabelShadow);
        roofLabelShadow.tintFill = true;
        roofLabelShadow.tintTopLeft = 16174959;
        roofLabelShadow.tintTopRight = 16174959;
        roofLabelShadow.tintBottomLeft = 16174959;
        roofLabelShadow.tintBottomRight = 16174959;
        roofLabelShadow.text = "ROOF";
        roofLabelShadow.fontSize = 83.25;
        roofLabelShadow.align = 0;

        // roofLabel
        const roofLabel = new TextBox(this, 484.09, 265.5, "CatseyeCyrillicBold");
        this.add.existing(roofLabel);
        roofLabel.tintFill = true;
        roofLabel.tintTopLeft = 7226654;
        roofLabel.tintTopRight = 7226654;
        roofLabel.tintBottomLeft = 7226654;
        roofLabel.tintBottomRight = 7226654;
        roofLabel.text = "ROOF";
        roofLabel.fontSize = 83.25;
        roofLabel.align = 0;

        // gymLabelShadow
        const gymLabelShadow = new TextBox(this, 479.59, 508.5, "CatseyeCyrillicBold");
        this.add.existing(gymLabelShadow);
        gymLabelShadow.tintFill = true;
        gymLabelShadow.tintTopLeft = 16174959;
        gymLabelShadow.tintTopRight = 16174959;
        gymLabelShadow.tintBottomLeft = 16174959;
        gymLabelShadow.tintBottomRight = 16174959;
        gymLabelShadow.text = "GYM AND SPA";
        gymLabelShadow.fontSize = 83.25;
        gymLabelShadow.align = 0;

        // gymLabel
        const gymLabel = new TextBox(this, 484.09, 508.5, "CatseyeCyrillicBold");
        this.add.existing(gymLabel);
        gymLabel.tintFill = true;
        gymLabel.tintTopLeft = 7226654;
        gymLabel.tintTopRight = 7226654;
        gymLabel.tintBottomLeft = 7226654;
        gymLabel.tintBottomRight = 7226654;
        gymLabel.text = "GYM AND SPA";
        gymLabel.fontSize = 83.25;
        gymLabel.align = 0;

        // lobbyLabelShadow
        const lobbyLabelShadow = new TextBox(this, 479.59, 756, "CatseyeCyrillicBold");
        this.add.existing(lobbyLabelShadow);
        lobbyLabelShadow.tintFill = true;
        lobbyLabelShadow.tintTopLeft = 16174959;
        lobbyLabelShadow.tintTopRight = 16174959;
        lobbyLabelShadow.tintBottomLeft = 16174959;
        lobbyLabelShadow.tintBottomRight = 16174959;
        lobbyLabelShadow.text = "LOBBY";
        lobbyLabelShadow.fontSize = 83.25;
        lobbyLabelShadow.align = 0;

        // lobbyLabel
        const lobbyLabel = new TextBox(this, 484.09, 751.5, "CatseyeCyrillicBold");
        this.add.existing(lobbyLabel);
        lobbyLabel.tintFill = true;
        lobbyLabel.tintTopLeft = 7226654;
        lobbyLabel.tintTopRight = 7226654;
        lobbyLabel.tintBottomLeft = 7226654;
        lobbyLabel.tintBottomRight = 7226654;
        lobbyLabel.text = "LOBBY";
        lobbyLabel.fontSize = 83.25;
        lobbyLabel.align = 0;

        // hotelelevator_base (components)
        new InputBlocker(hotelelevator_base);

        // close (components)
        const closeButtonComponent = new ButtonComponent(close);
        closeButtonComponent.handCursor = true;
        closeButtonComponent.pixelPerfect = true;

        // roof (components)
        const roofButtonComponent = new ButtonComponent(roof);
        roofButtonComponent.upTexture = {"key":"hotelelevator","frame":"hotelelevator/roof0001"};
        roofButtonComponent.overTexture = {"key":"hotelelevator","frame":"hotelelevator/roof0002"};
        roofButtonComponent.downTexture = {"key":"hotelelevator","frame":"hotelelevator/roof0003"};
        roofButtonComponent.handCursor = true;
        roofButtonComponent.pixelPerfect = true;
        roofButtonComponent.hitbox = hotelelevator_roof0004;

        // gym (components)
        const gymButtonComponent = new ButtonComponent(gym);
        gymButtonComponent.upTexture = {"key":"hotelelevator","frame":"hotelelevator/gym0001"};
        gymButtonComponent.overTexture = {"key":"hotelelevator","frame":"hotelelevator/gym0002"};
        gymButtonComponent.downTexture = {"key":"hotelelevator","frame":"hotelelevator/gym0003"};
        gymButtonComponent.handCursor = true;
        gymButtonComponent.pixelPerfect = true;
        gymButtonComponent.hitbox = hotelelevator_gym0004;

        // lobby (components)
        const lobbyButtonComponent = new ButtonComponent(lobby);
        lobbyButtonComponent.upTexture = {"key":"hotelelevator","frame":"hotelelevator/lobby0001"};
        lobbyButtonComponent.overTexture = {"key":"hotelelevator","frame":"hotelelevator/lobby0002"};
        lobbyButtonComponent.downTexture = {"key":"hotelelevator","frame":"hotelelevator/lobby0003"};
        lobbyButtonComponent.handCursor = true;
        lobbyButtonComponent.pixelPerfect = true;
        lobbyButtonComponent.hitbox = hotelelevator_lobby0004;

        // titleShadow (prefab fields)
        titleShadow.boxWidth = 742.05;
        titleShadow.boxHeight = 141.75;
        titleShadow.horizontalAlign = 1;
        titleShadow.verticalAlign = 1;

        // title (prefab fields)
        title.boxWidth = 742.05;
        title.boxHeight = 141.75;
        title.horizontalAlign = 1;
        title.verticalAlign = 1;

        // roofLabelShadow (prefab fields)
        roofLabelShadow.boxWidth = 1102.5;
        roofLabelShadow.boxHeight = 189;
        roofLabelShadow.horizontalAlign = 0;
        roofLabelShadow.verticalAlign = 1;

        // roofLabel (prefab fields)
        roofLabel.boxWidth = 1102.5;
        roofLabel.boxHeight = 189;
        roofLabel.horizontalAlign = 0;
        roofLabel.verticalAlign = 1;

        // gymLabelShadow (prefab fields)
        gymLabelShadow.boxWidth = 1102.5;
        gymLabelShadow.boxHeight = 189;
        gymLabelShadow.horizontalAlign = 0;
        gymLabelShadow.verticalAlign = 1;

        // gymLabel (prefab fields)
        gymLabel.boxWidth = 1102.5;
        gymLabel.boxHeight = 189;
        gymLabel.horizontalAlign = 0;
        gymLabel.verticalAlign = 1;

        // lobbyLabelShadow (prefab fields)
        lobbyLabelShadow.boxWidth = 1102.5;
        lobbyLabelShadow.boxHeight = 189;
        lobbyLabelShadow.horizontalAlign = 0;
        lobbyLabelShadow.verticalAlign = 1;

        // lobbyLabel (prefab fields)
        lobbyLabel.boxWidth = 1102.5;
        lobbyLabel.boxHeight = 189;
        lobbyLabel.horizontalAlign = 0;
        lobbyLabel.verticalAlign = 1;

        this.close = close;
        this.roof = roof;
        this.gym = gym;
        this.lobby = lobby;
        this.titleShadow = titleShadow;
        this.title = title;
        this.roofLabelShadow = roofLabelShadow;
        this.roofLabel = roofLabel;
        this.gymLabelShadow = gymLabelShadow;
        this.gymLabel = gymLabel;
        this.lobbyLabelShadow = lobbyLabelShadow;
        this.lobbyLabel = lobbyLabel;

        this.events.emit("scene-awake");
    }

    public close!: Phaser.GameObjects.Image;
    public roof!: Phaser.GameObjects.Image;
    public gym!: Phaser.GameObjects.Image;
    public lobby!: Phaser.GameObjects.Image;
    public titleShadow!: TextBox;
    public title!: TextBox;
    public roofLabelShadow!: TextBox;
    public roofLabel!: TextBox;
    public gymLabelShadow!: TextBox;
    public gymLabel!: TextBox;
    public lobbyLabelShadow!: TextBox;
    public lobbyLabel!: TextBox;

    /* START-USER-CODE */

    declare game: App;

    public hidesInterface = true;
    public aboveInterface = true;

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
        if (data.oninit) data.oninit(this);
    }

    public targetFloor: Floor;
    public goTo: Phaser.Time.TimerEvent;

    create(data: any) {

        this.editorCreate();

        this.roof.on('release', () => {
            this.sound.play('hotelelevator-ring');
            this.targetFloor = Floor.ROOF;
            if (!this.goTo) this.goTo = this.time.delayedCall(500, () => this.goToFloor());
        });
        this.gym.on('release', () => {
            this.sound.play('hotelelevator-ring');
            this.targetFloor = Floor.GYM;
            if (!this.goTo) this.goTo = this.time.delayedCall(500, () => this.goToFloor());
        });
        this.lobby.on('release', () => {
            this.sound.play('hotelelevator-ring');
            this.targetFloor = Floor.LOBBY;
            if (!this.goTo) this.goTo = this.time.delayedCall(500, () => this.goToFloor());
        });

        this.close.on('release', () => this.interface.safeCloseContent());

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    goToFloor(floor?: number) {
        switch (floor ?? this.targetFloor) {
            case Floor.ROOF:
                this.world.joinRoom(432, 148.5, 573.75);
                break;
            case Floor.GYM:
                this.world.joinRoom(431, 112.5, 474.75);
                break;
            case Floor.LOBBY:
                this.world.joinRoom(430, 90.0, 551.25);
                break;
        }
        this.goTo = undefined;
    }

    localize(locale: Locale) {
        switch (locale.abbreviation) {
            case 'de':
                this.title.text = 'AUFZUG';
                this.roofLabel.text = 'DACH';
                this.gymLabel.text = 'FITNESS UND SPA';
                this.lobbyLabel.text = 'LOBBY';
                break;
            case 'es':
                this.title.text = 'ASCENSOR';
                this.roofLabel.text = 'TEJADO';
                this.gymLabel.text = 'GIMNASIO Y SPA';
                this.lobbyLabel.text = 'LOBBY';
                break;
            case 'fr':
                this.title.text = 'ASCENSEUR';
                this.roofLabel.text = 'TOIT';
                this.gymLabel.text = 'GYM ET SPA';
                this.lobbyLabel.text = 'HALL D\'ENTRÉE';
                break;
            case 'pt':
                this.title.text = 'ELEVADOR';
                this.roofLabel.text = 'COBERTURA';
                this.gymLabel.text = 'BEM ESTAR';
                this.lobbyLabel.text = 'SAGUÃO';
                break;
            case 'ru':
                this.title.text = 'ЛИФТ';
                this.roofLabel.text = 'КРЫША';
                this.gymLabel.text = 'ФИTHEC И СПА';
                this.lobbyLabel.text = 'ЛОББИ';
                break;
            default:
                this.title.text = 'ELEVATOR';
                this.roofLabel.text = 'ROOF';
                this.gymLabel.text = 'GYM AND SPA';
                this.lobbyLabel.text = 'LOBBY';
                break;
        }

        this.titleShadow.text = this.title.text;
        this.roofLabelShadow.text = this.roofLabel.text;
        this.gymLabelShadow.text = this.gymLabel.text;
        this.lobbyLabelShadow.text = this.lobbyLabel.text;
    }

    unload(interface_: Interface): void {
        this.game.locale.unregister(this.localize);
        interface_.game.unloadAssetPack('hotelelevator-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
