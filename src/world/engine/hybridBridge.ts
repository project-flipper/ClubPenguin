import Phaser from "phaser"
import { RufflePlayer } from "./ruffle";

export type BridgedPlayer = RufflePlayer & {
    messageFromHTML5(payload: string): void;
};

export type BridgeMessage = {
    function: string,
    parameters: any[]
};

export type HybridHandlers = {
    loaded(): void;
    ready(): void;
    getLocalizedString(key: string): string;
    startMusicById(musicId?: number): void;
    startGameMusic(): void;
    stopGameMusic(): void;
    hideLoading(): void;
    endGame(score: number, room: undefined): void;
};

/**
 * Allows communication between 
 */
export class HybridBridge {
    private _handlers: HybridHandlers;

    constructor() {
        this.clear();
    }

    setHandler<K extends keyof HybridHandlers>(op: K, handler: HybridHandlers[K], context?: any): void {
        this._handlers[op] = context ? handler.bind(context) : handler;
    }

    callHandler<K extends keyof HybridHandlers>(op: K, ...params: Parameters<HybridHandlers[K]>): ReturnType<HybridHandlers[K]> {
        if (op in this._handlers) {
            return this._handlers[op].apply(this, params);
        }
    }

    removeHandler<K extends keyof HybridHandlers>(op: K): void {
        delete this._handlers[op];
    }

    clear(): void {
        this._handlers = {} as HybridHandlers;
    }

    /* ================ */

    getUniqueId(): string {
        let abc = 'abcdefghijklmnopqrstuvxyz';
        let ABC = abc.toUpperCase();
        let uuid = Phaser.Utils.String.UUID().replaceAll('-', '');
        return Phaser.Utils.Array.GetRandom((abc + ABC).split('')) + uuid;
    }

    public id: string;

    register(id?: string): string {
        this.id = id ?? this.getUniqueId();
        (window as any)[this.id] = this.messageFromFlash.bind(this);
        return this.id;
    }

    #flash: BridgedPlayer;
    set player(player: RufflePlayer) {
        this.#flash = player as BridgedPlayer;
    }

    /**
     * Receives a message from Flash.
     * This should never be called manually, but from Flash itself.
     * Instead, you should add a listener to this instance to receive data.
     * @param payload The serialized JSON received from Flash.
     */
    protected messageFromFlash(op: keyof HybridHandlers, params: string): any {
        let data = params ? JSON.parse(params) : [];
        let args = Array.isArray(data) ? data : [data];
        console.log(op, args);
        return this.callHandler(op, ...(args as any));;
    }

    /**
     * Sends a message to Flash.
     * @param op The function name.
     * @param parameters The parameters to send. Will be serialized to JSON.
     */
    send(op: string, ...parameters: any): void {
        this.#flash.messageFromHTML5(JSON.stringify({ function: op, parameters }));
    }

    /**
     * Sends a message to Flash safely.
     * @param _op The function name.
     * @param _parameters The parameters to send. Will be serialized to JSON.
     */
    sendSafe(_op: string, ..._parameters: any): void {
        // I unfortunately have to delegate this to a setTimeout because ruffle cannot call itself (see ruffle issue #10791)
        setTimeout(() => this.send.apply(this, arguments), 200);
    }
}
