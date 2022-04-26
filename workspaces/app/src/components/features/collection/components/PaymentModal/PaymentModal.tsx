import styled from '@emotion/styled';
import { Button, ConditionalSpinner, LinkButton, Modal } from 'components/ui';
import {
  useWallet,
  useAvaxUsdPrice,
  getAvaxFormat,
  getPaymentLineItems,
} from 'libraries/blockchain';
import { Collection } from 'libraries/models';
import { FC, useCallback, useState } from 'react';
import tokens from 'styles/tokens';
import { AssetInfo, AssetInfoProps, Currency, TransactionSummary } from './components';
import { CreditCardModal } from './components/CreditCardModal';

const TRANSACTION_FEE = 0.01;

interface PaymentModalProps extends AssetInfoProps {
  title: string;
  usdPrice: number;
  collectionId: Collection['id'];
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
  usdPrice,
  collectionId,
}) => {
  const [isAvax, setIsAvax] = useState(true);
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const { exchangeRate, isLoading } = useAvaxUsdPrice();
  const { balance } = useWallet();

  const formattedBalance = balance && getAvaxFormat(balance);
  const avaxPrice = isLoading ? 0 : usdPrice / exchangeRate;

  const { price, transactionFee, total, altTotal } = getPaymentLineItems(
    usdPrice,
    avaxPrice,
    TRANSACTION_FEE,
    isAvax
  );

  const handleSwitchPaymentMethodClick = useCallback(() => setIsAvax(!isAvax), [isAvax]);

  const handleButtonClick = async () => {
    if (isAvax) {
      console.log('web3 flow');
    }
    setShowCreditCardModal(true);
  };

  const closeCreditCardModal = useCallback(() => setShowCreditCardModal(false), []);

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
        <ConditionalSpinner
          size={'100px'}
          color={tokens.background.color.brand}
          loading={isLoading}
        >
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
        <Button onClick={handleButtonClick}>pay and claim</Button>
      </ContentContainer>
      {showCreditCardModal && (
        <CreditCardModal
          onSuccessfulPayment={closeCreditCardModal}
          closeModal={closeCreditCardModal}
          collectionId={collectionId}
          price={usdPrice}
        />
      )}
    </Modal>
  );
};
