import type { FunctionComponent } from 'react';
import React from 'react';
import type { ColumnShape } from 'react-base-table';

import type { SimpleTrack } from '../../../../../generated/graphql';

export interface CellProps {
  song: SimpleTrack;
  column: ColumnShape<SimpleTrack>;
}

export type SongRenderer = FunctionComponent<CellProps>;

export const cellRenderComponent: (
  Comp: SongRenderer,
) => ColumnShape<SimpleTrack>['cellRenderer'] =
  (Comp: SongRenderer) => (data) => {
    const { rowData, column } = data;
    return <Comp song={rowData} column={column} />;
  };
