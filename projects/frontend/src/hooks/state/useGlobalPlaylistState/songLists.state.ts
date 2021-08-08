import { makeVar } from '@apollo/client';

import { Playlist, PlaylistId } from '../usePlaylistsState/types';

type ListState = Record<PlaylistId, Playlist>;

export const reactiveSongLists = makeVar<ListState>({});
