import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Link, Modal } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import { SIGN_UP_CAMPAIGN_MAX_OPENINGS } from 'consts';
import { useLogin } from 'libraries/authentication';
import { useIsMetaMaskInjected } from 'libraries/blockchain';
import { useCallback, useState } from 'react';
import { SignUpCampaignProps as SignUpProps } from '../SignUpCampaign';
import avalancheLogoSVG from './avalanche-logo.svg';
import { CoralSocialLinks, Heading, Layout } from './components';
import { useModal } from './hooks';

const rewardSpotsStyle = css`
  text-transform: uppercase;
  font-size: 12px;
`;
interface RewardSpotsProps {
  remaining: number;
}
const RewardSpots = ({ remaining }: RewardSpotsProps) => (
  <span css={rewardSpotsStyle}>
    {remaining}/{SIGN_UP_CAMPAIGN_MAX_OPENINGS} Early Reward Spots
  </span>
);

const poweredByAvalancheStyle = css`
  display: flex;
  justify-self: flex-end;
  font-size: 18px;
  gap: 10px;
  align-items: center;
`;

const AvalancheLogo = getIconComponent('AvalancheLogo', avalancheLogoSVG);

const poweredByStyle = css`
  width: 100%;
`;

const linkStyle = css`
  display: flex;
`;
const PoweredByAvalanche = () => (
  <div css={poweredByAvalancheStyle}>
    <span css={poweredByStyle}>Powered By</span>
    <Link css={linkStyle} href="https://www.avax.network/">
      <AvalancheLogo />
    </Link>
  </div>
);

const SubLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  max-width: 250px;
`;

const SignUpButton = styled(Button)`
  max-width: 65%;
`;

export const SignUp = ({ prelaunchSignUpUsers }: SignUpProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const [isLoggingInWithMetaMask, setIsLoggingInWithMetaMask] = useState(false);
  const [isLoggingInWithSocial, setIsLoggingInWithSocial] = useState(false);

  const { login, isLoggingIn } = useLogin(closeModal);

  const loginWithMetaMask = useCallback(async () => {
    setIsLoggingInWithMetaMask(true);
    await login();
    setIsLoggingInWithMetaMask(false);
  }, [login]);

  const isMetaMaskInjected = useIsMetaMaskInjected();

  const remaining = SIGN_UP_CAMPAIGN_MAX_OPENINGS - prelaunchSignUpUsers.length;

  return (
    <>
      <Layout>
        <Heading>A modern marketplace for music, collectibles, events and experiences</Heading>
        <SubLayout>
          <RewardSpots remaining={remaining} />
          <Button onClick={openModal} loading={isLoggingIn}>
            Sign Up
          </Button>
          <CoralSocialLinks />
        </SubLayout>
      </Layout>
      <PoweredByAvalanche />
      {isModalOpen && (
        <Modal
          title={'Sign Up'}
          onClick={closeModal}
          mainContainerStyle={css`
            padding: 16px 0;
            align-items: center;
          `}
        >
          <SignUpButton
            onClick={loginWithMetaMask}
            loading={isLoggingInWithMetaMask}
            disabled={!isMetaMaskInjected || isLoggingInWithMetaMask}
          >
            Sign Up With MetaMask
          </SignUpButton>
          <span>OR</span>
          <SignUpButton loading={isLoggingInWithSocial} disabled={isLoggingInWithMetaMask}>
            Sign Up With Social Login
          </SignUpButton>
        </Modal>
      )}
    </>
  );
};
