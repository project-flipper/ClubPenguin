/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../lib/ui/components/InputBlocker";
import NewPlayer from "./views/NewPlayer";
import PasswordPrompt from "./views/PasswordPrompt";
import WorldSelect from "./views/WorldSelect";
/* START-USER-IMPORTS */
import type Load from '../load/Load';
import { LoaderTask } from '../load/tasks';
import type { Locale } from "../app/locale";
import type { App } from "../app/app";
/* END-USER-IMPORTS */

export default class Login extends Phaser.Scene {

    constructor() {
        super("Login");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("login-pack", "assets/login/login-pack.json");
    }

    editorCreate(): void {

        // background
        const background = this.add.image(0, 0, "login", "login-screen/background");
        background.setOrigin(0, 0);

        // newPlayerView
        const newPlayerView = new NewPlayer(this, 0, 0);
        this.add.existing(newPlayerView);
        newPlayerView.visible = false;

        // passwordPrompt
        const passwordPrompt = new PasswordPrompt(this, 0, 0);
        this.add.existing(passwordPrompt);
        passwordPrompt.visible = false;

        // worldSelect
        const worldSelect = new WorldSelect(this, 0, 0);
        this.add.existing(worldSelect);
        worldSelect.visible = false;

        // background (components)
        new InputBlocker(background);

        this.newPlayerView = newPlayerView;
        this.passwordPrompt = passwordPrompt;
        this.worldSelect = worldSelect;

        this.events.emit("scene-awake");
    }

    public newPlayerView!: NewPlayer;
    public passwordPrompt!: PasswordPrompt;
    public worldSelect!: WorldSelect;

    /* START-USER-CODE */

    declare game: App;

    init(): void {
        let load = this.scene.get('Load') as Load;

        load.track(new LoaderTask(this.load));
        if (!load.isShowing) load.show();
    }

    create(): void {

        this.editorCreate();

        this.game.locale.register(this.localize, this);
        this.events.on('shutdown', () => {
            this.game.locale.unregister(this.localize);
            this.game.unloadAssetPack('login-pack');
        });

        let load = this.scene.get('Load') as Load;
        if (load.isShowing) load.waitAllTasksComplete().then(() => load.hide());

        this.showNewPlayer();
    }

    localize(locale: Locale): void {
        this.newPlayerView.localize(locale);
        this.worldSelect.localize(locale);
        this.passwordPrompt.localize(locale);
    }

    showNewPlayer(): void {
        this.newPlayerView.x = 0;
        this.newPlayerView.unlock();
        this.newPlayerView.visible = true;
        this.worldSelect.visible = false;
    }

    showWorldSelect(): void {
        this.newPlayerView.lock();
        this.newPlayerView.x = -9999;
        this.worldSelect.visible = true;
    }

    showSavePasswordPrompt(successCallback: () => void, rejectCallback: () => void): void {
        this.passwordPrompt.show(successCallback, rejectCallback, this);
    }

    async login({ name, password, saveName, savePassword }: {
        name: string,
        password: string,
        saveName: boolean,
        savePassword: boolean
    }): Promise<void> {
        let load = this.scene.get('Load') as Load;
        load.show({ text: `${this.game.locale.localize('Logging in')} ${name}` });

        // TODO: login

        load.hide();

        this.worldSelect.setup({
            worlds: [
                {
                    id: 0,
                    name: 'Local test',
                    population: 1,
                    buddies: false,
                    safeChat: false,
                }
            ], token: ''
        });
        this.showWorldSelect();
    }

    selectWorld(id: string): void {
        let load = this.scene.get('Load') as Load;
        load.show({ logo: true });

        // TODO: access world

        setTimeout(() => {
            this.scene.start('World', {
                id
            });
        }, 1000);
    }

    goToStart(): void {
        this.scene.start('Startscreen');
    }

    goToCreate(): void {
        this.scene.start('Create');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
