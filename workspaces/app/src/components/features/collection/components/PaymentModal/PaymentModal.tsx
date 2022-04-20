import styled from '@emotion/styled';
import { Button, ConditionalSpinner, LinkButton, Modal } from 'components/ui';
import { useWallet } from 'libraries/blockchain';
import { useAvaxUsdPrice } from 'libraries/currency/hooks';
import { getAvaxFormat, getPaymentLineItems } from 'libraries/currency/utils';
import { FC, useCallback, useState } from 'react';
import tokens from 'styles/tokens';
import { AssetInfo, AssetInfoProps, Currency, TransactionSummary } from './components';

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
  align-items: center;
`;

const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  min-height: 100px;
  text-transform: uppercase;
  font-weight: ${tokens.font.weight.bold};
  gap: 4px;
`;

const WalletBalance = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
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
  const { balance } = useWallet();

  const formattedBalance = balance && getAvaxFormat(balance);
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
        <ConditionalSpinner size={'100px'} color={tokens.background.color.brand} loading={loading}>
          <TransactionSummary
            isAvax={isAvax}
            price={price}
            total={total}
            altTotal={altTotal}
            transactionFee={transactionFee}
            transactionFeePercentage={TRANSACTION_FEE * 100}
          />
          <PaymentMethodContainer>
            {isAvax && (
              <>
                <span>Wallet Balance</span>
                <WalletBalance>
                  {formattedBalance && <Currency value={formattedBalance} isAvax={isAvax} />}
                </WalletBalance>
              </>
            )}
          </PaymentMethodContainer>
          <SwitchPaymentMethod>
            <LinkButton onClick={handleSwitchPaymentMethodClick}>
              {`switch to pay with ${isAvax ? 'card' : 'wallet'}`}
            </LinkButton>
          </SwitchPaymentMethod>
        </ConditionalSpinner>
        <Button>pay and claim</Button>
      </ContentContainer>
    </Modal>
  );
};
