import React, { useEffect, useState } from 'react';
import type { BaseTableProps, TableComponents } from 'react-base-table';
import BaseTable from 'react-base-table';

import type { SimpleTrack } from '../../../generated/graphql';
import StyledTableContainer from './styled';
import columns from './util';

const TableHeaderCell: TableComponents['TableHeaderCell'] = ({
  className,
  column: { title },
}) => {
  return <span className={className}>{title}</span>;
};

const ResultsTableBody = ({tracks}: {tracks: Array<SimpleTrack>}) => {
  const [loadedTracks, setLoadedTracks] = useState<Array<SimpleTrack>>([])

  useEffect(() =>{
      if (tracks.length) {
        setLoadedTracks(tracks)
      }
  }, [tracks]
  )
  const youtubeSearch = () => {
    console.log('youtube');
  };

  const handleColumnSort: BaseTableProps['onColumnSort'] = ({ key, order }) => {
    // TODO warning is mishmosh of prev state and current state a problem here?
  };

  return (
    <StyledTableContainer>
      <BaseTable
        fixed
        data={loadedTracks}
        width={1100}
        height={600}
        onEndReached={() => {
          // setLimit((prev) => prev + 30);
        }}
        onEndReachedThreshold={30}
        components={{ TableHeaderCell }}
        columns={columns(youtubeSearch)}
        // sortState={state.sortState}
        onColumnSort={handleColumnSort}
      />
    </StyledTableContainer>
  );
};

export default ResultsTableBody;