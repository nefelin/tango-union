import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteLoader } from 'react-virtualized';

import { asVh, layout } from '../../features/MobileDash/layout';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import useEnsureValue from '../../hooks/useEnsureValue';
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
  const onScroll = (e) => {
    const endScrollBuffer = 0;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - endScrollBuffer) {
      onScrollEnd();
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
        <SongCardList tracks={ensuredTracks} />
        {loading && <div className="flex flex-row w-full justify-center absolute p-6 bottom-0"><Loader /></div>}
      </div>
    </>
  );
};

export default ResponsiveResultListBody;
