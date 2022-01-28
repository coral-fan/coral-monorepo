import { isAddress } from '@ethersproject/address';
import { verifyMessage } from '@ethersproject/wallet';
import { getAuth } from 'firebase-admin/auth';
import { getAuthenticationMessage } from 'libraries/authentication';
import { getDocumentReferenceServerSide, getFirestoreServerSide } from 'libraries/firebase';
import { Handler } from './types';
import { getHandler } from './utils';
import { getNonce } from './utils/nonce';

const post: Handler = async (req, res) => {
  const { address, signedMessage } = req.body;
  if (!isAddress(address)) {
    return res.status(400).json({ error: 'Address is not valid.' });
  }
  try {
    const nonceRefDoc = await getDocumentReferenceServerSide('nonce', `${address}`);
    const nonceSnapshotDoc = await nonceRefDoc.get();
    const nonceData = nonceSnapshotDoc.data();
    if (nonceData) {
      const { nonce } = nonceData;
      const derivedAddress = verifyMessage(getAuthenticationMessage(nonce), signedMessage);
      if (address === derivedAddress) {
        const nextNonce = getNonce();
        await nonceRefDoc.set({ nonce: nextNonce });
        const token = await getAuth().createCustomToken(derivedAddress);
        return res.status(200).send({ token });
      } else {
        return res.status(400).json({ error: 'Signed message verification failed.' });
      }
    } else {
      return res.status(400).json({ error: 'Address is not valid.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export default getHandler({ post });
