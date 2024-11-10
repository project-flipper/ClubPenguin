
// You can write more code here

/* START OF COMPILED CODE */

import TextBox from "../../../lib/ui/TextBox";
/* START-USER-IMPORTS */
import { Emoji } from "@clubpenguin/net/types/message";
/* END-USER-IMPORTS */

export default class Balloon extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? -6, y ?? -185.175);

        // upper
        const upper = scene.add.nineslice(0, -185.175, "interface", "interface/balloonUpper", 146.25, 76.6125, 25, 25, 25, 0);
        upper.setOrigin(0.5, 0);
        this.add(upper);

        // lower
        const lower = scene.add.nineslice(0, -108.5625, "interface", "interface/balloonLower", 146.25, 45.45, 19, 55, 0, 25);
        lower.setOrigin(0.5, 0);
        this.add(lower);

        // lowerChat
        const lowerChat = scene.add.nineslice(0, -108.5625, "interface", "interface/balloonLowerChat", 146.25, 45.45, 19, 127, 0, 25);
        lowerChat.setOrigin(0.5, 0);
        lowerChat.visible = false;
        this.add(lowerChat);

        // emoji
        const emoji = scene.add.image(0, -135.1125, "interface", "interface/emojiLaughing");
        this.add(emoji);

        // message
        const message = new TextBox(scene, -137.25, -153.45, "BurbankSmallMedium");
        message.tintFill = true;
        message.tintTopLeft = 0;
        message.tintTopRight = 0;
        message.tintBottomLeft = 0;
        message.tintBottomRight = 0;
        message.text = "W";
        message.fontSize = -27;
        this.add(message);

        // message (prefab fields)
        message.boxWidth = 272.25;
        message.boxHeight = 47.3625;
        message.horizontalAlign = 1;
        message.verticalAlign = 1;

        this.upper = upper;
        this.lower = lower;
        this.lowerChat = lowerChat;
        this.emoji = emoji;
        this.message = message;

        /* START-USER-CTR-CODE */

        this.parts = [];

        /* END-USER-CTR-CODE */
    }

    public upper: Phaser.GameObjects.NineSlice;
    public lower: Phaser.GameObjects.NineSlice;
    public lowerChat: Phaser.GameObjects.NineSlice;
    public emoji: Phaser.GameObjects.Image;
    public message: TextBox;

    /* START-USER-CODE */

    public TEXT_X_PADDING = 31.5;
    public TEXT_Y_PADDING = 18;

    public EMOTE_WIDTH = 144;
    public EMOTE_HEIGHT = 76.5;

    public timer: Phaser.Time.TimerEvent;
    public DURATION = 6000;

    public currentMessage: string;
    public currentEmoji: Emoji;

    setBanned(state: boolean): void {
        this.upper.setFrame(state ? 'interface/bannedBalloonUpper' : 'interface/balloonUpper');
        this.lower.setFrame(state ? 'interface/bannedBalloonLower' : 'interface/balloonLower');
        this.lowerChat.setFrame(state ? 'interface/bannedBalloonLowerChat' : 'interface/balloonLowerChat');
    }

    public parts: string[];

    showNextPart(): void {
        this.message.text = this.parts.shift();
        this.setBalloonSize();
    }

    showMessage(message: string, allowMultipart = false): void {
        this.currentMessage = message;
        this.currentEmoji = undefined;

        this.setBanned(false);

        this.lower.visible = false;
        this.lowerChat.visible = true;
        this.emoji.visible = false;

        if (allowMultipart) {
            this.parts = message.split('|');
            this.showNextPart();
        } else {
            this.parts = [];
            this.message.text = message;
            this.setBalloonSize();
        }

        this.message.visible = true;

        this.visible = true;
        this.startHideTimer();
    }

    setBalloonSize(): void {
        this.message.boxHeight = (this.message.height + this.TEXT_Y_PADDING / 2) + 45;

        this.upper.width = this.message.boxWidth + this.TEXT_X_PADDING;
        this.lowerChat.width = this.upper.width;
        this.upper.height = this.message.height + this.TEXT_Y_PADDING;
        this.upper.y = this.lowerChat.y - this.upper.height;

        this.message.boxX = (this.upper.x - (this.upper.width / 2)) + (this.TEXT_X_PADDING / 2);
        this.message.boxY = this.upper.y - (this.TEXT_Y_PADDING / 2);
    }

    showEmoji(emoji: Emoji): void {
        this.currentMessage = undefined;
        this.currentEmoji = emoji;

        this.setBanned(false);

        this.lower.visible = true;
        this.lowerChat.visible = false;
        this.message.visible = false;

        this.upper.width = this.EMOTE_WIDTH;
        this.lower.width = this.upper.width;
        this.upper.height = this.EMOTE_HEIGHT;
        this.upper.y = this.lower.y - this.upper.height;

        this.parts = [];

        this.emoji.setFrame(this.getEmojiFrame(emoji));
        this.emoji.visible = true;

        if (emoji == Emoji.TOOT) this.scene.sound.play('interface_fart');

        this.visible = true;
        this.startHideTimer();
    }

    getEmojiFrame(emoji: Emoji): string {
        switch (emoji) {
            case Emoji.LAUGHING:
                return 'interface/emojiLaughing';
            case Emoji.HAPPY:
                return 'interface/emojiHappy';
            case Emoji.COFFEE:
                return 'interface/emojiCoffee';
            case Emoji.INDIFFERENT:
                return 'interface/emojiIndifferent';
            case Emoji.SAD:
                return 'interface/emojiSad';
            case Emoji.CONTROLLER:
                return 'interface/emojiController';
            case Emoji.SURPRISED:
                return 'interface/emojiSurprised';
            case Emoji.POKING_OUT_TONGUE:
                return 'interface/emojiPokingOutTongue';
            case Emoji.POPCORN:
                return 'interface/emojiPopcorn';
            case Emoji.WINKING:
                return 'interface/emojiWinking';
            case Emoji.SICK:
                return 'interface/emojiSick';
            case Emoji.PIZZA:
                return 'interface/emojiPizza';
            case Emoji.MAD:
                return 'interface/emojiMad';
            case Emoji.UPSET:
                return 'interface/emojiUpset';
            case Emoji.STRAWBERRY_ICE_CREAM:
                return 'interface/emojiStrawberryIceCream';
            case Emoji.MEH:
                return 'interface/emojiMeh';
            case Emoji.CAKE:
                return 'interface/emojiCake';
            case Emoji.SHAMROCK:
                return 'interface/emojiShamrock';
            case Emoji.HEART:
                return 'interface/emojiHeart';
            case Emoji.LIGHTBULB:
                return 'interface/emojiLightBulb';
            case Emoji.FLOWER:
                return 'interface/emojiFlower';
            case Emoji.CHOCOLATE_ICE_CREAM:
                return 'interface/emojiChocolateIceCream';
            case Emoji.COIN:
                return 'interface/emojiCoin';
            case Emoji.EXCLAMATION:
                return 'interface/emojiExclamation';
            case Emoji.IGLOO:
                return 'interface/emojiIgloo';
            case Emoji.MOON:
                return 'interface/emojiMoon';
            case Emoji.PUFFLE:
                return 'interface/emojiPuffle';
            case Emoji.QUESTION:
                return 'interface/emojiQuestion';
            case Emoji.SUN:
                return 'interface/emojiSun';
            case Emoji.TOOT:
                return 'interface/emojiToot';
        }
    }

    startHideTimer(): void {
        if (this.timer) this.timer.remove();

        this.timer = this.scene.time.delayedCall(this.DURATION, () => {
            if (this.parts.length > 0) {
                this.showNextPart();
                this.startHideTimer();
            } else {
                this.visible = false;

                this.currentEmoji = undefined;
                this.currentMessage = undefined;
            }
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
