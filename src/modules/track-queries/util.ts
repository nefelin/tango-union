const intersectionReducer = (acc: Set<number>, curr: Set<number>) =>
  new Set([...acc, ...[...curr].filter((num) => acc.has(num))]);

export const shorterFirstSorter = (a: Set<any>, b: Set<any>) => a.size - b.size;

export const reduceToIntersection = (sets: Array<Set<number>>) => {
  if (!sets.length) return [];
  sets.sort(shorterFirstSorter);
  return new Set(
    sets.slice(1, sets.length).reduce(intersectionReducer, sets[0]),
  );
};
