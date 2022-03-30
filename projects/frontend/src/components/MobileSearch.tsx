import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';

import { CompoundQueryInput, SelectIndexCount } from '../../generated/graphql';
import { optionsFromStrings } from './ResultsTable/ResultsTableBody/util';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import { SearchbarState } from './Searchbar/types';

interface Props {
  selectOptions: SelectIndexCount;
}

const MobileSearch = ({ selectOptions }: Props) => {
  const resetSearchbar = () => {};
  const handleClearTextSearch = () => {};
  const searchbarState: CompoundQueryInput = {};

  const formik = useFormik<SearchbarState>({
    initialValues: searchbarState,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <div>
      <div className="flex flex-row gap-2 justify-between mb-3">
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
          Clear Search
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="h-[50px]">
          <CustomSelect
            setter={formik.setFieldValue}
            value={optionsFromStrings(formik.values.orchestras)}
            id="orchestras"
            label="Orchestras"
            selectOptions={selectOptions.orchestra}
          />
        </div>
        <div className="h-[50px]">
          <CustomSelect
            setter={formik.setFieldValue}
            value={optionsFromStrings(formik.values.singers)}
            id="singers"
            label="Singers"
            selectOptions={selectOptions.singer}
          />
        </div>
        <div className="h-[50px]">
          <CustomSelect
            setter={formik.setFieldValue}
            value={optionsFromStrings(formik.values.genres)}
            id="genres"
            label="Genres"
            selectOptions={selectOptions.genre}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
