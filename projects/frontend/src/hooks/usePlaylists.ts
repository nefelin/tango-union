import { nanoid } from 'nanoid';
import { useState } from 'react';

type IdList = Array<string>;

export const usePlaylists = () => {
  const [searchlist, setSearchlist] = useState<IdList>([]);
  const [uniquePlaylist, setUniquePlaylist] = useState<IdList>([]);
  const [selected, setSelected] = useState<IdList>([])

  const addToPlaylist = (...trackIds: Array<string>) => {
    setUniquePlaylist((prev) => [...prev, ...trackIds.map(attachId)]);
  };

  const playlist = uniquePlaylist.map(stripId);

  return {
    searchlist,
    setSearchlist,
    playlist,
    addToPlaylist,
  };
};

const idDelimiter = '-';
const attachId = (id: string) => `${id}${idDelimiter}${nanoid()}`;
const stripId = (uniqueId: string) => {
  const stripped = uniqueId.split(idDelimiter)[0];
  if (stripped === undefined) {
    throw new Error('Malformed unique id');
  }

  return stripped;
};
