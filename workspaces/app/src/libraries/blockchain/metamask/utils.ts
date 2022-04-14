import { MetaMaskInpageProvider } from '@metamask/providers';
import { isServerSide } from 'libraries/utils';

export const isMetaMaskInjected = () => {
  if (isServerSide()) {
    throw 'isMetaMaskInjected should only be called client-side.';
  }
  return (
    window.ethereum !== undefined &&
    /* 
  casting due windowing typing collision from @metamask/detect-provider
  unable to define custom global declaration of window for some reason
  see node_modules/@metamask/detect-provider/dist/index.d.ts
  */
    (window.ethereum as MetaMaskInpageProvider).addListener !== undefined
  );
};
