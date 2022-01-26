import { useEffect } from 'react';
import { filter, map, mergeMap } from 'rxjs';
import { doc, docData } from 'rxfire/firestore';
import { useDispatch } from 'react-redux';

import { useIsSigningUp } from 'libraries/authentication';
import { getDocumentReferenceClientSide, getUserUid$ } from 'libraries/firebase';

import { updateIsSigningUp } from 'libraries/authentication/slice';

export const IsSigningUpStateManager = () => {
  const isSigningUpFromRedux = useIsSigningUp();
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = getUserUid$()
      .pipe(
        // need type guard: https://stackoverflow.com/questions/57206909/typescript-with-rxjs-filter-typing-problem
        filter((uid): uid is string => uid !== undefined),
        mergeMap((uid) => getDocumentReferenceClientSide('is-signing-up', uid)),
        mergeMap((docRef) => docData(docRef)),
        map((data) => data.isSigningUp),
        filter((isSigningUp: boolean) => isSigningUp !== isSigningUpFromRedux)
      )
      .subscribe((isSigningUp) => dispatch(updateIsSigningUp(isSigningUp)));

    return () => subscription.unsubscribe();
  }, [dispatch, isSigningUpFromRedux]);

  return <></>;
};
