import { ApolloClient } from '@apollo/client';

import { TrackDetailFragmentFragmentDoc } from '../../generated/graphql';
import { PlaylistTrack, TrackIdTuple } from '../hooks/state/usePlaylistsState/types';
import { Maybe } from '../types/utility/maybe';

const cachedTracksFromIds = (client: ApolloClient<unknown>, ids: Array<TrackIdTuple>): Array<PlaylistTrack> =>
    ids.map(([id, localSongId]): Maybe<PlaylistTrack> => {
      const found = client.readFragment({
        id: `SimpleTrack:${id}`,
        fragment: TrackDetailFragmentFragmentDoc,
      });

      if (!found) {
        return null;
      }

      return {
        ...found,
        localSongId,
      };
    }).filter(track => !!track) as Array<PlaylistTrack> ?? [];

export default cachedTracksFromIds;