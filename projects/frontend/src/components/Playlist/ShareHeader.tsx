import { Snackbar, Tooltip } from '@material-ui/core';
import { Reply } from '@material-ui/icons';
import React, { useState } from 'react';

const ShareHeader = () => {
  const [snackOpen, setSnackOpen] = useState(false);

  const copyLink = () => {
    const playlistHref = window.location.href.replace('player', 'playlist');
    navigator.clipboard.writeText(playlistHref);
    setSnackOpen(true)
  };

  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        message={'Playlist Link Copied to Clipboard!'}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      />
      <Tooltip title="Copy shareable link to clipboard">
        <div
          role="button"
          tabIndex={0}
          onClick={copyLink}
          onKeyDown={copyLink}
          style={{
            borderRadius: '2px',
            cursor: 'pointer',
            backgroundColor: 'inherit',
          }}
        >
          <Reply />
        </div>
      </Tooltip>
    </>
  );
};
export default ShareHeader;
