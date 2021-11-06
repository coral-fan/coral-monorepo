import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export const getLibrary = (provider: ExternalProvider | JsonRpcProvider | undefined) => {
  if (provider) {
    return provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider);
  }
  return undefined;
};
