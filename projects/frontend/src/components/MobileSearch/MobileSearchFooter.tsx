import { Button } from '@mui/material';
import React from 'react';

import { useSearchbarState } from '../../hooks/state/useSearchbarState';

interface Props {
  count: number;
  onClear: VoidFunction;
}
const MobileSearchFooter = ({ count, onClear }: Props) => {
  const { resetSearchbar } = useSearchbarState();
  const content =
    count === 0 ? (
      <>
        No results match you filters
        <Button size="small" onClick={resetSearchbar}>
          Clear Search
        </Button>
      </>
    ) : (
      `Found ${count} matching results`
    );

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 text-xs font-bold">
      {content}
    </div>
  );
};

export default MobileSearchFooter;
