import { useLayoutEffect } from 'react';
import create, { GetState, State, StoreApi } from 'zustand';
import createContext from 'zustand/context';

export type InitializeStateFn<T> = (
  set: (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean) => void,
  get: GetState<T>
) => T;

export const createStore = <T extends State>(initializeStateFn?: InitializeStateFn<T>) => {
  type Store = StoreApi<T>;

  // store can technically be undefined
  let store: Store;

  const { Provider, useStore } = createContext<Store>();

  const initializeStore = (initialState: T) =>
    create<T>((set, get) => {
      if (typeof initializeStateFn === 'function') {
        return {
          ...initialState,
          ...initializeStateFn(set, get),
        };
      }

      return initialState;
    });

  const useCreateStore = (initialState: T): (() => Store) => {
    // explicit checked needed because of typing above
    if (store === undefined) {
      store = initializeStore(initialState);
    }

    useLayoutEffect(() => {
      // see above comment
      if (initialState) {
        store.setState(
          {
            ...store.getState(),
            ...initialState,
          },
          true
        );
      }
    });

    return typeof window === 'undefined' ? () => initializeStore(initialState) : () => store;
  };

  return { Provider, useStore, initializeStore, useCreateStore };
};
