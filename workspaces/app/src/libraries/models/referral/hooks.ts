import { useObservable } from 'libraries/utils';
import { useEffect, useMemo, useState } from 'react';
import { getIsReferralUser$, getUserReferralAccount$ } from './observables';
import { UserReferralAccount } from './types';

export const useIsReferralUser = () => useObservable(getIsReferralUser$, false);

export const useReferralUserData = (uid: string) => {
  const [referralUserData, setReferralUserData] = useState<UserReferralAccount>();

  useEffect(() => {
    const subscription = getUserReferralAccount$(uid).subscribe((data) => {
      setReferralUserData(data);
    });
    return () => subscription.unsubscribe();
  }, [uid]);

  return { referralUserData };
};
