import { getTokenOwner } from 'libraries/blockchain/utils';
import { getPublicFileUrl, getStorageBucket } from 'libraries/firebase';
import { Asset, Collection, getCollection, getPublicUserData, User } from 'libraries/models';
import { OwnedNfts } from '../ownedNfts';
import { PublicUserData } from '../user';

export const getAssetImageUrl = async (collectionId: string, assetId: number) => {
  const bucket = await getStorageBucket();
  const destinationPath = `collections/${collectionId}/assets/${assetId}/image.png`;

  const errorMessage = "firebaseStorageDownloadTokens isn't of type string";

  try {
    /*
     * this will throw an exception if the asset image path doesn't exist
     * hacky, but relying on this exception to check whether an asset has an unique image or not
     * allows for flexible fallback to collection image
     */
    const metadataResponse = await bucket.file(destinationPath).getMetadata();
    const { firebaseStorageDownloadTokens } = metadataResponse[0]?.metadata;

    if (typeof firebaseStorageDownloadTokens === 'string') {
      throw new Error(errorMessage);
    }

    return getPublicFileUrl(destinationPath, firebaseStorageDownloadTokens);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- type e as any so can check the message
  } catch (e: any) {
    // check if error message is token error as this is not expected behavior and needs to be addressed
    if (e.message === errorMessage) {
      console.error(e);
    }
    return undefined;
  }
};

const getAssetWithKnownCollectionAndOwner = async (
  collection: Collection,
  assetId: Asset['id'],
  ownerAddress: User['id'],
  owner?: PublicUserData
): Promise<Asset> => {
  const {
    imageUrl: collectionImageUrl,
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

  const assetImageUrl = await getAssetImageUrl(contractAddress, assetId);

  const asset: Asset = {
    imageUrl: assetImageUrl ?? collectionImageUrl,
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
