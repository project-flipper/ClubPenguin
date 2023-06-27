import Phaser from "phaser"
import { RufflePlayer } from "./ruffle";

export type BridgeMessage = {
    op: string,
    parameters: any[]
};

/**
 * Allows communication between Flash and the HTML5 client.
 */
export class HybridBridge extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }

    #flash: RufflePlayer;
    set player(player: RufflePlayer) {
        this.#flash = player;
        this.#flash.onFSCommand = this.messageFromFlash;
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

        return this.emit(op, ...param);
    }
}
