import * as r from 'ramda';
import { ColumnShape } from 'react-base-table';
import { OptionsType } from 'react-select';
import { Option } from 'react-select/src/filters';

import { CompoundSortInput, SimpleTrack } from '../../../../generated/graphql';
import { Barely } from '../../../types';
import { SearchbarState } from '../../Searchbar/types';

export const timeStringFromSeconds = (secondsTotal: number) => {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const searchStateFromTrack = (track: SimpleTrack): SearchbarState => {
  const yearWindow = 1;
  const yearTerm =
    typeof track.year === 'number'
      ? `${track.year - yearWindow}-${track.year + yearWindow}`
      : '';

  return {
    text: yearTerm,
    orchestras: track.orchestra,
    singers: track.singer,
    genres: track.genre ? [track.genre] : null,
  };
};

export const optionsFromStrings = (names: Barely<Array<string>>) =>
  names?.map((name) => ({
    label: name,
    value: name,
    data: name,
  })) ?? [];

export const stringsFromOptions = (options: Barely<OptionsType<Option>>) =>
  options?.map(({ label }) => label);

export const tableSortFromSearchbarSort = (
  sort: Barely<CompoundSortInput>,
): ColumnShape['sortState'] =>
  r.mapObjIndexed((val) => {
    switch (val) {
      case -1:
        return 'DESC';
      case 1:
        return 'ASC';
      default:
        return undefined;
    }
  }, sort || {});
