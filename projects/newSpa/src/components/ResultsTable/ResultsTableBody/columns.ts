import type { ColumnShape } from 'react-base-table';

import { ActionCell } from './cellRenderers/actionCell';
import { LengthCell } from './cellRenderers/lengthCell';
import { ListCell } from './cellRenderers/listCell';
import PlayCell from './cellRenderers/playCell';
import playHeaderRenderer from './cellRenderers/playHeader';
import { cellRenderComponent } from './cellRenderers/types';

const columns: (s: any) => Array<ColumnShape> = (youtubeSearch: any) => [
  {
    headerRenderer: playHeaderRenderer,
    key: 'play',
    dataKey: 'title',
    title: '',
    width: 50,
    cellRenderer: cellRenderComponent(PlayCell),
    sortable: false,
  },
  {
    key: 'title',
    dataKey: 'title',
    title: 'Title',
    width: 250,
    resizable: true,
    sortable: true,
  },
  {
    key: 'orchestra',
    dataKey: 'orchestra',
    title: 'Orchestra',
    width: 200,
    resizable: true,
    sortable: true,
    cellRenderer: cellRenderComponent(ListCell),
  },
  {
    key: 'singer',
    dataKey: 'singer',
    title: 'Singer',
    width: 200,
    resizable: true,
    sortable: true,
    cellRenderer: cellRenderComponent(ListCell),
  },
  {
    key: 'year',
    dataKey: 'year',
    title: 'Year',
    width: 100,
    resizable: true,
    sortable: true,
  },
  {
    key: 'genre',
    dataKey: 'genre',
    title: 'Genre',
    width: 100,
    resizable: true,
    sortable: true,
  },
  {
    key: 'secondsLong',
    dataKey: 'secondsLong',
    title: 'Length',
    width: 75,
    resizable: true,
    sortable: true,
    cellRenderer: cellRenderComponent(LengthCell),
  },
  {
    key: 'title-action',
    dataKey: 'title',
    title: '',
    width: 100,
    cellRenderer: cellRenderComponent(ActionCell),
    resizable: true,
    sortable: false,
  },
];

export default columns;
