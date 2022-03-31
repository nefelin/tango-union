import { Button } from '@mui/material';
import React from 'react';

const Sandbox = () => {
  return (
    <div>
      <Button
        onClick={() =>
          navigator.share({
            title: 'Tango Union',
            text: "Juan D'Arienzo - Armando Laborde",
            url: window.location.href,
          })
        }
      >
        Share
      </Button>
    </div>
  );
};

export default Sandbox;
