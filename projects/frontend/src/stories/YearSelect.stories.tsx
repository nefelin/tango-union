import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import YearSelect from '../components/YearSelect';

export default {
  title: 'Components/Year Select',
  component: YearSelect,
  parameters: {},
} as ComponentMeta<typeof YearSelect>;

const Template: ComponentStory<typeof YearSelect> = (args) => {
  return <YearSelect {...args} />;
};

export const Blank = Template.bind({});
Blank.args = {
  onChange: () => {},
};
