import 'react-base-table/styles.css';

import React from 'react';

import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { usePlaylistState } from '../hooks/state/usePlaylistState';
import ResultsTableBody from './ResultsTable/ResultsTableBody';
import StyledTableContainer from './ResultsTable/styled';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

interface Props {
  loading?: boolean;
  incPage?: VoidFunction;
  page: number;
}

const ResultsTable = ({ loading = false, page, incPage }: Props) => {
  const {tracks: ids} = usePlaylistState('results');
  const [tracks, tracksLoading] = useCacheStitchedIdFetch(ids);

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
