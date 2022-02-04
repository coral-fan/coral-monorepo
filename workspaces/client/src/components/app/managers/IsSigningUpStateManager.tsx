import { useEffect } from 'react';
import { filter, map, mergeMap } from 'rxjs';
import { docData } from 'rxfire/firestore';

import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { useIsSigningUp, useToken } from 'libraries/authentication';
import { getUserUid$ } from 'libraries/models';

export const IsSigningUpStateManager = () => {
  const [, setIsSigningUp] = useIsSigningUp();
  const token = useToken();

  useEffect(() => {
    const subscription = getUserUid$()
      .pipe(
        // need type guard: https://stackoverflow.com/questions/57206909/typescript-with-rxjs-filter-typing-problem
        filter((uid): uid is string => uid !== undefined),
        mergeMap((uid) => getDocumentReferenceClientSide('is-signing-up', uid)),
        mergeMap((docRef) => docData(docRef)),
        map((data) => data.isSigningUp)
      )
      .subscribe((isSigningUp) => setIsSigningUp(isSigningUp && token !== undefined));

    return () => subscription.unsubscribe();
  }, [setIsSigningUp, token]);

  return <></>;
};
