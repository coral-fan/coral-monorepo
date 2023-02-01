import styled from '@emotion/styled';
import { Card } from 'components/ui';
import { QUERY } from 'styles';
import tokens from 'styles/tokens';
import { PillLink } from './pills';

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 10px 14px;
  height: 100%;
  min-height: 280px;

  @media ${QUERY.TABLET} {
    padding: 20px;
    min-height: auto;
  }
`;

const Heading = styled.h3`
  --font-size: ${tokens.font.size.xl};
  font-size: var(--font-size);
  --line-height: ${tokens.font.line_height.xl};
  line-height: var(--line-height);
  font-weight: ${tokens.font.weight.bold};
  max-width: 550px;

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.xxl};
    --line-height: ${tokens.font.line_height.xxl};
  }
`;

const Text = styled.p`
  --font-size: ${tokens.font.size.md};
  --line-height: ${tokens.font.line_height.md};

  font-size: var(--font-size);
  line-height: var(--line-height);

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.lg};
    --line-height: ${tokens.font.line_height.lg};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const GetPaidForBeingAFan = () => (
  <Container>
    <Heading>Get Paid For Being A Fan.</Heading>
    <InfoContainer>
      <PillLink
        href="https://editorial.coral.fan/introducing-a-new-coral-get-paid-for-being-a-fan/"
        openInNewTab
      >
        Learn More
      </PillLink>
      <Text>
        Earn Coral Points and redeem them any time for $AVAX, or hold on to them for special
        rewards, access, and free stuff.
        <br />
        New earn opportunities dropping soon.
      </Text>
    </InfoContainer>
  </Container>
);
