import { stringify } from 'csv-stringify';
import fs from 'fs';
import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { User } from 'libraries/models';
import path from 'path';

const usernames = ['Abigail', 'paomian'];

const columns = ['Username', 'User ID'];

const stringifier = stringify({ header: true, columns });

const generateCSV = async () => {
  const userCollectionRef = await getCollectionReferenceServerSide<User>('users');

  const userQuerySnapshots = await userCollectionRef.where('username', 'in', usernames).get();

  for (const userSnapshot of userQuerySnapshots.docs) {
    const { id } = userSnapshot;
    const { username } = userSnapshot.data();

    stringifier.write([username, id]);
  }

  const writableStream = fs.createWriteStream(
    path.join(__dirname, `ids-by-username_${new Date().valueOf()}.csv`)
  );

  stringifier.pipe(writableStream);
};

console.log('writing CSV...');
generateCSV().catch(console.error);
