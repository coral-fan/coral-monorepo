import { useEffect, useState } from 'react';
import { delay, fromEvent, map, retryWhen, share, startWith } from 'rxjs';
import { EventKeys } from 'types/ethereumish';
import { getRefValue } from 'libraries/utils/hooks';
import { AVALANCHE } from 'consts';

export const useGetChainIdChanged$ = () =>
  getRefValue(
    /* eslint @typescript-eslint/no-explicit-any: 'off' -- window.ethereum must be coerced as any so that fromEvent will accept the value as a EventEmitter*/
    () => fromEvent<EventKeys>(window.ethereum as any, 'chainChanged').pipe(share()),
    'getChainIdChanged$',
    false
  );

const getIsNetworkSupported = (chainId: string) => chainId.toLowerCase() === AVALANCHE.CHAIN_ID;

export const useIsNetworkSupported = () => {
  const getChainIdChanged$ = useGetChainIdChanged$();

  const [isNetworkSupported, setIsNetworkSupported] = useState(true);

  useEffect(() => {
    // only runs this ethereum provider is injected by metamask & not brave
    if (window.ethereum && !window.ethereum.on) {
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
  }, [setIsNetworkSupported, getChainIdChanged$]);

  return isNetworkSupported;
};
