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

// TODO: revisit to see if this is the best way to approach this. very ugly solution...hate brave browser 😠
/**
 * why the code below is so convoluted:
 * Brave browser injects it's own ethereum object into the window that has a similar shape as the MetaMask ethereum object
 * as a result, ethereum.chainId is initialized to 0x1 (Ethereum mainnet), and we need to poll to ensure we're picking up the chainID from MetaMask
 **/
const isBrowserBrave = () =>
  typeof (window.navigator as BraveNavigator).brave?.isBrave === 'function';

// lowercase in case chainId is capitalized for some reason
const getChainId = () => window.ethereum?.chainId?.toLowerCase();

export const getIsNetworkSupported$ = () => {
  let shouldPollMetaMask = isBrowserBrave();
  return getChainIdChanged$().pipe(
    // startWith triggers the pipeline without any chain id changed events needing to be emitted
    startWith(undefined),
    // tap(console.log),
    map((_chainId) => {
      // lowercase in case chainId is capitalized for some reason
      const chainId = _chainId?.toLowerCase() ?? getChainId();

      if (shouldPollMetaMask) {
        // TODO: may need to check for null values. there used to be an issue where value initialized to null, even though ethereum was injected, but need to double check
        if (chainId === '0x1') {
          //  error is thrown here so retry will trigger
          throw 'MetaMask chain ID is potentially uninitialized in Brave Browser.';
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
      // returns observable here because this is what' expected by catchError
      return of(chainId === AVALANCHE.CHAIN_ID.HEX);
    })
  );
};
