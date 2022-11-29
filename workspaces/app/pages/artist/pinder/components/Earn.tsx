import { useOpenSignInModal } from 'components/app';
import { EarnModal } from './EarnModal';
import { useIsAuthenticated } from 'libraries/authentication';
import { useUserUid } from 'libraries/models';
import React, { cloneElement, useCallback, useMemo, useState } from 'react';

interface EarnProps {
  campaignId: string;
  children: React.ReactElement;
  doesOwnPinderNft: boolean;
}

export const Earn = ({ campaignId, children, doesOwnPinderNft }: EarnProps) => {
  const [showEarnModal, setShowEarnModal] = useState(false);

  const openShowEarnModal = useCallback(() => setShowEarnModal(true), []);

  const isAuthenticated = useIsAuthenticated();
  const openSignInModal = useOpenSignInModal();

  const onClickHandler = useMemo(
    () => (isAuthenticated ? openShowEarnModal : openSignInModal),
    [isAuthenticated, openSignInModal, openShowEarnModal]
  );

  const uid = useUserUid();

  return (
    <>
      {uid && showEarnModal && (
        <EarnModal
          closeEarnModal={() => setShowEarnModal(false)}
          campaignId={campaignId}
          uid={uid}
          doesOwnPinderNft={doesOwnPinderNft}
        ></EarnModal>
      )}
      {cloneElement(children, { onClick: onClickHandler })}
    </>
  );
};
