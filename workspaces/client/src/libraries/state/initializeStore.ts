import { configureStore } from '@reduxjs/toolkit';
import { ServerSideData } from 'pages/_app.page';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import authenticationReducer, {
  initialState as initialAuthenticationState,
} from '../authentication/slice';

const rootEpic = combineEpics();

type StoreHydrationData = ServerSideData['data'];

export const initializeStore = (data: StoreHydrationData) => {
  const epicMiddleware = createEpicMiddleware();
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), epicMiddleware],
    preloadedState: {
      authentication: {
        ...initialAuthenticationState,
        ...data,
      },
    },
  });

  epicMiddleware.run(rootEpic);

  return store;
};
