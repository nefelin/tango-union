import React from 'react';

import { asVh, layout } from '../../features/MobileDash/layout';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import PlaylistSummary from '../PlaylistSummary';
import { smartSummary } from '../PlaylistSummary/summarize';
import SongCardList from '../SongCardList/SongCardList';

interface Props {
  tracks: Array<PlaylistTrack>;
}

const ResponsivePlaylistBody = ({ tracks }: Props) => {
  const summary = smartSummary(tracks || []);
  return (
    <>
      <div
        className="p-3 bg-white w-[100vw] flex flex-col justify-center shadow-md"
        style={{
          height: asVh(layout.playlistHeader),
          position: 'fixed',
        }}
      >
        <PlaylistSummary summary={summary} />
      </div>
      <div
        style={{
          marginTop: asVh(layout.playlistHeader),
        }}
      >
        <SongCardList tracks={tracks} />
      </div>
    </>
  );
};

export default ResponsivePlaylistBody;
