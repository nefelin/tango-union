import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import AnimatedEq from '../components/AnimatedEq';
import MobileDash from '../features/MobileDash';
import MockProvider from './util/MockProvider';

export default {
  title: 'Pages/Mobile/Panel Layout',
  component: AnimatedEq,
  parameters: {},
} as ComponentMeta<typeof AnimatedEq>;

const Template: ComponentStory<typeof AnimatedEq> = (args) => {
  return (
    <MockProvider>
      <MobileDash />
    </MockProvider>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
