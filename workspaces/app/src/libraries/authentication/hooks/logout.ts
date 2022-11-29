import { useWallet } from 'libraries/blockchain';
import { getAuth } from 'firebase/auth';
import { useIdToken } from '.';
import { useCallback } from 'react';
import { useSuccessToast } from 'libraries/utils/toasts';
import { useRefetchPageData } from 'libraries/utils';

export const useLogout = () => {
  const { isActive, connector, setConnectorType } = useWallet();
  const idToken = useIdToken();

  const successToast = useSuccessToast();
  const refetchPageData = useRefetchPageData();

  // TODO: check if conditional checks matter for logging out actions (deactivate, signout, etc)
  const logout = useCallback(async () => {
    if (isActive && idToken) {
      successToast('Signed out!');
    }
    if (isActive) {
      await connector.deactivate();
      setConnectorType(undefined);
    }
    if (idToken) {
      await getAuth().signOut();
      await refetchPageData();
    }
  }, [isActive, connector, setConnectorType, idToken, successToast, refetchPageData]);

  return logout;
};
