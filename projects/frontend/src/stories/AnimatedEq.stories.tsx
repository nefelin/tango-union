import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import AnimatedEq from '../components/AnimatedEq';

export default {
  title: 'SVGs/Animated EQ',
  component: AnimatedEq,
  parameters: {},
} as ComponentMeta<typeof AnimatedEq>;

const Template: ComponentStory<typeof AnimatedEq> = (args) => {
  return (
    <div>
      <AnimatedEq {...args} />
    </div>
  );
};

export const Playing = Template.bind({});
Playing.args = {
  playing: true,
};

export const Stopped = Template.bind({});
Stopped.args = {
  playing: false,
};
