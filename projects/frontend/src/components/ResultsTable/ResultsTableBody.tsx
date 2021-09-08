import * as r from 'ramda';
import React, { useContext, useEffect, useRef, useState } from 'react';
import BaseTable, {
  AutoResizer,
  BaseTableProps,
  TableComponents,
} from 'react-base-table';
import styled from 'styled-components';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { Maybe } from '../../types/utility/maybe';
import BaseTableStyleOverrides from '../BaseTableStyleOverrides/BaseTableStyleOverrides';
import { DndMonitorContext } from '../DragNDrop/store/context';
import { reactiveTableRowsVisible } from './resultsTable.state';
import overlayRenderer from './ResultsTableBody/overlayRenderer';
import rowRenderer from './ResultsTableBody/rowRenderer';
import searchResultColumns from './ResultsTableBody/searchResultColumns';
import { useSortState } from './state/sort.state';

const TableHeaderCell: TableComponents['TableHeaderCell'] = ({
  className,
  column: { title },
}) => {
  return <span className={className}>{title}</span>;
};

interface Props {
  incPage?: VoidFunction;
  tracks: Maybe<Array<PlaylistTrack>>;
  page: number;
  loading: boolean;
}

const ResultsTableBody = ({ tracks, incPage, page, loading }: Props) => {
  const {
    state: { dragMode },
  } = useContext(DndMonitorContext);
  const [loadedTracks, setLoadedTracks] = useState<Array<PlaylistTrack>>([]);
  const tableRef = React.createRef<BaseTable<unknown>>();
  const { sort, setSort } = useSortState();

  useEffect(() => {
    if (tracks) {
      setLoadedTracks(tracks);
    }
  }, [tracks]);

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

  const handleColumnSort: BaseTableProps['onColumnSort'] = ({ key, order }) => {
    if (sort[key.toString()] === 'desc') {
      setSort(r.omit([key.toString()], sort));
    } else {
      setSort({ ...sort, [key]: order });
    }
  };

  const loadingMore = page > 0 && loading;

  return (
    <Container>
      <AutoResizer>
        {({ width, height }) => {
          return (
            <BaseTableStyleOverrides dragging={!!dragMode}>
              <BaseTable
                onRowsRendered={({ startIndex, stopIndex }) =>
                  reactiveTableRowsVisible([startIndex, stopIndex])
                }
                ref={tableRef}
                fixed
                rowRenderer={rowRenderer}
                data={loadedTracks}
                width={width}
                height={height + 8} // this is hacky fixme
                onEndReached={handleLoadMore}
                onEndReachedThreshold={30}
                components={{ TableHeaderCell }}
                columns={searchResultColumns(width)}
                sortState={sort}
                onColumnSort={handleColumnSort}
                overlayRenderer={overlayRenderer(loading, loadingMore)}
                loadingMore={loadingMore}
              />
            </BaseTableStyleOverrides>
          );
        }}
      </AutoResizer>
    </Container>
  );
};

const Container = styled.div`
  width: calc(45vw + 220px);
  height: 100%;
`;

export default ResultsTableBody;
