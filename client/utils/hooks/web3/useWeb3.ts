import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useConnector from './useConnector';
import useWallet from './useWallet';

export default function useWeb3() {
  const { library, chainId, account, active, error, activate, deactivate, setError } = useWeb3React<
    JsonRpcProvider | Web3Provider
  >();

  const wallet = useWallet();

  const connector = useConnector();

  return {
    connector,
    library,
    chainId,
    account,
    active,
    error,
    activate,
    deactivate,
    setError,
    wallet,
  };
}
