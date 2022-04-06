import React from 'react';

import { SmartPlaylistSummary } from './PlaylistSummary/summarize';
import textualizeSmartSummary from './PlaylistSummary/textualizeSmartSummary';

interface Props {
  summary: SmartPlaylistSummary;
}

const PlaylistSummary = ({ summary }: Props) => {
  const [headline, subOne, subTwo] = textualizeSmartSummary(summary);
  return (
    <>
      <div className="truncate">{headline}</div>
      <div className="text-xs text-gray-600 truncate">{subOne}</div>
      <div className="text-xs text-gray-600 truncate">{subTwo}</div>
    </>
  );
};

export default PlaylistSummary;
