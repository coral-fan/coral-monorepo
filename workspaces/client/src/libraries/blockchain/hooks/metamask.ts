import { useEffect, useState } from 'react';
import { delay, map, retryWhen, startWith } from 'rxjs';
import { AVALANCHE } from 'consts';
import { getChainIdChanged$ } from '../observables';

const getIsNetworkSupported = (chainId: string) => chainId.toLowerCase() === AVALANCHE.CHAIN_ID;

export const useIsNetworkSupported = () => {
  const [isNetworkSupported, setIsNetworkSupported] = useState(false);

  useEffect(() => {
    // only runs this ethereum provider is injected by metamask & not brave
    if (window.ethereum && window.ethereum.addListener) {
      const isNetworkSupported$ = getChainIdChanged$().pipe(
        startWith(window.ethereum.chainId),
        map(getIsNetworkSupported),
        /*
        retry is neccessary because in production, chainId can be null.
        likely a race condition where metamask doesn't initialize before react
         */
        retryWhen((error) => error.pipe(delay(1000)))
      );

      const subscription = isNetworkSupported$.subscribe(setIsNetworkSupported);

      return () => subscription.unsubscribe();
    }
  }, []);

  return isNetworkSupported;
};
