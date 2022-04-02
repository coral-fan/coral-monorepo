import { FC, useEffect, useState } from 'react';
import { interval, map, mapTo, mergeMapTo, skipUntil, timer } from 'rxjs';
import { useIsAuthenticated } from 'libraries/authentication';
import { getWalletNfts$ } from 'libraries/blockchain/wallet/observables';
import { useWallet } from 'libraries/blockchain';
import {
  AccessDeniedModal,
  AccessGrantedModal,
  LoginButton,
  CheckingNftModal,
  AccessDeniedModalProps,
} from './components';

interface GatedContentProps {
  accessGrantingNfts: string[];
  accessDeniedModalProps: AccessDeniedModalProps;
}
export const GatedContent: FC<GatedContentProps> = ({
  accessGrantingNfts,
  accessDeniedModalProps,
  children,
}) => {
  const isAuthenticated = useIsAuthenticated();
  const [doesUserHaveAccess, setDoesUserHaveAccess] = useState(false);
  const [isCheckingWallet, setIsCheckingWallet] = useState(true);
  const [showIsAccessGrantedModal, setIsAccessGrantedModal] = useState(true);
  const { address } = useWallet();

  useEffect(() => {
    if (isAuthenticated && address) {
      const walletNftsMap$ = getWalletNfts$(address);

      const doesUserHaveAccess$ = interval(8000).pipe(
        skipUntil(walletNftsMap$),
        mergeMapTo(walletNftsMap$),
        // map((nftsMap) => accessGrantingNfts.some((address) => nftsMap[address] !== undefined))
        mapTo(true)
      );

      doesUserHaveAccess$.subscribe((doesHaveAccess) => {
        setDoesUserHaveAccess(doesHaveAccess);
        setIsCheckingWallet(false);
      });

      doesUserHaveAccess$
        .pipe(mergeMapTo(timer(2500)))
        .subscribe(() => setIsAccessGrantedModal(false));
    }
  }, [accessGrantingNfts, isAuthenticated, address]);

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
