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
    player_id?: number,
    message: string,
    banned: boolean
};

export type EmojiMessageData = {
    type: 'EMOJI',
    player_id?: number,
    emoji: Emoji,
    banned: boolean
};

export type JokeMessageData = {
    type: 'JOKE',
    player_id?: number,
    joke: number,
    banned: boolean
};

export type TourMessageData = {
    type: 'TOUR',
    player_id?: number,
    banned: boolean
};

export type MessageData = TextMessageData | JokeMessageData | EmojiMessageData | TourMessageData;
