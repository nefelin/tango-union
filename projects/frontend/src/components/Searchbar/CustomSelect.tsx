import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import Select, { OptionsType, ValueType } from 'react-select';
import { Option } from 'react-select/src/filters';
import { AutoSizer, List } from 'react-virtualized';

import { Barely } from '../../types';
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
type SelectState = ValueType<{ label: string; value: string; data: any }, true>;

const CustomSelect = ({ selectOptions, id, label, setter, value }: Props) => {
  const [selection, setSelection] = useState<SelectState>(value);

  useEffect(() => {
    setSelection(value);
  }, [value]);

  const options = optionsFromSelectOptions(selectOptions, value);

  const handleDispatchState = (newState?: SelectState) =>
    setter(id, stringsFromOptions(newState || selection));

  return (
    <AutoSizer style={{ width: '100%'}} >
      {({ width, height }) => {
        return (
            <Select
              components={{ MenuList: makeMenuList(width, options.length - selection.length) }}
              placeholder={label}
              isClearable
              isSearchable
              isMulti
              filterOption={customSearch}
              onChange={(newSelection, triggeredAction) => {
                setSelection(newSelection);
                if (
                  triggeredAction.action === 'clear' ||
                  triggeredAction.action === 'remove-value'
                ) {
                  handleDispatchState(newSelection);
                }
              }}
              onMenuClose={handleDispatchState}
              onBlur={() => handleDispatchState()}
              value={selection}
              inputId={id}
              options={options}
              formatOptionLabel={formatOptionLabel}
              closeMenuOnSelect={false}
            />
        );
      }}
    </AutoSizer>
  );
};

export default CustomSelect;
