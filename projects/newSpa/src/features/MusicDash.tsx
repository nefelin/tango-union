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
  const [debouncedSearchState] = useDebounce(searchState, 300);

  const { data, error } = useCompoundQueryQuery({
    variables: { criteria: compoundSearchOptsFromSearchbarState(debouncedSearchState) },
  });

  useEffect(() => {
    setOptions(data?.compoundQuery.counts ?? emptyOptions);
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
      <SongTable trackIds={data?.compoundQuery.trackIds}/>
    </div>
  );
};

export default MusicDash;
