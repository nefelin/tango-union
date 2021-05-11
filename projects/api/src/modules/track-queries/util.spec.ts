import { intersect, shorterFirstSorter } from './util';

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
  const expectIntersected = new Set([1, 2]);

  const intersected = intersect(lists);
  expect(intersected).toEqual(expectIntersected);
});

test('intersector should work with single item list', () => {
  const lists = [new Set([39, 189, 273, 400, 426, 427, 428, 429])];
  const expectIntersected = new Set([39, 189, 273, 400, 426, 427, 428, 429]);

  const intersected = intersect(lists);
  expect(intersected).toEqual(expectIntersected);
});

test('intersector should ignore nulls', () => {
  const sets = [null, null, new Set([39, 189, 273, 400, 426, 427, 428, 429])];
  const expectSet = new Set([39, 189, 273, 400, 426, 427, 428, 429]);

  const intersected = intersect(sets);
  expect(intersected).toEqual(expectSet);
});

test('intersctor should not keep values from smallest list if they arent in larger lists', () => {
  const lists = [
    new Set([20, 5, 2]),
    new Set([1, 2, 5, 6]),
    new Set([1, 2, 3, 4, 5, 6]),
    new Set([1, 2, 5, 7, 50]),
    new Set([1, 2, 3, 4, 5, 6]),
    new Set([1, 2, 3, 5]),
  ];
  const expectIntersected = new Set([5, 2]);
  const intersected = intersect(lists);
  expect(intersected).toEqual(expectIntersected);
});
