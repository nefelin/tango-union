import faker from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';
import { compactTrackFromTrackId } from '../types/compactTrack/util';
import { trackDetailsBatch } from './queries/trackDetailsBatch';
import { SongCard } from './SongCard';

export default {
  title: 'Song Card',
  component: SongCard,
  parameters: {
  },
} as ComponentMeta<typeof SongCard>;

const SingleTemplate: ComponentStory<typeof SongCard> = (args) => {
  return <SongCard {...args} />;
};


const BulkTemplate: ComponentStory<typeof SongCard> = (args) => {
  const [active, setActive] = useState<string | null>(null);

  const playlistTracks = trackDetailsBatch.tracksByIds.map(track => ({...track, ...compactTrackFromTrackId(track.id)}));
  return (
    <div className="">
      {playlistTracks.map((track) => (
        <SongCard
          key={track.id}
          track={track}
          onPlay={() => setActive(track.id)}
          onMore={() => setActive(track.id)}
          active={track.id === active}
        />
      ))}
    </div>
  );
};

const mockTrack = (): PlaylistTrack => ({
  listId: 'abcde',
  id: nanoid(4),
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
const tracks = Array.from(Array(20), mockTrack);

export const Bulk = BulkTemplate.bind({});
Bulk.args = {};

export const Single = SingleTemplate.bind({});
Single.args = { track: mockTrack() };

export const SingleActive = SingleTemplate.bind({});
SingleActive.args = { track: mockTrack(), active: true };

// export const LoggedIn = Template.bind({});

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const loginButton = await canvas.getByRole('button', { name: /Log in/i });
//   await userEvent.click(loginButton);
// };
