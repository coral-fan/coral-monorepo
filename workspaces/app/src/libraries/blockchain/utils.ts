import { MetaMaskInpageProvider } from '@metamask/providers';

export const isMetaMaskInjected = () =>
  window.ethereum !== undefined &&
  (window.ethereum as MetaMaskInpageProvider).addListener !== undefined;
