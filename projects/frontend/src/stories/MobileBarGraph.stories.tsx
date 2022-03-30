import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import AnimatedEq from '../components/AnimatedEq';
import { Datum } from '../components/BarGraph/types';
import MobileBarGraph from '../components/MobileBarGraph';

export default {
  title: 'Components/Mobile Bar Graph',
  component: AnimatedEq,
  parameters: {},
} as ComponentMeta<typeof AnimatedEq>;

const Template: ComponentStory<typeof AnimatedEq> = (args) => {
  const [values, setValues] = useState(randomData(10));

  return (
    <div className="h-[6em] p-1">
      <MobileBarGraph data={values} />
      <br/>
      <Button variant="outlined" onClick={() => setValues(randomData(10))}>
        Change
      </Button>
    </div>
  );
};

const randomData = (len: number): Array<Datum<number>> =>
  Array.from(Array(len), (x, i) => ({
    label: ((i * 10).toString() + `'s`).padStart(4, '0'),
    value: Math.floor(Math.random() * 100),
  }));

export const Graph = Template.bind({});
Graph.args = {
};
