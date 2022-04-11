import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';

import { SelectIndexCount } from '../../generated/graphql';
import { usePaginationState } from '../hooks/state/usePaginationState';
import { asVh } from '../hooks/useViewport';
import { Unary } from '../types/utility/unary';
import MobileBarGraph from './MobileBarGraph';
import decadeCountFromYears from './MobileSearch/decadeCountFromYears';
import MobileSearchFooter from './MobileSearch/MobileSearchFooter';
import { optionsFromStrings } from './ResultsTable/ResultsTableBody/util';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import { SearchbarState } from './Searchbar/types';
import SearchIntroModal from './SearchIntroModal';
import YearSelect from './YearSelect';

export interface MobileSearchProps {
  counts: SelectIndexCount;
  setSearch: Unary<SearchbarState>;
  resetSearch: VoidFunction;
  initSearchState: SearchbarState;
}

const MobileSearch = ({
  initSearchState,
  resetSearch,
  setSearch,
  counts,
}: MobileSearchProps) => {
  const { totalResults } = usePaginationState();
  const formik = useFormik<SearchbarState>({
    initialValues: initSearchState,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { values } = formik;

  const handleClearTextSearch = () => {
    setSearch({ ...initSearchState, text: '' });
  };

  useEffect(() => {
    setSearch(values);
  }, [values]);

  const handleGraphYearSelect = (yearRoot: number) => {
    const newYearTerm = yearRoot + '0s';
    const yearTerms = formik.values.year?.split(', ') ?? [];

    const termExists = yearTerms.find((term) => term === newYearTerm);

    const combinedOrFilteredTerms = termExists
      ? yearTerms.filter((term) => term !== newYearTerm).join(', ')
      : [...yearTerms, newYearTerm].join(', ');

    formik.setFieldValue('year', combinedOrFilteredTerms);
  };

  const selectOptions = counts;
  const decadeData = decadeCountFromYears(selectOptions.year);

  return (
    <div className="p-4 pt-6 flex flex-col gap-4">
      <SearchIntroModal />
      <div className="flex flex-row gap-2 justify-between">
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
          onClick={resetSearch}
        >
          Clear
        </Button>
      </div>
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
      <YearSelect
        onChange={(e) => {
          formik.setFieldValue(
            'year',
            e.map(({ label }) => label).join(', '),
            false,
          );
        }}
        value={optionsFromStrings(
          (formik.values.year || '').split(', ').filter((s) => s.length > 0),
        )}
      />
      <div className="mt-4 mb-2" style={{height: asVh(23)}}>
        <MobileBarGraph data={decadeData} onSelect={handleGraphYearSelect} />
      </div>
      <MobileSearchFooter count={totalResults} onClear={resetSearch} />
    </div>
  );
};

export default MobileSearch;
