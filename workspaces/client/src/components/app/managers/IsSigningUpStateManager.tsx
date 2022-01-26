import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { useEffect } from 'react';
import { filter, map, mergeMap } from 'rxjs';
import { getUserUid$ } from '../modals/SignUpModal/hooks';
import { doc } from 'rxfire/firestore';
import { useIsSigningUp } from 'libraries/authentication';
import { useDispatch } from 'react-redux';
import { updateIsSigningUp } from 'libraries/authentication/slice';

export const IsSigningUpStateManager = () => {
  const isSigningUp = useIsSigningUp();
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = getUserUid$()
      .pipe(
        // need type guard: https://stackoverflow.com/questions/57206909/typescript-with-rxjs-filter-typing-problem
        filter((uid): uid is string => uid !== undefined),
        mergeMap((uid) => getDocumentReferenceClientSide('is-signing-up', uid)),
        mergeMap((docRef) => doc(docRef)),
        map((docRef) => docRef?.data()?.isSigningUp),
        filter((currentIsSigningUp: boolean) => currentIsSigningUp !== isSigningUp)
      )
      .subscribe((isSigningUp) => dispatch(updateIsSigningUp(isSigningUp)));

    return () => subscription.unsubscribe();
  }, [dispatch, isSigningUp]);

  return <></>;
};
