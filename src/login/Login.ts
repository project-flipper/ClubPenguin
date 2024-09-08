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
import { HTTPError } from "../net/airtower";
import { BanError, LoginResponse } from "../net/types/api";
import ErrorArea from "../app/ErrorArea";
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

    unlock(): void {
        if (this.newPlayerView.visible) {
            this.newPlayerView.unlock();
        }
    }

    showSavePasswordPrompt(successCallback: () => void, rejectCallback: () => void): void {
        this.passwordPrompt.show(successCallback, rejectCallback, this);
    }


    public MIN_PASS_LENGTH = 4;
    public MAX_PASS_LENGTH = 32;
    public MIN_USERNAME_LENGTH = 4;
    public MAX_USERNAME_LENGTH = 12;

    async login({ name, password, saveName, savePassword }: {
        name: string,
        password: string,
        saveName: boolean,
        savePassword: boolean
    }): Promise<void> {
        let error = this.scene.get('ErrorArea') as ErrorArea;
        if (name.length == 0) {
            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.NAME_REQUIRED', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.unlock();
                return true;
            }, error.makeCode('c', error.NAME_REQUIRED));
        } else if (name.length < this.MIN_USERNAME_LENGTH) {
            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.NAME_SHORT', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.unlock();
                return true;
            }, error.makeCode('c', error.NAME_SHORT));
        } else if (name.length > this.MAX_USERNAME_LENGTH) {
            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.NAME_LONG', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.unlock();
                return true;
            }, error.makeCode('c', error.NAME_LONG));
        } else if (password.length == 0) {
            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.PASSWORD_REQUIRED', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.unlock();
                return true;
            }, error.makeCode('c', error.PASSWORD_REQUIRED));
        } else if (password.length < this.MIN_PASS_LENGTH) {
            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.PASSWORD_SHORT', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.unlock();
                return true;
            }, error.makeCode('c', error.PASSWORD_SHORT));
        } else if (password.length > this.MAX_PASS_LENGTH) {
            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.PASSWORD_LONG', 'error_lang'), this.game.locale.localize('Okay'), () => {
                this.unlock();
                return true;
            }, error.makeCode('c', error.PASSWORD_LONG));
        }

        let load = this.scene.get('Load') as Load;
        load.show({ text: `${this.game.locale.localize('Logging in')} ${name}` });

        let response: LoginResponse;
        try {
            response = await this.game.airtower.logIn(name, password, savePassword);
        } catch (e) {
            console.error(e);
            if (e instanceof HTTPError) {
                if (e.response.status == 401) {
                    load.hide();
                    return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.PASSWORD_WRONG', 'error_lang'), this.game.locale.localize('Okay'), () => {
                        this.unlock();
                        return true;
                    }, error.makeCode('c', error.PASSWORD_WRONG));
                }
                else if (e.response.status == 403) {
                    // we might have a ban
                    let err = e.data?.error as BanError;
                    if ([601, 610, 611].includes(err?.error_type)) {
                        let duration = err?.ban_dur;
                        load.hide();

                        if (duration == -1) {
                            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.BAN_FOREVER', 'error_lang'), this.game.locale.localize('Okay'), () => {
                                this.unlock();
                                return true;
                            }, error.makeCode('c', error.BAN_FOREVER));
                        }

                        let hours = duration / 60;

                        if (hours < 1) {
                            return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.BAN_AN_HOUR', 'error_lang'), this.game.locale.localize('Okay'), () => {
                                this.unlock();
                                return true;
                            }, error.makeCode('c', error.BAN_AN_HOUR));
                        } else {
                            let desc = this.game.locale.localize('shell.BAN_DURATION', 'error_lang').replace('%0 %1', `${Math.ceil(hours)} ${this.game.locale.localize('hours')}`);
                            return error.showError(error.WINDOW_SMALL, desc, this.game.locale.localize('Okay'), () => {
                                this.unlock();
                                return true;
                            }, error.makeCode('c', error.BAN_DURATION));
                        }
                    }
                    throw e;
                } else if (e.response.status == 404) {
                    load.hide();
                    return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.NAME_NOT_FOUND', 'error_lang'), this.game.locale.localize('Okay'), () => {
                        this.unlock();
                        return true;
                    }, error.makeCode('c', error.NAME_NOT_FOUND));
                } else if (e.response.status == 429) {
                    load.hide();
                    return error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.LOGIN_FLOODING', 'error_lang'), this.game.locale.localize('Okay'), () => {
                        this.unlock();
                        return true;
                    }, error.makeCode('c', error.LOGIN_FLOODING));
                }

            }

            error.showError(error.WINDOW_SMALL, this.game.locale.localize('shell.NO_SOCKET_CONNECTION', 'error_lang'), this.game.locale.localize('Okay'), () => {
                window.location.reload();
                return false;
            }, error.makeCode('c', error.NO_SOCKET_CONNECTION));

            throw e;
        }

        let worlds = await this.game.airtower.getWorlds();

        this.worldSelect.setup(worlds.data);
        this.showWorldSelect();

        load.hide();
    }

    selectWorld(id: string): void {
        let load = this.scene.get('Load') as Load;
        load.show({ logo: true });

        // TODO: access world

        this.scene.start('World', { id });
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
