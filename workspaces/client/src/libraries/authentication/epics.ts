import { createAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { map, Observable } from 'rxjs';

const terminateActionStream = () => createAction('terminate_action_stream');

// typing from https://stackoverflow.com/questions/64320308/react-observable-epic-with-redux-toolkit-and-typescript
export const signUpEpic = (action$: Observable<Action>) =>
  action$.pipe(
    // filter((action) => setIsLoggingIn.match(action) && action.payload === false),
    map(terminateActionStream)
  );
