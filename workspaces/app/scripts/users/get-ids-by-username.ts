import { stringify } from 'csv-stringify';
import fs from 'fs';
import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { User } from 'libraries/models';
import path from 'path';
import { parse } from 'csv-parse';

const getUsernames = () =>
  new Promise<string[]>((resolve) => {
    const usernames: string[] = [];
    fs.createReadStream(path.join(__dirname, `usernames_9-28-2022.csv`))
      .pipe(
        parse({
          from_line: 2,
        }).on('data', async ([, username]) => {
          usernames.push(username);
        })
      )
      .on('end', () => resolve(usernames));
  });

// const usernames = ['Abigail', 'paomian'];

const columns = ['Username', 'User ID'];

const stringifier = stringify({ header: true, columns });

const generateCSV = async () => {
  const usernames = await getUsernames();

  const userCollectionRef = await getCollectionReferenceServerSide<User>('users');

  const userQuerySnapshots = await userCollectionRef.get();

  const usernamesToIds = new Map();

  for (const userSnapshot of userQuerySnapshots.docs) {
    const { username } = userSnapshot.data();
    const { id } = userSnapshot;
    usernamesToIds.set(username, id);
  }

  for (const username of usernames) {
    const id = usernamesToIds.get(username);
    stringifier.write([username, id]);
  }

  const writableStream = fs.createWriteStream(
    path.join(__dirname, `ids-by-username_${new Date().valueOf()}.csv`)
  );

  stringifier.pipe(writableStream);
};

console.log('writing CSV...');
generateCSV().catch(console.error);
