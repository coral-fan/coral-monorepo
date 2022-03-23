import { MetaMaskInpageProvider } from '@metamask/providers';
import { AVALANCHE } from 'consts';
import { delay, fromEvent, map, Observable, retryWhen, startWith, throwError } from 'rxjs';

export const fromEthereumEvent = <T>(eventName: string) =>
  /* 
  casting due windowing typing collision from @metamask/detect-provider
  unable to define custom global declaration of window for some reason
  see node_modules/@metamask/detect-provider/dist/index.d.ts
  */
  fromEvent(window.ethereum as MetaMaskInpageProvider, eventName) as Observable<T>;

export const getChainIdChanged$ = () => fromEthereumEvent<string | null>('chainChanged');

export const getIsNetworkSupported$ = () =>
  getChainIdChanged$().pipe(
    // see above comment regarding casting
    startWith((window.ethereum as MetaMaskInpageProvider).chainId),
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
    retryWhen((error) => error.pipe(delay(1000)))
  );
