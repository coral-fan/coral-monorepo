import styled from '@emotion/styled';
import { Link, Modal } from 'components/ui';
import { AVALANCHE, POINTS_AVAX_VALUE } from 'consts';
import tokens from 'styles/tokens';
import { SpinnerWrapper } from 'components/ui';
import { useMemo } from 'react';

const { BLOCK_EXPLORER_URL } = AVALANCHE;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 0;
`;

const SuccessText = styled.div`
  text-align: center;
  font-size: ${tokens.font.size.xl};
  letter-spacing: ${tokens.font.letter_spacing.xl};
  line-height: ${tokens.font.line_height.xl};
`;

const SuccessSubText = styled.div`
  text-align: center;
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
`;

const SuccessStatistic = styled.div`
  color: ${tokens.font.color.brand};
  text-align: center;
  font-size: ${tokens.font.size.xxl};
  letter-spacing: ${tokens.font.letter_spacing.xxl};
  line-height: ${tokens.font.line_height.xxl};
`;

const RedemptionTransactionLink = styled(Link)`
  text-align: center;
  font-size: ${tokens.font.size.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  line-height: ${tokens.font.line_height.sm};
  text-decoration: underline;
  text-transform: uppercase;
`;

type SuccessTransactionType = 'withdraw' | 'redemption';

interface TransactionSuccessModalProps {
  transactionHash: string;
  transactionType: SuccessTransactionType;
  pointsRedeemed?: number;
  closeModal: () => void;
}

export const TransactionSuccessModal = ({
  pointsRedeemed,
  transactionHash,
  transactionType,
  closeModal,
}: TransactionSuccessModalProps) => {
  const avaxValue = useMemo(
    () => pointsRedeemed && pointsRedeemed / POINTS_AVAX_VALUE,
    [pointsRedeemed]
  );

  return (
    <Modal onClick={closeModal} fullHeight>
      <SpinnerWrapper>
        <SuccessContainer>
          <SuccessText>Congratulations!</SuccessText>
          <SuccessText>
            You&#39;ve {`${transactionType === 'withdraw' ? 'withdrawn' : 'redeemed'}:`}
          </SuccessText>
          <SuccessStatistic>
            {transactionType == 'withdraw' ? `${avaxValue} AVAX` : `${pointsRedeemed} PTS`}
          </SuccessStatistic>
          <SuccessSubText>
            {`${avaxValue}`} AVAX has been sent to the address you provided
          </SuccessSubText>
          <RedemptionTransactionLink href={`${BLOCK_EXPLORER_URL}/tx/${transactionHash}`}>
            View Transaction
          </RedemptionTransactionLink>
        </SuccessContainer>
      </SpinnerWrapper>
    </Modal>
  );
};
