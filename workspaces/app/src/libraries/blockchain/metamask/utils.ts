import { MetaMaskInpageProvider } from '@metamask/providers';

export const isMetaMaskInjected = () =>
  window.ethereum !== undefined &&
  /* 
  casting due windowing typing collision from @metamask/detect-provider
  unable to define custom global declaration of window for some reason
  see node_modules/@metamask/detect-provider/dist/index.d.ts
  */
  (window.ethereum as MetaMaskInpageProvider).addListener !== undefined;
