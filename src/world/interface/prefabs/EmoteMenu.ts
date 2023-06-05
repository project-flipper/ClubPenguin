
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EmoteMenu extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.image(-3, -3, "interface", "interface/emoteBg");
        bg.setOrigin(0, 0);
        this.add(bg);

        // emote_button1
        const emote_button1 = scene.add.image(40.5, 41.4, "interface", "interface/emote0001");
        this.add(emote_button1);

        // interface_emojiLaughing
        const interface_emojiLaughing = scene.add.image(40.5, 41.4, "interface", "interface/emojiLaughing");
        interface_emojiLaughing.scaleX = 0.8;
        interface_emojiLaughing.scaleY = 0.8;
        this.add(interface_emojiLaughing);

        // emote_button2
        const emote_button2 = scene.add.image(112.5, 41.4, "interface", "interface/emote0001");
        this.add(emote_button2);

        // interface_emojiHappy
        const interface_emojiHappy = scene.add.image(112.5, 41.4, "interface", "interface/emojiHappy");
        interface_emojiHappy.scaleX = 0.8;
        interface_emojiHappy.scaleY = 0.8;
        this.add(interface_emojiHappy);

        // emote_button3
        const emote_button3 = scene.add.image(184.5, 41.4, "interface", "interface/emote0001");
        this.add(emote_button3);

        // interface_emojiCoffee
        const interface_emojiCoffee = scene.add.image(184.5, 41.4, "interface", "interface/emojiCoffee");
        interface_emojiCoffee.scaleX = 0.8;
        interface_emojiCoffee.scaleY = 0.8;
        this.add(interface_emojiCoffee);

        // emote_button4
        const emote_button4 = scene.add.image(40.5, 113.4, "interface", "interface/emote0001");
        this.add(emote_button4);

        // interface_emojiIndifferent
        const interface_emojiIndifferent = scene.add.image(40.5, 113.4, "interface", "interface/emojiIndifferent");
        interface_emojiIndifferent.scaleX = 0.8;
        interface_emojiIndifferent.scaleY = 0.8;
        this.add(interface_emojiIndifferent);

        // emote_button5
        const emote_button5 = scene.add.image(112.5, 113.4, "interface", "interface/emote0001");
        this.add(emote_button5);

        // interface_emojiSad
        const interface_emojiSad = scene.add.image(112.5, 113.4, "interface", "interface/emojiSad");
        interface_emojiSad.scaleX = 0.8;
        interface_emojiSad.scaleY = 0.8;
        this.add(interface_emojiSad);

        // emote_button6
        const emote_button6 = scene.add.image(184.5, 113.4, "interface", "interface/emote0001");
        this.add(emote_button6);

        // interface_emojiController
        const interface_emojiController = scene.add.image(184.5, 113.4, "interface", "interface/emojiController");
        interface_emojiController.scaleX = 0.8;
        interface_emojiController.scaleY = 0.8;
        this.add(interface_emojiController);

        // emote_button7
        const emote_button7 = scene.add.image(40.5, 185.4, "interface", "interface/emote0001");
        this.add(emote_button7);

        // interface_emojiSurprised
        const interface_emojiSurprised = scene.add.image(40.5, 185.4, "interface", "interface/emojiSurprised");
        interface_emojiSurprised.scaleX = 0.8;
        interface_emojiSurprised.scaleY = 0.8;
        this.add(interface_emojiSurprised);

        // emote_button8
        const emote_button8 = scene.add.image(112.5, 185.4, "interface", "interface/emote0001");
        this.add(emote_button8);

        // interface_emojiPokingOutTongue
        const interface_emojiPokingOutTongue = scene.add.image(112.5, 185.4, "interface", "interface/emojiPokingOutTongue");
        interface_emojiPokingOutTongue.scaleX = 0.8;
        interface_emojiPokingOutTongue.scaleY = 0.8;
        this.add(interface_emojiPokingOutTongue);

        // emote_button9
        const emote_button9 = scene.add.image(184.5, 185.4, "interface", "interface/emote0001");
        this.add(emote_button9);

        // interface_emojiPopcorn
        const interface_emojiPopcorn = scene.add.image(184.5, 185.4, "interface", "interface/emojiPopcorn");
        interface_emojiPopcorn.scaleX = 0.63;
        interface_emojiPopcorn.scaleY = 0.63;
        this.add(interface_emojiPopcorn);

        // emote_button10
        const emote_button10 = scene.add.image(40.5, 257.4, "interface", "interface/emote0001");
        this.add(emote_button10);

        // interface_emojiWinking
        const interface_emojiWinking = scene.add.image(40.5, 257.4, "interface", "interface/emojiWinking");
        interface_emojiWinking.scaleX = 0.8;
        interface_emojiWinking.scaleY = 0.8;
        this.add(interface_emojiWinking);

        // emote_button11
        const emote_button11 = scene.add.image(112.5, 257.4, "interface", "interface/emote0001");
        this.add(emote_button11);

        // interface_emojiSick
        const interface_emojiSick = scene.add.image(112.5, 257.4, "interface", "interface/emojiSick");
        interface_emojiSick.scaleX = 0.8;
        interface_emojiSick.scaleY = 0.8;
        this.add(interface_emojiSick);

        // emote_button12
        const emote_button12 = scene.add.image(184.5, 257.4, "interface", "interface/emote0001");
        this.add(emote_button12);

        // interface_emojiPizza
        const interface_emojiPizza = scene.add.image(184.5, 257.4, "interface", "interface/emojiPizza");
        interface_emojiPizza.scaleX = 0.8;
        interface_emojiPizza.scaleY = 0.8;
        this.add(interface_emojiPizza);

        // emote_button13
        const emote_button13 = scene.add.image(40.5, 329.4, "interface", "interface/emote0001");
        this.add(emote_button13);

        // interface_emojiMad
        const interface_emojiMad = scene.add.image(40.5, 329.4, "interface", "interface/emojiMad");
        interface_emojiMad.scaleX = 0.8;
        interface_emojiMad.scaleY = 0.8;
        this.add(interface_emojiMad);

        // emote_button14
        const emote_button14 = scene.add.image(112.5, 329.4, "interface", "interface/emote0001");
        this.add(emote_button14);

        // interface_emojiUpset
        const interface_emojiUpset = scene.add.image(112.5, 329.4, "interface", "interface/emojiUpset");
        interface_emojiUpset.scaleX = 0.8;
        interface_emojiUpset.scaleY = 0.8;
        this.add(interface_emojiUpset);

        // emote_button15
        const emote_button15 = scene.add.image(184.5, 329.4, "interface", "interface/emote0001");
        this.add(emote_button15);

        // interface_emojiStrawberryIceCream
        const interface_emojiStrawberryIceCream = scene.add.image(184.5, 329.4, "interface", "interface/emojiStrawberryIceCream");
        interface_emojiStrawberryIceCream.scaleX = 0.8;
        interface_emojiStrawberryIceCream.scaleY = 0.8;
        this.add(interface_emojiStrawberryIceCream);

        // emote_button16
        const emote_button16 = scene.add.image(40.5, 401.4, "interface", "interface/emote0001");
        this.add(emote_button16);

        // interface_emojiMeh
        const interface_emojiMeh = scene.add.image(40.5, 401.4, "interface", "interface/emojiMeh");
        interface_emojiMeh.scaleX = 0.8;
        interface_emojiMeh.scaleY = 0.8;
        this.add(interface_emojiMeh);

        // emote_button17
        const emote_button17 = scene.add.image(112.5, 401.4, "interface", "interface/emote0001");
        this.add(emote_button17);

        // interface_emojiCake
        const interface_emojiCake = scene.add.image(112.5, 401.4, "interface", "interface/emojiCake");
        interface_emojiCake.scaleX = 0.8;
        interface_emojiCake.scaleY = 0.8;
        this.add(interface_emojiCake);

        // emote_button18
        const emote_button18 = scene.add.image(184.5, 401.4, "interface", "interface/emote0001");
        this.add(emote_button18);

        // interface_emojiShamrock
        const interface_emojiShamrock = scene.add.image(184.5, 401.4, "interface", "interface/emojiShamrock");
        interface_emojiShamrock.scaleX = 0.8;
        interface_emojiShamrock.scaleY = 0.8;
        this.add(interface_emojiShamrock);

        // emote_button19
        const emote_button19 = scene.add.image(40.5, 473.4, "interface", "interface/emote0001");
        this.add(emote_button19);

        // interface_emojiHeart
        const interface_emojiHeart = scene.add.image(40.5, 473.4, "interface", "interface/emojiHeart");
        interface_emojiHeart.scaleX = 0.7;
        interface_emojiHeart.scaleY = 0.7;
        this.add(interface_emojiHeart);

        // emote_button20
        const emote_button20 = scene.add.image(112.5, 473.4, "interface", "interface/emote0001");
        this.add(emote_button20);

        // interface_emojiLightBulb
        const interface_emojiLightBulb = scene.add.image(112.5, 473.4, "interface", "interface/emojiLightBulb");
        interface_emojiLightBulb.scaleX = 0.8;
        interface_emojiLightBulb.scaleY = 0.8;
        this.add(interface_emojiLightBulb);

        // emote_button21
        const emote_button21 = scene.add.image(184.5, 473.4, "interface", "interface/emote0001");
        this.add(emote_button21);

        // interface_emojiFlower
        const interface_emojiFlower = scene.add.image(184.5, 473.4, "interface", "interface/emojiFlower");
        interface_emojiFlower.scaleX = 0.8;
        interface_emojiFlower.scaleY = 0.8;
        this.add(interface_emojiFlower);

        // bg (components)
        new InputBlocker(bg);

        // emote_button1 (components)
        const emote_button1ButtonComponent = new ButtonComponent(emote_button1);
        emote_button1ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button1ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button1ButtonComponent.handCursor = true;
        emote_button1ButtonComponent.pixelPerfect = true;

        // emote_button2 (components)
        const emote_button2ButtonComponent = new ButtonComponent(emote_button2);
        emote_button2ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button2ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button2ButtonComponent.handCursor = true;
        emote_button2ButtonComponent.pixelPerfect = true;

        // emote_button3 (components)
        const emote_button3ButtonComponent = new ButtonComponent(emote_button3);
        emote_button3ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button3ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button3ButtonComponent.handCursor = true;
        emote_button3ButtonComponent.pixelPerfect = true;

        // emote_button4 (components)
        const emote_button4ButtonComponent = new ButtonComponent(emote_button4);
        emote_button4ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button4ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button4ButtonComponent.handCursor = true;
        emote_button4ButtonComponent.pixelPerfect = true;

        // emote_button5 (components)
        const emote_button5ButtonComponent = new ButtonComponent(emote_button5);
        emote_button5ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button5ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button5ButtonComponent.handCursor = true;
        emote_button5ButtonComponent.pixelPerfect = true;

        // emote_button6 (components)
        const emote_button6ButtonComponent = new ButtonComponent(emote_button6);
        emote_button6ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button6ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button6ButtonComponent.handCursor = true;
        emote_button6ButtonComponent.pixelPerfect = true;

        // emote_button7 (components)
        const emote_button7ButtonComponent = new ButtonComponent(emote_button7);
        emote_button7ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button7ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button7ButtonComponent.handCursor = true;
        emote_button7ButtonComponent.pixelPerfect = true;

        // emote_button8 (components)
        const emote_button8ButtonComponent = new ButtonComponent(emote_button8);
        emote_button8ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button8ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button8ButtonComponent.handCursor = true;
        emote_button8ButtonComponent.pixelPerfect = true;

        // emote_button9 (components)
        const emote_button9ButtonComponent = new ButtonComponent(emote_button9);
        emote_button9ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button9ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button9ButtonComponent.handCursor = true;
        emote_button9ButtonComponent.pixelPerfect = true;

        // emote_button10 (components)
        const emote_button10ButtonComponent = new ButtonComponent(emote_button10);
        emote_button10ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button10ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button10ButtonComponent.handCursor = true;
        emote_button10ButtonComponent.pixelPerfect = true;

        // emote_button11 (components)
        const emote_button11ButtonComponent = new ButtonComponent(emote_button11);
        emote_button11ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button11ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button11ButtonComponent.handCursor = true;
        emote_button11ButtonComponent.pixelPerfect = true;

        // emote_button12 (components)
        const emote_button12ButtonComponent = new ButtonComponent(emote_button12);
        emote_button12ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button12ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button12ButtonComponent.handCursor = true;
        emote_button12ButtonComponent.pixelPerfect = true;

        // emote_button13 (components)
        const emote_button13ButtonComponent = new ButtonComponent(emote_button13);
        emote_button13ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button13ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button13ButtonComponent.handCursor = true;
        emote_button13ButtonComponent.pixelPerfect = true;

        // emote_button14 (components)
        const emote_button14ButtonComponent = new ButtonComponent(emote_button14);
        emote_button14ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button14ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button14ButtonComponent.handCursor = true;
        emote_button14ButtonComponent.pixelPerfect = true;

        // emote_button15 (components)
        const emote_button15ButtonComponent = new ButtonComponent(emote_button15);
        emote_button15ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button15ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button15ButtonComponent.handCursor = true;
        emote_button15ButtonComponent.pixelPerfect = true;

        // emote_button16 (components)
        const emote_button16ButtonComponent = new ButtonComponent(emote_button16);
        emote_button16ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button16ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button16ButtonComponent.handCursor = true;
        emote_button16ButtonComponent.pixelPerfect = true;

        // emote_button17 (components)
        const emote_button17ButtonComponent = new ButtonComponent(emote_button17);
        emote_button17ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button17ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button17ButtonComponent.handCursor = true;
        emote_button17ButtonComponent.pixelPerfect = true;

        // emote_button18 (components)
        const emote_button18ButtonComponent = new ButtonComponent(emote_button18);
        emote_button18ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button18ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button18ButtonComponent.handCursor = true;
        emote_button18ButtonComponent.pixelPerfect = true;

        // emote_button19 (components)
        const emote_button19ButtonComponent = new ButtonComponent(emote_button19);
        emote_button19ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button19ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button19ButtonComponent.handCursor = true;
        emote_button19ButtonComponent.pixelPerfect = true;

        // emote_button20 (components)
        const emote_button20ButtonComponent = new ButtonComponent(emote_button20);
        emote_button20ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button20ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button20ButtonComponent.handCursor = true;
        emote_button20ButtonComponent.pixelPerfect = true;

        // emote_button21 (components)
        const emote_button21ButtonComponent = new ButtonComponent(emote_button21);
        emote_button21ButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        emote_button21ButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        emote_button21ButtonComponent.handCursor = true;
        emote_button21ButtonComponent.pixelPerfect = true;

        this.bg = bg;
        this.emote_button1 = emote_button1;
        this.emote_button2 = emote_button2;
        this.emote_button3 = emote_button3;
        this.emote_button4 = emote_button4;
        this.emote_button5 = emote_button5;
        this.emote_button6 = emote_button6;
        this.emote_button7 = emote_button7;
        this.emote_button8 = emote_button8;
        this.emote_button9 = emote_button9;
        this.emote_button10 = emote_button10;
        this.emote_button11 = emote_button11;
        this.emote_button12 = emote_button12;
        this.emote_button13 = emote_button13;
        this.emote_button14 = emote_button14;
        this.emote_button15 = emote_button15;
        this.emote_button16 = emote_button16;
        this.emote_button17 = emote_button17;
        this.emote_button18 = emote_button18;
        this.emote_button19 = emote_button19;
        this.emote_button20 = emote_button20;
        this.emote_button21 = emote_button21;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.Image;
    public emote_button1: Phaser.GameObjects.Image;
    public emote_button2: Phaser.GameObjects.Image;
    public emote_button3: Phaser.GameObjects.Image;
    public emote_button4: Phaser.GameObjects.Image;
    public emote_button5: Phaser.GameObjects.Image;
    public emote_button6: Phaser.GameObjects.Image;
    public emote_button7: Phaser.GameObjects.Image;
    public emote_button8: Phaser.GameObjects.Image;
    public emote_button9: Phaser.GameObjects.Image;
    public emote_button10: Phaser.GameObjects.Image;
    public emote_button11: Phaser.GameObjects.Image;
    public emote_button12: Phaser.GameObjects.Image;
    public emote_button13: Phaser.GameObjects.Image;
    public emote_button14: Phaser.GameObjects.Image;
    public emote_button15: Phaser.GameObjects.Image;
    public emote_button16: Phaser.GameObjects.Image;
    public emote_button17: Phaser.GameObjects.Image;
    public emote_button18: Phaser.GameObjects.Image;
    public emote_button19: Phaser.GameObjects.Image;
    public emote_button20: Phaser.GameObjects.Image;
    public emote_button21: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
