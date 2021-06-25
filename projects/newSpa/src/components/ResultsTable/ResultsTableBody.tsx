import { useReactiveVar } from '@apollo/client';
import * as r from 'ramda';
import React, { useEffect } from 'react';
import type { BaseTableProps, TableComponents } from 'react-base-table';
import BaseTable from 'react-base-table';

import type { SimpleTrack } from '../../../generated/graphql';
import reactiveSearchbarState, { sortSearch } from '../Searchbar/searchbar.state';
import { reactiveTableResults } from './resultsTable.state';
import columns from './ResultsTableBody/columns';
import overlayRenderer from './ResultsTableBody/overlayRenderer';

const TableHeaderCell: TableComponents['TableHeaderCell'] = ({
  className,
  column: { title },
}) => {
  return <span className={className}>{title}</span>;
};

interface Props {
  incPage?: VoidFunction;
  tracks: Array<SimpleTrack>;
  page: number;
  loading: boolean;
}

const ResultsTableBody = ({ tracks, incPage, page, loading }: Props) => {
 const loadedTracks = useReactiveVar(reactiveTableResults);
  const tableRef = React.createRef<BaseTable<unknown>>();
  const { sort } = useReactiveVar(reactiveSearchbarState);

  useEffect(() => {
    if (!loading) {
      reactiveTableResults(tracks);
    }
  }, [tracks, loading]);

  useEffect(() => {
    if (page === 0) {
      handleTableReset();
    }
  }, [page]);

  const handleTableReset = () => {
    tableRef.current?.scrollToRow(0, 'auto');
  };

  const handleLoadMore = () => {
    incPage?.();
  }

  const youtubeSearch = () => {
  };

  const handleColumnSort: BaseTableProps['onColumnSort'] = ({ key, order }) => {
    if (sort[key.toString()] === 'desc') {
      sortSearch(r.omit([key.toString()], reactiveSearchbarState().sort));
    } else {
      sortSearch({ ...reactiveSearchbarState().sort, [key]: order });
    }
  };

  const loadingMore = page > 0 && loading;

  return (
      <BaseTable
        ref={tableRef}
        fixed
        data={loadedTracks}
        width={1100}
        height={600}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={30}
        components={{ TableHeaderCell }}
        columns={columns(youtubeSearch)}
        sortState={sort}
        onColumnSort={handleColumnSort}
        overlayRenderer={overlayRenderer(loading, loadingMore)}
        loadingMore={loadingMore}
      />
  );
};

export default ResultsTableBody;
