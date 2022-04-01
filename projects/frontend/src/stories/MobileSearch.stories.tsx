import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import MobileNavbar from '../components/MobileNavbar';
import MobileSearch, { MobileSearchProps } from '../components/MobileSearch';
import TopBar from '../components/TopBar';
import { compoundQuery } from './queries/compoundQuery';
import MockProvider from './util/MockProvider';

export default {
  title: 'Pages/Mobile/Search',
  component: MobileSearch,
  parameters: {},
} as ComponentMeta<typeof MobileSearch>;

const Template: ComponentStory<typeof MobileSearch> = (args) => {
  return (
    <MockProvider>
      <TopBar />
      <MobileSearch {...args} />
      <MobileNavbar onNav={() => {}} />
    </MockProvider>
  );
};

export const Init = Template.bind({});
const args: MobileSearchProps = {
  compoundQuery: compoundQuery,
  resetSearch: () => {},
  setSearch: () => {},
  initSearchState: {},
};
Init.args = args;
