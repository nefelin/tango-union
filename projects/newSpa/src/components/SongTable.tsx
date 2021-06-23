import { useApolloClient } from '@apollo/client';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useEffect, useState } from 'react';

import type { SimpleTrack } from '../../generated/graphql';

import {
  TrackDetailFragmentFragmentDoc,
  useTrackDetailsBatchQuery,
  useTrackDetailsQuery,
} from '../../generated/graphql';

interface Props {
  ids?: Array<number>;
}

const SongTable = ({ ids }: Props) => {
  // const [tracks, setTracks] = useState<Array<SimpleTrack>>([]);
  const client = useApolloClient();

  const fetchIds =
    ids?.filter(
      (id) =>
        client.readFragment({
          id: `SimpleTrack:${id}`,
          fragment: TrackDetailFragmentFragmentDoc,
        }) === null,
    ) ?? [];

  const tracks =
    ids?.map(
      (id) =>
        client.readFragment({
          id: `SimpleTrack:${id}`,
          fragment: TrackDetailFragmentFragmentDoc,
        }) ?? null,
    ) ?? [];

  useTrackDetailsBatchQuery({
    variables: { ids: fetchIds },
    skip: fetchIds.length === 0,
  });

  return (
    <ol>
      {tracks.map((track) =>
        track ? (
          <li key={track.id}>{JSON.stringify(track)}</li>
        ) : (
          <li key={nanoid()}>Loading...</li>
        ),
      )}
    </ol>
  );
};

export default SongTable;
