import { makeVar, useReactiveVar } from '@apollo/client';
import { useContext } from 'react';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { Maybe } from '../../types/utility/maybe';

interface RowFocusState {
  rowIndex: number;
  tableName: string;
}

const reactiveRowFocus = makeVar<Maybe<RowFocusState>>(null);

export const useHoveredRowState = (rowIndex: number) => {
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
    hovered,
    listeners
  };
};
