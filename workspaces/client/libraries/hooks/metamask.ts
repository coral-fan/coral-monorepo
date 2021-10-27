import { fromEvent, share } from 'rxjs';
import { EventKeys } from 'types/ethereumish';
import { useGetRefValue } from './utils';

export const useGetChainId$ = () =>
  useGetRefValue(
    /* eslint @typescript-eslint/no-explicit-any: 'off' -- window.ethereum must be coerced as any so that fromEvent will accept the value as a EventEmitter*/
    () => fromEvent<EventKeys>(window.ethereum as any, 'chainChanged').pipe(share()),
    'getChainId$',
    false
  );
