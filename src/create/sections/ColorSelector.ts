// You can write more code here

/* START OF COMPILED CODE */

import SmallProgressBubble from "../prefabs/SmallProgressBubble";
import ColorSwatch from "../prefabs/ColorSwatch";
/* START-USER-IMPORTS */
import Phaser from "phaser";

import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class ColorSelector extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // progressBubble
        const progressBubble = new SmallProgressBubble(scene, 0, 0);
        this.add(progressBubble);

        // titleTextBox
        const titleTextBox = scene.add.bitmapText(112.5, 19.6875, "BurbankSmallBold", "Choose a color:");
        titleTextBox.tintTopLeft = 2894894;
        titleTextBox.tintTopRight = 2894894;
        titleTextBox.tintBottomLeft = 2894894;
        titleTextBox.tintBottomRight = 2894894;
        titleTextBox.text = "Choose a color:";
        titleTextBox.fontSize = -27;
        this.add(titleTextBox);

        // swatch0
        const swatch0 = new ColorSwatch(scene, 112.5, 65.25);
        this.add(swatch0);

        // swatch1
        const swatch1 = new ColorSwatch(scene, 193.95, 65.25);
        this.add(swatch1);

        // swatch2
        const swatch2 = new ColorSwatch(scene, 275.4, 65.25);
        this.add(swatch2);

        // swatch3
        const swatch3 = new ColorSwatch(scene, 356.85, 65.25);
        this.add(swatch3);

        // swatch4
        const swatch4 = new ColorSwatch(scene, 438.3, 65.25);
        this.add(swatch4);

        // swatch5
        const swatch5 = new ColorSwatch(scene, 519.75, 65.25);
        this.add(swatch5);

        // swatch6
        const swatch6 = new ColorSwatch(scene, 601.2, 65.25);
        this.add(swatch6);

        // swatch7
        const swatch7 = new ColorSwatch(scene, 112.5, 137.25);
        this.add(swatch7);

        // swatch8
        const swatch8 = new ColorSwatch(scene, 193.95, 137.25);
        this.add(swatch8);

        // swatch9
        const swatch9 = new ColorSwatch(scene, 275.4, 137.25);
        this.add(swatch9);

        // swatch10
        const swatch10 = new ColorSwatch(scene, 356.85, 137.25);
        this.add(swatch10);

        // swatch11
        const swatch11 = new ColorSwatch(scene, 438.3, 137.25);
        this.add(swatch11);

        // swatch12
        const swatch12 = new ColorSwatch(scene, 519.75, 137.25);
        this.add(swatch12);

        // swatch13
        const swatch13 = new ColorSwatch(scene, 601.2, 137.25);
        this.add(swatch13);

        // lists
        const swatches = [swatch0, swatch1, swatch2, swatch3, swatch4, swatch5, swatch6, swatch7, swatch8, swatch9, swatch10, swatch11, swatch12, swatch13];

        // progressBubble (prefab fields)
        progressBubble.text = "2.";

        // swatch0 (prefab fields)
        swatch0.color = "#02a797";
        swatch0.colorId = 15;

        // swatch1 (prefab fields)
        swatch1.color = "#003366";
        swatch1.colorId = 1;

        // swatch2 (prefab fields)
        swatch2.color = "#009900";
        swatch2.colorId = 2;

        // swatch3 (prefab fields)
        swatch3.color = "#ff6565";
        swatch3.colorId = 10;

        // swatch4 (prefab fields)
        swatch4.color = "#ffcc00";
        swatch4.colorId = 7;

        // swatch5 (prefab fields)
        swatch5.color = "#650099";
        swatch5.colorId = 8;

        // swatch6 (prefab fields)
        swatch6.color = "#006600";
        swatch6.colorId = 11;

        // swatch7 (prefab fields)
        swatch7.color = "#ff6500";
        swatch7.colorId = 6;

        // swatch8 (prefab fields)
        swatch8.color = "#333333";
        swatch8.colorId = 4;

        // swatch9 (prefab fields)
        swatch9.color = "#0099cc";
        swatch9.colorId = 12;

        // swatch10 (prefab fields)
        swatch10.color = "#8ae802";
        swatch10.colorId = 13;

        // swatch11 (prefab fields)
        swatch11.color = "#996600";
        swatch11.colorId = 9;

        // swatch12 (prefab fields)
        swatch12.color = "#ff3299";
        swatch12.colorId = 3;

        // swatch13 (prefab fields)
        swatch13.color = "#cc0000";
        swatch13.colorId = 5;

        this.progressBubble = progressBubble;
        this.titleTextBox = titleTextBox;
        this.swatch0 = swatch0;
        this.swatch1 = swatch1;
        this.swatch2 = swatch2;
        this.swatch3 = swatch3;
        this.swatch4 = swatch4;
        this.swatch5 = swatch5;
        this.swatch6 = swatch6;
        this.swatch7 = swatch7;
        this.swatch8 = swatch8;
        this.swatch9 = swatch9;
        this.swatch10 = swatch10;
        this.swatch11 = swatch11;
        this.swatch12 = swatch12;
        this.swatch13 = swatch13;
        this.swatches = swatches;

        /* START-USER-CTR-CODE */

        this.selected = swatches[0];
        this.selected.selected = true;

        for (let swatch of swatches) swatch.contentFill.on('release', () => {
            this.selected.selected = false;
            this.selected = swatch;
            this.selected.selected = true;

            this.emit('swatchselect', swatch);
        });

        /* END-USER-CTR-CODE */
    }

    public progressBubble: SmallProgressBubble;
    public titleTextBox: Phaser.GameObjects.BitmapText;
    public swatch0: ColorSwatch;
    public swatch1: ColorSwatch;
    public swatch2: ColorSwatch;
    public swatch3: ColorSwatch;
    public swatch4: ColorSwatch;
    public swatch5: ColorSwatch;
    public swatch6: ColorSwatch;
    public swatch7: ColorSwatch;
    public swatch8: ColorSwatch;
    public swatch9: ColorSwatch;
    public swatch10: ColorSwatch;
    public swatch11: ColorSwatch;
    public swatch12: ColorSwatch;
    public swatch13: ColorSwatch;
    public swatches: ColorSwatch[];

    /* START-USER-CODE */

    public selected: ColorSwatch;

    localize(locale: Locale): void {
        this.titleTextBox.text = locale.localize('choose_color_title', 'create_module');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
