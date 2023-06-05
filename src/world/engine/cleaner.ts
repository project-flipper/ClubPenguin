import { App } from "../../app/app";

export type FileType =
    | 'animation'
    | 'json'
    | 'multiatlas';

export type AssetIndex = `${FileType}:${string}`;

export default class Cleaner {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

}
