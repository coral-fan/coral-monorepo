import styled from '@emotion/styled';
import { Link, Modal } from 'components/ui';
import { CLIENT_ENVIRONMENT } from 'consts';
import tokens from 'styles/tokens';
import { SpinnerWrapper } from 'components/ui';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from 'libraries/blockchain';

const TRANSACTION_URL =
  CLIENT_ENVIRONMENT == 'production'
    ? 'https://snowtrace.io/tx/'
    : 'https://testnet.snowtrace.io/tx/';

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
  const { provider } = useWallet();
  const [txnAvaxValue, setTxnAvaxValue] = useState('0');

  useEffect(() => {
    if (!provider) throw Error('Provider not found');

    const getAvaxValue = async () => {
      const { value } = await provider.getTransaction(transactionHash);
      setTxnAvaxValue(parseFloat(ethers.utils.formatEther(value)).toFixed(2));
    };

    getAvaxValue();
  }, [transactionHash, provider]);

  return (
    <Modal onClick={closeModal} fullHeight>
      <SpinnerWrapper>
        <SuccessContainer>
          <SuccessText>Congratulations!</SuccessText>
          <SuccessText>
            You&#39;ve {`${transactionType === 'withdraw' ? 'withdrawn' : 'redeemed'}:`}
          </SuccessText>
          <SuccessStatistic>
            {transactionType == 'withdraw' ? `${txnAvaxValue} AVAX` : `${pointsRedeemed} PTS`}
          </SuccessStatistic>
          <SuccessSubText>
            {`${txnAvaxValue}`} AVAX has been sent to the address you provided
          </SuccessSubText>
          <RedemptionTransactionLink href={`${TRANSACTION_URL}${transactionHash}`}>
            View Transaction
          </RedemptionTransactionLink>
        </SuccessContainer>
      </SpinnerWrapper>
    </Modal>
  );
};
