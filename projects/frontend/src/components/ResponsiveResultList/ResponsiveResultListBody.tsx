import React, { useEffect } from 'react';

import { asVh, layout } from '../../features/MobileDash/layout';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import SongCardList from '../SongCardList/SongCardList';

export interface ResponsiveResultListProps {
  tracks: Array<PlaylistTrack>;
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
    const endScrollBuffer = 50;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - endScrollBuffer) {
      onScrollEnd()
    }
  };

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
        <SongCardList tracks={tracks} />
      </div>
      {loading && `LOADING`}
    </>
  );
};

export default ResponsiveResultListBody;
