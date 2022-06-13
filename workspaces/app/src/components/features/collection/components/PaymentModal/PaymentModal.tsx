import { ConditionalSpinner, Modal } from 'components/ui';
import { AVAX_TRANSACTION_FEE, CC_TRANSACTION_FEE } from 'consts';
import { getPaymentLineItems, useWallet, useAvaxTokenPrice } from 'libraries/blockchain';
import { getDocumentReferenceClientSide } from 'libraries/firebase';
import {
  Collection,
  Details,
  NullableString,
  PurchaseData,
  useStripeCustomerId,
} from 'libraries/models';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { docData } from 'rxfire/firestore';
import tokens from 'styles/tokens';
import { AssetInfo, AssetInfoProps, ExistingCardPayment, TransactionSummary } from './components';
import { AvaxPayment } from './components/AvaxPayment';
import {
  ConditionalSpinnerContainer,
  ContentContainer,
  DifferentCardLink,
  Heading,
  HeadingContainer,
} from './components/components';
import { NewCardInput } from './components/NewCardInput';
import { PaymentSuccess } from './components/PaymentSuccess';
import { useErrorToast } from 'libraries/utils/toasts';
import { useIsMobile } from 'libraries/window';
import { FreeMint } from './components/FreeMint';
interface PaymentModalProps extends AssetInfoProps {
  usdPrice: number;
  artistId: string;
  collectionId: Collection['id'];
  collectionDetails: Details;
  closePaymentModal: () => void;
  redeemCode: NullableString;
}

export const PaymentModal = ({
  imageUrl,
  collectionName,
  artistId,
  artistName,
  artistProfilePhoto,
  closePaymentModal,
  usdPrice,
  collectionId,
  redeemCode,
}: PaymentModalProps) => {
  const { isActive: isWalletUser } = useWallet();
  const isMobile = useIsMobile();

  const [isAvax, setIsAvax] = useState(isWalletUser);

  // Avax Exchange Rate and Price
  const { avaxTokenPrice, isLoading: isAvaxPriceLoading } = useAvaxTokenPrice(collectionId);
  const avaxPrice = isAvaxPriceLoading ? 0 : avaxTokenPrice;

  // Stripe customer Id means user has a card on file
  const stripeCustomerId = useStripeCustomerId();

  const [shouldUseExistingCard, setShouldUseExistingCard] = useState(stripeCustomerId !== null);

  const transactionFee = isAvax ? AVAX_TRANSACTION_FEE : CC_TRANSACTION_FEE;

  const { total, formattedPrice, formattedTransactionFee, formattedTotal, formattedAltTotal } =
    useMemo(
      () => getPaymentLineItems(usdPrice, avaxPrice, transactionFee, isAvax),
      [avaxPrice, usdPrice, isAvax, transactionFee]
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

  return (
    <Modal title={title} onClick={closePaymentModal} fullHeight isNarrow={assetId !== undefined}>
      <ContentContainer>
        {assetId !== undefined ? (
          <PaymentSuccess
            assetId={assetId}
            collectionName={collectionName}
            imageUrl={imageUrl}
            artistId={artistId}
            artistName={artistName}
            artistProfilePhoto={artistProfilePhoto}
            collectionId={collectionId}
          />
        ) : (
          <>
            <AssetInfo
              imageUrl={imageUrl}
              collectionName={collectionName}
              artistName={artistName}
              artistProfilePhoto={artistProfilePhoto}
            />
            <ConditionalSpinnerContainer>
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
                  transactionFeePercentage={transactionFee * 100}
                />
                <HeadingContainer>
                  {redeemCode !== null ? (
                    <Heading>Redeem Free NFT</Heading>
                  ) : isAvax ? (
                    <Heading>Paying With AVAX</Heading>
                  ) : (
                    <>
                      <Heading>
                        {shouldUseExistingCard ? 'Card On File' : 'Payment Details'}
                      </Heading>
                      {stripeCustomerId && (
                        <DifferentCardLink type="button" onClick={handleUseDifferentCardClick}>
                          {shouldUseExistingCard ? 'Use a Different Card' : 'Use Existing Card'}
                        </DifferentCardLink>
                      )}
                    </>
                  )}
                </HeadingContainer>
                {redeemCode !== null ? (
                  <FreeMint
                    redeemCode={redeemCode}
                    collectionId={collectionId}
                    setIsMintingNFT={setIsMintingNFT}
                    setAssetId={setAssetId}
                  />
                ) : isAvax && isWalletUser ? (
                  <AvaxPayment
                    total={total}
                    collectionId={collectionId}
                    handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                    setAssetId={setAssetId}
                    setIsMintingNFT={setIsMintingNFT}
                    isMobile={isMobile}
                  />
                ) : shouldUseExistingCard && stripeCustomerId ? (
                  <ExistingCardPayment
                    stripeCustomerId={stripeCustomerId}
                    total={total}
                    handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                    collectionId={collectionId}
                    setPurchaseId={setPurchaseId}
                    isWalletUser={isWalletUser}
                    isMobile={isMobile}
                  />
                ) : (
                  <NewCardInput
                    stripeCustomerId={stripeCustomerId}
                    total={total}
                    handleSwitchPaymentClick={handleSwitchPaymentMethodClick}
                    collectionId={collectionId}
                    setPurchaseId={setPurchaseId}
                    isWalletUser={isWalletUser}
                    isMobile={isMobile}
                  />
                )}
              </ConditionalSpinner>
            </ConditionalSpinnerContainer>
            {isMintingNFT && 'Minting NFT...'}
          </>
        )}
      </ContentContainer>
    </Modal>
  );
};
