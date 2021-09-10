import { useRouter } from 'next/router';
import useWeb3 from './web3';
import axios from 'axios';
import useFirebase from './firebase';
import { signInWithCustomToken } from '@firebase/auth';

export const useLogin = () => {
  const { activate, connector } = useWeb3();
  const router = useRouter();
  const { auth } = useFirebase();

  return async () => {
    await activate(connector);

    const response = await axios.get('http://localhost:5001/torus-tutorial/us-central1/torusAuth');

    const token = response.data['Bearer Token'];
    const userCredentials = await signInWithCustomToken(auth, token);

    console.log(userCredentials);

    // needs to cast to string since redirect field is string | string[] | undefined
    router.push((router.query.redirect as string) ?? '/');
  };
};
