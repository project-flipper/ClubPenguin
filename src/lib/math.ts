export function getAngle(fromX: number, fromY: number, atX: number, atY: number): number {
    let dx = atX - fromX;
    let dy = atY - fromY;

    let angle = (Math.atan2(dy, dx) * (180 / Math.PI)) - 90;
    return (angle < 0) ? angle + 360 : angle;
}

export function getDirection(angle: number): number {
    let direction = Math.round(angle / 45);
    return (direction > 7) ? 0 : direction;
}

export function getDirectionQuarters(angle: number): number {
    var direction = Math.floor(angle / 90);
    return (direction > 3) ? 0 : direction;
}
