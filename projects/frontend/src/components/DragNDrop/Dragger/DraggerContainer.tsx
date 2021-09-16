import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import useMouseCoordinates from '../hooks/useMouseCoordinates';
import { DndMonitorContext } from '../store/context';

export const DraggerContainer: FunctionComponent = ({children}) => {
  const { state } = useContext(DndMonitorContext);
  const [renderOffset, setRenderOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { pageX, pageY } = useMouseCoordinates();

  useEffect(() => {
    if (containerRef.current) {
      setRenderOffset({
        x: containerRef.current.clientWidth * 0.8,
        y: containerRef.current.clientHeight * 0.8,
      });
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={{
        left: pageX - renderOffset.x,
        top: pageY - renderOffset.y,
        visibility: state?.dragMode === 'dragging' ? 'visible' : 'hidden',
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:100,
      }}
    >
      {children}
    </div>
  );
};
