import { useEffect } from 'react';
import { useWallet } from 'libraries/blockchain';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';
import { useCleanUrl } from 'libraries/utils/location';

const getWindowHash = () => window.location.hash;

const isWeb3Auth = () => {
  const hash = getWindowHash();

  return hash.includes('result') && hash.includes('_pid');
};

const isWeb3AuthLoginRedirect = () => {
  const hash = getWindowHash();

  return isWeb3Auth() && hash.includes('sessionId');
};

const isWeb3AuthLogoutRedirect = () => {
  const hash = getWindowHash();

  return isWeb3Auth() && !hash.includes('sessionId');
};
export const Web3AuthManager = () => {
  const { isActive } = useWallet();
  const isAuthenticated = useIsAuthenticated();
  const { login, isLoggingIn } = useLogin();
  const cleanUrl = useCleanUrl();

  useEffect(() => {
    if (!isAuthenticated && !isActive && !isLoggingIn && isWeb3AuthLoginRedirect()) {
      login('WEB3AUTH').then(cleanUrl);
    }
  }, [cleanUrl, isActive, isAuthenticated, isLoggingIn, login]);

  useEffect(() => {
    if (isWeb3AuthLogoutRedirect()) {
      cleanUrl();
    }
  }, [cleanUrl]);
  return <></>;
};
