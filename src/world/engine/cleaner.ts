import { getLogger } from "@clubpenguin/lib/log";
import { Engine } from "./engine";

let logger = getLogger('CP.world.engine.cleaner');

/**
 * The `Cleaner` class is responsible for managing and cleaning up resources within the engine.
 * It tracks resource allocations and deallocations, and can free up unused resources.
 */
export default class Cleaner {
    public engine: Engine;
    public resources: string[];
    public resourcesUsedByPlayers: Record<string, number[]>;
    public playersUsingResources: Record<number, string[]>;

    constructor(engine: Engine) {
        this.engine = engine;
        this.resources = [];
        this.resourcesUsedByPlayers = {};
        this.playersUsingResources = {};
    }

    /**
     * Generates a unique key for a resource based on its type and key.
     * @param type The type of the resource.
     * @param key The key of the resource.
     * @returns A unique key string.
     */
    getKey(type: string, key: string): string {
        return `${type}:${key}`;
    }

    /**
     * Splits a resource key into its type and key components.
     * @param key The resource key to split.
     * @returns A tuple containing the type and key.
     */
    fromKey(key: string): [string, string] {
        let [ first, ...rest ] = key.split(':');
        return [first, rest.join(':')];
    }

    /**
     * Allocates a resource to a player or as a floating resource.
     * @param type The type of the resource.
     * @param key The key of the resource.
     * @param playerId The ID of the player to optionally allocate the resource to.
     */
    allocateResource(type: string, key: string, playerId?: number): void {
        let resKey = this.getKey(type, key);
        if (!this.resources.includes(resKey)) this.resources.push(resKey);

        if (playerId) {
            if (!(resKey in this.resourcesUsedByPlayers)) {
                this.resourcesUsedByPlayers[resKey] = [];
            }

            this.resourcesUsedByPlayers[resKey].push(playerId);

            
            if (!(playerId in this.playersUsingResources)) {
                this.playersUsingResources[playerId] = [];
            }

            this.playersUsingResources[playerId].push(resKey);
            logger.debug(`Allocated resource ${resKey} to player ${playerId}`);
        } else {
            logger.debug(`Allocated floating resource ${resKey}`);
        }
    }

    /**
     * Deallocates a resource from a player or as a floating resource.
     * @param type The type of the resource.
     * @param key The key of the resource.
     * @param playerId The ID of the player to optionally deallocate the resource from.
     */
    deallocateResource(type: string, key: string, playerId?: number): void {
        let resKey = this.getKey(type, key);
        if (!this.resources.includes(resKey)) {
            logger.warn(`Resource ${resKey} is not allocated. Ignoring`);
            return;
        }

        if (playerId) {
            if (resKey in this.resourcesUsedByPlayers) {
                let usages = this.resourcesUsedByPlayers[resKey];
                usages.splice(usages.indexOf(playerId), 1);
            }

            this.playersUsingResources[playerId].splice(this.resources.indexOf(resKey), 1);

            logger.debug(`Deallocated resource ${resKey} from player ${playerId}`);
        } else {
            let players: number[] = [];
            if (resKey in this.resourcesUsedByPlayers) this.resourcesUsedByPlayers[resKey] = [];

            for (let playerId of players) {
                this.playersUsingResources[playerId].splice(this.resources.indexOf(resKey), 1);
            }

            logger.debug(`Deallocated floating resource ${resKey}`);
        }
    }

    /**
     * Marks a resource as trash, meaning it can be collected and freed later.
     * @param type The type of the resource.
     * @param key The key of the resource.
     */
    markTrash(type: string, key: string): void {
        let resKey = this.getKey(type, key);
        if (!this.resources.includes(resKey)) {
            this.resources.push(resKey);

            logger.debug(`Marked resource ${resKey} as trash`);
        } else logger.warn(`Resource ${resKey} is currently allocated. Ignoring`);
    }

    /**
     * Frees a resource from the engine based on its type and key.
     * @param type The type of the resource.
     * @param key The key of the resource.
     */
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

    /**
     * Computes a list of resources that are no longer in use and can be considered garbage.
     * @returns An array of resource keys that are considered garbage.
     */
    computeGarbage(): string[] {
        return this.resources.filter(res => {
            let usages = this.resourcesUsedByPlayers[res];
            if (!usages) return true;
            return this.resourcesUsedByPlayers[res].length == 0
        });
    }

    /**
     * Collects and frees all resources that are considered garbage.
     */
    collect(): void {
        logger.debug('Freeing garbage');
        let garbage = this.computeGarbage();
        for (let resKey of garbage) {
            let [type, key] = this.fromKey(resKey);
            this.freeResource(type, key);
            this.resources.splice(this.resources.indexOf(resKey), 1);
        }
    }

    /**
     * Collects and frees all resources managed by the cleaner.
     */
    collectAll(): void {
        logger.debug('Freeing all resources');
        for (let resKey of this.resources) {
            let [type, key] = this.fromKey(resKey);
            this.freeResource(type, key);
        }

        this.resources = [];
        this.resourcesUsedByPlayers = {};
        this.playersUsingResources = {};
    }
}
