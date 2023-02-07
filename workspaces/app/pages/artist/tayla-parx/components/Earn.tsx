import { useOpenSignInModal } from 'components/app';
import { EarnModal } from 'components/ui';
import { useIsAuthenticated } from 'libraries/authentication';
import { getDocumentData } from 'libraries/firebase';
import { SocialShareCampaignData, useUserUid } from 'libraries/models';
import { useErrorToast } from 'libraries/utils/toasts';
import React, { cloneElement, useCallback, useEffect, useMemo, useState } from 'react';

interface EarnProps {
  campaignId: string;
  children: React.ReactElement;
}

export const Earn = ({ campaignId, children }: EarnProps) => {
  const [showEarnModal, setShowEarnModal] = useState(false);

  const openShowEarnModal = useCallback(() => setShowEarnModal(true), []);

  const isAuthenticated = useIsAuthenticated();
  const openSignInModal = useOpenSignInModal();

  const onClickHandler = useMemo(
    () => (isAuthenticated ? openShowEarnModal : openSignInModal),
    [isAuthenticated, openSignInModal, openShowEarnModal]
  );

  const uid = useUserUid();

  const closeEarnModal = useCallback(() => setShowEarnModal(false), []);

  const [socialShareCampaignData, setSocialShareCampaignData] = useState<SocialShareCampaignData>();

  const errorToast = useErrorToast();

  useEffect(() => {
    const getSocialShareCampaignData = async () => {
      try {
        const data = await getDocumentData<SocialShareCampaignData>(
          'social-share-campaigns',
          campaignId
        );
        setSocialShareCampaignData(data);
        return data;
      } catch (e) {
        errorToast();
        console.error(e);
      }
    };

    getSocialShareCampaignData();
  }, [campaignId, errorToast]);

  return (
    <>
      {uid && showEarnModal && socialShareCampaignData && (
        <EarnModal
          closeEarnModal={closeEarnModal}
          campaignId={campaignId}
          uid={uid}
          socialShareCampaignData={socialShareCampaignData}
        />
      )}
      {cloneElement(children, {
        onClick: onClickHandler,
        points: socialShareCampaignData?.pointsValue,
      })}
    </>
  );
};
