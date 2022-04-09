import { useNavigate } from 'react-router';

import { useRoutedState } from './state/useRoutedState';

const useNavigateWithParamState = () => {
  const navigate = useNavigate();
  const { panel, tracks, search } = useRoutedState();

  const params = JSON.stringify({
    search,
    tracks,
    panel,
  });
  return (newPath: string) => navigate([newPath, params].join('/'));
};

export default useNavigateWithParamState;
