import { ConditionalSpinner, Modal, Spinner } from 'components/ui';
import { TRANSACTION_FEE } from 'consts';
import { useAvaxUsdPrice, getPaymentLineItems } from 'libraries/blockchain';
import { Collection, Details, GatedContent, useStripeCustomerId } from 'libraries/models';
import { useCallback, useMemo, useState } from 'react';
import tokens from 'styles/tokens';
import { AssetInfo, AssetInfoProps, ExistingCardPayment, TransactionSummary } from './components';
import { AvaxPayment } from './components/AvaxPayment';
import {
  ContentContainer,
  DifferentCardLink,
  Heading,
  HeadingContainer,
  ProcessingContainer,
} from './components/components';
import { NewCardInput } from './components/NewCardInput';
import { PaymentSuccess } from './components/PaymentSuccess';

interface PaymentModalProps extends AssetInfoProps {
  usdPrice: number;
  artistId: string;
  collectionId: Collection['id'];
  collectionDetails: Details;
  gatedContent: GatedContent;
  closePaymentModal: () => void;
}

export const PaymentModal = ({
  imageUrl,
  collectionName,
  artistId,
  artistName,
  artistProfilePhoto,
  type,
  closePaymentModal,
  usdPrice,
  collectionId,
  gatedContent,
  collectionDetails,
}: PaymentModalProps) => {
  const [isAvax, setIsAvax] = useState(true);
  const [useExistingCard, setUseExistingCard] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSuccessfulPayment, setIsSuccessfulPayment] = useState(false);

  // Avax Exchange Rate and Price
  const { exchangeRate, isLoading: isAvaxPriceLoading } = useAvaxUsdPrice();
  const avaxPrice = isAvaxPriceLoading ? 0 : usdPrice / exchangeRate;

  // Stripe customer Id means user has a card on file
  const stripeCustomerId = useStripeCustomerId();

  // Transaction Line Items
  const { total, formattedPrice, formattedTransactionFee, formattedTotal, formattedAltTotal } =
    getPaymentLineItems(usdPrice, avaxPrice, TRANSACTION_FEE, isAvax);

  const handleSwitchPaymentMethodClick = useCallback(() => setIsAvax(!isAvax), [isAvax]);

  const handleProcessingPayment = useCallback(
    (processingPayment: boolean) => setIsProcessingPayment(processingPayment),
    []
  );

  const handleUseDifferentCardClick = useCallback(
    () => setUseExistingCard(!useExistingCard),
    [useExistingCard]
  );

  const hasExistingCard = useMemo(
    () => stripeCustomerId && useExistingCard,
    [stripeCustomerId, useExistingCard]
  );

  const title = useMemo(
    () => (isSuccessfulPayment ? 'Congratulations, you now own...' : 'Checkout'),
    [isSuccessfulPayment]
  );

  // TODO: Listen for successful mint
  // On successful mint:
  // setIsSuccessfulPayment(true);
  // closePaymentModal

  // TODO: Error Modal if charge is declined or other error comes back from Stripe

  return (
    <Modal title={title} onClick={closePaymentModal} fullHeight={true}>
      <ContentContainer>
        {isProcessingPayment && (
          <ProcessingContainer>
            <Spinner size={'100px'} color={tokens.background.color.brand} />
            <span>Processing your purchase...</span>
          </ProcessingContainer>
        )}
        {!isSuccessfulPayment && !isProcessingPayment && (
          <>
            <AssetInfo
              imageUrl={imageUrl}
              collectionName={collectionName}
              artistName={artistName}
              artistProfilePhoto={artistProfilePhoto}
              type={type}
            />
            <ConditionalSpinner
              size={'60px'}
              color={tokens.background.color.brand}
              loading={isAvaxPriceLoading}
            >
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
                <AvaxPayment
                  total={total}
                  handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                />
              ) : hasExistingCard ? (
                <ExistingCardPayment
                  stripeCustomerId={stripeCustomerId}
                  total={total}
                  handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                  collectionId={collectionId}
                  setProcessingState={handleProcessingPayment}
                />
              ) : (
                <NewCardInput
                  total={total}
                  handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                  collectionId={collectionId}
                  setProcessingState={handleProcessingPayment}
                />
              )}
            </ConditionalSpinner>
          </>
        )}
        {isSuccessfulPayment && (
          <PaymentSuccess
            assetId={101} //TODO: Get asset ID from successful transaction
            collectionName={collectionName}
            imageUrl={imageUrl}
            type={type}
            gatedContent={gatedContent}
            artistId={artistId}
            artistName={artistName}
            artistProfilePhoto={artistProfilePhoto}
            collectionDetails={collectionDetails}
            ownerUsername={''} //TODO: Get data from Firestore
            ownerAddress={''} //TODO: Should this come from chain or just use current user?
            ownerType={'fan'} //TODO: Get data from Firestore
            ownerProfilePhoto={artistProfilePhoto}
            collectionId={collectionId}
          />
        )}
      </ContentContainer>
    </Modal>
  );
};
