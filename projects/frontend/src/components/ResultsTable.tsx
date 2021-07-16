import 'react-base-table/styles.css';

import React from 'react';

import { PlaylistConfigContext } from '../context/playlistConfig.context';
import ResultsTableBody from './ResultsTable/ResultsTableBody';
import StyledTableContainer from './ResultsTable/styled';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

interface Props {
  ids?: Array<string>;
  loading?: boolean;
  incPage?: VoidFunction;
  page: number;
}

const ResultsTable = ({ ids, loading = false, page, incPage }: Props) => {
  const [tracks, tracksLoading] = useCacheStitchedIdFetch(ids, false);

  const tableLoading = loading || tracksLoading;
  return (
    <StyledTableContainer>
      <PlaylistConfigContext.Provider value={{ name: 'search' }}>
        <ResultsTableBody
          tracks={tracks}
          incPage={incPage}
          page={page}
          loading={tableLoading}
        />
      </PlaylistConfigContext.Provider>
    </StyledTableContainer>
  );
};

export default ResultsTable;
