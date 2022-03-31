import { Button, Fade, Slide } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import AnimatedEq from '../components/AnimatedEq';
import MobileNavbar from '../components/MobileNavbar';
import MobileSearch from '../components/MobileSearch';
import TopBar from '../components/TopBar';
import { compoundQuery } from './queries/compoundQuery';
import MockProvider from './util/MockProvider';

export default {
  title: 'Pages/Mobile/Panel Layout',
  component: AnimatedEq,
  parameters: {},
} as ComponentMeta<typeof AnimatedEq>;

const Template: ComponentStory<typeof AnimatedEq> = (args) => {
  const [showPanel, setShowPanel] = useState('Search');
  return (
    <MockProvider>
      <TopBar />
      <div className="flex flex-row relative h-[100vh] w-[100vw]">
        <Slide
          mountOnEnter
          unmountOnExit
          appear={showPanel === 'Search'}
          in={showPanel === 'Search'}
          direction="right"
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <MobileSearch compoundQuery={compoundQuery} />
          </div>
        </Slide>
        <Slide
          mountOnEnter
          unmountOnExit
          in={showPanel === 'Results'}
          direction="left"
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'red',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            Results
            <Button onClick={() => navigator.share({
              text: 'Playlist Title',
              title: 'Text vs Title?',
              url: window.location.href
            })}>Share</Button>
          </div>
        </Slide>
        <Slide
          mountOnEnter
          unmountOnExit
          in={showPanel === 'Playlist'}
          direction="right"
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'green',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            Playlist
          </div>
        </Slide>
        <Fade in={showPanel === 'Player'}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'yellow',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            Player
          </div>
        </Fade>
      </div>
      <MobileNavbar onNav={(newLoc) => setShowPanel(newLoc)} />
    </MockProvider>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
