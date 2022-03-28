import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import AnimatedEq from './AnimatedEq';

export default {
  title: 'SVGs/Animated EQ',
  component: AnimatedEq,
  parameters: {},
} as ComponentMeta<typeof AnimatedEq>;

const Template: ComponentStory<typeof AnimatedEq> = (args) => {
  return (
    // <div style={{ width: 10 }}>
    <div>
      <AnimatedEq {...args}/>
    </div>
  );
};

export const Playing = Template.bind({});
Playing.args = {
  playing: true
};

export const Stopped = Template.bind({});
Stopped.args = {
  playing: false
};
