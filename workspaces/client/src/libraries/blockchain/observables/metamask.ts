import { fromEvent } from 'rxjs';

export const getChainIdChanged$ = () => fromEvent(window.ethereum, 'chainChanged');
