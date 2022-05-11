import { Button, ConditionalSpinner } from 'components/ui';

interface PaymentButtonProps {
  total: number;
  isProcessing: boolean;
  disabled: boolean;
}
export const PaymentButton = ({ disabled, isProcessing, total }: PaymentButtonProps) => (
  <Button type="submit" disabled={disabled}>
    <ConditionalSpinner loading={isProcessing} size={'15px'}>
      {`Pay $${total.toFixed(2)} to mint`}
    </ConditionalSpinner>
  </Button>
);
