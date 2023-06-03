import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DragIndicator,
  Favorite,
  Link,
  MoreHorizOutlined,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import classNames from 'classnames';
import React, { KeyboardEventHandler, MouseEventHandler } from 'react';

import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';
import useWhoAmiI from '../hooks/useWhoAmiI';
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
  sortable?: boolean;
}

const localeCompare = (a: string, b: string) => a.localeCompare(b);

export const SongCard = ({
  track,
  onPlay,
  onMore,
  active,
  playing,
  simpleCards = false,
  sortable = false,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.listId });
  const user = useWhoAmiI();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'manipulation',
  };

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

  const liked = (user?.likedTracks ?? []).includes(parseInt(track.trackId));
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex h-full items-center bg-gray-100 my-0.5">
        {sortable && (
          <div className="border-r-white border-r h-full px-2" {...listeners}>
            <DragIndicator color="disabled" />
          </div>
        )}
        <div
          className="grid p-2 grid-cols-8 bg-gray-100 my-0.5 w-full"
          tabIndex={0}
          role="link"
          onKeyDown={handlePlayKeyboard}
          onClick={handlePlayMouse}
        >
          <div className="col-span-6 flex flex-col">
            <div className={titleClasses}>
              {active && <AnimatedEq playing={playing} />}
              {title}
              {liked && <Favorite className="ml-2" fontSize="10px"/>}
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
      </div>
    </div>
  );
};
