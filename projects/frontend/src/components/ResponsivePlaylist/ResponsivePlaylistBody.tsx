import { MenuItem, Slide } from '@mui/material';
import React, { useState } from 'react';

import { asVh, layout } from '../../features/MobileDash/layout';
import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { Maybe } from '../../types/utility/maybe';
import { useIsMobile } from '../../util/isMobile';
import PlaylistSummary from '../PlaylistSummary';
import { smartSummary } from '../PlaylistSummary/summarize';
import SongCardList from '../SongCardList/SongCardList';
import EmptyState from './EmptyState';

interface Props {
  tracks: Array<PlaylistTrack>;
  simpleCards?: boolean;
}

const ResponsivePlaylistBody = ({ simpleCards, tracks }: Props) => {
  const isMobile = useIsMobile();
  const summary = smartSummary(tracks || []);
  return tracks.length ? (
    <>
      <div
        className="p-3 bg-white w-full flex flex-col justify-center shadow-md"
        style={{
          height: asVh(layout.playlistHeader),
          position: isMobile ? 'fixed' : 'inherit',
        }}
      >
        <PlaylistSummary summary={summary} />
      </div>
      <div
        style={{
          paddingTop: isMobile ? asVh(layout.playlistHeader) : 0,
          boxSizing: 'border-box',
        }}
      >
        <SongCardList
          simpleCards={simpleCards}
          tracks={tracks}
          onMore={(track) =>
            reactiveMoreState({ track, songSource: 'playlist' })
          }
        />
      </div>
    </>
  ) : (
    <EmptyState />
  );
};

export default ResponsivePlaylistBody;
