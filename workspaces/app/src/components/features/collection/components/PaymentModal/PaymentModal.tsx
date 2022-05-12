import styled from '@emotion/styled';
import { ConditionalSpinner, LinkButton, Modal } from 'components/ui';
import { TRANSACTION_FEE } from 'consts';
import { useAvaxUsdPrice, getPaymentLineItems } from 'libraries/blockchain';
import { Collection, useStripeCustomerId } from 'libraries/models';
import { useCallback, useMemo, useState } from 'react';
import tokens from 'styles/tokens';
import { AssetInfo, AssetInfoProps, ExistingCardPayment, TransactionSummary } from './components';
import { AvaxPayment } from './components/AvaxPayment';
import { NewCardInput } from './components/NewCardInput';

interface PaymentModalProps extends AssetInfoProps {
  title: string;
  usdPrice: number;
  collectionId: Collection['id'];
  closePaymentModal: () => void;
}

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.div`
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
  text-transform: uppercase;
`;

const DifferentCardLink = styled(LinkButton)`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  text-decoration: underline;
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
`;

export const PaymentModal = ({
  imageUrl,
  collectionName,
  artistName,
  artistProfilePhoto,
  type,
  closePaymentModal,
  title,
  usdPrice,
  collectionId,
}: PaymentModalProps) => {
  const [isAvax, setIsAvax] = useState(true);
  const [useExistingCard, setUseExistingCard] = useState(true);

  const { exchangeRate, isLoading } = useAvaxUsdPrice();

  // Stripe customer Id means user has a card on file
  const stripeCustomerId = useStripeCustomerId();

  const avaxPrice = isLoading ? 0 : usdPrice / exchangeRate;

  const { total, formattedPrice, formattedTransactionFee, formattedTotal, formattedAltTotal } =
    getPaymentLineItems(usdPrice, avaxPrice, TRANSACTION_FEE, isAvax);

  const handleSwitchPaymentMethodClick = useCallback(() => setIsAvax(!isAvax), [isAvax]);

  const handleUseDifferentCardClick = useCallback(
    () => setUseExistingCard(!useExistingCard),
    [useExistingCard]
  );

  const hasExistingCard = useMemo(
    () => stripeCustomerId && useExistingCard,
    [stripeCustomerId, useExistingCard]
  );

  return (
    <Modal title={title} onClick={closePaymentModal} fullHeight={true}>
      <ContentContainer>
        <AssetInfo
          imageUrl={imageUrl}
          collectionName={collectionName}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          type={type}
        />
        <ConditionalSpinner size={'60px'} color={tokens.background.color.brand} loading={isLoading}>
          <TransactionSummary
            isAvax={isAvax}
            price={formattedPrice}
            total={formattedTotal}
            altTotal={formattedAltTotal}
            transactionFee={formattedTransactionFee}
            transactionFeePercentage={TRANSACTION_FEE * 100}
          />
          <HeadingContainer>
            {isAvax ? (
              <Heading>Pay with AVAX</Heading>
            ) : (
              <>
                <Heading>{hasExistingCard ? 'Card On File' : 'Payment Details'}</Heading>
                {stripeCustomerId && (
                  <DifferentCardLink type="button" onClick={handleUseDifferentCardClick}>
                    {hasExistingCard ? 'Use a Different Card' : 'Use Existing Card'}
                  </DifferentCardLink>
                )}
              </>
            )}
          </HeadingContainer>
          {isAvax ? (
            <AvaxPayment total={total} handleSwitchPaymentClick={handleSwitchPaymentMethodClick} />
          ) : hasExistingCard ? (
            <ExistingCardPayment
              stripeCustomerId={stripeCustomerId}
              total={total}
              handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
              collectionId={collectionId}
              onSuccessfulPayment={() => ''}
            />
          ) : (
            <NewCardInput
              total={total}
              handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
              collectionId={collectionId}
              onSuccessfulPayment={() => ''}
            />
          )}
        </ConditionalSpinner>
      </ContentContainer>
    </Modal>
  );
};
