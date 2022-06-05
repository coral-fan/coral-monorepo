import { ReactNode, useEffect, useState } from 'react';
import { delay, forkJoin, map, mergeMap, timer } from 'rxjs';
import { useIsAuthenticated } from 'libraries/authentication';
import { useWallet } from 'libraries/blockchain';
import {
  AccessDeniedModal,
  AccessGrantedModal,
  LoginButton,
  CheckingNftModal,
  AccessDeniedModalProps,
} from './components';
import { getDoesOwnToken } from 'libraries/blockchain/utils';

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
  const [showIsAccessGrantedModal, setIsAccessGrantedModal] = useState(true);
  const { address } = useWallet();

  useEffect(() => {
    if (isAuthenticated && address) {
      const doesUserHaveAccess$ = forkJoin(
        accessGrantingTokenAddresses.map((collectionAddress) =>
          getDoesOwnToken(collectionAddress, address)
        )
      ).pipe(
        delay(8000),
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
        .subscribe(() => setIsAccessGrantedModal(false));

      return () => subscription.unsubscribe();
    } else {
      setDoesUserHaveAccess(false);
      setIsCheckingWallet(true);
      setIsAccessGrantedModal(true);
    }
  }, [accessGrantingTokenAddresses, isAuthenticated, address]);

  if (!isAuthenticated) {
    return (
      <AccessDeniedModal
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
    return <AccessDeniedModal {...accessDeniedModalProps} />;
  }

  return (
    <>
      {showIsAccessGrantedModal && <AccessGrantedModal />}
      {children}
    </>
  );
};
