import * as React from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { AutoSizer, List } from 'react-virtualized';

import { Option } from '../../types/option';
import { Barely } from '../../types/utility/barely';
import { stringsFromOptions } from '../ResultsTable/ResultsTableBody/util';
import {
  customSearch,
  formatOptionLabel,
  MemberCountList,
  optionsFromSelectOptions,
} from './util';

const makeMenuList =
  (width: number, optionCount: number) =>
  ({ children }) => {
    const rows = children || [];
    const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => (
      <div key={key} style={style}>
        {rows[index]}
      </div>
    );

    const height = Math.min(optionCount * 30, 300);

    return (
      <List
        style={{ width: '100%' }}
        width={width}
        height={height}
        rowHeight={30}
        rowCount={optionCount}
        rowRenderer={rowRenderer}
      />
    );
  };
interface Props {
  id: string;
  label: string;
  value: Array<Option>;
  setter: (field: string, value: Barely<Array<string>>) => void;
  selectOptions: MemberCountList;
}
// type SelectState = { label: string; value: string; data: any };

const CustomSelect = ({ selectOptions, id, label, setter, value }: Props) => {
  const [selection, setSelection] = useState<ReadonlyArray<Option>>(value);

  useEffect(() => {
    setSelection(value);
  }, [value]);

  const options = optionsFromSelectOptions(selectOptions, value);

  const handleDispatchState = (newState?: ReadonlyArray<Option>) =>
  {
    setter(id, stringsFromOptions(newState || selection));
  }

  return (
    <AutoSizer style={{ width: '100%', height: '100%' }}>
      {({ width, height }) => {
        return (
          <Select
            components={{
              MenuList: makeMenuList(width, options.length - selection.length),
            }}
            placeholder={label}
            isClearable
            isSearchable
            isMulti
            filterOption={customSearch as any}
            onChange={handleDispatchState}
            value={selection}
            inputId={id}
            options={options}
            formatOptionLabel={formatOptionLabel}
            closeMenuOnSelect
          />
        );
      }}
    </AutoSizer>
  );
};

export default CustomSelect;
