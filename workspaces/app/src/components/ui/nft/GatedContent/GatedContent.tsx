import { ReactNode, useEffect, useState } from 'react';
import { delay, forkJoin, map, mergeMap, timer } from 'rxjs';
import { useIsAuthenticated } from 'libraries/authentication';

import {
  AccessDenied,
  AccessGrantedModal,
  LoginButton,
  CheckingNftModal,
  AccessDeniedModalProps,
} from './components';
import { getDoesOwnToken } from 'libraries/blockchain/utils';
import { useUserUid } from 'libraries/models';
import { PINDER_NFT_CONTRACT_ADDRESS } from 'consts';

interface GatedContentProps {
  accessGrantingTokenAddresses: string[];
  accessDeniedModalProps: AccessDeniedModalProps;
  children: ReactNode;
}
export const GatedContent = ({
  accessGrantingTokenAddresses,
  accessDeniedModalProps,
  children,
}: GatedContentProps) => {
  const isAuthenticated = useIsAuthenticated();
  const [doesUserHaveAccess, setDoesUserHaveAccess] = useState(false);
  const [isCheckingWallet, setIsCheckingWallet] = useState(true);
  const [showIsAccessGrantedModal, setShowIsAccessGrantedModal] = useState(true);
  const address = useUserUid();

  // TODO: add logic to check on new blocks if user still owns token
  useEffect(() => {
    if (isAuthenticated && address) {
      const doesUserHaveAccess$ = forkJoin(
        accessGrantingTokenAddresses.map((collectionAddress) =>
          getDoesOwnToken(
            collectionAddress,
            address,
            !(
              collectionAddress === PINDER_NFT_CONTRACT_ADDRESS ||
              collectionAddress === '0x23B68FeFbf940E4952528da8FB3081f82d52a255'
            )
          )
        )
      ).pipe(
        delay(5750),
        map((doesUserHaveAccessArray) =>
          doesUserHaveAccessArray.some((doesHaveAccess) => doesHaveAccess === true)
        )
      );

      const subscription = doesUserHaveAccess$.subscribe((doesHaveAccess) => {
        setDoesUserHaveAccess(doesHaveAccess);
        setIsCheckingWallet(false);
      });

      doesUserHaveAccess$
        .pipe(mergeMap(() => timer(2500)))
        .subscribe(() => setShowIsAccessGrantedModal(false));

      return () => subscription.unsubscribe();
    } else {
      // resets state if user logs out
      // will also reset state if wallet isn't connected, but shouldn't cause any issues
      setDoesUserHaveAccess(false);
      setIsCheckingWallet(true);
      setShowIsAccessGrantedModal(true);
    }
  }, [accessGrantingTokenAddresses, isAuthenticated, address]);

  if (!isAuthenticated) {
    return (
      <AccessDenied
        title={accessDeniedModalProps.title}
        message="Please log in so we can check your wallet."
        actionElement={<LoginButton />}
      />
    );
  }

  if (isCheckingWallet) {
    return <CheckingNftModal />;
  }

  if (!doesUserHaveAccess) {
    return <AccessDenied {...accessDeniedModalProps} />;
  }

  return (
    <>
      {showIsAccessGrantedModal && <AccessGrantedModal />}
      {children}
    </>
  );
};
