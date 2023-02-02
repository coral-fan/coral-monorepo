import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ArtistData } from 'libraries/models';

const id = 'tayla-parx';

const artist: ArtistData = {
  name: 'Tayla Parx',
  profilePhoto: {
    src: 'https://firebasestorage.googleapis.com/v0/b/coral-fan.appspot.com/o/artists%2Ftayla-parx%2FTaylaParx-Profile%20Image.jpg?alt=media&token=450a57f5-ed1c-4409-a5eb-cc1ab66636c0',
    offsetPercentages: [0, 0],
    scale: 1,
  },
  bio: 'Hey there. I make beats you all love to listen to.</br>Sometimes I do other things like drop cool NFTs.',
  quote: null,
  socialHandles: {
    instagram: 'taylaparx',
    spotify: '1LzWWI9v4UKdbBgz8fqi15',
    twitter: 'TAYLAPARX',
  },
  collectionIds: [],
};

const addArtist = async () => {
  console.log('adding artist...');
  const artistRef = await getDocumentReferenceServerSide('artists', id);
  // const artistDocSnapshot = await artistRef.get();

  // if (artistDocSnapshot.exists) {
  //   throw `artist with id ${id} already exists.`;
  // }

  await artistRef.set(artist);

  console.log('artist added!');
};

addArtist();
