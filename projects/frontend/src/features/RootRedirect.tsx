import React, { useEffect } from 'react';

import useNavigateWithParamState from '../hooks/useNavigateWithParamState';
import { useIsMobile } from '../util/isMobile';

const RootRedirect = () => {
  const isMobile = useIsMobile();
  const paramNavigate = useNavigateWithParamState();

  useEffect(() => {
    if (isMobile) {
      paramNavigate('/mobile');
    } else {
      paramNavigate('/desktop');
    }
  }, [isMobile]);

  return <div></div>
}

export default RootRedirect;