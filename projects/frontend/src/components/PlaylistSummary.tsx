import { sum } from 'ramda';
import React from 'react';

import { capitalizeFirstLetter } from '../util/capitalizeFirst';
import {
  PlaylistSummaryInterface,
  SmartPlaylistSummary,
} from './PlaylistSummary/summarize';

interface Props {
  summary: SmartPlaylistSummary;
}

const PlaylistSummary = ({
  summary: { orchestras, singers, years, genres, dominantCategory },
}: Props) => {
  const genreString = genres.map(capitalizeFirstLetter).join(', ');
  const yearString = years.map(capitalizeFirstLetter).join(', ');

  let [headline, subOne, subTwo] = [
    orchestras.join(', '),
    `${yearString} - ${genreString} `,
    singers.join(', '),
  ];

  switch (dominantCategory) {
    case 'orchestras':
      break;
    case 'singers':
      [headline, subOne, subTwo] = [
        singers.join(', '),
        orchestras.join(', '),
        `${yearString} - ${genreString} `,
      ];
      break;
    case 'years':
      [headline, subOne, subTwo] = [
        `${yearString} - ${genreString} `,
        orchestras.join(', '),
        singers.join(', '),
      ];
      break;
    case 'genres':
      [headline, subOne, subTwo] = [
        `${capitalizeFirstLetter(genres.join(', '))} - ${yearString}`,
        orchestras.join(', '),
        singers.join(', '),
      ];
      break;
  }

  return (
    <>
      <div className="truncate">{headline}</div>
      <div className="text-xs text-gray-600 truncate">{subOne}</div>
      <div className="text-xs text-gray-600 truncate">{subTwo}</div>
    </>
  );
};

export default PlaylistSummary;
