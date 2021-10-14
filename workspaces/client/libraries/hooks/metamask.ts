import { useCallback, useRef } from 'react';
import { fromEvent, share } from 'rxjs';

function useRefValue<T>(getValue: () => T, tag?: string) {
  const ref = useRef<undefined | T>(undefined);

  return useCallback(() => {
    if (typeof window === 'undefined') {
      throw new Error(`${tag ? tag : 'This function'} should only be called client side.`);
    }
    if (!ref.current) {
      ref.current = getValue();
    }
    return ref.current;
  }, [tag, getValue]);
}

export const useGetChainId$ = () =>
  useRefValue(
    /* eslint @typescript-eslint/no-explicit-any: 'off' -- window.ethereum must be coerced as any so that fromEvent will accept the value as a EventEmitter*/
    () => fromEvent<string>(window.ethereum as any, 'chainChanged').pipe(share()),
    'getChainId$'
  );
