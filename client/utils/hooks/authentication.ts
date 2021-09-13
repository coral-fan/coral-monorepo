import { useRouter } from 'next/router';
import useWeb3 from './web3';
import axios from 'axios';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { setCookie, destroyCookie } from 'nookies';

import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';
import { LOGIN_ROUTE } from 'utils/consts/routes';

export const useLogin = () => {
  const { activate, connector } = useWeb3();
  const router = useRouter();

  return async () => {
    await activate(connector);

    const signer =
      connector instanceof OpenLoginConnector
        ? (connector.wallet as Wallet)
        : new Web3Provider(await connector.getProvider()).getSigner();

    const address = await signer.getAddress();

    const nonceResponse = await axios.post<{ nonce: number }>(
      'http://localhost:5001/torus-tutorial/us-central1/getNonce',
      {
        address: address,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const signedMessage = await signer._signTypedData(
      {},
      { Nonce: [{ name: 'nonce', type: 'uint256' }] },
      { nonce: nonceResponse.data.nonce }
    );

    const response = await axios.post(
      'http://localhost:5001/torus-tutorial/us-central1/torusAuth',
      {
        address: address,
        signedMessage,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const token = response.data['Bearer Token'];

    const userCredentials = await signInWithCustomToken(getAuth(), token);

    const idToken = await userCredentials.user.getIdToken();

    setCookie(undefined, 'token', idToken, { path: '/' });

    // needs to cast to string since redirect field is string | string[] | undefined
    router.push((router.query.redirect as string) ?? '/');
  };
};

export const useLogout = () => {
  const { deactivate } = useWeb3();
  const router = useRouter();

  return async () => {
    deactivate();
    /* check if current route is for login before performing Firebase & cookie authentication related clean up logic
        this is necessary because the logout function is also used for MetaMask account/network change events
    */
    if (router.route !== LOGIN_ROUTE) {
      await getAuth().signOut();
      destroyCookie(undefined, 'token');
      router.push(LOGIN_ROUTE);
    }
  };
};
