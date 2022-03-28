import {
  Link,
  MoreHorizOutlined,
  PlayCircleFilledWhiteOutlined,
} from '@material-ui/icons';
import classNames from 'classnames';
import React, { KeyboardEventHandler, MouseEventHandler } from 'react';

import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';
import { TrackId } from '../types/compactTrack/types';
import { Unary } from '../types/utility/unary';
import { capitalizeFirstLetter } from '../util/capitalizeFirst';

interface Props {
  track: PlaylistTrack;
  onPlay: Unary<TrackId>;
  onMore: Unary<TrackId>;
  active?: boolean;
}

export const SongCard = ({ track, onPlay, onMore, active = false }: Props) => {
  const { linkScore, trackId, title, singer, orchestra, year, genre } = track;

  const handleMoreKeyboard: KeyboardEventHandler = (e) => {
    e.stopPropagation();
    onMore(trackId);
  };
  const handleMoreMouse: MouseEventHandler = (e) => {
    e.stopPropagation();
    onMore(trackId);
  };
  const handlePlayKeyboard: KeyboardEventHandler = (e) => {
    e.stopPropagation();
    onPlay(trackId);
  };
  const handlePlayMouse: MouseEventHandler = (e) => {
    e.stopPropagation();
    onPlay(trackId);
  };

  const detailsArray = [
    ...(orchestra || []),
    ...(singer || []),
    year,
    capitalizeFirstLetter(genre),
  ];
  const detailsText = detailsArray.length
    ? detailsArray.join(', ')
    : 'No details...';

  const titleClasses = classNames('truncate', 'items-center', {
    'font-bold': active,
  });

  return (
    <div
      className="grid p-2 grid-cols-8 bg-gray-100 my-1"
      tabIndex={0}
      role="link"
      onKeyDown={handlePlayKeyboard}
      onClick={handlePlayMouse}
    >
      <div className="col-span-6 flex flex-col">
        <div className={titleClasses}>{title}</div>
        <div className="text-xs truncate">{detailsText}</div>
      </div>
      <div className="col-span-1 flex flex-col justify-center text-xs items-center">
        <div>{linkScore}/10</div>
        <Link />
      </div>
      <div
        className="col-span-1 flex justify-center items-center"
        tabIndex={0}
        role="link"
        onKeyPress={handleMoreKeyboard}
        onClick={handleMoreMouse}
      >
        <MoreHorizOutlined />
      </div>
    </div>
  );
};
