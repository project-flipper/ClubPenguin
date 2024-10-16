import { ActionFrame } from "@clubpenguin/net/types/action";

export const ANIMATION_META = Object.freeze({
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

    [ActionFrame.CJ_BOW_RIGHT]: { totalFrames: 61, repeat: false },
    [ActionFrame.CJ_BOW_LEFT]: { totalFrames: 61, repeat: false },
    [ActionFrame.CJ_BOW_DOWN_RIGHT]: { totalFrames: 61, repeat: false },
    [ActionFrame.CJ_BOW_UP_LEFT]: { totalFrames: 61, repeat: false },
    [ActionFrame.CJ_BOW_DOWN_LEFT]: { totalFrames: 61, repeat: false },
    [ActionFrame.CJ_BOW_UP_RIGHT]: { totalFrames: 61, repeat: false }
});