import { getTokenOwner } from 'libraries/blockchain/utils';
import { Asset, Collection, getCollection, getPublicUserData, User } from 'libraries/models';
import { OwnedNfts } from '../ownedNfts';
import { PublicUserData } from '../user';

const getAssetWithKnownCollectionAndOwner = async (
  collection: Collection,
  assetId: Asset['id'],
  ownerAddress: User['id'],
  owner?: PublicUserData
): Promise<Asset> => {
  const {
    imageUrl,
    creatorName,
    creatorProfilePhoto,
    artistId,
    name: collectionName,
    type,
    description: collectionDescription,
    details: collectionDetails,
    id: contractAddress,
    gatedContent,
  } = collection;

  const asset: Asset = {
    imageUrl,
    creatorName,
    creatorProfilePhoto,
    artistId,
    collectionName,
    type,
    collectionDescription,
    collectionDetails,
    contractAddress,
    gatedContent,
    ownerAddress,
    // TODO: use const for default photo
    ownerProfilePhoto: owner?.profilePhoto ?? {
      src: '/images/default-profile-photo.png',
      offsetPercentages: [0, 0],
      scale: 1,
    },
    ownerUsername: owner?.username ?? ownerAddress,
    ownerType: owner?.type ?? 'fan',
    id: assetId,
  };

  // necessary to delete key because Next.js can't serialize an undefined value
  // https://github.com/vercel/next.js/discussions/11209
  if (asset.artistId === undefined) {
    delete asset.artistId;
  }

  return asset;
};

export const getAsset = async (collectionId: Collection['id'], assetId: number): Promise<Asset> => {
  const collection = await getCollection(collectionId);
  const ownerAddress = await getTokenOwner(collectionId, assetId);
  const owner = await getPublicUserData(ownerAddress);

  return getAssetWithKnownCollectionAndOwner(collection, assetId, ownerAddress, owner);
};

export const getAssets = async (ownerAddress: User['id'], ownedNfts: OwnedNfts) => {
  /** 
   owner can be undefined, will fallback to:
    - default profile photo value
    - using public address as username
    - using link profile to snowtrace
  **/
  const owner = await getPublicUserData(ownerAddress);

  // TODO: Generally clean up this code, a bit confusing
  // TODO: silently fails, should probably not do this lol
  // TODO: Refactor Promise.allSettled with RxJs
  return (
    await Promise.allSettled(
      Object.entries(ownedNfts)
        .filter((entry): entry is [string, number[]] => entry[1] !== undefined)
        .map(async ([collectionId, assetIds]) => {
          const collection = await getCollection(collectionId);
          return (
            // TODO: Refactor Promise.allSettled with RxJs
            (
              await Promise.allSettled(
                assetIds.map((assetId) =>
                  getAssetWithKnownCollectionAndOwner(collection, assetId, ownerAddress, owner)
                )
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
};
