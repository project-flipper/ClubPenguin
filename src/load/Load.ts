/* START OF COMPILED CODE */

import InputBlocker from "../lib/components/InputBlocker";
import CartSurfer from "./prefabs/CartSurfer";
import TextBox from "../lib/ui/TextBox";
import Spinner from "./prefabs/Spinner";
/* START-USER-IMPORTS */
import { Task } from "@clubpenguin/load/tasks";
import Logo from "@clubpenguin/logo/Logo";
import { getLogger } from "@clubpenguin/lib/log";

export let logger = getLogger('CP.load');
/* END-USER-IMPORTS */

export default class Load extends Phaser.Scene {

    constructor() {
        super("Load");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("load-pack", "assets/load/load-pack.json");
    }

    editorCreate(): void {

        // loadingScreen
        const loadingScreen = this.add.container(0, 0);

        // background
        const background = this.add.image(0, 0, "club_penguin");
        background.setOrigin(0, 0);
        loadingScreen.add(background);

        // pizzaToss
        const pizzaToss = this.add.sprite(665.7750244140625, 50.625, "load", "load-screen/pizzatoss0001");
        pizzaToss.setOrigin(0, 0);
        loadingScreen.add(pizzaToss);

        // snowShovel
        const snowShovel = this.add.sprite(576.3375244140625, 238.83749389648438, "load", "load-screen/snowshovel0001");
        snowShovel.setOrigin(0, 0);
        loadingScreen.add(snowShovel);

        // cartSurfer
        const cartSurfer = new CartSurfer(this, 0, 0);
        loadingScreen.add(cartSurfer);

        // message
        const message = new TextBox(this, 498.375, 657, "BurbankSmallMedium");
        message.text = "Loading Description Message Text";
        message.fontSize = -36;
        message.align = 1;
        loadingScreen.add(message);

        // loadingDialog
        const loadingDialog = this.add.container(0, 0);
        loadingDialog.visible = false;

        // rectangle_1
        const rectangle_1 = this.add.rectangle(0, 0, 1710, 1080);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.alpha = 0.01;
        rectangle_1.isFilled = true;
        loadingDialog.add(rectangle_1);

        // dialog
        const dialog = this.add.nineslice(454.5, 326.25, "load", "load-screen/dialog", 796.5, 330.6375, 112.5, 112.5, 112.5, 112.5);
        dialog.setOrigin(0, 0);
        loadingDialog.add(dialog);

        // spinnerMask
        const spinnerMask = this.add.image(783.1125, 658.8, "load", "load-screen/mask");
        spinnerMask.setOrigin(0, 0);
        spinnerMask.visible = false;

        // spinner
        const spinner = new Spinner(this, 730.8, 643.16);
        this.add.existing(spinner);

        // lists
        const loadingAnimations = [pizzaToss, snowShovel, cartSurfer];

        // background (components)
        new InputBlocker(background);

        // message (prefab fields)
        message.boxWidth = 713.25;
        message.boxHeight = 52.2;
        message.horizontalAlign = 1;
        message.verticalAlign = 1;

        // rectangle_1 (components)
        new InputBlocker(rectangle_1);

        this.pizzaToss = pizzaToss;
        this.snowShovel = snowShovel;
        this.message = message;
        this.loadingScreen = loadingScreen;
        this.loadingDialog = loadingDialog;
        this.spinnerMask = spinnerMask;
        this.spinner = spinner;
        this.loadingAnimations = loadingAnimations;

        this.events.emit("scene-awake");
    }

    public pizzaToss!: Phaser.GameObjects.Sprite;
    public snowShovel!: Phaser.GameObjects.Sprite;
    public message!: TextBox;
    public loadingScreen!: Phaser.GameObjects.Container;
    public loadingDialog!: Phaser.GameObjects.Container;
    public spinnerMask!: Phaser.GameObjects.Image;
    public spinner!: Spinner;
    public loadingAnimations!: Array<Phaser.GameObjects.Sprite|CartSurfer>;

    /* START-USER-CODE */

    private _currentTasks: Task[];

    get allTasksDone(): boolean {
        for (let task of this._currentTasks) {
            if (!task.isDone) return false;
        }

        return true;
    }

    track<T extends Task>(task: T): T {
        this.untrack(task);

        task.on('progress', this._updateLoadingBar, this);
        task.once('done', () => {
            if (this.isTracking(task)) {
                this.untrack(task);
                if (this.allTasksDone) this.events.emit('tasksdone');
            }
        });

        task.bind();

        this._currentTasks.push(task);
        this._updateLoadingBar();

        return task;
    }

    isTracking(task: Task): boolean {
        return this._currentTasks.includes(task);
    }

    _updateLoadingBar(): void {
        let added = 0;
        for (let task of this._currentTasks) added += task.progress;

        let percentComplete = added / this._currentTasks.length;
        this.spinner.setProgress(percentComplete);
    }

    untrack<T extends Task>(task?: T): T {
        if (task === undefined) {
            for (let currentTask of this._currentTasks) this.untrack(currentTask);
            return;
        }

        let index = this._currentTasks.indexOf(task);
        if (index !== -1) {
            task.unbind();
            task.off('progress', this._updateLoadingBar, this);

            this._currentTasks.splice(index, 1);
            this._updateLoadingBar();
        }

        return task;
    }

    get allTasksComplete(): boolean {
        for (let task of this._currentTasks) if (!task.isDone) return false;

        return true;
    }

    waitAllTasksComplete(): Promise<void> {
        return new Promise<void>(resolve => {
            if (!this.allTasksComplete) this.events.once('tasksdone', () => resolve());
            else resolve();
        });
    }

    create(data: any): void {
        this.scene.setVisible(false);

        this.editorCreate();

        let mask = this.spinnerMask.createBitmapMask();
        this.spinner.content.mask = mask;

        this._currentTasks = [];

        this.scene.setActive(false);
        if (data.onready) data.onready(this);
    }

    show({ animation, logo, mini, text }: { animation?: number, logo?: boolean, mini?: boolean, text?: string } = {}): void {
        if (logo || mini) {
            for (let animationObj of this.loadingAnimations) {
                animationObj.visible = false;

                if (animationObj instanceof CartSurfer) {
                    animationObj.stopAnimation();
                } else {
                    animationObj.stop();
                }
            }
        } else {
            animation = animation === undefined ? Math.floor(Math.random() * this.loadingAnimations.length) : animation;

            let animationObj = this.loadingAnimations[animation];

            for (let otherAnimationObj of this.loadingAnimations) {
                if (otherAnimationObj === animationObj) continue;

                otherAnimationObj.visible = false;

                if (otherAnimationObj instanceof CartSurfer) {
                    otherAnimationObj.stopAnimation();
                } else {
                    otherAnimationObj.stop();
                }
            }

            animationObj.visible = true;

            if (animationObj === this.pizzaToss) {
                animationObj.play('load-pizzatoss-animation');
            } else if (animationObj === this.snowShovel) {
                animationObj.play('load-snowshovel-animation');
            } else if (animationObj instanceof CartSurfer) {
                animationObj.startAnimation();
            }
        }

        if (mini) {
            this.loadingScreen.visible = false;
            this.loadingDialog.visible = true;
            this.spinner.y = 454.05;
            this.spinnerMask.y = 469.69;
            this.spinner.visible = true;
        } else {
            if (logo) {
                let logoScene = this.scene.get('Logo') as Logo;
                if (logoScene) logoScene.show();
                this.spinner.y = 868.16;
                this.spinnerMask.y = 883.8;
            }
            else {
                this.spinner.y = 643.16;
                this.spinnerMask.y = 658.8;
            }

            if (text === undefined) {
                this.spinner.visible = true;
                this.message.visible = false;
            } else {
                this.spinner.visible = false;
                this.message.visible = true;
                this.message.text = text;
            }

            this.loadingDialog.visible = false;
            this.loadingScreen.visible = true;
        }

        this.scene.setActive(true);
        this.scene.setVisible(true);

        this.input.setDefaultCursor('default');
    }

    get isShowing(): boolean {
        return this.scene.isVisible();
    }

    hide(): void {
        for (let animationObj of this.loadingAnimations) {
            if (animationObj instanceof CartSurfer) {
                animationObj.stopAnimation();
            } else {
                animationObj.stop();
            }
        }

        let logoScene = this.scene.get('Logo') as Logo;
        if (logoScene) logoScene.hide();

        this.scene.setActive(false);
        this.scene.setVisible(false);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
