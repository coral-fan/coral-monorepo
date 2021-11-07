type getRefValueReturnFunction<T> = () => T;
type getRefValueReturnTuple<T> = [getRefValueReturnFunction<T>, (value: T) => void];

type InferUseGetRefReturnType<T, B> = B extends true
  ? getRefValueReturnTuple<T>
  : getRefValueReturnFunction<T>;

type Ref<T> = {
  current: undefined | T;
};

// implementation inspired by https://stackoverflow.com/questions/52817922/typescript-return-type-depending-on-parameter
export function getRefValue<T, B extends boolean>(
  getValue: () => T,
  tag: string,
  // this is necessary to ensure type inference for B. Value of B must be passed as parameter or TypeScript won't be able to infer the type
  shouldReturnSetRefValue: B,
  shouldOnlyCallClientSide = true
): InferUseGetRefReturnType<T, typeof shouldReturnSetRefValue> {
  const ref: Ref<T> = { current: undefined };

  const getRefValue = () => {
    if (shouldOnlyCallClientSide && typeof window === 'undefined') {
      throw new Error(`${tag} should only be called client side.`);
    }
    if (!ref.current) {
      ref.current = getValue();
    }
    return ref.current;
  };

  const setRefValue = (value: T) => {
    ref.current = value;
  };

  return (
    shouldReturnSetRefValue ? <getRefValueReturnTuple<T>>[getRefValue, setRefValue] : getRefValue
  ) as InferUseGetRefReturnType<T, B>;
}
