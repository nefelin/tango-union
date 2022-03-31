import React from 'react';

import YoutubePlayer from '../YoutubePlayer';

const StandaloneFraming: React.FunctionComponent = ({ children }) => (
  <div className="rounded border-black md:max-w-md w-full shadow-xl m-auto">
    {children}
    <YoutubePlayer width="100%" />
  </div>
);

export default StandaloneFraming;
