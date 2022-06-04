import styled from '@emotion/styled';
import { LinkButton } from 'components/ui';

export const PaymentMethodLinkButton = styled(LinkButton)`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  text-decoration: underline;
`;

interface SwitchPaymentMethodProps {
  isAvax: boolean;
  handleClick: () => void;
}
export const SwitchPaymentMethod = ({ isAvax, handleClick }: SwitchPaymentMethodProps) => (
  <PaymentMethodLinkButton type="button" onClick={handleClick}>
    {`switch to pay with ${isAvax ? 'card' : 'wallet'}`}
  </PaymentMethodLinkButton>
);
