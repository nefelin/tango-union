import { ColumnShape } from 'react-base-table';

import { LengthCell } from '../ResultsTable/ResultsTableBody/cellRenderers/lengthCell';
import { ListCell } from '../ResultsTable/ResultsTableBody/cellRenderers/listCell';
import { cellRenderComponent } from '../ResultsTable/ResultsTableBody/cellRenderers/types';

const playlistColumns: Array<ColumnShape> = [
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
    cellRenderer: cellRenderComponent(ListCell),
  },
  {
    key: 'singer',
    dataKey: 'singer',
    title: 'Singer',
    width: 200,
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
];

export default playlistColumns;
