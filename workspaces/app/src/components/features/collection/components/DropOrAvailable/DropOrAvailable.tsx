// TODO: Refactor CtaButton and button handler logic

import { CtaButton, DropTimer } from 'components/ui';
import { getMilliSecsDiff, getTimeRemaining$ } from 'libraries/time';
import { useObservable } from 'libraries/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AvailableContainer } from 'components/ui/nft';
import { Price, PriceProp } from '../Price';
import { ProgressBar } from '../ProgressBar';
import { AssetInfoProps } from '../PaymentModal/components/AssetInfo';
import { PaymentModal } from '../PaymentModal';
import { FadeOutInSwitchAnimation } from 'libraries/animation';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';
import { Details, useUserUid } from 'libraries/models';
import { getUserTokenBalance$ } from 'libraries/blockchain/observables';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { SignInModal, useOpenSignInModal } from 'components/app';

interface DropOrAvailableProps extends PriceProp, AssetInfoProps {
  numMinted?: number;
  maxSupply: number;
  dropDate: string;
  collectionId: string;
  isSoldOut: boolean;
  collectionDetails: Details;
  artistId: string;
  maxMintablePerWallet: number;
}

const MaxOwnedNotification = styled.span`
  font-size: ${tokens.font.size.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  line-height: ${tokens.font.line_height.sm};
  color: ${tokens.font.color.secondary};
  font-style: italic;
`;

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
  maxMintablePerWallet,
}: DropOrAvailableProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isMaxTokensOwned, setIsMaxTokensOwned] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const { isLoggingIn } = useLogin();
  const openSignInModal = useOpenSignInModal();
  const userId = useUserUid();

  const closePaymentModal = useCallback(() => setIsPaymentModalOpen(false), []);

  const handleBuyButtonClick = useCallback(
    () =>
      isAuthenticated && !isSoldOut
        ? setIsPaymentModalOpen(true)
        : !isAuthenticated && !isSoldOut
        ? openSignInModal()
        : null,
    [isSoldOut, isAuthenticated, openSignInModal]
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

  useEffect(() => {
    if (userId) {
      const subscription = getUserTokenBalance$(collectionId, userId).subscribe((tokenBalance) =>
        setIsMaxTokensOwned(tokenBalance >= maxMintablePerWallet)
      );

      return () => subscription.unsubscribe();
    }
  }, [collectionId, userId, maxMintablePerWallet]);

  // TODO: Refactor CtaButton conditional logic
  return (
    <FadeOutInSwitchAnimation isAvailable={isAvailable}>
      {isAvailable === 'true' ? (
        <AvailableContainer>
          <Price usdPrice={usdPrice} />
          <CtaButton
            onClick={handleBuyButtonClick}
            disabled={isSoldOut || isLoggingIn || (isMaxTokensOwned && isAuthenticated)}
            loading={isLoggingIn}
          >
            {isSoldOut ? 'Sold Out' : isAuthenticated ? 'Buy Now' : 'Sign In To Purchase'}
          </CtaButton>
          {!isSoldOut && isAuthenticated && isMaxTokensOwned && (
            <MaxOwnedNotification>
              Maximum of {maxMintablePerWallet} NFTs per wallet already owned
            </MaxOwnedNotification>
          )}
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
