import { CompoundQueryQuery, CountTuple } from '../../../generated/graphql';
import { Datum } from '../BarGraph/types';

const yearTableDataFromCompoundQueryCounts = (
  rawCounts: Array<CountTuple>,
): Array<Datum<number>> => {
  const counts = rawCounts.slice();

  // fill in missing data
  for (let year = 1900; year < 2016; year += 1) {
    if (counts.findIndex(({ name }) => name === year.toString()) === -1) {
      counts.push({ name: year.toString(), count: 0 });
    }
  }

  counts.sort((a, b) => {
    return parseInt(a.name, 10) - parseInt(b.name, 10);
  });

  return counts.map(({ name: label, count: value }) => ({ label, value }));
};

export default yearTableDataFromCompoundQueryCounts;
