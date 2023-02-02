import { createStore } from 'libraries/store';
import { TaylaParxData } from './types';

export const {
  Provider: TaylaParxProvider,
  useStore: useTaylaParxStore,
  initializeStore: initializeTaylaParxStore,
  useCreateStore: useCreateTaylaParxStore,
} = createStore<TaylaParxData>();
