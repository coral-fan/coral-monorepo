import { ReactNode, useEffect, useState } from 'react';
import { delay, forkJoin, map, mergeMapTo, timer } from 'rxjs';
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
  accessGrantingTokens: string[];
  accessDeniedModalProps: AccessDeniedModalProps;
  children: ReactNode;
}
export const GatedContent = ({
  accessGrantingTokens,
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
        accessGrantingTokens.map((collectionAddress) => getDoesOwnToken(collectionAddress, address))
      ).pipe(
        delay(8000),
        map((doesUserHaveAccessArray) =>
          doesUserHaveAccessArray.some((doesHaveAccess) => doesHaveAccess === true)
        )
      );

      doesUserHaveAccess$.subscribe((doesHaveAccess) => {
        setDoesUserHaveAccess(doesHaveAccess);
        setIsCheckingWallet(false);
      });

      doesUserHaveAccess$
        .pipe(mergeMapTo(timer(2500)))
        .subscribe(() => setIsAccessGrantedModal(false));
    }
  }, [accessGrantingTokens, isAuthenticated, address]);

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
