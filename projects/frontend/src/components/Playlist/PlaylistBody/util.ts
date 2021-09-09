import { CompactTrack, ListId } from '../../../types/compactTrack/types';

// fixme generate new listIds if the track changes lists
export function moveMany(
  ar: Array<CompactTrack>,
  sourceIds: Array<ListId>,
  targetId: ListId,
  forward: boolean,
): Array<CompactTrack> {
  const cloneArray = ar.slice();
  const orderedSources = cloneArray.filter(({listId}) =>
    sourceIds.some((sourceId) => sourceId === listId),
  );
  const insertAt = cloneArray.findIndex(({listId}) => listId === targetId); // id accessors should be functions
  const adjustment = forward ? 1 : 0;

  return [
    cloneArray
      .slice(0, insertAt + adjustment)
      .filter(({listId}) => !sourceIds.includes(listId)),
    orderedSources,
    cloneArray
      .slice(insertAt + adjustment, cloneArray.length)
      .filter(({listId}) => !sourceIds.includes(listId)),
  ].reduce((prev, curr) => [...prev, ...curr]);
}
