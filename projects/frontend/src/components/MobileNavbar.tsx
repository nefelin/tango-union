import React, { useState } from 'react';

import { layout } from '../features/MobileDash/layout';
import { asVh } from '../hooks/useViewport';
import { Unary } from '../types/utility/unary';

export type PanelOption = 'search' | 'results' | 'playlist';
const allPages: ReadonlyArray<PanelOption> = ['search', 'results', 'playlist' ] as const;
const highlightColor = 'rgb(122,190,246)';
const borderWidth = '.2rem';

interface Props {
  onNav: Unary<PanelOption>;
  current: PanelOption;
}

const MobileNavbar = ({ onNav, current }: Props) => {
  return (
    <div
      className="fixed bottom-0 w-full flex flex-row justify-around items-center text-sm text-gray-400 font-bold bg-white"
      style={{
        // borderTop: 'rgb(122,122,122)',
        height: asVh(layout.navBar),
      }}
    >
      {allPages.map((page) => {
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
              onNav(page);
            }}
            onKeyDown={({ key }) => {
              if (key === ' ' || key === 'Enter') {
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
