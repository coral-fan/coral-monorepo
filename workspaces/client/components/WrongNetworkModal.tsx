import { MAIN_NET_ID, TEST_NET_ID } from 'consts';
import { Modal } from './ui/Modal/Modal';
import { Button } from './ui';

import useWeb3 from 'libraries/hooks/web3';
import { useIsNetworkSupported } from 'libraries/hooks/metamask';
import { useIsAuthenticated } from 'libraries/authentication/hooks';

const getAvalancheNetworkParams = (isDevelopment: boolean) => ({
  chainId: isDevelopment ? TEST_NET_ID : MAIN_NET_ID, // A 0x-prefixed hexadecimal chainId
  chainName: `Avalanche ${isDevelopment ? 'FUJI' : 'Mainnet'} C-Chain`,
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: [`https://api.avax${isDevelopment ? '-test' : ''}.network/ext/bc/C/rpc`],
  blockExplorerUrls: [`https://cchain.explorer.avax${isDevelopment ? '-test' : ''}.network/`],
});

export const WrongNetworkModal = () => {
  const { getConnector } = useWeb3();

  const addAvalancheNetwork = () => {
    getConnector()
      .getProvider()
      .then((provider) => {
        provider
          .request({
            method: 'wallet_addEthereumChain',
            params: [getAvalancheNetworkParams(true)],
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
