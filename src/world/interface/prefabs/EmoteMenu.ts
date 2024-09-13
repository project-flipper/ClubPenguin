
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
/* START-USER-IMPORTS */
import Interface from "../Interface";
import { Emoji } from "../../../net/types/chat/emoji";
/* END-USER-IMPORTS */

export default class EmoteMenu extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.image(-3, -3, "interface", "interface/emoteBg");
        bg.setOrigin(0, 0);
        this.add(bg);

        // laughing_btn
        const laughing_btn = scene.add.image(40.5, 41.4, "interface", "interface/emote0001");
        this.add(laughing_btn);

        // interface_emojiLaughing
        const interface_emojiLaughing = scene.add.image(40.5, 41.4, "interface", "interface/emojiLaughing");
        interface_emojiLaughing.scaleX = 0.8;
        interface_emojiLaughing.scaleY = 0.8;
        this.add(interface_emojiLaughing);

        // happy_btn
        const happy_btn = scene.add.image(112.5, 41.4, "interface", "interface/emote0001");
        this.add(happy_btn);

        // interface_emojiHappy
        const interface_emojiHappy = scene.add.image(112.5, 41.4, "interface", "interface/emojiHappy");
        interface_emojiHappy.scaleX = 0.8;
        interface_emojiHappy.scaleY = 0.8;
        this.add(interface_emojiHappy);

        // coffee_btn
        const coffee_btn = scene.add.image(184.5, 41.4, "interface", "interface/emote0001");
        this.add(coffee_btn);

        // interface_emojiCoffee
        const interface_emojiCoffee = scene.add.image(184.5, 41.4, "interface", "interface/emojiCoffee");
        interface_emojiCoffee.scaleX = 0.8;
        interface_emojiCoffee.scaleY = 0.8;
        this.add(interface_emojiCoffee);

        // indifferent_btn
        const indifferent_btn = scene.add.image(40.5, 113.4, "interface", "interface/emote0001");
        this.add(indifferent_btn);

        // interface_emojiIndifferent
        const interface_emojiIndifferent = scene.add.image(40.5, 113.4, "interface", "interface/emojiIndifferent");
        interface_emojiIndifferent.scaleX = 0.8;
        interface_emojiIndifferent.scaleY = 0.8;
        this.add(interface_emojiIndifferent);

        // sad_btn
        const sad_btn = scene.add.image(112.5, 113.4, "interface", "interface/emote0001");
        this.add(sad_btn);

        // interface_emojiSad
        const interface_emojiSad = scene.add.image(112.5, 113.4, "interface", "interface/emojiSad");
        interface_emojiSad.scaleX = 0.8;
        interface_emojiSad.scaleY = 0.8;
        this.add(interface_emojiSad);

        // controller_btn
        const controller_btn = scene.add.image(184.5, 113.4, "interface", "interface/emote0001");
        this.add(controller_btn);

        // interface_emojiController
        const interface_emojiController = scene.add.image(184.5, 113.4, "interface", "interface/emojiController");
        interface_emojiController.scaleX = 0.8;
        interface_emojiController.scaleY = 0.8;
        this.add(interface_emojiController);

        // surprised_btn
        const surprised_btn = scene.add.image(40.5, 185.4, "interface", "interface/emote0001");
        this.add(surprised_btn);

        // interface_emojiSurprised
        const interface_emojiSurprised = scene.add.image(40.5, 185.4, "interface", "interface/emojiSurprised");
        interface_emojiSurprised.scaleX = 0.8;
        interface_emojiSurprised.scaleY = 0.8;
        this.add(interface_emojiSurprised);

        // pokingOutTongue_btn
        const pokingOutTongue_btn = scene.add.image(112.5, 185.4, "interface", "interface/emote0001");
        this.add(pokingOutTongue_btn);

        // interface_emojiPokingOutTongue
        const interface_emojiPokingOutTongue = scene.add.image(112.5, 185.4, "interface", "interface/emojiPokingOutTongue");
        interface_emojiPokingOutTongue.scaleX = 0.8;
        interface_emojiPokingOutTongue.scaleY = 0.8;
        this.add(interface_emojiPokingOutTongue);

        // popcorn_btn
        const popcorn_btn = scene.add.image(184.5, 185.4, "interface", "interface/emote0001");
        this.add(popcorn_btn);

        // interface_emojiPopcorn
        const interface_emojiPopcorn = scene.add.image(184.5, 185.4, "interface", "interface/emojiPopcorn");
        interface_emojiPopcorn.scaleX = 0.63;
        interface_emojiPopcorn.scaleY = 0.63;
        this.add(interface_emojiPopcorn);

        // winking_btn
        const winking_btn = scene.add.image(40.5, 257.4, "interface", "interface/emote0001");
        this.add(winking_btn);

        // interface_emojiWinking
        const interface_emojiWinking = scene.add.image(40.5, 257.4, "interface", "interface/emojiWinking");
        interface_emojiWinking.scaleX = 0.8;
        interface_emojiWinking.scaleY = 0.8;
        this.add(interface_emojiWinking);

        // sick_btn
        const sick_btn = scene.add.image(112.5, 257.4, "interface", "interface/emote0001");
        this.add(sick_btn);

        // interface_emojiSick
        const interface_emojiSick = scene.add.image(112.5, 257.4, "interface", "interface/emojiSick");
        interface_emojiSick.scaleX = 0.8;
        interface_emojiSick.scaleY = 0.8;
        this.add(interface_emojiSick);

        // pizza_btn
        const pizza_btn = scene.add.image(184.5, 257.4, "interface", "interface/emote0001");
        this.add(pizza_btn);

        // interface_emojiPizza
        const interface_emojiPizza = scene.add.image(184.5, 257.4, "interface", "interface/emojiPizza");
        interface_emojiPizza.scaleX = 0.8;
        interface_emojiPizza.scaleY = 0.8;
        this.add(interface_emojiPizza);

        // mad_btn
        const mad_btn = scene.add.image(40.5, 329.4, "interface", "interface/emote0001");
        this.add(mad_btn);

        // interface_emojiMad
        const interface_emojiMad = scene.add.image(40.5, 329.4, "interface", "interface/emojiMad");
        interface_emojiMad.scaleX = 0.8;
        interface_emojiMad.scaleY = 0.8;
        this.add(interface_emojiMad);

        // upset_btn
        const upset_btn = scene.add.image(112.5, 329.4, "interface", "interface/emote0001");
        this.add(upset_btn);

        // interface_emojiUpset
        const interface_emojiUpset = scene.add.image(112.5, 329.4, "interface", "interface/emojiUpset");
        interface_emojiUpset.scaleX = 0.8;
        interface_emojiUpset.scaleY = 0.8;
        this.add(interface_emojiUpset);

        // strawberryIceCream_btn
        const strawberryIceCream_btn = scene.add.image(184.5, 329.4, "interface", "interface/emote0001");
        this.add(strawberryIceCream_btn);

        // interface_emojiStrawberryIceCream
        const interface_emojiStrawberryIceCream = scene.add.image(184.5, 329.4, "interface", "interface/emojiStrawberryIceCream");
        interface_emojiStrawberryIceCream.scaleX = 0.8;
        interface_emojiStrawberryIceCream.scaleY = 0.8;
        this.add(interface_emojiStrawberryIceCream);

        // meh_btn
        const meh_btn = scene.add.image(40.5, 401.4, "interface", "interface/emote0001");
        this.add(meh_btn);

        // interface_emojiMeh
        const interface_emojiMeh = scene.add.image(40.5, 401.4, "interface", "interface/emojiMeh");
        interface_emojiMeh.scaleX = 0.8;
        interface_emojiMeh.scaleY = 0.8;
        this.add(interface_emojiMeh);

        // cake_btn
        const cake_btn = scene.add.image(112.5, 401.4, "interface", "interface/emote0001");
        this.add(cake_btn);

        // interface_emojiCake
        const interface_emojiCake = scene.add.image(112.5, 401.4, "interface", "interface/emojiCake");
        interface_emojiCake.scaleX = 0.8;
        interface_emojiCake.scaleY = 0.8;
        this.add(interface_emojiCake);

        // shamrock_btn
        const shamrock_btn = scene.add.image(184.5, 401.4, "interface", "interface/emote0001");
        this.add(shamrock_btn);

        // interface_emojiShamrock
        const interface_emojiShamrock = scene.add.image(184.5, 401.4, "interface", "interface/emojiShamrock");
        interface_emojiShamrock.scaleX = 0.8;
        interface_emojiShamrock.scaleY = 0.8;
        this.add(interface_emojiShamrock);

        // heart_btn
        const heart_btn = scene.add.image(40.5, 473.4, "interface", "interface/emote0001");
        this.add(heart_btn);

        // interface_emojiHeart
        const interface_emojiHeart = scene.add.image(40.5, 473.4, "interface", "interface/emojiHeart");
        interface_emojiHeart.scaleX = 0.7;
        interface_emojiHeart.scaleY = 0.7;
        this.add(interface_emojiHeart);

        // lightbulb_btn
        const lightbulb_btn = scene.add.image(112.5, 473.4, "interface", "interface/emote0001");
        this.add(lightbulb_btn);

        // interface_emojiLightBulb
        const interface_emojiLightBulb = scene.add.image(112.5, 473.4, "interface", "interface/emojiLightBulb");
        interface_emojiLightBulb.scaleX = 0.8;
        interface_emojiLightBulb.scaleY = 0.8;
        this.add(interface_emojiLightBulb);

        // flower_btn
        const flower_btn = scene.add.image(184.5, 473.4, "interface", "interface/emote0001");
        this.add(flower_btn);

        // interface_emojiFlower
        const interface_emojiFlower = scene.add.image(184.5, 473.4, "interface", "interface/emojiFlower");
        interface_emojiFlower.scaleX = 0.8;
        interface_emojiFlower.scaleY = 0.8;
        this.add(interface_emojiFlower);

        // bg (components)
        new InputBlocker(bg);

        // laughing_btn (components)
        const laughing_btnButtonComponent = new ButtonComponent(laughing_btn);
        laughing_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        laughing_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        laughing_btnButtonComponent.handCursor = true;
        laughing_btnButtonComponent.pixelPerfect = true;

        // happy_btn (components)
        const happy_btnButtonComponent = new ButtonComponent(happy_btn);
        happy_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        happy_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        happy_btnButtonComponent.handCursor = true;
        happy_btnButtonComponent.pixelPerfect = true;

        // coffee_btn (components)
        const coffee_btnButtonComponent = new ButtonComponent(coffee_btn);
        coffee_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        coffee_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        coffee_btnButtonComponent.handCursor = true;
        coffee_btnButtonComponent.pixelPerfect = true;

        // indifferent_btn (components)
        const indifferent_btnButtonComponent = new ButtonComponent(indifferent_btn);
        indifferent_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        indifferent_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        indifferent_btnButtonComponent.handCursor = true;
        indifferent_btnButtonComponent.pixelPerfect = true;

        // sad_btn (components)
        const sad_btnButtonComponent = new ButtonComponent(sad_btn);
        sad_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        sad_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        sad_btnButtonComponent.handCursor = true;
        sad_btnButtonComponent.pixelPerfect = true;

        // controller_btn (components)
        const controller_btnButtonComponent = new ButtonComponent(controller_btn);
        controller_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        controller_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        controller_btnButtonComponent.handCursor = true;
        controller_btnButtonComponent.pixelPerfect = true;

        // surprised_btn (components)
        const surprised_btnButtonComponent = new ButtonComponent(surprised_btn);
        surprised_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        surprised_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        surprised_btnButtonComponent.handCursor = true;
        surprised_btnButtonComponent.pixelPerfect = true;

        // pokingOutTongue_btn (components)
        const pokingOutTongue_btnButtonComponent = new ButtonComponent(pokingOutTongue_btn);
        pokingOutTongue_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        pokingOutTongue_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        pokingOutTongue_btnButtonComponent.handCursor = true;
        pokingOutTongue_btnButtonComponent.pixelPerfect = true;

        // popcorn_btn (components)
        const popcorn_btnButtonComponent = new ButtonComponent(popcorn_btn);
        popcorn_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        popcorn_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        popcorn_btnButtonComponent.handCursor = true;
        popcorn_btnButtonComponent.pixelPerfect = true;

        // winking_btn (components)
        const winking_btnButtonComponent = new ButtonComponent(winking_btn);
        winking_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        winking_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        winking_btnButtonComponent.handCursor = true;
        winking_btnButtonComponent.pixelPerfect = true;

        // sick_btn (components)
        const sick_btnButtonComponent = new ButtonComponent(sick_btn);
        sick_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        sick_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        sick_btnButtonComponent.handCursor = true;
        sick_btnButtonComponent.pixelPerfect = true;

        // pizza_btn (components)
        const pizza_btnButtonComponent = new ButtonComponent(pizza_btn);
        pizza_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        pizza_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        pizza_btnButtonComponent.handCursor = true;
        pizza_btnButtonComponent.pixelPerfect = true;

        // mad_btn (components)
        const mad_btnButtonComponent = new ButtonComponent(mad_btn);
        mad_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        mad_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        mad_btnButtonComponent.handCursor = true;
        mad_btnButtonComponent.pixelPerfect = true;

        // upset_btn (components)
        const upset_btnButtonComponent = new ButtonComponent(upset_btn);
        upset_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        upset_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        upset_btnButtonComponent.handCursor = true;
        upset_btnButtonComponent.pixelPerfect = true;

        // strawberryIceCream_btn (components)
        const strawberryIceCream_btnButtonComponent = new ButtonComponent(strawberryIceCream_btn);
        strawberryIceCream_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        strawberryIceCream_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        strawberryIceCream_btnButtonComponent.handCursor = true;
        strawberryIceCream_btnButtonComponent.pixelPerfect = true;

        // meh_btn (components)
        const meh_btnButtonComponent = new ButtonComponent(meh_btn);
        meh_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        meh_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        meh_btnButtonComponent.handCursor = true;
        meh_btnButtonComponent.pixelPerfect = true;

        // cake_btn (components)
        const cake_btnButtonComponent = new ButtonComponent(cake_btn);
        cake_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        cake_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        cake_btnButtonComponent.handCursor = true;
        cake_btnButtonComponent.pixelPerfect = true;

        // shamrock_btn (components)
        const shamrock_btnButtonComponent = new ButtonComponent(shamrock_btn);
        shamrock_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        shamrock_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        shamrock_btnButtonComponent.handCursor = true;
        shamrock_btnButtonComponent.pixelPerfect = true;

        // heart_btn (components)
        const heart_btnButtonComponent = new ButtonComponent(heart_btn);
        heart_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        heart_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        heart_btnButtonComponent.handCursor = true;
        heart_btnButtonComponent.pixelPerfect = true;

        // lightbulb_btn (components)
        const lightbulb_btnButtonComponent = new ButtonComponent(lightbulb_btn);
        lightbulb_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        lightbulb_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        lightbulb_btnButtonComponent.handCursor = true;
        lightbulb_btnButtonComponent.pixelPerfect = true;

        // flower_btn (components)
        const flower_btnButtonComponent = new ButtonComponent(flower_btn);
        flower_btnButtonComponent.upTexture = {"key":"interface","frame":"interface/emote0001"};
        flower_btnButtonComponent.overTexture = {"key":"interface","frame":"interface/emote0002"};
        flower_btnButtonComponent.handCursor = true;
        flower_btnButtonComponent.pixelPerfect = true;

        this.bg = bg;
        this.laughing_btn = laughing_btn;
        this.happy_btn = happy_btn;
        this.coffee_btn = coffee_btn;
        this.indifferent_btn = indifferent_btn;
        this.sad_btn = sad_btn;
        this.controller_btn = controller_btn;
        this.surprised_btn = surprised_btn;
        this.pokingOutTongue_btn = pokingOutTongue_btn;
        this.popcorn_btn = popcorn_btn;
        this.winking_btn = winking_btn;
        this.sick_btn = sick_btn;
        this.pizza_btn = pizza_btn;
        this.mad_btn = mad_btn;
        this.upset_btn = upset_btn;
        this.strawberryIceCream_btn = strawberryIceCream_btn;
        this.meh_btn = meh_btn;
        this.cake_btn = cake_btn;
        this.shamrock_btn = shamrock_btn;
        this.heart_btn = heart_btn;
        this.lightbulb_btn = lightbulb_btn;
        this.flower_btn = flower_btn;

        /* START-USER-CTR-CODE */

        this.laughing_btn.on('release', () => this.send('LAUGHING'));
        this.happy_btn.on('release', () => this.send('HAPPY'));
        this.coffee_btn.on('release', () => this.send('COFFEE'));
        this.indifferent_btn.on('release', () => this.send('INDIFFERENT'));
        this.sad_btn.on('release', () => this.send('SAD'));
        this.controller_btn.on('release', () => this.send('CONTROLLER'));
        this.surprised_btn.on('release', () => this.send('SURPRISED'));
        this.pokingOutTongue_btn.on('release', () => this.send('POKING_OUT_TONGUE'));
        this.popcorn_btn.on('release', () => this.send('POPCORN'));
        this.winking_btn.on('release', () => this.send('WINKING'));
        this.sick_btn.on('release', () => this.send('SICK'));
        this.pizza_btn.on('release', () => this.send('PIZZA'));
        this.mad_btn.on('release', () => this.send('MAD'));
        this.upset_btn.on('release', () => this.send('UPSET'));
        this.strawberryIceCream_btn.on('release', () => this.send('STRAWBERRY_ICE_CREAM'));
        this.meh_btn.on('release', () => this.send('MEH'));
        this.cake_btn.on('release', () => this.send('CAKE'));
        this.shamrock_btn.on('release', () => this.send('SHAMROCK'));
        this.heart_btn.on('release', () => this.send('HEART'));
        this.lightbulb_btn.on('release', () => this.send('LIGHTBULB'));
        this.flower_btn.on('release', () => this.send('FLOWER'));

        /* END-USER-CTR-CODE */
    }

    public bg: Phaser.GameObjects.Image;
    public laughing_btn: Phaser.GameObjects.Image;
    public happy_btn: Phaser.GameObjects.Image;
    public coffee_btn: Phaser.GameObjects.Image;
    public indifferent_btn: Phaser.GameObjects.Image;
    public sad_btn: Phaser.GameObjects.Image;
    public controller_btn: Phaser.GameObjects.Image;
    public surprised_btn: Phaser.GameObjects.Image;
    public pokingOutTongue_btn: Phaser.GameObjects.Image;
    public popcorn_btn: Phaser.GameObjects.Image;
    public winking_btn: Phaser.GameObjects.Image;
    public sick_btn: Phaser.GameObjects.Image;
    public pizza_btn: Phaser.GameObjects.Image;
    public mad_btn: Phaser.GameObjects.Image;
    public upset_btn: Phaser.GameObjects.Image;
    public strawberryIceCream_btn: Phaser.GameObjects.Image;
    public meh_btn: Phaser.GameObjects.Image;
    public cake_btn: Phaser.GameObjects.Image;
    public shamrock_btn: Phaser.GameObjects.Image;
    public heart_btn: Phaser.GameObjects.Image;
    public lightbulb_btn: Phaser.GameObjects.Image;
    public flower_btn: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare scene: Interface;

    send(emoji: Emoji): void {
        this.scene.sendEmoji(emoji);
        this.visible = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
