import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { verifyTypedData } from '@ethersproject/wallet';

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
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    // Send responseponse to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    const address = request.body.address;
    console.log(address);
    const nonceRef = await admin.firestore().collection('Nonce').doc(address).get();
    if (nonceRef.exists) {
      const nonce = nonceRef.data();
      console.log(nonce);
      response.send(nonce);
    } else {
      response.status(404).send('');
    }
  }
});

export const torusAuth = functions.https.onRequest(async (request, response) => {
  functions.logger.info('Auth req sent!', { structuredData: true });

  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    // Send responseponse to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Credentials', 'true');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    const { address, signedMessage } = request.body;

    const derivedAddress = verifyTypedData(
      {},
      { Nonce: [{ name: 'nonce', type: 'uint256' }] },
      { nonce: '1' },
      signedMessage
    );

    console.log(address, signedMessage, derivedAddress);

    if (address === derivedAddress.toLowerCase()) {
      admin
        .auth()
        .createCustomToken(derivedAddress)
        .then((customToken) => {
          // Send token back to client
          response.send({ 'Bearer Token': customToken });
        })
        .catch((error) => {
          console.log('Error creating custom token:', error);
        });
    } else {
      response.status(404).send({ error: 'you fucked up' });
    }
  }
});
