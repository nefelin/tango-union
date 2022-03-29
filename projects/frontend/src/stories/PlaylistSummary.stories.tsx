import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import PlaylistSummary from '../components/PlaylistSummary';
import { smartSummary, summarize } from '../components/PlaylistSummary/summarize';
import { darienzoLaborde } from '../components/PlaylistSummary/summarize.test.data';

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
  summary: smartSummary(darienzoLaborde),
};
