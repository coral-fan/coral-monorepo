import fs from 'fs';
import path from 'path';
import { stringify } from 'csv-stringify';

import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { EventGuestLists, PublicUserData } from 'libraries/models';

const collectionId = '0xF6A817E0af31D1F8acCF9E301C2a9bB08962c160';

const columns = ['Username', 'User ID', 'Has Entered Event'];

const generateCSV = async () => {
  const eventGuestListsDocRef = await getDocumentReferenceServerSide<EventGuestLists>(
    'app',
    'event-guest-lists'
  );

  const eventGuestListsSnapshot = await eventGuestListsDocRef.get();

  const eventGuestLists = eventGuestListsSnapshot.data();

  if (eventGuestLists === undefined) {
    throw "Document app/event-guest-lists doesn't exist in database.";
  }

  const userIds = eventGuestLists[collectionId]?.userIds;

  if (userIds === undefined) {
    throw `Collection with id ${collectionId} doesn't exist in database.`;
  }

  const stringifier = stringify({ header: true, columns });

  for (const userId of userIds) {
    console.log(`writing data for ${userId}`);
    const publicUserDataDocRef = await getDocumentReferenceServerSide<PublicUserData>(
      'users',
      userId
    );
    const publicUserDataSnapshot = await publicUserDataDocRef.get();

    const publicUserData = publicUserDataSnapshot.data();

    const username = publicUserData?.username;
    stringifier.write([username ?? '', userId, 'NO']);
  }

  const writableStream = fs.createWriteStream(path.join(__dirname, 'guestlist.csv'));

  stringifier.pipe(writableStream);
};

console.log('writing CSV...');
generateCSV().catch(console.error);
