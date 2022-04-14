import type { Actions } from '@web3-react/types';
import { Connector } from '@web3-react/types';
import CustomAuth from '@toruslabs/customauth';
import { Eip1193Bridge } from '@ethersproject/experimental';
import { Wallet } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import { CUSTOM_AUTH_GOOGLE_VERIFIER, GOOGLE_O_AUTH_CLIENT_ID } from './consts';

const avalancheJsonRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export class CustomAuthConnector extends Connector {
  constructor(actions: Actions) {
    super(actions);
  }

  public async activate(): Promise<void> {
    this.actions.startActivation();
    // custom implementation starts here
    const customAuth = new CustomAuth({
      baseUrl: `${window.location.origin}/serviceworker`,
      enableLogging: true,
      network: 'testnet',
    });

    await customAuth.init();

    try {
      const { privateKey } = await customAuth.triggerLogin({
        typeOfLogin: 'google',
        verifier: CUSTOM_AUTH_GOOGLE_VERIFIER,
        clientId: GOOGLE_O_AUTH_CLIENT_ID,
      });

      const wallet = new Wallet(privateKey, avalancheJsonRpcProvider);
      this.provider = new Eip1193Bridge(wallet, wallet.provider);
    } catch (error) {
      console.error(error);
    }

    if (this.provider) {
      await Promise.all([
        this.provider.request({ method: 'eth_chainId' }) as Promise<string>,
        this.provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
      ])
        .then(([chainId, accounts]) => {
          this.actions.update({ chainId: Number.parseInt(chainId, 16), accounts });
        })
        .catch((error: Error) => {
          this.actions.reportError(error);
        });
    }
  }
}
