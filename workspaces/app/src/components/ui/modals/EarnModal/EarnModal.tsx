import { ConditionalSpinner, Modal, SpinnerWrapper } from 'components/ui';
import { getDocumentData } from 'libraries/firebase';
import { getEarnCode, SocialShareCampaignData, SocialShareData } from 'libraries/models';
import { getCoralAPIAxios } from 'libraries/utils';
import { useErrorToast } from 'libraries/utils/toasts';
import { useEffect, useMemo, useRef, useState } from 'react';
import tokens from 'styles/tokens';
import { CampaignExpired, CampaignNotActive, HasVerified } from './components';
import { ShareOnTwitter } from './components/ShareOnTwitter/ShareOnTwiter';

interface EarnModalProps {
  closeEarnModal: () => void;
  uid: string;
  campaignId: string;
  socialShareCampaignData: SocialShareCampaignData;
}

const coralAPI = getCoralAPIAxios();

export const EarnModal = ({
  closeEarnModal,
  campaignId,
  uid,
  socialShareCampaignData,
}: EarnModalProps) => {
  const [isCheckingSocialShareCode, setIsCheckingSocialShareCode] = useState(false);
  const [socialShareCode, setSocialShareCode] = useState<string>();
  const [hasVerified, setHasVerified] = useState(false);

  const potentialEarnCode = useMemo(() => getEarnCode(uid, campaignId), [uid, campaignId]);

  const errorToast = useErrorToast();

  /**
   * below ref is necessary to prevent calling the generate code api twice because this component renders twice back to back (not 100% why)
   * because of cold starts in Vercel serverless functions, it takes up to 3 - 4 seconds for the first generate code call to resolve when deployed
   * as a result, on the 2nd render, social share code doesn't exist and the generate code api is called again
   * however, this double call results in "Error: 4 DEADLINE_EXCEEDED: Deadline Exceeded"
   * https://stackoverflow.com/questions/66865783/google-cloud-firestore-error-4-deadline-exceeded-deadline-exceeded-while-crea
   * showing the user a could not generate code toast (even though the code was generated)
   */
  const isGeneratingCode = useRef(false);

  const isCampaignExpired = useMemo(
    () =>
      socialShareCampaignData &&
      (new Date() >= new Date(socialShareCampaignData.endDate) ||
        socialShareCampaignData.totalPointsEarned >= socialShareCampaignData.totalPointsPool),
    [socialShareCampaignData]
  );

  useEffect(() => {
    const getShareCodeData = async () => {
      return await getDocumentData<SocialShareData>('social-shares', potentialEarnCode);
    };

    const generateSocialShareCode = async () => {
      if (!isGeneratingCode.current) {
        isGeneratingCode.current = true;
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
        } finally {
          isGeneratingCode.current = false;
        }
      }
    };

    if (!isCampaignExpired) {
      setIsCheckingSocialShareCode(true);
      getShareCodeData()
        .then((data) => {
          if (data) {
            data.sharedSocials.twitter
              ? setHasVerified(true)
              : setSocialShareCode(potentialEarnCode);
          } else {
            generateSocialShareCode();
          }
        })
        .finally(() => setIsCheckingSocialShareCode(false));
    }
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
              {hasVerified && <HasVerified points={socialShareCampaignData.pointsValue} />}
              {!hasVerified &&
                socialShareCode &&
                socialShareCampaignData.isActive &&
                !isCampaignExpired && (
                  <ShareOnTwitter
                    socialShareCode={socialShareCode}
                    defaultContent={socialShareCampaignData.defaultContent}
                    points={socialShareCampaignData.pointsValue}
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
