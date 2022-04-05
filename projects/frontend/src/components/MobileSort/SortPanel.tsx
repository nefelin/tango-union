import { ExpandMore, RestartAlt } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import IconSpacer from '../MobileMoreMenu/IconSpacer';
import { useSortState } from '../ResultsTable/state/sort.state';
import { SortState } from '../ResultsTable/types/sortState';
import SortRow from './SortRow';

const SortPanel = () => {
  const { sort, setSort } = useSortState();
  const [tempSortState, setTempSortState] = useState<SortState>(sort);

  useEffect(() => setTempSortState(sort), [sort]);

  const handleClose = () => {
    setSort(tempSortState);
    reactiveMoreState(null);
  };

  const handleReset = () => {
    setTempSortState({});
  };

  const handleSortToggle = (fieldName: string) => () => {
    setTempSortState((prev) => {
      switch (prev[fieldName]) {
        case null:
        case undefined:
          return { ...prev, [fieldName]: 'desc' };
        case 'desc':
          return { ...prev, [fieldName]: 'asc' };
        case 'asc':
          return { ...prev, [fieldName]: null };
      }
    });
  };

  return (
    <>
      <MenuItem onClick={handleClose}>
        <ExpandMore />
      </MenuItem>
      <SortRow
        value={tempSortState['title']}
        onClick={handleSortToggle('title')}
        text={'Title'}
      />
      <SortRow
        value={tempSortState['orchestra']}
        onClick={handleSortToggle('orchestra')}
        text={'Orchestra'}
      />
      <SortRow
        value={tempSortState['singer']}
        onClick={handleSortToggle('singer')}
        text={'Singer'}
      />
      <SortRow
        value={tempSortState['year']}
        onClick={handleSortToggle('year')}
        text={'Year'}
      />
      <SortRow
        value={tempSortState['genre']}
        onClick={handleSortToggle('genre')}
        text={'Genre'}
      />
      <SortRow
        value={tempSortState['linkScore']}
        onClick={handleSortToggle('linkScore')}
        text={'Link Rating'}
      />
      <MenuItem onClick={handleReset}>
        <div className="flex justify-center">
          <IconSpacer>
            <RestartAlt />
          </IconSpacer>
          Reset Filters
        </div>
      </MenuItem>
    </>
  );
};

export default SortPanel;
