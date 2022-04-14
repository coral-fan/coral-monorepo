import { getIsNetworkSupported$ } from './observables';
import { useObservable } from 'libraries/utils/hooks';
import { isMetaMaskInjected as getIsMetaMaskInjected } from './utils';
import { useEffect, useState } from 'react';

export const useIsNetworkSupported = () =>
  useObservable(getIsNetworkSupported$, true, getIsMetaMaskInjected);

export const useIsMetaMaskInjected = () => {
  const [isMetaMaskInjected, setIsMetaMaskInjected] = useState(false);

  useEffect(() => {
    setIsMetaMaskInjected(getIsMetaMaskInjected());
  }, []);

  return isMetaMaskInjected;
};
