import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useSignInModalState } from 'components/app';
import { Button } from 'components/ui';
import { SIGN_UP_CAMPAIGN_MAX_OPENINGS } from 'consts';
import { useLogin } from 'libraries/authentication';
import { QUERY } from 'styles';
import { SignUpCampaignProps as SignUpProps } from '../SignUpCampaign';
import { CoralSocialLinks, Layout } from './components';

const Heading = styled.h1`
  --font-size: 52px;

  @media ${QUERY.TABLET} {
    --font-size: 64px;
  }

  @media ${QUERY.LAPTOP} {
    --font-size: 80px;
  }

  font-size: var(--font-size);
  /* font-weight: 400; */
  padding-bottom: 4px;

  line-height: 94%;
  text-align: center;
`;

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
        <Heading>
          The marketplace
          <br /> for a new era of music.
        </Heading>
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
