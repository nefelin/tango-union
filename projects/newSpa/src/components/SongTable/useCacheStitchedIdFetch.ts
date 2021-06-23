import { useApolloClient } from '@apollo/client';

import {
  TrackDetailFragmentFragmentDoc,
  useTrackDetailsBatchQuery,
} from '../../../generated/graphql';

const useCacheStitchedIdFetch = (ids?: Array<number>) => {
  const client = useApolloClient();

  const fetchIds =
    ids?.filter(
      (id) =>
        client.readFragment({
          id: `SimpleTrack:${id}`,
          fragment: TrackDetailFragmentFragmentDoc,
        }) === null,
    ) ?? [];

  useTrackDetailsBatchQuery({
    variables: { ids: fetchIds },
    skip: fetchIds.length === 0,
  });

  const tracks =
    ids?.map(
      (id) =>
        client.readFragment({
          id: `SimpleTrack:${id}`,
          fragment: TrackDetailFragmentFragmentDoc,
        }) ?? null,
    ) ?? [];

  return tracks;
};

export default useCacheStitchedIdFetch;