import { makeVar, useReactiveVar } from '@apollo/client';
import { useContext } from 'react';

import { DndMonitorContext } from '../../components/DragNDrop/store/context';
import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { Maybe } from '../../types/utility/maybe';

interface RowFocusState {
  rowIndex: number;
  tableName: string;
}

const reactiveRowFocus = makeVar<Maybe<RowFocusState>>(null);

export const useHoveredRowState = (rowIndex: number) => {
  const {
    state: { dragMode },
  } = useContext(DndMonitorContext)
  const {name: tableName} = useContext(PlaylistConfigContext);
  const rowFocus = useReactiveVar(reactiveRowFocus);

  const hovered =
    rowFocus?.rowIndex === rowIndex &&
    rowFocus?.tableName === tableName;

  const setHoveredRow = (r: RowFocusState) =>
    setTimeout(() => reactiveRowFocus(r), 0);

  const clearHoveredRow = () => reactiveRowFocus(null);

  const listeners = {
    onMouseEnter:() => setHoveredRow({ rowIndex, tableName }),
  onMouseLeave:() => clearHoveredRow()
  }

  return {
    hovered: dragMode !== 'dragging' && hovered, // disable hover behaviors once proper drag begins
    listeners
  };
};
