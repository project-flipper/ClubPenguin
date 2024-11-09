
export enum ActionType {
    IDLE,
    WADDLE,
    SIT,
    WAVE,
    DANCE,
    THROW,
    JUMP,
    CJ_BOW,
}

export type ActionData = {
    player_id?: number,
    type: ActionType,
    x?: number,
    y?: number,
    to_x?: number,
    to_y?: number,
    since?: number
};
