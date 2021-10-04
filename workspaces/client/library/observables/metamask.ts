import { fromEvent, share } from 'rxjs';

interface Reference<T> {
  value: T | undefined;
}

function getRefValue<T>(getValue: () => T, tag?: string): () => T {
  const ref: Reference<T> = { value: undefined };

  return () => {
    if (typeof window === 'undefined') {
      throw new Error(`${tag ? tag : 'This function'} should only be called client side.`);
    }

    if (!ref.value) {
      ref.value = getValue();
    }

    return ref.value;
  };
}

export const getChainId$ = getRefValue(
  () => fromEvent<string>(window.ethereum as any, 'chainChanged').pipe(share()),
  'getChainId$'
);
