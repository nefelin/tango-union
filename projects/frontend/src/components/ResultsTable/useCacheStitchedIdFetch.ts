import { useApolloClient } from '@apollo/client';

import {
  SimpleTrack,
  TrackDetailFragmentFragmentDoc,
  useTrackDetailsBatchQuery,
} from '../../../generated/graphql';
import {
  PlaylistTrack,
  TrackIdTuple,
} from '../../hooks/state/usePlaylistsState/types';
import { Maybe } from '../../types/utility/maybe';

// fixme would be nice to cut down on re-render
const useCacheStitchedIdFetch = (
  ids?: Array<TrackIdTuple>,
): [Array<PlaylistTrack>, boolean] => {
  const client = useApolloClient();

  const fetchIds =
    ids?.filter(
      ([id]) =>
        client.readFragment({
          id: `SimpleTrack:${id}`,
          fragment: TrackDetailFragmentFragmentDoc,
        }) === null,
    ) ?? [];

  const { loading } = useTrackDetailsBatchQuery({
    variables: { ids: fetchIds.map(([id]) => id) },
    skip: fetchIds.length === 0,
  });

  const tracks =
    ids?.map(([id, localSongId]): Maybe<PlaylistTrack> => {
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
    }) ?? [];

  return [
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    tracks.indexOf(null) === -1 ? (tracks as Array<PlaylistTrack>) : [],
    loading,
  ];
};

export default useCacheStitchedIdFetch;
