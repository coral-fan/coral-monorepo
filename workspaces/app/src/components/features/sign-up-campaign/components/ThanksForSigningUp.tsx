import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Image, LinkButton, ShareModal } from 'components/ui';
import { useLogout } from 'libraries/authentication';
import { QUERY } from 'styles';
import { SignUpCampaignProps } from '../SignUpCampaign';
import { CoralSocialLinks, Heading, Layout } from './components';
import { useModal } from './hooks';

const SecondaryInfo = styled.div`
  --font-size: 18px;

  @media ${QUERY.TABLET} {
    --font-size: 24px;
  }

  font-size: var(--font-size);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const shareButtonStyle = css`
  width: 250px;
`;

type ThanksForSigningUpProps = Pick<SignUpCampaignProps, 'isUserEarlySupporter'>;

const UnderlinedLinkButton = styled(LinkButton)`
  text-decoration: underline;
`;

export const ThanksForSigningUp = ({ isUserEarlySupporter }: ThanksForSigningUpProps) => {
  const logout = useLogout();

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Layout>
        <Heading>Thanks For Signing Up</Heading>
        <SecondaryInfo>
          {isUserEarlySupporter ? (
            <>
              <span>As an early supporter,</span>
              <span>you will receive a $10 credit when Coral is live.</span>
            </>
          ) : (
            <span>Stay tuned for updates</span>
          )}
        </SecondaryInfo>
        <Button css={shareButtonStyle} onClick={openModal}>
          Share
        </Button>
        <CoralSocialLinks />
        <UnderlinedLinkButton onClick={logout}>Logout</UnderlinedLinkButton>
      </Layout>
      {isModalOpen && (
        <ShareModal
          title={'Share Early Sign Up Campaign'}
          url={window.location.href}
          postTitle={'Coral Early Sign Up Campaign'}
          closeShareModal={closeModal}
        >
          <Image src={'/images/social-media-preview/1.png'} alt="" />
        </ShareModal>
      )}
    </>
  );
};
