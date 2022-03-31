import { Modal, Button, Message } from 'components/ui';

import { useWallet } from 'libraries/blockchain';
import { AVALANCHE } from 'consts';

const AVALANCHE_NETWORK_PARAMS = {
  chainId: AVALANCHE.CHAIN_ID.HEX, // A 0x-prefixed hexadecimal chainId
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
  const { connector } = useWallet();

  const addAvalancheNetwork = () => {
    connector.provider?.request({
      method: 'wallet_addEthereumChain',
      params: [AVALANCHE_NETWORK_PARAMS],
    });
  };

  return (
    <Modal title="Wrong Network">
      <Message>You are on the wrong network. Please connect to the Avalanche network.</Message>
      <Button onClick={addAvalancheNetwork}>Switch To Avalanche</Button>
    </Modal>
  );
};
