import { getLogger } from "@clubpenguin/lib/log";
import { HybridBridge } from "./hybridBridge";
import World from "@clubpenguin/world/World";
import { Payloads } from "@clubpenguin/net/types/payload";

let logger = getLogger('CP.world.engine.hybrid.airtower');

enum SledPackets {
    MESSAGE_JOIN_GAME = "jz",
    MESSAGE_GAME_MOVE = "zm",
    MESSAGE_UPDATE_GAME = "uz"
}

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

enum Source {
    FROM_FLASH,
    FROM_HTML5
}

export type Transformer<D = any> = (data: D) => (Promise<any> | any);
export const TRANSFORMERS: Record<Source, Record<string, Record<string, Transformer>>> = {
    [Source.FROM_FLASH]: {},
    [Source.FROM_HTML5]: {}
};

export function transform<O extends keyof Payloads, D extends Payloads[O], T extends Transformer<D>>(source: Source.FROM_HTML5, game: string, op: O): (handler: T, context: ClassMethodDecoratorContext) => T;
export function transform<T extends Transformer>(source: Source, game: string, op: string): (handler: T, context: ClassMethodDecoratorContext) => T;
export function transform<T extends Transformer>(source: Source, game: string, op: string): (handler: T, context: ClassMethodDecoratorContext) => T {
    return function (handler: T, context: ClassMethodDecoratorContext): T {
        logger.info(handler, context);
        if (!(game in TRANSFORMERS[source])) TRANSFORMERS[source][game] = {};
        TRANSFORMERS[source][game][op] = handler;
        return handler;
    }
}

export class AirtowerProxy {
    public bridge: HybridBridge;
    public world: World;
    public gameKey: string;

    constructor(bridge: HybridBridge, world: World, gameKey: string) {
        this.bridge = bridge;
        this.world = world;
        this.gameKey = gameKey;

        this.setListeners();

        logger.info('Created proxy for', gameKey);
    }

    setListeners(): void {
        let transformers = TRANSFORMERS[Source.FROM_HTML5][this.gameKey];
        if (!transformers) return;

        for (let op in transformers) this.world.events.on(op, transformers[op], this);
    }

    removeListeners(): void {
        let transformers = TRANSFORMERS[Source.FROM_HTML5][this.gameKey];
        if (!transformers) return;

        for (let op in transformers) this.world.events.off(op, transformers[op], this);
    }

    messageFromFlash(packet: string, args: any[]): void {
        logger.info('Received message from flash', packet, args);
        let transformers = TRANSFORMERS[Source.FROM_FLASH][this.gameKey];
        if (!transformers) {
            logger.warn('No transformers for', this.gameKey);
            return;
        }
        if (transformers[packet]) {
            try {
                transformers[packet].apply(this, args);
            } catch (e) {
                logger.error('Error while handling', packet, e);
            }
        } else logger.warn('No transformer for', packet);
    }

    messageToFlash(command: string, args: any[]): void {
        this.bridge.sendSafe('airtowerMessage', command, args);
    }

    destroy(): void {
        this.removeListeners();
    }

    @transform(Source.FROM_FLASH, 'sled', SledPackets.MESSAGE_JOIN_GAME)
    sledJoinGameFromFlash(...args: any[]): void {
        console.error('Received sled join game from flash', args);
        this.world.send({
            op: 'game:sled:join',
            d: {}
        });
    }

    @transform(Source.FROM_FLASH, 'sled', SledPackets.MESSAGE_GAME_MOVE)
    async sledGameMoveFromFlash(...args: any[]): Promise<void> {
        console.error('Received sled game move from flash', args);
        this.world.send({
            op: 'game:sled:move',
            d: {
                x: args[1],
                y: args[2],
                gameTime: args[3]
            }
        });
    }

    @transform(Source.FROM_HTML5, 'sled', 'game:sled:move')
    async sledGameMove(d: Payloads['game:sled:move']): Promise<void> {
        this.messageToFlash(SledPackets.MESSAGE_UPDATE_GAME, []);
    }

    @transform(Source.FROM_HTML5, 'sled', 'game:sled:update')
    async sledUpdateGame(d: Payloads['game:sled:move']): Promise<void> {
        this.messageToFlash(SledPackets.MESSAGE_UPDATE_GAME, []);
    }
}
