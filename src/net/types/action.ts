
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

    CJ_BOW_RIGHT = 32,
    CJ_BOW_LEFT,
    CJ_BOW_DOWN_RIGHT,
    CJ_BOW_UP_LEFT,
    CJ_BOW_DOWN_LEFT,
    CJ_BOW_UP_RIGHT,

    //TODO: special frames

    // Direction-agnostic frames
    WADDLE = WADDLE_DOWN,
    THROW = THROW_DOWN_LEFT
}

export type ActionData = {
    player_id?: number,
    frame: ActionFrame,
    x?: number,
    y?: number,
    since?: number
};