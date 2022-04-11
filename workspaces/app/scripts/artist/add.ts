import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ArtistData } from 'libraries/models';

const artist: ArtistData = {
  id: '0xabcdefghijklmnopqrstuvwxyz01234567891011',
  name: 'Test',
  profilePhoto: {
    src: '',
    offsetPercentages: [0, 0],
    scale: 1,
  },
  bio: 'lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna.',
  quote: 'suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam.',
  socialHandles: {
    twitter: 'test',
    spotify: 'test',
    soundcloud: 'test',
  },
  collections: ['0xf6a817e0af31d1f8accf9e301c2a9bb08962c160'],
  assets: [],
};

const addArtist = async () => {
  console.log('adding artist...');
  const artistRef = await getDocumentReferenceServerSide('artists', artist.id);
  const artistDocSnapshot = await artistRef.get();

  if (artistDocSnapshot.exists) {
    throw Error(`artist with id ${artist.id} already exists.`);
  }

  await artistRef.set(artist);

  console.log('artist added!');
};

addArtist();
