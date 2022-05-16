import { Button } from 'components/ui';

interface PaymentButtonProps {
  total: number;
  disabled: boolean;
}
export const PaymentButton = ({ disabled, total }: PaymentButtonProps) => (
  <Button type="submit" disabled={disabled}>
    {`Pay $${total.toFixed(2)} to mint`}
  </Button>
);
