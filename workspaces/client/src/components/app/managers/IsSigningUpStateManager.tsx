import { useEffect } from 'react';
import { filter, mergeMap } from 'rxjs';
import { useIsSigningUp, useToken } from 'libraries/authentication';
import { getIsUserSigningUp, getUserUid$ } from 'libraries/models';

export const IsSigningUpStateManager = () => {
  const [, setIsSigningUp] = useIsSigningUp();
  const token = useToken();

  useEffect(() => {
    const subscription = getUserUid$()
      .pipe(
        // need type guard: https://stackoverflow.com/questions/57206909/typescript-with-rxjs-filter-typing-problem
        filter((uid): uid is string => uid !== undefined),
        mergeMap(getIsUserSigningUp)
      )
      .subscribe((isSigningUp) => setIsSigningUp(isSigningUp && token !== undefined));

    return () => subscription.unsubscribe();
  }, [setIsSigningUp, token]);

  return <></>;
};
