import { makeVar, useReactiveVar } from '@apollo/client';

import { CompactTrack, compressTrack } from '../../types/CompactTrack';
import { PlaylistTrack } from './usePlaylistsState/types';
import {
  HookProps,
  TrackStatus,
  YoutubePlayerState,
} from './useYoutubePlayerState/types';

const initYoutubePlayerState: YoutubePlayerState = {
  activeTrack: null,
  playState: 'stopped',
};

const reactiveYoutubePlayerState = makeVar(initYoutubePlayerState);

export const useYoutubePlayerState = (): HookProps => {
  const youtubePlayerState = useReactiveVar(reactiveYoutubePlayerState);

  const stop = () =>
    reactiveYoutubePlayerState({
      ...reactiveYoutubePlayerState(),
      playState: 'stopped',
    });

  const pause = () =>
    reactiveYoutubePlayerState({
      ...reactiveYoutubePlayerState(),
      playState: 'stopped',
    });

  const resume = () =>
    reactiveYoutubePlayerState({
      ...reactiveYoutubePlayerState(),
      playState: 'playing',
    });

  const play = (compactTrack: CompactTrack) => {
    const currentState = reactiveYoutubePlayerState();
    const newTrack = compactTrack.listId !== currentState.activeTrack?.listId;
    const playState = newTrack ? 'loading' : 'playing';

    reactiveYoutubePlayerState({
      ...currentState,
      playState,
      activeTrack: compactTrack,
    });
  };

  const trackStatus = (track: PlaylistTrack): TrackStatus => {
    const compactTrack = compressTrack(track);
    const { activeTrack, playState } = youtubePlayerState;
    let active = false;
    let playing = false;

    if (activeTrack && compactTrack.listId === activeTrack.listId) {
      active = true;
      if (playState === 'playing') {
        playing = true;
      }
    }

    return {
      active,
      playing,
    };
  };

  return {
    youtubePlayerState,
    currentTrack: youtubePlayerState.activeTrack,
    trackStatus,
    resume,
    pause,
    play,
    stop,
  };
};
