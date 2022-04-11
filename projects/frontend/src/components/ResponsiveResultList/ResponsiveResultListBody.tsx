import React from 'react';
import { useThrottledCallback } from 'use-debounce';

import { layout } from '../../features/MobileDash/layout';
import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import useEnsureValue from '../../hooks/useEnsureValue';
import useViewport from '../../hooks/useViewport';
import { CompactTrack } from '../../types/compactTrack/types';
import { Maybe } from '../../types/utility/maybe';
import { Loader } from '../ResultsTable/ResultsTableBody/overlayRenderer/styled';
import SongCardList from '../SongCardList/SongCardList';

export interface ResponsiveResultListProps {
  tracks: Maybe<Array<PlaylistTrack>>;
  trackTotal: number;
  page: number;
  loading: boolean;
  pageTotal: number;
  onScrollEnd: VoidFunction;
}

const ResponsiveResultListBody = ({
  onScrollEnd,
  loading,
  trackTotal,
  pageTotal,
  page,
  tracks,
}: ResponsiveResultListProps) => {
  const {asVh} = useViewport()
  const throttledScrollHandler = useThrottledCallback(onScrollEnd, 1500, {leading: true, trailing: false})
  const onScroll = (e) => {
    const endScrollBuffer = 0;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - endScrollBuffer) {
      throttledScrollHandler();
    }
  };

  const handleMore = (track: CompactTrack) => reactiveMoreState({track, songSource: 'results'});
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
    </>
  );
};

export default ResponsiveResultListBody;
