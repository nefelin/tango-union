import { useReactiveVar } from '@apollo/client';
import React, { useContext } from 'react';

import { reactiveSongLists } from '../../../hooks/state/useGlobalPlaylistState/songLists.state';
import { FocusContext } from '../../../hooks/useFocusable';

export const Counter = ({size = 'normal'}:{size?: 'normal'|'small'}) => {
  const { focused: activePlaylistId } = useContext(FocusContext);
  const songLists = useReactiveVar(reactiveSongLists);
  const count = songLists[activePlaylistId ?? 'nope']?.selection.size ?? 0;
  const baseSize = 22;

  const SIZE = multiplierFromCharCount(count.toString().length) * baseSize;

  return (
    <div
      style={{
        borderRadius: SIZE / 2,
        minWidth: SIZE,
        minHeight: SIZE,
        position: 'relative',
        backgroundColor: 'red',
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        transform: size === 'small' ? 'scale(.6)' : '',
        transition: 'transform 150ms ease-in-out'
      }}
    >
      {count}
    </div>
  );
};

const multiplierFromCharCount = (count: number): number => {
  switch (count) {
    case 1:
      return 1;
    case 2:
      return 1.3;
    case 3:
    default:
      return 1.6;
  }
};
