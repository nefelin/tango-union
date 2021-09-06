import { Dispatch } from 'react';

import { Action, ActionType } from './actions';
import { LifecycleHandlers } from './reducer';
import { State } from './types';

const monitoredDispatch =
  (
    dispatch: Dispatch<Action>,
    state: State,
    { onDragInit, onDragStart, onDragOver, onDragEnd }: LifecycleHandlers,
  ) =>
  (action: Action) => {
    switch (action.type) {
      case ActionType.DragInit:
        onDragInit?.(state);
        dispatch(action);
        break;
      case ActionType.DragStart:
        onDragStart?.(state);
        dispatch(action);
        break;
      case ActionType.DragEnd:
        onDragEnd?.(state);
        dispatch(action);
        break;
      case ActionType.DragOver:
        onDragOver?.(state);
        dispatch(action);
        break;
      default:
        dispatch(action);
        break;
    }
  };

export default monitoredDispatch;
