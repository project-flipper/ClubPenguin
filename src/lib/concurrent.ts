/**
 * Controls the maximum number of concurrent executions of a function.
 * Useful for rate limiting, or ensuring an operation only runs n number of times at once.
 * 
 */
export class MaximumConcurrency {
    public maxConcurrency: number;
    public maximumQueue: number;

    private queue: (() => Promise<any>)[];
    private current: number;

    constructor(maxConcurrency: number, maximumQueue: number = 0) {
        this.maxConcurrency = maxConcurrency;
        this.queue = [];
        this.maximumQueue = maximumQueue;
        this.current = 0;
    }

    /**
     * Adds a function to the queue to run.
     * If the maximum concurrency has not been reached, the function will run immediately.
     * @param fn The function to run.
     * @returns The result of the function.
     */
    async run<T extends any>(fn: () => Promise<T>): Promise<T> {
        if (this.current < this.maxConcurrency) {
            this.current++;
            try {
                return await fn();
            } finally {
                this.current--;
                if (this.queue.length > 0) this.run(this.queue.shift());
            }
        } else {
            if (this.maximumQueue && this.queue.length >= this.maximumQueue) return Promise.reject(new Error('Queue full'));
            return new Promise((resolve, reject) => {
                this.queue.push(async () => {
                    try {
                        let r = await fn();
                        resolve(r);
                        return r;
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    }

    /**
     * The number of functions currently in the queue.
     */
    get inQueue(): number {
        return this.queue.length;
    }

    /**
     * Clears the queue and cancels any pending functions.
     */
    clear(reason = 'Queue cleared'): void {
        this.queue.map(_ => Promise.reject(new Error(reason)));
    }
}
