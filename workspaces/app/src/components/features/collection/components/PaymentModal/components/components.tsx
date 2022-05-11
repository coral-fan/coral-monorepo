import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

export const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 110px;
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
