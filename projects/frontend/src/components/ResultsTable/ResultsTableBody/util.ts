import * as r from 'ramda';
import { ColumnShape } from 'react-base-table';

import { CompoundSortInput } from '../../../../generated/graphql';
import { Option } from '../../../types/option';
import { Barely } from '../../../types/utility/barely';
import { Maybe } from '../../../types/utility/maybe';

export const timeStringFromSeconds = (secondsTotal: number) => {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const optionsFromStrings = (names: Barely<Array<string>>): Array<Option<string>> =>
  names?.map((name) => ({
    label: name,
    value: name,
    data: name,
  })) ?? [];

export const stringsFromOptions = (options: Maybe<ReadonlyArray<Option>>) =>
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
