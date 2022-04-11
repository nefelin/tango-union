import { useNavigate } from 'react-router';

import { useRoutedState } from './state/useRoutedState';

const useNavigateWithParamState = () => {
  const navigate = useNavigate();
  const { panel, tracks, search, player } = useRoutedState();

  const params = JSON.stringify({
    search,
    tracks,
    panel,
    player
  });
  return (newPath: string) => navigate([newPath, params].join('/'));
};

export default useNavigateWithParamState;
