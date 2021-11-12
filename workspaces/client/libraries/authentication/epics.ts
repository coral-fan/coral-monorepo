export {};
// import { createAction } from '@reduxjs/toolkit';
// import { Action } from 'redux';
// import { filter, map, Observable, tap } from 'rxjs';
// import { setIsSigningUp } from './slice';

// const terminateActionStream = createAction('terminate_action_stream');

// const IS_SIGNING_UP = 'isSigningUp';

// // typing from https://stackoverflow.com/questions/64320308/react-observable-epic-with-redux-toolkit-and-typescript
// export const signUpEpic = (action$: Observable<Action>) =>
//   action$.pipe(
//     filter(setIsSigningUp.match),
//     tap(({ payload: isSigningUp }) =>
//       isSigningUp
//         ? localStorage.setItem(IS_SIGNING_UP, JSON.stringify(isSigningUp))
//         : localStorage.removeItem(IS_SIGNING_UP)
//     ),
//     map(() => terminateActionStream())
//   );
