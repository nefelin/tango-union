import { useApolloClient } from '@apollo/client';

import {
  TrackDetailFragmentFragmentDoc,
  useTrackDetailsBatchQuery,
} from '../../../generated/graphql';
import {
  PlaylistTrack,
} from '../../hooks/state/usePlaylistsState/types';
import { CompactTrack } from '../../types/compactTrack/types';
import { Maybe } from '../../types/utility/maybe';

// fixme would be nice to cut down on re-render
const useCacheStitchedIdFetch = (
  ids?: Array<CompactTrack>,
): [Maybe<Array<PlaylistTrack>>, boolean] => {
  const client = useApolloClient();

  const fetchIds =
    ids?.filter(
      ({trackId}) =>
        client.readFragment({
          id: `SimpleTrack:${trackId}`,
          fragment: TrackDetailFragmentFragmentDoc,
        }) === null,
    ) ?? [];

  const { loading } = useTrackDetailsBatchQuery({
    variables: { ids: fetchIds.map(({trackId}) => trackId) },
    skip: fetchIds.length === 0,
  });

  const tracks =
    ids?.map(({trackId, listId}): Maybe<PlaylistTrack> => {
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
    }) ?? [];
  return [
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    tracks.indexOf(null) === -1 ? (tracks as Array<PlaylistTrack>) : null,
    loading,
  ];
};

export default useCacheStitchedIdFetch;
