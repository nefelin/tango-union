import Input from '@material-ui/core/Input';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';

import type { CompoundQueryQuery, FullCountFragmentFragment } from '../../generated/graphql';
import CustomSelect from './Searchbar/CustomSelect';
import {
  InputSpacer,
  StyledCol,
  StyledInputLabel,
  StyledRow,
} from './Searchbar/styles';
import type { SearchbarState } from './Searchbar/types';

interface Props {
  selectOptions: FullCountFragmentFragment['counts'];
  onChange: (newState: SearchbarState) => void;
  searchState: SearchbarState;
}

const Searchbar = ({selectOptions, onChange, searchState}: Props) => {
  const formik = useFormik<SearchbarState>({
    initialValues: searchState,
    onSubmit: (values) => console.log({ values }),
  });

  const { values } = formik;
  useEffect(() => {
    onChange(values);
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
          id="orchestra"
          label="Orchestra"
          selectOptions={selectOptions.orchestra}
        />
      </StyledCol>
      <StyledCol>
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.singer || []}
          id="singer"
          label="Singer"
          selectOptions={selectOptions.singer}
        />
      </StyledCol>
      <StyledCol>
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.genre || []}
          id="genre"
          label="Genre"
          selectOptions={selectOptions.genre}
        />
      </StyledCol>
    </StyledRow>
  );
};

export default Searchbar;