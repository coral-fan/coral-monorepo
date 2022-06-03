import { ConditionalSpinner, Modal } from 'components/ui';
import { TRANSACTION_FEE } from 'consts';
import { useAvaxUsdPrice, getPaymentLineItems, useWallet } from 'libraries/blockchain';
import { getDocumentReferenceClientSide } from 'libraries/firebase';
import {
  Collection,
  Details,
  GatedContent,
  PurchaseData,
  useStripeCustomerId,
} from 'libraries/models';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { docData } from 'rxfire/firestore';
import tokens from 'styles/tokens';
import { AssetInfo, AssetInfoProps, ExistingCardPayment, TransactionSummary } from './components';
import { AvaxPayment } from './components/AvaxPayment';
import {
  ContentContainer,
  DifferentCardLink,
  Heading,
  HeadingContainer,
} from './components/components';
import { NewCardInput } from './components/NewCardInput';
import { PaymentSuccess } from './components/PaymentSuccess';
import { useCurrentUser } from './hooks';
import { useErrorToast } from 'libraries/utils/toasts';

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
  const { isActive: isWalletUser } = useWallet();

  const [isAvax, setIsAvax] = useState(isWalletUser);

  // Avax Exchange Rate and Price
  const { exchangeRate, isLoading: isAvaxPriceLoading } = useAvaxUsdPrice();
  const avaxPrice = isAvaxPriceLoading ? 0 : usdPrice / exchangeRate;

  // Stripe customer Id means user has a card on file
  const stripeCustomerId = useStripeCustomerId();

  const [shouldUseExistingCard, setShouldUseExistingCard] = useState(stripeCustomerId !== null);

  // Transaction Line Items
  const { total, formattedPrice, formattedTransactionFee, formattedTotal, formattedAltTotal } =
    useMemo(
      () => getPaymentLineItems(usdPrice, avaxPrice, TRANSACTION_FEE, isAvax),
      [avaxPrice, usdPrice, isAvax]
    );

  const handleSwitchPaymentMethodClick = useCallback(() => setIsAvax((isAvax) => !isAvax), []);

  const handleUseDifferentCardClick = useCallback(
    () => setShouldUseExistingCard((useExistingCard) => !useExistingCard),
    []
  );

  const [purchaseId, setPurchaseId] = useState<string>();
  const [assetId, setAssetId] = useState<number>();

  const title = useMemo(
    () => (assetId ? 'Congratulations, you now own...' : 'Checkout'),
    [assetId]
  );

  const currentUser = useCurrentUser();

  const [isMintingNFT, setIsMintingNFT] = useState(false);

  const errorToast = useErrorToast();

  useEffect(() => {
    if (purchaseId !== undefined) {
      setIsMintingNFT(true);
      const purchaseDocRef = getDocumentReferenceClientSide<PurchaseData>('purchases', purchaseId);
      const purchaseData$ = docData(purchaseDocRef);

      const subscription = purchaseData$.subscribe(({ status, assetId }) => {
        if (status === 'rejected') {
          errorToast();
          setIsMintingNFT(false);
        }
        if (status === 'completed' && assetId !== null) {
          setAssetId(assetId);
          setIsMintingNFT(false);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [purchaseId, errorToast]);

  const modalIsNarrow = assetId !== undefined;

  return (
    <Modal title={title} onClick={closePaymentModal} fullHeight={true} isNarrow={modalIsNarrow}>
      <ContentContainer>
        {assetId !== undefined && currentUser ? (
          <PaymentSuccess
            assetId={assetId}
            collectionName={collectionName}
            imageUrl={imageUrl}
            type={type}
            gatedContent={gatedContent}
            artistId={artistId}
            artistName={artistName}
            artistProfilePhoto={artistProfilePhoto}
            collectionDetails={collectionDetails}
            ownerUsername={currentUser.username}
            ownerAddress={currentUser.id}
            ownerType={currentUser.type}
            ownerProfilePhoto={artistProfilePhoto}
            collectionId={collectionId}
          />
        ) : (
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
              loading={isAvaxPriceLoading || isMintingNFT}
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
                    <Heading>{shouldUseExistingCard ? 'Card On File' : 'Payment Details'}</Heading>
                    {stripeCustomerId && (
                      <DifferentCardLink type="button" onClick={handleUseDifferentCardClick}>
                        {shouldUseExistingCard ? 'Use a Different Card' : 'Use Existing Card'}
                      </DifferentCardLink>
                    )}
                  </>
                )}
              </HeadingContainer>
              {isAvax && isWalletUser ? (
                <AvaxPayment
                  total={total}
                  collectionId={collectionId}
                  handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                  setAssetId={setAssetId}
                  setIsMintingNFT={setIsMintingNFT}
                  closePaymentModal={closePaymentModal}
                />
              ) : shouldUseExistingCard && stripeCustomerId ? (
                <ExistingCardPayment
                  stripeCustomerId={stripeCustomerId}
                  total={total}
                  handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                  collectionId={collectionId}
                  setPurchaseId={setPurchaseId}
                  isWalletUser={isWalletUser}
                />
              ) : (
                <NewCardInput
                  stripeCustomerId={stripeCustomerId}
                  total={total}
                  handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                  collectionId={collectionId}
                  setPurchaseId={setPurchaseId}
                  isWalletUser={isWalletUser}
                />
              )}
            </ConditionalSpinner>
            {isMintingNFT && 'Minting NFT...'}
          </>
        )}
      </ContentContainer>
    </Modal>
  );
};
