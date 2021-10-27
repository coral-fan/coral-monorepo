import { Modal } from './ui/Modal/Modal';
import { Button } from './ui';

import { useWeb3, useIsNetworkSupported } from 'libraries/blockchain/hooks';
import { useIsAuthenticated } from 'libraries/authentication/hooks';
import { AVALANCHE } from 'consts';

const AVALANCHE_NETWORK_PARAMS = {
  chainId: AVALANCHE.CHAIN_ID, // A 0x-prefixed hexadecimal chainId
  chainName: AVALANCHE.CHAIN_NAME,
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: [AVALANCHE.RPC_URL],
  blockExplorerUrls: [AVALANCHE.BLOCK_EXPLORER_URL],
};

export const WrongNetworkModal = () => {
  const { getConnector } = useWeb3();

  const addAvalancheNetwork = () => {
    getConnector()
      .getProvider()
      .then((provider) => {
        provider
          .request({
            method: 'wallet_addEthereumChain',
            params: [AVALANCHE_NETWORK_PARAMS],
          })
          /* eslint @typescript-eslint/no-explicit-any: 'off' -- error is typed as any*/
          .catch((error: any) => {
            console.log(error);
          });
      });
  };

  const isNetworkSupported = useIsNetworkSupported();
  const [isAuthenticated] = useIsAuthenticated();

  if (!isAuthenticated || isNetworkSupported) {
    return null;
  }

  return (
    <Modal>
      <Button onClick={addAvalancheNetwork}>Switch To Avalanche</Button>
    </Modal>
  );
};
