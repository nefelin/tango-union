import { ColumnShape } from 'react-base-table';

import { LengthCell } from '../ResultsTable/ResultsTableBody/cellRenderers/lengthCell';
import { ListCell } from '../ResultsTable/ResultsTableBody/cellRenderers/listCell';
import PlayCell from '../ResultsTable/ResultsTableBody/cellRenderers/playCell';
import { cellRenderComponent } from '../ResultsTable/ResultsTableBody/cellRenderers/types';
import TrashHeader from './TrashHeader';

const playlistColumns: Array<ColumnShape> = [
  {
    key: 'play',
    dataKey: '',
    title: '',
    width:  53,
    cellRenderer: cellRenderComponent(PlayCell),
    sortable: false,
    style: { padding: '0 0 0 3px' },
    headerRenderer: TrashHeader
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

];

export default playlistColumns;
