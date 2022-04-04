import { MenuItem, Slide } from '@mui/material';
import React, { useState } from 'react';
import { useThrottledCallback } from 'use-debounce';

import { asVh, layout } from '../../features/MobileDash/layout';
import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import useEnsureValue from '../../hooks/useEnsureValue';
import { CompactTrack } from '../../types/compactTrack/types';
import { compactTrackFromTrackId } from '../../types/compactTrack/util';
import { Maybe } from '../../types/utility/maybe';
import { Unary } from '../../types/utility/unary';
import { Loader } from '../ResultsTable/ResultsTableBody/overlayRenderer/styled';
import SongCardList from '../SongCardList/SongCardList';

export interface ResponsiveResultListProps {
  tracks: Maybe<Array<PlaylistTrack>>;
  trackTotal: number;
  page: number;
  loading: boolean;
  pageTotal: number;
  onScrollEnd: VoidFunction;
  addPlaylistTrack: Unary<Array<string>>;
}

const ResponsiveResultListBody = ({
  onScrollEnd,
  loading,
  trackTotal,
  pageTotal,
  page,
  tracks,
  addPlaylistTrack,
}: ResponsiveResultListProps) => {
  const [moreId, setMoreId] = useState<Maybe<string>>();
  const throttledScrollHandler = useThrottledCallback(onScrollEnd, 1500, {leading: true, trailing: false})
  const onScroll = (e) => {
    const endScrollBuffer = 0;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - endScrollBuffer) {
      throttledScrollHandler();
    }
  };

  const handleMore = (track: CompactTrack) => reactiveMoreState({track, songSource: 'results'});
  const handleAddToPlaylist = () => {
    if (moreId) {
      addPlaylistTrack([moreId]);
      setMoreId(null);
    }
  };

  const ensuredTracks = useEnsureValue(tracks, []);

  return (
    <>
      <div
        className="p-3 bg-white w-[100vw] flex flex-row items-center justify-center shadow-md text-xs font-bold"
        style={{
          height: asVh(layout.resultsHeader),
          position: 'fixed',
        }}
      >
        {trackTotal} total results - Page {page} of {pageTotal} loaded
      </div>
      <div
        onScroll={onScroll}
        style={{
          paddingTop: asVh(layout.resultsHeader),
          boxSizing: 'border-box',
          overflowY: 'scroll',
          height: '100%',
        }}
      >
        <SongCardList tracks={ensuredTracks} onMore={handleMore} />
        {loading && (
          <div className="flex flex-row w-full h-full justify-center items-center absolute p-6 bottom-0">
            <div className="h-full w-full bg-white opacity-70 absolute top-0" />
            <Loader />
          </div>
        )}
      </div>
      <Slide unmountOnExit mountOnEnter in={!!moreId} direction="up">
        <div className="bg-white w-full h-full backdrop-blur-md absolute top-0">
          <MenuItem onClick={handleAddToPlaylist}>Add to playlist</MenuItem>
          <MenuItem disabled>Share Search</MenuItem>
          <MenuItem disabled>Share Song</MenuItem>
          <MenuItem disabled>Search similar</MenuItem>
          <MenuItem disabled>Sort results...</MenuItem>
          <MenuItem onClick={() => setMoreId(null)}>Close</MenuItem>
        </div>
      </Slide>
    </>
  );
};

export default ResponsiveResultListBody;
