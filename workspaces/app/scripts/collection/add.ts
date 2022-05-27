import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ArtistData, CollectionData } from 'libraries/models';

const id = '0xf6a817e0af31d1f8accf9e301c2a9bb08962c160';
const collection: CollectionData = {
  name: 'Test NFT',
  artistId: '0xabcdefghijklmnopqrstuvwxyz01234567891011',
  imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/collections%2F0xf6a817e0af31d1f8accf9e301c2a9bb08962c160%2Fimage.png?alt=media&token=c08b4275-06bc-41a9-bbe7-69d907239c05',
  maxMintable: 10,
  type: 'event',
  price: 0.01,
  dropDate: '2022-04-11',
  description: 'Test NFT Edition v1',
  details: ['This is a test NFT.'],
  gatedContent: {
    type: 'event',
    id: '1',
  },
};

const addCollection = async () => {
  console.log('adding collection...');

  const { artistId } = collection;
  const artistRef = await getDocumentReferenceServerSide<ArtistData>('artists', artistId);
  const artistDocSnapshot = await artistRef.get();

  if (!artistDocSnapshot.exists) {
    throw Error(`artist with id ${artistId} doesn't exist.`);
  }

  const collectionRef = await getDocumentReferenceServerSide<CollectionData>('collections', id);
  const collectionDocSnapshot = await collectionRef.get();

  if (collectionDocSnapshot.exists) {
    throw Error(`collection with id ${id} already exists.`);
  }

  await collectionRef.set(collection);

  console.log('collection added!');
};

addCollection();
