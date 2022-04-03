import { makeVar, useReactiveVar } from '@apollo/client';

import { CompactTrack } from '../../types/compactTrack/types';
import { compactTrackFromTrackId } from '../../types/compactTrack/util';
import { Maybe } from '../../types/utility/maybe';

type SongSource = 'playlist' | 'results';

interface MoreState {
  track: CompactTrack;
  songSource: SongSource;
}

export const fallbackMoreState: MoreState = {
  track: compactTrackFromTrackId('0'),
  songSource: 'playlist',
};

export const reactiveMoreState = makeVar<Maybe<MoreState>>(null);
