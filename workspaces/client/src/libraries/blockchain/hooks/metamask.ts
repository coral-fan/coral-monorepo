import { delay, map, retryWhen, startWith, throwError } from 'rxjs';
import { AVALANCHE } from 'consts';
import { getChainIdChanged$ } from '../observables';
import { useObservable } from 'libraries/utils/hooks';
import { getIsMetaMaskInjected } from '../utils';

const getIsNetworkSupported$ = () =>
  getChainIdChanged$().pipe(
    startWith(window.ethereum.chainId),
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

export const useIsNetworkSupported = () =>
  useObservable(getIsNetworkSupported$, true, getIsMetaMaskInjected);
