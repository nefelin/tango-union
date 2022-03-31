import { CountTuple } from '../../../generated/graphql';

const decadeCountFromYears = (counts: Array<CountTuple>) => {
  const decades: Array<number> = Array(10).fill(0);

  for (const tup of counts) {
    const { name: year, count } = tup;
    const tens = parseInt(year) % 100;
    const index = Math.floor(tens / 10);
    decades[index] += count;
  }

  return decades;
};

export default decadeCountFromYears;
