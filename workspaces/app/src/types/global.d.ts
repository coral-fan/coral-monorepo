import type { JWPlayer } from '@types/jwplayer';
// prevent type error when accessing the ethereum property on the window object
declare global {
  interface Window {
    jwplayer: JWPlayer;
  }
}
