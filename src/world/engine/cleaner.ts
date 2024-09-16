import { Engine } from "./engine";

export default class Cleaner {
    engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    takeResource(type: string, key: string, playerId?: string): void {

    }

    freeResource(type: string, key: string, playerId?: string): void {

    }

    run(): void {
        
    }
}
