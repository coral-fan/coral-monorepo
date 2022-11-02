import { useObservable } from 'libraries/utils';
import { useEffect, useState } from 'react';
import {
  getIsReferralUser$,
  getUserPointsAccount$,
  getUserReferralRedemptionDocumentAdded$,
} from './observables';
import { RedemptionData, UserPointsAccount } from './types';

export const useIsReferralUser = () => useObservable(getIsReferralUser$, false);

export const useReferralUserData = (uid: string) => {
  const [referralUserData, setReferralUserData] = useState<UserPointsAccount>();

  useEffect(() => {
    const subscription = getUserPointsAccount$(uid).subscribe((data) => {
      setReferralUserData(data);
    });
    return () => subscription.unsubscribe();
  }, [uid]);

  return { referralUserData };
};

export const useUserReferralRedemptionDocumentAdded = (uid: string) => {
  const [isSuccessfulRedemption, setIsSuccessfulRedemption] = useState(false);
  const [redemptionData, setRedemptionData] = useState<RedemptionData>();

  useEffect(() => {
    const subscription = getUserReferralRedemptionDocumentAdded$(uid).subscribe((addedEvent) => {
      if (addedEvent) {
        setRedemptionData(addedEvent[0].doc.data());
        setIsSuccessfulRedemption(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [uid]);

  return { isSuccessfulRedemption, redemptionData };
};
