import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer, {
  initialState as initialAuthenticationState,
} from '../authentication/slice';

export const initializeStore = () => {
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
    },
    preloadedState: {
      authentication: {
        ...initialAuthenticationState,
      },
    },
  });

  return store;
};
