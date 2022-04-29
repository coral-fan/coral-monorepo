import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Link } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import { SIGN_UP_CAMPAIGN_MAX_OPENINGS } from 'consts';
import { useLogin } from 'libraries/authentication';
import { SignUpCampaignProps as SignUpProps } from '../SignUpCampaign';
import avalancheLogoSVG from './avalanche-logo.svg';
import { CoralSocialLinks, Heading, Layout } from './components';

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

export const SignUp = ({ prelaunchSignUpUsers }: SignUpProps) => {
  const { login, isLoggingIn } = useLogin();

  const remaining = SIGN_UP_CAMPAIGN_MAX_OPENINGS - prelaunchSignUpUsers.length;

  return (
    <>
      <Layout>
        <Heading>A modern marketplace for music, collectibles, events and experiences</Heading>
        <SubLayout>
          <RewardSpots remaining={remaining} />
          <Button onClick={login} loading={isLoggingIn}>
            Sign Up
          </Button>
          <CoralSocialLinks />
        </SubLayout>
      </Layout>
      <PoweredByAvalanche />
    </>
  );
};
