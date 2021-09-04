import { ApolloClient } from '@apollo/client';

import { TrackDetailFragmentFragmentDoc } from '../../generated/graphql';
import { PlaylistTrack} from '../hooks/state/usePlaylistsState/types';
import { CompactTrack } from '../types/CompactTrack';
import { Maybe } from '../types/utility/maybe';

const cachedTracksFromIds = (client: ApolloClient<unknown>, compactTracks: Array<CompactTrack>): Array<PlaylistTrack> =>
    compactTracks.map(({trackId, listId}): Maybe<PlaylistTrack> => {
      const found = client.readFragment({
        id: `SimpleTrack:${trackId}`,
        fragment: TrackDetailFragmentFragmentDoc,
      });

      if (!found) {
        return null;
      }

      return {
        ...found,
        listId,
      };
    }).filter(track => !!track) as Array<PlaylistTrack> ?? [];

export default cachedTracksFromIds;