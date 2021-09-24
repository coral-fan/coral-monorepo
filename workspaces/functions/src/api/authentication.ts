import { isAddress } from '@ethersproject/address';
import { verifyTypedData } from '@ethersproject/wallet';
import getExpress from '../utils/getExpress';
import getFirebaseAdmin from '../utils/getFirebaseAdmin';

import { getAuthenticationMessage } from '@common/utils';

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
      console.log(getAuthenticationMessage(nonce));
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
        return response.send({ 'Bearer Token': customToken });
      } else {
        return response.status(401).send('');
      }
    } else {
      return response.status(401).send('');
    }
  } catch (error) {
    return response.status(401).send('');
  }
});

export default app;
