import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import AnimatedEq from '../components/AnimatedEq';

export default {
  title: 'SVGs/Animated EQ',
  component: AnimatedEq,
  parameters: {},
} as ComponentMeta<typeof AnimatedEq>;

const Template: ComponentStory<typeof AnimatedEq> = (args) => {
  return (
    <div>
      <AnimatedEq {...args}/>
    </div>
  );
};

export const Playing = Template.bind({});
Playing.args = {
};
