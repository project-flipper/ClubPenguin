/**
 * Sleeps for the specified number of milliseconds.
 * @param ms The number of milliseconds to sleep for.
 * @returns A promise that resolves after the specified number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
