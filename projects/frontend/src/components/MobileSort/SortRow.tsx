import { ArrowDropDown, ArrowDropUp, ArrowRight } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import React from 'react';
import { SortOrder } from 'react-base-table';

import { Maybe } from '../../types/utility/maybe';

interface Props {
  text: string;
  value: Maybe<SortOrder>;
  onClick: VoidFunction;
}

const SortRow = ({ onClick, text, value }: Props) => {
  let sortIcon = <ArrowRight />;

  if (value === 'asc') {
    sortIcon = <ArrowDropUp />;
  } else if (value === 'desc') {
    sortIcon = <ArrowDropDown />;
  }

  return (
    <div>
      <MenuItem onClick={onClick}>
        <div className="flex justify-between items-center w-full">
          <div>{text}</div>
          {sortIcon}
        </div>
      </MenuItem>
    </div>
  );
};

export default SortRow;
