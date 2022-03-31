import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import YearSelect from '../components/YearSelect';
import { Option } from '../types/option';

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
