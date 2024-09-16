import { ActionData } from "./action";
import { MessageData } from "./message";
import { PlayerData } from "./player";

export type Payloads = {
    'room:join': {
        roomId: number,
        players: PlayerData[]
    },
    'message:create': MessageData,
    'player:add': PlayerData,
    'player:update': PlayerData,
    'player:action': ActionData,
    'player:remove': PlayerData
};

export type Payload<P extends any, O extends keyof P, D extends P[O]> = {
    op: O,
    d: D
};
