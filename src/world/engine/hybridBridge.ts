import Phaser from "phaser"
import { RufflePlayer } from "./ruffle";

export type BridgedPlayer = RufflePlayer & {
    messageFromHTML5(payload: string): void;
};

export type BridgeMessage = {
    function: string,
    parameters: any[]
};

/**
 * Allows communication between 
 */
export class HybridBridge extends Phaser.Events.EventEmitter {
    public id: string;

    constructor() {
        super();
    }

    register(id?: string): string {
        this.id = id ?? Phaser.Utils.String.UUID();
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
    protected messageFromFlash(op: string, params: string): boolean {
        let data = params ? JSON.parse(params) : [];
        let param = Array.isArray(data) ? data : [data];
        // I unfortunately have to delegate this to a setTimeout because ruffle cannot call itself (see ruffle issue #10791)
        setTimeout(() => this.emit(op, ...param), 200);
        console.log(op, params);
        return true;
    }

    /**
     * Sends a message to Flash.
     * @param op The function name.
     * @param parameters The parameters to send. Will be serialized to JSON.
     */
    send(op: string, ...parameters: any): void {
        this.#flash.messageFromHTML5(JSON.stringify({ function: op, parameters }));
    }
}