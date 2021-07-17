import { makeVar, useReactiveVar } from '@apollo/client';

import { Maybe } from '../../types/utility/maybe';

interface RowFocusState {
  rowIndex: number;
  tableName: string;
}

interface Props {
  rowLens?: RowFocusState;
}

interface HoveredRowInterface {
  hovered: boolean;
  setHoveredRow: (x: RowFocusState) => void;
  clearHoveredRow: VoidFunction;
}

const reactiveRowFocus = makeVar<Maybe<RowFocusState>>(null);

export const useHoveredRowState = (props?: Props): HoveredRowInterface => {
  const rowFocus = useReactiveVar(reactiveRowFocus);

  const hovered =
    rowFocus?.rowIndex === props?.rowLens?.rowIndex &&
    rowFocus?.tableName === props?.rowLens?.tableName;

  const setHoveredRow = (r: RowFocusState) =>
    setTimeout(() => reactiveRowFocus(r), 0);

  const clearHoveredRow = () => reactiveRowFocus(null);

  return {
    hovered,
    setHoveredRow,
    clearHoveredRow,
  };
};
