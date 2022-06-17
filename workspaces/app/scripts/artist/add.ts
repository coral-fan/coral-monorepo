import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ArtistData } from 'libraries/models';

const id = '0xCa86C97A5f5D8906DAeF4Bc83Ad9665D5298d35B';

const artist: ArtistData = {
  name: 'Van Buren Records',
  profilePhoto: {
    src: 'https://firebasestorage.googleapis.com/v0/b/coral-fan.appspot.com/o/artists%2F0xCa86C97A5f5D8906DAeF4Bc83Ad9665D5298d35B%2FVanBuren_ProfilePhoto.jpeg?alt=media&token=66199a10-a4d9-4e81-b2f8-8afbd5f82d06',
    offsetPercentages: [0, 0],
    scale: 1,
  },
  bio: ' Community is all about creating a feeling of togetherness that fosters a sense of belonging—elevating each other’s value and leaving a bigger impact than any one individual ever could. Van Buren Records is a community, but also so much more.',
  quote: '',
  socialHandles: {
    twitter: 'VanBurenRecords',
    spotify: '2T6EOVQ5lAQc64poyLnXmj',
    instagram: 'vanburenrecords',
  },
  collectionIds: [],
};

const addArtist = async () => {
  console.log('adding artist...');
  const artistRef = await getDocumentReferenceServerSide('artists', id);
  const artistDocSnapshot = await artistRef.get();

  if (artistDocSnapshot.exists) {
    throw `artist with id ${id} already exists.`;
  }

  await artistRef.set(artist);

  console.log('artist added!');
};

addArtist();
