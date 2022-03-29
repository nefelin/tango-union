// YearDictKey is used to track how we will represent a collection of years in human-readable terms
type YearDictKey = number | 'early' | 'late' | 'spans';

const yearsSummary = (years: Array<number>): Array<string> => {
  if (!years.length) {
    return [];
  }

  const decades: Record<number, YearDictKey> = {}

  for (const year of years) {
    const [decade, onesYear] = decadeAndOnesFromYear(year);

    const thisDecade = decades[decade];
    switch (thisDecade) {
      case undefined:
        decades[decade] = year;
        break;
      case 'early':
        if (onesYear < 5) {
          break;
        }
        decades[decade] = 'spans';
        break;
      case 'late':
        if (onesYear > 5) {
          break;
        }
        decades[decade] = 'spans';
        break;
      case 'spans':
        break;
      default:
        if (thisDecade === year) {
          break;
        }

        if (judgeLateEarly(thisDecade) === judgeLateEarly(year)) {
          decades[decade] = judgeLateEarly(year);
        } else {
          decades[decade] = 'spans';
        }
        break;
    }
  }

  return Object.entries(decades).map(([decade, val]) => yearPairToPresentationString([parseInt(decade), val]))
}

const judgeLateEarly = (year: number): YearDictKey => {
  const ones = year % 10;
  if (ones < 5) {
    return 'early'
  }
  if (ones > 5) {
    return 'late'
  }
  return year;
}

const lastTwoDigits = (year: number): number => year > 1999 || year < 1910 ? year : year % 100; // we never want to abbreviate years from the 00's

const decadeAndOnesFromYear= (year: number): [number, number] => {
  if (year > 1999) {
    return [year, year]
  }

  const digits = year.toString().split('');
  const decade = parseInt(digits[2] || '0') * 10;
  const ones = parseInt(digits[3] || '0');

  return [decade, ones]
}

const yearPairToPresentationString = (pair: [number, YearDictKey]): string => {
  const [decade, decadeSummary] = pair;

  switch (decadeSummary) {
    case 'late':
      return `late ${decade}s`;
    case 'early':
      return `early ${decade}s`;
    case 'spans':
      return `${decade}s`;
    default:
      return `${lastTwoDigits(decadeSummary)}`
  }
}

export default yearsSummary;