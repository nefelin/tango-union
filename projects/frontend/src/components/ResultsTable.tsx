import 'react-base-table/styles.css';

import React, { useRef } from 'react';
import { useDebounce } from 'use-debounce';

import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { RESULTS_PLAYLIST_ID } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../hooks/state/usePlaylistState';
import { useFocusable } from '../hooks/useFocusable';
import ResultsTableBody from './ResultsTable/ResultsTableBody';
import StyledTableContainer from './ResultsTable/styled';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

interface Props {
  loading?: boolean;
  incPage?: VoidFunction;
  page: number;
  totalPages: number;
  totalResults: number;
}

const ResultsTable = ({ loading = false, page, incPage, totalResults, totalPages }: Props) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const {
    playlist: { tracks: playlistTracks },
  } = usePlaylistState(RESULTS_PLAYLIST_ID);
  const [tracks, tracksLoading] = useCacheStitchedIdFetch(playlistTracks);
  const [tableLoading] = useDebounce(loading || tracksLoading, 100);
  useFocusable(tableRef, RESULTS_PLAYLIST_ID);

  return (
    <StyledTableContainer ref={tableRef}>
      <PlaylistConfigContext.Provider value={{ name: RESULTS_PLAYLIST_ID }}>
        <ResultsTableBody
          tracks={tracks}
          incPage={incPage}
          page={page}
          totalPages={totalPages}
          totalResults={totalResults}
          loading={tableLoading}
        />
      </PlaylistConfigContext.Provider>
    </StyledTableContainer>
  );
};

export default ResultsTable;
