import { ColumnShape } from 'react-base-table';

import { ActionCell } from './cellRenderers/actionCell';
import { LengthCell } from './cellRenderers/lengthCell';
import { ListCell } from './cellRenderers/listCell';
import PlayCell from './cellRenderers/playCell';
import playHeaderRenderer from './cellRenderers/playHeader';
import { cellRenderComponent } from './cellRenderers/types';

const idealWidth = 950;

const searchResultColumns = (width: number): Array<ColumnShape> => {
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
      width: widthRatio * 100,
      resizable: true,
      sortable: true,
    },
    {
      key: 'genre',
      dataKey: 'genre',
      title: 'Genre',
      width: widthRatio * 100,
      resizable: true,
      sortable: true,
    },
    {
      key: 'linkScore',
      dataKey: 'linkScore',
      title: 'Rating',
      width: widthRatio * 50,
      resizable: true,
      sortable: true,
    },
    {
      key: 'secondsLong',
      dataKey: 'secondsLong',
      title: 'Length',
      width: widthRatio * 75,
      resizable: true,
      sortable: true,
      cellRenderer: cellRenderComponent(LengthCell),
    },
    {
      key: 'title-action',
      dataKey: 'title',
      title: '',
      width: widthRatio * 100,
      cellRenderer: cellRenderComponent(ActionCell),
      resizable: true,
      sortable: false,
    },
  ];
};

export default searchResultColumns;
