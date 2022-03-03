import { configureStore } from '@reduxjs/toolkit';
import { ServerSideData } from 'components/app';

import authenticationReducer, {
  initialState as initialAuthenticationState,
} from '../authentication/slice';

type InitialState = ServerSideData['initialState'];

export const initializeStore = (initialState: InitialState) => {
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
    },
    preloadedState: {
      authentication: {
        ...initialAuthenticationState,
        ...initialState,
      },
    },
  });

  return store;
};
