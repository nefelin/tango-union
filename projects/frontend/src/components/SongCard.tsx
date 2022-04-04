import { Link, MoreHorizOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import classNames from 'classnames';
import * as r from 'ramda';
import { sort } from 'ramda';
import React, { KeyboardEventHandler, MouseEventHandler } from 'react';

import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';
import { CompactTrack, TrackId } from '../types/compactTrack/types';
import { Unary } from '../types/utility/unary';
import { capitalizeFirstLetter } from '../util/capitalizeFirst';
import AnimatedEq from './AnimatedEq';

interface Props {
  track: PlaylistTrack;
  onPlay: Unary<TrackId>;
  onMore: Unary<CompactTrack>;
  active: boolean;
  playing: boolean;
  simpleCards?: boolean;
}

const localeCompare = (a: string, b: string) => a.localeCompare(b);

export const SongCard = ({
  track,
  onPlay,
  onMore,
  active,
  playing,
  simpleCards = false,
}: Props) => {
  const { linkScore, trackId, title, singer, orchestra, year, genre } = track;

  const handleMoreKeyboard: KeyboardEventHandler = (e) => {
    e.stopPropagation();
    if (e.key === ' ' || e.key === 'Enter') {
      onMore(track);
    }
  };
  const handleMoreMouse: MouseEventHandler = (e) => {
    e.stopPropagation();
    onMore(track);
  };
  const handlePlayKeyboard: KeyboardEventHandler = (e) => {
    e.stopPropagation();
    if (e.key === ' ' || e.key === 'Enter') {
      onPlay(trackId);
    }
  };
  const handlePlayMouse: MouseEventHandler = (e) => {
    e.stopPropagation();
    onPlay(trackId);
  };


  const sortedSinger = singer ? [...singer].sort(localeCompare) : [];
  const sortedOrchestra = orchestra ? [...orchestra].sort(localeCompare) : [];

  const singerOrchDetails = [...sortedOrchestra, ...sortedSinger];
  const orchSingerText = singerOrchDetails.length
    ? singerOrchDetails.join(', ')
    : 'Missing Orchestra and Singer';

  const yearGenreDetails = [year, capitalizeFirstLetter(genre)].filter(
    (val) => !!val,
  );
  const yearGenreText = yearGenreDetails.length
    ? yearGenreDetails.join(', ')
    : 'Missing Year and Genre';

  const titleClasses = classNames(
    'truncate',
    'items-center',
    'flex',
    'flex-row',
    'gap-1',
    {
      'font-bold': active,
    },
  );

  return (
    <div
      className="grid p-2 grid-cols-8 bg-gray-100 my-0.5"
      tabIndex={0}
      role="link"
      onKeyDown={handlePlayKeyboard}
      onClick={handlePlayMouse}
    >
      <div className="col-span-6 flex flex-col">
        <div className={titleClasses}>
          {active && <AnimatedEq playing={playing} />}
          {title}
        </div>
        <div className="text-xs truncate">{yearGenreText}</div>
        <div className="text-xs truncate">{orchSingerText}</div>
      </div>
      {!simpleCards && (
        <Tooltip
          title="How likely it is that we have the right video for this song"
          enterTouchDelay={0}
          leaveTouchDelay={4000}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="col-span-1 flex flex-col justify-center text-xs items-center">
            <div>{linkScore}/10</div>
            <Link />
          </div>
        </Tooltip>
      )}
      {!simpleCards && (
        <div
          className="col-span-1 flex justify-center items-center"
          tabIndex={0}
          role="link"
          onKeyPress={handleMoreKeyboard}
          onClick={handleMoreMouse}
        >
          <MoreHorizOutlined />
        </div>
      )}
    </div>
  );
};
