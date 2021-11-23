import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Wallet } from '@ethersproject/wallet';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { IS_OPEN_LOGIN_PENDING, AVALANCHE } from 'consts';

if (!process.env.NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID) {
  throw new Error('Please defined NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID in a .env.local file!');
}

const OPEN_LOGIN = {
  loginProvider: 'google', // "facebook", "apple", "twitter", "reddit", etc. See full list of supported logins: https://docs.tor.us/direct-auth/verifiers
  clientId: process.env.NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID,
};

const OPEN_LOGIN_PROVIDER_ERROR = new Error('OpenLogin connector not activated yet.');
export class OpenLoginConnector extends AbstractConnector {
  wallet?: Wallet;

  constructor() {
    super({ supportedChainIds: [parseInt(AVALANCHE.CHAIN_ID)] });
  }

  private async getOpenLoginInstance() {
    const OpenLogin = (await import('@toruslabs/openlogin')).default;

    const openLogin = new OpenLogin({
      clientId: OPEN_LOGIN.clientId,
      network: 'testnet',
    });

    /* NOTE: OPEN LOGIN ONLY RETRIEVES THE PRIVATE KEY ONCE.
       openLogin.init() should only be called ONCE per component render.
    */
    await openLogin.init();

    return openLogin;
  }

  async activate(): Promise<ConnectorUpdate> {
    const openLogin = await this.getOpenLoginInstance();

    if (!openLogin.privKey) {
      await openLogin.login({
        // loginProvider: OPEN_LOGIN.loginProvider,
      });
      window.sessionStorage.setItem(IS_OPEN_LOGIN_PENDING, 'true');
    }

    this.wallet = new Wallet(openLogin.privKey).connect(new JsonRpcProvider(AVALANCHE.RPC_URL));

    const account = await this.wallet.getAddress();
    const chainId = await this.wallet.getChainId();

    return {
      account,
      chainId,
      provider: this.wallet.provider,
    };
  }

  async getProvider(): Promise<Provider> {
    if (!this.wallet) {
      throw OPEN_LOGIN_PROVIDER_ERROR;
    }

    return this.wallet.provider;
  }

  async getChainId(): Promise<number> {
    if (!this.wallet) {
      throw OPEN_LOGIN_PROVIDER_ERROR;
    }

    return this.wallet.getChainId();
  }

  async getAccount(): Promise<string | null> {
    if (!this.wallet) {
      throw OPEN_LOGIN_PROVIDER_ERROR;
    }
    return this.wallet ? this.wallet.address : null;
  }

  async deactivate(): Promise<void> {
    (await this.getOpenLoginInstance()).logout;
    this.wallet = undefined;
  }
}
