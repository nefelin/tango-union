import { Action, ActionType } from './actions';
import { DragEndEvent, DragOverEvent, DragStartEvent, State } from './types';
import { coordinateDistance } from './util';

export const initState = (): State => ({
  dragMode: null,
  overId: null,
  overPosition: null,
  initCoordinates: { x: 0, y: 0 },
});

export interface LifecycleHandlers {
  onDragStart?: (e: DragStartEvent) => void;
  onDragInit?: (e: DragStartEvent) => void;
  onDragEnd?: (e: DragEndEvent) => void;
  onDragOver?: (e: DragOverEvent) => void;
}

export const reducer =
  (handlers: LifecycleHandlers) =>
  (state: State, action: Action): State => {
    // console.log({action})
    const { onDragEnd, onDragOver, onDragStart, onDragInit } = handlers;
    const thisReducer = reducer(handlers);
    switch (action.type) {
      case ActionType.DragInit:
        const { initCoordinates } = action;
        const newInitState: State = {
          ...state,
          overId: null,
          dragMode: 'preDrag',
          initCoordinates,
        };
        onDragInit?.(newInitState);
        return newInitState;
      case ActionType.DragStart:
        onDragStart?.(state);
        return { ...state, dragMode: 'dragging' };

      case ActionType.DragEnd:
        onDragEnd?.(state);
        return initState();

      case ActionType.DragCancel:
        return initState();

      case ActionType.DragMove:
        const { coordinates } = action;
        switch (state.dragMode) {
          case 'preDrag': // todo separate this potentially modular business logic into separate dragMonitor thing
            const distanceFromInit = coordinateDistance(
              coordinates,
              state.initCoordinates,
            );
            const startDistance = 15;
            return distanceFromInit > startDistance
              ? thisReducer(state, { type: ActionType.DragStart })
              : state;
          case 'dragging':
          default:
            return state;
        }

      case ActionType.DragOver:
        const { overId, overPosition } = action;
        let newState: State;
        switch (state.dragMode) {
          case 'preDrag':
            newState = thisReducer(
              { ...state, overId, overPosition },
              { type: ActionType.DragStart },
            ); // adding dragStart here means dragOver before init distance causes early init
            break;
          case 'dragging':
            newState = { ...state, overId, overPosition };
            break;
          case null:
          default:
            newState = state;
            break;
        }
        onDragOver?.(newState);
        return newState;

      default:
        return state;
    }
  };
