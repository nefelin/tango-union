import { FavoriteBorder } from '@mui/icons-material';
import React from 'react';
import { ColumnShape } from 'react-base-table';

import {
  User,
  UserDetailFragmentFragment,
} from '../../../../generated/graphql';
import { LengthCell } from './cellRenderers/lengthCell';
import { LikeActionCell } from './cellRenderers/likeActionCell';
import { ListCell } from './cellRenderers/listCell';
import PlayCell from './cellRenderers/playCell';
import playHeaderRenderer from './cellRenderers/playHeader';
import { cellRenderComponent } from './cellRenderers/types';

const idealWidth = 950;

const searchResultColumns = (
  width: number,
  user: UserDetailFragmentFragment | null,
): Array<ColumnShape> => {
  const widthRatio = width / idealWidth;
  return [
    {
      headerRenderer: playHeaderRenderer,
      key: 'play',
      dataKey: 'title',
      title: '',
      width: widthRatio * 50,
      cellRenderer: cellRenderComponent(PlayCell),
      sortable: false,
    },
    {
      key: 'title',
      dataKey: 'title',
      title: 'Title',
      width: widthRatio * 200,
      resizable: true,
      sortable: true,
    },
    {
      key: 'orchestra',
      dataKey: 'orchestra',
      title: 'Orchestra',
      width: widthRatio * 175,
      resizable: true,
      sortable: true,
      cellRenderer: cellRenderComponent(ListCell),
    },
    {
      key: 'singer',
      dataKey: 'singer',
      title: 'Singer',
      width: widthRatio * 150,
      resizable: true,
      sortable: true,
      cellRenderer: cellRenderComponent(ListCell),
    },
    {
      key: 'year',
      dataKey: 'year',
      title: 'Year',
      width: widthRatio * 50,
      resizable: true,
      sortable: true,
      align: 'center',
    },
    {
      key: 'genre',
      dataKey: 'genre',
      title: 'Genre',
      width: widthRatio * 75,
      resizable: true,
      sortable: true,
      align: 'center',
    },
    {
      key: 'linkScore',
      dataKey: 'linkScore',
      title: 'Link Confidence',
      width: widthRatio * 125,
      resizable: true,
      sortable: true,
      align: 'center',
    },
    {
      key: 'secondsLong',
      dataKey: 'secondsLong',
      title: 'Length',
      width: widthRatio * 75,
      resizable: true,
      sortable: true,
      cellRenderer: cellRenderComponent(LengthCell),
      align: 'center',
    },
    {
      hidden: !user,
      key: 'userLiked',
      dataKey: 'userLiked',
      title: '',
      headerRenderer: () => (
        <div className="text-md">
          <FavoriteBorder fontSize={'inherit'} />
        </div>
      ),
      width: widthRatio * 75,
      resizable: true,
      sortable: false, // not possible with current data model
      align: 'center',
      cellRenderer: cellRenderComponent(LikeActionCell),
    },
  ];
};

export default searchResultColumns;
