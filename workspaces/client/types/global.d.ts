import type { MetamaskInpageProvider } from '@metamask/providers';
// prevent type error when accessing the ethereum property on the window object
declare global {
  interface Window {
    ethereum: MetamaskInpageProvider;
  }
}
