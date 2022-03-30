import * as r from 'ramda';
import * as React from 'react';
import { Option } from 'react-select/src/filters';

import { cleanSlop } from '../../util/cleanSlop';
import { StyledCount, StyledMenuOption } from './styles';

export const customSearch = (option: Option, searchString: string) =>
  cleanSlop(option.value).indexOf(cleanSlop(searchString)) !== -1;

export type MemberCountList = Array<{ name: string; count: number }>;

export const optionsFromSelectOptions = (
  op: MemberCountList,
  value: Array<Option>,
) =>
  r.pipe<
    MemberCountList,
    Array<[string, number]>,
    Array<[string, number]>,
    Array<Option>,
    Array<Option>,
    Array<Option>
  >(
    r.map((tupleObject) => [tupleObject.name, tupleObject.count]),
    r.reject(([_, count]) => count === 0),
    r.map(([name, count]) => ({
      label: name, // `${name} ${value.length === 0 ? `(+${count})` : ""}`,
      value: name,
      data: count,
    })),
    r.sortBy(r.prop('data')),
    r.reverse,
  )(op);

export const formatOptionLabel = (
  { label, data }: Option,
  { context }: any,
) => {
  return context === 'value' ? (
    <div>{label}</div>
  ) : (
    <StyledMenuOption>
      <div>{label}</div>
      <StyledCount>{data} results</StyledCount>
    </StyledMenuOption>
  );
};
