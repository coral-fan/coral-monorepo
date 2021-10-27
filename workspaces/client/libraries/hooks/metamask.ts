import { SUPPORTED_CHAIN_IDS } from 'consts';
import { useEffect, useState } from 'react';
import { fromEvent, map, share, startWith } from 'rxjs';
import { EventKeys } from 'types/ethereumish';
import { useGetRefValue } from './utils';

export const useGetChainIdChanged$ = () =>
  useGetRefValue(
    /* eslint @typescript-eslint/no-explicit-any: 'off' -- window.ethereum must be coerced as any so that fromEvent will accept the value as a EventEmitter*/
    () => fromEvent<EventKeys>(window.ethereum as any, 'chainChanged').pipe(share()),
    'getChainIdChanged$',
    false
  );

const getIsNetworkSupported = (chainId: string) => SUPPORTED_CHAIN_IDS.includes(parseInt(chainId));

export const useIsNetworkSupported = () => {
  const getChainIdChanged$ = useGetChainIdChanged$();

  const [isNetworkSupported, setIsNetworkSupported] = useState(true);

  useEffect(() => {
    // only runs this if
    if (window.ethereum) {
      const isNetworkSupported$ = getChainIdChanged$().pipe(
        map(getIsNetworkSupported),
        startWith(getIsNetworkSupported(window.ethereum.chainId))
      );

      const subscription = isNetworkSupported$.subscribe(setIsNetworkSupported);

      return () => subscription.unsubscribe();
    }
  }, [getChainIdChanged$, setIsNetworkSupported, isNetworkSupported]);

  return isNetworkSupported;
};
