import { CoralNftV1__factory } from '@coral/contracts';
import { getRelaySigner } from '../utils';

export const relayMint = async (contractAddress: string, walletAddress: string) => {
  const signer = await getRelaySigner();
  const nftContract = CoralNftV1__factory.connect(contractAddress, signer);
  const { hash } = await nftContract.relayMint(walletAddress);

  return hash;
};
