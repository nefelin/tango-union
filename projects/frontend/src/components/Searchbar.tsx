import { useReactiveVar } from '@apollo/client';
import Input from '@material-ui/core/Input';
import { Clear } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';

import { FullCountFragmentFragment } from '../../generated/graphql';
import { StyledFakeButton } from './ResultsTable/ResultsTableBody/cellRenderers/styles';
import CustomSelect from './Searchbar/CustomSelect';
import reactiveSearchbarState, {
  resetSearch,
} from './Searchbar/searchbar.state';
import {
  InputSpacer,
  StyledCol,
  StyledInputLabel,
  StyledRow,
} from './Searchbar/styles';
import { SearchbarState } from './Searchbar/types';

interface Props {
  selectOptions: FullCountFragmentFragment['counts'];
}

const Searchbar = ({ selectOptions }: Props) => {
  const searchState = useReactiveVar(reactiveSearchbarState);

  const formik = useFormik<SearchbarState>({
    initialValues: searchState,
    enableReinitialize: true,
    onSubmit: (values) => console.log({ values }),
  });

  const { values } = formik;

  const handleClearTextSearch = () => {
    reactiveSearchbarState({ ...reactiveSearchbarState(), search: '' });
  };

  useEffect(() => {
    reactiveSearchbarState(values);
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
            autoFocus
            endAdornment={
              <StyledFakeButton onClick={handleClearTextSearch}>
                <Clear color='disabled' fontSize='small'/>
              </StyledFakeButton>
            }
            id="search"
            onChange={formik.handleChange}
            value={formik.values.search}
          />
          <button type="button" onClick={resetSearch}>
            Clear Search
          </button>
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
