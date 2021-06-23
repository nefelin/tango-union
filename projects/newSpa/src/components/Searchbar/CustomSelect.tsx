import * as React from 'react';
import type { OptionsType, ValueType } from 'react-select';
import Select from 'react-select';
import type { Option } from 'react-select/src/filters';

import type { Barely } from '../../types';
import { StyledInputLabel } from './styles';
import type { MemberCountList } from './util';
import {
  customSearch,
  formatOptionLabel,
  optionsFromSelectOptions,
} from './util';
import { useState } from 'react';

interface Props {
  id: string;
  label: string;
  value: Array<Option>;
  setter: (field: string, value: Barely<OptionsType<Option>>) => void;
  selectOptions: MemberCountList;
}
type SelectState = ValueType<{ label: string; value: string; data: any }, true>;

const CustomSelect = ({ selectOptions, id, label, setter, value }: Props) => {
  const [selection, setSelection] =
    useState<SelectState>(
      value,
    );
  const options = optionsFromSelectOptions(selectOptions, value);

  const handleDispatchState = (newState?: SelectState) => setter(id, newState || selection);

  return (
    <>
      <StyledInputLabel htmlFor={id}>{label}</StyledInputLabel>
      <Select
        isClearable
        isSearchable
        isMulti
        filterOption={customSearch}
        onChange={(newSelection, triggeredAction) => {
          setSelection(newSelection);
          console.log(triggeredAction)
          if (triggeredAction.action === 'clear' || triggeredAction.action === 'remove-value') {
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
    </>
  );
};

export default CustomSelect;
