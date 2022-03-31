import React from 'react';

const StandaloneFraming: React.FunctionComponent = ({ children }) => (
  <div className="rounded border-black md:max-w-md w-full shadow-xl m-auto">
    {children}
  </div>
);

export default StandaloneFraming;
