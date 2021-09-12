import React, { useState } from 'react';

import YearGraph from '../YearGraph/YearGraph';

const Sandbox = () => {
  const [data, setData] = useState<Record<string, number>>(makeYearData());
  // console.log(data)
  return (
    <div>
      Sandbox <YearGraph data={data} maxYear={2020} minYear={1900} />
      <button type="button" onClick={() => setData(makeYearData())}>
        One
      </button>
      {/* <button type="button" onClick={() => setData(data2)}> */}
      {/*  Two */}
      {/* </button> */}
    </div>
  );
};

export const makeYearData = () => {
  const data: Record<string, number> = {};
  const startYear = 1900;
  const endYear = 2016;

  const makePeak = () => Math.floor(Math.random() * (endYear - startYear)) + startYear;

  const peaks = [makePeak(), makePeak()]
  // eslint-disable-next-line no-plusplus
  for (let year = startYear; year < endYear; year++) {
    const distToPeak = Math.min(...peaks.map(peak => Math.abs(year-peak)))
    const fakeCount = Math.floor(Math.random()*(100-distToPeak**1.2))
    // if (fakeCount < 30) {
    //   fakeCount = 0
    // }
    data[year.toString()] = fakeCount;
  }

  return data;
};
export default Sandbox;
