import { MAIN_NET_ID } from 'consts';
import { Modal } from './ui/Modal/Modal';
import { Button } from './ui';
import useWeb3 from 'libraries/hooks/web3';

export const AVALANCHE_CHAIN_PARAMS = {
  chainId: MAIN_NET_ID, // A 0x-prefixed hexadecimal chainId
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
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
            params: [AVALANCHE_CHAIN_PARAMS],
          })
          /* eslint @typescript-eslint/no-explicit-any: 'off' -- error is typed as any*/
          .catch((error: any) => {
            console.log(error);
          });
      });
  };

  return (
    <Modal>
      <Button onClick={addAvalancheNetwork}>Switch To Avalanche</Button>
    </Modal>
  );
};
