import React from 'react';

import { OrchestraSummary } from './AutoPlaylistTitle/summarize';

interface Props {
  summary: OrchestraSummary;
}

const PlaylistSummary = ({ summary }: Props) => {
  return (
    <div key={summary.orchestras.join('')} className="">
      {`${summary.orchestras.join(' and ')} `}
      <div className="text-xs text-gray-600 truncate">
        {summary.years.join(', ')}
      </div>
      <div className="text-xs text-gray-600 truncate">
        {summary.singer.join(', ')}
      </div>
    </div>
  );
};

export default PlaylistSummary;
