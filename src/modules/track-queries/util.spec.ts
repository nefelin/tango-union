import { reduceToIntersection, shorterFirstSorter } from './util';

test('shorterFirstSorter sort in order of shortest to longest list', () => {
  const lists = [
    new Set([1]),
    new Set([1, 2, 3, 4, 5, 6]),
    new Set([1, 2]),
    new Set([1, 2, 3, 4]),
    new Set([1, 2, 3]),
  ];
  const expectSorted = [
    new Set([1]),
    new Set([1, 2]),
    new Set([1, 2, 3]),
    new Set([1, 2, 3, 4]),
    new Set([1, 2, 3, 4, 5, 6]),
  ];
  lists.sort(shorterFirstSorter);

  expect(lists).toEqual(expectSorted);
});

test('intersector should only leave items present in all lists', () => {
  const lists = [
    new Set([1, 2, 5]),
    new Set([1, 2, 3, 4, 5, 6]),
    new Set([1, 2, 7]),
    new Set([1, 2, 3, 4, 6]),
    new Set([1, 2, 3, 5]),
  ];
  const expectIntersected = new Set([1, 2, 5]);

  const intersected = reduceToIntersection(lists);
  expect(intersected).toEqual(expectIntersected);
});
