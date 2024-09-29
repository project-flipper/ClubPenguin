/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../lib/ui/components/InputBlocker";
import NewPlayer from "./views/NewPlayer";
import PasswordPrompt from "./views/PasswordPrompt";
import WorldSelect from "./views/WorldSelect";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import ErrorArea from "@clubpenguin/app/ErrorArea";
import { Locale } from "@clubpenguin/app/locale";
import Load from "@clubpenguin/load/Load";
import { LoaderTask } from "@clubpenguin/load/tasks";
import { HTTPError } from "@clubpenguin/net/airtower";
import { BanError } from "@clubpenguin/net/types/api";
import { WorldData } from "@clubpenguin/net/types/world";
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

        load.track(new LoaderTask('Login loader', this.load));
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
        let load = this.scene.get('Load') as Load;
        let buttonCallback = () => {
            this.unlock();
            return true;
        };

        let { ok } = await error.shield(() => {
            if (name.length == 0) throw { message: 'shell.NAME_REQUIRED', buttonCallback, type: 'c', code: error.NAME_REQUIRED };
            else if (name.length < this.MIN_USERNAME_LENGTH) throw { message: 'shell.NAME_SHORT', buttonCallback, type: 'c', code: error.NAME_SHORT };
            else if (name.length > this.MAX_USERNAME_LENGTH) throw { message: 'shell.NAME_LONG', buttonCallback, type: 'c', code: error.NAME_LONG };
            else if (password.length == 0) throw { message: 'shell.PASSWORD_REQUIRED', buttonCallback, type: 'c', code: error.PASSWORD_REQUIRED };
            else if (password.length < this.MIN_PASS_LENGTH) throw { message: 'shell.PASSWORD_SHORT', buttonCallback, type: 'c', code: error.PASSWORD_SHORT };
            else if (password.length > this.MAX_PASS_LENGTH) throw { message: 'shell.PASSWORD_LONG', buttonCallback, type: 'c', code: error.PASSWORD_LONG };
        }, e => e);

        if (!ok) return;

        load.show({ text: `${this.game.locale.localize('Logging in')} ${name}` });

        await error.shield(this.game.airtower.logIn(name, password), e => {
            if (e instanceof HTTPError) {
                load.hide();
    
                if (e.response.status == 401) return { message: 'shell.PASSWORD_WRONG', buttonCallback, type: 'c', code: error.PASSWORD_WRONG };
                else if (e.response.status == 403) {
                    // we might have a ban
                    let err = e.data?.error as BanError;
                    if ([601, 610, 611].includes(err?.error_type)) {
                        let duration = err?.ban_dur;
                        if (duration == -1) return { message: 'shell.BAN_FOREVER', buttonCallback, type: 'c', code: error.BAN_FOREVER };

                        let hours = duration / 60;
                        if (hours < 1) return { message:'shell.BAN_AN_HOUR', buttonCallback, type: 'c', code: error.BAN_AN_HOUR };
                        else {
                            let cperror = error.createError({ message: 'shell.BAN_DURATION', buttonCallback, type: 'c', code: error.BAN_DURATION });
                            cperror.message.replace('%0 %1', `${Math.ceil(hours)} ${this.game.locale.localize('hours')}`);
                            return cperror;
                        }
                    }
                } else if (e.response.status == 404) return { message: 'shell.NAME_NOT_FOUND', buttonCallback, type: 'c', code: error.NAME_NOT_FOUND };
                else if (e.response.status == 429) return { message: 'shell.LOGIN_FLOODING', buttonCallback, type: 'c', code: error.LOGIN_FLOODING };
            }

            return { message: 'shell.NO_SOCKET_CONNECTION', buttonCallback: () => {
                window.location.reload();
                return false;
            }, type: 'c', code: error.NO_SOCKET_CONNECTION};
        });

        let worlds = await this.game.airtower.getWorlds();

        this.worldSelect.setup(worlds.data);
        this.showWorldSelect();

        load.hide();
    }

    async joinWorld(world: WorldData): Promise<void> {
        let load = this.scene.get('Load') as Load;
        load.show({ logo: true });

        let error = this.scene.get('ErrorArea') as ErrorArea;

        let { ok } = await error.shield(this.game.airtower.connect(world.url), e => {
            load.hide();
            return { message: 'shell.NO_SOCKET_CONNECTION', type: 'c', code: error.NO_SOCKET_CONNECTION};
        });

        if (!ok) return;

        this.scene.start('World', world);
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
