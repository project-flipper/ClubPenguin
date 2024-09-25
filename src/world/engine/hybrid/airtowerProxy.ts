import { getLogger } from "@clubpenguin/lib/log";
import { HybridBridge } from "./hybridBridge";

let logger = getLogger('CP.world.engine.hybrid.airtowerProxy');

enum CardPackets {
    MESSAGE_GET_GAME = "gz",
    MESSAGE_JOIN_GAME = "jz",
    MESSAGE_UPDATE_GAME = "uz",
    MESSAGE_START_GAME = "sz",
    MESSAGE_GAME_MOVE = "zm",
    MESSAGE_CLOSE_GAME = "cz",
    MESSAGE_LEAVE_GAME = "lz",
    MESSAGE_GAME_OVER = "czo",
    MESSAGE_GAME_AWARD = "cza",
    MESSAGE_STAMP_INFO = "cjsi"
}

enum FirePackets {
    MESSAGE_GET_GAME = "gz",
    MESSAGE_JOIN_GAME = "jz",
    MESSAGE_LEAVE_GAME = "lz",
    MESSAGE_PLAYER_ACTION = "zm",
    MESSAGE_STAMP_INFORMATION = "cjsi",
    MESSAGE_START_GAME = "sz",
    MESSAGE_UPDATE_PLAYERLIST = "uz",
    MESSAGE_ABORT_GAME = "cz",
    MESSAGE_GAME_OVER = "zo",
    MESSAGE_ERROR = "ez"
}

export type Packets = {
    [CardPackets.MESSAGE_CLOSE_GAME]: []
};

export type Transformer<D = any> = (data: D) => (Promise<any> | any);
export const TRANSFORMERS: Record<string, Transformer> = {};

export function transform<K extends keyof Packets, T extends Transformer<Packets[K]>>(op: K) {
    return function (handler: T, context: ClassMethodDecoratorContext): T {
        logger.info(handler, context);
        TRANSFORMERS[op] = handler;
        return handler;
    }
}

export class AirtowerProxy {
    public bridge: HybridBridge;
    public gameKey: string;

    constructor(bridge: HybridBridge, gameKey: string) {
        this.bridge = bridge;
        this.gameKey = gameKey;

        logger.info('Created proxy for', gameKey);
    }

    messageFromFlash(packet: string, args: any[]): void {

    }

    messageToFlash(command: string, args: any[]): void {
        this.bridge.send('airtowerMessage', command, args);
    }

    sendPacketFromPayload(payload: any): void {

    }
}
