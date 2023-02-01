import { ReactNode, useEffect, useState } from 'react';
import { delay, mergeMap, of, timer } from 'rxjs';
import { useIsAuthenticated } from 'libraries/authentication';

import {
  AccessDenied,
  AccessGrantedModal,
  LoginButton,
  CheckingNftModal,
  AccessDeniedModalProps,
} from './components';
import { useUserUid } from 'libraries/models';

interface GatedContentProps {
  doesOwnPinderNft: boolean;
  accessDeniedModalProps: AccessDeniedModalProps;
  children: ReactNode;
}
export const GatedContent = ({
  doesOwnPinderNft,
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
      const doesUserHaveAccess$ = of(doesOwnPinderNft).pipe(delay(4700));

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
  }, [doesOwnPinderNft, isAuthenticated, address]);

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
