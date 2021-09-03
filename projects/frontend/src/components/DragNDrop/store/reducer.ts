import {Action, ActionType} from './actions';
import {DragEndEvent, DragOverEvent, DragStartEvent, State} from './types';
import {coordinateDistance} from './util';

export const initState = (): State => ({
    dragMode: null,
    overId: null,
    overPosition: null,
    initCoordinates: {x: 0, y: 0},
});

export interface LifecycleHandlers {
    onDragStart?: (e: DragStartEvent) => void;
    onDragEnd?: (e: DragEndEvent) => void;
    onDragOver?: (e: DragOverEvent) => void;
}

export const reducer =
    (handlers: LifecycleHandlers) =>
        (state: State, action: Action): State => {
            const {onDragEnd, onDragOver} = handlers;
            const thisReducer = reducer(handlers);
            switch (action.type) {
                case ActionType.DragInit:
                    const {initCoordinates} = action;
                    return {...state, dragMode: 'preDrag', initCoordinates};
                case ActionType.DragStart:
                    return {...state, dragMode: 'dragging'};

                case ActionType.DragEnd:
                    onDragEnd?.(state);
                    return initState();

                case ActionType.DragCancel:
                    return initState();

                case ActionType.DragMove:
                    const {coordinates} = action;
                    switch (state.dragMode) {
                        case 'preDrag': // todo separate this potentially modular business logic into separate dragMonitor thing
                            const distanceFromInit = coordinateDistance(
                                coordinates,
                                state.initCoordinates,
                            );
                            const startDistance = 15;
                            return distanceFromInit > startDistance
                                ? thisReducer(state, {type: ActionType.DragStart})
                                : state;
                        case 'dragging':
                        default:
                            return state;
                    }

                case ActionType.DragOver:
                    const {overId, overPosition} = action;
                    switch (state.dragMode) {
                        case "preDrag":
                            return thisReducer({...state, overId, overPosition}, {type: ActionType.DragStart}) // adding dragStart here means dragOver before init distance causes early init
                        case "dragging":
                            return {...state, overId, overPosition}
                        case null:
                        default:
                            return state;
                    }                default:
                    return state;
            }
        };
