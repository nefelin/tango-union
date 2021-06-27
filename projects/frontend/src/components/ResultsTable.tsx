import 'react-base-table/styles.css';

import React from 'react';

import ResultsTableBody from './ResultsTable/ResultsTableBody';
import StyledTableContainer from './ResultsTable/styled';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

interface Props {
  ids?: Array<number>;
  loading?: boolean;
  incPage?: VoidFunction;
  page: number;
}

const ResultsTable = ({ ids, loading = false, page, incPage }: Props) => {
  const [tracks, tracksLoading] = useCacheStitchedIdFetch(ids, false);

  const tableLoading = loading || tracksLoading;
  return (
    <StyledTableContainer>
      <ResultsTableBody tracks={tracks} incPage={incPage} page={page} loading={tableLoading}/>
    </StyledTableContainer>
  );
};

export default ResultsTable;
