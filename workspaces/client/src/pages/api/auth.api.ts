import { isAddress } from '@ethersproject/address';
import { verifyMessage } from '@ethersproject/wallet';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticationMessage } from 'libraries/authentication';
import {
  getDocumentReferenceServerSide,
  getFirestoreServerSide,
  initializeFirebaseAdmin,
} from 'libraries/firebase';
import { Handler } from './types';
import { getHandler } from './utils';
import { getNonce } from './utils/nonce';

const post: Handler = async (req, res) => {
  const { address, signedMessage } = req.body;
  if (!isAddress(address)) {
    return res.status(400).send('Address is not valid.');
  }
  try {
    const nonceRef = (await getDocumentReferenceServerSide('nonce', `${address}`)).get();
    if (nonceRef) {
      const nonce = await (await nonceRef)?.data()?.nonce;
      const derivedAddress = verifyMessage(getAuthenticationMessage(nonce), signedMessage);

      if (address === derivedAddress) {
        const nextNonce = getNonce();
        const firestore = await getFirestoreServerSide();
        await firestore.doc(`nonce/${derivedAddress}`).set({ nonce: nextNonce });
        const token = await getAuth().createCustomToken(derivedAddress);
        return res.status(200).send({ token });
      }
    }
    return res.status(400).send('Signed message verification failed.');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default getHandler({ post });
