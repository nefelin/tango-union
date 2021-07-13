import { useReactiveVar } from '@apollo/client';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';

import { FullCountFragmentFragment } from '../../generated/graphql';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import reactiveSearchbarState, {
  resetSearch,
} from './Searchbar/searchbar.state';
import { StyledCol, StyledRow } from './Searchbar/styles';
import { SearchbarState } from './Searchbar/types';

interface Props {
  selectOptions: FullCountFragmentFragment['counts'];
}

const Searchbar = ({ selectOptions }: Props) => {
  const searchState = useReactiveVar(reactiveSearchbarState);

  const formik = useFormik<SearchbarState>({
    initialValues: searchState,
    enableReinitialize: true,
    onSubmit: () => {},
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
    <StyledCol>
      <StyledRow>
        <CustomInput
          onChange={formik.handleChange}
          value={formik.values.search}
          onClear={handleClearTextSearch}
        />
          <Button
            size="small"
            variant="outlined"
            color="primary"
            type="button"
            onClick={resetSearch}
          >
            Clear All Criteria
          </Button>
      </StyledRow>
      <StyledRow>
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.orchestra || []}
          id="orchestra"
          label="Orchestras"
          selectOptions={selectOptions.orchestra}
        />
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.singer || []}
          id="singer"
          label="Singers"
          selectOptions={selectOptions.singer}
        />
        <CustomSelect
          setter={formik.setFieldValue}
          value={formik.values.genre || []}
          id="genre"
          label="Genres"
          selectOptions={selectOptions.genre}
        />
      </StyledRow>
    </StyledCol>
  );
};

export default Searchbar;
