import { isAddress } from '@ethersproject/address';
import { getExpress, getFirebaseAdmin, getNonce } from '../utils';

const app = getExpress();
const admin = getFirebaseAdmin();

app.post('/', async (request, response) => {
  const address = request.body.address;
  if (!isAddress(address)) {
    return response.status(401).send('');
  }
  const nonceRef = await admin.firestore().doc(`Nonce/${address}`).get();
  try {
    if (nonceRef.exists) {
      const nonce = nonceRef.data();
      return response.send({ ...nonce, isSignUp: false });
    } else {
      const nonce = getNonce();
      await admin.firestore().collection('Nonce').doc(address).set({ nonce });
      return response.send({ nonce, isSignUp: true });
    }
  } catch (error) {
    return response.status(401).send('');
  }
});

export default app;
