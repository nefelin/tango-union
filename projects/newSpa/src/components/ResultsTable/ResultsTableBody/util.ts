import { SimpleTrack } from '../../../../generated/graphql';
import { Barely, Maybe } from '../../../types';
import { SearchbarState } from '../../Searchbar/types';

export const timeStringFromSeconds = (secondsTotal: number) => {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const searchStateFromTrack = (track: SimpleTrack): SearchbarState => {
  const yearWindow = 2;
  const yearTerm =
    typeof track.year === 'number'
      ? `${track.year - yearWindow}-${track.year + yearWindow}`
      : '';

  return {
    search: yearTerm,
    orchestra: optionsFromStrings(track.orchestra),
    singer: optionsFromStrings(track.singer),
    genre: optionsFromStrings(track.genre ? [track.genre] : null),
    sort: {},
  };
};

const optionsFromStrings = (names: Barely<Array<string>>) =>
  names?.map((name) => ({
    label: name,
    value: name,
    data: name,
  })) ?? null;
