import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ArtistData } from 'libraries/models';

const id = '0xabcdefghijklmnopqrstuvwxyz01234567891011';

const artist: ArtistData = {
  name: 'MATTE',
  profilePhoto: {
    src: 'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/artists%2F0xEF43ACE7691A2aA4D4d8FcCE15C8B11be3DC21Fd%2Fmatte_profile.png?alt=media&token=cb7dd084-1ac5-469b-862d-8475229de2ec',
    offsetPercentages: [0, 0],
    scale: 1,
  },
  bio: 'MATTE presents a celebration of the expansive world of WEB3 during NFT.NYC with "A Party 3.0: With P00LS and $FEVER"',
  quote: 'suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam.',
  socialHandles: {
    twitter: 'test',
    spotify: 'test',
    soundcloud: 'test',
  },
  collectionIds: [],
  tag: 'artist',
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
