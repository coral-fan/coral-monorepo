import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import authenticationReducer, {
  initialState as initialAuthenticationState,
} from '../authentication/slice';

const rootEpic = combineEpics();

export const initializeStore = (isTokenAuthenticated = false) => {
  const epicMiddleware = createEpicMiddleware();
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), epicMiddleware],
    preloadedState: {
      authentication: {
        ...initialAuthenticationState,
        isTokenAuthenticated,
      },
    },
  });

  epicMiddleware.run(rootEpic);

  return store;
};
