import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { isActivePath } from '@/shared/lib/isActivePath';

export const useActivePath = () => {
  const { pathname } = useLocation();

  const isActive = useCallback(
    (path) => isActivePath(pathname, path),
    [pathname],
  );

  return {
    pathname,
    isActive,
  };
};
