import { CORAL_CONTRACTS } from 'libraries/blockchain/consts';
import { getOwnedTokensByCollection, getTokenOwner } from 'libraries/blockchain/utils';
import { Asset, Collection, getCollection, getPublicUserData } from 'libraries/models';

export const getAsset = async (collectionId: Collection['id'], assetId: number) => {
  const collectionData = await getCollection(collectionId);
  const ownerAddress = await getTokenOwner(collectionId, assetId);
  const ownerData = await getPublicUserData(ownerAddress);

  if (!collectionData || !ownerData) {
    return;
  }

  const {
    imageUrl,
    artistName,
    artistProfilePhoto,
    artistId,
    name: collectionName,
    type,
    description: collectionDescription,
    details: collectionDetails,
    id: contractAddress,
    gatedContent,
  } = collectionData;

  const assetData = {
    imageUrl,
    artistName,
    artistProfilePhoto,
    artistId,
    collectionName,
    type,
    collectionDescription,
    collectionDetails,
    contractAddress,
    gatedContent,
    ownerAddress,
    ownerProfilePhoto: ownerData.profilePhoto,
    ownerUsername: ownerData.username,
    ownerType: ownerData.type,
    id: assetId,
  };

  return assetData;
};

type CollectionTokenMap = Record<string, number[]>;

export const getAllOwnedTokenIds = async (userAddress: string) => {
  return (
    // TODO: Refactor Promise.allSettled with RxJs
    (
      await Promise.allSettled(
        CORAL_CONTRACTS.map(async (contract) => ({
          [contract]: await getOwnedTokensByCollection(contract, userAddress),
        }))
      )
    )
      .filter(
        (result): result is PromiseFulfilledResult<CollectionTokenMap> =>
          result.status === 'fulfilled'
      )
      .map((result) => result.value)
  );
};

export const getAssets = async (ownedTokensMap: CollectionTokenMap[]) =>
  // TODO: Refactor Promise.allSettled with RxJs
  (
    await Promise.allSettled(
      ownedTokensMap.map(async (collection) => {
        const [contract] = Object.keys(collection);
        return (
          // TODO: Refactor Promise.allSettled with RxJs
          (
            await Promise.allSettled(
              collection[contract].map(async (assetId) => await getAsset(contract, assetId))
            )
          )
            .filter(
              (result): result is PromiseFulfilledResult<Asset> => result.status === 'fulfilled'
            )
            .map((result) => result.value)
        );
      })
    )
  )
    .filter((result): result is PromiseFulfilledResult<Asset[]> => result.status === 'fulfilled')
    .map((result) => result.value)
    .flatMap((assets) => assets);
