import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useOpenSignInModal } from 'components/app';
import { Card, CtaButton as CtaButtonBase, Heading, Link } from 'components/ui';
import { CtaContent, CtaWrapperStyle } from 'components/ui/buttons/variants/CtaButton';
import { TAYLA_PARX_ALL_ACCESS_PASS_CONTRACT_ADDRESS } from 'consts';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';
import { useMemo } from 'react';
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

const ctaLinkStyle = css`
  ${CtaWrapperStyle};
  ${ctaButtonStyle}
  display: block;
  width: 100%;
  &:hover {
    filter: brightness(0.9);
  }
`;

const CtaButton = styled(CtaButtonBase)`
  ${ctaButtonStyle}
`;

interface PrimaryCtaProps {
  doesUserHaveAccessPass: boolean;
}
export const ShareToEarn = ({ doesUserHaveAccessPass }: PrimaryCtaProps) => {
  const heading = doesUserHaveAccessPass ? 'Share To Earn' : 'Get All Access & Share To Earn';
  const isAuthenticated = useIsAuthenticated();
  const { isLoggingIn } = useLogin();
  const openSignModal = useOpenSignInModal();

  const cta = useMemo(() => {
    if (isAuthenticated) {
      if (doesUserHaveAccessPass) {
        return (
          <Earn campaignId="xqSPsvjg8w88feqYlCIc">
            <CtaButton>Earn Now</CtaButton>
          </Earn>
        );
      }

      return (
        <Link
          css={ctaLinkStyle}
          href={`/collection/${TAYLA_PARX_ALL_ACCESS_PASS_CONTRACT_ADDRESS}`}
        >
          <CtaContent>Get All Access Pass</CtaContent>
        </Link>
      );
    }

    return (
      <CtaButton loading={isLoggingIn} disabled={isLoggingIn} onClick={openSignModal}>
        Login
      </CtaButton>
    );
  }, [doesUserHaveAccessPass, isAuthenticated, isLoggingIn, openSignModal]);

  return (
    <Container>
      <Heading level={2} styleVariant={'h3'}>
        {heading}
      </Heading>
      <Text>
        Coral rewards you for being a fan. When you share content on Twitter, you earn points that
        can be redeemed any time. Start by getting your All Access Pass to Tayla Parx.
      </Text>
      {cta}
    </Container>
  );
};
