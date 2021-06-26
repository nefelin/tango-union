import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import styled from 'styled-components';

import { SimpleTrack } from '../../../generated/graphql';
import { StyledFakeButton } from '../ResultsTable/ResultsTableBody/cellRenderers/styles';
import { playTrackId } from '../YoutubePlayer/youtubePlayer.state';

interface Props {
  track: SimpleTrack;
  dragging: boolean;
}

const DraggableTrack = ({ track, dragging }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.id.toString() });

  const conditionalTransition = dragging ? transition || '' : '';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: conditionalTransition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <SongItemStyled onDoubleClick={() => playTrackId(track.id)} key={track.id}>{track?.title}</SongItemStyled>
    </div>
  );
};

const SongItemStyled = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid antiquewhite;
  width: 100%;
  padding: 5px;
`;

export default DraggableTrack;
