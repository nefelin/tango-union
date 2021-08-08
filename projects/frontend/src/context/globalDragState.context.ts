import React from 'react';

interface GlobalDragState {
  dragging: boolean;
}

const GlobalDragState = React.createContext<GlobalDragState>({
  dragging: false,
});

export default GlobalDragState;
