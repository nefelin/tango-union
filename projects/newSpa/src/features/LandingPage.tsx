import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { useState } from 'react';
import type { SimpleTrack } from 'tango-index';

import {
  CompoundQueryQuery,
  CompoundQueryQueryResult, TrackDetailsQuery,
  useCompoundQueryQuery,
  useTrackDetailsQuery,
} from '../../generated/graphql';
import Loading from '../components/Loading';

const LandingPage = () => {
  const [limit, setLimit] = useState(30);

  const { data, loading, error } = useCompoundQueryQuery({
    variables: {
      criteria: {
        text: 'dari',
        pagination: { offset: 0, limit },
      },
    },
  });

  const {
    data: trackData,
    loading: trackLoading,
    error: trackError,
  } = useTrackDetailsQuery({
    variables: { trackIds: data?.compoundQuery?.trackIds ?? [] },
    skip: !data?.compoundQuery?.trackIds.length,
  });

  console.log({ data, loading, error });

  console.log({trackData})

  if (!trackData) {
    return <Loading />;
  }

  console.dir(trackData);
  const tracks = trackData.tracksByIds
  return (
    <div>
      <h2>Welcome to Tango Union</h2>
      <button type='button' onClick={() => setLimit((prev) => prev + 10)}>Raise Limit</button>
      {trackData.tracksByIds.map((track: TrackDetailsQuery['tracksByIds'][number]) => (
        <div key={track.trackId}>{JSON.stringify(track)}</div>
      ))}
    </div>
  );
};

export default LandingPage;
