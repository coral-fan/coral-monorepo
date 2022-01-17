import { configureStore } from '@reduxjs/toolkit';
import { ServerSideData } from 'pages/_app.page';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import authenticationReducer, {
  initialState as initialAuthenticationState,
} from '../authentication/slice';

const rootEpic = combineEpics();

type InitialState = ServerSideData['initialState'];

export const initializeStore = (initialState: InitialState) => {
  const epicMiddleware = createEpicMiddleware();
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), epicMiddleware],
    preloadedState: {
      authentication: {
        ...initialAuthenticationState,
        ...initialState,
      },
    },
  });

  epicMiddleware.run(rootEpic);

  return store;
};
