import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';

import { PlayingContext } from './useGlobalPlaylistState/PlayingContext.type';
import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';
import { createContext } from './useGlobalPlaylistState/util';
import { useYoutubePlayerState } from './useYoutubePlayerState';

const initContext: PlayingContext = {};

export const useGlobalPlaylistsState = () => {
  const lists = useReactiveVar(reactiveSongLists);
  const { currentTrack } = useYoutubePlayerState();
  const [context, setContext] = useState<PlayingContext>(initContext);

  useEffect(() => {
    if (!currentTrack) {
      setContext(initContext);
      return;
    }

    Object.values(lists).some((playlist) => {
      const index = playlist.tracks.findIndex(
        ({listId}) => currentTrack.listId === listId
      );
      if (index !== -1) {
        setContext(createContext(playlist, index));
        return true;
      }
      return false;
    });
  }, [currentTrack]);

  return {
    context,
  };
};
