import React from 'react';
import Creatable, { CreatableProps } from 'react-select/creatable';
import { Option } from 'react-select/src/filters';

interface Props {
  onChange: CreatableProps<Option, true, any>['onChange'];
}

const YearSelect = ({ onChange }: Props) => (
  <Creatable
    placeholder="Years (e.g. 1948, 48, 40s, 45-47)"
    isValidNewOption={(e) => {
      const match = e.match(validYearTerms);
      return match?.[0] === e;
    }}
    isMulti
    isClearable
    onChange={onChange}
    options={defaultYearOptions}
    formatCreateLabel={(yearTerm) => createTermFromYearSearch(yearTerm)}
  />
);

const createTermFromYearSearch = (yearTerm: string) => {
  if (yearTerm.includes('s')) {
    return `Search the ${yearTerm}`;
  } else if (yearTerm.includes('-')) {
    return `Search the period ${yearTerm.replace(/(^|-)(\d\d)(?!\d)/g, '$119$2')}`;
  } else if (yearTerm.length === 2) {
    return `Search the year 19${yearTerm}`;
  } else {
    return `Search the year ${yearTerm}`;
  }
};

const validYearTerms =
  /(\d{2,4}-\d{2,4}|\d{2}s|\d{2,4})/gi;
const defaultYearOptions: ReadonlyArray<Option> = Array.from(
  Array(10),
  (_, i) => {
    const val = i + '0s';
    return {
      label: val,
      value: val,
      data: val,
    };
  },
);

export default YearSelect;
