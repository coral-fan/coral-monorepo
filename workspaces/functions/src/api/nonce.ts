import { isAddress } from '@ethersproject/address';
import { getExpress, getFirebaseAdmin, getNonce } from '../utils';

const app = getExpress();
const admin = getFirebaseAdmin();

// this route format is neccessary because rewrite dosen't remove source: https://stackoverflow.com/questions/64916582/firebase-functions-return-404
app.post('/api/nonce', async (request, response) => {
  const { address } = request.body;
  if (!isAddress(address)) {
    return response.status(400).send('Address is not valid.');
  }
  const nonceRef = await admin.firestore().doc(`nonce/${address}`).get();
  try {
    if (nonceRef.exists) {
      const nonce = nonceRef.data();
      return response.send(nonce);
    } else {
      const nonce = getNonce();
      await admin.firestore().collection('nonce').doc(address).set({ nonce });
      await admin.firestore().collection('is-signing-up').doc(address).set({ isSigningUp: true });
      return response.send(nonce);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).send('An error occured.');
  }
});

export default app;
