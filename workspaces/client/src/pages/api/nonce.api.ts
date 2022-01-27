import { isAddress } from '@ethersproject/address';
import { getDocumentReferenceServerSide, getFirestoreServerSide } from 'libraries/firebase';
import { Handler } from './types';
import { getHandler } from './utils';
import { getNonce } from './utils/nonce';

const post: Handler = async (req, res) => {
  const { address } = req.body;
  if (!isAddress(address)) {
    return res.status(400).send('Address is not valid.');
  }

  try {
    const nonceRef = (await getDocumentReferenceServerSide('nonce', `${address}`)).get();
    if (nonceRef) {
      // await (await nonceRef)?.data()?.nonce results in "undefined" being returned?
      const nonce = (await nonceRef)?.data();
      return res.send(nonce);
    } else {
      const nonce = getNonce();
      const firestore = await getFirestoreServerSide();
      await firestore.doc(`${nonce}/${address}`).set({ nonce });
      await firestore.doc(`${'is-signing-up'}/${address}`).set({ isSigningUp: true });
      return res.send(nonce);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('An error occured.');
  }
};

export default getHandler({ post });
