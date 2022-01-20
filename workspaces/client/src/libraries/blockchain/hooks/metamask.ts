import { delay, map, retryWhen, startWith, tap, throwError } from 'rxjs';
import { AVALANCHE } from 'consts';
import { getChainIdChanged$ } from '../observables';
import { useObservable } from 'libraries/utils/hooks';

const getIsNetworkSupported$ = () =>
  getChainIdChanged$().pipe(
    startWith(window.ethereum.chainId),
    tap(console.log),
    map((chainId: null | string) => {
      if (chainId === null) {
        return throwError(() => new Error());
      }
      return chainId.toLowerCase() === AVALANCHE.CHAIN_ID;
    }),
    /*
      retry is necessary because in production, chainId can be null.
      likely a race condition where metamask doesn't initialize before react
    */
    retryWhen((error) => error.pipe(delay(1000)))
  );

const isNetworkSupportedInvariant = () => window.ethereum && window.ethereum.addListener;

export const useIsNetworkSupported = () =>
  useObservable(getIsNetworkSupported$, true, isNetworkSupportedInvariant);
