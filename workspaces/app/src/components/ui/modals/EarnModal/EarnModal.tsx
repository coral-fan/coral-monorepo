import { ConditionalSpinner, Modal, SpinnerWrapper } from 'components/ui';
import { getDocumentData, getDocumentExists } from 'libraries/firebase';
import {
  getEarnCode,
  SocialShareCampaignData,
  SocialShareData,
  useUserUid,
} from 'libraries/models';
import { getCoralAPIAxios } from 'libraries/utils';
import { useErrorToast } from 'libraries/utils/toasts';
import { useEffect, useMemo, useState } from 'react';
import tokens from 'styles/tokens';
import { Heading, PrimaryContainer } from './components';
import { ShareOnTwitter } from './components/ShareOnTwitter/ShareOnTwiter';

interface EarnModalProps {
  closeEarnModal: () => void;
  campaignId: string;
}

const coralAPI = getCoralAPIAxios();

export const EarnModal = ({ closeEarnModal, campaignId }: EarnModalProps) => {
  const [isCheckingSocialShareCode, setIsCheckingSocialShareCode] = useState(false);
  const [socialShareCode, setSocialShareCode] = useState<string>();
  const [socialShareCampaignData, setSocialShareCampaignData] = useState<SocialShareCampaignData>();

  const uid = useUserUid();

  // Should never error because uid is checked in EarnButton
  if (!uid) {
    throw Error('UID not found');
  }

  const potentialEarnCode = useMemo(() => getEarnCode(uid, campaignId), [uid, campaignId]);

  const errorToast = useErrorToast();

  const isCampaignExpired = useMemo(
    () =>
      socialShareCampaignData &&
      (new Date() >= new Date(socialShareCampaignData.endDate) ||
        socialShareCampaignData.totalPointsEarned >= socialShareCampaignData.totalPointsPool),
    [socialShareCampaignData]
  );

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

    const checkPotentialEarnCode = async () => {
      return await getDocumentExists<SocialShareData>('social-shares', potentialEarnCode);
    };

    const generateSocialShareCode = async () => {
      try {
        const {
          data: { socialShareCode },
        } = await coralAPI.post<{ socialShareCode: string }>('generate-social-share-code', {
          campaignId,
        });
        setSocialShareCode(socialShareCode);
      } catch (e) {
        errorToast('Could not generate code');
        console.error(e);
      }
    };

    setIsCheckingSocialShareCode(true);

    getSocialShareCampaignData().then((data) => {
      if (data && !isCampaignExpired) {
        checkPotentialEarnCode().then((hasEarnCode) => {
          if (hasEarnCode) {
            setSocialShareCode(potentialEarnCode);
          } else {
            generateSocialShareCode();
          }
        });
      }
    });

    setIsCheckingSocialShareCode(false);
  }, [campaignId, potentialEarnCode, errorToast, isCampaignExpired]);

  const CampaignNotActive = () => (
    <PrimaryContainer>
      <Heading>This Campaign is not currently Active</Heading>
    </PrimaryContainer>
  );

  const CampaignExpired = () => (
    <PrimaryContainer>
      <Heading>This Campaign has Ended</Heading>
    </PrimaryContainer>
  );

  return (
    <>
      {socialShareCampaignData && (
        <Modal onClick={closeEarnModal} fullHeight>
          <SpinnerWrapper>
            <ConditionalSpinner
              size={'60px'}
              color={tokens.background.color.brand}
              loading={isCheckingSocialShareCode}
              center
            >
              {socialShareCode && socialShareCampaignData.isActive && !isCampaignExpired && (
                <ShareOnTwitter
                  socialShareCode={socialShareCode}
                  defaultContent={socialShareCampaignData.defaultContent}
                  closeEarnModal={closeEarnModal}
                />
              )}
              {!socialShareCampaignData.isActive && <CampaignNotActive />}
              {socialShareCampaignData.isActive && isCampaignExpired && <CampaignExpired />}
            </ConditionalSpinner>
          </SpinnerWrapper>
        </Modal>
      )}
    </>
  );
};
