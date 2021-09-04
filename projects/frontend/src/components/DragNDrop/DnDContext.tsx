import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useReducer, useRef,
} from 'react';

import { Counter } from './Dragger/Counter/Counter';
import { Dragger } from './Dragger/Dragger';
import { ActionType } from './store/actions';
import { DndMonitorContext } from './store/context';
import { initState, LifecycleHandlers, reducer } from './store/reducer';
import { DragMode } from './store/types';

interface DndContextProps {
  draggerElement?: ReactNode;
}

type Props = LifecycleHandlers & DndContextProps;

const DndContext: FunctionComponent<Props> = ({
  children,
  draggerElement,
  ...handlers
}) => {
  const [state, dispatch] = useReducer(reducer(handlers), undefined, initState);
  // general lifecycle of drag
  useEffect(() => {
    const handleMouseUp = () => {
      dispatch({ type: ActionType.DragEnd });
    }
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        dispatch({ type: ActionType.DragCancel });
      }
    };

    // fixme too many listeners, be more surgical about creating event listeners (use ref to track prev state and only add listener when we change from no drag mode to drag mode)
    if (state.dragMode ) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('keydown', handleKeyDown);
    return () => {};
  }, [state.dragMode]);

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
      <Dragger>
        {draggerElement}
      </Dragger>
      {children}
    </DndMonitorContext.Provider>
  );
};
export default DndContext;
