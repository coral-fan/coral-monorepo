import { useEffect } from 'react';
import { useWallet } from 'libraries/blockchain';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';
import { useCleanUrl } from 'libraries/utils/location';
import { WEB3AUTH } from 'libraries/blockchain/wallet/connectors/web3auth/consts';

const getWindowHash = () => window.location.hash;

const isWeb3Auth = () => {
  const hash = getWindowHash();

  return hash.includes('result') && hash.includes('_pid');
};

const isWeb3AuthLoginRedirect = () => {
  const hash = getWindowHash();

  return isWeb3Auth() && hash.includes('sessionId');
};

export const Web3AuthManager = () => {
  const { isActive } = useWallet();
  const isAuthenticated = useIsAuthenticated();
  const { login, isLoggingIn } = useLogin();
  const cleanUrl = useCleanUrl();

  useEffect(() => {
    if (!isAuthenticated && !isActive && !isLoggingIn && isWeb3AuthLoginRedirect()) {
      login('WEB3AUTH').then(() => {
        /*
         activation hash is used in connectEagerly method in connector.ts
         see comment there for why this is necessary
         */
        localStorage.setItem(WEB3AUTH.ACTIVATION_HASH_KEY, getWindowHash());
        cleanUrl();
      });
    }
  }, [isActive, isAuthenticated, isLoggingIn, login, cleanUrl]);

  return <></>;
};
