import styled from '@emotion/styled';
import { Button, ConditionalSpinner, Input, Modal } from 'components/ui';
import { useIsAuthenticated } from 'libraries/authentication';
import tokens from 'styles/tokens';
import { getUseRedeemPointsForm } from './hooks';
import { useMemo } from 'react';
import { POINTS_AVAX_VALUE } from 'consts';

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

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 260px;
`;

const REDEMPTION_CONTENT =
  'Enter a wallet address you would like to send your $AVAX to. Please be careful you enter the address in accurately. Once you hit claim, this action can not be done and we cannot retrieve assets once sent. ';

export const PointsRedemptionModal = ({
  redemptionAmount,
  closeModal,
}: PointsRedemptionModalProps) => {
  const isAuthenticated = useIsAuthenticated();

  const useRedeemPointsForm = useMemo(() => getUseRedeemPointsForm(closeModal), [closeModal]);
  const { register, errors, isRedeemingPoints, isDirty, isValid, handleSubmitAddress } =
    useRedeemPointsForm();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Modal
      onClick={closeModal}
      title={isRedeemingPoints ? 'Redeeming Points...' : 'Redeem My Points'}
      fullHeight
    >
      <SpinnerWrapper>
        <Form onSubmit={handleSubmitAddress}>
          <ConditionalSpinner
            size={'80px'}
            center
            color={tokens.background.color.brand}
            loading={isRedeemingPoints}
          >
            <Input
              placeholder={'0x...'}
              label={'Enter Wallet Address'}
              {...register('address')}
              error={errors?.address?.message}
            />
            <TextContent>{REDEMPTION_CONTENT}</TextContent>
            <Button
              disabled={!isRedeemingPoints || !isDirty || !isValid || redemptionAmount <= 0}
              type="submit"
            >
              {redemptionAmount > 0
                ? `Claim ${redemptionAmount / POINTS_AVAX_VALUE} AVAX`
                : `No Points to Redeem`}
            </Button>
          </ConditionalSpinner>
        </Form>
      </SpinnerWrapper>
    </Modal>
  );
};
