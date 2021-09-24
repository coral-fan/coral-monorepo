import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useWeb3 from '../web3';
import axios from 'axios';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { setCookie } from 'nookies';
import { OpenLoginConnector } from 'library/Connectors/OpenLoginConnector';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { getAuthenticationMessage } from '@common/utils';

type LoginError = null | Record<string, string | number>;

export const useLogin = () => {
  const { activate, getConnector } = useWeb3();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
      setIsLoggingIn(false);
    }
  }, []);

  const [loginError, setLoginError] = useState<LoginError>(null);

  const login = async () => {
    setIsLoggingIn(true);
    try {
      const connector = getConnector();
      await activate(connector);

      const signer =
        connector instanceof OpenLoginConnector
          ? (connector.wallet as Wallet)
          : new Web3Provider(await connector.getProvider()).getSigner();

      const address = await signer.getAddress();

      const nonceResponse = await axios.post<{ nonce: number }>(
        'http://localhost:5001/torus-tutorial/us-central1/nonce',
        {
          address: address,
        }
      );

      const signedMessage = await signer.signMessage(
        getAuthenticationMessage(nonceResponse.data.nonce)
      );

      const response = await axios.post('http://localhost:5001/torus-tutorial/us-central1/auth', {
        address: address,
        signedMessage: signedMessage,
      });

      const token = response.data['Bearer Token'];

      const userCredentials = await signInWithCustomToken(getAuth(), token);

      const idToken = await userCredentials.user.getIdToken();

      setCookie(undefined, 'token', idToken, { path: '/' });

      // needs to cast to string since redirect field is string | string[] | undefined
      router.push((router.query.redirect as string) ?? '/');
    } catch (error) {
      setLoginError(error as LoginError);
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn, loginError };
};
