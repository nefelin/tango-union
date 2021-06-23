import * as React from 'react';
import { useTrackDetailsQuery } from '../../generated/graphql';

interface Props {
  trackIds?: Array<number>;
}

const SongTable = ({ trackIds }: Props) => {
  const { data, loading, error } = useTrackDetailsQuery({
    variables: { trackIds: trackIds || [] },
  });

  return (
    <ol>
      {data?.tracksByIds?.map((track) => (
        <li key={track.trackId}>{JSON.stringify(track)}</li>
      ))}
    </ol>
  );
};

export default SongTable;
