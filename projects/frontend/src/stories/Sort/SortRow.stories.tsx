import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import SortRow from '../../components/MobileSort/SortRow';

export default {
  title: 'Components/Sort/Sort Row',
  component: SortRow,
  parameters: {},
} as ComponentMeta<typeof SortRow>;

const Template: ComponentStory<typeof SortRow> = (args) => {
  return (
    <div className="w-1/2 border border-black p-6">
      <SortRow {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  text: 'Singers',
  onClick: () => {},
};
