import React, { FunctionComponent } from 'react';
import { ColumnShape } from 'react-base-table';

import { SimpleTrack } from '../../../../../generated/graphql';

export interface CellProps {
  song: SimpleTrack;
  column: ColumnShape<SimpleTrack>;
  rowIndex: number;
}

export type SongRenderer = FunctionComponent<CellProps>;

export const cellRenderComponent: (
  Comp: SongRenderer,
) => ColumnShape<SimpleTrack>['cellRenderer'] =
  (Comp: SongRenderer) => (data) => {
    const {
      rowData,
      column,
      rowIndex
    } = data;

    return <Comp song={rowData} column={column} rowIndex={rowIndex}/>;
  };
