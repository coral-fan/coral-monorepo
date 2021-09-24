import { isAddress } from '@ethersproject/address';
import { verifyMessage } from '@ethersproject/wallet';

import { getAuthenticationMessage } from '@common/utils';
import { getExpress, getFirebaseAdmin, getNonce } from '../utils';

const app = getExpress();
const admin = getFirebaseAdmin();

app.post('/', async (request, response) => {
  const { address, signedMessage } = request.body;
  if (!isAddress(address)) {
    return response.status(401).send('');
  }
  try {
    const nonceRef = await admin.firestore().doc(`Nonce/${address}`).get();
    if (nonceRef.exists) {
      const nonce = nonceRef.data()?.nonce;
      const derivedAddress = verifyMessage(getAuthenticationMessage(nonce), signedMessage);

      if (address === derivedAddress) {
        const nextNonce = getNonce();
        await admin.firestore().doc(`Nonce/${derivedAddress}`).set({ nonce: nextNonce });
        const customToken = await admin.auth().createCustomToken(derivedAddress);
        return response.send({ 'Bearer Token': customToken });
      }
    }
    return response.status(401).send('');
  } catch (error) {
    return response.status(401).send('');
  }
});

export default app;
