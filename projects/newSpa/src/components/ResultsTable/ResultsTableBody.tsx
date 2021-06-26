import { useReactiveVar } from '@apollo/client';
import * as r from 'ramda';
import React, { useEffect } from 'react';
import BaseTable, {
  AutoResizer,
  BaseTableProps,
  TableComponents,
} from 'react-base-table';
import styled from 'styled-components';

import { SimpleTrack } from '../../../generated/graphql';
import reactiveSearchbarState, {
  sortSearch,
} from '../Searchbar/searchbar.state';
import {
  reactiveTableResults,
  reactiveTableRowsVisible,
} from './resultsTable.state';
import overlayRenderer from './ResultsTableBody/overlayRenderer';
import rowRenderer from './ResultsTableBody/rowRenderer';
import searchResultColumns from './ResultsTableBody/searchResultColumns';

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
  };

  const youtubeSearch = () => {};

  const handleColumnSort: BaseTableProps['onColumnSort'] = ({ key, order }) => {
    if (sort[key.toString()] === 'desc') {
      sortSearch(r.omit([key.toString()], reactiveSearchbarState().sort));
    } else {
      sortSearch({ ...reactiveSearchbarState().sort, [key]: order });
    }
  };

  const loadingMore = page > 0 && loading;

  return (
    <Container>
      <AutoResizer>
        {({ width, height }) => {
          return (
            <BaseTable
              onRowsRendered={({ startIndex, stopIndex }) =>
                reactiveTableRowsVisible([startIndex, stopIndex])
              }
              ref={tableRef}
              fixed
              rowRenderer={rowRenderer}
              data={loadedTracks}
              width={width}
              height={600}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={30}
              components={{ TableHeaderCell }}
              columns={searchResultColumns(width)}
              sortState={sort}
              onColumnSort={handleColumnSort}
              overlayRenderer={overlayRenderer(loading, loadingMore)}
              loadingMore={loadingMore}
            />
          );
        }}
      </AutoResizer>
    </Container>
  );
};

const Container = styled.div`
  width: calc(50vw + 220px);
  height: 50vh;
`;

export default ResultsTableBody;
