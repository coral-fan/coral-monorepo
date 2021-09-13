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
    // const address = request.body.address;
    // placeholder logic
    const address = '0xA494addbA803d75D3dA1b667C23ea596F31179b9';
    const nonceReference = await admin.firestore().collection('Nonce').doc(address).get();
    if (nonceReference.exists) {
      const nonce = nonceReference.data();
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
    // const { address, signedMessage } = request.body;

    // const derivedAddress = verifyTypedData(
    //   {},
    //   { Nonce: [{ name: 'nonce', type: 'uint256' }] },
    //   { nonce: 1 },
    //   signedMessage
    // );

    const derivedAddress = '0xA494addbA803d75D3dA1b667C23ea596F31179b9';

    // if (address === derivedAddress.toLowerCase()) {
    // placeholder logic
    if (true) {
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
    }
  }
});
