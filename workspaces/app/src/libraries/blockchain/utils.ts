import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import { TotalSuppliable__factory, ERC721__factory } from '@coral/contracts';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const getTokenOwner = (address: string, assetId: number) => {
  const contract = ERC721__factory.connect(address, avalancheRpcProvider);
  return contract.ownerOf(assetId);
};

export const getDoesOwnToken = async (collectionAddress: string, userAddress: string) => {
  const contract = ERC721__factory.connect(collectionAddress, avalancheRpcProvider);

  const bigNumTokenBalance = await contract.balanceOf(userAddress);
  const tokenBalance = bigNumTokenBalance.toNumber();

  return tokenBalance > 0;
};

export const getOwnedTokensByCollection = async (
  collectionAddress: string,
  userAddress: string
) => {
  const contract = ERC721__factory.connect(collectionAddress, avalancheRpcProvider);

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

export const getTokenTotalSupply = async (address: string) => {
  const nftContract = TotalSuppliable__factory.connect(address, avalancheRpcProvider);
  const tokenTotalSupply = await nftContract.totalSupply();
  return tokenTotalSupply.toNumber();
};
