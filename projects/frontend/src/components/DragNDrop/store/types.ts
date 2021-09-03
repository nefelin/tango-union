export type Maybe<T> = T | null;
export type DraggableId = string;
export type DroppableId = string;
export type DragMode = 'preDrag' | 'dragging';

export interface Coordinates {
    x: number;
    y: number;
}

export interface State {
    dragMode: Maybe<DragMode>
    overId: Maybe<DroppableId>;
    overPosition: Maybe<Position>;
    initCoordinates: Coordinates;
}

export type DragStartEvent = State;
export type DragEndEvent = State;
export type DragOverEvent = State;

export type Position = ['top' | 'bottom', 'left' | 'right'];
