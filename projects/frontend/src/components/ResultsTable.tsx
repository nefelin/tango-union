import 'react-base-table/styles.css';

import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import {
  useTrackDetailsBatchLazyQuery,
  useTrackDetailsBatchQuery,
} from '../../generated/graphql';
import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { RESULTS_PLAYLIST_ID } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';
import { usePlaylistState } from '../hooks/state/usePlaylistState';
import { useFocusable } from '../hooks/useFocusable';
import ResultsTableBody from './ResultsTable/ResultsTableBody';
import StyledTableContainer from './ResultsTable/styled';

interface Props {
  loading?: boolean;
  incPage?: VoidFunction;
  page: number;
  totalPages: number;
  totalResults: number;
}

const ResultsTable = ({
  loading = false,
  page,
  incPage,
  totalResults,
  totalPages,
}: Props) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const {
    playlist: { tracks: trackList },
  } = usePlaylistState(RESULTS_PLAYLIST_ID);

  const [playlistTracks, setPlaylistTracks] = useState<Array<PlaylistTrack>>(
    [],
  );

  const {
    data,
    loading: tracksLoading,
    error, // todo handle
  } = useTrackDetailsBatchQuery({
    variables: { ids: trackList.map(({ trackId }) => trackId) },
  });

  useEffect(() => {
    const hydrated =
      data?.tracksByIds &&
      trackList.map((compact) => {
        const detail = data.tracksByIds.find((d) => d.id === compact.trackId);
        if (!detail) {
          console.error(
            `looking for ${compact.trackId}, but ${data.tracksByIds} did not contain`,
          );
          throw new Error('hydrated track detail mismatch');
        }
        const playlistTrack: PlaylistTrack = { ...detail, ...compact };
        return playlistTrack;
      });

    if (hydrated) setPlaylistTracks(hydrated);
  }, [JSON.stringify(data), JSON.stringify(trackList)]);

  const [tableLoading] = useDebounce(loading || tracksLoading, 100);
  useFocusable(tableRef, RESULTS_PLAYLIST_ID);

  return (
    <StyledTableContainer ref={tableRef}>
      <PlaylistConfigContext.Provider value={{ name: RESULTS_PLAYLIST_ID }}>
        <ResultsTableBody
          tracks={playlistTracks}
          incPage={incPage}
          // incPage={() => fetchMore({variables: {off}})}
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
