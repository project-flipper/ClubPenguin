import { getLogger } from "@clubpenguin/lib/log";
import EventEmitter from "eventemitter3";

let logger = getLogger('CP.load.tasks');

export type DonePayload = {
    ok: boolean,
    data: any
};

export interface Task extends EventEmitter {
    label?: string;
    progress: number;
    important: boolean;
    didFail: boolean;
    isDone: boolean;

    /**
     * Wait until this task resolves. Custom data may be returned inside the data property of the result payload.
     */
    wait(): Promise<DonePayload>;

    /**
     * Whether the task is bound to an event system.
     */
    bound: boolean;
    /**
     * Initializes binding. Useful to link together event systems.
     */
    bind(): void;
    /**
     * Undoes any binding done previously as part of a cleanup.
     */
    unbind(): void;
}

export class LoaderTask extends EventEmitter implements Task {
    label?: string;
    important: boolean;
    didFail: boolean;
    bound: boolean;

    loader: Phaser.Loader.LoaderPlugin;

    constructor(label: string, loader: Phaser.Loader.LoaderPlugin) {
        super();

        this.label = label;
        this.loader = loader;
        this.important = false;
        this.didFail = false;
        this.bound = false;
    }

    bind(): void {
        this.loader.on('fileprogress', this.onFileProgress, this);
        this.loader.on('complete', this.onComplete, this);
        this.bound = true;
    }

    unbind(): void {
        this.loader.off('fileprogress', this.onFileProgress, this);
        this.loader.off('complete', this.onComplete, this);
        this.bound = false;
    }

    get progress(): number {
        return this.loader.progress;
    }

    get isDone(): boolean {
        return !this.loader.isLoading();
    }

    onFileProgress(): void {
        this.emit('progress', this.progress);
    }

    isOk(_totalComplete: number, totalFailed: number): boolean {
        return this.important ? totalFailed === 0 : true;
    }

    private _result: { ok: boolean, data: { totalComplete: number, totalFailed: number } };

    onComplete(_loader: Phaser.Loader.LoaderPlugin, totalComplete: number, totalFailed: number): void {
        let ok = this.isOk(totalComplete, totalFailed);

        this._result = {
            ok,
            data: {
                totalComplete,
                totalFailed
            }
        };

        this.didFail = !ok;
        this.emit('done', this._result);
    }

    wait(): Promise<{ ok: boolean, data: { totalComplete: number, totalFailed: number } }> {
        if (!this.bound) throw new Error('Task is not bound to an event system.');
        return new Promise(resolve => {
            if (this.loader.totalToLoad == 0) this.onComplete(this.loader, this.loader.totalComplete, this.loader.totalFailed);
            if (this._result) return resolve(this._result);
            this.once('done', payload => resolve(payload));
        });
    }
}

export class PromiseTask extends EventEmitter implements Task {
    label?: string;
    isDone: boolean;
    important: boolean;
    didFail: boolean;
    bound: boolean;

    wrapper: Promise<any>;

    private _result: { ok: boolean, data: { value: any, reason: any } };

    constructor(callback: ((task?: PromiseTask) => any) | Promise<any>) {
        super();

        this.important = false;
        this.didFail = false;
        this.bound = false;

        this.wrap(callback);
    }

    async wrap(callback: ((task?: PromiseTask) => any) | Promise<any>): Promise<void> {
        this.isDone = false;

        try {
            if (typeof callback === 'function') callback = callback(this);

            let result = await Promise.resolve(callback);

            this.isDone = true;
            this._result = { ok: true, data: { value: result, reason: undefined } };
            this.emit('done', this._result);
        } catch (e) {
            logger.error('An error occurred on PromiseTask:', e);

            this.isDone = true;
            this.didFail = true;
            this._result = { ok: false, data: { value: undefined, reason: e } };
            this.emit('done', this._result);
        }
    }

    bind(): void {
        this.bound = true;
    }

    unbind(): void {
        this.bound = false;
    }

    get progress(): number {
        return Number(this.isDone);
    }

    wait(): Promise<{ ok: boolean, data: { value: any, reason: any } }> {
        if (!this.bound) throw new Error('Task is not bound to an event system.');
        return new Promise(resolve => {
            if (this._result) return resolve(this._result);
            this.once('done', payload => resolve(payload));
        });
    }
}

export class GroupTask extends EventEmitter implements Task {
    label?: string;
    important: boolean;

    _tasks: Task[];
    _isBinded: boolean;

    constructor(tasks?: Task[]) {
        super();

        this._tasks = [];

        this.important = false;
        this._isBinded = false;

        if (tasks !== undefined) for (let task of tasks) this.addTask(task);
    }

    get didFail(): boolean {
        for (let task of this._tasks) if (task.didFail) return true;
        return false;
    }

    hasTask(task: Task): boolean {
        return this._tasks.includes(task);
    }

    addTask(task: Task): this {
        this.removeTask(task);

        if (this._isBinded) task.bind();

        this._tasks.push(task);
        return this;
    }

    removeTask(task?: Task): this {
        if (task === undefined) {
            for (let currentTask of this._tasks) this.removeTask(currentTask);
            return this;
        }

        let index = this._tasks.indexOf(task);
        if (index !== -1) {
            if (this._isBinded) task.unbind();
            this._tasks.splice(index, 1);
        }
        return this;
    }

    get isDone(): boolean {
        for (let task of this._tasks) if (!task.isDone) return false;
        return true;
    }

    get progress(): number {
        let progress = 0;
        for (let task of this._tasks) progress += task.progress;

        return progress / this._tasks.length;
    }

    get bound(): boolean {
        return this._isBinded;
    }

    bind(): void {
        this._isBinded = true;
        for (let task of this._tasks) task.bind();
    }

    unbind(): void {
        this._isBinded = false;
        for (let task of this._tasks) task.unbind();
    }

    async wait(): Promise<DonePayload> {
        if (!this.bound) throw new Error('Task is not bound to an event system.');
        let payloads = await Promise.all(this._tasks.map(task => task.wait()));
        return { ok: payloads.every(payload => payload.ok), data: payloads };
    }
}
