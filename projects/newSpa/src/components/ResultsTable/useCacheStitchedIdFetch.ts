import { useApolloClient } from '@apollo/client';

import type {
  SimpleTrack} from '../../../generated/graphql';
import {
  TrackDetailFragmentFragmentDoc,
  useTrackDetailsBatchQuery,
} from '../../../generated/graphql';

// fixme would be nice to cut down on re-render
const useCacheStitchedIdFetch = (
  ids?: Array<number>,
  exposeNullRows = false,
): [Array<SimpleTrack>, boolean] => {
  const client = useApolloClient();

  const fetchIds =
    ids?.filter(
      (id) =>
        client.readFragment({
          id: `SimpleTrack:${id}`,
          fragment: TrackDetailFragmentFragmentDoc,
        }) === null,
    ) ?? [];

  const { loading } = useTrackDetailsBatchQuery({
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

  if (exposeNullRows) {
    return [tracks, loading];
  }
  return [tracks.indexOf(null) === -1 ? tracks : [], loading];
};

export default useCacheStitchedIdFetch;
