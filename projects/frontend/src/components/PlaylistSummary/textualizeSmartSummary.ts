import { capitalizeFirstLetter } from '../../util/capitalizeFirst';
import { SmartPlaylistSummary } from './summarize';

const textualizeSmartSummary = ({ orchestras, singers, years, genres, dominantCategory }: SmartPlaylistSummary) => {
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

  return [headline, subOne, subTwo];
}

export default textualizeSmartSummary;