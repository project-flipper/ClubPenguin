/**
 * An enum representation of a direction, ranging from 0 to 7.
 */
export enum Direction {
    DOWN,
    DOWN_LEFT,
    LEFT,
    UP_LEFT,
    UP,
    UP_RIGHT,
    RIGHT,
    DOWN_RIGHT,
}

/**
 * An enum representation of a direction in quarters, ranging from 0 to 3.
 */
export enum DirectionQuarters {
    DOWN_LEFT,
    UP_LEFT,
    UP_RIGHT,
    DOWN_RIGHT
}

/**
 * Calculates the angle in degrees between two points.
 * @param fromX The x-coordinate of the starting point.
 * @param fromY The y-coordinate of the starting point.
 * @param atX The x-coordinate of the target point.
 * @param atY The y-coordinate of the target point.
 * @returns The angle in degrees between the two points.
 */
export function getAngle(fromX: number, fromY: number, atX: number, atY: number): number {
    let dx = atX - fromX;
    let dy = atY - fromY;

    let angle = (Math.atan2(dy, dx) * (180 / Math.PI)) - 90;
    return angle < 0 ? angle + 360 : angle;
}

/**
 * Calculates the direction based on the given angle.
 * @param angle The angle in degrees.
 * @returns The direction value ranging from 0 to 7.
 */
export function getDirection(angle: number): Direction {
    let direction = Math.round(angle / 45);
    return direction > 7 ? 0 : direction;
}

/**
 * Calculates the direction in quarters based on the given angle.
 * @param angle The angle in degrees.
 * @returns The direction in quarters ranging from 0 to 3.
 */
export function getDirectionQuarters(angle: number): DirectionQuarters {
    var direction = Math.floor(angle / 90);
    return direction > 3 ? 0 : direction;
}

/**
 * Generates a random number within the specified range.
 * @param min The minimum value of the range (inclusive).
 * @param max The maximum value of the range (inclusive).
 * @returns A random number within the specified range.
 */
export function randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Rounds the value to the specified precision.
 * @param value The value to round.
 * @param precision The number of decimal places to round to.
 * @returns The rounded value.
 */
export function roundTo(value: number, precision: number): number {
    let factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
}

/**
 * Picks a random item from an object with weights.
 * @param weights The weights of the items to pick from.
 * @returns The key of the picked item.
 */
export function weightedPick(weights: { [key: string]: number }): string {
    let total = 0;
    for (let key in weights) total += weights[key];

    let random = Math.random() * total;
    for (let key in weights) {
        random -= weights[key];
        if (random <= 0) return key;
    }

    return null;
}
(window as any).weightedPick = weightedPick;
