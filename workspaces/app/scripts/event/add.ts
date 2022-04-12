import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ArtistData, CollectionData } from 'libraries/models';
import { EventData } from 'libraries/models/event';

const event: EventData = {
  id: 'test',
  streamId: '799edeb6181ce1c4f0/11b5b9e45f6a3dbb',
  chatId: 'cid0020000309723245116',
  name: 'Test',
  date: new Date().toISOString(),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Egestas maecenas pharetra convallis posuere morbi leo urna. Et malesuada fames ac turpis. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Eu augue ut lectus arcu bibendum at varius. Ut enim blandit volutpat maecenas. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Quis risus sed vulputate odio ut. Nibh mauris cursus mattis molestie a.\nElementum integer enim neque volutpat ac tincidunt. Condimentum vitae sapien pellentesque habitant morbi tristique. Massa enim nec dui nunc mattis enim ut. Interdum velit laoreet id donec ultrices tincidunt. Pellentesque id nibh tortor id aliquet. Id aliquet lectus proin nibh nisl condimentum. Sed risus pretium quam vulputate. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Eget sit amet tellus cras adipiscing enim eu turpis. Tempus imperdiet nulla malesuada pellentesque elit eget. Malesuada proin libero nunc consequat interdum varius sit. Et odio pellentesque diam volutpat commodo sed egestas. Nisl pretium fusce id velit ut tortor. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Sed pulvinar proin gravida hendrerit lectus.',
  artistId: '0xabcdefghijklmnopqrstuvwxyz01234567891011',
  allowedCollectionIds: ['0xf6a817e0af31d1f8accf9e301c2a9bb08962c160'],
  exclusiveCollectionIds: [
    '0xf6a817e0af31d1f8accf9e301c2a9bb08962c160',
    '0xf6a817e0af31d1f8accf9e301c2a9bb08962c160',
    '0xf6a817e0af31d1f8accf9e301c2a9bb08962c160',
  ],
};

const addEvent = async () => {
  console.log('adding event...');

  const { artistId, allowedCollectionIds, exclusiveCollectionIds } = event;

  const artistRef = await getDocumentReferenceServerSide<ArtistData>('artists', artistId);
  const artistDocSnapshot = await artistRef.get();

  if (!artistDocSnapshot.exists) {
    throw `artist with id ${artistId} doesn't exist.`;
  }

  [...allowedCollectionIds, ...(exclusiveCollectionIds ?? [])].forEach(async (collectionId) => {
    const collectionRef = await getDocumentReferenceServerSide<CollectionData>(
      'collections',
      collectionId
    );
    const collectionDocSnapshot = await collectionRef.get();
    if (!collectionDocSnapshot.exists) {
      throw `collection with id ${collectionId} doesn't exist.`;
    }
  });

  const { id } = event;
  const eventRef = await getDocumentReferenceServerSide<EventData>('events', id);
  const eventDocSnapshot = await eventRef.get();

  if (eventDocSnapshot.exists) {
    throw `event with id ${id} already exists.`;
  }

  await eventRef.set(event);

  console.log('event added!');
};

addEvent();
