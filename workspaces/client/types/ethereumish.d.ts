import { ProviderMessage, ProviderRpcError, ProviderConnectInfo } from 'hardhat/types';

// implementation from https://stackoverflow.com/questions/65504958/web3-js-extending-the-window-interface-type-definitions
export interface EthereumEvent {
  connect: ProviderConnectInfo;
  disconnect: ProviderRpcError;
  accountsChanged: Array<string>;
  chainChanged: string;
  message: ProviderMessage;
}

export type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

export interface Ethereumish {
  autoRefreshOnNetworkChange: boolean;
  chainId: string;
  isMetaMask?: boolean;
  isStatus?: boolean;
  networkVersion: string;

  on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
  removeEventListener<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
  request?: (request: {
    method: string;
    params?: unknown[] | Record<string, unknown>;
  }) => Promise<uknown>;
}
