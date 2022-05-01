import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import { BaseABI__factory } from './contracts';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const getTokenOwner = async (address: string, assetId: number) => {
  const contract = BaseABI__factory.connect(address, avalancheRpcProvider);

  return await contract.ownerOf(assetId);
};

export const getTokenTotalSupply = async (address: string) => {
  const contract = BaseABI__factory.connect(address, avalancheRpcProvider);

  const bigNumTotalSupply = await contract.totalSupply();

  return bigNumTotalSupply.toNumber();
};

export const getDoesOwnToken = async (collectionAddress: string, userAddress: string) => {
  const contract = BaseABI__factory.connect(collectionAddress, avalancheRpcProvider);

  const bigNumTokenBalance = await contract.balanceOf(userAddress);
  const tokenBalance = bigNumTokenBalance.toNumber();

  return tokenBalance > 0;
};

export const getOwnedTokensByCollection = async (
  collectionAddress: string,
  userAddress: string
) => {
  const contract = BaseABI__factory.connect(collectionAddress, avalancheRpcProvider);

  const bigNumTokenBalance = await contract.balanceOf(userAddress);
  const tokenBalance = bigNumTokenBalance.toNumber();

  const tokenIds = [];
  for (let i = 0; i < tokenBalance; i++) {
    const bigNumTokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
    const tokenId = bigNumTokenId.toNumber();
    tokenIds.push(tokenId);
  }
  return tokenIds;
};
