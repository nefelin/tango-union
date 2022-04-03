import { SearchbarState } from '../components/Searchbar/types';
import { CompactTrack } from '../types/compactTrack/types';
import { compoundIdStringFromCompactTrack } from '../types/compactTrack/util';

export const urlSearchParams = (state: SearchbarState) => ({search: state});
export const urlTrackParams = (tracks: Array<CompactTrack>) => ({tracks: tracks.map(compoundIdStringFromCompactTrack)});
