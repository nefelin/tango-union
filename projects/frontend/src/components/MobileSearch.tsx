import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';

import { SelectIndexCount } from '../../generated/graphql';
import { usePaginationState } from '../hooks/state/usePaginationState';
import { Unary } from '../types/utility/unary';
import MobileBarGraph from './MobileBarGraph';
import decadeCountFromYears from './MobileSearch/decadeCountFromYears';
import MobileSearchFooter from './MobileSearch/MobileSearchFooter';
import { optionsFromStrings } from './ResultsTable/ResultsTableBody/util';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import { SearchbarState } from './Searchbar/types';
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
    <div className="p-4 pt-6">
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
          onClick={resetSearch}
        >
          Clear
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
        <div className="h-[50px]">
          <YearSelect
            onChange={(e) => {
              formik.setFieldValue(
                'year',
                e.map(({ label }) => label).join(', '),
                false,
              );
            }}
            value={optionsFromStrings(
              (formik.values.year || '')
                .split(', ')
                .filter((s) => s.length > 0),
            )}
          />
        </div>
        <div className="h-[25vh] my-4">
          <MobileBarGraph data={decadeData} onSelect={handleGraphYearSelect} />
        </div>
      </div>
      <MobileSearchFooter count={totalResults} onClear={resetSearch} />
    </div>
  );
};

export default MobileSearch;
