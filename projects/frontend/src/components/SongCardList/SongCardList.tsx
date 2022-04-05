import React from 'react';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import { CompactTrack } from '../../types/compactTrack/types';
import { Unary } from '../../types/utility/unary';
import { SongCard } from '../SongCard';

interface Props {
  tracks: Array<PlaylistTrack>;
  onMore: Unary<CompactTrack>;
  simpleCards?: boolean;
  sortable?: boolean;
}
const SongCardList = ({ sortable, simpleCards, tracks, onMore }: Props) => {
  const {
    play,
    pause,
    currentTrack,
    youtubePlayerState: { playState },
  } = useYoutubePlayerState();

  return (
    <>
      {tracks?.map((track) => {
        const trackIsActive = currentTrack?.listId === track.listId;
        return (
          <SongCard
            simpleCards={simpleCards}
            sortable={sortable}
            key={track.listId}
            active={trackIsActive}
            playing={playState === 'playing' || playState === 'loading'}
            track={track}
            onPlay={() =>
              !trackIsActive || playState === 'stopped' ? play(track) : pause()
            }
            onMore={onMore}
          />
        );
      })}
    </>
  );
};

export default SongCardList;
