import type { ColumnShape } from 'react-base-table';

// import { ActionCell } from './cellRenderers/actionCell';
// import { LengthCell } from './cellRenderers/lengthCell';
// import { ListCell } from './cellRenderers/listCell';
// import PlayCell from './cellRenderers/playCell';
// import playHeaderRenderer from './cellRenderers/playHeader';
// import { cellRenderComponent } from './cellRenderers/types';

const playlistColumns: Array<ColumnShape> =  [
  {
    key: 'title',
    dataKey: 'title',
    title: 'Title',
    width: 250,
    resizable: true,
  },
  {
    key: 'orchestra',
    dataKey: 'orchestra',
    title: 'Orchestra',
    width: 200,
    resizable: true,
    // cellRenderer: cellRenderComponent(ListCell),
  },
  {
    key: 'singer',
    dataKey: 'singer',
    title: 'Singer',
    width: 200,
    resizable: true,
    // cellRenderer: cellRenderComponent(ListCell),
  },
  {
    key: 'year',
    dataKey: 'year',
    title: 'Year',
    width: 100,
    resizable: true,
  },
  {
    key: 'genre',
    dataKey: 'genre',
    title: 'Genre',
    width: 100,
    resizable: true,
  },
];

export default playlistColumns;
