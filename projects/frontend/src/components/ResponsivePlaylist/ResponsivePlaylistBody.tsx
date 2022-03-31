import React from 'react';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import { compactTrackFromTrackId } from '../../types/compactTrack/util';
import PlaylistSummary from '../PlaylistSummary';
import { smartSummary } from '../PlaylistSummary/summarize';
import { SongCard } from '../SongCard';
import YoutubePlayer from '../YoutubePlayer';

interface Props {
  tracks: Array<PlaylistTrack>;
}

const ResponsivePlaylistBody = ({ tracks }: Props) => {
  const {
    play,
    pause,
    currentTrack,
    youtubePlayerState: { playState },
  } = useYoutubePlayerState();

  const summary = smartSummary(tracks || []);
  return (
    <>
      {summary && (
        <div className="p-2">
          <PlaylistSummary summary={summary} />
        </div>
      )}
      {tracks?.map((track) => {
        const trackIsActive = currentTrack?.trackId === track.id;
        return (
          <SongCard
            key={track.listId}
            active={trackIsActive}
            playing={playState === 'playing' || playState === 'loading'}
            track={track}
            onPlay={() =>
              !trackIsActive || playState === 'stopped'
                ? play(compactTrackFromTrackId(track.id)) // TODO types are breaking somewhere, this is supposed to be a compactTrack already
                : pause()
            }
            onMore={() => {}}
          />
        );
      })}
      <YoutubePlayer width="100%" />
    </>
  );
};

export default ResponsivePlaylistBody;
