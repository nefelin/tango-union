import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { darienzoLaborde } from '../components/PlaylistSummary/summarize.test.data';
import ResponsivePlaylistBody from '../components/ResponsivePlaylist/ResponsivePlaylistBody';
import StandaloneFraming from '../components/ResponsivePlaylist/StandaloneFraming';
import TopBar from '../components/TopBar';
import { playlistTrackFromTrack } from '../types/compactTrack/util';
import MockProvider from './util/MockProvider';

export default {
  title: 'Components/Responsive Playlist',
  component: ResponsivePlaylistBody,
  parameters: {},
} as ComponentMeta<typeof ResponsivePlaylistBody>;

const Template: ComponentStory<typeof ResponsivePlaylistBody> = (args) => {
  return (
    <MockProvider>
      <TopBar />
      <StandaloneFraming>
        <ResponsivePlaylistBody {...args} />
      </StandaloneFraming>
    </MockProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  tracks: darienzoLaborde.map(playlistTrackFromTrack()),
};
