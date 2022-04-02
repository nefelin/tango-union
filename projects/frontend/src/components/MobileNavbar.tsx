import React, { useState } from 'react';

import { asVh, layout } from '../features/MobileDash/layout';
import { Unary } from '../types/utility/unary';

const pages = ['Search', 'Results', 'Playlist', 'Player'] as const;
const highlightColor = 'rgb(122,190,246)';
const borderWidth = '.2rem';

interface Props {
  onNav: Unary<string>;
}

const MobileNavbar = ({ onNav }: Props) => {
  const [current, setCurrent] = useState('Search');

  return (
    <div
      className="fixed bottom-0 w-full flex flex-row justify-around items-center text-sm text-gray-400 font-bold bg-white"
      style={{
        boxShadow: '0 0 10px rgba(0, 0, 0, .15)',
        height: asVh(layout.navbar),
      }}
    >
      {pages.map((page) => {
        const active = page === current;
        const borderBottom = active
          ? `${borderWidth} solid ${highlightColor}`
          : '';
        const color = active ? highlightColor : '';
        const padding = active
          ? '.5rem .5rem .3rem .5rem'
          : '.5rem .5rem .5rem .5rem';

        return (
          <div
            role="button"
            tabIndex={0}
            key={page}
            className="w-full h-full flex justify-center items-center"
            style={{ borderBottom, color, padding }}
            onClick={() => {
              setCurrent(page);
              onNav(page);
            }}
            onKeyDown={({ key }) => {
              if (key === ' ' || key === 'Enter') {
                setCurrent(page);
                onNav(page);
              }
            }}
          >
            {page}
          </div>
        );
      })}
    </div>
  );
};

export default MobileNavbar;
