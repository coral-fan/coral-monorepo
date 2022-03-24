import { useIsDesktop } from 'libraries/window';
import { useMemo } from 'react';

export const useIconSize = () => {
  const isDesktop = useIsDesktop();
  const iconSize = useMemo(() => (isDesktop ? 275 : 175), [isDesktop]);

  return iconSize;
};
