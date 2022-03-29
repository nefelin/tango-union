import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { summarize } from '../components/AutoPlaylistTitle/summarize';
import { darienzoLaborde } from '../components/AutoPlaylistTitle/summarize.test.data';
import PlaylistSummary from '../components/PlaylistSummary';

export default {
  title: 'Components/PlaylistSummar',
  component: PlaylistSummary,
  parameters: {},
} as ComponentMeta<typeof PlaylistSummary>;

const Template: ComponentStory<typeof PlaylistSummary> = (args) => {
  return (
    <div>
      <PlaylistSummary {...args} />
    </div>
  );
};

export const Simple = Template.bind({});
Simple.args = {
  summary: summarize(darienzoLaborde),
};
