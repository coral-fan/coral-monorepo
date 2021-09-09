import { useRouter } from 'next/router';
import useWeb3 from './web3';

export const useLogin = () => {
  const { activate, connector } = useWeb3();
  const router = useRouter();

  return async () => {
    if (connector) {
      await activate(connector);
    }
    // needs to cast to string since redirect field is string | string[] | undefined
    router.push((router.query.redirect as string) ?? '/');
  };
};
