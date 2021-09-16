import { ClearAll, FindInPageOutlined } from '@material-ui/icons';
import React, { useContext } from 'react';

import { TRASH_DROPPABLE_ID } from '../../Playlist/TrashHeader';
import { SEARCHBAR_DROPPABLE_ID } from '../../Searchbar';
import { DndMonitorContext } from '../store/context';
import { Counter } from './Counter';

const DraggerSwitcher = () => {
  const {
    state: { overId },
  } = useContext(DndMonitorContext);

  switch (overId) {
    case SEARCHBAR_DROPPABLE_ID:
      return <FindInPageOutlined />;
    case TRASH_DROPPABLE_ID:
      return <ClearAll />;
    default:
      return <Counter />;
  }
};

export default DraggerSwitcher;
