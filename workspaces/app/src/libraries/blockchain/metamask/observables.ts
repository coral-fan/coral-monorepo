import { AVALANCHE } from 'consts';
import { fromEvent, map, mergeMap, Observable, startWith } from 'rxjs';

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

const getChainIdAfterDelay = () =>
  new Promise<ReturnType<typeof getChainId>>((resolve) => {
    setTimeout(() => {
      resolve(getChainId());
    }, 50);
  });

// TODO: revisit to look into if there's a better solution
export const getIsNetworkSupported$ = () => {
  return getChainIdChanged$().pipe(
    map((chainId) => chainId?.toLowerCase()),
    startWith(getChainId()),
    mergeMap(async (chainId) => {
      console.log(chainId);
      /*
       * chainId is initially nullish when app loads on Chrome
       * on Brave, chainId is initially 0x1 due to injected Brave wallet
       */
      if (!chainId || (chainId === '0x1' && isBrowserBrave())) {
        chainId = await getChainIdAfterDelay();
      }

      return chainId === AVALANCHE.CHAIN_ID.HEX;
    })
  );
};
