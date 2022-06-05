import { CtaButton, DropTimer } from 'components/ui';
import { getMilliSecsDiff, getTimeRemaining$ } from 'libraries/time';
import { useObservable } from 'libraries/utils';
import { useCallback, useMemo, useState } from 'react';

import { AvailableContainer } from 'components/ui/nft';
import { Price, PriceProp } from '../Price';
import { ProgressBar } from '../ProgressBar';
import { AssetInfoProps } from '../PaymentModal/components/AssetInfo';
import { PaymentModal } from '../PaymentModal';
import { FadeOutInSwitchAnimation } from 'libraries/animation';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';
import { SignInModal, useSignInModalState } from 'components/app';
import { Details } from 'libraries/models';

interface DropOrAvailableProps extends PriceProp, AssetInfoProps {
  numMinted?: number;
  maxSupply: number;
  dropDate: string;
  collectionId: string;
  isSoldOut: boolean;
  collectionDetails: Details;
  artistId: string;
}

export const DropOrAvailable = ({
  usdPrice,
  maxSupply,
  numMinted,
  dropDate,
  collectionName,
  collectionId,
  collectionDetails,
  artistId,
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

  const getMilliSecondsRemaining$ = useCallback(
    () => getTimeRemaining$(dropDate, (milliSecsDiff) => milliSecsDiff),
    [dropDate]
  );

  const millisecondsRemaining = useObservable(
    getMilliSecondsRemaining$,
    getMilliSecsDiff(dropDate)
  );

  /*
    Cast boolean as strings because SwitchTransitions requires a string key
    
    Set threshold to 1 second because millisecond imprecision means value may not hit 0
    before bigTimer$ observable completes.
  */
  const isAvailable = millisecondsRemaining > 0 ? 'false' : 'true';

  const numMintedDisplay = useMemo(() => numMinted ?? 0, [numMinted]);

  return (
    <FadeOutInSwitchAnimation isAvailable={isAvailable}>
      {isAvailable === 'true' ? (
        <AvailableContainer>
          <Price usdPrice={usdPrice} />
          <CtaButton
            onClick={handleBuyButtonClick}
            disabled={isSoldOut || isLoggingIn}
            loading={isLoggingIn}
          >
            {isSoldOut ? 'Sold Out' : isAuthenticated ? 'Buy Now' : 'Sign In To Purchase'}
          </CtaButton>
          <ProgressBar maxSupply={maxSupply} numMinted={numMintedDisplay} />
        </AvailableContainer>
      ) : (
        <DropTimer tokenSupply={maxSupply} timestamp={dropDate} />
      )}
      <SignInModal />
      {isAuthenticated && isPaymentModalOpen && (
        <PaymentModal
          closePaymentModal={closePaymentModal}
          imageUrl={imageUrl}
          collectionName={collectionName}
          collectionId={collectionId}
          collectionDetails={collectionDetails}
          artistId={artistId}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          type={type}
          usdPrice={usdPrice}
        />
      )}
    </FadeOutInSwitchAnimation>
  );
};
