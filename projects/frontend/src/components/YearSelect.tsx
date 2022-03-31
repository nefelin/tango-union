import React from 'react';
import Creatable, { CreatableProps } from 'react-select/creatable';
import { Option } from 'react-select/src/filters';

interface Props {
  onChange: CreatableProps<Option, true, any>['onChange'];
  value: ReadonlyArray<Option>;
}

const YearSelect = ({ value, onChange }: Props) => (
  <Creatable
    placeholder="Years"
    isValidNewOption={(e) => {
      const match = e.match(validYearTerms);
      return match?.[0] === e;
    }}
    isMulti
    isClearable
    value={value}
    onChange={onChange}
    formatCreateLabel={(yearTerm) => createTermFromYearSearch(yearTerm)}
    noOptionsMessage={() => 'Valid year formats: 1948, 48, 40s, 45-47'}
  />
);

const createTermFromYearSearch = (yearTerm: string) => {
  if (yearTerm.includes('s')) {
    return `Search the ${yearTerm}`;
  } else if (yearTerm.includes('-')) {
    return `Search the period ${yearTerm.replace(
      /(^|-)(\d\d)(?!\d)/g,
      '$119$2',
    )}`;
  } else if (yearTerm.length === 2) {
    return `Search the year 19${yearTerm}`;
  } else {
    return `Search the year ${yearTerm}`;
  }
};

const validYearTerms = /((?:\d\d\d\d|\d\d)-(?:\d\d\d\d|\d\d)|\d0s|(?:\d\d\d\d|\d\d))/gi;
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
