import { useObservable } from 'libraries/utils';
import { useEffect, useState } from 'react';
import {
  getIsEarnUser$,
  getUserPointsAccount$,
  getUserReferralRedemptionDocumentAdded$,
} from './observables';
import { RedemptionData, SocialShareData, UserPointsAccount } from './types';

export const useIsEarnUser = () => useObservable(getIsEarnUser$, false);

export const useUserPointsData = (uid: string) => {
  const [userPointsData, setUserPointsData] = useState<UserPointsAccount>();

  useEffect(() => {
    const subscription = getUserPointsAccount$(uid).subscribe((data) => {
      setUserPointsData(data);
    });
    return () => subscription.unsubscribe();
  }, [uid]);

  return { userPointsData };
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
