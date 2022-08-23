import { useObservable } from 'libraries/utils';
import { useEffect, useState } from 'react';
import { getIsReferralUser$, getUserReferralAccount$ } from './observables';
import { UserReferralAccount } from './types';
import { tap, delay } from 'rxjs';

export const useIsReferralUser = () => useObservable(getIsReferralUser$, false);

export const useReferralUserData = (uid: string) => {
  const [referralUserData, setReferralUserData] = useState<UserReferralAccount>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = getUserReferralAccount$(uid)
      .pipe(
        tap(() => setIsLoading(true)),
        delay(1000)
      )
      .subscribe((data) => {
        setReferralUserData(data);
        setIsLoading(false);
      });
    return () => subscription.unsubscribe();
  }, [uid]);

  return { referralUserData, isLoading };
};
