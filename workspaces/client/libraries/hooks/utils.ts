import { useCallback, useRef } from 'react';

type UseGetRefValueReturnFunction<T> = () => T;
type UseGetRefValueReturnTuple<T> = [UseGetRefValueReturnFunction<T>, (value: T) => void];

type InferUseGetRefReturnType<T, B> = B extends true
  ? UseGetRefValueReturnTuple<T>
  : UseGetRefValueReturnFunction<T>;

// implementation inspired by https://stackoverflow.com/questions/52817922/typescript-return-type-depending-on-parameter
export function useGetRefValue<T, B extends boolean>(
  getValue: () => T,
  tag: string,
  // this is necessary to ensure type inference for B
  shouldReturnSetRefValue = false as B,
  shouldOnlyCallClientSide = true
): InferUseGetRefReturnType<T, typeof shouldReturnSetRefValue> {
  const ref = useRef<undefined | T>(undefined);

  const getRefValue = useCallback(() => {
    if (shouldOnlyCallClientSide && typeof window === 'undefined') {
      throw new Error(`${tag} should only be called client side.`);
    }
    if (!ref.current) {
      ref.current = getValue();
    }
    return ref.current;
  }, [tag, getValue, shouldOnlyCallClientSide]);

  const setRefValue = useCallback((value: T) => {
    ref.current = value;
  }, []);

  return (
    shouldReturnSetRefValue ? <UseGetRefValueReturnTuple<T>>[getRefValue, setRefValue] : getRefValue
  ) as InferUseGetRefReturnType<T, B>;
}
