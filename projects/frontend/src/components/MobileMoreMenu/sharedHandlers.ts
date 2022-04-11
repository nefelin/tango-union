import { SnackbarMessage } from '../../hooks/useSnackbars';
import { CompactTrack } from '../../types/compactTrack/types';
import { Unary } from '../../types/utility/unary';
import { smartShare } from '../../util/smartShare';
import { urlTrackParams } from '../../util/urlParams';
import { PanelOption } from '../MobileNavbar';

export const handleShare =
  ({
    closeMore,
    addSnack,
    params,
    rootPath = '',
  }: {
    addSnack: Unary<SnackbarMessage>;
    closeMore: VoidFunction;
    params: string;
    rootPath?: string;
  }) =>
  () => {
    const url = `https://tangounion.net/${rootPath}${params}`;

    smartShare({
      url,
      onClipboardCopy: () =>
        addSnack({ content: 'Link copied to clipboard', severity: 'info' }),
      onError: () =>
        addSnack({
          content: 'Error sharing link',
          severity: 'error',
        }),
    }).then(() =>
      addSnack({
        content: 'Link shared!',
        severity: 'success',
      }),
    );

    closeMore();
  };

export const handleSearchSimilar =
  ({
    closeMore,
    track,
    searchFromIds,
    addSnack,
  }: {
    closeMore: VoidFunction;
    track: CompactTrack;
    searchFromIds: Unary<Array<CompactTrack>>;
    addSnack: Unary<SnackbarMessage>;
  }) =>
  () => {
    searchFromIds([track]);
    addSnack({ severity: 'info', content: 'Search filters updated' });
    closeMore();
  };

export const composeShareSongParams = (track: CompactTrack): string => {
  const tracks = urlTrackParams([track]);
  const panel: PanelOption = 'playlist';
  const player = true;

  return JSON.stringify({ ...tracks, panel, player });
};

export const composeSharePlaylistParams = (
  tracksToShare: Array<CompactTrack>,
): string => {
  const tracks = urlTrackParams(tracksToShare);
  const panel = { panel: 'playlist' };

  return JSON.stringify({ ...tracks, ...panel });
};
