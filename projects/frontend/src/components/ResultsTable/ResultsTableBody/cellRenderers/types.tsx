import React, { FunctionComponent } from 'react';
import { ColumnShape } from 'react-base-table';

import { SimpleTrack } from '../../../../../generated/graphql';
import { PlaylistTrack } from '../../../../hooks/state/usePlaylistsState/types';

export interface CellProps {
  song: PlaylistTrack;
  column: ColumnShape<PlaylistTrack>;
  rowIndex: number;
}

export type SongRenderer = FunctionComponent<CellProps>;

export const cellRenderComponent: (
  Comp: SongRenderer,
) => ColumnShape<PlaylistTrack>['cellRenderer'] =
  (Comp: SongRenderer) => (data) => {
    const { rowData, column, rowIndex } = data;

    return <Comp song={rowData} column={column} rowIndex={rowIndex} />;
  };
