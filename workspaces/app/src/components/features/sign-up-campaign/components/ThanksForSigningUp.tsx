import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'components/ui';
import { QUERY } from 'styles';
import { CtaLayout } from './components';

const Heading = styled.h1`
  --font-size: 52px;

  @media ${QUERY.TABLET} {
    --font-size: 34px;
  }

  font-size: var(--font-size);
`;

const SecondaryInfo = styled.div`
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const shareButtonStyle = css`
  width: 250px;
  margin-top: 30px;
`;

export const ThanksForSigningUp = () => (
  <>
    <Heading>Thanks For Signing Up</Heading>
    <CtaLayout>
      <SecondaryInfo>
        <span>As an early supporter,</span>
        <span>you will receive a $10 credit when Coral is live.</span>
      </SecondaryInfo>
      <Button css={shareButtonStyle}>Share</Button>
    </CtaLayout>
  </>
);
