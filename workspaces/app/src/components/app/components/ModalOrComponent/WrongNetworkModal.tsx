import { Modal, Button, Message } from 'components/ui';
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

const addAvalancheNetwork = () => {
  window?.ethereum?.request({
    method: 'wallet_addEthereumChain',
    params: [AVALANCHE_NETWORK_PARAMS],
  });
};

export const WrongNetworkModal = () => (
  <Modal title="Wrong Network">
    <Message>You are on the wrong network. Please connect to the Avalanche network.</Message>
    <Button onClick={addAvalancheNetwork}>Switch To Avalanche</Button>
  </Modal>
);
