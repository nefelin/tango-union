import React, { useState } from 'react';

import YearGraph from '../YearGraph/YearGraph';

const Sandbox = () => {
  const [data, setData] = useState<Record<string, number>>(makeData());
  // console.log(data)
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
export default Sandbox;
