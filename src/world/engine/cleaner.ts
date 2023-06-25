import Engine from "./Engine";

export type FileType =
    | 'animation'
    | 'json'
    | 'multiatlas';

export type AssetIndex = `${FileType}:${string}`;

export default class Cleaner {
    engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

}
