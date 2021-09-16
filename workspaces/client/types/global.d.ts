import type { Ethereumish } from './ethereumish';
// prevent type error when accessing the ethereum property on the window object
global {
  interface Window {
    ethereum?: Ethereumish;
  }
}
