import { useIsMobile } from 'libraries/window';
import { useMemo } from 'react';

export const useIconSize = () => {
  const isMobile = useIsMobile();
  const iconSize = useMemo(() => (isMobile ? 135 : 275), [isMobile]);

  return iconSize;
};
