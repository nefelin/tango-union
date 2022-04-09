import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';

import { PlayingContext } from './useGlobalPlaylistState/PlayingContext.type';
import {
  reactiveSongLists,
  RESULTS_PLAYLIST_ID,
} from './useGlobalPlaylistState/songLists.state';
import { createContext } from './useGlobalPlaylistState/util';
import { usePlaylistState } from './usePlaylistState';
import { useYoutubePlayerState } from './useYoutubePlayerState';

const initContext: PlayingContext = {};

export const useGlobalPlaylistsState = () => {
  const lists = useReactiveVar(reactiveSongLists);
  const { currentTrack } = useYoutubePlayerState();
  const [context, setContext] = useState<PlayingContext>(initContext);
  const { playlist: resultsList } = usePlaylistState(RESULTS_PLAYLIST_ID);

  useEffect(() => {
    if (!currentTrack) {
      setContext(initContext);
      return;
    }

    let trackExistsInList = false;
    Object.values(lists).some((playlist) => {
      const index = playlist.tracks.findIndex(
        ({ listId }) => currentTrack.listId === listId,
      );
      if (index !== -1) {
        setContext(createContext(playlist, index));
        trackExistsInList = true;
        return true;
      }
      return false;
    });

    if (!trackExistsInList) {
      const fallbackContext: PlayingContext = {
        ...createContext(resultsList, -1),
        currentTrack,
      };
      setContext(fallbackContext);
    }
  }, [currentTrack, resultsList]);

  return {
    context,
  };
};
