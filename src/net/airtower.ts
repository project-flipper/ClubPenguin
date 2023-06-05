import Phaser from "phaser";
import type { App } from "../app/app";

export class Airtower extends Phaser.Events.EventEmitter {
    app: App;
    basePath: string;

    constructor(app: App, basePath: string) {
        super();
        this.app = app;

        this.basePath = basePath;
    }
}
