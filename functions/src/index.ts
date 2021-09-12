import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { verifyTypedData } from '@ethersproject/wallet';
import { isAddress } from '@ethersproject/address';

require('dotenv').config();

const credentialPath = (
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPMENT_CREDENTIALS
    : process.env.GOOGLE_APPLICATION_CREDENTIALS
) as string;

admin.initializeApp({
  credential: admin.credential.cert(credentialPath),
});

export const getNonce = functions.https.onRequest(async (request, response) => {
  // TODO: CORS!!!
  response.set('Access-Control-Allow-Origin', '*');

  const address = request.body.address;
  if (!isAddress(address)) {
    response.status(401).send('');
  }
  const nonceRef = await admin.firestore().doc(`Nonce/${address}`).get();
  try {
    if (nonceRef.exists) {
      const nonce = nonceRef.data();
      response.send(nonce);
    } else {
      const newUserPost = await admin.firestore().collection('Nonce').add({
        address: 1,
      });
      const newUserRef = await newUserPost.get();
      const newUserNonce = newUserRef.data();
      response.send(newUserNonce);
    }
  } catch (error) {
    response.status(401).send('');
  }
});

export const torusAuth = functions.https.onRequest(async (request, response) => {
  // TODO: CORS!!!
  response.set('Access-Control-Allow-Origin', '*');

  const { address, signedMessage } = request.body;
  if (!isAddress(address)) {
    response.status(401).send('');
  }
  try {
    const derivedAddress = verifyTypedData(
      {},
      { Nonce: [{ name: 'nonce', type: 'uint256' }] },
      { nonce: '1' },
      signedMessage
    );
    if (address === derivedAddress) {
      const customToken = await admin.auth().createCustomToken(derivedAddress);
      response.send({ 'Bearer Token': customToken });
    } else {
      response.status(401).send('');
    }
  } catch (error) {
    response.status(401).send('');
  }
});
