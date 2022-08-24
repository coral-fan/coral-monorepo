import styled from '@emotion/styled';
import { Button, Input, Modal } from 'components/ui';
import { useIsAuthenticated } from 'libraries/authentication';
import tokens from 'styles/tokens';
import { useRedeemPointsForm } from './hooks';

interface PointsRedemptionModalProps {
  redemptionAmount: number;
  closeModal: () => void;
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

const REDEMPTION_CONTENT =
  'Enter a wallet address you would like to send your $AVAX to. Please be careful you enter the address in accurately. Once you hit claim, this action can not be done and we cannot retrieve assets once sent. ';

export const PointsRedemptionModal = ({
  redemptionAmount,
  closeModal,
}: PointsRedemptionModalProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { register, errors, handleSubmitAddress } = useRedeemPointsForm(closeModal);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Modal onClick={closeModal} title="Redeem My Points" fullHeight>
      <Form onSubmit={handleSubmitAddress}>
        <Input
          placeholder={'0x...'}
          label={'Enter Wallet Address'}
          {...register('address')}
          error={errors?.address?.message}
        ></Input>
        <TextContent>{REDEMPTION_CONTENT}</TextContent>
        <Button type="submit">Claim {redemptionAmount} AVAX</Button>
      </Form>
    </Modal>
  );
};
