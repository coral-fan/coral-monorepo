import { AVALANCHE } from 'consts';
import { catchError, fromEvent, map, Observable, of, retry, startWith, tap } from 'rxjs';

export const fromMetaMaskEvent = <T>(eventName: string) => {
  if (window.ethereum === undefined) {
    throw 'Do not call fromEthereumEvent if window.etherum is undefined.';
  }

  return fromEvent(window.ethereum, eventName) as Observable<T>;
};

export const getChainIdChanged$ = () => fromMetaMaskEvent<string | null>('chainChanged');

interface BraveNavigator extends Navigator {
  brave?: {
    isBrave: () => boolean;
  };
}

const isBrowserBrave = () =>
  typeof (window.navigator as BraveNavigator).brave?.isBrave === 'function';

// lowercase in case chainId is capitalized for some reason
const getChainId = () => window.ethereum?.chainId?.toLowerCase();

export const getIsNetworkSupported$ = () => {
  let shouldPollMetaMask = true;
  return getChainIdChanged$().pipe(
    map((chainId) => chainId?.toLowerCase()),
    startWith(getChainId()),
    map((_chainId) => {
      // retry logic doesn't update chainId value (so if undefined, stays undefined for retries), so need to retrieve if value is nullish
      const chainId = _chainId ?? getChainId();
      if (shouldPollMetaMask) {
        /*
         * chainId is initially nullish when app loads on Chrome
         * on Brave, chainId is initially 0x1 due to injected Brave wallet
         */
        if (!chainId || (chainId === '0x1' && isBrowserBrave())) {
          //  error is thrown here so retry will trigger
          throw 'Polling MetaMask.';
        }
        shouldPollMetaMask = false;
      }

      return chainId === AVALANCHE.CHAIN_ID.HEX;
    }),
    // arbitrary values, can adjust as necessary
    retry({ count: 10, delay: 10 }),
    catchError(() => {
      // set this to true so retry logic won't trigger anymore
      shouldPollMetaMask = false;
      const chainId = getChainId();
      // returns observable here because this is what is expected by catchError
      return of(chainId === AVALANCHE.CHAIN_ID.HEX);
    })
  );
};
