import {
  LocalSongId,
  TrackIdTuple,
} from '../../../hooks/state/usePlaylistsState/types';

export function moveMany(
  ar: Array<TrackIdTuple>,
  sourceIds: Array<LocalSongId>,
  targetId: LocalSongId,
  forward: boolean,
): Array<TrackIdTuple> {
  const cloneArray = ar.slice();
  const orderedSources = cloneArray.filter((id) =>
    sourceIds.some((sourceId) => sourceId === id[1]),
  );
  const insertAt = cloneArray.findIndex((id) => id[1] === targetId); // id accessors should be functions
  const adjustment = forward ? 1 : 0;

  return [
    cloneArray
      .slice(0, insertAt + adjustment)
      .filter((id) => !sourceIds.includes(id[1])),
    orderedSources,
    cloneArray
      .slice(insertAt + adjustment, cloneArray.length)
      .filter((id) => !sourceIds.includes(id[1])),
  ].reduce((prev, curr) => [...prev, ...curr]);
}
