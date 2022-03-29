import yearsSummary from './yearsSummary';

it('Should summarize decades containing only one year with just that year (in two digit format), e.g. [1948, 1955] => 48, 55', () => {
  const years = [1948, 1955];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['48', '55']);
});

it('Should group years bunched in the early part of the decade (< 5) and summarize that such as `early 50s`', () => {
  const years = [1922, 1923, 1924, 1960, 1961, 1963];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['early 20s', 'early 60s']);
});

it('Should group years bunched in the late part of the decade (> 5) and summarize that such as `late 50s`', () => {
  const years = [1938, 1936, 1988, 1989];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['late 30s', 'late 80s']);
});

it('Should order decades strings in ascending order', () => {
  const years = [1988, 1989, 1929, 1928];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['late 20s', 'late 80s']);
});

it('Should group repeat years correctly', () => {
  const years = [1988, 1988, 1922, 1922];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['22', '88']);
});

it('Should group years that straddle the midpoint of the decade (eg, 42, 48) as spanning the decade and reduce specificity (eg 40s)', () => {
  const years = [1981, 1988, 1922, 1929];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['20s', '80s']);
});

it('Should mix the various translations correctly', () => {
  const years = [1988, 1988, 1922, 1922, 1989, 1933, 1931];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['22', 'early 30s', 'late 80s']);
});

it('Should treat any year after 2000 as that specific year and never summarize nor abbreviate it', () => {
  const years = [2000, 2007, 2001];
  const summary = yearsSummary(years);

  expect(summary).toEqual(['2000', '2001', '2007']);
});
