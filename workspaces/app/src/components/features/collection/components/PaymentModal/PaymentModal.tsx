import styled from '@emotion/styled';
import { LinkButton, Modal } from 'components/ui';
import { useAvaxUsdPrice } from 'libraries/currency/hooks';
import { getPaymentLineItems } from 'libraries/currency/utils';
import { FC, useCallback, useState } from 'react';
import tokens from 'styles/tokens';
import { AssetInfo, AssetInfoProps } from './components/AssetInfo';
import { TransactionSummary } from './components/TransactionSummary';

const TRANSACTION_FEE = 0.01;

interface PaymentModalProps extends AssetInfoProps {
  title: string;
  priceUsd: number;
  closeShareModal: () => void;
}

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.md};
  margin: auto;
`;

const SwitchPaymentMethod = styled.div`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  text-decoration: underline;
`;

export const PaymentModal: FC<PaymentModalProps> = ({
  imageUrl,
  collectionName,
  artistName,
  artistProfilePhoto,
  type,
  closeShareModal,
  title,
  priceUsd,
}) => {
  const [isAvax, setIsAvax] = useState(true);
  const { exchangeRate, loading } = useAvaxUsdPrice();

  const priceAvax = !loading ? priceUsd / exchangeRate : 0;

  const { price, transactionFee, total, altTotal } = getPaymentLineItems(
    priceUsd,
    priceAvax,
    TRANSACTION_FEE,
    isAvax
  );

  const handleSwitchPaymentMethodClick = useCallback(() => setIsAvax(!isAvax), [isAvax]);

  return (
    <Modal title={title} onClick={closeShareModal} fullHeight={true}>
      <ContentContainer>
        <AssetInfo
          imageUrl={imageUrl}
          collectionName={collectionName}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          type={type}
        />
        <TransactionSummary
          isAvax={isAvax}
          price={price}
          total={total}
          altTotal={altTotal}
          transactionFee={transactionFee}
          transactionFeePercentage={TRANSACTION_FEE * 100}
          isLoading={loading}
        />
        <SwitchPaymentMethod>
          <LinkButton onClick={handleSwitchPaymentMethodClick}>
            {isAvax ? 'switch to pay with card' : 'switch to pay with wallet'}
          </LinkButton>
        </SwitchPaymentMethod>
      </ContentContainer>
    </Modal>
  );
};
