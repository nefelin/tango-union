import { useHistory, useParams } from 'react-router';

interface RoutedTracklistHook {
  tracks: Array<number>;
  addTrack: (id: number) => void;
  removeTrack: (id: number) => void;
  replaceTracks: (ids: Array<number>) => void;
  // moveTrack: (id: number, newIndex: number) => void;
}

export const useRoutedTrackList = (
): RoutedTracklistHook => {
  const history = useHistory();
  const params = useParams<{ trackList?: string }>();

  const tracks: Array<number> =
    params.trackList
      ?.split(',')
      .map((num) => parseInt(num, 10))
      .filter((x) => !Number.isNaN(x)) ?? [];

  const updateRouteParam = (newParam: string) => {
    history.replace(`/player/${newParam}`);
  };

  const addTrack = (newId: number) => {
    const stringId = newId.toString();
    const newList = params.trackList?.concat(',', stringId) ?? stringId;
    updateRouteParam(newList);
  };

  const removeTrack = (id: number) => {
    const newList = tracks.filter((listId) => listId !== id).join(',');
    updateRouteParam(newList);
  };

  const replaceTracks = (ids: Array<number>) => {
    updateRouteParam(ids.map((id) => id.toString()).join(','));
  };

  return {
    addTrack,
    tracks,
    removeTrack,
    // removeIndex <-- FixME
    replaceTracks,
  };
};