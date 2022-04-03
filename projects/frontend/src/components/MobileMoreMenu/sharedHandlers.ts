import { SnackbarMessage } from '../../hooks/useSnackbars';
import { CompactTrack } from '../../types/compactTrack/types';
import { Unary } from '../../types/utility/unary';
import { smartShare } from '../../util/smartShare';
import { urlTrackParams } from '../../util/urlParams';

export const handleShare =
  ({
    closeMore,
    addSnack,
    params,
    rootPath = 'playlist/', // most uses are for playlists
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
    });

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
