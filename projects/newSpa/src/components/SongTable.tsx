import { nanoid } from 'nanoid';
import * as React from 'react';

import useCacheStitchedIdFetch from './SongTable/useCacheStitchedIdFetch';

interface Props {
  ids?: Array<number>;
}

const SongTable = ({ ids }: Props) => {
  const tracks = useCacheStitchedIdFetch(ids);

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
