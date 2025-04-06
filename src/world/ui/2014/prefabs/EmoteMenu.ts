
// You can write more code here

/* START OF COMPILED CODE */

import InputBlocker from "../../../../lib/components/InputBlocker";
import ButtonComponent from "../../../../lib/components/ButtonComponent";
/* START-USER-IMPORTS */
import Interface from "@clubpenguin/world/interface/Interface";
import { Emoji } from "@clubpenguin/net/types/message";
/* END-USER-IMPORTS */

export default class EmoteMenu extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // bg
        const bg = scene.add.image(-3, -3, "ui-2014", "2014/emoteBg");
        bg.setOrigin(0, 0);
        this.add(bg);

        // laughing_btn
        const laughing_btn = scene.add.image(40.5, 41.4, "ui-2014", "2014/emote0001");
        this.add(laughing_btn);

        // ui2014_emojiLaughing
        const ui2014_emojiLaughing = scene.add.image(40.5, 41.4, "ui-2014", "2014/emojiLaughing");
        ui2014_emojiLaughing.scaleX = 0.8;
        ui2014_emojiLaughing.scaleY = 0.8;
        this.add(ui2014_emojiLaughing);

        // happy_btn
        const happy_btn = scene.add.image(112.5, 41.4, "ui-2014", "2014/emote0001");
        this.add(happy_btn);

        // ui2014_emojiHappy
        const ui2014_emojiHappy = scene.add.image(112.5, 41.4, "ui-2014", "2014/emojiHappy");
        ui2014_emojiHappy.scaleX = 0.8;
        ui2014_emojiHappy.scaleY = 0.8;
        this.add(ui2014_emojiHappy);

        // coffee_btn
        const coffee_btn = scene.add.image(184.5, 41.4, "ui-2014", "2014/emote0001");
        this.add(coffee_btn);

        // ui2014_emojiCoffee
        const ui2014_emojiCoffee = scene.add.image(184.5, 41.4, "ui-2014", "2014/emojiCoffee");
        ui2014_emojiCoffee.scaleX = 0.8;
        ui2014_emojiCoffee.scaleY = 0.8;
        this.add(ui2014_emojiCoffee);

        // indifferent_btn
        const indifferent_btn = scene.add.image(40.5, 113.4, "ui-2014", "2014/emote0001");
        this.add(indifferent_btn);

        // ui2014_emojiIndifferent
        const ui2014_emojiIndifferent = scene.add.image(40.5, 113.4, "ui-2014", "2014/emojiIndifferent");
        ui2014_emojiIndifferent.scaleX = 0.8;
        ui2014_emojiIndifferent.scaleY = 0.8;
        this.add(ui2014_emojiIndifferent);

        // sad_btn
        const sad_btn = scene.add.image(112.5, 113.4, "ui-2014", "2014/emote0001");
        this.add(sad_btn);

        // ui2014_emojiSad
        const ui2014_emojiSad = scene.add.image(112.5, 113.4, "ui-2014", "2014/emojiSad");
        ui2014_emojiSad.scaleX = 0.8;
        ui2014_emojiSad.scaleY = 0.8;
        this.add(ui2014_emojiSad);

        // controller_btn
        const controller_btn = scene.add.image(184.5, 113.4, "ui-2014", "2014/emote0001");
        this.add(controller_btn);

        // ui2014_emojiController
        const ui2014_emojiController = scene.add.image(184.5, 113.4, "ui-2014", "2014/emojiController");
        ui2014_emojiController.scaleX = 0.8;
        ui2014_emojiController.scaleY = 0.8;
        this.add(ui2014_emojiController);

        // surprised_btn
        const surprised_btn = scene.add.image(40.5, 185.4, "ui-2014", "2014/emote0001");
        this.add(surprised_btn);

        // ui2014_emojiSurprised
        const ui2014_emojiSurprised = scene.add.image(40.5, 185.4, "ui-2014", "2014/emojiSurprised");
        ui2014_emojiSurprised.scaleX = 0.8;
        ui2014_emojiSurprised.scaleY = 0.8;
        this.add(ui2014_emojiSurprised);

        // pokingOutTongue_btn
        const pokingOutTongue_btn = scene.add.image(112.5, 185.4, "ui-2014", "2014/emote0001");
        this.add(pokingOutTongue_btn);

        // ui2014_emojiPokingOutTongue
        const ui2014_emojiPokingOutTongue = scene.add.image(112.5, 185.4, "ui-2014", "2014/emojiPokingOutTongue");
        ui2014_emojiPokingOutTongue.scaleX = 0.8;
        ui2014_emojiPokingOutTongue.scaleY = 0.8;
        this.add(ui2014_emojiPokingOutTongue);

        // popcorn_btn
        const popcorn_btn = scene.add.image(184.5, 185.4, "ui-2014", "2014/emote0001");
        this.add(popcorn_btn);

        // ui2014_emojiPopcorn
        const ui2014_emojiPopcorn = scene.add.image(184.5, 185.4, "ui-2014", "2014/emojiPopcorn");
        ui2014_emojiPopcorn.scaleX = 0.63;
        ui2014_emojiPopcorn.scaleY = 0.63;
        this.add(ui2014_emojiPopcorn);

        // winking_btn
        const winking_btn = scene.add.image(40.5, 257.4, "ui-2014", "2014/emote0001");
        this.add(winking_btn);

        // ui2014_emojiWinking
        const ui2014_emojiWinking = scene.add.image(40.5, 257.4, "ui-2014", "2014/emojiWinking");
        ui2014_emojiWinking.scaleX = 0.8;
        ui2014_emojiWinking.scaleY = 0.8;
        this.add(ui2014_emojiWinking);

        // sick_btn
        const sick_btn = scene.add.image(112.5, 257.4, "ui-2014", "2014/emote0001");
        this.add(sick_btn);

        // ui2014_emojiSick
        const ui2014_emojiSick = scene.add.image(112.5, 257.4, "ui-2014", "2014/emojiSick");
        ui2014_emojiSick.scaleX = 0.8;
        ui2014_emojiSick.scaleY = 0.8;
        this.add(ui2014_emojiSick);

        // pizza_btn
        const pizza_btn = scene.add.image(184.5, 257.4, "ui-2014", "2014/emote0001");
        this.add(pizza_btn);

        // ui2014_emojiPizza
        const ui2014_emojiPizza = scene.add.image(184.5, 257.4, "ui-2014", "2014/emojiPizza");
        ui2014_emojiPizza.scaleX = 0.8;
        ui2014_emojiPizza.scaleY = 0.8;
        this.add(ui2014_emojiPizza);

        // mad_btn
        const mad_btn = scene.add.image(40.5, 329.4, "ui-2014", "2014/emote0001");
        this.add(mad_btn);

        // ui2014_emojiMad
        const ui2014_emojiMad = scene.add.image(40.5, 329.4, "ui-2014", "2014/emojiMad");
        ui2014_emojiMad.scaleX = 0.8;
        ui2014_emojiMad.scaleY = 0.8;
        this.add(ui2014_emojiMad);

        // upset_btn
        const upset_btn = scene.add.image(112.5, 329.4, "ui-2014", "2014/emote0001");
        this.add(upset_btn);

        // ui2014_emojiUpset
        const ui2014_emojiUpset = scene.add.image(112.5, 329.4, "ui-2014", "2014/emojiUpset");
        ui2014_emojiUpset.scaleX = 0.8;
        ui2014_emojiUpset.scaleY = 0.8;
        this.add(ui2014_emojiUpset);

        // strawberryIceCream_btn
        const strawberryIceCream_btn = scene.add.image(184.5, 329.4, "ui-2014", "2014/emote0001");
        this.add(strawberryIceCream_btn);

        // ui2014_emojiStrawberryIceCream
        const ui2014_emojiStrawberryIceCream = scene.add.image(184.5, 329.4, "ui-2014", "2014/emojiStrawberryIceCream");
        ui2014_emojiStrawberryIceCream.scaleX = 0.8;
        ui2014_emojiStrawberryIceCream.scaleY = 0.8;
        this.add(ui2014_emojiStrawberryIceCream);

        // meh_btn
        const meh_btn = scene.add.image(40.5, 401.4, "ui-2014", "2014/emote0001");
        this.add(meh_btn);

        // ui2014_emojiMeh
        const ui2014_emojiMeh = scene.add.image(40.5, 401.4, "ui-2014", "2014/emojiMeh");
        ui2014_emojiMeh.scaleX = 0.8;
        ui2014_emojiMeh.scaleY = 0.8;
        this.add(ui2014_emojiMeh);

        // cake_btn
        const cake_btn = scene.add.image(112.5, 401.4, "ui-2014", "2014/emote0001");
        this.add(cake_btn);

        // ui2014_emojiCake
        const ui2014_emojiCake = scene.add.image(112.5, 401.4, "ui-2014", "2014/emojiCake");
        ui2014_emojiCake.scaleX = 0.8;
        ui2014_emojiCake.scaleY = 0.8;
        this.add(ui2014_emojiCake);

        // shamrock_btn
        const shamrock_btn = scene.add.image(184.5, 401.4, "ui-2014", "2014/emote0001");
        this.add(shamrock_btn);

        // ui2014_emojiShamrock
        const ui2014_emojiShamrock = scene.add.image(184.5, 401.4, "ui-2014", "2014/emojiShamrock");
        ui2014_emojiShamrock.scaleX = 0.8;
        ui2014_emojiShamrock.scaleY = 0.8;
        this.add(ui2014_emojiShamrock);

        // heart_btn
        const heart_btn = scene.add.image(40.5, 473.4, "ui-2014", "2014/emote0001");
        this.add(heart_btn);

        // ui2014_emojiHeart
        const ui2014_emojiHeart = scene.add.image(40.5, 473.4, "ui-2014", "2014/emojiHeart");
        ui2014_emojiHeart.scaleX = 0.7;
        ui2014_emojiHeart.scaleY = 0.7;
        this.add(ui2014_emojiHeart);

        // lightbulb_btn
        const lightbulb_btn = scene.add.image(112.5, 473.4, "ui-2014", "2014/emote0001");
        this.add(lightbulb_btn);

        // ui2014_emojiLightBulb
        const ui2014_emojiLightBulb = scene.add.image(112.5, 473.4, "ui-2014", "2014/emojiLightBulb");
        ui2014_emojiLightBulb.scaleX = 0.8;
        ui2014_emojiLightBulb.scaleY = 0.8;
        this.add(ui2014_emojiLightBulb);

        // flower_btn
        const flower_btn = scene.add.image(184.5, 473.4, "ui-2014", "2014/emote0001");
        this.add(flower_btn);

        // ui2014_emojiFlower
        const ui2014_emojiFlower = scene.add.image(184.5, 473.4, "ui-2014", "2014/emojiFlower");
        ui2014_emojiFlower.scaleX = 0.8;
        ui2014_emojiFlower.scaleY = 0.8;
        this.add(ui2014_emojiFlower);

        // bg (components)
        new InputBlocker(bg);

        // laughing_btn (components)
        const laughing_btnButtonComponent = new ButtonComponent(laughing_btn);
        laughing_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        laughing_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        laughing_btnButtonComponent.handCursor = true;
        laughing_btnButtonComponent.pixelPerfect = true;

        // happy_btn (components)
        const happy_btnButtonComponent = new ButtonComponent(happy_btn);
        happy_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        happy_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        happy_btnButtonComponent.handCursor = true;
        happy_btnButtonComponent.pixelPerfect = true;

        // coffee_btn (components)
        const coffee_btnButtonComponent = new ButtonComponent(coffee_btn);
        coffee_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        coffee_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        coffee_btnButtonComponent.handCursor = true;
        coffee_btnButtonComponent.pixelPerfect = true;

        // indifferent_btn (components)
        const indifferent_btnButtonComponent = new ButtonComponent(indifferent_btn);
        indifferent_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        indifferent_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        indifferent_btnButtonComponent.handCursor = true;
        indifferent_btnButtonComponent.pixelPerfect = true;

        // sad_btn (components)
        const sad_btnButtonComponent = new ButtonComponent(sad_btn);
        sad_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        sad_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        sad_btnButtonComponent.handCursor = true;
        sad_btnButtonComponent.pixelPerfect = true;

        // controller_btn (components)
        const controller_btnButtonComponent = new ButtonComponent(controller_btn);
        controller_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        controller_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        controller_btnButtonComponent.handCursor = true;
        controller_btnButtonComponent.pixelPerfect = true;

        // surprised_btn (components)
        const surprised_btnButtonComponent = new ButtonComponent(surprised_btn);
        surprised_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        surprised_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        surprised_btnButtonComponent.handCursor = true;
        surprised_btnButtonComponent.pixelPerfect = true;

        // pokingOutTongue_btn (components)
        const pokingOutTongue_btnButtonComponent = new ButtonComponent(pokingOutTongue_btn);
        pokingOutTongue_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        pokingOutTongue_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        pokingOutTongue_btnButtonComponent.handCursor = true;
        pokingOutTongue_btnButtonComponent.pixelPerfect = true;

        // popcorn_btn (components)
        const popcorn_btnButtonComponent = new ButtonComponent(popcorn_btn);
        popcorn_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        popcorn_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        popcorn_btnButtonComponent.handCursor = true;
        popcorn_btnButtonComponent.pixelPerfect = true;

        // winking_btn (components)
        const winking_btnButtonComponent = new ButtonComponent(winking_btn);
        winking_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        winking_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        winking_btnButtonComponent.handCursor = true;
        winking_btnButtonComponent.pixelPerfect = true;

        // sick_btn (components)
        const sick_btnButtonComponent = new ButtonComponent(sick_btn);
        sick_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        sick_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        sick_btnButtonComponent.handCursor = true;
        sick_btnButtonComponent.pixelPerfect = true;

        // pizza_btn (components)
        const pizza_btnButtonComponent = new ButtonComponent(pizza_btn);
        pizza_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        pizza_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        pizza_btnButtonComponent.handCursor = true;
        pizza_btnButtonComponent.pixelPerfect = true;

        // mad_btn (components)
        const mad_btnButtonComponent = new ButtonComponent(mad_btn);
        mad_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        mad_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        mad_btnButtonComponent.handCursor = true;
        mad_btnButtonComponent.pixelPerfect = true;

        // upset_btn (components)
        const upset_btnButtonComponent = new ButtonComponent(upset_btn);
        upset_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        upset_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        upset_btnButtonComponent.handCursor = true;
        upset_btnButtonComponent.pixelPerfect = true;

        // strawberryIceCream_btn (components)
        const strawberryIceCream_btnButtonComponent = new ButtonComponent(strawberryIceCream_btn);
        strawberryIceCream_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        strawberryIceCream_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        strawberryIceCream_btnButtonComponent.handCursor = true;
        strawberryIceCream_btnButtonComponent.pixelPerfect = true;

        // meh_btn (components)
        const meh_btnButtonComponent = new ButtonComponent(meh_btn);
        meh_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        meh_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        meh_btnButtonComponent.handCursor = true;
        meh_btnButtonComponent.pixelPerfect = true;

        // cake_btn (components)
        const cake_btnButtonComponent = new ButtonComponent(cake_btn);
        cake_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        cake_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        cake_btnButtonComponent.handCursor = true;
        cake_btnButtonComponent.pixelPerfect = true;

        // shamrock_btn (components)
        const shamrock_btnButtonComponent = new ButtonComponent(shamrock_btn);
        shamrock_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        shamrock_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        shamrock_btnButtonComponent.handCursor = true;
        shamrock_btnButtonComponent.pixelPerfect = true;

        // heart_btn (components)
        const heart_btnButtonComponent = new ButtonComponent(heart_btn);
        heart_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        heart_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        heart_btnButtonComponent.handCursor = true;
        heart_btnButtonComponent.pixelPerfect = true;

        // lightbulb_btn (components)
        const lightbulb_btnButtonComponent = new ButtonComponent(lightbulb_btn);
        lightbulb_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        lightbulb_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
        lightbulb_btnButtonComponent.handCursor = true;
        lightbulb_btnButtonComponent.pixelPerfect = true;

        // flower_btn (components)
        const flower_btnButtonComponent = new ButtonComponent(flower_btn);
        flower_btnButtonComponent.upTexture = {"key":"ui-2014","frame":"2014/emote0001"};
        flower_btnButtonComponent.overTexture = {"key":"ui-2014","frame":"2014/emote0002"};
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

        this.laughing_btn.on('release', () => this.send(Emoji.LAUGHING));
        this.happy_btn.on('release', () => this.send(Emoji.HAPPY));
        this.coffee_btn.on('release', () => this.send(Emoji.COFFEE));
        this.indifferent_btn.on('release', () => this.send(Emoji.INDIFFERENT));
        this.sad_btn.on('release', () => this.send(Emoji.SAD));
        this.controller_btn.on('release', () => this.send(Emoji.CONTROLLER));
        this.surprised_btn.on('release', () => this.send(Emoji.SURPRISED));
        this.pokingOutTongue_btn.on('release', () => this.send(Emoji.POKING_OUT_TONGUE));
        this.popcorn_btn.on('release', () => this.send(Emoji.POPCORN));
        this.winking_btn.on('release', () => this.send(Emoji.WINKING));
        this.sick_btn.on('release', () => this.send(Emoji.SICK));
        this.pizza_btn.on('release', () => this.send(Emoji.PIZZA));
        this.mad_btn.on('release', () => this.send(Emoji.MAD));
        this.upset_btn.on('release', () => this.send(Emoji.UPSET));
        this.strawberryIceCream_btn.on('release', () => this.send(Emoji.STRAWBERRY_ICE_CREAM));
        this.meh_btn.on('release', () => this.send(Emoji.MEH));
        this.cake_btn.on('release', () => this.send(Emoji.CAKE));
        this.shamrock_btn.on('release', () => this.send(Emoji.SHAMROCK));
        this.heart_btn.on('release', () => this.send(Emoji.HEART));
        this.lightbulb_btn.on('release', () => this.send(Emoji.LIGHTBULB));
        this.flower_btn.on('release', () => this.send(Emoji.FLOWER));

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
        this.scene.world.sendEmoji(emoji);
        this.visible = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
