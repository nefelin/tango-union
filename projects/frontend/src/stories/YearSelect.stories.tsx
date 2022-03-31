import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { Option } from 'react-select/src/filters';

import YearSelect from '../components/YearSelect';

export default {
  title: 'Components/Year Select',
  component: YearSelect,
  parameters: {},
} as ComponentMeta<typeof YearSelect>;

const Template: ComponentStory<typeof YearSelect> = (args) => {
  const [value, setValue] = useState<ReadonlyArray<Option>>([])
  return <YearSelect value={value} onChange={(newVal) => setValue(newVal)}/>;
};

export const Blank = Template.bind({});
Blank.args = {
  onChange: () => {},
};
