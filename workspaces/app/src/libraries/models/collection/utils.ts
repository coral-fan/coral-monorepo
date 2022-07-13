import { PartialCollection } from 'components/features/collection/components';
import { sortCollectionByDropDateDesc } from 'components/ui';
import { getAllDocuments, getDocumentData } from 'libraries/firebase';
import { getArtist } from '../artist';
import { Photo } from '../types';
import { Collection, CollectionData } from './types';

const getArtistDataForCollection = async (
  artistId: string | undefined,
  artistName: string | undefined,
  artistProfilePhoto: Photo | undefined
) => {
  if (artistId === undefined) {
    if (!artistName || !artistProfilePhoto) {
      throw new Error(
        'artistId is undefined, and either artistName or artistProfilePhoto are undefined.'
      );
    }

    return {
      artistName,
      artistProfilePhoto,
    };
  }

  const artistData = await getArtist(artistId);

  if (!artistData) {
    throw new Error(`Artist with id ${artistId} doesn't exist.`);
  }

  return {
    artistId,
    artistName: artistData.name,
    artistProfilePhoto: artistData.profilePhoto,
  };
};

export const getCollection = async (id: Collection['id']) => {
  const collectionData = await getDocumentData<CollectionData>('collections', id);

  if (collectionData === undefined) {
    throw new Error(`Collection with id ${id} doesn't exist.`);
  }
  const { artistId, ...partialCollectionData } = collectionData;

  const artistDataForCollection = await getArtistDataForCollection(
    artistId,
    partialCollectionData.artistName,
    partialCollectionData.artistProfilePhoto
  );

  const collection: Collection = {
    ...partialCollectionData,
    id,
    ...artistDataForCollection,
  };

  return collection;
};

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
                artistName,
                artistProfilePhoto,
              }) => {
                const artistDataForCollection = await getArtistDataForCollection(
                  artistId,
                  artistName,
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
