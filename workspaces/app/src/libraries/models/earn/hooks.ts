import { getCoralAPIAxios, useObservable } from 'libraries/utils';
import { useCallback, useEffect, useState } from 'react';
import {
  getIsEarnUser$,
  getUserPointsAccount$,
  getUserReferralRedemptionDocumentAdded$,
  getUserSocialShares$,
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

export const useUserSocialShareData = (uid: string, campaignId: string) => {
  const [userSocialShareData, setUserSocialShareData] = useState<SocialShareData>();

  useEffect(() => {
    const subscription = getUserSocialShares$(uid, campaignId).subscribe((data) => {
      setUserSocialShareData(data);
    });
    return () => subscription.unsubscribe();
  }, [campaignId, uid]);

  return { userSocialShareData };
};

const coralAPI = getCoralAPIAxios();

export const useGenerateSocialShareCode = (campaignId: string) => {
  const [isGeneratingSocialShareCode, setIsGeneratingSocialShareCode] = useState(false);
  const [socialShareCode, setSocialShareCode] = useState<string>();

  const generateSocialShareCode = useCallback(async () => {
    setIsGeneratingSocialShareCode(true);
    try {
      const {
        data: { socialShareCode },
      } = await coralAPI.post<{ socialShareCode: string }>('generate-social-share-code', {
        campaignId,
      });
      setSocialShareCode(socialShareCode);
    } catch (e) {
      console.error(e);
    }
    setIsGeneratingSocialShareCode(false);
  }, [campaignId]);

  return { isGeneratingSocialShareCode, socialShareCode, generateSocialShareCode };
};
