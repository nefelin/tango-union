import * as React from 'react';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import type {
  TrackDetailsQuery} from '../../generated/graphql';
import {
  useCompoundQueryQuery,
  useTrackDetailsQuery,
} from '../../generated/graphql';

const LandingPage = () => {
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 200);

  const { data, loading, error } = useCompoundQueryQuery({
    variables: {
      criteria: {
        text: debouncedSearch,
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

  console.log({ trackData });

  const tracks = trackData?.tracksByIds ?? [];
  return (
    <div>
      <h2>Welcome to Tango Union</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type="button" onClick={() => setLimit((prev) => prev + 10)}>
        Raise Limit
      </button>
      {tracks.map(
        (track: TrackDetailsQuery['tracksByIds'][number]) => (
          <div key={track.trackId}>{JSON.stringify(track)}</div>
        ),
      )}
    </div>
  );
};

export default LandingPage;
