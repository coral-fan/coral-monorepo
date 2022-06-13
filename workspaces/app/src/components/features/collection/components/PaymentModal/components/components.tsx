import styled from '@emotion/styled';
import { LinkButton } from 'components/ui';
import tokens, { QUERY } from 'styles/tokens';

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

interface PaymentMethodContainerProps {
  isMobile: boolean;
}
export const PaymentMethodContainer = styled.div<PaymentMethodContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? '90px' : '110px')};
`;

export const Form = styled.form`
  width: 100%;
`;

interface CardElementContainerProps {
  width: string;
}

export const CardElementContainer = styled.div<CardElementContainerProps>`
  width: ${({ width }) => width};
  height: 40px;
  display: flex;
  align-items: center;
  border: solid 1px ${tokens.border.color.brand};
  border-radius: ${tokens.border.radius.sm};

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

export const ErrorContainer = styled.span`
  text-align: center;
  color: ${tokens.font.color.error};
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${QUERY.TABLET} {
    gap: 12px;
  }
`;

export const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Heading = styled.div`
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
  text-transform: uppercase;
`;

export const DifferentCardLink = styled(LinkButton)`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  text-decoration: underline;
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
`;

// TODO: Refactor ConditionalSpinner so we don't need to do this
export const ConditionalSpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  min-height: 180px;
`;
