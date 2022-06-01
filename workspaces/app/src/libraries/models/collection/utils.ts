import { PartialCollection } from 'components/features/collection/components';
import { sortCollectionByDropDateDesc } from 'components/ui';
import { getAllDocuments, getDocumentData } from 'libraries/firebase';
import { getArtist } from '../artist';
import { Collection, CollectionData } from './types';

export const getCollection = async (id: Collection['id']) => {
  const collectionData = await getDocumentData<CollectionData>('collections', id);

  if (collectionData === undefined) {
    throw new Error(`Collection with id ${id} doesn't exist.`);
  }
  const { artistId, ...partialCollectionData } = collectionData;

  const artistData = await getArtist(artistId);

  if (!artistData) {
    throw new Error(`Artist with ${artistId} doesn't exist.`);
  }

  const { name: artistName, profilePhoto: artistProfilePhoto } = artistData;

  const collection: Collection = {
    id,
    ...partialCollectionData,
    artistId,
    artistName,
    artistProfilePhoto,
  };

  return collection;
};

export const getSimilarCollections = async (collectionId: Collection['id'], n: number) => {
  const similarCollectionData = await getAllDocuments<CollectionData>('collections');
  if (similarCollectionData) {
    // Returns the next n collections to drop for now, excluding current collection
    return (
      // TODO: Refactor Promise.allSettled with RxJs
      (
        await Promise.allSettled(
          sortCollectionByDropDateDesc(similarCollectionData)
            .filter(
              ({ id, dropDate }) =>
                id !== collectionId && new Date(dropDate).getTime() > new Date().getTime()
            )
            .slice(0, n)
            .map(async ({ id, artistId, name, imageUrl, maxMintable, type, dropDate }) => {
              const artistData = await getArtist(artistId);

              if (!artistData) {
                return;
              }

              return {
                id,
                artistId,
                name,
                imageUrl,
                maxMintable,
                type,
                dropDate,
                artistName: artistData.name,
                artistProfilePhoto: artistData.profilePhoto,
              };
            })
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
