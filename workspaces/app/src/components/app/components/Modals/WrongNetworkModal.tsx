import { Modal, Button, Message } from 'components/ui';

import { useWallet, useIsNetworkSupported } from 'libraries/blockchain';
import { AVALANCHE } from 'consts';
import { css } from '@emotion/react';

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

const mainContainerStyle = css`
  gap: 16px;
`;

export const WrongNetworkModal = () => {
  const { connector } = useWallet();

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
    <Modal title="Wrong Network" mainContainerStyle={mainContainerStyle}>
      <Message>You are on the wrong network. Please connect to the Avalanche network.</Message>
      <Button onClick={addAvalancheNetwork}>Switch To Avalanche</Button>
    </Modal>
  );
};
