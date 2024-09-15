export enum Emoji {
    LAUGHING,
    HAPPY,
    COFFEE,
    INDIFFERENT,
    SAD,
    CONTROLLER,
    SURPRISED,
    POKING_OUT_TONGUE,
    POPCORN,
    WINKING,
    SICK,
    PIZZA,
    MAD,
    UPSET,
    STRAWBERRY_ICE_CREAM,
    MEH,
    CAKE,
    SHAMROCK,
    HEART,
    LIGHTBULB,
    FLOWER,
    CHOCOLATE_ICE_CREAM,
    COIN,
    EXCLAMATION,
    IGLOO,
    MOON,
    PUFFLE,
    QUESTION,
    SUN,
    TOOT,
};

export type TextMessageData = {
    type: 'TEXT',
    author: string,
    message: string,
    multipart: boolean,
    banned: boolean
};

export type EmojiMessageData = {
    type: 'EMOJI',
    author: string,
    emoji: Emoji,
    multipart: boolean,
    banned: boolean
};

export type MessageData = TextMessageData | EmojiMessageData;
