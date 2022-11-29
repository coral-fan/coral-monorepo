import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useOpenSignInModal } from 'components/app';
import { Card, CtaButton as CtaButtonBase, Heading } from 'components/ui';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';
import { QUERY } from 'styles';
import { Earn } from './Earn';

const Container = styled(Card)`
  padding: 20px;
  gap: 20px;

  @media ${QUERY.TABLET} {
    margin-top: 20px;
  }
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 22px;
`;

const ctaButtonStyle = css`
  padding: 20px;
`;

const CtaButton = styled(CtaButtonBase)`
  ${ctaButtonStyle}
`;

interface ShareToEarnProps {
  doesOwnPinderNft: boolean;
}

const POINTS = 200;

export const ShareToEarn = ({ doesOwnPinderNft }: ShareToEarnProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { isLoggingIn } = useLogin();
  const openSignModal = useOpenSignInModal();

  return (
    <Container>
      <Heading level={2} styleVariant={'h3'}>
        Share To Earn {doesOwnPinderNft ? POINTS * 2 : POINTS} Coral Points
      </Heading>
      <Text>
        Coral rewards you for being a fan. When you share content on Twitter, you earn points that
        can be redeemed any time. Start by sharing Pinders Coral Profile page.
      </Text>
      {isAuthenticated ? (
        <Earn campaignId="xqSPsvjg8w88feqYlCIc" doesOwnPinderNft={doesOwnPinderNft}>
          <CtaButton>Earn Now</CtaButton>
        </Earn>
      ) : (
        <CtaButton loading={isLoggingIn} disabled={isLoggingIn} onClick={openSignModal}>
          Login
        </CtaButton>
      )}
    </Container>
  );
};
