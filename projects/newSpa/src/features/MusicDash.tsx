import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import type { FullCountFragmentFragment } from '../../generated/graphql';
import { useCompoundQueryQuery } from '../../generated/graphql';
import ResultsTable from '../components/ResultsTable';
import Searchbar from '../components/Searchbar';
import reactiveSearchbarState from '../components/Searchbar/searchbarState';
import { initSearchbarState } from '../components/Searchbar/types';
import { compoundSearchOptsFromSearchbarState } from '../components/Searchbar/util';

const emptyOptions: FullCountFragmentFragment['counts'] = {
  singer: [],
  orchestra: [],
  genre: [],
};

const MusicDash = () => {
  const [options, setOptions] = useState(emptyOptions);
  const searchState = useReactiveVar(reactiveSearchbarState);
  const [debouncedSearchState] = useDebounce(searchState, 300);
  const [page, setPage] = useState(0);

  const pageSize = 40;
  const pagination = { offset: 0, limit: pageSize * (page + 1) };

  const { data, error, loading } = useCompoundQueryQuery({
    variables: {
      criteria: {
        ...compoundSearchOptsFromSearchbarState(debouncedSearchState),
        pagination,
      },
    },
  });

  useEffect(() => {
    if (data?.compoundQuery.counts) {
      setOptions(data.compoundQuery.counts);
    }
  }, [data?.compoundQuery]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearchState]);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div>
      Dashboard
      <Searchbar selectOptions={options} />
      <ResultsTable
        ids={data?.compoundQuery.ids}
        loading={loading}
        incPage={() => setPage((prev) => prev + 1)}
        page={page}
      />
    </div>
  );
};

export default MusicDash;

// function useTraceUpdate(props: any) {
//   const prev = useRef(props);
//   useEffect(() => {
//     const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
//       if (prev.current[k] !== v) {
//         ps[k] = [prev.current[k], v];
//       }
//       return ps;
//     }, {});
//     if (Object.keys(changedProps).length > 0) {
//       console.log('Changed props:', changedProps);
//     }
//     prev.current = props;
//   });
// }
