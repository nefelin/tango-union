import * as React from 'react';
import { useEffect, useState } from 'react';

import type { FullCountFragmentFragment } from '../../generated/graphql';
import { useCompoundQueryQuery } from '../../generated/graphql';
import Searchbar from '../components/Searchbar';
import { initSearchbarState } from '../components/Searchbar/types';
import { compoundSearchOptsFromSearchbarState } from '../components/Searchbar/util';
import { useDebounce } from 'use-debounce';
import SongTable from '../components/SongTable';

const emptyOptions: FullCountFragmentFragment['counts'] = {
  singer: [],
  orchestra: [],
  genre: [],
};

const MusicDash = () => {
  const [options, setOptions] = useState(emptyOptions);
  const [searchState, setSearchState] = useState(initSearchbarState);
  const [debouncedSearchState] = useDebounce(searchState, 500);

  const { data, error } = useCompoundQueryQuery({
    variables: { criteria: compoundSearchOptsFromSearchbarState(debouncedSearchState) },
  });

  useEffect(() => {
    if (data?.compoundQuery.counts) {
      setOptions(data.compoundQuery.counts);
    }
  }, [data?.compoundQuery.counts]);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div>
      Dashboard
      <Searchbar
        selectOptions={options}
        searchState={searchState}
        onChange={(newState) => setSearchState(newState)}
      />
      <SongTable ids={data?.compoundQuery.ids}/>
    </div>
  );
};

export default MusicDash;
