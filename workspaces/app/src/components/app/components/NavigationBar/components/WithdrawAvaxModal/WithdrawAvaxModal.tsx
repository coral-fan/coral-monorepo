import styled from '@emotion/styled';
import {
  Button,
  ConditionalSpinner,
  Input,
  Modal,
  SpinnerWrapper,
  TransactionSuccessModal,
} from 'components/ui';
import { useIsAuthenticated } from 'libraries/authentication';
import { useWallet } from 'libraries/blockchain';
import tokens from 'styles/tokens';
import { useWithdrawAvaxForm } from './hooks';

interface WithdrawAvaxModalProps {
  closeWithdrawModal: () => void;
}

const TextContent = styled.div`
  font-size: ${tokens.font.size.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  line-height: ${tokens.font.line_height.sm};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SEND_AVAX_CONTENT =
  'Enter a wallet address you would like to send your $AVAX to. Please be careful you enter the address in accurately. Once you hit claim, this action can not be undone and we cannot retrieve assets once sent. The amount you receive will be slightly less than your balance - this is due to the transaction cost of using the Avalanche network with your wallet.';

export const WithdrawAvaxModal = ({ closeWithdrawModal }: WithdrawAvaxModalProps) => {
  const { balance } = useWallet();
  const isAuthenticated = useIsAuthenticated();

  const {
    register,
    errors,
    isWithdrawingAvax,
    isDirty,
    isValid,
    withdrawTxnReceipt,
    handleSubmitAddress,
  } = useWithdrawAvaxForm();

  if (!isAuthenticated || !balance) {
    return null;
  }

  return withdrawTxnReceipt && withdrawTxnReceipt.status === 1 && withdrawTxnReceipt ? (
    <TransactionSuccessModal
      transactionType="withdraw"
      transactionHash={withdrawTxnReceipt.transactionHash}
      closeModal={closeWithdrawModal}
    />
  ) : (
    <Modal
      onClick={closeWithdrawModal}
      title={isWithdrawingAvax ? 'Withdrawing AVAX...' : 'Withdraw AVAX'}
      fullHeight
    >
      <SpinnerWrapper>
        <Form onSubmit={handleSubmitAddress}>
          <ConditionalSpinner
            size={'80px'}
            center
            color={tokens.background.color.brand}
            loading={isWithdrawingAvax}
          >
            <Input
              placeholder={'0x...'}
              label={'Enter Wallet Address'}
              {...register('to')}
              error={errors?.to?.message}
            />
            <TextContent>{SEND_AVAX_CONTENT}</TextContent>
            <Button
              disabled={isWithdrawingAvax || !isDirty || !isValid || balance <= 0}
              type="submit"
            >
              Withdraw your AVAX
            </Button>
          </ConditionalSpinner>
        </Form>
      </SpinnerWrapper>
    </Modal>
  );
};
