import 'react-base-table/styles.css';

import React, { useState } from 'react';
import styled from 'styled-components';

import ResultsTableBody from './ResultsTable/ResultsTableBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

interface Props {
  ids?: Array<number>;
  loading?: boolean;
}

const ResultsTable = ({ ids, loading = false }: Props) => {
  const [tracks, tracksLoading] = useCacheStitchedIdFetch(ids, false);
  console.log({ tracks, loading });

  const tableLoading = loading || tracksLoading;
  return (
    <div style={{ position: 'relative' }}>
      {tableLoading && <StyledLoadingOverlay />}
      <ResultsTableBody tracks={tracks} />
    </div>
  );
};

const StyledLoadingOverlay = styled.div`
  background-color: white;
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default ResultsTable;
