import { MetaMaskInpageProvider } from '@metamask/providers';
import { getClientSideOnlyErrorMessage, isServerSide } from 'libraries/utils';

const CLIENT_SIDE_ONLY_ERROR_MESSAGE = getClientSideOnlyErrorMessage('isMetaMaskInjected');

export const isMetaMaskInjected = () => {
  if (isServerSide()) {
    throw CLIENT_SIDE_ONLY_ERROR_MESSAGE;
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
