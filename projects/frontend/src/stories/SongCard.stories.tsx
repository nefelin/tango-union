import faker from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';
import { SongCard } from './SongCard';

export default {
  title: 'Song Card',
  component: SongCard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SongCard>;

const Template: ComponentStory<typeof SongCard> = (args) => {
  const paddedArgs = {
    onMore: () => console.log('more'),
    onPlay: () => console.log('press'),
  };
  return (
    <div className="">
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
      <SongCard track={mockTrack()} {...paddedArgs} />
    </div>
  );
};

const mockTrack = (): PlaylistTrack => ({
  listId: 'abcde',
  id: '10698',
  trackId: '10698',
  title: faker.random.words(Math.ceil(Math.random() * 7)),
  genre: 'tango',
  singer: Array.from(
    Array(Math.floor(Math.random() * 3)),
    () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  ),
  orchestra: Array.from(
    Array(Math.floor(Math.random() * 3)),
    () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  ),
  secondsLong: 161,
  year: 1973,
  linkScore: 4,
  videoId: 'towG9esdSO0',
});

export const Basic = Template.bind({});

Basic.args = {};

// export const LoggedIn = Template.bind({});

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const loginButton = await canvas.getByRole('button', { name: /Log in/i });
//   await userEvent.click(loginButton);
// };
