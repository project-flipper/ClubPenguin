
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class ActionsMenu extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.image(0, 0, "interface", "interface/actionsBg");
        bg.setOrigin(0, 0);
        this.add(bg);

        // actionDance
        const actionDance = scene.add.image(78.6375, 78.75, "interface", "interface/actionsButton0001");
        this.add(actionDance);

        // interface_actionDance
        const interface_actionDance = scene.add.image(78.6375, 78.75, "interface", "interface/actionDance");
        this.add(interface_actionDance);

        // actionWave
        const actionWave = scene.add.image(78.6375, 222.75, "interface", "interface/actionsButton0001");
        this.add(actionWave);

        // interface_actionWave
        const interface_actionWave = scene.add.image(78.6375, 222.75, "interface", "interface/actionWave");
        this.add(interface_actionWave);

        // actionSitUpLeft
        const actionSitUpLeft = scene.add.image(42.6375, 330.75, "interface", "interface/actionsMiniButton0001");
        this.add(actionSitUpLeft);

        // actionSitUpRight
        const actionSitUpRight = scene.add.image(114.525, 330.75, "interface", "interface/actionsMiniButton0001");
        this.add(actionSitUpRight);

        // actionSitDownLeft
        const actionSitDownLeft = scene.add.image(42.6375, 403, "interface", "interface/actionsMiniButton0001");
        this.add(actionSitDownLeft);

        // actionSitDownRight
        const actionSitDownRight = scene.add.image(114.525, 403, "interface", "interface/actionsMiniButton0001");
        this.add(actionSitDownRight);

        // interface_actionSit
        const interface_actionSit = scene.add.image(76.1625, 368.325, "interface", "interface/actionSit");
        this.add(interface_actionSit);

        // bg (components)
        new InputBlocker(bg);

        // actionDance (components)
        const actionDanceButtonComponent = new ButtonComponent(actionDance);
        actionDanceButtonComponent.upTexture = {"key":"interface","frame":"interface/actionsButton0001"};
        actionDanceButtonComponent.overTexture = {"key":"interface","frame":"interface/actionsButton0002"};
        actionDanceButtonComponent.handCursor = true;

        // actionWave (components)
        const actionWaveButtonComponent = new ButtonComponent(actionWave);
        actionWaveButtonComponent.upTexture = {"key":"interface","frame":"interface/actionsButton0001"};
        actionWaveButtonComponent.overTexture = {"key":"interface","frame":"interface/actionsButton0002"};
        actionWaveButtonComponent.handCursor = true;

        // actionSitUpLeft (components)
        const actionSitUpLeftButtonComponent = new ButtonComponent(actionSitUpLeft);
        actionSitUpLeftButtonComponent.upTexture = {"key":"interface","frame":"interface/actionsMiniButton0001"};
        actionSitUpLeftButtonComponent.overTexture = {"key":"interface","frame":"interface/actionsMiniButton0002"};
        actionSitUpLeftButtonComponent.handCursor = true;

        // actionSitUpRight (components)
        const actionSitUpRightButtonComponent = new ButtonComponent(actionSitUpRight);
        actionSitUpRightButtonComponent.upTexture = {"key":"interface","frame":"interface/actionsMiniButton0001"};
        actionSitUpRightButtonComponent.overTexture = {"key":"interface","frame":"interface/actionsMiniButton0002"};
        actionSitUpRightButtonComponent.handCursor = true;

        // actionSitDownLeft (components)
        const actionSitDownLeftButtonComponent = new ButtonComponent(actionSitDownLeft);
        actionSitDownLeftButtonComponent.upTexture = {"key":"interface","frame":"interface/actionsMiniButton0001"};
        actionSitDownLeftButtonComponent.overTexture = {"key":"interface","frame":"interface/actionsMiniButton0002"};
        actionSitDownLeftButtonComponent.handCursor = true;

        // actionSitDownRight (components)
        const actionSitDownRightButtonComponent = new ButtonComponent(actionSitDownRight);
        actionSitDownRightButtonComponent.upTexture = {"key":"interface","frame":"interface/actionsMiniButton0001"};
        actionSitDownRightButtonComponent.overTexture = {"key":"interface","frame":"interface/actionsMiniButton0002"};
        actionSitDownRightButtonComponent.handCursor = true;

        this.bg = bg;
        this.actionDance = actionDance;
        this.actionWave = actionWave;
        this.actionSitUpLeft = actionSitUpLeft;
        this.actionSitUpRight = actionSitUpRight;
        this.actionSitDownLeft = actionSitDownLeft;
        this.actionSitDownRight = actionSitDownRight;

        /* START-USER-CTR-CODE */

        this.actionDance.on('release', () => {
            this.world.dance();
            this.visible = false;
        });

        this.actionWave.on('release', () => {
            this.world.wave();
            this.visible = false;
        });

        this.actionSitUpLeft.on('release', () => {
            this.world.sitUpLeft();
            this.visible = false;
        });

        this.actionSitUpRight.on('release', () => {
            this.world.sitUpRight();
            this.visible = false;
        });

        this.actionSitDownLeft.on('release', () => {
            this.world.sitDownLeft();
            this.visible = false;
        });

        this.actionSitDownRight.on('release', () => {
            this.world.sitDownRight();
            this.visible = false;
        });

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.Image;
    public actionDance: Phaser.GameObjects.Image;
    public actionWave: Phaser.GameObjects.Image;
    public actionSitUpLeft: Phaser.GameObjects.Image;
    public actionSitUpRight: Phaser.GameObjects.Image;
    public actionSitDownLeft: Phaser.GameObjects.Image;
    public actionSitDownRight: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    get world(): World{
        return this.scene.scene.get('World') as World;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
