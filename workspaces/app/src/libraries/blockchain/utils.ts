import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import { Coral__factory } from '@coral/contracts';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const getTokenOwner = (address: string, assetId: number) => {
  const contract = Coral__factory.connect(address, avalancheRpcProvider);
  return contract.ownerOf(assetId);
};

export const getTokenTotalSupply = async (address: string) => {
  const contract = Coral__factory.connect(address, avalancheRpcProvider);

  const bigNumTotalSupply = await contract.totalSupply();

  return bigNumTotalSupply.toNumber();
};

export const getDoesOwnToken = async (collectionAddress: string, userAddress: string) => {
  const contract = Coral__factory.connect(collectionAddress, avalancheRpcProvider);

  const bigNumTokenBalance = await contract.balanceOf(userAddress);
  const tokenBalance = bigNumTokenBalance.toNumber();

  return tokenBalance > 0;
};

export const getOwnedTokensByCollection = async (
  collectionAddress: string,
  userAddress: string
) => {
  const contract = Coral__factory.connect(collectionAddress, avalancheRpcProvider);

  const bigNumTokenBalance = await contract.balanceOf(userAddress);
  const tokenBalance = bigNumTokenBalance.toNumber();

  if (tokenBalance === 0) {
    return;
  }

  const tokenIds = [];
  for (let i = 0; i < tokenBalance; i++) {
    // const bigNumTokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
    const tokenId = 1;
    tokenIds.push(tokenId);
  }
  return tokenIds;
};
