import { Reply } from '@mui/icons-material';
import { Alert, Snackbar, Tooltip } from '@mui/material';
import React, { useState } from 'react';

const ShareHeader = () => {
  const [snackOpen, setSnackOpen] = useState(false);

  const copyLink = () => {
    const playlistHref = window.location.href.replace('player', 'playlist');
    navigator.clipboard.writeText(playlistHref);
    setSnackOpen(true);
  };

  const handleClose = () => setSnackOpen(false);

  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={handleClose}>
          Playlist Link Copied to Clipboard!
        </Alert>
      </Snackbar>
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
