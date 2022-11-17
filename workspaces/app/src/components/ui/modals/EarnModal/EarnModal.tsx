import styled from '@emotion/styled';
import { buttonStyle, ConditionalSpinner, Modal, SpinnerWrapper } from 'components/ui';
import { buttonBaseStyle } from 'components/ui/buttons/styles';
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
import { TwitterShareButton } from 'react-share';
import tokens from 'styles/tokens';

interface EarnModalProps {
  closeEarnModal: () => void;
  campaignId: string;
}

interface GenerateTweetProps {
  urls: string[];
  defaultContent: string;
}

const ContentContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.md};
  margin: auto;
`;

const ShareButton = styled.div`
  ${buttonBaseStyle}
  ${buttonStyle}
  display: flex;
  align-items: center;
  justify-content: center;
`;

const contentText = `Post a public tweet containing your unique identifier:`;

const generateTweet = ({ defaultContent, urls }: GenerateTweetProps) => {
  const urlsString = urls.reduce((str, url) => str + url + '\n', '');

  return `${defaultContent.replaceAll('/n', '\n')}\n\n${urlsString}\n`;
};

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

  const postContent = useMemo(() => {
    if (socialShareCode && socialShareCampaignData) {
      const { defaultContent, requiredContent } = socialShareCampaignData;
      const { urls } = requiredContent;

      return generateTweet({
        defaultContent,
        urls,
      });
    }
  }, [socialShareCode, socialShareCampaignData]);

  const CampaignAvailable = () => (
    <>
      <ContentContainer>{contentText}</ContentContainer>
      <ContentContainer>{socialShareCode}</ContentContainer>
      {socialShareCode && (
        <TwitterShareButton
          key={'twitter'}
          title={postContent}
          url={socialShareCode}
          onClick={closeEarnModal}
        >
          <ShareButton>Post On Twitter</ShareButton>
        </TwitterShareButton>
      )}
    </>
  );

  const CampaignNotActive = () => (
    <ContentContainer>This Campaign is not currently active</ContentContainer>
  );

  const CampaignExpired = () => <ContentContainer>This Campaign has ended</ContentContainer>;

  return (
    <SpinnerWrapper>
      <ConditionalSpinner loading={isCheckingSocialShareCode}>
        {socialShareCampaignData && (
          <Modal
            title={
              socialShareCampaignData.isActive && !isCampaignExpired
                ? `Share to Earn ${socialShareCampaignData.pointsValue} Coral Points`
                : `Campaign Unavailable`
            }
            onClick={closeEarnModal}
            fullHeight
          >
            {socialShareCode && socialShareCampaignData.isActive && !isCampaignExpired && (
              <CampaignAvailable />
            )}
            {!socialShareCampaignData.isActive && <CampaignNotActive />}
            {isCampaignExpired && <CampaignExpired />}
          </Modal>
        )}
      </ConditionalSpinner>
    </SpinnerWrapper>
  );
};
