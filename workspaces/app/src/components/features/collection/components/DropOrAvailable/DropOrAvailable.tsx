import { CtaButton, DropTimer } from 'components/ui';
import { getMilliSecsDiff, getTimeRemaining$ } from 'libraries/time';
import { useObservable } from 'libraries/utils';
import { useCallback, useState } from 'react';

import { AvailableContainer } from 'components/ui/nft';
import { Price, PriceProp } from '../Price';
import { ProgressBar } from '../ProgressBar';
import { AssetInfoProps } from '../PaymentModal/components/AssetInfo';
import { PaymentModal } from '../PaymentModal';
import { FadeOutInSwitchAnimation } from 'libraries/animation';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';
import { SignInModal, useSignInModalState } from 'components/app';

interface DropOrAvailableProps extends PriceProp, AssetInfoProps {
  numMinted?: number;
  maxMintable: number;
  dropDate: string;
  collectionId: string;
  isSoldOut: boolean;
}

export const DropOrAvailable = ({
  usdPrice,
  maxMintable,
  numMinted,
  dropDate,
  collectionName,
  collectionId,
  artistName,
  imageUrl,
  artistProfilePhoto,
  type,
  isSoldOut,
}: DropOrAvailableProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const { isLoggingIn } = useLogin();
  const { openModal } = useSignInModalState();

  const closePaymentModal = useCallback(() => setIsPaymentModalOpen(false), []);

  const handleBuyButtonClick = useCallback(
    () =>
      isAuthenticated && !isSoldOut
        ? setIsPaymentModalOpen(true)
        : !isAuthenticated && !isSoldOut
        ? openModal()
        : null,
    [isSoldOut, isAuthenticated, openModal]
  );

  /*
    SwitchTransition implementation from:
    https://stackoverflow.com/questions/64126226/how-do-i-get-switchtranition-to-work-with-csstransition-with-typescript
  */

  const getMilliSecondsRemaining = useCallback(
    () => getTimeRemaining$(dropDate, (milliSecsDiff) => milliSecsDiff),
    [dropDate]
  );

  const millisecondsRemaining = useObservable(getMilliSecondsRemaining, getMilliSecsDiff(dropDate));

  /*
    Cast boolean as strings because SwitchTransitions requires a string key
    
    Set threshold to 1 second because millisecond imprecision means value may not hit 0
    before bigTimer$ observable completes.
  */
  const isAvailable = millisecondsRemaining > 0 ? 'false' : 'true';

  return (
    <FadeOutInSwitchAnimation isAvailable={isAvailable}>
      {isAvailable === 'true' ? (
        <AvailableContainer>
          <Price usdPrice={usdPrice} />
          <CtaButton onClick={handleBuyButtonClick} disabled={isSoldOut || isLoggingIn}>
            {isSoldOut ? 'Sold Out' : 'Buy Now'}
          </CtaButton>
          {JSON.stringify(isPaymentModalOpen)}
          {numMinted && <ProgressBar maxMintable={maxMintable} numMinted={numMinted} />}
        </AvailableContainer>
      ) : (
        <DropTimer tokenSupply={maxMintable} timestamp={dropDate} />
      )}
      {!isAuthenticated && isLoggingIn && <SignInModal />}
      {isAuthenticated && isPaymentModalOpen && (
        <PaymentModal
          title="Checkout"
          closePaymentModal={closePaymentModal}
          imageUrl={imageUrl}
          collectionName={collectionName}
          collectionId={collectionId}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          type={type}
          usdPrice={usdPrice}
        />
      )}
    </FadeOutInSwitchAnimation>
  );
};
