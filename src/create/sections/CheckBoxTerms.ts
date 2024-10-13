/* START OF COMPILED CODE */

import Checkbox from "../prefabs/Checkbox";
import ErrorBubbleModified from "../prefabs/ErrorBubbleModified";
/* START-USER-IMPORTS */
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class CheckBoxTerms extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // checkbox
        const checkbox = new Checkbox(scene, 0, 0);
        this.add(checkbox);

        // text1
        const text1 = scene.add.bitmapText(49.5, 4.5, "BurbankSmallBold", "I agree to the ");
        text1.tintTopLeft = 6710886;
        text1.tintTopRight = 6710886;
        text1.tintBottomLeft = 6710886;
        text1.tintBottomRight = 6710886;
        text1.text = "I agree to the ";
        text1.fontSize = -18;
        this.add(text1);

        // link1
        const link1 = scene.add.bitmapText(173.3625, 2.25, "BurbankSmallBold", "PRIVACY POLICY");
        link1.tintTopLeft = 86940;
        link1.tintTopRight = 86940;
        link1.tintBottomLeft = 86940;
        link1.tintBottomRight = 86940;
        link1.text = "PRIVACY POLICY";
        link1.fontSize = -20.25;
        this.add(link1);

        // text2
        const text2 = scene.add.bitmapText(338.5125, 4.5, "BurbankSmallBold", " and ");
        text2.tintTopLeft = 6710886;
        text2.tintTopRight = 6710886;
        text2.tintBottomLeft = 6710886;
        text2.tintBottomRight = 6710886;
        text2.text = " and ";
        text2.fontSize = -18;
        this.add(text2);

        // link2
        const link2 = scene.add.bitmapText(379.2375, 2.25, "BurbankSmallBold", "TERMS OF USE");
        link2.tintTopLeft = 86940;
        link2.tintTopRight = 86940;
        link2.tintBottomLeft = 86940;
        link2.tintBottomRight = 86940;
        link2.text = "TERMS OF USE";
        link2.fontSize = -20.25;
        this.add(link2);

        // errorBubble
        const errorBubble = new ErrorBubbleModified(scene, 112.8375, -94.5);
        errorBubble.visible = false;
        this.add(errorBubble);

        // checkbox (prefab fields)
        checkbox.handCursor = true;

        this.checkbox = checkbox;
        this.text1 = text1;
        this.link1 = link1;
        this.text2 = text2;
        this.link2 = link2;
        this.errorBubble = errorBubble;

        /* START-USER-CTR-CODE */

        link1.setInteractive({ useHandCursor: true });
        link1.on('pointerup', (pointer: Phaser.Input.Pointer) => link1.emit('release', pointer.downTime));

        link2.setInteractive({ useHandCursor: true });
        link2.on('pointerup', (pointer: Phaser.Input.Pointer) => link2.emit('release', pointer.downTime));

        this.setLayout();
        checkbox.on('stateupdate', () => this.hideError());

        /* END-USER-CTR-CODE */
    }

    public checkbox: Checkbox;
    public text1: Phaser.GameObjects.BitmapText;
    public link1: Phaser.GameObjects.BitmapText;
    public text2: Phaser.GameObjects.BitmapText;
    public link2: Phaser.GameObjects.BitmapText;
    public errorBubble: ErrorBubbleModified;

    /* START-USER-CODE */

    setText(text1: string, link1: string, text2: string, link2: string): void {
        this.text1.text = text1;
        this.link1.text = link1;
        this.text2.text = text1;
        this.link2.text = link1;

        this.setLayout();
    }

    setLayout(): void {
        this.link1.x = this.text1.x + this.text1.width;
        this.text2.x = this.link1.x + this.link1.width;
        this.link2.x = this.text2.x + this.text2.width;
    }

    localize(locale: Locale): void {
        this.text1.text = locale.localize('checkbox1', 'create_module');
        this.link1.text = locale.localize('checkbox2', 'create_module');
        this.text2.text = locale.localize('checkbox3', 'create_module');
        this.link2.text = locale.localize('checkbox4', 'create_module');
        this.setLayout();
    }

    showError(message: string): void {
        this.errorBubble.textBox.text = message;
        this.errorBubble.visible = true;
    }

    hideError(): void {
        this.errorBubble.visible = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
