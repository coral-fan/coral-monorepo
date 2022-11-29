import { ConditionalSpinner, Modal, SpinnerWrapper } from 'components/ui';
import { getDocumentData } from 'libraries/firebase';
import { getEarnCode, SocialShareCampaignData, SocialShareData } from 'libraries/models';
import { getCoralAPIAxios } from 'libraries/utils';
import { useErrorToast } from 'libraries/utils/toasts';
import { useEffect, useMemo, useState } from 'react';
import tokens from 'styles/tokens';
import { CampaignExpired, CampaignNotActive, HasVerified } from './components';
import { ShareOnTwitter } from './components/ShareOnTwitter/ShareOnTwitter';

interface EarnModalProps {
  closeEarnModal: () => void;
  uid: string;
  campaignId: string;
  doesOwnPinderNft: boolean;
}

const coralAPI = getCoralAPIAxios();

export const EarnModal = ({
  closeEarnModal,
  campaignId,
  uid,
  doesOwnPinderNft,
}: EarnModalProps) => {
  const [isCheckingSocialShareCode, setIsCheckingSocialShareCode] = useState(false);
  const [socialShareCode, setSocialShareCode] = useState<string>();
  const [socialShareCampaignData, setSocialShareCampaignData] = useState<SocialShareCampaignData>();
  const [hasVerified, setHasVerified] = useState(false);

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

    const getShareCodeData = async () => {
      return await getDocumentData<SocialShareData>('social-shares', potentialEarnCode);
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
        getShareCodeData().then((data) => {
          if (data) {
            data.sharedSocials.twitter
              ? setHasVerified(true)
              : setSocialShareCode(potentialEarnCode);
          } else {
            generateSocialShareCode();
          }
        });
      }
    });

    setIsCheckingSocialShareCode(false);
  }, [campaignId, potentialEarnCode, errorToast, isCampaignExpired]);

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
              {hasVerified && (
                <HasVerified
                  points={(doesOwnPinderNft ? 2 : 1) * socialShareCampaignData.pointsValue}
                />
              )}
              {!hasVerified &&
                socialShareCode &&
                socialShareCampaignData.isActive &&
                !isCampaignExpired && (
                  <ShareOnTwitter
                    socialShareCode={socialShareCode}
                    defaultContent={socialShareCampaignData.defaultContent}
                    points={socialShareCampaignData.pointsValue}
                    doesOwnPinderNft={doesOwnPinderNft}
                    campaignId={campaignId}
                    setHasVerified={setHasVerified}
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
