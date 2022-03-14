import { getIsNetworkSupported$ } from '../observables';
import { useObservable } from 'libraries/utils/hooks';
import { isMetaMaskInjected } from '../utils';

export const useIsNetworkSupported = () =>
  useObservable(getIsNetworkSupported$, true, isMetaMaskInjected);
