import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useState } from 'react';

import { CompoundQueryInput, SelectIndexCount } from '../../generated/graphql';
import { Datum } from './BarGraph/types';
import MobileBarGraph from './MobileBarGraph';
import { optionsFromStrings } from './ResultsTable/ResultsTableBody/util';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import { SearchbarState } from './Searchbar/types';
import TopBar from './TopBar';
import YearSelect from './YearSelect';

interface Props {
  selectOptions: SelectIndexCount;
}

const MobileSearch = ({ selectOptions }: Props) => {
  const [dummyYears, setDummyYears] = useState(randomData(10));
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
            <YearSelect onChange={() => setDummyYears(randomData(10))} />
          </div>
          <div className="h-[25vh] my-4">
            <MobileBarGraph data={dummyYears} />
          </div>
        </div>
      </div>
    </div>
  );
};

const randomData = (len: number): Array<Datum<number>> =>
  Array.from(Array(len), (x, i) => ({
    label: ((i * 10).toString() + `'s`).padStart(4, '0'),
    value: Math.floor(Math.random() * 100),
  }));

export default MobileSearch;
