import * as r from 'ramda';
import * as React from 'react';
import { FormatOptionLabelMeta } from 'react-select';
import { Option } from 'react-select/src/filters';

import { CompoundQueryInput } from '../../../generated/graphql';
import { cleanSlop } from '../../util/cleanSlop';
import { StyledCount, StyledMenuOption } from './styles';
import { SearchbarState } from './types';

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
  { context }: FormatOptionLabelMeta<Option, true>,
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

export const compoundSearchOptsFromSearchbarState = (
  state: SearchbarState,
): CompoundQueryInput => {
  console.log(state.sort)
  return {
    orchestras: state.orchestra?.length
      ? state.orchestra.map(({ value }) => value)
      : undefined,
    singers: state.singer?.length
      ? state.singer.map(({ value }) => value)
      : undefined,
    genres: state.genre?.length
      ? state.genre.map(({ value }) => value)
      : undefined,
    text: state.search.trim().length > 1 ? state.search.trim() : undefined,
    sort: r.mapObjIndexed(
      (sortOrder: 'asc' | 'desc') => (sortOrder === 'asc' ? 1 : -1),
      state.sort,
    ),
  };
};
