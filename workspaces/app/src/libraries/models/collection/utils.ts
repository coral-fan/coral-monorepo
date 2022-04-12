import { getDocumentData } from 'libraries/firebase';
import { ArtistData } from '../artist';
import { Collection, CollectionData } from './types';

export const getCollection = async (id: CollectionData['id']): Promise<Collection | undefined> => {
  const collectionData = await getDocumentData<CollectionData>('collections', id);

  if (!collectionData) {
    return collectionData;
  }

  const { artistId, ...collection } = collectionData;

  const artistData = await getDocumentData<ArtistData>('artists', artistId);

  if (!artistData) {
    throw new Error(`Artist with ${artistId} doesn't exist.`);
  }

  const { name: artistName, profilePhoto: artistProfilePhoto } = artistData;

  return {
    ...collection,
    artistId,
    artistName,
    artistProfilePhoto,
  };
};
