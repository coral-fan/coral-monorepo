import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { Client } from 'twitter-api-sdk';

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

if (BEARER_TOKEN === undefined) {
  throw getEnvironmentVariableErrorMessage('TWITTER_BEARER_TOKEN');
}

const client = new Client(BEARER_TOKEN);

// let nextToken: string | undefined = undefined;
let nextToken = 'B1AC98HPB8SHEZZZ';
let done = false;

const MIN_TO_SLEEP = 15;

const WHITELIST_ID = '9znaIWQUQKQ9oGPD4gaR';

let whitelistId: string;

const snapshotFollowers = async () => {
  const { data: user } = await client.users.findUserByUsername('TAYLAPARX');
  if (user) {
    const { id } = user;

    const whitelistsCollectionRef = await getCollectionReferenceServerSide('whitelists');

    // const whitelistDocRef = await whitelistsCollectionRef.add({});
    // whitelistId = whitelistDocRef.id;
    const whitelistDocRef = whitelistsCollectionRef.doc(WHITELIST_ID);

    const usersCollectionRef = whitelistDocRef.collection('users');

    while (!done) {
      for (let i = 0; i < 15; i++) {
        console.log(`Round ${i + 1}: adding followers...\n`);
        const { data: followers, meta } = await client.users.usersIdFollowers(id, {
          max_results: 1000,
          pagination_token: nextToken,
        });

        followers?.forEach(async (follower) => {
          await usersCollectionRef.doc(follower.id).set({ isAllowed: true });
        });

        if (meta?.next_token) {
          nextToken = meta.next_token;
        } else {
          done = true;
          break;
        }
      }
      //   sleeps for 15 min
      if (!done) {
        console.log(`${new Date().toLocaleTimeString()}: Sleeping for ${MIN_TO_SLEEP} min...\n`);
        await new Promise((resolve) => setTimeout(resolve, MIN_TO_SLEEP * 60 * 1000));
      }
    }
  }
};

snapshotFollowers().catch((e: Error) => {
  console.error(e, '\n');
  console.log(`Whitelist ID: ${whitelistId}`);
  console.log(`Next pagination token: ${nextToken}`);
});
