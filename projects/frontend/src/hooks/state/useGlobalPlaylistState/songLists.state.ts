import { makeVar } from '@apollo/client';

import { Playlist } from '../usePlaylistsState/types';

type ListState = Record<string, Playlist>;

export const reactiveSongLists = makeVar<ListState>({});
