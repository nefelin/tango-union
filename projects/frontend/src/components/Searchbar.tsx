import { useDroppable } from '@dnd-kit/core';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';

import { FullCountFragmentFragment } from '../../generated/graphql';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { optionsFromStrings } from './ResultsTable/ResultsTableBody/util';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import { StyledCol, StyledRow } from './Searchbar/styles';
import { SearchbarState } from './Searchbar/types';

interface Props {
  selectOptions: FullCountFragmentFragment['counts'];
}

const Searchbar = ({ selectOptions }: Props) => {
  const { setNodeRef } = useDroppable({ id: 'searchbar' });
  const { setSearchbarState, searchbarState, resetSearchbar } =
    useSearchbarState();

  const formik = useFormik<SearchbarState>({
    initialValues: searchbarState,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { values } = formik;

  const handleClearTextSearch = () => {
    setSearchbarState({ ...searchbarState, text: '' });
  };

  useEffect(() => {
    setSearchbarState(values);
  }, [values]);

  if (!selectOptions) {
    return <div>Searchbar encountered error loading selectOptions</div>;
  }

  return (
    <StyledCol ref={setNodeRef}>
      <StyledRow>
        <CustomInput
          onChange={formik.handleChange}
          value={formik.values.text || ''}
          onClear={handleClearTextSearch}
        />
        <Button
          size="small"
          variant="outlined"
          color="primary"
          type="button"
          onClick={resetSearchbar}
        >
          Clear All Criteria
        </Button>
      </StyledRow>
      <StyledRow>
        <CustomSelect
          setter={formik.setFieldValue}
          value={optionsFromStrings(formik.values.orchestras)}
          id="orchestras"
          label="Orchestras"
          selectOptions={selectOptions.orchestra}
        />
        <CustomSelect
          setter={formik.setFieldValue}
          value={optionsFromStrings(formik.values.singers)}
          id="singers"
          label="Singers"
          selectOptions={selectOptions.singer}
        />
        <CustomSelect
          setter={formik.setFieldValue}
          value={optionsFromStrings(formik.values.genres)}
          id="genres"
          label="Genres"
          selectOptions={selectOptions.genre}
        />
      </StyledRow>
    </StyledCol>
  );
};

export default Searchbar;
