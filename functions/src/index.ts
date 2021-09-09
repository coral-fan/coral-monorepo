import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const serviceAccount = require('<PATH TO KEY>');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const torusAuth = functions.https.onRequest((request, response) => {
  functions.logger.info('Auth req sent!', { structuredData: true });

  const uid = '0xA494addbA803d75D3dA1b667C23ea596F31179b9';

  admin
    .auth()
    .createCustomToken(uid)
    .then((customToken) => {
      // Send token back to client
      response.set('Access-Control-Allow-Origin', '*');
      response.send({ 'Bearer Token': customToken });
    })
    .catch((error) => {
      console.log('Error creating custom token:', error);
    });
});
