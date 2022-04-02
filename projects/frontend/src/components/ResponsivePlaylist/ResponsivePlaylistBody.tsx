import { MenuItem, Slide } from '@mui/material';
import React, { useState } from 'react';

import { asVh, layout } from '../../features/MobileDash/layout';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { Maybe } from '../../types/utility/maybe';
import PlaylistSummary from '../PlaylistSummary';
import { smartSummary } from '../PlaylistSummary/summarize';
import SongCardList from '../SongCardList/SongCardList';

interface Props {
  tracks: Array<PlaylistTrack>;
  clearPlaylist: VoidFunction;
  // removeFromPlaylist: Unary<CompactTrack>
}

const ResponsivePlaylistBody = ({ tracks, clearPlaylist }: Props) => {
  const [moreId, setMoreId] = useState<Maybe<string>>(null);
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
          paddingTop: asVh(layout.playlistHeader),
          boxSizing: 'border-box',
        }}
      >
        <SongCardList tracks={tracks} onMore={(id) => setMoreId(id)} />
      </div>
      <Slide unmountOnExit mountOnEnter in={!!moreId} direction="up">
        <div className="bg-white w-full h-full backdrop-blur-md absolute top-0">
          <MenuItem onClick={() => {
            clearPlaylist();
            setMoreId(null);
          }}>Clear playlist</MenuItem>
          <MenuItem disabled>Remove from playlist</MenuItem>
          <MenuItem disabled>Share playlist</MenuItem>
          <MenuItem disabled>Share song</MenuItem>
          <MenuItem disabled>Search similar</MenuItem>
          <MenuItem onClick={() => setMoreId(null)}>Close</MenuItem>
        </div>
      </Slide>
    </>
  );
};

export default ResponsivePlaylistBody;
