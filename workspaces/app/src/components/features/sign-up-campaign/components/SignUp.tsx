import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useSignInModalState } from 'components/app';
import { Button } from 'components/ui';
import { SIGN_UP_CAMPAIGN_MAX_OPENINGS } from 'consts';
import { useLogin } from 'libraries/authentication';
import { SignUpCampaignProps as SignUpProps } from '../SignUpCampaign';
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

const SubLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  max-width: 250px;
`;

export const SignUp = ({ prelaunchSignUpUsers }: SignUpProps) => {
  const { openModal } = useSignInModalState();

  const { isLoggingIn } = useLogin();

  const remaining = SIGN_UP_CAMPAIGN_MAX_OPENINGS - prelaunchSignUpUsers.length;

  return (
    <>
      <Layout>
        <Heading>The marketplace for a new era of music.</Heading>
        <SubLayout>
          <RewardSpots remaining={remaining} />
          <Button onClick={openModal} loading={isLoggingIn} disabled={isLoggingIn}>
            Sign Up
          </Button>
          <CoralSocialLinks />
        </SubLayout>
      </Layout>
    </>
  );
};
