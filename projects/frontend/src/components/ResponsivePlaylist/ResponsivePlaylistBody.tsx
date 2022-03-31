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

  console.log({currentTrack})
  const summary = smartSummary(tracks || []);
  return (
    <>
      {summary && (
        <div className="p-2">
          <PlaylistSummary summary={summary} />
        </div>
      )}
      <div>
        <div className="overflow-y-scroll max-h-[80%]">
          {tracks?.map((track) => {
            const trackIsActive = currentTrack?.listId === track.listId;
            return (
              <SongCard
                key={track.listId}
                active={trackIsActive}
                playing={playState === 'playing' || playState === 'loading'}
                track={track}
                onPlay={() =>
                  !trackIsActive || playState === 'stopped'
                    ? play(track)
                    : pause()
                }
                onMore={() => {}}
              />
            );
          })}
        </div>
        <YoutubePlayer width="100%" height="20%" />
      </div>
    </>
  );
};

export default ResponsivePlaylistBody;
