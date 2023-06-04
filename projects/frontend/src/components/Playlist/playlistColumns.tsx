import { FavoriteBorder } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React from 'react';
import { ColumnShape } from 'react-base-table';

import { UserDetailFragmentFragment } from '../../../generated/graphql';
import { LengthCell } from '../ResultsTable/ResultsTableBody/cellRenderers/lengthCell';
import { LikeActionCell } from '../ResultsTable/ResultsTableBody/cellRenderers/likeActionCell';
import { ListCell } from '../ResultsTable/ResultsTableBody/cellRenderers/listCell';
import PlayCell from '../ResultsTable/ResultsTableBody/cellRenderers/playCell';
import { cellRenderComponent } from '../ResultsTable/ResultsTableBody/cellRenderers/types';
import ShareHeader from './ShareHeader';
import TrashHeader from './TrashHeader';

const playlistColumns = (
  user: UserDetailFragmentFragment | null,
): Array<ColumnShape> => [
  {
    key: 'play',
    dataKey: '',
    title: '',
    width: 53,
    cellRenderer: cellRenderComponent(PlayCell),
    sortable: false,
    style: { padding: '0 0 0 3px' },
    headerRenderer: TrashHeader,
  },
  {
    key: 'title',
    dataKey: 'title',
    title: 'Title',
    width: 230,
    resizable: true,
  },
  {
    key: 'orchestra',
    dataKey: 'orchestra',
    title: 'Orchestra',
    width: 210,
    resizable: true,
    cellRenderer: cellRenderComponent(ListCell),
  },
  {
    key: 'singer',
    dataKey: 'singer',
    title: 'Singer',
    width: 210,
    resizable: true,
    cellRenderer: cellRenderComponent(ListCell),
  },
  {
    key: 'year',
    dataKey: 'year',
    title: 'Year',
    width: 100,
    resizable: true,
  },
  {
    key: 'secondsLong',
    dataKey: 'secondsLong',
    title: 'Length',
    width: 75,
    resizable: true,
    cellRenderer: cellRenderComponent(LengthCell),
  },
  {
    key: 'genre',
    dataKey: 'genre',
    title: 'Genre',
    width: 100,
    resizable: true,
  },
  {
    hidden: !user,
    key: 'userLiked',
    dataKey: 'userLiked',
    title: '',
    headerRenderer: () => (
      // <Tooltip title="Like all tracks in list" className="text-md">
      //   <button onClick={handleLikeAll}>
          <FavoriteBorder fontSize={'inherit'} />
        // </button>
      // </Tooltip>
    ),
    width: 45,
    resizable: true,
    sortable: false, // not possible with current data model
    align: 'center',
    cellRenderer: cellRenderComponent(LikeActionCell),
  },
  {
    key: 'share',
    dataKey: '',
    title: '',
    width: 53,
    sortable: false,
    style: { padding: '0 0 0 3px' },
    headerRenderer: ShareHeader,
  },
];

export default playlistColumns;
