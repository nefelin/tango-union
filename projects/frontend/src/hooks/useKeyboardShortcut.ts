import { useContext, useEffect } from 'react';

import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { reactiveSongLists } from './state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from './state/usePlaylistState';
import { useSelectionState } from './state/useSelectionState';
import { FocusContext } from './useFocusable';

export const useDeleteShortcut = () => {
  const {focused} = useContext(FocusContext);
  const {name: playlistId} = useContext(PlaylistConfigContext)
  const {removeSelected} = useSelectionState()
  const {removeTracks} = usePlaylistState(playlistId)

  const handleKeyDown = (e: KeyboardEvent) => {
    const {key} = e;
    const selection = reactiveSongLists()[focused || '']?.selection || new Set()
    if (['Delete', 'Backspace'].includes(key) && focused && selection.size ) {
      removeTracks(...selection)
      removeSelected(...selection)
      e.preventDefault();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
}

export const useSelectAllShortcut = () => {
  const {focused} = useContext(FocusContext);
  const { addSelected} = useSelectionState()

  const handleKeyDown = (e: KeyboardEvent) => {
    const {key, metaKey} = e;
    if (key === 'a' && metaKey && focused) {
      const trackIds = reactiveSongLists()[focused || '']?.tracks.map(({listId}) => listId) ?? []
      addSelected(...trackIds)
      e.preventDefault()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
}
