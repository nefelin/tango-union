import * as r from 'ramda';
import React, { useEffect, useState } from 'react';
import type { BaseTableProps, TableComponents } from 'react-base-table';
import BaseTable from 'react-base-table';

import type { SimpleTrack } from '../../../generated/graphql';
import overlayRenderer from './renderers/overlayRenderer';
import StyledTableContainer from './styled';
import columns from './util';

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
  const [loadedTracks, setLoadedTracks] = useState<Array<SimpleTrack>>([]);
  const tableRef = React.createRef<BaseTable<unknown>>();
  const [sort, setSort] = useState<Record<string, 'asc' | 'desc'>>(
    {},
  );

  useEffect(() => {
    if (tracks.length) {
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
    setSort({});
  };

  const youtubeSearch = () => {
    console.log('youtube');
  };

  const handleColumnSort: BaseTableProps['onColumnSort'] = ({ key, order }) => {
    if (sort[key] === 'desc') {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      setSort(r.omit([key as string]));
    } else {
      setSort((prev) => ({ ...prev, [key]: order }));
    }
  };

  const loadingMore = page > 0 && loading;

  return (
    <StyledTableContainer>
      <BaseTable
        ref={tableRef}
        fixed
        data={loadedTracks}
        width={1100}
        height={600}
        onEndReached={() => {
          incPage?.();
        }}
        onEndReachedThreshold={30}
        components={{ TableHeaderCell }}
        columns={columns(youtubeSearch)}
        sortState={sort}
        onColumnSort={handleColumnSort}
        overlayRenderer={overlayRenderer(loading, loadingMore)}
        loadingMore={loadingMore}
      />
    </StyledTableContainer>
  );
};

export default ResultsTableBody;
