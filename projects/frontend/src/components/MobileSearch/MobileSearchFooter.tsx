import { Button } from '@mui/material';
import React from 'react';

interface Props {
  count: number;
  onClear: VoidFunction;
}
const MobileSearchFooter = ({ count, onClear }: Props) => {
  const content =
    count === 0 ? (
      <>
        No results match you filters
        <Button size="small">Clear Search</Button>
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
