import { AVALANCHE } from 'consts';
import { fromEvent, map, Observable, retry, startWith, throwError } from 'rxjs';

export const fromMetaMaskEvent = <T>(eventName: string) => {
  if (window.ethereum === undefined) {
    throw 'Do not call fromEthereumEvent if window.etherum is undefined.';
  }

  return fromEvent(window.ethereum, eventName) as Observable<T>;
};

export const getChainIdChanged$ = () => fromMetaMaskEvent<string | null>('chainChanged');

export const getIsNetworkSupported$ = () =>
  getChainIdChanged$().pipe(
    startWith(window?.ethereum?.chainId ?? null),
    map((chainId) => {
      if (chainId === null) {
        return throwError(() => new Error());
      }
      return chainId.toLowerCase() === AVALANCHE.CHAIN_ID.HEX;
    }),
    /*
      retry is necessary because in production, chainId can be null.
      likely a race condition where metamask doesn't initialize before react
    */
    retry({ delay: 1000 })
  );
