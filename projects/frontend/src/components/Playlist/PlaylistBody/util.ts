export function moveMany(
  ar: Array<string>,
  sourceIds: Array<string>,
  targetId: string,
  forward: boolean
): Array<string> {
  const cloneArray = ar.slice();
  const orderedSources = cloneArray.filter((id) => sourceIds.includes(id));
  const insertAt = cloneArray.findIndex((id) => id === targetId);
  const adjustment = forward ? 1 : 0;

  return [
    cloneArray.slice(0, insertAt + adjustment).filter((id) => !sourceIds.includes(id)),
    orderedSources,
    cloneArray
      .slice(insertAt + adjustment, cloneArray.length)
      .filter((id) => !sourceIds.includes(id)),
  ].reduce((prev, curr) => [...prev, ...curr]);
}