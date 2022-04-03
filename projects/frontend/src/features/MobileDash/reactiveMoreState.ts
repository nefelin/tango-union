import { makeVar, useReactiveVar } from '@apollo/client';

import { CompactTrack } from '../../types/compactTrack/types';
import { Maybe } from '../../types/utility/maybe';

type SongSource = 'playlist' | 'results';

interface MoreState {
  track: CompactTrack;
  songSource: SongSource
}

export const reactiveMoreState = makeVar<Maybe<MoreState>>(null);

