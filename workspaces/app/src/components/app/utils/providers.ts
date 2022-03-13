import { ExternalProvider, Web3Provider } from '@ethersproject/providers';

export const getLibrary = (provider: ExternalProvider | undefined) => {
  if (provider) {
    return new Web3Provider(provider);
  }
  return undefined;
};
