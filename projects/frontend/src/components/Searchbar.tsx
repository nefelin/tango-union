import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';

import { FullCountFragmentFragment } from '../../generated/graphql';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import BarGraph from './BarGraph/BarGraph';
import { useDroppable } from './DragNDrop/hooks/useDroppable';
import { optionsFromStrings } from './ResultsTable/ResultsTableBody/util';
import CustomInput from './Searchbar/CustomInput';
import CustomSelect from './Searchbar/CustomSelect';
import { StyledCol, StyledRow } from './Searchbar/styles';
import { SearchbarState } from './Searchbar/types';
import { YearParser } from './Searchbar/yearParser/yearParser';
import yearTableDataFromCompoundQueryCounts from './Searchbar/yearTableDataFromCompoundQueryCounts';

interface Props {
  selectOptions: FullCountFragmentFragment['counts'];
}

export const SEARCHBAR_DROPPABLE_ID = 'search';

const Searchbar = ({ selectOptions }: Props) => {
  const { listeners } = useDroppable(SEARCHBAR_DROPPABLE_ID);
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
    <StyledCol {...listeners}>
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
          Clear Search
        </Button>
        <BarGraph
          selected={
            (
              new YearParser(null)
                .yearsFromSearch(searchbarState.year ?? '')
                ?.filter((x) => !!x) as Array<number>
            )?.map((num) => num.toString()) ?? []
          }
          onSelect={(years) =>
            setSearchbarState({
              ...searchbarState,
              year: years.join(','),
            })
          }
          data={yearTableDataFromCompoundQueryCounts(selectOptions.year)}
        />
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
