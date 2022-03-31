import React from 'react';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import { SongCard } from '../SongCard';

const SongCardList = ({ tracks }: { tracks: Array<PlaylistTrack> }) => {
  const {
    play,
    pause,
    currentTrack,
    youtubePlayerState: { playState },
  } = useYoutubePlayerState();

  return (
    <div className="">
      {tracks?.map((track) => {
        const trackIsActive = currentTrack?.listId === track.listId;
        return (
          <SongCard
            key={track.listId}
            active={trackIsActive}
            playing={playState === 'playing' || playState === 'loading'}
            track={track}
            onPlay={() =>
              !trackIsActive || playState === 'stopped' ? play(track) : pause()
            }
            onMore={() => {}}
          />
        );
      })}
    </div>
  );
};

export default SongCardList;
