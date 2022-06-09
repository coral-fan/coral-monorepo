import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ArtistData, CollectionData } from 'libraries/models';
import { StreamData } from 'libraries/models';

const id = 'test';
const stream: StreamData = {
  sproutMediaId: '799edeb6181ce1c4f0/11b5b9e45f6a3dbb',
  chatId: 'cid0020000309723245116',
  name: 'Lorem ipsum',
  date: new Date().toISOString(),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Egestas maecenas pharetra convallis posuere morbi leo urna. Et malesuada fames ac turpis. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Eu augue ut lectus arcu bibendum at varius. Ut enim blandit volutpat maecenas. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Quis risus sed vulputate odio ut. Nibh mauris cursus mattis molestie a.\nElementum integer enim neque volutpat ac tincidunt. Condimentum vitae sapien pellentesque habitant morbi tristique. Massa enim nec dui nunc mattis enim ut. Interdum velit laoreet id donec ultrices tincidunt. Pellentesque id nibh tortor id aliquet. Id aliquet lectus proin nibh nisl condimentum. Sed risus pretium quam vulputate. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Eget sit amet tellus cras adipiscing enim eu turpis. Tempus imperdiet nulla malesuada pellentesque elit eget. Malesuada proin libero nunc consequat interdum varius sit. Et odio pellentesque diam volutpat commodo sed egestas. Nisl pretium fusce id velit ut tortor. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Sed pulvinar proin gravida hendrerit lectus.',
  artistId: '0xabcdefghijklmnopqrstuvwxyz01234567891011',
  accessGrantingTokenAddresses: ['0x9b60e8F4435Ac85932af1e1e7E05EaaC697E2339'],
  exclusiveCollectionIds: [],
};

const addStream = async () => {
  try {
    console.log('adding stream...');

    const { artistId, accessGrantingTokenAddresses, exclusiveCollectionIds } = stream;

    const artistRef = await getDocumentReferenceServerSide<ArtistData>('artists', artistId);
    const artistDocSnapshot = await artistRef.get();

    if (!artistDocSnapshot.exists) {
      throw `artist with id ${artistId} doesn't exist.`;
    }

    [...accessGrantingTokenAddresses, ...(exclusiveCollectionIds ?? [])].forEach(
      async (collectionId) => {
        const collectionRef = await getDocumentReferenceServerSide<CollectionData>(
          'collections',
          collectionId
        );
        const collectionDocSnapshot = await collectionRef.get();
        if (!collectionDocSnapshot.exists) {
          throw `collection with id ${collectionId} doesn't exist.`;
        }
      }
    );

    const streamDocRef = await getDocumentReferenceServerSide<StreamData>('streams', id);
    const streamDocSnapshot = await streamDocRef.get();

    if (streamDocSnapshot.exists) {
      throw `stream with id ${id} already exists.`;
    }

    await streamDocRef.set(stream);

    console.log('stream added!');
  } catch (e) {
    console.error(e);
  }
};

addStream();
