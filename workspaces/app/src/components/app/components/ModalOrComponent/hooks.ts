import { useEffect, useState } from 'react';

export const useIsBrowserInstagram = () => {
  const [isBrowserInstagram, setIsBrowserInstagram] = useState(false);

  useEffect(() => {
    const { navigator } = window;
    const userAgent = navigator.userAgent || navigator.vendor;
    setIsBrowserInstagram(userAgent.includes('Instagram'));
  }, []);

  return isBrowserInstagram;
};
