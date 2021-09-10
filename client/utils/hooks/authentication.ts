import { useRouter } from 'next/router';
import useWeb3 from './web3';
import axios from 'axios';
import { authentication } from '../firebase';
import { signInWithCustomToken } from '@firebase/auth';
import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';
import { Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';

export const useLogin = () => {
  const { activate, connector } = useWeb3();
  const router = useRouter();

  return async () => {
    await activate(connector);

    const signer =
      connector instanceof OpenLoginConnector
        ? (connector.wallet as Wallet)
        : new Web3Provider(await connector.getProvider()).getSigner();

    console.log(signer.signMessage('Text'));

    const response = await axios.get('http://localhost:5001/torus-tutorial/us-central1/torusAuth');

    const token = response.data['Bearer Token'];
    const userCredentials = await signInWithCustomToken(authentication, token);

    console.log(userCredentials);

    // needs to cast to string since redirect field is string | string[] | undefined
    router.push((router.query.redirect as string) ?? '/');
  };
};
