import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormik } from 'formik';
import * as r from 'ramda';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { FormatOptionLabelMeta, OptionsType } from 'react-select';
import { Option } from 'react-select/src/filters';
// @ts-ignore
import Select from 'react-select-virtualized';
import styled from 'styled-components';

import { store } from '../../context/store';
import { CategorySummary } from '../../indexer/categoryIndex';
import { cleanSlop } from '../../indexer/fuzzyIndex';
import { CompoundSearchOpts } from '../../indexer/indexer';
import { Maybe } from '../../shared/types';
import { Barely } from '../../types/barely';

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  justify-content: flex-end;
  margin-right: 20px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputSpacer = styled.div`
  margin-bottom: 20px;
`;

const StyledInputLabel = styled(InputLabel)`
  margin-bottom: 5px;
`;

export interface SearchbarState {
  orchestra: Maybe<Option[]>;
  singer: Maybe<Option[]>;
  genre: Maybe<Option[]>;
  search: string;
}

export const compoundSearchOptsFromSearchbarState = (
  state: SearchbarState,
): CompoundSearchOpts => {
  console.log({ state });
  return {
    optionsQuery: {
      orchestra: state.orchestra?.length
        ? state.orchestra.map(({ value }) => value)
        : undefined,
      singer: state.singer?.length ? state.singer.map(({ value }) => value) : undefined,
      genre: state.genre?.length ? state.genre.map(({ value }) => value) : undefined,
    },
    searchQuery: state.search.length ? state.search : undefined,
  };
};

export const initState: SearchbarState = {
  search: '',
  orchestra: [],
  singer: [],
  genre: [],
};

export const Searchbar = () => {
  const { selectOptions, dispatch, searchbarState } = useContext(store);

  const formik = useFormik<SearchbarState>({
    initialValues: searchbarState,
    onSubmit: (values) => console.log({ values }),
  });

  const { values } = formik;
  useEffect(() => {
    dispatch({ type: 'setSearch', criteria: values });
  }, [values]);

  if (!selectOptions) {
    return <div>Searchbar encountered error loading selectOptions</div>;
  }

  return (
    <StyledRow>
      <StyledCol>
        <InputSpacer>
          <StyledInputLabel htmlFor="search">Search</StyledInputLabel>
          <Input
            id="search"
            onChange={formik.handleChange}
            value={formik.values.search}
          />
        </InputSpacer>
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.orchestra || []}
          id={'orchestra'}
          label={'Orchestra'}
          selectOptions={selectOptions.orchestra}
        />
      </StyledCol>
      <StyledCol>
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.singer || []}
          id={'singer'}
          label={'Singer'}
          selectOptions={selectOptions.singer}
        />
      </StyledCol>
      <StyledCol>
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.genre || []}
          id={'genre'}
          label={'Genre'}
          selectOptions={selectOptions.genre}
        />
      </StyledCol>
    </StyledRow>
  );
};

interface SelectProps {
  id: string;
  label: string;
  value: Option[];
  setter: (field: string, value: Barely<OptionsType<Option>>) => {};
  selectOptions: CategorySummary;
}

const CustomSelect = ({ selectOptions, id, label, setter, value }: SelectProps) => {
  const options = optionsFromSelectOptions(selectOptions, value);

  return (
    <>
      <StyledInputLabel htmlFor={id}>{label}</StyledInputLabel>
      <Select
        isClearable
        isSearchable
        isMulti
        filterOption={customSearch}
        value={value}
        inputId={id}
        onChange={(newVal: Option) => {
          console.log(newVal);
          if (newVal) setter(id, [...value, newVal]);
        }}
        options={options}
        formatOptionLabel={formatOptionLabel}
        closeMenuOnSelect={false}
      />
    </>
  );
};

const customSearch = (option: Option, searchString: string) =>
  cleanSlop(option.value).indexOf(cleanSlop(searchString)) !== -1;

const optionsFromSelectOptions = (op: CategorySummary, value: Option[]) =>
  r.pipe<
    CategorySummary,
    [string, number][],
    [string, number][],
    Option[],
    Option[],
    Option[]
  >(
    r.toPairs,
    r.reject(([_, count]) => count === 0),
    r.map(([name, count]) => ({
      label: name, //`${name} ${value.length === 0 ? `(+${count})` : ""}`,
      value: name,
      data: count,
    })),
    r.sortBy(r.prop('data')),
    r.reverse,
  )(op);

const formatOptionLabel = (
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

const StyledCount = styled.div`
  color: grey;
  font-size: 10px;
`;

const StyledMenuOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
