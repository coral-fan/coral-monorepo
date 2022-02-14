import type { MetamaskInpageProvider } from '@metamask/providers';
import type { JWPlayer } from '@types/jwplayer';
// prevent type error when accessing the ethereum property on the window object
declare global {
  interface Window {
    ethereum: MetamaskInpageProvider;
    jwplayer: JWPlayer;
  }
}
