// TODO: Refactor CtaButton and button handler logic

import { CtaButton, DropTimer, ConditionalSpinner } from 'components/ui';
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
import { Details, MerchOptions, NullableString, useUserUid } from 'libraries/models';
import { getUserTokenBalance$ } from 'libraries/blockchain/observables';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { SignInModal, useOpenSignInModal } from 'components/app';

// analytics
import { trackGoal } from 'fathom-client';

interface DropOrAvailableProps extends PriceProp, AssetInfoProps {
  numMinted: number;
  maxSupply: number;
  dropTime: string;
  collectionId: string;
  isSoldOut: boolean;
  collectionDetails: Details;
  artistId?: string;
  maxMintablePerWallet: number;
  redeemCode: NullableString;
  merchOptions?: MerchOptions;
  fingerprint?: string;
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
  dropTime,
  collectionName,
  collectionId,
  collectionDetails,
  artistId,
  creatorName,
  imageUrl,
  creatorProfilePhoto: artistProfilePhoto,
  isSoldOut,
  maxMintablePerWallet,
  redeemCode,
  merchOptions,
  fingerprint,
}: DropOrAvailableProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const { isLoggingIn } = useLogin();
  const openSignInModal = useOpenSignInModal();

  const closePaymentModal = useCallback(() => setIsPaymentModalOpen(false), []);

  const handleBuyButtonClick = useCallback(() => {
    isAuthenticated && !isSoldOut
      ? setIsPaymentModalOpen(true)
      : !isAuthenticated && !isSoldOut
      ? openSignInModal()
      : null;

    trackGoal('TYARNWD4', 0);
  }, [isSoldOut, isAuthenticated, openSignInModal]);

  /*
    SwitchTransition implementation from:
    https://stackoverflow.com/questions/64126226/how-do-i-get-switchtranition-to-work-with-csstransition-with-typescript
  */

  const getMilliSecondsRemaining$ = useCallback(
    () => getTimeRemaining$(dropTime, (milliSecsDiff) => milliSecsDiff),
    [dropTime]
  );

  const millisecondsRemaining = useObservable(
    getMilliSecondsRemaining$,
    getMilliSecsDiff(dropTime)
  );

  /*
    Cast boolean as strings because SwitchTransitions requires a string key
    
    Set threshold to 1 second because millisecond imprecision means value may not hit 0
    before bigTimer$ observable completes.
  */
  const isAvailable = millisecondsRemaining > 0 ? 'false' : 'true';

  const numMintedDisplay = useMemo(() => numMinted ?? 0, [numMinted]);

  const userId = useUserUid();
  const [isMaxTokensOwned, setIsMaxTokensOwned] = useState<boolean>();

  useEffect(() => {
    if (userId) {
      const subscription = getUserTokenBalance$(collectionId, userId).subscribe((tokenBalance) =>
        setIsMaxTokensOwned(tokenBalance >= maxMintablePerWallet)
      );
      return () => subscription.unsubscribe();
    }
  }, [collectionId, userId, maxMintablePerWallet, isAuthenticated]);

  const ctaText = useMemo(() => {
    if (isSoldOut) {
      return 'Sold Out';
    }

    const hasValidRedeemCode = redeemCode !== null;
    const isFreeNft = usdPrice === 0;

    let ctaAction;
    // custom logic specific to VB ON ROAD campaign
    if (collectionId === '0xc56E1b0734f25D17D7A68eb969f8eB00B287136d') {
      ctaAction = 'Claim Free Pass';
    } else if (hasValidRedeemCode) {
      ctaAction = 'Redeem Free NFT';
    } else if (isFreeNft) {
      ctaAction = 'Mint Free NFT';
    } else {
      ctaAction = 'Buy Now';
    }

    return isAuthenticated ? ctaAction : `Sign In To ${ctaAction}`;
  }, [collectionId, isSoldOut, isAuthenticated, redeemCode, usdPrice]);

  // TODO: Refactor CtaButton conditional logic
  return (
    <FadeOutInSwitchAnimation isAvailable={isAvailable}>
      {isAvailable === 'true' ? (
        <AvailableContainer>
          <Price usdPrice={usdPrice} />
          <ConditionalSpinner
            size={'60px'}
            color={tokens.background.color.brand}
            center
            loading={isAuthenticated && isMaxTokensOwned === undefined}
          >
            <CtaButton
              onClick={handleBuyButtonClick}
              disabled={
                isSoldOut ||
                isLoggingIn ||
                // TODO: revisit to see if there's a better way to deal handle this
                ((isMaxTokensOwned ?? !Boolean(isMaxTokensOwned)) && isAuthenticated)
              }
              loading={isLoggingIn && !isSoldOut}
            >
              {ctaText}
            </CtaButton>
            {!isSoldOut && isAuthenticated && isMaxTokensOwned && (
              <MaxOwnedNotification>
                Maximum of {maxMintablePerWallet} NFTs per wallet already owned
              </MaxOwnedNotification>
            )}
            {collectionId !== '0xc56E1b0734f25D17D7A68eb969f8eB00B287136d' && (
              <ProgressBar
                maxSupply={maxSupply}
                numMinted={isSoldOut ? maxSupply : numMintedDisplay}
              />
            )}
          </ConditionalSpinner>
        </AvailableContainer>
      ) : (
        <DropTimer tokenSupply={maxSupply} timestamp={dropTime} />
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
          creatorName={creatorName}
          creatorProfilePhoto={artistProfilePhoto}
          usdPrice={usdPrice}
          redeemCode={redeemCode}
          merchOptions={merchOptions}
          fingerprint={fingerprint}
        />
      )}
    </FadeOutInSwitchAnimation>
  );
};
