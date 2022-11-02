import { getAllDocuments, getDocumentData, DocumentDataWithId } from 'libraries/firebase';
import { getArtist } from '../artist';
import { ReferralCampaignData } from '../earn';
import { Photo } from '../types';
import { Collection, CollectionData, PartialCollection } from './types';

const getArtistDataForCollection = async (
  artistId: string | undefined,
  creatorName: string | undefined,
  creatorProfilePhoto: Photo | undefined
) => {
  if (artistId === undefined) {
    if (!creatorName || !creatorProfilePhoto) {
      throw new Error(
        'artistId is undefined, and either creatorName or creatorProfilePhoto are undefined.'
      );
    }

    return {
      creatorName,
      creatorProfilePhoto,
    };
  }

  const artistData = await getArtist(artistId);

  if (!artistData) {
    throw new Error(`Artist with id ${artistId} doesn't exist.`);
  }

  return {
    artistId,
    creatorName: artistData.name,
    creatorProfilePhoto: artistData.profilePhoto,
  };
};

export const getCollection = async (id: Collection['id']) => {
  const collectionData = await getDocumentData<CollectionData>('collections', id);

  if (collectionData === undefined) {
    throw new Error(`Collection with id ${id} doesn't exist.`);
  }
  const { artistId, activeCampaign, ...partialCollectionData } = collectionData;

  const artistDataForCollection = await getArtistDataForCollection(
    artistId,
    partialCollectionData.creatorName,
    partialCollectionData.creatorProfilePhoto
  );

  const collection: Collection = {
    ...partialCollectionData,
    id,
    ...artistDataForCollection,
  };

  if (activeCampaign) {
    const referralCampaignData = await getDocumentData<ReferralCampaignData>(
      'referral-campaigns',
      activeCampaign
    );

    collection.activeCampaign = activeCampaign;
    collection.referralCampaign = referralCampaignData;
  }

  return collection;
};

// TODO: hacked this together to fix typing errors using function overloading. revisit to see if this is the best approach
export function sortCollectionByDropDateDesc(arr: Collection[]): typeof arr;

export function sortCollectionByDropDateDesc(arr: DocumentDataWithId<CollectionData>[]): typeof arr;

export function sortCollectionByDropDateDesc(
  arr: Collection[] | DocumentDataWithId<CollectionData>[]
) {
  return arr.sort((a, b) => new Date(b.dropTime).getTime() - new Date(a.dropTime).getTime());
}

export const getSimilarCollections = async (collectionId: Collection['id'], n: number) => {
  const similarCollectionData = await getAllDocuments<CollectionData>('collections');
  if (similarCollectionData) {
    // Returns the next n collections to drop for now, excluding current collection
    return (
      // TODO: Refactor Promise.allSettled with RxJs. Also look at error handling as it fails silently
      (
        await Promise.allSettled(
          sortCollectionByDropDateDesc(similarCollectionData)
            .filter(({ id }) => id !== collectionId)
            .slice(0, n)
            .map(
              async ({
                id,
                artistId,
                name,
                imageUrl,
                maxSupply,
                type,
                dropTime,
                price,
                maxMintablePerWallet,
                creatorName,
                creatorProfilePhoto: artistProfilePhoto,
              }) => {
                const artistDataForCollection = await getArtistDataForCollection(
                  artistId,
                  creatorName,
                  artistProfilePhoto
                );

                const partialCollection: PartialCollection = {
                  id,
                  name,
                  imageUrl,
                  maxSupply,
                  type,
                  dropTime,
                  price,
                  maxMintablePerWallet,
                  ...artistDataForCollection,
                };

                return partialCollection;
              }
            )
        )
      )
        .filter(
          (result): result is PromiseFulfilledResult<PartialCollection> =>
            result.status === 'fulfilled'
        )
        .map((result) => result.value)
    );
  }
};
