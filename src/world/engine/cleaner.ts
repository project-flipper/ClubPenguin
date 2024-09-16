import { getLogger } from "@clubpenguin/lib/log";
import { Engine } from "./engine";

let logger = getLogger('CP.world.engine.cleaner');

export default class Cleaner {
    public engine: Engine;
    public resources: string[];
    public resourceUsages: Record<string, string[]>;
    public fromPlayers: Record<string, string[]>;

    constructor(engine: Engine) {
        this.engine = engine;
        this.resources = [];
        this.resourceUsages = {};
        this.fromPlayers = {};
    }

    getKey(type: string, key: string): string {
        return `${type}:${key}`;
    }

    fromKey(key: string): [string, string] {
        let [ first, ...rest ] = key.split(':');
        return [first, rest.join(':')];
    }

    allocateResource(type: string, key: string, playerId?: string): void {
        let resKey = this.getKey(type, key);
        if (!this.resources.includes(resKey)) this.resources.push(resKey);

        if (playerId) {
            if (!(resKey in this.resourceUsages)) {
                this.resourceUsages[resKey] = [];
            }

            this.resourceUsages[resKey].push(playerId);

            
            if (!(playerId in this.fromPlayers)) {
                this.fromPlayers[playerId] = [];
            }

            this.fromPlayers[playerId].push(resKey);
            logger.info(`Allocated resource ${resKey} to player ${playerId}`);
        } else {
            logger.info(`Allocated floating resource ${resKey}`);
        }
    }

    deallocateResource(type: string, key: string, playerId?: string): void {
        let resKey = this.getKey(type, key);
        if (!this.resources.includes(resKey)) return;

        if (playerId) {
            if (resKey in this.resourceUsages) {
                let usages = this.resourceUsages[resKey];
                usages.splice(usages.indexOf(playerId), 1);
            }

            this.fromPlayers[playerId].splice(this.resources.indexOf(resKey), 1);

            logger.info(`Deallocated resource ${resKey} from player ${playerId}`);
        } else {
            let players: string[] = [];
            if (resKey in this.resourceUsages) this.resourceUsages[resKey] = [];

            for (let playerId of players) {
                this.fromPlayers[playerId].splice(this.resources.indexOf(resKey), 1);
            }

            logger.info(`Deallocated floating resource ${resKey}`);
        }
    }

    freeResource(type: string, key: string): void {
        logger.info('Unloading', type, key);
        switch (String(type)) {
            case 'animation':
                this.engine.app.unloadAnimation(key);
                break;
            case 'asset-pack':
                this.engine.app.unloadAssetPack(key);
                break;
            case 'audio':
                this.engine.app.unloadAudio(key);
                break;
            case 'bitmap-font':
                this.engine.app.unloadBitmapFont(key);
                break;
            case 'image':
                this.engine.app.unloadImage(key);
                break;
            case 'json':
                this.engine.app.unloadJSON(key);
                break;
            case 'multiatlas':
                this.engine.app.unloadMultiatlas(key);
                break;
        }
    }

    computeGarbage(): string[] {
        return this.resources.filter(res => this.resourceUsages[res].length == 0);
    }

    collect(): void {
        logger.info('Freeing garbage');
        let garbage = this.computeGarbage();
        for (let resKey of garbage) {
            let [type, key] = this.fromKey(resKey);
            this.freeResource(type, key);
            this.resources.splice(this.resources.indexOf(resKey));
        }
    }

    collectAll(): void {
        logger.info('Freeing all resources');
        for (let resKey of this.resources) {
            let [type, key] = this.fromKey(resKey);
            this.freeResource(type, key);
        }

        this.resources = [];
        this.resourceUsages = {};
        this.fromPlayers = {};
    }
}
