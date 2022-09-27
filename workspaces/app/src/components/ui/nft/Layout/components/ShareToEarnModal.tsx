import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Modal } from 'components/ui/modals';
import { ModalProps } from 'components/ui/modals/Modal/types';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import twitterIconSVG from './twitter.svg';
import facebookIconSVG from './facebook.svg';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { getReferralCode } from 'libraries/models';
import { useCallback, useMemo } from 'react';
import tokens from 'styles/tokens';
import { Button } from 'components/ui/buttons';
import { useErrorToast, useSuccessToast } from 'libraries/utils/toasts';

interface ShareToEarnModalProps extends Pick<ModalProps, 'onClick'> {
  pointsValue: number;
  userId: string;
  campaignId: string;
  collectionName: string;
}

const Heading = styled.h2`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
`;

const ShareViaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const mainContainerStyle = css`
  margin-top: 12px;
  gap: 30px;
`;

const SocialIcon = styled(SVG)<SVGProps>`
  width: 45px;
  height: 45px;
`;

const TwitterIcon = () => <SocialIcon src={twitterIconSVG} />;
const FacebookIcon = () => <SocialIcon src={facebookIconSVG} />;

const SocialContainer = styled.div`
  display: flex;
  gap: 13px;
`;

const ReferralLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CopyReferralLinkContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ReferralLink = styled.span`
  border: solid 1px ${tokens.border.color.brand};
  border-radius: ${tokens.border.radius.sm};
  background-color: ${tokens.background.color.primary};
  color: ${tokens.font.color.secondary};
  padding: 10px 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ShareToEarnModal = ({
  pointsValue,
  onClick,
  userId,
  campaignId,
  collectionName,
}: ShareToEarnModalProps) => {
  const referralCode = useMemo(() => getReferralCode(userId, campaignId), [userId, campaignId]);
  const referralUrl = useMemo(
    () => `${window.location.href}?referral_code=${referralCode}`,
    [referralCode]
  );

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const copyReferralUrlToClipboard = useCallback(async () => {
    try {
      await window.navigator.clipboard.writeText(referralUrl);
      successToast('referral url copied to clipboard!');
    } catch (e) {
      console.error(e);
      errorToast();
    }
  }, [referralUrl, successToast, errorToast]);

  return (
    <Modal
      onClick={onClick}
      title="Share To Earn"
      subtitle={`${pointsValue} Coral Points`}
      mainContainerStyle={mainContainerStyle}
    >
      <ShareViaContainer>
        <Heading>Share Via</Heading>
        <SocialContainer>
          <TwitterShareButton
            key={'twitter'}
            title={collectionName}
            url={referralUrl}
            via={'coral__fan'}
          >
            <TwitterIcon />
          </TwitterShareButton>
          <FacebookShareButton quote={collectionName} url={referralUrl} key={'facebook'}>
            <FacebookIcon />
          </FacebookShareButton>
        </SocialContainer>
      </ShareViaContainer>
      <ReferralLinkContainer>
        <Heading>Or Copy This Unique Referral Link</Heading>
        <CopyReferralLinkContainer>
          <ReferralLink>{referralUrl}</ReferralLink>
          <Button onClick={copyReferralUrlToClipboard}>Copy</Button>
        </CopyReferralLinkContainer>
      </ReferralLinkContainer>
    </Modal>
  );
};
