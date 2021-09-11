import React, { useState } from 'react';

import YearGraph from '../YearGraph/YearGraph';

const Sandbox = () => {
  const [data, setData] = useState<Record<string, number>>(makeData());
  console.log(data)
  return (
    <div>
      Sandbox <YearGraph data={data} />
      <button type="button" onClick={() => setData(makeData())}>
        One
      </button>
      {/* <button type="button" onClick={() => setData(data2)}> */}
      {/*  Two */}
      {/* </button> */}
    </div>
  );
};

const makeData = () => {
  const data: Record<string, number> = {};
  const startYear = 1830 + Math.floor(Math.random() * 90)
  const endYear = 2016 - Math.floor(Math.random() * 100)
  // eslint-disable-next-line no-plusplus
  for (let year = startYear; year < endYear; year++) {
    data[year.toString()] = Math.floor(Math.random() * 100);
  }

  return data;
};

const data1 = makeData();
const data2 = makeData();
// const data1 = {
//   1944: 20,
//   1945: 30,
//   1951: 15,
//   1962: 0,
//   1970: 34,
// };
// const data2 = {
//   1935: 10,
//   1943: 25,
//   1950: 18,
//   1964: 12,
//   1968: 2,
//   1977: 12,
// };
//
export default Sandbox;
//
