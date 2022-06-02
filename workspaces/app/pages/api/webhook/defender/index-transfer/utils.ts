import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { OwnedNfts } from 'libraries/models';

const getOwnedNfts = async (ownerAddress: string) => {
  const ownedNftsDocRef = await getDocumentReferenceServerSide<OwnedNfts>(
    'nft-ownership',
    ownerAddress
  );

  const ownedNftsSnapshot = await ownedNftsDocRef.get();
  const ownedNfts = ownedNftsSnapshot.data();

  return { ownedNftsDocRef, ownedNfts };
};

export const removeNFTOwnership = async (
  ownerAddress: string,
  contractAddress: string,
  tokenId: number
) => {
  const { ownedNfts, ownedNftsDocRef } = await getOwnedNfts(ownerAddress);

  if (ownedNfts) {
    const ownedNftsFromCollection = ownedNfts[contractAddress];
    if (Array.isArray(ownedNftsFromCollection) && ownedNftsFromCollection.length > 0) {
      const updatedOwnedNftsFromCollection = ownedNftsFromCollection.filter(
        (assetId) => assetId !== tokenId
      );

      const updatedPreviousOwnerOwnedNfts: OwnedNfts = {
        ...ownedNfts,
        [contractAddress]: updatedOwnedNftsFromCollection,
      };

      await ownedNftsDocRef.set(updatedPreviousOwnerOwnedNfts);
    } else {
      throw new Error(
        `from address ${ownerAddress} doesn't have owned assets from contract address ${contractAddress} indexed in Firestore.`
      );
    }
  } else {
    throw new Error(
      `from address ${ownerAddress} doesn't have NFT ownership indexed in Firestore.`
    );
  }
};

export const addNFTOwnership = async (
  ownerAddress: string,
  contractAddress: string,
  tokenId: number
) => {
  const { ownedNfts, ownedNftsDocRef } = await getOwnedNfts(ownerAddress);

  const ownedNftsFromCollection = ownedNfts?.[contractAddress] ?? [];
  const updatedOwnedNftsFromCollection = Array.from(new Set([...ownedNftsFromCollection, tokenId]));

  const updatedPreviousOwnerOwnedNfts: OwnedNfts = {
    ...ownedNfts,
    [contractAddress]: updatedOwnedNftsFromCollection,
  };

  await ownedNftsDocRef.set(updatedPreviousOwnerOwnedNfts);
};
