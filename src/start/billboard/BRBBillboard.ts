/* START OF COMPILED CODE */

import TextBox from "../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
import { Locale } from "@clubpenguin/app/locale";
/* END-USER-IMPORTS */

export default class BRBBillboard extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // billboardShadow
        const billboardShadow = scene.add.image(-13.5, -12.5, "billboardShadow");
        billboardShadow.setOrigin(0, 0);
        this.add(billboardShadow);

        // graphic
        const graphic = scene.add.image(0, 0, "billboard");
        graphic.setOrigin(0, 0);
        this.add(graphic);

        // titleTextBox
        const titleTextBox = new TextBox(scene, 49.5, 188.10000000000002, "BurbankSmallBlack");
        titleTextBox.tintFill = false;
        titleTextBox.tintTopLeft = 21423;
        titleTextBox.tintTopRight = 21423;
        titleTextBox.tintBottomLeft = 21423;
        titleTextBox.tintBottomRight = 21423;
        titleTextBox.text = "BRB!";
        titleTextBox.fontSize = -72;
        this.add(titleTextBox);

        // descriptionTextBox
        const descriptionTextBox = new TextBox(scene, 49.3875, 269.6625, "MyriadPro");
        descriptionTextBox.tintFill = false;
        descriptionTextBox.tintTopLeft = 0;
        descriptionTextBox.tintTopRight = 0;
        descriptionTextBox.tintBottomLeft = 0;
        descriptionTextBox.tintBottomRight = 0;
        descriptionTextBox.text = "We're busy updating stuff behind the scenes. \n\nWe'll be fully up and running again soon. \n\nThanks for your patience!";
        descriptionTextBox.fontSize = -31.5;
        this.add(descriptionTextBox);

        // titleTextBox (prefab fields)
        titleTextBox.boxWidth = 0;
        titleTextBox.boxHeight = 0;

        // descriptionTextBox (prefab fields)
        descriptionTextBox.boxWidth = 678.75;
        descriptionTextBox.boxHeight = 149.4;

        this.graphic = graphic;
        this.titleTextBox = titleTextBox;
        this.descriptionTextBox = descriptionTextBox;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public graphic: Phaser.GameObjects.Image;
    public titleTextBox: TextBox;
    public descriptionTextBox: TextBox;

    /* START-USER-CODE */

    static preload(load: Phaser.Loader.LoaderPlugin): void {
        load.pack('brb-billboard-pack', 'assets/start/billboard/brb-billboard-pack.json');
    }

    localize(locale: Locale): void {
        let title: string;
        let message: string;
        switch (locale.abbreviation) {
            case 'pt':
                title = 'Já voltamos!';
                message = 'Estamos atualizando algumas coisas nos bastidores.\n\nTudo voltará ao normal logo.\n\nAgradecemos por sua paciência!';
                break;
            case 'fr':
                title = 'À tout de suite!';
                message = 'On est en train de faire des mises à jour en coulisses.\n\nTout reviendra très bientôt à la normale.\n\nMerci de votre patience!';
                break;
            case 'es':
                title = '¡Ya regresamos!';
                message = 'Estamos actualizando algunas cosas detrás de escena.\n\nPronto todo volverá a la normalidad.\n\n¡Gracias por su paciencia!';
                break;
            case 'de':
                title = 'Bald zurück!';
                message = 'Wir aktualisieren die Seite.\n\nWir sind bald wieder erreichbar.\n\nVielen Dank für eure Geduld!';
                break;
            case 'ru':
                title = 'Скоро вернёмся!';
                message = 'В настоящее время идёт обновление игры.\n\nМы скоро закончим, и ты снова сможешь играть!\n\nСпасибо за терпение.';
                break;
            default:
                title = 'BRB!';
                message = 'We\'re busy updating stuff behind the scenes.\n\nWe\'ll be fully up and running again soon.\n\nThanks for your patience!';
                break;
        }

        this.titleTextBox.text = title;
        this.descriptionTextBox.text = message;
    }

    unload(app: App): void {
        app.unloadAssetPack('brb-billboad-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
