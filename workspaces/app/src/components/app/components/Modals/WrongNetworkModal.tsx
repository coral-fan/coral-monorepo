import { Modal, Button } from 'components/ui';

import { useWeb3, useIsNetworkSupported } from 'libraries/blockchain';
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
  const { connector } = useWeb3();

  const addAvalancheNetwork = () => {
    connector.provider?.request({
      method: 'wallet_addEthereumChain',
      params: [AVALANCHE_NETWORK_PARAMS],
    });
  };

  const isNetworkSupported = useIsNetworkSupported();

  if (isNetworkSupported) {
    return null;
  }

  return (
    <Modal>
      <Button onClick={addAvalancheNetwork}>Switch To Avalanche</Button>
    </Modal>
  );
};
