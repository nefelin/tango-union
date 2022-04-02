import React from 'react';

import { asVh, layout } from '../../features/MobileDash/layout';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import SongCardList from '../SongCardList/SongCardList';

interface Props {
  tracks: Array<PlaylistTrack>;
  trackTotal: number;
  page: number;
  pageTotal: number;
}

const ResponsiveResultList = ({ trackTotal, pageTotal, page, tracks }: Props) => {
  return (
    <>
        <div
          className="p-3 bg-white w-[100vw] flex flex-row items-center justify-center shadow-lg text-xs"
          style={{
            height: asVh(layout.resultsHeader),
            position: 'fixed',
          }}
        >
          {trackTotal} total results - Page {page} of {pageTotal} loaded
        </div>
      <div
        style={{
          marginTop: asVh(layout.resultsHeader),
        }}
      >
        <SongCardList tracks={tracks} />
      </div>
    </>
  );
};

export default ResponsiveResultList;
