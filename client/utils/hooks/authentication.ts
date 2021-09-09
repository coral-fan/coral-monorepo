import { useRouter } from 'next/router';
import useWeb3 from './web3';
import axios from 'axios';

export const useLogin = () => {
  const { activate, connector } = useWeb3();
  const router = useRouter();

  return async () => {
    await activate(connector);

    const response = await axios.get('http://localhost:5001/torus-tutorial/us-central1/torusAuth');

    const token = response.data['Bearer Token'];

    console.log(token);

    // needs to cast to string since redirect field is string | string[] | undefined
    router.push((router.query.redirect as string) ?? '/');
  };
};
