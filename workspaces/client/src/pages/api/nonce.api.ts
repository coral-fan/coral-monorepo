import { isAddress } from '@ethersproject/address';
import { getFirebaseAdmin } from 'libraries/firebase';
import { Handler } from './types';
import { getHandler } from './utils';
import { getNonce } from './utils/nonce';

const post: Handler = async (req, res) => {
  const { address } = req.body;
  if (!isAddress(address)) {
    return res.status(400).send('Address is not valid.');
  }
  const admin = await getFirebaseAdmin();
  const nonceRef = await admin.firestore().doc(`nonce/${address}`).get();
  try {
    if (nonceRef.exists) {
      const nonce = nonceRef.data();
      return res.send(nonce);
    } else {
      const nonce = getNonce();
      await admin.firestore().collection('nonce').doc(address).set({ nonce });
      await admin.firestore().collection('is-signing-up').doc(address).set({ isSigningUp: true });
      return res.send(nonce);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('An error occured.');
  }
};

export default getHandler({ post });
