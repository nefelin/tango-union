import {Coordinates, DraggableId, DroppableId, Maybe, Position} from "./types";

export enum ActionType {
    DragInit = 'dragInit',
    DragStart = 'dragStart',
    DragMove = 'dragMove',
    DragEnd = 'dragEnd',
    DragCancel = 'dragCancel',
    DragOver = 'dragOver',
}

export type Action = | { type: ActionType.DragInit, initCoordinates: Coordinates } | {
    type: ActionType.DragStart;
}
    | { type: ActionType.DragMove; coordinates: Coordinates }
    | { type: ActionType.DragEnd }
    | { type: ActionType.DragCancel }
    | { type: ActionType.DragOver, overId: Maybe<DroppableId>, overPosition: Maybe<Position> }