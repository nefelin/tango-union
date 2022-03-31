import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import MobileSearch from '../components/MobileSearch';
import { compoundQuery } from './queries/compoundQuery';
import { selectOptions } from './queries/selectOptions';
import MockProvider from './util/MockProvider';

export default {
  title: 'Pages/Mobile/Search',
  component: MobileSearch,
  parameters: {},
} as ComponentMeta<typeof MobileSearch>;

const Template: ComponentStory<typeof MobileSearch> = (args) => {
  return (
    <MockProvider>
      <div>
        <MobileSearch {...args} />
      </div>
    </MockProvider>
  );
};

export const Init = Template.bind({});
Init.args = {
  compoundQuery,
};
