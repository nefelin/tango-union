import React from 'react';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import PlaylistSummary from '../PlaylistSummary';
import { smartSummary } from '../PlaylistSummary/summarize';
import { SongCard } from '../SongCard';
import YoutubePlayer from '../YoutubePlayer';
import SongCardList from './SongCardList';

interface Props {
  tracks: Array<PlaylistTrack>;
}

const ResponsivePlaylistBody = ({ tracks }: Props) => {
  const summary = smartSummary(tracks || []);
  return (
    <>
      {summary && (
        <div className="p-2">
          <PlaylistSummary summary={summary} />
        </div>
      )}
      <SongCardList tracks={tracks}/>
    </>
  );
};

export default ResponsivePlaylistBody;
