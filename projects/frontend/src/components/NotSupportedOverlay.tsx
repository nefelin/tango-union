import { Backdrop, Paper } from '@mui/material';
import React from 'react';

const NotSupportedOverlay = ({ active }: { active: boolean }) => (
  <Backdrop
    style={{
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      backgroundColor: 'rgba(153,151,151,0.8)',
    }}
    open={active}
  >
    <Paper
      style={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '10%',
        borderRadius: 10,
        fontSize: '1em',
      }}
    >
      <span>Mobile devices and smaller screens</span>
      <span>aren&apos;t supported yet.</span>
      <span>Please visit us on a desktop browser!</span>
    </Paper>
  </Backdrop>
);

export default NotSupportedOverlay;
