import {Coordinates} from './types';

export const coordinateDistance = (a: Coordinates, b: Coordinates): number => {
    const diff = {x: Math.abs(a.x - b.x), y: Math.abs(a.y - b.y)};

    return Math.sqrt(diff.x ** 2 + diff.y ** 2)
}