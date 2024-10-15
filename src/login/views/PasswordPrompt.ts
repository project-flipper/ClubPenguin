
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../lib/ui/components/InputBlocker";
import SavePasswordPrompt from "../prefabs/SavePasswordPrompt";
import PublicComputerPrompt from "../prefabs/PublicComputerPrompt";
/* START-USER-IMPORTS */
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class PasswordPrompt extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // rectangle_1
        const rectangle_1 = scene.add.rectangle(0, 0, 1710, 1080);
        rectangle_1.setOrigin(0, 0);
        rectangle_1.isFilled = true;
        rectangle_1.fillColor = 0;
        rectangle_1.fillAlpha = 0.25;
        this.add(rectangle_1);

        // savePasswordPrompt
        const savePasswordPrompt = new SavePasswordPrompt(scene, 0, 0);
        savePasswordPrompt.visible = false;
        this.add(savePasswordPrompt);

        // publicComputerPrompt
        const publicComputerPrompt = new PublicComputerPrompt(scene, 0, 0);
        this.add(publicComputerPrompt);

        // rectangle_1 (components)
        new InputBlocker(rectangle_1);

        this.savePasswordPrompt = savePasswordPrompt;
        this.publicComputerPrompt = publicComputerPrompt;

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    public savePasswordPrompt: SavePasswordPrompt;
    public publicComputerPrompt: PublicComputerPrompt;

    /* START-USER-CODE */

    localize(locale: Locale): void {
        this.savePasswordPrompt.localize(locale);
        this.publicComputerPrompt.localize(locale);
    }

    show(successCallback: () => void, rejectCallback: () => void, context?: any): void {
        this.publicComputerPrompt.visible = true;
        this.savePasswordPrompt.visible = false;

        this.publicComputerPrompt.yesButton.off('release');
        this.publicComputerPrompt.yesButton.once('release', () => this.showSavePrompt(successCallback, rejectCallback, context));
        this.publicComputerPrompt.noButton.off('release');
        this.publicComputerPrompt.noButton.once('release', () => this.showSavePrompt(successCallback, rejectCallback, context));

        this.visible = true;
    }

    showSavePrompt(successCallback: () => void, rejectCallback: () => void, context?: any): void {
        this.publicComputerPrompt.visible = false;

        this.savePasswordPrompt.startCarousel();
        this.savePasswordPrompt.closeButton.off('release');
        this.savePasswordPrompt.closeButton.once('release', rejectCallback, context);
        this.savePasswordPrompt.closeButton.once('release', () => this.close());
        this.savePasswordPrompt.saveButton.off('release');
        this.savePasswordPrompt.saveButton.once('release', successCallback, context);
        this.savePasswordPrompt.dontSaveButton.off('release');
        this.savePasswordPrompt.dontSaveButton.once('release', rejectCallback, context);
        this.savePasswordPrompt.dontSaveButton.once('release', () => this.close());

        this.savePasswordPrompt.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
