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
      const newNonce = { nonce: 1 };
      await admin.firestore().collection('Nonce').doc(address).set(newNonce);
      response.send(newNonce);
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
    const nonceRef = await admin.firestore().doc(`Nonce/${address}`).get();
    if (nonceRef.exists) {
      const nonceObj = nonceRef.data();
      const nonce = nonceObj['nonce'] as number;
      const derivedAddress = verifyTypedData(
        {},
        { Nonce: [{ name: 'nonce', type: 'uint256' }] },
        { nonce: nonce },
        signedMessage
      );
      if (address === derivedAddress) {
        const nextNonce = nonce + 1;
        await admin.firestore().doc(`Nonce/${derivedAddress}`).set({ nonce: nextNonce });
        const customToken = await admin.auth().createCustomToken(derivedAddress);
        response.send({ 'Bearer Token': customToken });
      } else {
        response.status(401).send('');
      }
    } else {
      response.status(401).send('');
    }
  } catch (error) {
    response.status(401).send('');
  }
});
