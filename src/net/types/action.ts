
export enum ActionFrame {
    IDLE_DOWN = 0,
    IDLE_DOWN_LEFT,
    IDLE_LEFT,
    IDLE_UP_LEFT,
    IDLE_UP,
    IDLE_UP_RIGHT,
    IDLE_RIGHT,
    IDLE_DOWN_RIGHT,

    WADDLE_DOWN = 8,
    WADDLE_DOWN_LEFT,
    WADDLE_LEFT,
    WADDLE_UP_LEFT,
    WADDLE_UP,
    WADDLE_UP_RIGHT,
    WADDLE_RIGHT,
    WADDLE_DOWN_RIGHT,

    SIT_DOWN = 16,
    SIT_DOWN_LEFT,
    SIT_LEFT,
    SIT_UP_LEFT,
    SIT_UP,
    SIT_UP_RIGHT,
    SIT_RIGHT,
    SIT_DOWN_RIGHT,

    WAVE = 24,
    DANCE,

    THROW_DOWN_LEFT = 26,
    THROW_UP_LEFT,
    THROW_UP_RIGHT,
    THROW_DOWN_RIGHT,

    PENGUIN_JUMP = 30,

    JITSU_BOW_RIGHT = 32,
    JITSU_BOW_LEFT,
    JITSU_BOW_DOWN_RIGHT,
    JITSU_BOW_UP_LEFT,
    JITSU_BOW_DOWN_LEFT,
    JITSU_BOW_UP_RIGHT,

    //TODO: special frames

    // Direction-agnostic frames
    WADDLE = WADDLE_DOWN,
    THROW = THROW_DOWN_LEFT
}

export type ActionData = {
    player?: number,
    frame: ActionFrame,
    x?: number,
    y?: number,
    since?: number
};

export const ANIMATION_META: {
    [key: ActionFrame | number]: {
        totalFrames: number;
        repeat: boolean;
    }
} = {
    [ActionFrame.IDLE_DOWN]: { totalFrames: 1, repeat: true },
    [ActionFrame.IDLE_DOWN_LEFT]: { totalFrames: 1, repeat: true },
    [ActionFrame.IDLE_LEFT]: { totalFrames: 1, repeat: true },
    [ActionFrame.IDLE_UP_LEFT]: { totalFrames: 1, repeat: true },
    [ActionFrame.IDLE_UP]: { totalFrames: 1, repeat: true },
    [ActionFrame.IDLE_UP_RIGHT]: { totalFrames: 1, repeat: true },
    [ActionFrame.IDLE_RIGHT]: { totalFrames: 1, repeat: true },
    [ActionFrame.IDLE_DOWN_RIGHT]: { totalFrames: 1, repeat: true },

    [ActionFrame.WADDLE_DOWN]: { totalFrames: 8, repeat: true },
    [ActionFrame.WADDLE_DOWN_LEFT]: { totalFrames: 8, repeat: true },
    [ActionFrame.WADDLE_LEFT]: { totalFrames: 8, repeat: true },
    [ActionFrame.WADDLE_UP_LEFT]: { totalFrames: 8, repeat: true },
    [ActionFrame.WADDLE_UP]: { totalFrames: 8, repeat: true },
    [ActionFrame.WADDLE_UP_RIGHT]: { totalFrames: 8, repeat: true },
    [ActionFrame.WADDLE_RIGHT]: { totalFrames: 8, repeat: true },
    [ActionFrame.WADDLE_DOWN_RIGHT]: { totalFrames: 8, repeat: true },

    [ActionFrame.SIT_DOWN]: { totalFrames: 1, repeat: true },
    [ActionFrame.SIT_DOWN_LEFT]: { totalFrames: 1, repeat: true },
    [ActionFrame.SIT_LEFT]: { totalFrames: 1, repeat: true },
    [ActionFrame.SIT_UP_LEFT]: { totalFrames: 1, repeat: true },
    [ActionFrame.SIT_UP]: { totalFrames: 1, repeat: true },
    [ActionFrame.SIT_UP_RIGHT]: { totalFrames: 1, repeat: true },
    [ActionFrame.SIT_RIGHT]: { totalFrames: 1, repeat: true },
    [ActionFrame.SIT_DOWN_RIGHT]: { totalFrames: 1, repeat: true },

    [ActionFrame.WAVE]: { totalFrames: 29, repeat: false },
    [ActionFrame.DANCE]: { totalFrames: 193, repeat: true },

    [ActionFrame.THROW_DOWN_LEFT]: { totalFrames: 28, repeat: false },
    [ActionFrame.THROW_UP_LEFT]: { totalFrames: 28, repeat: false },
    [ActionFrame.THROW_UP_RIGHT]: { totalFrames: 28, repeat: false },
    [ActionFrame.THROW_DOWN_RIGHT]: { totalFrames: 28, repeat: false },

    [ActionFrame.PENGUIN_JUMP]: { totalFrames: 63, repeat: false },

    [ActionFrame.JITSU_BOW_RIGHT]: { totalFrames: 61, repeat: false },
    [ActionFrame.JITSU_BOW_LEFT]: { totalFrames: 61, repeat: false },
    [ActionFrame.JITSU_BOW_DOWN_RIGHT]: { totalFrames: 61, repeat: false },
    [ActionFrame.JITSU_BOW_UP_LEFT]: { totalFrames: 61, repeat: false },
    [ActionFrame.JITSU_BOW_DOWN_LEFT]: { totalFrames: 61, repeat: false },
    [ActionFrame.JITSU_BOW_UP_RIGHT]: { totalFrames: 61, repeat: false }
};