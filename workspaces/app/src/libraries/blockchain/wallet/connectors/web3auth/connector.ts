import type { Actions, ProviderConnectInfo } from '@web3-react/types';
import { Connector } from '@web3-react/types';
import { AVALANCHE, CLIENT_ENVIRONMENT } from 'consts';
import type { Web3Auth } from '@web3auth/web3auth';
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import { WEB3AUTH } from './consts';

const parseChainId = (chainId: string | number) =>
  typeof chainId === 'number'
    ? chainId
    : Number.parseInt(chainId, chainId.startsWith('0x') ? 16 : 10);

export class Web3AuthConnector extends Connector {
  private web3Auth?: Web3Auth;

  constructor(actions: Actions) {
    super(actions);
  }

  private async initializeWeb3Auth() {
    try {
      const { Web3Auth } = await import('@web3auth/web3auth');
      const { OpenloginAdapter } = await import('@web3auth/openlogin-adapter');

      const web3Auth = new Web3Auth({
        clientId: WEB3AUTH.CLIENT_ID,
        chainConfig: {
          displayName: AVALANCHE.CHAIN_NAME,
          // TODO: check if Avalanche is eip155 compatible
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: AVALANCHE.CHAIN_ID.HEX,
          rpcTarget: AVALANCHE.RPC_URL,
          blockExplorer: AVALANCHE.BLOCK_EXPLORER_URL,
          ticker: 'AVAX',
          tickerName: 'Avalanche',
        },
        uiConfig: {
          theme: 'dark',
          appLogo: WEB3AUTH.APP_LOGO,
          loginMethodsOrder: WEB3AUTH.LOGIN_METHOD_ORDER,
        },
        authMode: 'WALLET',
      });

      const adapter = new OpenloginAdapter({
        adapterSettings: {
          network: CLIENT_ENVIRONMENT === 'production' ? 'mainnet' : 'testnet',
          clientId: WEB3AUTH.CLIENT_ID,
          whiteLabel: {
            name: 'Coral',
            logoDark: WEB3AUTH.APP_LOGO,
            dark: true,
          },
        },
        loginSettings: {
          relogin: true,
        },
      });

      web3Auth.configureAdapter(adapter);

      await web3Auth.initModal({
        modalConfig: WEB3AUTH.MODAL_CONFIG,
      });

      this.web3Auth = web3Auth;
    } catch (error) {
      console.error(error);
    }
  }

  private async getProvider() {
    return new Promise<SafeEventEmitterProvider | undefined>(async (resolve, reject) => {
      const { LOGIN_MODAL_EVENTS } = await import('@web3auth/ui');

      this?.web3Auth?.loginModal.addListener(
        LOGIN_MODAL_EVENTS.MODAL_VISIBILITY,
        (isModalVisible: boolean) => {
          if (!isModalVisible) {
            this?.web3Auth?.loginModal.removeAllListeners(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY);
            reject('OpenLogin Modal was closed by user.');
          }
        }
      );

      const provider = await this?.web3Auth?.connect();

      resolve(provider ?? undefined);
    });
  }

  public async activate(): Promise<void> {
    this.actions.startActivation();
    if (this.web3Auth === undefined) {
      await this.initializeWeb3Auth();
    }

    this.provider = await this.getProvider();

    if (this.provider) {
      const [chainId, accounts] = await Promise.all([
        // need to cast since request method return values are always unknown
        this.provider.request({ method: 'eth_chainId' }) as Promise<string>,
        this.provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
      ]);

      this.actions.update({ chainId: parseInt(chainId), accounts });
    }
  }

  public async deactivate() {
    await this.web3Auth?.logout();
    this.provider = undefined;
  }

  public connectEagerly() {
    this.activate();
  }
}
