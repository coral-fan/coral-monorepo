import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Wallet } from '@ethersproject/wallet';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';

// [fuji, mainnet]
const SUPPORTED_CHAIN_IDS = [43113, 43114];

if (!process.env.NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID) {
  throw new Error('Please defined NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID in a .env.local file!');
}

const OPEN_LOGIN = {
  loginProvider: 'google', // "facebook", "apple", "twitter", "reddit", etc. See full list of supported logins: https://docs.tor.us/direct-auth/verifiers
  clientId: process.env.NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID,
};

const OPEN_LOGIN_PROVIDER_ERROR = new Error('OpenLogin connector not activated yet.');
export class OpenLoginConnector extends AbstractConnector {
  private openLogin: any;
  wallet?: Wallet;

  constructor() {
    super({ supportedChainIds: SUPPORTED_CHAIN_IDS });
  }

  private validateWallet() {
    if (!this.wallet) {
      throw new Error('OpenLogin connector not activated yet.');
    }
  }

  async shouldEagerConnect(): Promise<boolean> {
    const OpenLogin = await import('@toruslabs/openlogin').then(
      (module) => module.default ?? module
    );

    this.openLogin = new OpenLogin({
      clientId: OPEN_LOGIN.clientId,
      network: 'testnet',
      // uxMode: 'popup',
    });

    await this.openLogin.init();
    return this.openLogin.privKey !== undefined;
  }

  async activate(...args: any[]): Promise<ConnectorUpdate> {
    if (!this.openLogin.privKey) {
      await this.openLogin.login({
        loginProvider: OPEN_LOGIN.loginProvider,
        redirectUrl: 'http://localhost:3000',
      });
    }

    this.wallet = new Wallet(this.openLogin.privKey).connect(
      new JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc')
    );

    return {
      account: this.wallet.address,
      provider: this.wallet.provider,
    };
  }

  async getProvider(): Promise<Provider> {
    if (!this.wallet) {
      throw OPEN_LOGIN_PROVIDER_ERROR;
    }

    return this.wallet.provider;
  }

  // TODO: Need to get the actual chainId somehow. Hard coded for now
  async getChainId(): Promise<number> {
    if (!this.wallet) {
      throw OPEN_LOGIN_PROVIDER_ERROR;
    }

    return this.wallet.getChainId();
  }

  async getAccount(): Promise<string | null> {
    return this.wallet ? this.wallet.address : null;
  }

  deactivate(): void {
    this.openLogin?.logout;
  }
}
