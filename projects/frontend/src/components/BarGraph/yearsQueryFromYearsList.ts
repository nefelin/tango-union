import { last, sort } from 'ramda';

const groupYears = (years: Array<number>) => {
  const sorted = years.slice();
  sorted.sort();

  const logSpan = (newSpan: Array<number>) => {
    // splitting into chunks of 10 preserves decades rather than turning them into long ranges
    if (newSpan.length % 10 === 0 && newSpan.length > 10) {
      spans.push(...spliceIntoChunks(newSpan, 10))
    } else {
      spans.push(newSpan)
    }
  }
  const spans: Array<Array<number>> = [];

  let nextSpan: Array<number> = [];
  sorted.forEach((year, i) => {
    if (nextSpan.length === 0 || sorted[i - 1] === year - 1) {
      nextSpan.push(year);
    } else {
     logSpan(nextSpan.slice());
      nextSpan = [year];
    }
    if (i === sorted.length - 1) {
     logSpan(nextSpan);
    }
  });

  return spans;
};

const singleYearTerm = (year: number): string => {
  if (year > 1919 && year < 2000) {
    return (year - 1900).toString();
  }
  return year.toString();
};

const is1900Decade = (years: Array<number>) => {
  const firstYear = years[0] ?? 0;
  if (years.length !== 10 || firstYear < 1920 || firstYear > 1990) {
    return false;
  }

  const lastDigits = years.map((year) => year % 10);

  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((digit) =>
    lastDigits.includes(digit),
  );
};

const termsFromYearGroups = (groups: Array<Array<number>>): Array<string> => {
  const strings = groups.map((group) => {
    const firstYear = group[0] ?? 0;
    const lastYear = group[group.length - 1] ?? 0;
    if (group.length === 1) {
      return singleYearTerm(firstYear);
    }
    if (is1900Decade(group)) {
      return `${singleYearTerm(firstYear)}s`;
    }
    return `${singleYearTerm(firstYear)}-${singleYearTerm(lastYear)}`;
  });
  return strings;
};

function spliceIntoChunks<Type>(arr: Array<Type>, chunkSize: number) {
  const res: Array<Array<Type>> = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

const yearsQueryFromYearsList = (years: Array<number>) =>
  termsFromYearGroups(groupYears(years)).join(', ');

export default yearsQueryFromYearsList;
