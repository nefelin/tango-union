import * as React from 'react';
import type { OptionsType } from 'react-select';
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

interface Props {
  id: string;
  label: string;
  value: Array<Option>;
  setter: (field: string, value: Barely<OptionsType<Option>>) => void;
  selectOptions: MemberCountList;
}

const CustomSelect = ({ selectOptions, id, label, setter, value }: Props) => {
  const options = optionsFromSelectOptions(selectOptions, value);
  return (
    <>
      <StyledInputLabel htmlFor={id}>{label}</StyledInputLabel>
      <Select
        isClearable
        isSearchable
        isMulti
        filterOption={customSearch}
        onChange={(newState) => {
            setter(id, newState);
        }}
        value={value}
        inputId={id}
        options={options}
        formatOptionLabel={formatOptionLabel}
        closeMenuOnSelect={false}
      />
    </>
  );
};

export default CustomSelect;
