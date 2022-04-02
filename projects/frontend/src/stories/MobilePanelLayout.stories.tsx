import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MobileSearchProps } from '../components/MobileSearch';
import { darienzoLaborde } from '../components/PlaylistSummary/summarize.test.data';
import MobileDashBody from '../features/MobileDash/MobileDashBody';
import { playlistTrackFromTrack } from '../types/compactTrack/util';
import { compoundQuery } from './queries/compoundQuery';
import MockProvider from './util/MockProvider';

export default {
  title: 'Pages/Mobile/Panel Layout',
  component: MobileDashBody,
  parameters: {},
} as ComponentMeta<typeof MobileDashBody>;

const Template: ComponentStory<typeof MobileDashBody> = (args) => {
  return (
    <MockProvider>
      <MobileDashBody {...args}/>
    </MockProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  compoundQuery: compoundQuery,
  resetSearch: () => {},
  setSearch: () => {},
  initSearchState: {},
  playlistTracks: darienzoLaborde.map(playlistTrackFromTrack),
};
