import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const SHOWN_COOOKIE_NAME = 'shown_mobilesearch_helptext';
const SearchIntroModal = () => {
  const [cookies, setCookie] = useCookies([SHOWN_COOOKIE_NAME]);
  const shown = JSON.parse(cookies[SHOWN_COOOKIE_NAME] || 'false');

  const handleClose = () => {
    setCookie(SHOWN_COOOKIE_NAME, 'true')
  };

  return !shown ? (
    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 p-6 z-10 text-xs">
      <Alert severity="info" onClose={handleClose}>
        <p className="mb-2">
          Welcome to <strong>Tango Union!</strong> Tango Union is a tool for
          exploring and sharing Argentine Tango music in new ways.
        </p>
        <p className="mb-2">
          When you select search criteria, your options for other criteria
          change in interesting ways. So if you pick D&apos;Arienzo for your
          orchestra, the singers search now lets you search singers that
          recorded with D&apos;Arienzo, ordered by number of tracks they share.
        </p>
        <p className="mb-2">
          You can use this restriction mechanic to do all sorts of things.
          For example, if you filter that D&apos;Arienzo search by years 28-35.
          Now when you look at singers, you can see who sang with D&apos;Arienzo
          during that period.
        </p>
        {/*<p className="mb-2">*/}
        {/*  When you search for two of the same thing, that is an or. So for*/}
        {/*  example you might search for D&apos;Arienzo and Canaro in the 40s.*/}
        {/*  Singers available will be any who recorded with either orchestra*/}
        {/*  during that time period.*/}
        {/*</p>*/}
        <p className="mb-2">
          You can also easily share anything you find on Tango Union. From
          individual songs to playlists to interesting searches. Take a look at
          the more menus in Results and Playlist.
        </p>
        <p className="mb-2">Enjoy!</p>
      </Alert>
    </div>
  ) : null;
};

export default SearchIntroModal;
