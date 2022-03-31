import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';

import { CompoundQueryInput, CompoundQueryQuery, SelectIndexCount } from '../../generated/graphql';
import MobileBarGraph from './MobileBarGraph';
import decadeCountFromYears from './MobileSearch/decadeCountFromYears';
import MobileSearchFooter from './MobileSearch/MobileSearchFooter';
import { optionsFromStrings } from './ResultsTable/ResultsTableBody/util';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import { SearchbarState } from './Searchbar/types';
import TopBar from './TopBar';
import YearSelect from './YearSelect';

interface Props {
  compoundQuery: CompoundQueryQuery;
}

const MobileSearch = ({ compoundQuery }: Props) => {
  const resetSearchbar = () => {};
  const handleClearTextSearch = () => {};
  const searchbarState: CompoundQueryInput = {};

  const formik = useFormik<SearchbarState>({
    initialValues: searchbarState,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const handleGraphYearSelect = (yearRoot: number) => {
    const newYearTerm = yearRoot + '0s';
    const yearTerms = formik.values.year?.split(', ') ?? [];

    const termExists = yearTerms.find((term) => term === newYearTerm);

    const combinedOrFilteredTerms = termExists
      ? yearTerms.filter((term) => term !== newYearTerm).join(', ')
      : [...yearTerms, newYearTerm].join(', ');

    formik.setFieldValue('year', combinedOrFilteredTerms);
  };

  const selectOptions = compoundQuery.compoundQuery.counts;
  const decadeData = decadeCountFromYears(selectOptions.year)

  return (
    <div>
      <TopBar />
      <div className="p-4">
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
            <MobileBarGraph
              data={decadeData}
              onSelect={handleGraphYearSelect}
            />
          </div>
        </div>
        <MobileSearchFooter count={compoundQuery.compoundQuery.totalResults} onClear={resetSearchbar} />
      </div>
    </div>
  );
};

export default MobileSearch;
