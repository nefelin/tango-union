import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

import { Dragger } from './Dragger/Dragger';
import { ActionType } from './store/actions';
import { DndMonitorContext } from './store/context';
import monitoredDispatch from './store/monitoredDispatch';
import { initState, LifecycleHandlers, reducer } from './store/reducer';

interface DndContextProps {
  draggerElement?: ReactNode;
}

type Props = LifecycleHandlers & DndContextProps;

const DndContext: FunctionComponent<Props> = ({
  children,
  draggerElement,
  ...handlers
}) => {
  const [state, rawDispatch] = useReducer(reducer, undefined, initState);
  const dispatch = useCallback(
    monitoredDispatch(rawDispatch, state, handlers),
    [state],
  );

  // general lifecycle of drag
  useEffect(() => {
    const handleMouseUp = () => {
      dispatch({ type: ActionType.DragEnd });
    };
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        dispatch({ type: ActionType.DragCancel });
      }
    };

    const createListeners = () => {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('keydown', handleKeyDown);
    };
    const removeListeners = () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    };

    removeListeners();
    createListeners();
    return removeListeners;
  }, [dispatch]);

  // specifically handle pre-drag to dragging transition
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dispatch({
        type: ActionType.DragMove,
        coordinates: { x: e.pageX, y: e.pageY },
      });
    };

    if (state.dragMode === 'preDrag') {
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
    window.removeEventListener('mousemove', handleMouseMove);
    return () => {};
  }, [state.dragMode]);

  const value = { state, dispatch };
  return (
    <DndMonitorContext.Provider value={value}>
      <Dragger>{draggerElement}</Dragger>
      {children}
    </DndMonitorContext.Provider>
  );
};
export default DndContext;
