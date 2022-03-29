import faker from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import { SongCard } from '../components/SongCard';
import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';
import { compactTrackFromTrackId } from '../types/compactTrack/util';
import { trackDetailsBatch } from './queries/trackDetailsBatch';

export default {
  title: 'Components/Song Card',
  component: SongCard,
  parameters: {
  },
} as ComponentMeta<typeof SongCard>;

const SingleTemplate: ComponentStory<typeof SongCard> = (args) => {
  return <SongCard {...args} />;
};

const BulkTemplate: ComponentStory<typeof SongCard> = (args) => {
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const playlistTracks = trackDetailsBatch.tracksByIds.map(track => ({...track, ...compactTrackFromTrackId(track.id)}));
  return (
    <div className="">
      {playlistTracks.map((track) => (
        <SongCard
          key={track.id}
          track={track}
          onPlay={() => {
            if (active === track.id) {
              setPlaying(prev => !prev);
            } else {
              setActive(track.id)
              setPlaying(true)
            }
          }}
          onMore={() => {}}
          active={track.id === active}
          playing={playing}
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
Single.args = { track: mockTrack(), active: false, playing: false};

export const SingleActive = SingleTemplate.bind({});
SingleActive.args = { track: mockTrack(), active: true, playing: false};

export const SinglePlaying = SingleTemplate.bind({});
SinglePlaying.args = { track: mockTrack(), active: true, playing: true};
