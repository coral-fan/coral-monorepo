import { fromEvent, Observable, share } from 'rxjs';

// a ref is used to in order to memoize the chainId observable. Casted to any so properties can be modified
const ref = {} as any;

export const getChainId$ = (): Observable<string> => {
  if (typeof window === 'undefined') {
    throw new Error('getChainId$ should only be called client side.');
  }
  // checks if chainId$ are both not undefined
  if (!ref.chainId$) {
    // pipes share so subscriptions can be multi-casted
    const chainId$ = fromEvent<string>(window.ethereum as any, 'chainChanged').pipe(share());

    ref.chainId$ = chainId$;
  }

  return ref.chainId$;
};
