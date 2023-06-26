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
    constructor() {
        super();
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
    protected messageFromFlash(payload: string): void {
        let data = JSON.parse(payload) as BridgeMessage;
        this.emit(data.function, ...data.parameters);
    }

    /**
     * Sends a message to Flash.
     * @param payload The payload to send to Flash. Will be serialized to JSON.
     */
    send(payload: BridgeMessage): void {
        this.#flash.messageFromHTML5(JSON.stringify(payload));
    }
}
