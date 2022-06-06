import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import { fromEvent, Observable } from 'rxjs';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const newBlock$ = fromEvent(avalancheRpcProvider, 'block') as Observable<number>;
